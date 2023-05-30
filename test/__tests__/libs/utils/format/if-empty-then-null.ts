import { describe, expect, it } from '@jest/globals'
import ifEmptyThenNull from '../../../../../src/libs/utils/format/if-empty-then-null'

describe('ifEmptyThenNull', () => {
  it('should return null for empty input string', async () => {
    expect(await ifEmptyThenNull('')).toBe(null)
  })
  it('should return "ThisValue" for the input "ThisValue"', async () => {
    expect(await ifEmptyThenNull('ThisValue')).toBe('ThisValue')
  })
})
