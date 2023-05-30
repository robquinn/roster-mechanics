import { describe, expect, it } from '@jest/globals'
import byteLength from '../../../../../src/libs/utils/cache/byte-length'

describe('byteLength', () => {
  it('should return 9 for "somevalue"', async () => {
    expect(await byteLength('somevalue')).toBe(9)
  })
  it('should return 14 for "someothervalue"', async () => {
    expect(await byteLength('someothervalue')).toBe(14)
  })
})
