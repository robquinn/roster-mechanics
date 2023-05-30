import { describe, expect, it } from '@jest/globals'
import GoogleFormDelete from '../../../../../src/libs/google-apps/form/google-form-delete'

describe('GoogleFormDelete', () => {
  it('should process form response and contain all correct fields', async () => {
    const fakeFormId = 'asdUfu9l_Cjsxp7ic7345uUwmzytZ-2kHjeifqrYDibM'
    const googleForm = new GoogleFormDelete(fakeFormId)
    const responseObject = await googleForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.Delete>()

    const stringType = 'string'

    expect(googleForm).toBeInstanceOf(GoogleFormDelete)
    expect(typeof responseObject.id).toBe(stringType)
    expect(typeof responseObject.editResponseUrl).toBe(stringType)
    expect(typeof responseObject.email).toBe(stringType)
    expect(typeof responseObject.delete).toBe(stringType)
    expect(typeof responseObject.timestamp).toBe(stringType)
  })
})
