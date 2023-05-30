import GoogleFormsConfig from '../../../config/google/forms'
import upsertUser from '../../google-apps/admin/upsert-user'
import GoogleFormHireUpdate from '../../google-apps/form/google-form-hire-update'
import GoogleUser from '../../google-apps/admin/google-user'
import isProd from '../../utils/general/is-prod'
import exponentialBackoffAsync from '../../utils/general/exponential-backoff-async'

const onFormSubmitHireUpdate: RosterMechanics.Wrapper.Form.Fn.OnFormSubmitHireUpdate = async (): Promise<void> => {
  console.log(`FORM APP HIRE/UPDATE STARTED - ${new Date(Date.now()).toString()}`)
  const googleForm = new GoogleFormHireUpdate((await GoogleFormsConfig).forms.hireUpdate.formId)

  let latestResponse: RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject
  try {
    latestResponse = (await exponentialBackoffAsync({
      action: async () =>
        await googleForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.HireUpdate>(),
      maxNumTries: 7,
      name: 'HandleFormSubmission',
    })) as RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject
    console.log('latestResponseHireUpdate: %s', JSON.stringify(latestResponse))
  } catch (err) {
    console.log(err)
    throw new Error(
      "Google is busy and wouldn't answer the request for the latest form response, or answered it with an error." +
        "\nThis error is on google's end, and there isn't much you can do." +
        '\nThe request was tried with exponential backoff 5 different times without success.',
    )
  }

  const googleUser = new GoogleUser(latestResponse)
  await googleUser.init()

  const { user, action } = await upsertUser(googleUser)

  console.log(`Upsert Success: ${user.primaryEmail as string}`)
  console.log(`FORM APP HIRE/UPDATE ENDED - ${new Date(Date.now()).toString()}`)

  if (action === 'insert') {
    if (await isProd()) {
      /* @ts-expect-error The function is defined in the environment that this project is deployed to */
      await (RosterMechanicsSheetADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).clearUserCacheAndUpdateSheet()
    } else {
      /* @ts-expect-error The function is defined in the environment that this project is deployed to */
      await (TESTRosterMechanicsADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).clearUserCacheAndUpdateSheet()
    }
  }

  if (action === 'update') {
    if (await isProd()) {
      /* @ts-expect-error The function is defined in the environment that this project is deployed to */
      await (RosterMechanicsSheetADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).updateSheet({
        googleAdminUser: user,
        action: 'update',
      })
    } else {
      /* @ts-expect-error The function is defined in the environment that this project is deployed to */
      await (TESTRosterMechanicsADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).updateSheet({
        googleAdminUser: user,
        action: 'update',
      })
    }
  }
  // .then((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => {
  //   return true
  // })
  // .catch((err) => {
  //   console.log(`upsert error`, err)
  // })
}

export default onFormSubmitHireUpdate
