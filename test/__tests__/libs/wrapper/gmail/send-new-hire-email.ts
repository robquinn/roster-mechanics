import { afterEach, describe, expect, it, jest } from '@jest/globals'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import NewHireEmail from '../../../../../src/libs/emails/new-hire'
import sendNewHireEmail from '../../../../../src/libs/wrapper/gmail/send-new-hire-email'
import { sampleUser1, sampleUser3 } from '../../../../samples/users'

afterEach(() => {
  jest.resetAllMocks()
})

describe('sendNewHireEmail', () => {
  const sendSpy = jest.spyOn(Object.getPrototypeOf(new NewHireEmail(sampleUser1())), 'send')

  it('should call "newHireEmail.send()" with proper args when "sampleUser" IS IN testing users', async () => {
    // sampleUser1 IS IN testing users
    const sampleUser = sampleUser1()

    await sendNewHireEmail(sampleUser)

    expect(sendSpy).toHaveBeenCalled()
    expect(sendSpy).toHaveBeenCalledWith(['rob@russlyon.com'])
  })
  it('should call "newHireEmail.send()" with proper args when "sampleUser" IS NOT IN testing users', async () => {
    // sampleUser3 IS NOT IN testing users
    const sampleUser = sampleUser3()

    await sendNewHireEmail(sampleUser)

    expect(sendSpy).toHaveBeenCalled()
    expect(sendSpy).toHaveBeenCalledWith((await RussLyonConfig).newHire.emails)
  })
})
