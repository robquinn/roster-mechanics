import { beforeAll, describe, expect, it } from '@jest/globals'
import getAllUsers from '../../../../../src/libs/utils/cache/get-all-users'
import Roster from '../../../../../src/libs/google-apps/sheet/roster-sheet'
import RussLyonDomainUsers from '../../../../../src/libs/utils/cache/russ-lyon-domain-users'
import sortUsersIntoGroups from '../../../../../src/libs/utils/cache/sort-users-into-groups'

let userGroups: {
  notSuspendedUsers: RosterMechanics.GoogleApps.Sheet.IRoster | object
  suspendedUsers: RosterMechanics.GoogleApps.Sheet.IRoster | object
  pseudoUsers: RosterMechanics.GoogleApps.Sheet.IRoster | object
} = {
  notSuspendedUsers: {},
  suspendedUsers: {},
  pseudoUsers: {},
}

beforeAll(async () => {
  //   const regularUsers = usersArr.filter(
  //     (user) => user.customSchemas?.Roster.Show_on_Roster === true && user.suspended === false,
  //   )
  //   userGroups.notSuspendedUsers = new Roster(regularUsers)
  //   const suspendedUsers = usersArr.filter((user) => user.suspended === true)
  //   userGroups.suspendedUsers = new Roster(suspendedUsers)
  //   const pseudoUsers = usersArr.filter(
  //     (user) => user.customSchemas?.Roster.Show_on_Roster === false && user.suspended === false,
  //   )
  //   userGroups.pseudoUsers = new Roster(pseudoUsers)
  const users = await getAllUsers()
  const { regular, suspended, pseudo } = await sortUsersIntoGroups(users)
  const notSuspendedUsers = new Roster(regular)
  const suspendedUsers = new Roster(suspended)
  const pseudoUsers = new Roster(pseudo)

  userGroups = {
    notSuspendedUsers,
    suspendedUsers,
    pseudoUsers,
  }
})

describe('RussLyonDomainUsers', () => {
  it('should return the different user groups (notSuspendedUsers, suspendedUsers, pseudoUsers)', async () => {
    expect((await RussLyonDomainUsers()).notSuspendedUsers).toBeInstanceOf(Roster)
    expect((await RussLyonDomainUsers()).suspendedUsers).toBeInstanceOf(Roster)
    expect((await RussLyonDomainUsers()).pseudoUsers).toBeInstanceOf(Roster)
    expect(await RussLyonDomainUsers()).toEqual(userGroups)
  })
})
