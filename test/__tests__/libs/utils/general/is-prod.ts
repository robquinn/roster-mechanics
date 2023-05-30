import { describe, expect, it, jest, beforeEach, afterAll } from '@jest/globals'
import isProd from '../../../../../src/libs/utils/general/is-prod'

describe('isProd', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it('should return "false" in when "NODE_ENV" is "development"', async () => {
    process.env.NODE_ENV = 'development'
    await expect(isProd()).resolves.toBe(false)
  })

  it('should return "true" in when "NODE_ENV" is "production"', async () => {
    process.env.NODE_ENV = 'production'
    await expect(isProd()).resolves.toBe(true)
  })
})
