import { beforeAll, describe, expect, it } from '@jest/globals'
import replacer from '../../../../../src/libs/utils/cache/replacer'
import usersArr, { sampleUser1, sampleUser2 } from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()

beforeAll(() => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
})

describe('replacer', () => {
  it('should return a datatype and array as value given a "map"', () => {
    expect(replacer('exampleObjectKey', usersMap)).toEqual({
      dataType: 'map',
      value: [...Array.from(usersMap.entries())],
    })
  })
  it('should work with JSON.stringify to serialize a "map"', () => {
    expect(JSON.stringify(usersMap, replacer)).toEqual(
      JSON.stringify({ dataType: 'map', value: [...Array.from(usersMap.entries())] }),
    )
  })
  it('should return a the param "value" when it is not of type "map"', () => {
    expect(replacer('exampleObjectKey', { ...sampleUser1() })).toEqual({ ...sampleUser1() })
  })
  it('should work with JSON.stringify to serialize a value when it is not a "map"', () => {
    expect(JSON.stringify({ ...sampleUser2() }, replacer)).toEqual(JSON.stringify({ ...sampleUser2() }))
  })
})
