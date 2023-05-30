import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
// import * as isProd from '../../../../src/libs/utils/general/is-prod'
// import GoogleSheetsConfig from '../../../../src/config/google/sheets'

describe('GoogleSheetsConfig', () => {
  const OLD_ENV = process.env
  let GoogleSheetsConfig: Awaited<RosterMechanics.Config.Google.Sheets>
  let GoogleSheetsConfigProd: Awaited<RosterMechanics.Config.Google.Sheets>
  let GoogleSheetsConfigDev: Awaited<RosterMechanics.Config.Google.Sheets>

  beforeEach(async () => {
    process.env = { ...OLD_ENV } // Make a copy
    jest.resetModules() // Most important - it clears the cache
    await import('../../../../src/config/google/sheets')
      .then(async (module) => {
        return await module.default
      })
      .then((awaitedModule) => {
        GoogleSheetsConfig = awaitedModule
        return true
      })
      .catch((err) => {
        console.log('GoogleFormsConfig import Error', err)
      })
    jest.resetModules() // Most important - it clears the cache
    process.env.NODE_ENV = 'development'
    await import('../../../../src/config/google/sheets')
      .then(async (module) => {
        return await module.default
      })
      .then((awaitedModule) => {
        GoogleSheetsConfigDev = awaitedModule
        return true
      })
      .catch((err) => {
        console.log('GoogleFormsConfig import Error', err)
      })
    jest.resetModules() // Most important - it clears the cache
    process.env.NODE_ENV = 'production'
    await import('../../../../src/config/google/sheets')
      .then(async (module) => {
        return await module.default
      })
      .then((awaitedModule) => {
        GoogleSheetsConfigProd = awaitedModule
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
    expect(GoogleSheetsConfig).toHaveProperty('workbooks')
    expect(GoogleSheetsConfig.workbooks).toHaveProperty('rosterMechanics')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics).toHaveProperty('worksheets')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets).toHaveProperty('adminRoster')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.adminRoster).toHaveProperty('sheetId')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.adminRoster).toHaveProperty('sheetName')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.adminRoster.sheetName).toBe(
      process.env.GOOGLE_SHEET_ADMIN_NAME,
    )
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets).toHaveProperty('generalRoster')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.generalRoster).toHaveProperty('sheetId')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.generalRoster).toHaveProperty('sheetName')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.generalRoster.sheetName).toBe(
      process.env.GOOGLE_SHEET_GENERAL_NAME,
    )
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets).toHaveProperty('suspensionLog')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.suspensionLog).toHaveProperty('sheetId')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.suspensionLog).toHaveProperty('sheetName')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.suspensionLog.sheetName).toBe(
      process.env.GOOGLE_SHEET_SUSPENSION_NAME,
    )
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets).toHaveProperty('pseudoRoster')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.pseudoRoster).toHaveProperty('sheetId')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.pseudoRoster).toHaveProperty('sheetName')
    expect(GoogleSheetsConfig.workbooks.rosterMechanics.worksheets.pseudoRoster.sheetName).toBe(
      process.env.GOOGLE_SHEET_PSEUDO_NAME,
    )
  })
  it('should have correct "sheetId" when "isProd" is "true"', () => {
    expect(GoogleSheetsConfigProd.workbooks.rosterMechanics.worksheets.adminRoster.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_PROD,
    )
    expect(GoogleSheetsConfigProd.workbooks.rosterMechanics.worksheets.generalRoster.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_PROD,
    )
    expect(GoogleSheetsConfigProd.workbooks.rosterMechanics.worksheets.suspensionLog.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_PROD,
    )
    expect(GoogleSheetsConfigProd.workbooks.rosterMechanics.worksheets.pseudoRoster.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_PROD,
    )
  })
  it('should have correct "sheetId" when "isProd" is "false"', () => {
    expect(GoogleSheetsConfigDev.workbooks.rosterMechanics.worksheets.adminRoster.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_DEV,
    )
    expect(GoogleSheetsConfigDev.workbooks.rosterMechanics.worksheets.generalRoster.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_DEV,
    )
    expect(GoogleSheetsConfigDev.workbooks.rosterMechanics.worksheets.suspensionLog.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_DEV,
    )
    expect(GoogleSheetsConfigDev.workbooks.rosterMechanics.worksheets.pseudoRoster.sheetId).toBe(
      process.env.GOOGLE_WORKBOOK_ID_DEV,
    )
  })
})
