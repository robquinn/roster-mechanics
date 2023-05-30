import { afterEach, describe, expect, it, jest } from '@jest/globals'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import NewHireEmail from '../../../../../src/libs/emails/new-hire'
import handleReHire from '../../../../../src/libs/wrapper/company/handle-rehire'
import { sampleUser1, sampleUser3 } from '../../../../samples/users'

type ICustomSchema = RosterMechanics.GoogleApps.Admin.Schema.ICustomSchema

afterEach(() => {
  jest.resetAllMocks()
})

describe('handleReHire', () => {
  it('should modify "sampleUser.suspended === false" when "Re-Hire === true"', async () => {
    const sampleUser = { ...sampleUser1() }
    ;(sampleUser.customSchemas as ICustomSchema).Roster['Re-Hire'] = true
    sampleUser.suspended = true
    const recievedSampleUser = await handleReHire(sampleUser)
    expect(recievedSampleUser.suspended).toBe(false)
  })
  it('should call "newHireEmail.send()" with proper args when "Re-Hire === true" and user IS IN testing users', async () => {
    // sampleUser1 is in testing users
    const sampleUser = { ...sampleUser1() }
    ;(sampleUser.customSchemas as ICustomSchema).Roster['Re-Hire'] = true
    const newHireEmail = new NewHireEmail(sampleUser)
    const newHireEmailSpy = jest.spyOn(Object.getPrototypeOf(newHireEmail), 'send')

    await handleReHire(sampleUser)

    expect(newHireEmailSpy).toHaveBeenCalledTimes(1)
    expect(newHireEmailSpy).toHaveBeenCalledWith(['rob@russlyon.com'])
  })
  it('should call "newHireEmail.send()" with proper args when "Re-Hire === true" and user IS NOT IN testing users', async () => {
    // sampleUser3 is not in testing users
    const sampleUser = { ...sampleUser3() }
    ;(sampleUser.customSchemas as ICustomSchema).Roster['Re-Hire'] = true
    const newHireEmail = new NewHireEmail({ ...sampleUser })
    const newHireEmailSpy = jest.spyOn(Object.getPrototypeOf(newHireEmail), 'send')

    await handleReHire({ ...sampleUser })

    expect(newHireEmailSpy).toHaveBeenCalledTimes(1)
    expect(newHireEmailSpy).toHaveBeenCalledWith((await RussLyonConfig).newHire.emails)
  })
  it('should simply resolve the given user when "Re-Hire === false"', async () => {
    const sampleUser = { ...sampleUser3() }
    ;(sampleUser.customSchemas as ICustomSchema).Roster['Re-Hire'] = false

    const recievedSampleUser = await handleReHire({ ...sampleUser })

    expect(recievedSampleUser).toEqual(sampleUser)
  })
})
