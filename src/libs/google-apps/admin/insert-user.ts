import RussLyonConfig from '../../../config/company/russ-lyon'
import getActualOffice from '../../utils/general/get-actual-office'
import insertUserAsMember from './insert-user-as-memeber'

const insertUser: RosterMechanics.GoogleApps.Admin.Fn.InsertUser = async (
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser> => {
  let newUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  const userToInsert = Object.assign(user, { password: 'Welcome123!', changePasswordAtNextLogin: true })
  const RussLyonConfigAwaited = await RussLyonConfig
  return await new Promise((resolve, reject) => {
    try {
      newUser =
        (AdminDirectory?.Users?.insert(userToInsert) as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) ?? null
      console.log('User %s created with ID %s.', newUser.primaryEmail, newUser.id)
      getActualOffice(newUser.customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office)
        .then((userOffice) => {
          if (userOffice === 'Corporate') {
            resolve(newUser)
            return true
          }

          const allInOfficeGroupEmail = RussLyonConfigAwaited.offices[userOffice].emails.allInOffice
          const allAgentsInOfficeGroupEmail = RussLyonConfigAwaited.offices[userOffice].emails.allAgentsInOffice
          insertUserAsMember({ user: newUser, groupEmail: allInOfficeGroupEmail })
          insertUserAsMember({ user: newUser, groupEmail: allAgentsInOfficeGroupEmail })
          // GoogleCalendar.addUserToCompanyCalendar({ email: newUser.primaryEmail })
          // GoogleCalendar.shareCalendar({ email: newUser.primaryEmail })
          // GoogleCalendar.addRlsirCalendar({ user: newUser })
          resolve(newUser)
          return true
        })
        .catch((err) => {
          console.log('insertUser catch ERROR', err)
        })
    } catch (err) {
      console.log(
        `Error Creating User (${user?.primaryEmail as string}) with ID (%s): %s.`,
        user.primaryEmail,
        user.primaryEmail,
        err,
      )
      reject(new Error(`Error Creating User (${user?.primaryEmail as string})`))
    }
  })
}

export default insertUser
