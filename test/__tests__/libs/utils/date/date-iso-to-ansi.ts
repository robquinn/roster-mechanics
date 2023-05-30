import { describe, expect, it } from '@jest/globals'
import dateIsoToAnsi from '../../../../../src/libs/utils/date/date-iso-to-ansi'

describe('dateIsoToAnsi', () => {
  it('should return 3/23/2023 given the date 2023-3-23', async () => {
    expect(await dateIsoToAnsi('2023-3-23')).toBe('3/23/2023')
  })
})
