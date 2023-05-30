import { describe, expect, it, jest } from '@jest/globals'
import exponentialBackoffSync from '../../../../../src/libs/utils/general/exponential-backoff-sync'

describe('exponentialBackoffSync', () => {
  it('should call console log', () => {
    const logSpy = jest.spyOn(global.console, 'log')

    const syncFn = (): void => {
      console.log('syncFn was called')
    }

    exponentialBackoffSync({
      action: () => {
        syncFn()
      },
      maxNumTries: 10,
      name: 'syncFn',
    })

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledTimes(2)
    expect(logSpy).toHaveBeenCalledWith('Trying an async function (syncFn) with exponential backoff for the 1st time')
    expect(logSpy).toHaveBeenCalledWith('syncFn was called')

    logSpy.mockRestore()
  })
})
