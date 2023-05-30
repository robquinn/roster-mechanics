import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import retrieveFromBatches from '../../../../../src/libs/utils/cache/retrieve-from-batches'
import saveInBatches from '../../../../../src/libs/utils/cache/save-in-batches'
import usersArr from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

interface Case {
  name: string
  type: RosterMechanics.Utils.Cache.Storage.Type
  value: RosterMechanics.Utils.Cache.Storage.Value | null | undefined
  scope: RosterMechanics.Utils.Cache.Storage.Scope
  expected: unknown
}

const cases: Case[] = [
  {
    name: process.env.GAS_USERS_CACHE_ID as string,
    type: 'cache',
    scope: 'user',
    value: usersMap as unknown as JSON,
    expected: usersMap,
  },
  {
    name: process.env.GAS_USERS_CACHE_ID as string,
    type: 'property',
    scope: 'user',
    value: usersMap as unknown as JSON,
    expected: usersMap,
  },
  {
    name: 'undefined_key',
    type: 'property',
    scope: 'user',
    value: undefined,
    expected: undefined,
  },
]
beforeAll(() => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('retrieveFromBatches', () => {
  cases.forEach(({ name, type, value, scope, expected }: Case): void => {
    it(`should retrieve value with name ${name} from type "${type}" and scope "${scope}"`, async () => {
      if (name === 'undefined_key') expect(await retrieveFromBatches(name, type, scope)).toEqual(expected)
      else {
        await saveInBatches(name, value, type, scope)
        expect(await retrieveFromBatches(name, type, scope)).toEqual(expected)
      }
    })
  })
})
