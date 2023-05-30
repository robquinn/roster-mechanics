import { describe, expect, it, jest } from '@jest/globals'
import WelcomeEmail from '../../../../src/libs/emails/welcome'
import { sampleUser5 } from '../../../samples/users'

describe('WelcomeEmail', () => {
  const welcomeEmail = new WelcomeEmail(sampleUser5())
  it('should be an instance of "NewHireEmail"', () => {
    expect(welcomeEmail).toBeInstanceOf(WelcomeEmail)
  })
  it('should call "getHtml" when calling "welcomeEmail.send()"', () => {
    const getHtmlSpy = jest.spyOn(WelcomeEmail, 'getHtml')

    welcomeEmail.send({ to: 'to.email@somecompany.com', from: 'from.email@somecompany.com' })

    expect(getHtmlSpy).toHaveBeenCalled()
  })
  it('should return correct html when calling "WelcomeEmail.getHtml()"', () => {
    const lastName = sampleUser5().name?.familyName as string
    const preferredName = sampleUser5().customSchemas?.Roster.Preferred_Name as string
    const html = WelcomeEmail.getHtml({
      last: lastName,
      preferredName,
    })

    expect(typeof html === 'string').toBe(true)
    expect(html.length > 100).toBe(true)
    expect(html.includes(lastName.toLowerCase())).toBe(true)
    expect(html.includes(preferredName)).toBe(true)
  })
})
