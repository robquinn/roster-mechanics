import { beforeAll, describe, expect, it } from '@jest/globals'
import getSetStorage from '../../../../../src/libs/utils/cache/get-set-storage'
import usersArr from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

const cases: Array<{
  type: RosterMechanics.Utils.Cache.Storage.Type
  name: RosterMechanics.Utils.Cache.Storage.Key
  scope: RosterMechanics.Utils.Cache.Storage.Scope
  dataType: RosterMechanics.Utils.Cache.Storage.DataType
  action: RosterMechanics.Utils.Cache.Storage.Action
  value?: RosterMechanics.Utils.Cache.Storage.Value
  expected: unknown
}> = [
  {
    type: 'cache',
    name: 'users_total',
    scope: 'user',
    dataType: 'number',
    action: 'set',
    value: usersArr.length,
    expected: usersArr.length,
  },
  {
    type: 'cache',
    name: 'users_total',
    scope: 'user',
    dataType: 'number',
    action: 'get',
    value: undefined,
    expected: usersArr.length,
  },
  {
    type: 'cache',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'set',
    value: usersArr as unknown as JSON,
    expected: usersArr,
  },
  {
    type: 'cache',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'get',
    value: undefined,
    expected: usersArr,
  },
  {
    type: 'cache',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'set',
    value: usersMap as unknown as JSON,
    expected: usersMap,
  },
  {
    type: 'cache',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'get',
    value: undefined,
    expected: usersMap,
  },
  {
    type: 'cache',
    name: 'undefined_key',
    scope: 'user',
    dataType: 'json',
    action: 'get',
    value: undefined,
    expected: null,
  },
  {
    type: 'property',
    name: 'users_total',
    scope: 'user',
    dataType: 'number',
    action: 'set',
    value: usersArr.length,
    expected: usersArr.length,
  },
  {
    type: 'property',
    name: 'users_total',
    scope: 'user',
    dataType: 'number',
    action: 'get',
    value: undefined,
    expected: usersArr.length,
  },
  {
    type: 'property',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'set',
    value: usersArr as unknown as JSON,
    expected: usersArr,
  },
  {
    type: 'property',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'get',
    value: undefined,
    expected: usersArr,
  },
  {
    type: 'property',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'set',
    value: usersMap as unknown as JSON,
    expected: usersMap,
  },
  {
    type: 'property',
    name: 'users_arr',
    scope: 'user',
    dataType: 'json',
    action: 'get',
    value: undefined,
    expected: usersMap,
  },
  {
    type: 'property',
    name: 'undefined_key',
    scope: 'user',
    dataType: 'json',
    action: 'get',
    value: undefined,
    expected: null,
  },
]

beforeAll(() => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

describe('getSetStorage', () => {
  cases.forEach(
    ({
      type,
      name,
      scope,
      dataType,
      action,
      value,
      expected,
    }: {
      type: RosterMechanics.Utils.Cache.Storage.Type
      name: RosterMechanics.Utils.Cache.Storage.Key
      scope: RosterMechanics.Utils.Cache.Storage.Scope
      dataType: RosterMechanics.Utils.Cache.Storage.DataType
      action: RosterMechanics.Utils.Cache.Storage.Action
      value?: RosterMechanics.Utils.Cache.Storage.Value
      expected: unknown
    }) => {
      it(`should ${action} a ${dataType} value in ${type}, with the scope of ${scope} and name of ${name}`, async () => {
        expect(await getSetStorage(type, name, scope, dataType, action, value)).toEqual(expected)
      })
    },
  )
})
