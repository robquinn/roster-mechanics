import { beforeAll, describe, expect, it } from '@jest/globals'
import GoogleSheetsConfig from '../../../../../src/config/google/sheets'
import GoogleSheet from '../../../../../src/libs/google-apps/sheet/google-sheet'
import SheetObject from '../../../../../src/libs/google-apps/sheet/sheet-object'

let sheetObject: RosterMechanics.GoogleApps.Sheet.ISheetObject

beforeAll(async () => {
  const googleSheet = new GoogleSheet({
    sheetName: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.adminRoster.sheetName,
    sheetId: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.adminRoster.sheetId,
  })
  sheetObject = new SheetObject(googleSheet)
})

describe('SheetObject', () => {
  it('should be an instance of SheetObject', () => {
    expect(sheetObject).toBeInstanceOf(SheetObject)
  })
  it('should read and write data', async () => {
    const data = [
      { 'First Name': 'Aaron', 'Last Name': 'Higley', Email: 'aaron.higley@somecompany.com' },
      { 'First Name': 'Bob', 'Last Name': 'Barrow', Email: 'bob.barrow@somecompany.com' },
      { 'First Name': 'Debora', 'Last Name': 'Smith', Email: 'debora.smith@somecompany.com' },
    ]
    await sheetObject.writeData(data)
    expect(await sheetObject.readData()).toEqual(data)
  })
})
