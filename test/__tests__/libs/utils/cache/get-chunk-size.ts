import { describe, expect, it } from '@jest/globals'
import getChunkSize from '../../../../../src/libs/utils/cache/get-chunk-size'

const cases: Array<{ value: string; type: RosterMechanics.Utils.Cache.Storage.Type; expected: number }> = [
  { value: 'somevaluethatislonger', type: 'cache', expected: 21 },
  { value: 'someothervaluethatislonger', type: 'cache', expected: 26 },
  { value: 'somevaluethatislonger', type: 'property', expected: 21 },
  { value: 'someothervaluethatislonger', type: 'property', expected: 26 },
]

describe('getChunkSize', () => {
  cases.forEach(
    ({
      type,
      value,
      expected,
    }: {
      value: string
      type: RosterMechanics.Utils.Cache.Storage.Type
      expected: number
    }) => {
      it(`should return ${expected} for a value of "${value}" and type "${type}"`, async () => {
        expect(await getChunkSize(value, type)).toBe(expected)
      })
    },
  )
})
