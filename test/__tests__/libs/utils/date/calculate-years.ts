import { describe, expect, it } from '@jest/globals'
import calculateYears from '../../../../../src/libs/utils/date/calculate-years'

describe('calculateYears', () => {
  it('should return 2 since the date 5/6/2021', async () => {
    expect(await calculateYears('5/6/2021')).toBe('2')
  })
})
