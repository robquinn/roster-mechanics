import GoogleFormsConfig from '../../../config/google/forms'
import suspendOrUnsuspendUser from '../../google-apps/admin/suspend-or-unsuspend-user'
import GoogleFormSuspend from '../../google-apps/form/google-form-suspend'
import isProd from '../../utils/general/is-prod'

const onFormSubmitSuspend: RosterMechanics.Wrapper.Form.Fn.OnFormSubmitSuspend = async (): Promise<void> => {
  console.log(`FORM APP SUSPEND STARTED - ${new Date(Date.now()).toString()}`)

  const suspendForm = new GoogleFormSuspend((await GoogleFormsConfig).forms.suspend.formId)
  const latestResponse = await suspendForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.Suspend>()

  console.log('latestResponseSuspend: %s', JSON.stringify(latestResponse))

  const suspendedUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = await suspendOrUnsuspendUser(latestResponse)

  console.log('User updated. updating sheet.')

  if (await isProd()) {
    /* @ts-expect-error The function is defined in the environment that this project is deployed to */
    await (RosterMechanicsSheetADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).updateSheet({
      googleAdminUser: suspendedUser,
      action: 'update',
    })
  } else {
    /* @ts-expect-error The function is defined in the environment that this project is deployed to */
    await (TESTRosterMechanicsADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).updateSheet({
      googleAdminUser: suspendedUser,
      action: 'update',
    })
  }
  console.log(`FORM APP SUSPEND ENDED - ${new Date(Date.now()).toString()}`)
}

export default onFormSubmitSuspend
