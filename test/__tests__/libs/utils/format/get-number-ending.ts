import { describe, expect, it } from '@jest/globals'
import getNumberEnding from '../../../../../src/libs/utils/format/get-number-ending'

describe('getNumberEnding', () => {
  it('should return "th" for numbers 4,5,6,7,8,9,10,100,105', () => {
    expect(getNumberEnding(4)).toBe('th')
    expect(getNumberEnding(5)).toBe('th')
    expect(getNumberEnding(6)).toBe('th')
    expect(getNumberEnding(7)).toBe('th')
    expect(getNumberEnding(8)).toBe('th')
    expect(getNumberEnding(9)).toBe('th')
    expect(getNumberEnding(10)).toBe('th')
    expect(getNumberEnding(100)).toBe('th')
    expect(getNumberEnding(105)).toBe('th')
  })
  it('should return "st" for number 1', () => {
    expect(getNumberEnding(1)).toBe('st')
  })
  it('should return "nd" for number 2', () => {
    expect(getNumberEnding(2)).toBe('nd')
  })
  it('should return "rd" for number 3', () => {
    expect(getNumberEnding(3)).toBe('rd')
  })
})
