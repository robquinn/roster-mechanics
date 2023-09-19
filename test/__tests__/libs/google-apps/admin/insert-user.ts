import { describe, expect, it, jest } from '@jest/globals'
import * as insertUserAsMember from '../../../../../src/libs/google-apps/admin/insert-user-as-member'
import * as getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'
import insertUser from '../../../../../src/libs/google-apps/admin/insert-user'

import { sampleUser2 } from '../../../../samples/users'

describe('insertUser', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')
    await insertUser(sampleUser2())
    expect(logSpy).toHaveBeenCalledWith('User %s created with ID %s.', sampleUser2().primaryEmail, sampleUser2().id)
  })
  it('should call insertUserAsMember', async () => {
    const spyOnInsertUserAsMember = jest.spyOn(insertUserAsMember, 'default')
    await insertUser(sampleUser2())
    expect(spyOnInsertUserAsMember).toHaveBeenCalledTimes(3)
  })
  it('should call getActualOffice', async () => {
    const spyOnGetActualOffice = jest.spyOn(getActualOffice, 'default')
    await insertUser(sampleUser2())
    expect(spyOnGetActualOffice).toHaveBeenCalledTimes(1)
    expect(spyOnGetActualOffice).toHaveBeenCalledWith(sampleUser2().customSchemas?.Roster.Office)
  })
})
