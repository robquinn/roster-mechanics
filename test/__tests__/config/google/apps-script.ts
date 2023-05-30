import { describe, expect, it } from '@jest/globals'
import * as GoogleAppsScriptConfigUnAwaited from '../../../../src/config/google/apps-script'

describe('GoogleAppsScriptConfig', () => {
  it('should have property "cache" and child properties"', async () => {
    const GoogleAppsScriptConfig = await GoogleAppsScriptConfigUnAwaited.default
    expect(GoogleAppsScriptConfig).toHaveProperty('cache')
    expect(GoogleAppsScriptConfig.cache).toHaveProperty('users')
    expect(GoogleAppsScriptConfig.cache.users).toHaveProperty('id')
    expect(GoogleAppsScriptConfig.cache.users.id).toBe(process.env.GAS_USERS_CACHE_ID)
    expect(GoogleAppsScriptConfig.cache.users).toHaveProperty('type')
    expect(GoogleAppsScriptConfig.cache.users.type).toBe(process.env.GAS_USERS_CACHE_TYPE)
    expect(GoogleAppsScriptConfig.cache.users).toHaveProperty('scope')
    expect(GoogleAppsScriptConfig.cache.users.scope).toBe(process.env.GAS_USERS_CACHE_SCOPE)
    expect(GoogleAppsScriptConfig.cache).toHaveProperty('deletedUsers')
    expect(GoogleAppsScriptConfig.cache.deletedUsers.id).toBe(process.env.GAS_DELETED_USERS_CACHE_ID)
    expect(GoogleAppsScriptConfig.cache.deletedUsers).toHaveProperty('type')
    expect(GoogleAppsScriptConfig.cache.deletedUsers.type).toBe(process.env.GAS_DELETED_USERS_CACHE_TYPE)
    expect(GoogleAppsScriptConfig.cache.deletedUsers).toHaveProperty('scope')
    expect(GoogleAppsScriptConfig.cache.deletedUsers.scope).toBe(process.env.GAS_DELETED_USERS_CACHE_SCOPE)
  })
})
