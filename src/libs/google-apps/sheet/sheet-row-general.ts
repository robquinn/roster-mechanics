import ifNullThenEmptyElseValue from '../../utils/format/if-null-then-empty-else-value'
import ninjaOut from '../../utils/format/ninja-out'

const sheetRowGeneral: RosterMechanics.GoogleApps.Sheet.Fn.SheetRowGeneral = async (
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row> => {
  const ninja = await ninjaOut(user.customSchemas?.Roster.Ninja as string)

  const givenName = await ifNullThenEmptyElseValue(user?.name?.givenName)
  const familyName = await ifNullThenEmptyElseValue(user?.name?.familyName)
  const office = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Office)

  const phone = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Phone)
  const primaryEmail = await ifNullThenEmptyElseValue(user.primaryEmail)
  const role = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Role)

  return await new Promise((resolve, _reject) => {
    const row: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row = []
    row.push(givenName, familyName, office, ninja, phone, primaryEmail, role)
    resolve(row)
  })
}
export default sheetRowGeneral
