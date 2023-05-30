import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import getChunkSize from '../../../../../src/libs/utils/cache/get-chunk-size'
import * as getSetStorage from '../../../../../src/libs/utils/cache/get-set-storage'
import replacer from '../../../../../src/libs/utils/cache/replacer'
import saveInBatches from '../../../../../src/libs/utils/cache/save-in-batches'
import usersArr from '../../../../samples/users'
import GoogleAppsScriptConfig from '../../../../../src/config/google/apps-script'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()
let nameOfCache: string

interface Case {
  type: RosterMechanics.Utils.Cache.Storage.Type
  scope: RosterMechanics.Utils.Cache.Storage.Scope
}
const cases: Case[] = [
  { type: 'cache', scope: 'user' },
  { type: 'property', scope: 'user' },
]

beforeAll(async () => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
  nameOfCache = (await GoogleAppsScriptConfig).cache.users.id
})

afterEach(() => {
  jest.restoreAllMocks()
  jest.resetModules()
})

describe('saveInBatches', () => {
  cases.forEach(({ type, scope }: Case): void => {
    it(`should save in type "${type} and in scope "${scope}"`, async () => {
      const jsonStr: string = JSON.stringify(usersMap, replacer)
      const strSliceLength: number = await getChunkSize(jsonStr, type)
      const totalChunkedIterations: number = Math.ceil(jsonStr.length / strSliceLength)
      const spy = jest.spyOn(getSetStorage, 'default')

      await saveInBatches(nameOfCache, usersMap, type, scope)
      expect(spy).toHaveBeenCalledTimes(totalChunkedIterations + 1)

      let counter = 0
      for (let i = 0; i < jsonStr.length; i += strSliceLength) {
        expect(spy).toHaveBeenCalledWith(
          type,
          `${nameOfCache}_${counter}`,
          scope,
          'string',
          'set',
          JSON.stringify(usersMap, replacer).slice(i, i + strSliceLength),
        )
        counter += 1
      }

      expect(spy).toHaveBeenCalledWith(type, `${nameOfCache}_total`, scope, 'number', 'set', totalChunkedIterations)
    })
  })
})
