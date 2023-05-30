const getTargetFolder: RosterMechanics.GoogleApps.Drive.Fn.GetTargetFolder = async ({
  folderToSearch,
  targetFolderName,
}: {
  folderToSearch: GoogleAppsScript.Drive.Folder
  targetFolderName: string
}): Promise<GoogleAppsScript.Drive.Folder | null> => {
  return await new Promise((resolve) => {
    ;(async () => {
      const parentFolderId = folderToSearch.getId()
      const childFolders = DriveApp.getFolderById(parentFolderId).getFolders()
      let childFolder
      const promises = []
      while (childFolders.hasNext()) {
        childFolder = childFolders.next()
        console.log('childfolder.getName()', childFolder.getName())
        if (childFolder.getName() === targetFolderName) {
          resolve(childFolder)
          return
        }
        promises.push(getTargetFolder({ folderToSearch: childFolder, targetFolderName }))
      }
      const subfolders = await Promise.all(promises)
      subfolders.forEach((subFolder) => {
        if (subFolder != null && subFolder.getName() === targetFolderName) {
          resolve(subFolder)
        }
      })
      resolve(null)
    })()
      .then((subFolderOrNull) => subFolderOrNull)
      .catch((err) => {
        console.log(err)
      })
  })
}

export default getTargetFolder
