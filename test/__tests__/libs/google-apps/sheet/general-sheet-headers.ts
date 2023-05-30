import { describe, expect, it } from '@jest/globals'
import generalSheetHeaders from '../../../../../src/libs/google-apps/sheet/general-sheet-headers'

describe('generalSheetHeaders', () => {
  it('should return the general sheet headers', async () => {
    const sheetHeaders = await generalSheetHeaders()
    expect(Array.isArray(sheetHeaders)).toBe(true)
    expect(sheetHeaders).toEqual(['First Name', 'Last Name', 'Office', 'Ninja', 'Phone', 'Email', 'Role'])
  })
})
