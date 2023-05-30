import { describe, expect, it, jest } from '@jest/globals'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import addRlsirCalendar from '../../../../../src/libs/google-apps/calendar/add-rlsir-calendar'
import { sampleUser1 } from '../../../../samples/users'

describe('addRlsirCalendar', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')
    await addRlsirCalendar(sampleUser1())
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith(
      'The user (%s) was successfully added to calendar with id (%s)',
      sampleUser1().primaryEmail,
      (await RussLyonConfig).calendars.company.calendarId,
    )
  })
})
