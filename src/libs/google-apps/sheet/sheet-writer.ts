import GoogleSheet from './google-sheet'
import sortAlphabetically from '../../utils/format/sort-alphabetically'

const spreadsheetWriter: RosterMechanics.GoogleApps.Sheet.Fn.SpreadsheetWriter = async ({
  roster,
  name,
  settings,
  firstNameCol,
  lastNameCol,
}: {
  roster: RosterMechanics.GoogleApps.Sheet.IRoster
  name: RosterMechanics.GoogleApps.Sheet.Roster.Sheets.Types
  settings: RosterMechanics.Config.Google.Worksheet
  firstNameCol: number
  lastNameCol: number
}): Promise<void> => {
  const sheet = new GoogleSheet(settings)
  const sheetRows = await roster.getSheet(name)
  const sortedSheetRows = await sortAlphabetically({
    array: sheetRows as string[][],
    firstNameCol,
    lastNameCol,
  })
  await sheet.setValues(sortedSheetRows)
  SpreadsheetApp.flush()
  const rosterName = `${name} ROSTER`
  console.log(`${rosterName} - ${new Date(Date.now()).toString()}`)
}

export default spreadsheetWriter
