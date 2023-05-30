import RussLyonConfig from '../../../config/company/russ-lyon'
import savePDFtoSharedDrive from '../../google-apps/drive/save-pdf-to-shared-drive'

const saveCriticalNewHirePDF: RosterMechanics.Wrapper.Drive.Fn.SaveCriticalNewHirePDF = async (
  googleUser: RosterMechanics.GoogleApps.Admin.IGoogleUser,
): Promise<void> => {
  if (!(await RussLyonConfig).users.testing.includes(googleUser.getUser().primaryEmail as string)) {
    savePDFtoSharedDrive({
      fileId: googleUser.getAgentActionPDF()[0],
      folderId: (await RussLyonConfig).accounting.drives.shared.folderId,
      firstName: googleUser.getUser().name?.givenName as string,
      lastName: googleUser.getUser().name?.familyName as string,
      licenseNumber: googleUser.getUser().customSchemas?.Roster.License_Number as string,
      topFolderName: '#RL - Agent Paperwork',
    })
  }
  await Promise.resolve()
}

export default saveCriticalNewHirePDF
