import { describe, expect, it, jest } from '@jest/globals'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import addUserToCompanyCalendar from '../../../../../src/libs/google-apps/calendar/add-user-to-company-calendar'
import { sampleUser1 } from '../../../../samples/users'

describe('addUserToCompanyCalendar', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')
    await addUserToCompanyCalendar(sampleUser1().primaryEmail as string)
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith(
      'The user (%s) was successfully added to calendar with id (%s)',
      sampleUser1().primaryEmail,
      (await RussLyonConfig).calendars.company.calendarId,
    )
  })
})
