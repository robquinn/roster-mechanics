import { describe, expect, it } from '@jest/globals'
import dateGoogle from '../../../../../src/libs/utils/date/date-google'

// beforeAll(() => {
//   Object.defineProperty(global, 'Utilties', new Utilties())
//   Object.defineProperty(global, 'Session', new Session())
// })

describe('dateGoogle', () => {
  it('should return 2020-7-20 given the date 7/20/2020', async () => {
    expect(await dateGoogle('7/20/2020')).toBe('2020-7-20')
  })
})
