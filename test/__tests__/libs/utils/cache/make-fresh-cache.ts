import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import * as listAllUsers from '../../../../../src/libs/google-apps/admin/list-all-users'
import makeFreshCache from '../../../../../src/libs/utils/cache/make-fresh-cache'
import usersArray from '../../../../samples/users'
// import getEmails from '../../../../utils/get-emails'

let usersArr = usersArray
const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

beforeAll(() => {
  usersArr = usersArr.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
  usersArr = usersArr.filter((user) => user.customSchemas?.Roster.Exists === true)
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

beforeEach(() => {
  jest.resetModules()
  jest.resetAllMocks()
})

describe('makeFreshCache', () => {
  it(`should upsert user into cache`, async () => {
    const listAllUsersSpy = jest.spyOn(listAllUsers, 'default')
    const cacheReceived = await makeFreshCache()

    expect(listAllUsersSpy).toHaveBeenCalled()

    // const expectedUsers = Array.from(usersMap.values())
    // const receivedUsers = Array.from(cacheReceived.values())

    // const expectedEmails = await getEmails(expectedUsers)
    // const receivedEmails = await getEmails(receivedUsers)

    expect(cacheReceived.size).toBe(usersMap.size)
    expect(cacheReceived).toEqual(usersMap)
  })
})
