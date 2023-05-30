import { afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import deleteBatches from '../../../../../src/libs/utils/cache/delete-batches'
import getAllUsers from '../../../../../src/libs/utils/cache/get-all-users'
import * as retrieveFromBatches from '../../../../../src/libs/utils/cache/retrieve-from-batches'
import * as saveInBatches from '../../../../../src/libs/utils/cache/save-in-batches'
import defaultUsersArr, { sampleUser1 } from '../../../../samples/users'
import GoogleAppsScriptConfig from '../../../../../src/config/google/apps-script'

describe('getAllUsers', () => {
  let cache: {
    id: string
    type: RosterMechanics.Utils.Cache.Storage.Type
    scope: RosterMechanics.Utils.Cache.Storage.Scope
  }
  const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()
  let usersArr: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] = defaultUsersArr

  let spyOn1: jest.SpiedFunction<typeof retrieveFromBatches.default>
  let spyOn2: jest.SpiedFunction<typeof saveInBatches.default>

  beforeAll(async () => {
    usersArr = usersArr.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
    usersArr = usersArr.filter((user) => user.customSchemas?.Roster.Exists === true)
    usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) =>
      usersMap.set(user.id as string, user),
    )
    cache = (await GoogleAppsScriptConfig).cache.users
  })

  beforeEach(() => {
    spyOn1 = jest.spyOn(retrieveFromBatches, 'default')
    spyOn2 = jest.spyOn(saveInBatches, 'default')
    jest.resetModules()
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  it('should return all users', async () => {
    await saveInBatches.default(cache.id, usersMap, cache.type, cache.scope)
    expect(await retrieveFromBatches.default(cache.id, cache.type, cache.scope)).toEqual(usersMap)

    const recievedUsers = [...(await getAllUsers())]
    expect(recievedUsers).toHaveLength(usersArr.length)
    expect(recievedUsers).toEqual(usersArr)
  })

  it('should update user, assuming cache already exists', async () => {
    await saveInBatches.default(cache.id, usersMap, cache.type, cache.scope)
    expect(await retrieveFromBatches.default(cache.id, cache.type, cache.scope)).toEqual(usersMap)

    const newBanjoMocha = { ...sampleUser1() }
    ;(newBanjoMocha as { name: { givenName: string } }).name.givenName = 'New Given Name'
    ;(newBanjoMocha as { name: { familyName: string } }).name.familyName = 'New Family Name'
    ;(newBanjoMocha as { name: { fullName: string } }).name.fullName = 'New Full Name'

    const recievedUsers = await getAllUsers({ googleAdminUser: newBanjoMocha, action: 'update' })

    const newUsersArr = [...usersArr]
    const oldBanjoMocha = usersArr.find(
      (u) => u.name?.givenName === 'Banjo' && u.name?.familyName === 'Mocha' && u.name?.fullName === 'Banjo Mocha',
    )
    newUsersArr[newUsersArr.indexOf(oldBanjoMocha as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)] =
      newBanjoMocha

    expect(recievedUsers).toHaveLength(newUsersArr.length)
    expect(recievedUsers).toEqual(newUsersArr)
  })

  it('should update delete user, assuming when cache already exists', async () => {
    await saveInBatches.default(cache.id, usersMap, cache.type, cache.scope)
    expect(await retrieveFromBatches.default(cache.id, cache.type, cache.scope)).toEqual(usersMap)

    const mochaBanjo = usersArr.find(
      (u) => u.name?.givenName === 'Mocha' && u.name?.familyName === 'Banjo' && u.name?.fullName === 'Mocha Banjo',
    )
    const recievedUsers = await getAllUsers({ googleAdminUser: mochaBanjo, action: 'delete' })
    const newUsersArr = [...usersArr]
    const indexOfBanjoMocha = newUsersArr.indexOf(mochaBanjo as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    if (indexOfBanjoMocha > -1) {
      // only splice array when item is found
      newUsersArr.splice(indexOfBanjoMocha, 1) // 2nd parameter means remove one item only
    }
    expect(recievedUsers).toHaveLength(newUsersArr.length)
    expect(recievedUsers).toEqual(newUsersArr)
  })

  it('should have called retireveFromBatches', async () => {
    await getAllUsers()
    expect(spyOn1).toHaveBeenCalledTimes(1)
    expect(spyOn1).toHaveBeenCalledWith(cache.id, cache.type, cache.scope)
  })

  it('should have called saveInBatches', async () => {
    await deleteBatches(cache.id, cache.type, cache.scope)
    await getAllUsers()
    expect(spyOn2).toHaveBeenCalledTimes(1)
    expect(spyOn2).toHaveBeenCalledWith(cache.id, usersMap, cache.type, cache.scope)
  })

  it('should have stored the mapped users in batches', async () => {
    await deleteBatches(cache.id, cache.type, cache.scope)
    await getAllUsers()
    expect(await retrieveFromBatches.default(cache.id, cache.type, cache.scope)).toEqual(usersMap)
  })
})
