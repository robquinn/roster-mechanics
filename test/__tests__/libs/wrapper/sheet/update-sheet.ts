import { describe, expect, it, jest } from '@jest/globals'
import * as spreadsheetWriter from '../../../../../src/libs/google-apps/sheet/sheet-writer'
import * as RussLyonDomainUsers from '../../../../../src/libs/utils/cache/russ-lyon-domain-users'
import updateSheet from '../../../../../src/libs/wrapper/sheet/update-sheet'

describe('updateSheet', () => {
  it('should call "RussLyonDomainUsers" & "spreadsheetWriter"', async () => {
    const RussLyonDomainUsersSpy = jest.spyOn(RussLyonDomainUsers, 'default')
    const spreadsheetWriterSpy = jest.spyOn(spreadsheetWriter, 'default')
    const logSpy = jest.spyOn(console, 'log')

    await updateSheet()

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/SHEET APP STARTED - .*/))
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/SHEET APP ENDED - .*/))
    expect(RussLyonDomainUsersSpy).toHaveBeenCalled()
    expect(spreadsheetWriterSpy).toHaveBeenCalledTimes(4)
  })
})
