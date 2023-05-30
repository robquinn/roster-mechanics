import { describe, expect, it, jest } from '@jest/globals'
import removeUser from '../../../../../src/libs/google-apps/admin/remove-user'

import { sampleUser6 } from '../../../../samples/users'

describe('removeUser', () => {
  it('should print successful statement to log', () => {
    const logSpy = jest.spyOn(console, 'log')
    removeUser(sampleUser6())
    expect(logSpy).toHaveBeenCalledWith('User %s deleted with ID %s.', sampleUser6().primaryEmail, sampleUser6().id)
  })
})
