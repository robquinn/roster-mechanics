import { describe, expect, it, jest } from '@jest/globals'
import generalSheetHeaders from '../../../../../src/libs/google-apps/sheet/general-sheet-headers'
import sheetRowGeneral from '../../../../../src/libs/google-apps/sheet/sheet-row-general'
import * as ifNullThenEmptyElseValue from '../../../../../src/libs/utils/format/if-null-then-empty-else-value'
import * as ninjaOut from '../../../../../src/libs/utils/format/ninja-out'

import { sampleUser1 } from '../../../../samples/users'

describe('sheetRowGeneral', () => {
  it('should call "ninjaOut', async () => {
    const ninjaOutSpy = jest.spyOn(ninjaOut, 'default')
    await sheetRowGeneral(sampleUser1())
    expect(ninjaOutSpy).toHaveBeenCalledTimes(1)
    expect(ninjaOutSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Ninja)
  })
  it('should call "ifNullThenEmptyElseValue', async () => {
    const ifNullThenEmptyElseValueSpy = jest.spyOn(ifNullThenEmptyElseValue, 'default')
    await sheetRowGeneral(sampleUser1())
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledTimes(6)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1()?.name?.givenName)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1()?.name?.familyName)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Office)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Phone)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().primaryEmail)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Role)
  })

  it('should sheetRowAdmin to be an array', async () => {
    const sheetRow = await sheetRowGeneral(sampleUser1())
    expect(Array.isArray(sheetRow)).toBe(true)
    expect(sheetRow).toHaveLength((await generalSheetHeaders()).length)
  })
})
