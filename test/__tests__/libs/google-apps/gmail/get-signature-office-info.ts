import { describe, expect, it, jest } from '@jest/globals'
import getSignatureOfficeInfo from '../../../../../src/libs/google-apps/gmail/get-signature-office-info'
import * as getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'

describe('getSignatureOfficeInfo', () => {
  const officeName = "Lyon's Den - PP"

  it('should call "getAcutalOffice"', async () => {
    const getActualOfficeSpy = jest.spyOn(getActualOffice, 'default')
    await getSignatureOfficeInfo(officeName)
    expect(getActualOfficeSpy).toHaveBeenCalledTimes(1)
    expect(getActualOfficeSpy).toHaveBeenLastCalledWith(officeName)
  })
  it('should return signature office info', async () => {
    const officeInfo = await getSignatureOfficeInfo(officeName)
    const actualOffice = await getActualOffice.default(officeName)
    expect(typeof officeInfo).toBe('object')
    expect(officeInfo.address.city).toBe((await RussLyonConfig).offices[actualOffice].address.city)
    expect(officeInfo.address.state).toBe((await RussLyonConfig).offices[actualOffice].address.state)
    expect(officeInfo.address.street).toBe((await RussLyonConfig).offices[actualOffice].address.street)
    expect(officeInfo.address.zip).toBe((await RussLyonConfig).offices[actualOffice].address.zip)
    expect(officeInfo.link).toBe((await RussLyonConfig).offices[actualOffice].link)
  })
})
