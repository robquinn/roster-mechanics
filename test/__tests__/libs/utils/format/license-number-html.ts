import { describe, expect, it } from '@jest/globals'
import licenseNumberHTML from '../../../../../src/libs/utils/format/license-number-html'

describe('licenseNumberHTML', () => {
  it('should return hyperlink html given a license number and link', async () => {
    expect(await licenseNumberHTML({ number: '123456', link: 'https://www.google.com' })).toBe(
      '<a href="https://www.google.com">123456</a>',
    )
  })
  it('should return just license number when a link is not given or is an empty string', async () => {
    expect(await licenseNumberHTML({ number: '123456', link: '' })).toBe('123456')
  })
})
