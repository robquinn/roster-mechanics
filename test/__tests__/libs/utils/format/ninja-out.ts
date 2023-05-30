import { describe, expect, it } from '@jest/globals'
import ninjaOut from '../../../../../src/libs/utils/format/ninja-out'

describe('ninjaOut', () => {
  it('should return input value if it is Ninja or Ninja+ or Ninja++ or 気 or 気+ or 気++ or an empty string', async () => {
    expect(await ninjaOut('Ninja')).toBe('Ninja')
    expect(await ninjaOut('Ninja+')).toBe('Ninja+')
    expect(await ninjaOut('Ninja++')).toBe('Ninja++')
    expect(await ninjaOut('気')).toBe('気')
    expect(await ninjaOut('気++')).toBe('気++')
    expect(await ninjaOut('')).toBe('')
    expect(await ninjaOut('')).toHaveLength(0)
  })
  it('should return an ANSI date if given an ISO Date ', async () => {
    expect(await ninjaOut('2000-1-2')).toBe('1/2/2000')
  })
})
