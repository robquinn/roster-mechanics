import { describe, expect, it } from '@jest/globals'
import getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'

describe('getActualOffice', () => {
  it('should return the actual office, given the office alias', async () => {
    expect(await getActualOffice("Lyon's Den - PP")).toBe('Pinnacle Peak')
    expect(await getActualOffice("Lyon's Den - CF")).toBe('Carefree')
    expect(await getActualOffice("Lyon's Den - PR")).toBe('Prescott')
    expect(await getActualOffice("Lyon's Den - CT")).toBe('Camelback Tower')
    expect(await getActualOffice("Lyon's Den - TUC")).toBe('Tucson')
    expect(await getActualOffice("Lyon's Den - TUB")).toBe('Tubac')
    expect(await getActualOffice("Lyon's Den - FLG")).toBe('Flagstaff')
    expect(await getActualOffice("Lyon's Den - SEV")).toBe('Southeast Valley')
    expect(await getActualOffice("Lyon's Den - FH")).toBe('Fountain Hills')
    expect(await getActualOffice("Lyon's Den - SED")).toBe('Sedona')
    expect(await getActualOffice("Lyon's Den - WV")).toBe('West Valley')

    expect(await getActualOffice('Pinnacle Peak')).toBe('Pinnacle Peak')
    expect(await getActualOffice('Carefree')).toBe('Carefree')
    expect(await getActualOffice('Prescott')).toBe('Prescott')
    expect(await getActualOffice('Camelback Tower')).toBe('Camelback Tower')
    expect(await getActualOffice('Tucson')).toBe('Tucson')
    expect(await getActualOffice('Tubac')).toBe('Tubac')
    expect(await getActualOffice('Flagstaff')).toBe('Flagstaff')
    expect(await getActualOffice('Southeast Valley')).toBe('Southeast Valley')
    expect(await getActualOffice('Fountain Hills')).toBe('Fountain Hills')
    expect(await getActualOffice('Sedona')).toBe('Sedona')
    expect(await getActualOffice('West Valley')).toBe('West Valley')
  })
})
