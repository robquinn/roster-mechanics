import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import spreadsheetWriter from '../../../../../src/libs/google-apps/sheet/sheet-writer'
import GoogleSheetsConfig from '../../../../../src/config/google/sheets'
import Roster from '../../../../../src/libs/google-apps/sheet/roster-sheet'
import GoogleSheet from '../../../../../src/libs/google-apps/sheet/google-sheet'
import * as sortAlphabetically from '../../../../../src/libs/utils/format/sort-alphabetically'
import usersArr from '../../../../samples/users'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'

let notSuspendedUsers: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

beforeAll(async () => {
  const notSupended = async (): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
    return await new Promise((resolve) => {
      let users = usersArr
      users = users.filter((user) => user.suspended === false)
      users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
      users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
      users = users.filter((user) => user.orgUnitPath === '/')
      resolve(orderUsersByGivenName(users))
    })
  }
  notSuspendedUsers = await notSupended()
})

describe('spreadsheetWriter', () => {
  it('should call "sortAlphabetically" & "new Roster().getSheet()" & "new GoogleSheet().setValues()"', async () => {
    const sheetName = 'admin'
    const firstNameCol = 4
    const lastNameCol = 5
    const roster = new Roster(notSuspendedUsers)
    const rosterSpy = jest.spyOn(roster, 'getSheet')
    const sortAlphabeticallySpy = jest.spyOn(sortAlphabetically, 'default')
    // const googleSheet = new GoogleSheet({
    //   sheetName: GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.adminRoster.sheetName,
    //   sheetId: GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.adminRoster.sheetId,
    // })
    const googleSheetSpy = jest.spyOn(GoogleSheet.prototype, 'setValues')

    await spreadsheetWriter({
      roster,
      name: sheetName,
      settings: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.adminRoster,
      firstNameCol,
      lastNameCol,
    })

    expect(rosterSpy).toHaveBeenCalledTimes(1)
    expect(rosterSpy).toHaveBeenCalledWith(sheetName)

    // make sure to call after rosterSpy
    const sheetRows = await roster.getSheet(sheetName)

    expect(sortAlphabeticallySpy).toHaveBeenCalledTimes(1)
    expect(sortAlphabeticallySpy).toHaveBeenCalledWith({
      array: sheetRows,
      firstNameCol,
      lastNameCol,
    })

    // make sure to call after sortAlphabeticallySpy
    const sortedSheetRows = await sortAlphabetically.default({
      array: sheetRows as string[][],
      firstNameCol,
      lastNameCol,
    })

    expect(googleSheetSpy).toHaveBeenCalledTimes(1)
    expect(googleSheetSpy).toHaveBeenCalledWith(sortedSheetRows)
  })
})
