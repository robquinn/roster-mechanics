import { describe, expect, it, beforeAll } from '@jest/globals'
import sortUsersIntoGroups from '../../../../../src/libs/utils/cache/sort-users-into-groups'
import usersArr from '../../../../samples/users'

const userGroups: {
  suspended: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
  regular: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
  pseudo: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
} = {
  suspended: [],
  regular: [],
  pseudo: [],
}

beforeAll(() => {
  userGroups.regular = usersArr.filter(
    (user) => user.customSchemas?.Roster.Show_on_Roster === true && user.suspended === false,
  )
  userGroups.suspended = usersArr.filter((user) => user.suspended === true)
  userGroups.pseudo = usersArr.filter(
    (user) => user.customSchemas?.Roster.Show_on_Roster === false && user.suspended === false,
  )
})

describe('sortUsersIntoGroups', () => {
  it('should return users into different groups: suspended, regular, etc.', async () => {
    expect(await sortUsersIntoGroups(usersArr)).toEqual(userGroups)
  })
})
