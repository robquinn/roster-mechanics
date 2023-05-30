import { beforeAll, describe, expect, it } from '@jest/globals'
import adminSheetHeaders from '../../../../../src/libs/google-apps/sheet/admin-sheet-headers'
import Roster from '../../../../../src/libs/google-apps/sheet/roster-sheet'
import usersArr from '../../../../samples/users'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'

let notSuspendedUsers: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

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
  notSuspendedUsers = await notSupended()
})

describe('Roster', () => {
  it('should be an instance of Roster', () => {
    const roster = new Roster(notSuspendedUsers)
    expect(roster).toBeInstanceOf(Roster)
  })
  it('should retrieve sheet values', async () => {
    const roster = new Roster(notSuspendedUsers)
    const rosterSheet = await roster.getSheet('admin')
    expect(rosterSheet).toHaveLength(notSuspendedUsers.length + 1)
    expect(Array.isArray(rosterSheet)).toBe(true)
    expect(rosterSheet[0]).toEqual(await adminSheetHeaders())
  })
})
