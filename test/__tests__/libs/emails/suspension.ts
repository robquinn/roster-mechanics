import { describe, expect, it, jest } from '@jest/globals'
import SuspensionEmail from '../../../../src/libs/emails/suspension'
import { sampleUser5 } from '../../../samples/users'

describe('SuspensionEmail', () => {
  const suspensionEmail = new SuspensionEmail(sampleUser5())
  it('should be an instance of "NewHireEmail"', () => {
    expect(suspensionEmail).toBeInstanceOf(SuspensionEmail)
  })
  it('should call "getHtml" when calling "suspensionEmail.send()"', async () => {
    const getHtmlSpy = jest.spyOn(SuspensionEmail, 'getHtml')

    await suspensionEmail.send()

    expect(getHtmlSpy).toHaveBeenCalled()
  })
  it('should return correct html when calling "SuspensionEmail.getHtml()"', async () => {
    const firstName = sampleUser5().name?.givenName as string
    const lastName = sampleUser5().name?.familyName as string
    const office = sampleUser5().customSchemas?.Roster.Office as string
    const board = sampleUser5().customSchemas?.Roster.Board as string

    const html = await SuspensionEmail.getHtml({
      firstName,
      lastName,
      office,
      board,
    })

    expect(typeof html === 'string').toBe(true)
    expect(html.length > 100).toBe(true)
    expect(html.includes(lastName.toUpperCase())).toBe(true)
    expect(html.includes(firstName.toUpperCase())).toBe(true)
    expect(html.includes(office)).toBe(true)
    expect(html.includes(board)).toBe(true)
  })
})
