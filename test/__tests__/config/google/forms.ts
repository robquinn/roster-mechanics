import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
// import GoogleFormsConfig from '../../../../src/config/google/forms'
// import * as isProd from '../../../../src/libs/utils/general/is-prod'

describe('GoogleFormsConfig', () => {
  const OLD_ENV = process.env
  let GoogleFormsConfig: Awaited<RosterMechanics.Config.Google.Forms>
  let GoogleFormsConfigProd: Awaited<RosterMechanics.Config.Google.Forms>
  let GoogleFormsConfigDev: Awaited<RosterMechanics.Config.Google.Forms>
  // const isProdSpy = jest.spyOn(isProd, 'default')
  beforeEach(async () => {
    process.env = { ...OLD_ENV } // Make a copy
    jest.resetModules() // Most important - it clears the cache
    process.env.NODE_ENV = 'production'
    await import('../../../../src/config/google/forms')
      .then(async (module) => {
        return await module.default
      })
      .then((awaitedModule) => {
        GoogleFormsConfig = awaitedModule
        return true
      })
      .catch((err) => {
        console.log('GoogleFormsConfig import Error', err)
      })
    jest.resetModules() // Most important - it clears the cache
    process.env.NODE_ENV = 'production'
    await import('../../../../src/config/google/forms')
      .then(async (module) => {
        return await module.default
      })
      .then((awaitedModule) => {
        GoogleFormsConfigProd = awaitedModule
        return true
      })
      .catch((err) => {
        console.log('GoogleFormsConfig import Error', err)
      })
    jest.resetModules() // Most important - it clears the cache
    process.env.NODE_ENV = 'development'
    await import('../../../../src/config/google/forms')
      .then(async (module) => {
        return await module.default
      })
      .then((awaitedModule) => {
        GoogleFormsConfigDev = awaitedModule
        return true
      })
      .catch((err) => {
        console.log('GoogleFormsConfig import Error', err)
      })
  })
  afterEach(() => {
    jest.resetModules() // Most important - it clears the cache
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it('should have property "forms" and child properties"', () => {
    expect(GoogleFormsConfig).toHaveProperty('forms')
    expect(GoogleFormsConfig.forms).toHaveProperty('hireUpdate')
    expect(GoogleFormsConfig.forms.hireUpdate).toHaveProperty('formId')
  })
  it('should have correct "formId" when "isProd" is "true"', () => {
    expect(GoogleFormsConfigProd.forms.hireUpdate.formId).toBe(process.env.GOOGLE_FORM_HIRE_UPDATE_ID_PROD)
  })
  it('should have correct "formId" when "isProd" is "false"', () => {
    expect(GoogleFormsConfigDev.forms.hireUpdate.formId).toBe(process.env.GOOGLE_FORM_HIRE_UPDATE_ID_DEV)
  })
})
