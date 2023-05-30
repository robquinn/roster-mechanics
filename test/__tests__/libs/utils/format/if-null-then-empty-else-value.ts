import { describe, expect, it } from '@jest/globals'
import ifNullThenEmptyElseValue from '../../../../../src/libs/utils/format/if-null-then-empty-else-value'

describe('ifNullThenEmptyElseValue', () => {
  it('should return null for empty input string', async () => {
    expect(await ifNullThenEmptyElseValue(null)).toBe('')
    expect(await ifNullThenEmptyElseValue(null)).toHaveLength(0)
  })
  it('should return string "SomeValue" for the string input "SomeValue"', async () => {
    expect(await ifNullThenEmptyElseValue('SomeValue')).toBe('SomeValue')
  })
  it('should return string "Yes" for the boolean input "true"', async () => {
    expect(await ifNullThenEmptyElseValue(true)).toBe('Yes')
  })
  it('should return empty string for the boolean input "false"', async () => {
    expect(await ifNullThenEmptyElseValue(false)).toBe('')
    expect(await ifNullThenEmptyElseValue(false)).toHaveLength(0)
  })
})
