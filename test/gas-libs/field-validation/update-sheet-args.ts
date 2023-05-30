import userFieldValidation from '../../gas/utils/admin-directory/user-field-validation'

const RMUpdateSheetFieldValidation: RosterMechanics.Test.RosterMechanicsSheetADMIN.Fn.RMUpdateSheetFieldValidation = (
  args?: RosterMechanics.Utils.Cache.CacheArgs,
): void => {
  if (args?.googleAdminUser != null) {
    userFieldValidation(args.googleAdminUser)
  }
  if (args?.action !== 'delete' && args?.action !== 'update' && args?.action !== 'insert') {
    throw new Error(
      'RosterMechanicsSheetADMIN updateSheet args field action should be undefined or "delete" or "update" or "insert"',
    )
  }
}
export default RMUpdateSheetFieldValidation
