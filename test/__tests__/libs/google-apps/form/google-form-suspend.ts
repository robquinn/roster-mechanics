import { describe, expect, it } from '@jest/globals'
import GoogleFormSuspend from '../../../../../src/libs/google-apps/form/google-form-suspend'

describe('GoogleFormSuspend', () => {
  it('should process form response and contain all correct fields', async () => {
    const fakeFormId = 'asdUfu9l_Cjsxp7ic7345uUwmzytZ-2kHjeifqrYDibM'
    const googleForm = new GoogleFormSuspend(fakeFormId)
    const responseObject = await googleForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.Suspend>()

    const dateRegex = /\d{4}-\d{2}-\d{2}/
    // const yesOrNoArr = ['Yes', 'No']
    const stringType = 'string'

    console.log('theresponseobj', responseObject)
    expect(googleForm).toBeInstanceOf(GoogleFormSuspend)
    expect(typeof responseObject.editResponseUrl).toBe(stringType)
    expect(typeof responseObject.email).toBe(stringType)
    expect(typeof responseObject.id).toBe(stringType)
    expect(typeof responseObject.inactiveReason).toBe(stringType)
    expect(typeof responseObject.newBrokerage).toBe(stringType)
    expect(responseObject.severDate).toMatch(dateRegex)
    expect(typeof responseObject.suspend).toBe(stringType)
    expect(typeof responseObject.timestamp).toBe(stringType)
  })
})
