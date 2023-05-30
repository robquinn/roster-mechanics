import { describe, expect, it, jest } from '@jest/globals'
import clearUserCache from '../../../../../src/libs/wrapper/sheet/clear-user-cache'
import * as deleteBatches from '../../../../../src/libs/utils/cache/delete-batches'
import GoogleAppsScriptConfig from '../../../../../src/config/google/apps-script'

describe('clearUserCacheAndUpdateSheet', () => {
  it('should call "clearUserCache" and "updateSheet"', async () => {
    const deleteBatchesSpy = jest.spyOn(deleteBatches, 'default')

    const { id, type, scope } = (await GoogleAppsScriptConfig).cache.users

    await clearUserCache()

    expect(deleteBatchesSpy).toHaveBeenCalled()
    expect(deleteBatchesSpy).toHaveBeenCalledWith(id, type, scope)
  })
})
