import { describe, expect, it, jest } from '@jest/globals'
import adminSheetHeaders from '../../../../../src/libs/google-apps/sheet/admin-sheet-headers'
import sheetRowAdmin from '../../../../../src/libs/google-apps/sheet/sheet-row-admin'
import * as calculateYears from '../../../../../src/libs/utils/date/calculate-years'
import * as dateIsoToAnsi from '../../../../../src/libs/utils/date/date-iso-to-ansi'
import * as licenseNumberHyperlink from '../../../../../src/libs/utils/format/license-number-hyperlink'
import * as ninjaOut from '../../../../../src/libs/utils/format/ninja-out'
import * as ifNullThenEmptyElseValue from '../../../../../src/libs/utils/format/if-null-then-empty-else-value'

import { sampleUser1 } from '../../../../samples/users'

describe('sheetRowAdmin', () => {
  it('should call "dateIsoToAnsi', async () => {
    const dateIsoToAnsiSpy = jest.spyOn(dateIsoToAnsi, 'default')
    await sheetRowAdmin(sampleUser1())
    expect(dateIsoToAnsiSpy).toHaveBeenCalledTimes(7)
    expect(dateIsoToAnsiSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Hire_Date)
    expect(dateIsoToAnsiSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Date_Licensed)
    expect(dateIsoToAnsiSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.License_Expiration_Date)
    expect(dateIsoToAnsiSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Ninja_Audit)
    expect(dateIsoToAnsiSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Date_Fees_to_Start)
    expect(dateIsoToAnsiSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Sever_Date)
  })
  it('should call "calculateYears', async () => {
    const calculateYearsSpy = jest.spyOn(calculateYears, 'default')
    await sheetRowAdmin(sampleUser1())
    expect(calculateYearsSpy).toHaveBeenCalledTimes(1)
    expect(calculateYearsSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Date_Licensed)
  })
  it('should call "ninjaOut', async () => {
    const ninjaOutSpy = jest.spyOn(ninjaOut, 'default')
    await sheetRowAdmin(sampleUser1())
    expect(ninjaOutSpy).toHaveBeenCalledTimes(1)
    expect(ninjaOutSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Ninja)
  })
  it('should call "licenseNumberHyperlink', async () => {
    const licenseNumberHyperlinkSpy = jest.spyOn(licenseNumberHyperlink, 'default')
    await sheetRowAdmin(sampleUser1())
    expect(licenseNumberHyperlinkSpy).toHaveBeenCalledTimes(1)
    expect(licenseNumberHyperlinkSpy).toHaveBeenCalledWith({
      number: sampleUser1().customSchemas?.Roster.License_Number,
      link: sampleUser1().customSchemas?.Roster.ADRE_Link,
    })
  })
  it('should call "ifNullThenEmptyElseValue', async () => {
    const ifNullThenEmptyElseValueSpy = jest.spyOn(ifNullThenEmptyElseValue, 'default')
    await sheetRowAdmin(sampleUser1())
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledTimes(25)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().name?.givenName)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().name?.familyName)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().primaryEmail)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Preferred_Name)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Office)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Role)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Phone)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Lone_Wolf_Number)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.PC_or_PLLC)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Board)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.MLS_ID)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Board_2)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.MLS_ID_2)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Board_3)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.MLS_ID_3)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster['Re-Hire'])
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Recruited_From)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Status_Type)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Charge_395)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Monthly_Fees)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Notes)

    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.New_Brokerage)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Inactive_Reason)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(sampleUser1().customSchemas?.Roster.Special_Status)
    expect(ifNullThenEmptyElseValueSpy).toHaveBeenCalledWith(
      sampleUser1().customSchemas?.Roster['Re-Hire_Last_Date_with_RLSIR'],
    )
  })

  it('should sheetRowAdmin to be an array', async () => {
    const sheetRow = await sheetRowAdmin(sampleUser1())
    expect(Array.isArray(sheetRow)).toBe(true)
    expect(sheetRow).toHaveLength((await adminSheetHeaders()).length)
  })
})
