import { describe, expect, it, jest } from '@jest/globals'
import exponentialBackoffAsync from '../../../../../src/libs/utils/general/exponential-backoff-async'

describe('exponentialBackoffAsync', () => {
  it('should call console log ', async () => {
    const logSpy = jest.spyOn(global.console, 'log')

    const asyncFn = async (): Promise<void> => {
      await new Promise<void>((resolve) => {
        console.log('asyncFn was called')
        resolve()
      })
    }

    await exponentialBackoffAsync({
      action: async () => {
        await asyncFn()
      },
      maxNumTries: 10,
      name: 'asyncFn',
    })

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledTimes(2)
    expect(logSpy).toHaveBeenCalledWith('Trying an async function (asyncFn) with exponential backoff for the 1st time')
    expect(logSpy).toHaveBeenCalledWith('asyncFn was called')

    logSpy.mockRestore()
  })
})
