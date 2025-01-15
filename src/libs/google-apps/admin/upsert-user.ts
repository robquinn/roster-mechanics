import createAgentDigestFilter from 'src/libs/wrapper/gmail/create-agent-digest-filter'
import handleReHire from '../../wrapper/company/handle-rehire'
import saveCriticalNewHirePDF from '../../wrapper/drive/save-critical-new-hire-pdf'
import createJustListedFilter from '../../wrapper/gmail/create-just-listed-filter'
import saveUserSignature from '../../wrapper/gmail/save-user-signature'
import sendNewHireEmail from '../../wrapper/gmail/send-new-hire-email'
import sendWelcomeEmail from '../../wrapper/gmail/send-welcome-email'
import addUserToCompanyCalendar from '../calendar/add-user-to-company-calendar'
import getByEmail from './get-by-email'
import getByQuery from './get-by-query'
import insertUser from './insert-user'
import updateUser from './update-user'

const upsertUser: RosterMechanics.GoogleApps.Admin.Fn.UpsertUser = async (
  googleUser: RosterMechanics.GoogleApps.Admin.IGoogleUser,
): Promise<{
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  action: RosterMechanics.Utils.Cache.CacheAction
}> => {
  console.log('running upsert...')
  let googleUserObj = googleUser.getUser()

  const userQuery = await getByQuery(
    `Roster.Edit_Response_URL=${googleUserObj.customSchemas?.Roster.Edit_Response_URL as string} orgUnitPath=/`,
  )

  console.log('userWithFormResponseQuery', userQuery)

  // u => was SUCCESFULLY FOUND (User exists & needs to be updated)
  if (userQuery.length > 0) {
    const existingUser = userQuery[0] as RosterMechanics.GoogleApps.Admin.IGoogleUser
    console.log('AdminDirectory.User FOUND by querying FORM RESPONSE URL in custom schema.')

    googleUserObj = await handleReHire(googleUserObj)

    const updatedUser = await updateUser({
      oldUser: existingUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
      newUser: googleUserObj,
    })
    // await saveCriticalNewHirePDF(googleUser)

    return await Promise.resolve({ user: updatedUser, action: 'update' })
  }
  console.log('AdminDirectory.User NOT FOUND by querying FORM RESPONSE URL in custom schema')
  console.log('Trying to find AdminDirectory.User by query primary email...')

  return await new Promise((resolve) => {
    getByEmail(googleUserObj.primaryEmail as string)
      .then(async (existingUser) => {
        googleUserObj = await handleReHire(googleUserObj)

        const user = await updateUser({
          oldUser: existingUser,
          newUser: googleUserObj,
        })
        // await saveCriticalNewHirePDF(googleUser)

        // console.log('User %s updated with ID %s.', user.primaryEmail, user.id)
        resolve({ user, action: 'update' })
        return true
      })
      .catch(async (err) => {
        console.log(`AdminDirectory. User NOT FOUND by query PRIMARY EMAIL`, err)
        console.log('Creating AdminDirectory.User...')
        const user = await insertUser(googleUserObj)
        await createJustListedFilter(googleUserObj)
        await createAgentDigestFilter(googleUserObj)
        await sendNewHireEmail(googleUserObj)
        await saveCriticalNewHirePDF(googleUser)
        await sendWelcomeEmail(googleUserObj)
        await saveUserSignature(googleUserObj)
        await addUserToCompanyCalendar(googleUserObj.primaryEmail as string)
        resolve({ user, action: 'insert' })
      })
  })
}

export default upsertUser
