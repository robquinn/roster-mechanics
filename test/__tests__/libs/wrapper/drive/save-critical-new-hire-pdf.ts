import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import GoogleUser from '../../../../../src/libs/google-apps/admin/google-user'
import * as savePDFtoSharedDrive from '../../../../../src/libs/google-apps/drive/save-pdf-to-shared-drive'
import saveCriticalNewHirePDF from '../../../../../src/libs/wrapper/drive/save-critical-new-hire-pdf'
import { formResponseObject3 } from '../../../../samples/form-responses'

let formResponseObject: RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject
let googleUser: RosterMechanics.GoogleApps.Admin.IGoogleUser

beforeAll(async () => {
  // must be formResponseObject3 as this user doesn't exist in testing users
  formResponseObject = formResponseObject3()
  googleUser = new GoogleUser(formResponseObject)
  await googleUser.init()
})

describe('saveCriticalNewHirePDF', () => {
  it('should call "googleUser.getUser()" & "googleUser.getAgentActionPDF()""', async () => {
    const getUserSpy = jest.spyOn(Object.getPrototypeOf(googleUser), 'getUser')
    const getAgentActionPDFSpy = jest.spyOn(Object.getPrototypeOf(googleUser), 'getAgentActionPDF')

    await saveCriticalNewHirePDF(googleUser)

    expect(getUserSpy).toHaveBeenCalledTimes(4)
    expect(getAgentActionPDFSpy).toHaveBeenCalledTimes(1)
  })
  it('should call "savePDFtoSharedDrive" with proper args', async () => {
    const savePDFtoSharedDriveSpy = jest.spyOn(savePDFtoSharedDrive, 'default')

    await saveCriticalNewHirePDF(googleUser)

    expect(savePDFtoSharedDriveSpy).toHaveBeenCalledTimes(1)

    expect(savePDFtoSharedDriveSpy).toHaveBeenCalledWith({
      fileId: googleUser.getAgentActionPDF()[0],
      folderId: (await RussLyonConfig).accounting.drives.shared.folderId,
      firstName: googleUser.getUser().name?.givenName as string,
      lastName: googleUser.getUser().name?.familyName as string,
      licenseNumber: googleUser.getUser().customSchemas?.Roster.License_Number as string,
      topFolderName: '#RL - Agent Paperwork',
    })
  })
})
