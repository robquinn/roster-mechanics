import { beforeAll, describe, expect, it } from '@jest/globals'
import GoogleSheet from '../../../../../src/libs/google-apps/sheet/google-sheet'
import GoogleSheetsConfig from '../../../../../src/config/google/sheets'

let googleSheet: RosterMechanics.GoogleApps.Sheet.IGoogleSheet

beforeAll(async () => {
  googleSheet = new GoogleSheet({
    sheetName: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.adminRoster.sheetName,
    sheetId: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.adminRoster.sheetId,
  })
})
describe('GoogleSheet', () => {
  it('should be an instance of GoogleSheet', () => {
    expect(googleSheet).toBeInstanceOf(GoogleSheet)
  })
  it('should have methods "setValues" and "getValues" that are functioning', async () => {
    const values = [
      ['other value 1', 'other value 2', 'other value 3'],
      ['some value 1', 'some value 2', 'some value 3'],
      ['another value 1', 'another value 2', 'another value 3'],
    ]
    await googleSheet.setValues(values)
    expect(await googleSheet.getValues()).toEqual(values)
  })
  it('should have method "getColByName" that is functioning', async () => {
    const values = [
      ['First Name', 'Last Name', 'Role'],
      ['Barb', 'Wallander', 'Office Assistant'],
      ['Mike', 'Smith', 'Branch Manager'],
      ['Aaron', 'Johnston', 'Sales Associate'],
    ]
    await googleSheet.setValues(values)

    expect(await googleSheet.getColByName('Last Name')).toBe(1)
  })
  it('should have method "sortByColName" that is functioning', async () => {
    const values = [
      ['First Name', 'Last Name', 'Role'],
      ['Barb', 'Wallander', 'Office Assistant'],
      ['Mike', 'Smith', 'Branch Manager'],
      ['Aaron', 'Johnston', 'Sales Associate'],
    ]
    const sortedValuesByFirstName = [
      // ['First Name', 'Last Name', 'Role'],
      ['Aaron', 'Johnston', 'Sales Associate'],
      ['Barb', 'Wallander', 'Office Assistant'],
      ['Mike', 'Smith', 'Branch Manager'],
    ]
    await googleSheet.setValues(values)
    const receivedValues1 = await googleSheet.getValues()
    console.log('receivedValues1', receivedValues1)

    await googleSheet.sortByColName('First Name')

    expect(await googleSheet.getValues()).toEqual(sortedValuesByFirstName)
  })
})
