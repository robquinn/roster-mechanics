import { describe, expect, it } from '@jest/globals'
import ninjaIn from '../../../../../src/libs/utils/format/ninja-in'

describe('ninjaIn', () => {
  it('should return input value if it is Ninja or Ninja+ or Ninja++ or 気 or 気+ or 気++ or an empty string', async () => {
    expect(await ninjaIn('Ninja')).toBe('Ninja')
    expect(await ninjaIn('Ninja+')).toBe('Ninja+')
    expect(await ninjaIn('Ninja++')).toBe('Ninja++')
    expect(await ninjaIn('気')).toBe('気')
    expect(await ninjaIn('気++')).toBe('気++')
    expect(await ninjaIn('')).toBe('')
    expect(await ninjaIn('')).toHaveLength(0)
  })
  it('should return an ISO date if given an ANSI Date ', async () => {
    expect(await ninjaIn('1/2/2000')).toBe('2000-1-2')
  })
})
