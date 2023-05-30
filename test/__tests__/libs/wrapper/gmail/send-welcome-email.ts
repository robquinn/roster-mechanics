import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import WelcomeEmail from '../../../../../src/libs/emails/welcome'
import * as isProd from '../../../../../src/libs/utils/general/is-prod'
import sendWelcomeEmail from '../../../../../src/libs/wrapper/gmail/send-welcome-email'
import { sampleUser1 } from '../../../../samples/users'

afterEach(() => {
  jest.resetAllMocks()
})

describe('sendWelcomeEmail', () => {
  const sendSpy = jest.spyOn(Object.getPrototypeOf(new WelcomeEmail(sampleUser1())), 'send')
  const isProdSpy = jest.spyOn(isProd, 'default')
  const sampleUser = sampleUser1()
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it('should call "welomeEmail.send()" with proper args when "isProd" is "true"', async () => {
    process.env.NODE_ENV = 'production'

    await sendWelcomeEmail(sampleUser)

    expect(isProdSpy).toHaveBeenCalled()
    expect(sendSpy).toHaveBeenCalled()
    expect(sendSpy).toHaveBeenCalledWith({ to: sampleUser.primaryEmail as string, from: 'welcome@russlyon.com' })
  })
  it('should call "welomeEmail.send()" with proper args when "isProd" is "false"', async () => {
    process.env.NODE_ENV = 'development'

    await sendWelcomeEmail(sampleUser)

    expect(isProdSpy).toHaveBeenCalled()
    expect(sendSpy).toHaveBeenCalled()
    expect(sendSpy).toHaveBeenCalledWith({
      to: sampleUser.primaryEmail as string,
      from: 'welcome-email@russlyon.com',
    })
  })
})
