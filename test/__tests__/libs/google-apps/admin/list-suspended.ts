import { beforeAll, describe, expect, it } from '@jest/globals'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'
import getUserAdminDirectoryView from '../../../../gas/utils/admin-directory/user-views'
import listSuspended from '../../../../../src/libs/google-apps/admin/list-suspended'
import usersArr from '../../../../samples/users'

let suspendedUsersExpected: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

beforeAll(async () => {
  const suspended = async (): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
    return await new Promise((resolve) => {
      let users = usersArr
      users = users.filter((user) => user.suspended === true)
      users = users.map((user) =>
        getUserAdminDirectoryView({
          customFieldMask: 'Roster',
          viewType: 'admin_view' as RosterMechanics.GoogleApps.Admin.Request.Params.Helpers.ViewType,
          projection: 'full',
          user,
        }),
      )
      resolve(orderUsersByGivenName(users))
    })
  }
  suspendedUsersExpected = await suspended()
})

describe('listSuspended', () => {
  it('should return only suspended users', async () => {
    const suspendedUsersReceieved = await listSuspended()
    expect(suspendedUsersReceieved).toHaveLength(suspendedUsersExpected.length)
    expect(suspendedUsersReceieved).toEqual(suspendedUsersExpected)
  })
})
