import { describe, expect, it } from '@jest/globals'
import sortAlphabetically from '../../../../../src/libs/utils/format/sort-alphabetically'

const array = [
  ['ID', 'First Name', 'Last Name'],
  ['0', 'Tibor', 'Wokosiki'],
  ['1', 'Tanya', 'Crusher'],
  ['2', 'Matt', 'Haven'],
]

describe('sortAlphabetically', () => {
  it('should return sort the array by First Name then by Last Name', async () => {
    expect((await sortAlphabetically({ array, firstNameCol: 1, lastNameCol: 2 }))[1][1]).toBe('Matt')
    expect((await sortAlphabetically({ array, firstNameCol: 1, lastNameCol: 2 }))[2][1]).toBe('Tanya')
    expect((await sortAlphabetically({ array, firstNameCol: 1, lastNameCol: 2 }))[3][1]).toBe('Tibor')
  })
})
