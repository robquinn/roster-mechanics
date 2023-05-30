import { describe, expect, it, jest } from '@jest/globals'
import getSignatureHtml from '../../../../../src/libs/google-apps/gmail/get-signature-html'
import * as getSignatureOfficeInfo from '../../../../../src/libs/google-apps/gmail/get-signature-office-info'
import getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'

describe('getSignatureHtml', () => {
  const firstName = 'Mocha'
  const lastName = 'Banjo'
  const officeName = "Lyon's Den - PP"
  const phoneNumber = '602-000-0000'
  const emailAddress = 'mocha.banjo@russlyon.com'

  it('should call "getOfficeInfo"', async () => {
    const getSignatureOfficeInfoSpy = jest.spyOn(getSignatureOfficeInfo, 'default')
    await getSignatureHtml({
      firstName,
      lastName,
      officeName,
      phoneNumber,
      emailAddress,
    })
    expect(getSignatureOfficeInfoSpy).toHaveBeenCalledTimes(1)
    expect(getSignatureOfficeInfoSpy).toHaveBeenLastCalledWith(officeName)
  })
  it('should return signature html', async () => {
    const signatureHtml = await getSignatureHtml({
      firstName,
      lastName,
      officeName,
      phoneNumber,
      emailAddress,
    })
    expect(typeof signatureHtml).toBe('string')
    expect(signatureHtml.includes(firstName)).toBeTruthy()
    expect(signatureHtml.includes(lastName)).toBeTruthy()
    expect(signatureHtml.includes(await getActualOffice(officeName))).toBeTruthy()
    expect(signatureHtml.includes(phoneNumber)).toBeTruthy()
    expect(signatureHtml.includes(emailAddress)).toBeTruthy()
  })
})
