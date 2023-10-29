import { describe, expect, it } from '@jest/globals'
import isNinja from '../../../../../src/libs/utils/general/is-ninja'

describe('isNinja', () => {
  it('should return TRUE if it is Ninja or Ninja+ or Ninja++ or 気 or 気+ or 気++ or otherwise false', async () => {
    expect(await isNinja('Ninja')).toBe(true)
    expect(await isNinja('Ninja+')).toBe(true)
    expect(await isNinja('Ninja++')).toBe(true)
    expect(await isNinja('気')).toBe(true)
    expect(await isNinja('気++')).toBe(true)
    expect(await isNinja('1/1/2002')).toBe(true)
    expect(await isNinja('NOT_NINJA')).toBe(false)
    expect(await isNinja('')).toBe(false)
    expect(await isNinja('asdf')).toBe(false)
  })
})
