import { describe, expect, it, jest } from '@jest/globals'
import shareCalendar from '../../../../../src/libs/google-apps/calendar/share-calendar'
import { sampleUser1 } from '../../../../samples/users'

describe('shareCalendar', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')
    const aclRule = await shareCalendar(sampleUser1().primaryEmail as string)
    expect(logSpy).toHaveBeenCalledTimes(2)
    // expect(logSpy).toHaveBeenCalledWith('No ACL rule has been found for user (%s)', sampleUser1().email)
    expect(logSpy).toHaveBeenCalledWith('New ACL rule created for user (%s): %s', sampleUser1().primaryEmail, aclRule)
  })
})
