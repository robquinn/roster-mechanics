import { describe, expect, it } from '@jest/globals'
import GoogleCloudConsoleConfig from '../../../../src/config/google/cloud'

describe('GoogleCloudConsoleConfig', () => {
  it('should have property "ServiceAccount" and child properties"', async () => {
    const GoogleCloudConsoleConfigAwaited = await GoogleCloudConsoleConfig
    expect(GoogleCloudConsoleConfigAwaited).toHaveProperty('serviceAccount')
    expect(GoogleCloudConsoleConfigAwaited.serviceAccount).toHaveProperty('private_key')
    expect(GoogleCloudConsoleConfigAwaited.serviceAccount.private_key).toBe(
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    )
    expect(GoogleCloudConsoleConfigAwaited.serviceAccount).toHaveProperty('client_email')
    expect(GoogleCloudConsoleConfigAwaited.serviceAccount.client_email).toBe(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    )
    expect(GoogleCloudConsoleConfigAwaited.serviceAccount).toHaveProperty('client_id')
    expect(GoogleCloudConsoleConfigAwaited.serviceAccount.client_id).toBe(process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID)
  })
})
