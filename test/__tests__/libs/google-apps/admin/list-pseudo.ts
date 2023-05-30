import { beforeAll, describe, expect, it } from '@jest/globals'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'
import getUserAdminDirectoryView from '../../../../gas/utils/admin-directory/user-views'
import listPseudo from '../../../../../src/libs/google-apps/admin/list-pseudo'
import usersArr from '../../../../samples/users'

let pseudoUsersExpected: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

beforeAll(async () => {
  const pseudo = async (): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
    return await new Promise((resolve) => {
      let users = usersArr
      users = users.filter((user) => user.suspended === true || user.suspended === false)
      users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === false)
      users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
      users = users.filter((user) => user.orgUnitPath === '/')
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

  pseudoUsersExpected = await pseudo()
})

describe('listPseudo', () => {
  it('should return psuedo users', async () => {
    const pseudoUsersReceieved = await listPseudo()
    expect(pseudoUsersReceieved).toHaveLength(pseudoUsersExpected.length)
    expect(pseudoUsersReceieved).toEqual(pseudoUsersExpected)
  })
})
