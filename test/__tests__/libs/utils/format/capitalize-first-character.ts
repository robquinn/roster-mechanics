import { describe, expect, it } from '@jest/globals'
import capitalizeFirstChar from '../../../../../src/libs/utils/format/capitalize-first-character'

describe('capitalizeFirstChar', () => {
  it('should return "Something" for the input "something"', async () => {
    expect(await capitalizeFirstChar('something')).toBe('Something')
  })
  it('should return "Whatever" for the input "whatever"', async () => {
    expect(await capitalizeFirstChar('whatever')).toBe('Whatever')
  })
})
