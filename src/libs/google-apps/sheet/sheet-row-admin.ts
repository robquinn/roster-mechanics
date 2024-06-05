import dateIsoToAnsi from '../../utils/date/date-iso-to-ansi'
import calculateYears from '../../utils/date/calculate-years'
import ifNullThenEmptyElseValue from '../../utils/format/if-null-then-empty-else-value'
import licenseNumberHyperlink from '../../utils/format/license-number-hyperlink'
import ninjaOut from '../../utils/format/ninja-out'

const sheetRowAdmin: RosterMechanics.GoogleApps.Sheet.Fn.SheetRowAdmin = async (
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row> => {
  const hireDate: string = await dateIsoToAnsi(user.customSchemas?.Roster.Hire_Date as string)
  const dateLicensed: string = await dateIsoToAnsi(user.customSchemas?.Roster.Date_Licensed as string)
  const licenseExpirationDate: string = await dateIsoToAnsi(
    user.customSchemas?.Roster.License_Expiration_Date as string,
  )
  const yearsLicensed: string = await calculateYears(user.customSchemas?.Roster.Date_Licensed as string)
  const ninja = await ninjaOut(user.customSchemas?.Roster.Ninja as string)
  const ninjaAudit: string = await dateIsoToAnsi(user.customSchemas?.Roster.Ninja_Audit as string)
  // const reHireLastDateWithRlsir: string = await dateIsoToAnsi(user.customSchemas?.Roster['Re-Hire_Last_Date_with_RLSIR'])
  const licenseNum: string = await licenseNumberHyperlink({
    number: user.customSchemas?.Roster.License_Number as string,
    link: user.customSchemas?.Roster.ADRE_Link as string,
  })
  const dateFeesToStart: string = await dateIsoToAnsi(user.customSchemas?.Roster.Date_Fees_to_Start as string)

  const givenName = await ifNullThenEmptyElseValue(user.name?.givenName)
  const familyName = await ifNullThenEmptyElseValue(user.name?.familyName)
  const primaryEmail = await ifNullThenEmptyElseValue(user.primaryEmail)
  const preferredName = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Preferred_Name)
  const office = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Office)
  const role = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Role)
  const phone = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Phone)

  const loneWolfNumber = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Lone_Wolf_Number)
  const pcOrPllc = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.PC_or_PLLC)
  const board = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Board)
  const mlsId = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.MLS_ID)
  const board2 = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Board_2)
  const mlsId2 = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.MLS_ID_2)
  const board3 = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Board_3)
  const mlsId3 = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.MLS_ID_3)
  const reHire = await ifNullThenEmptyElseValue(user.customSchemas?.Roster['Re-Hire'])

  const reHireLastDateWithRlsir = await ifNullThenEmptyElseValue(
    user.customSchemas?.Roster['Re-Hire_Last_Date_with_RLSIR'],
  )
  const recruitedFrom = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Recruited_From)

  const severDate = await dateIsoToAnsi(user.customSchemas?.Roster.Sever_Date as string)
  const newBrokerage = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.New_Brokerage)
  const inactiveReason = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Inactive_Reason)
  const specialStatus = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Special_Status)

  const statusType = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Status_Type)
  const joiningTeam = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Joining_Team)
  const charge395 = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Charge_395)
  const monthlyFees = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Monthly_Fees)

  const notes = await ifNullThenEmptyElseValue(user.customSchemas?.Roster.Notes)

  return await new Promise((resolve) => {
    const row: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row = []
    row.push(
      user.customSchemas?.Roster.Updated_At as string,
      user.customSchemas?.Roster.Created_At as string,
      user.customSchemas?.Roster.Edit_Response_URL as string,
      hireDate,
      givenName,
      familyName,
      primaryEmail,
      preferredName,
      office,
      role,
      phone,
      dateLicensed,
      licenseNum,
      licenseExpirationDate,
      yearsLicensed,
      ninja,
      ninjaAudit,
      loneWolfNumber,
      pcOrPllc,
      board,
      mlsId,
      board2,
      mlsId2,
      board3,
      mlsId3,
      reHire,
      reHireLastDateWithRlsir,
      recruitedFrom,
      severDate,
      newBrokerage,
      inactiveReason,
      specialStatus,
      statusType,
      joiningTeam,
      // hireFee,
      charge395,
      monthlyFees,
      dateFeesToStart,
      notes,
    )
    resolve(row)
  })
}

export default sheetRowAdmin
