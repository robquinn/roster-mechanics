import { describe, expect, it } from '@jest/globals'
import licenseNumberHyperlink from '../../../../../src/libs/utils/format/license-number-hyperlink'

describe('licenseNumberHyperlink', () => {
  it('should return hyperlink sheet formula given a license number and link', async () => {
    expect(await licenseNumberHyperlink({ number: '123456', link: 'https://www.google.com' })).toBe(
      '=HYPERLINK("https://www.google.com","123456")',
    )
  })
  it('should return just license number when a link is not given or is an empty string', async () => {
    expect(await licenseNumberHyperlink({ number: '123456', link: '' })).toBe('123456')
  })
  it('should return empty string when a link and number are not given or are empty strings', async () => {
    expect(await licenseNumberHyperlink({ number: '', link: '' })).toBe('')
    expect(await licenseNumberHyperlink({ number: '', link: '' })).toHaveLength(0)
  })
})
