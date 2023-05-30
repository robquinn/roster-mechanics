import { describe, expect, it } from '@jest/globals'
import listAllUsersEmails from '../../../../../src/libs/google-apps/admin/list-all-user-emails'
import usersArr from '../../../../samples/users'

describe('listAllUsersEmails', () => {
  it('should call console log with correct message if successful', async () => {
    const emails = async (): Promise<string[]> => {
      return await new Promise((resolve) => {
        resolve(usersArr.map((u) => u.primaryEmail as string))
      })
    }
    const userEmailsExpected = await emails()
    // const logSpy = jest.spyOn(console, 'log')
    const userEmailsReceived = await listAllUsersEmails()
    expect(userEmailsReceived).toHaveLength(userEmailsExpected.length)
    expect(userEmailsReceived.sort()).toEqual(userEmailsExpected.sort())
  })
})
