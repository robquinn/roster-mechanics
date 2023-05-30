import { beforeAll, describe, expect, it } from '@jest/globals'
import reviver from '../../../../../src/libs/utils/cache/reviver'
import usersArr, { sampleUser1, sampleUser2 } from '../../../../samples/users'

const usersMap = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()
let replacerOutput: { dataType: string; value: Array<[string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser]> }
let serializedReplacerOuput: string

beforeAll(() => {
  usersArr.forEach((user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => usersMap.set(user.id as string, user))
  replacerOutput = { dataType: 'map', value: Array.from(usersMap.entries()) }
  serializedReplacerOuput = JSON.stringify(replacerOutput)
})

describe('reviver', () => {
  it('should return a datatype and array as value given a "map"', () => {
    expect(reviver('exampleObjectKey', replacerOutput)).toEqual(usersMap)
  })
  it('should work with JSON.parse to de-serialize a "map"', () => {
    expect(JSON.parse(serializedReplacerOuput, reviver)).toEqual(usersMap)
  })
  it('should return a the param "value.value" when it is not of type "map"', () => {
    // console.log('revivier', reviver('exampleObjectKey', { dataType: 'string', value: { ...sampleUser1() } }))
    expect(reviver('exampleObjectKey', { dataType: 'string', value: { ...sampleUser1() } })).toEqual({
      dataType: 'string',
      value: { ...sampleUser1() },
    })
  })
  it('should work with JSON.parse to de-serialize a value when it is not a "map"', () => {
    expect(JSON.parse(JSON.stringify({ ...sampleUser2() }), reviver)).toEqual({ ...sampleUser2() })
  })
})
