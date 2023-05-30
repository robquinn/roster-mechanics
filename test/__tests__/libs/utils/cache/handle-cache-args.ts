import { beforeAll, describe, expect, it } from '@jest/globals'
import handleCacheArgs from '../../../../../src/libs/utils/cache/handle-cache-args'
import { sampleUser1, sampleUser2 } from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

beforeAll(() => {
  const usersArr = [sampleUser2()]
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

describe('handleCacheArgs', () => {
  it(`should upsert user into cache`, async () => {
    const sampleUser = sampleUser1()
    const mapExpected = usersMap
    mapExpected.set(sampleUser.id as string, sampleUser)
    const cacheReceived = await handleCacheArgs({ cache: usersMap, googleAdminUser: sampleUser, action: 'upsert' })
    expect(cacheReceived.size).toBe(2)
    expect(cacheReceived).toEqual(mapExpected)
  })
  it(`should delete user in cache`, async () => {
    const sampleUser = sampleUser1()
    const mapWithAllUsers = usersMap
    mapWithAllUsers.set(sampleUser.id as string, sampleUser)
    const cacheReceived = await handleCacheArgs({
      cache: mapWithAllUsers,
      googleAdminUser: sampleUser,
      action: 'delete',
    })
    expect(cacheReceived.size).toBe(1)
    expect(cacheReceived).toEqual(usersMap)
  })
})
