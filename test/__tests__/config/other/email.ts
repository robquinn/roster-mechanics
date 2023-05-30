import { describe, expect, it } from '@jest/globals'
import EmailConfig from '../../../../src/config/other/email'

describe('EmailConfig', () => {
  it('should have property "confidentiality" & "filters" and child properties"', async () => {
    const EmailConfigAwaited = await EmailConfig
    expect(EmailConfigAwaited).toHaveProperty('confidentiality')
    expect(EmailConfigAwaited.confidentiality).toHaveProperty('text')
    expect(typeof EmailConfigAwaited.confidentiality.text === 'string').toBe(true)
    expect(EmailConfigAwaited).toHaveProperty('filters')
    expect(EmailConfigAwaited.filters).toHaveProperty('justListed')
    expect(EmailConfigAwaited.filters.justListed).toHaveProperty('labelName')
    expect(typeof EmailConfigAwaited.filters.justListed.labelName === 'string').toBe(true)
    expect(EmailConfigAwaited.filters.justListed).toHaveProperty('query')
    expect(typeof EmailConfigAwaited.filters.justListed.query === 'string').toBe(true)
  })
})
