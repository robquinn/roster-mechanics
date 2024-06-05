declare namespace RosterMechanics {
  namespace GoogleApps {
    namespace Drive {
      namespace Fn {
        type GetTargetFolder = ({
          folderToSearch,
          targetFolderName,
        }: {
          folderToSearch: GoogleAppsScript.Drive.Folder
          targetFolderName: string
        }) => Promise<GoogleAppsScript.Drive.Folder | null>
        type SavePDFtoSharedDrive = ({
          fileId,
          folderId,
          firstName,
          lastName,
          licenseNumber,
          topFolderName,
          secondLevelFolder,
        }: {
          fileId: string | null
          folderId: string
          firstName: string
          lastName: string
          licenseNumber: string
          topFolderName: string
          secondLevelFolder: string | null
        }) => void
        type SaveSheetToGoogleDrive = () => Promise<void>
      }
    }
  }
}
