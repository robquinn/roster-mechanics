import { beforeAll, describe, expect, it } from '@jest/globals'
import mapValuesToArray from '../../../../../src/libs/utils/cache/map-values-to-array'
import usersArr from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

beforeAll(() => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

describe('mapValuesToArray', () => {
  it('should return an array given a map', async () => {
    expect(Array.isArray(await mapValuesToArray(usersMap))).toBe(true)
  })
  it('should return an array of GoogleUsers', async () => {
    expect(await mapValuesToArray(usersMap)).toEqual([...usersArr])
  })
})
