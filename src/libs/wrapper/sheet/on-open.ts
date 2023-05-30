import clearUserCacheAndUpdateSheet from './clear-user-cache-and-update'

const onSpreadsheetOpen: RosterMechanics.Wrapper.Sheet.Fn.OnSpreadsheetOpen = async (): Promise<void> => {
  const spreadsheet = SpreadsheetApp.getActive()
  const menuItems = [
    {
      name: 'Pull Google Admin Data (Clear Cache & Refresh Sheet)',
      functionName: 'clearUserCacheAndUpdateSheet',
    },
    { name: 'Pull Most Recent Cache', functionName: 'updateSheet' },
    { name: 'Clear User Cache', functionName: 'clearUserCache' },
  ]
  spreadsheet.addMenu('Admin Tools', menuItems)
  await clearUserCacheAndUpdateSheet()
}

export default onSpreadsheetOpen
