import saveSheetToGoogleDrive from '../../google-apps/drive/save-sheet-to-google-drive'

const backupSheet: RosterMechanics.Wrapper.Sheet.Fn.BackupSheet = async (): Promise<void> => {
  console.log(`BACKING UP SHEET START - ${new Date(Date.now()).toString()}`)
  await saveSheetToGoogleDrive()
  console.log(`BACKING UP SHEET END - ${new Date(Date.now()).toString()}`)
}

export default backupSheet
