const savePDFtoSharedDrive: RosterMechanics.GoogleApps.Drive.Fn.SavePDFtoSharedDrive = ({
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
}): void => {
  console.log('savePDFtoSharedFolder new folderId =>', folderId)
  console.log('savePDFtoSharedFolder fileId', fileId)
  console.log('savePDFtoSharedFolder firstName', firstName)
  console.log('savePDFtoSharedFolder lastName', lastName)
  console.log('savePDFtoSharedFolder licenseNumber', licenseNumber)
  console.log('savePDFtoSharedFolder topFolder', topFolderName)
  console.log('savePDFtoSharedFolder secondLevelFolder', secondLevelFolder)

  let sharedDrive
  try {
    sharedDrive = DriveApp.getFolderById(folderId)
  } catch (err) {
    console.error('savePDFtoSharedDrive getFolderById', err)
    return
  }
  const topLevel = sharedDrive.getFoldersByName(topFolderName).next()
  console.log('savePDFtoSharedDrive topLevel', topLevel)

  let paperwork = topLevel
  if (secondLevelFolder != null && secondLevelFolder.length > 0) {
    paperwork = topLevel.getFoldersByName(secondLevelFolder).next()
  }

  console.log('savePDFtoSharedDrive paperwork', paperwork)
  const letter = paperwork.getFoldersByName(lastName.charAt(0).toUpperCase()).next()
  console.log('savePDFtoSharedDrive letter', letter)

  const nameOfNameFolder = `${lastName}, ${firstName} ${licenseNumber ?? 'N/A'}`
  const nameOfAdreFolder = `ADRE ${lastName}, ${firstName}`
  const nameOfNewHireFolder = `NEW HIRE DOCS ${lastName}, ${firstName}`

  console.log('savePDFtoSharedDrive nameOfNameFolder', nameOfNameFolder)
  const nameFolder = letter.getFoldersByName(nameOfNameFolder)
  console.log('saveToGoogleDrive nameFolder', nameFolder)
  const nameOfFile = `${lastName}, ${firstName} Critical New Hire Form.pdf`
  console.log('savePDFtoSharedDrive nameOfFile', nameOfFile)

  const createNameFolder = (blob?: GoogleAppsScript.Base.Blob): void => {
    let newNameFolder
    try {
      newNameFolder = letter.getFoldersByName(nameOfNameFolder).next()
    } catch (err) {
      newNameFolder = letter.createFolder(nameOfNameFolder)
    }
    try {
      newNameFolder.getFoldersByName(nameOfAdreFolder).next()
    } catch (err) {
      newNameFolder.createFolder(nameOfAdreFolder)
    }
    try {
      newNameFolder.getFoldersByName(nameOfNewHireFolder).next()
    } catch (err) {
      newNameFolder.createFolder(nameOfNewHireFolder)
    }
    console.log('savePDFtoSharedDrive newNameFolder', newNameFolder)

    if (blob != null) {
      if (!newNameFolder.getFilesByName(nameOfFile).hasNext()) {
        newNameFolder.createFile(blob).setName(nameOfFile)
      }
    }
  }

  if (fileId != null && fileId.length > 0) {
    const templateFile = DriveApp.getFileById(fileId)
    const blob = templateFile.getBlob().getAs('application/pdf')
    // if (nameFolder.hasNext()) {
    //   nameFolder.next().createFile(blob).setName(nameOfFile)
    // }
    createNameFolder(blob)
  } else {
    createNameFolder()
  }
}

export default savePDFtoSharedDrive
