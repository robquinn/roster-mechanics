import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import deleteBatches from '../../../../../src/libs/utils/cache/delete-batches'
import retrieveFromBatches from '../../../../../src/libs/utils/cache/retrieve-from-batches'
import saveInBatches from '../../../../../src/libs/utils/cache/save-in-batches'
import usersArr from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

interface Case {
  name: string
  type: RosterMechanics.Utils.Cache.Storage.Type
  value: RosterMechanics.Utils.Cache.Storage.Value
  scope: RosterMechanics.Utils.Cache.Storage.Scope
  expectedAfterSave: unknown
  expectedAfterDelete: undefined | null
}

const cases: Case[] = [
  {
    name: process.env.GAS_USERS_CACHE_ID as string,
    type: 'cache',
    scope: 'user',
    value: usersMap as unknown as JSON,
    expectedAfterSave: usersMap,
    expectedAfterDelete: undefined,
  },
  {
    name: process.env.GAS_USERS_CACHE_ID as string,
    type: 'property',
    scope: 'user',
    value: usersMap as unknown as JSON,
    expectedAfterSave: usersMap,
    expectedAfterDelete: undefined,
  },
]
beforeAll(() => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('deleteBatches', () => {
  cases.forEach(({ name, type, value, scope, expectedAfterSave, expectedAfterDelete }: Case): void => {
    it(`should save and then delete named storage "${name}" of type "${type}" and scope "${scope}"`, async () => {
      await saveInBatches(name, value, type, scope)
      expect(await retrieveFromBatches(name, type, scope)).toEqual(expectedAfterSave)
      await deleteBatches(name, type, scope)
      expect(await retrieveFromBatches(name, type, scope)).toEqual(expectedAfterDelete)
    })
  })
})
