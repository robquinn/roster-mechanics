import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import listNotSuspended from '../../../../../src/libs/google-apps/admin/list-not-suspended'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'
import usersArr from '../../../../samples/users'
import getEmails from '../../../../utils/get-emails'

let notSuspendedUsersExpected: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

beforeAll(async () => {
  const notSupended = async (): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
    return await new Promise((resolve) => {
      let users = usersArr
      users = users.filter((user) => user.suspended === false)
      users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
      users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
      users = users.filter((user) => user.orgUnitPath === '/')
      resolve(orderUsersByGivenName(users))
    })
  }

  notSuspendedUsersExpected = await notSupended()
  // jest.resetModules()
})

beforeEach(() => {
  jest.resetModules()
  jest.restoreAllMocks()
})
describe('listNotSuspended', () => {
  it('should return only users that are not suspended', async () => {
    const notSuspendedUsersReceieved = orderUsersByGivenName(await listNotSuspended())
    expect(notSuspendedUsersReceieved).toHaveLength(notSuspendedUsersExpected.length)
    const expectedEmails = await getEmails(notSuspendedUsersExpected)
    const recievedEmails = await getEmails(notSuspendedUsersReceieved)
    expect(expectedEmails).toEqual(recievedEmails)
  })
})
