import GoogleFormsConfig from '../../../config/google/forms'
import deleteOrUndeleteUser from '../../google-apps/admin/delete-or-undelete-user'
// import deleteFormResponse from '../../google-apps/form/delete-form-response'
import GoogleFormDelete from '../../google-apps/form/google-form-delete'
import isProd from '../../utils/general/is-prod'

const onFormSubmitDelete: RosterMechanics.Wrapper.Form.Fn.OnFormSubmitDelete = async (): Promise<void> => {
  console.log(`FORM APP DELETE STARTED - ${new Date(Date.now()).toString()}`)

  const deleteForm = new GoogleFormDelete((await GoogleFormsConfig).forms.delete.formId)
  const latestResponse = await deleteForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.Delete>()
  console.log('latestResponseDelete: %s', JSON.stringify(latestResponse))

  const { user, action } = await deleteOrUndeleteUser(latestResponse)

  if (action === 'delete') console.log('User deleted, updating sheet.')
  if (action === 'update') console.log('User undeleted, updating sheet.')
  if (action === 'void') console.log('Could not undelete user.')

  if (user != null && (action === 'delete' || action === 'update')) {
    if (await isProd()) {
      /* @ts-expect-error The function is defined in the environment that this project is deployed to */
      await (RosterMechanicsSheetADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).updateSheet({
        googleAdminUser: user,
        action,
      })
    } else {
      /* @ts-expect-error The function is defined in the environment that this project is deployed to */
      await (TESTRosterMechanicsADMIN as RosterMechanics.Base.RosterMechanicsSheetADMIN).updateSheet({
        googleAdminUser: user,
        action,
      })
    }
  }
  console.log('Sheet updated.')
  // await deleteFormResponse({ email: latestResponse.email, formId: (await GoogleFormsConfig).forms.suspend.formId })
  // await deleteFormResponse({ email: latestResponse.email, formId: (await GoogleFormsConfig).forms.hireUpdate.formId })
  console.log(`FORM APP DELETE ENDED - ${new Date(Date.now()).toString()}`)
}

export default onFormSubmitDelete
