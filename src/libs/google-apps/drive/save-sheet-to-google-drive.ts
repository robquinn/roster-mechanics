import isProd from '../../utils/general/is-prod'

const saveSheetToGoogleDrive: RosterMechanics.GoogleApps.Drive.Fn.SaveSheetToGoogleDrive = async (): Promise<void> => {
  const sheetId = (await isProd()) ? process.env.GOOGLE_WORKBOOK_ID_PROD : process.env.GOOGLE_WORKBOOK_ID_DEV
  let formattedDate = Utilities.formatDate(new Date(), 'MST', 'MM/dd/yyyy HH:mm') // eslint-disable-line
  const spreadsheetNamePrefix = `Roster Mechanics (Sheet - ADMIN - ${formattedDate})`
  const spreadsheetName = (await isProd()) ? spreadsheetNamePrefix : `TEST -> ${spreadsheetNamePrefix}`
  const backupFolderId = (await isProd())
    ? process.env.GOOGLE_DRIVE_SHEET_APP_BACKUP_FOLDER_ID_PROD
    : process.env.GOOGLE_DRIVE_SHEET_APP_BACKUP_FOLDER_ID_DEV
  const destination = DriveApp.getFolderById(backupFolderId as string)
  const url = `https://docs.google.com/feeds/download/spreadsheets/Export?key=${sheetId as string}&exportFormat=xlsx`
  const blob = UrlFetchApp.fetch(url, {
    headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
  }).getBlob()
  blob.setName(`${spreadsheetName}.xlsx`)
  destination.createFile(blob)
  console.log(`Saved Sheet To Google Drive (${spreadsheetName})`)
}

export default saveSheetToGoogleDrive
