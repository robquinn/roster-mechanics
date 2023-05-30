import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import getByEmail from '../../../../../src/libs/google-apps/admin/get-by-email'
import usersArr, { sampleUser1 } from '../../../../samples/users'

beforeEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})
describe('getByEmail', () => {
  const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
  it("should return sampleUser1 given sampleUser1's primaryEmail", async () => {
    expect(await getByEmail(sampleUser1().primaryEmail as string)).toEqual(sampleUser1())
  })
})
