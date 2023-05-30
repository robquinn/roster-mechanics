import { describe, expect, it, jest } from '@jest/globals'
import moment from 'moment'
import saveSheetToGoogleDrive from '../../../../../src/libs/google-apps/drive/save-sheet-to-google-drive'
import * as isProd from '../../../../../src/libs/utils/general/is-prod'

describe('saveSheetToGoogleDrive', () => {
  it('should call console log with correct message if successful as well call "idProd"', async () => {
    const spreadsheetNamePrefix = `Roster Mechanics (Sheet - ADMIN - ${moment(new Date()).format('M/D/YYYY hh:mm')})`
    const spreadsheetName = (await isProd.default()) ? spreadsheetNamePrefix : `TEST -> ${spreadsheetNamePrefix}`
    const isProdSpy = jest.spyOn(isProd, 'default')
    const logSpy = jest.spyOn(console, 'log')
    await saveSheetToGoogleDrive()
    expect(isProdSpy).toHaveBeenCalledTimes(3)
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenLastCalledWith(`Saved Sheet To Google Drive (${spreadsheetName})`)
  })
})
