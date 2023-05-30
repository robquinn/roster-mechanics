import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import GoogleFormsConfig from '../../../../../src/config/google/forms'
import * as suspendUser from '../../../../../src/libs/google-apps/admin/suspend-or-unsuspend-user'
import GoogleFormSuspend from '../../../../../src/libs/google-apps/form/google-form-suspend'
import onFormSubmitSuspend from '../../../../../src/libs/wrapper/form/on-submit-suspend'

let googleForm: RosterMechanics.GoogleApps.Form.IGoogleFormSuspend
let getLatestResponseObjectSpy: jest.SpiedFunction<() => RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject>
let suspendUserSpy: jest.SpiedFunction<typeof suspendUser.default>

beforeAll(async () => {
  googleForm = new GoogleFormSuspend((await GoogleFormsConfig).forms.hireUpdate.formId)
  getLatestResponseObjectSpy = jest.spyOn(Object.getPrototypeOf(googleForm), 'getLatestResponseObject')
  suspendUserSpy = jest.spyOn(suspendUser, 'default')
})
describe('onFormSubmitSuspend', () => {
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

    await onFormSubmitSuspend()
    expect(getLatestResponseObjectSpy).toHaveBeenCalled()
    expect(suspendUserSpy).toHaveBeenCalled()
    expect(updateSheetSpy).toHaveBeenCalled()
  })
  it('should call "googleForm.getLatestResponseObject()" & "suspendUser" & "RosterMechanicsSheetADMIN.updateSheet()"', async () => {
    process.env.NODE_ENV = 'production'

    // @ts-expect-error the property RosterMechanicsSheetADMIN exists
    const updateSheetSpy = jest.spyOn(global.RosterMechanicsSheetADMIN, 'updateSheet')

    await onFormSubmitSuspend()
    expect(getLatestResponseObjectSpy).toHaveBeenCalled()
    expect(suspendUserSpy).toHaveBeenCalled()
    expect(updateSheetSpy).toHaveBeenCalled()
  })
})
