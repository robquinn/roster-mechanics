import { describe, expect, it } from '@jest/globals'
import dateAnsiToIso from '../../../../../src/libs/utils/date/date-ansi-to-iso'

describe('dateAnsiToIso', () => {
  it('should return 2023-3-23 given the date 3/23/2023', async () => {
    expect(await dateAnsiToIso('3/23/2023')).toBe('2023-3-23')
  })
})
