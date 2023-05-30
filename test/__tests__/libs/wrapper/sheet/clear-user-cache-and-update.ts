import { describe, expect, it, jest } from '@jest/globals'
import * as clearUserCache from '../../../../../src/libs/wrapper/sheet/clear-user-cache'
import clearUserCacheAndUpdateSheet from '../../../../../src/libs/wrapper/sheet/clear-user-cache-and-update'
import * as updateSheet from '../../../../../src/libs/wrapper/sheet/update-sheet'

describe('clearUserCacheAndUpdateSheet', () => {
  it('should call "clearUserCache" and "updateSheet"', async () => {
    const clearUserCacheSpy = jest.spyOn(clearUserCache, 'default')
    const updateSheetSpy = jest.spyOn(updateSheet, 'default')

    await clearUserCacheAndUpdateSheet()

    expect(clearUserCacheSpy).toHaveBeenCalled()
    expect(updateSheetSpy).toHaveBeenCalled()
  })
})
