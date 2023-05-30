import GoogleSheetsConfig from '../../../config/google/sheets'
import spreadsheetWriter from '../../google-apps/sheet/sheet-writer'
import RussLyonDomainUsers from '../../utils/cache/russ-lyon-domain-users'

const updateSheet: RosterMechanics.Wrapper.Sheet.Fn.UpdateSheet = async (
  args?: RosterMechanics.Utils.Cache.CacheArgs,
): Promise<void> => {
  console.log('Args Received: ', JSON.stringify(args))
  console.log(`SHEET APP STARTED - ${new Date(Date.now()).toString()}`)

  const { notSuspendedUsers, suspendedUsers, pseudoUsers } = await RussLyonDomainUsers(args)

  const spreadsheets: RosterMechanics.GoogleApps.Sheet.Writer.Sheet[] = [
    {
      roster: notSuspendedUsers,
      name: 'admin',
      settings: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.adminRoster,
      firstNameCol: 4,
      lastNameCol: 5,
    },
    {
      roster: notSuspendedUsers,
      name: 'general',
      settings: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.generalRoster,
      firstNameCol: 0,
      lastNameCol: 1,
    },
    {
      roster: suspendedUsers,
      name: 'suspension',
      settings: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.suspensionLog,
      firstNameCol: 4,
      lastNameCol: 5,
    },
    {
      roster: pseudoUsers,
      name: 'pseudo',
      settings: (await GoogleSheetsConfig).workbooks.rosterMechanics.worksheets.pseudoRoster,
      firstNameCol: 4,
      lastNameCol: 5,
    },
  ]

  const numberOfSpreadsheets = spreadsheets.length
  const results: Array<Promise<void>> = []
  for (let i = 0; i < numberOfSpreadsheets; i += 1) {
    const spreadsheet = spreadsheets[i]
    results.push(spreadsheetWriter(spreadsheet))
  }
  await Promise.all(results)
  console.log(`SHEET APP ENDED - ${new Date(Date.now()).toString()}`)
}

export default updateSheet
