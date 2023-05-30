import { describe, expect, it, jest } from '@jest/globals'
import savePDFtoSharedDrive from '../../../../../src/libs/google-apps/drive/save-pdf-to-shared-drive'
import { sampleUser1, sampleUser2 } from '../../../../samples/users'

describe('savePDFtoSharedDrive', () => {
  it('should call console log with correct message if successful', () => {
    const logSpy = jest.spyOn(console, 'log')
    const firstName = sampleUser1().name?.givenName as string
    const lastName = sampleUser2().name?.familyName as string
    const licenseNumber = sampleUser1().customSchemas?.Roster.License_Number as string
    const topFolderName = '#RL - Agent Paperwork'

    savePDFtoSharedDrive({
      fileId: '234234lkjasdflijoi23j4oijasfoij3',
      folderId: '234234lkjasdflijoi23j4oijasfoij3',
      firstName,
      lastName,
      licenseNumber,
      topFolderName,
    })

    const nameOfNameFolder = `${lastName}, ${firstName} ${licenseNumber ?? 'N/A'}`
    expect(logSpy).toHaveBeenCalledWith('savePDFtoSharedDrive nameOfNameFolder', nameOfNameFolder)

    const nameOfFile = `${lastName} Critical New Hire Form.pdf`
    expect(logSpy).toHaveBeenCalledWith('savePDFtoSharedDrive nameOfFile', nameOfFile)
  })
})
