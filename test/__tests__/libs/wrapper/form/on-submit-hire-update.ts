import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import GoogleFormsConfig from '../../../../../src/config/google/forms'
import * as upsertUser from '../../../../../src/libs/google-apps/admin/upsert-user'
import GoogleFormHireUpdate from '../../../../../src/libs/google-apps/form/google-form-hire-update'
import * as exponentialBackoffAsync from '../../../../../src/libs/utils/general/exponential-backoff-async'
import onFormSubmitHireUpdate from '../../../../../src/libs/wrapper/form/on-submit-hire-update'

let googleForm: RosterMechanics.GoogleApps.Form.IGoogleFormHireUpdate
let getLatestResponseObjectSpy: jest.SpiedFunction<() => RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject>
let exponentialBackoffSyncSpy: jest.SpiedFunction<typeof exponentialBackoffAsync.default>
//  updateSheetSpy = jest.SpiedFunction<typeof updateSheet.default>
let upsertUserSpy: jest.SpiedFunction<typeof upsertUser.default>

beforeAll(async () => {
  googleForm = new GoogleFormHireUpdate((await GoogleFormsConfig).forms.hireUpdate.formId)
  getLatestResponseObjectSpy = jest.spyOn(Object.getPrototypeOf(googleForm), 'getLatestResponseObject')
  exponentialBackoffSyncSpy = jest.spyOn(exponentialBackoffAsync, 'default')
  //  updateSheetSpy = jest.spyOn(updateSheet, 'default')
  upsertUserSpy = jest.spyOn(upsertUser, 'default')
})
describe('onFormSubmitHireUpdate', () => {
  const OLD_ENV = process.env

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  // const googleForm = new GoogleForm(GoogleFormsConfig.forms.hireUpdate.formId)
  // const getLatestResponseObjectSpy = jest.spyOn(Object.getPrototypeOf(googleForm), 'getLatestResponseObject')
  // const exponentialBackoffSyncSpy = jest.spyOn(exponentialBackoffSync, 'default')
  // // const updateSheetSpy = jest.spyOn(updateSheet, 'default')
  // const upsertUserSpy = jest.spyOn(upsertUser, 'default')
  it('should call "googleForm.getLatestResponseObject()" & "exponentialBackoffSync" & "TESTRosterMechanicsADMIN.updateSheet()"', async () => {
    process.env.NODE_ENV = 'development'

    // @ts-expect-error the property TESTRosterMechanicsADMIN exists
    const updateSheetSpy = jest.spyOn(global.TESTRosterMechanicsADMIN, 'updateSheet')

    await onFormSubmitHireUpdate()
    expect(getLatestResponseObjectSpy).toHaveBeenCalled()
    expect(exponentialBackoffSyncSpy).toHaveBeenCalled()
    expect(upsertUserSpy).toHaveBeenCalled()
    expect(updateSheetSpy).toHaveBeenCalled()
  })
  it('should call "googleForm.getLatestResponseObject()" & "exponentialBackoffSync" & "RosterMechanicsSheetADMIN.updateSheet()"', async () => {
    process.env.NODE_ENV = 'production'

    // @ts-expect-error the property RosterMechanicsSheetADMIN exists
    const updateSheetSpy = jest.spyOn(global.RosterMechanicsSheetADMIN, 'updateSheet')

    await onFormSubmitHireUpdate()
    expect(getLatestResponseObjectSpy).toHaveBeenCalled()
    expect(exponentialBackoffSyncSpy).toHaveBeenCalled()
    expect(upsertUserSpy).toHaveBeenCalled()
    expect(updateSheetSpy).toHaveBeenCalled()
  })
})
