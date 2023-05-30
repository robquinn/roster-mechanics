import { describe, expect, it, jest } from '@jest/globals'
import * as saveSheetToGoogleDrive from '../../../../../src/libs/google-apps/drive/save-sheet-to-google-drive'
import backupSheet from '../../../../../src/libs/wrapper/sheet/backup-sheet'

describe('backupSheet', () => {
  it('should call "saveSheetToGoogleDrive" and call console.log() with correct args', async () => {
    const saveSheetToGoogleDriveSpy = jest.spyOn(saveSheetToGoogleDrive, 'default')
    const logSpy = jest.spyOn(console, 'log')

    await backupSheet()

    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/BACKING UP SHEET START - .*/))
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/Saved Sheet To Google Drive .*/))
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/BACKING UP SHEET END - .*/))
    expect(saveSheetToGoogleDriveSpy).toHaveBeenCalled()
  })
})
