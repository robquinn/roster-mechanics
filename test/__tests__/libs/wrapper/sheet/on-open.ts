import { describe, expect, it, jest } from '@jest/globals'
import clearUserCache from '../../../../../src/libs/wrapper/sheet/on-open'
import * as clearUserCacheAndUpdateSheet from '../../../../../src/libs/wrapper/sheet/clear-user-cache-and-update'

describe('onSpreadsheetOpen', () => {
  it('should call "clearUserCacheAndUpdateSheetSpy"', async () => {
    const clearUserCacheAndUpdateSheetSpy = jest.spyOn(clearUserCacheAndUpdateSheet, 'default')

    await clearUserCache()

    expect(clearUserCacheAndUpdateSheetSpy).toHaveBeenCalled()
  })
})
