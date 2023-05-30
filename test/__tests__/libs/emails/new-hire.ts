import { describe, expect, it, jest } from '@jest/globals'
import NewHireEmail from '../../../../src/libs/emails/new-hire'
import { sampleUser5 } from '../../../samples/users'
import RussLyonConfig from '../../../../src/config/company/russ-lyon'
import getActualOffice from '../../../../src/libs/utils/general/get-actual-office'

describe('NewHireEmail', () => {
  const newHireEmail = new NewHireEmail(sampleUser5())
  it('should be an instance of "NewHireEmail"', () => {
    expect(newHireEmail).toBeInstanceOf(NewHireEmail)
  })
  it('should call "getSubject" & "getMessageHtml" & "getMessagePlainText" when calling "newHireEmail.send()"', async () => {
    const getSubjectSpy = jest.spyOn(Object.getPrototypeOf(newHireEmail), 'getSubject')
    const getMessageHtmlSpy = jest.spyOn(Object.getPrototypeOf(newHireEmail), 'getMessageHtml')
    const getMessagePlainTextSpy = jest.spyOn(Object.getPrototypeOf(newHireEmail), 'getMessagePlainText')

    await newHireEmail.send(['some.email@somecompany.com'])

    expect(getSubjectSpy).toHaveBeenCalled()
    expect(getMessageHtmlSpy).toHaveBeenCalled()
    expect(getMessagePlainTextSpy).toHaveBeenCalled()

    expect(newHireEmail).toBeInstanceOf(NewHireEmail)
  })
  it('should return correct emails object when calling "NewHireEmail.makeEmails()', async () => {
    const emailsConfig = (await RussLyonConfig).offices[
      await getActualOffice(sampleUser5().customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office)
    ].emails
    const emails = await NewHireEmail.makeEmails(emailsConfig)
    expect(emails).toEqual({
      allInOffice: emailsConfig.allInOffice,
      allAgentsInOffice: emailsConfig.allAgentsInOffice,
      emails: emailsConfig.emails.join(';'),
      emailsCc: emailsConfig.emailsCc.join(';'),
    })
  })
  it('should return greeting when calling "NewHireEmail.getGreeting()', async () => {
    const time = new Date().getHours()
    let expectedGreeting
    if (time < 12) {
      expectedGreeting = 'Good Morning,'
    } else if (time < 17) {
      expectedGreeting = 'Good Afternoon,'
    } else {
      expectedGreeting = 'Good Evening,'
    }
    const receivedGreeting = await NewHireEmail.getGreeting()
    expect(receivedGreeting).toBe(expectedGreeting)
  })
})
