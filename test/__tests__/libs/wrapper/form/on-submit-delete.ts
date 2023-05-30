import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import GoogleFormsConfig from '../../../../../src/config/google/forms'
import GoogleFormDelete from '../../../../../src/libs/google-apps/form/google-form-delete'
import onFormSubmitDelete from '../../../../../src/libs/wrapper/form/on-submit-delete'
import * as deleteUser from '../../../../../src/libs/google-apps/admin/delete-or-undelete-user'
// import * as deleteFormResponse from '../../../../../src/libs/google-apps/form/delete-form-response'

let googleForm: RosterMechanics.GoogleApps.Form.IGoogleFormDelete
let getLatestResponseObjectSpy: jest.SpiedFunction<() => RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject>
let deleteUserSpy: jest.SpiedFunction<typeof deleteUser.default>
// let deleteFormResponseSpy: jest.SpiedFunction<typeof deleteFormResponse.default>

beforeAll(async () => {
  googleForm = new GoogleFormDelete((await GoogleFormsConfig).forms.hireUpdate.formId)
  getLatestResponseObjectSpy = jest.spyOn(Object.getPrototypeOf(googleForm), 'getLatestResponseObject')
  deleteUserSpy = jest.spyOn(deleteUser, 'default')
  // deleteFormResponseSpy = jest.spyOn(deleteFormResponse, 'default')
})

describe('onFormSubmitDelete', () => {
  const OLD_ENV = process.env

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.resetModules()
    process.env = OLD_ENV // Restore old environment
  })

  it('should call "googleForm.getLatestResponseObject()" & "suspendUser" & "TESTRosterMechanicsADMIN.updateSheet()"', async () => {
    process.env.NODE_ENV = 'development'

    // @ts-expect-error the property TESTRosterMechanicsADMIN exists
    const updateSheetSpy = jest.spyOn(global.TESTRosterMechanicsADMIN, 'updateSheet')

    await onFormSubmitDelete()
    expect(getLatestResponseObjectSpy).toHaveBeenCalled()
    expect(deleteUserSpy).toHaveBeenCalled()
    // expect(deleteFormResponseSpy).toHaveBeenCalledTimes(2)
    expect(updateSheetSpy).toHaveBeenCalled()
  })
  it('should call "googleForm.getLatestResponseObject()" & "suspendUser" & "RosterMechanicsSheetADMIN.updateSheet()"', async () => {
    process.env.NODE_ENV = 'production'

    // @ts-expect-error the property RosterMechanicsSheetADMIN exists
    const updateSheetSpy = jest.spyOn(global.RosterMechanicsSheetADMIN, 'updateSheet')

    await onFormSubmitDelete()
    expect(getLatestResponseObjectSpy).toHaveBeenCalled()
    expect(deleteUserSpy).toHaveBeenCalled()
    // expect(deleteFormResponseSpy).toHaveBeenCalledTimes(2)
    expect(updateSheetSpy).toHaveBeenCalled()
  })
})
