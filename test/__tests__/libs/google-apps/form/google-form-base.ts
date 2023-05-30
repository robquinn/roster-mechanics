import { describe, expect, it } from '@jest/globals'
import GoogleFormBase from '../../../../../src/libs/google-apps/form/google-form-base'

type FormResponseDeleteObject = RosterMechanics.GoogleApps.Form.FormResponseDeleteObject

type FormResponseDeleteExtended = RosterMechanics.GoogleApps.Form.FormResponseDeleteExtended

class DummyGoogleForm extends GoogleFormBase {
  constructor(formId: string) {
    super(formId, 'delete')
  }

  static async toCamelCase(objWithMetadata: FormResponseDeleteExtended): Promise<FormResponseDeleteObject> {
    return await new Promise((resolve) => {
      resolve({
        id: objWithMetadata.ID,
        timestamp: objWithMetadata.Timestamp,
        editResponseUrl: objWithMetadata['Edit Response URL'],

        email: objWithMetadata.Email,
        delete: objWithMetadata.Delete,
      })
    })
  }
}

describe('GoogleFormBase', () => {
  it('should process form response and contain all correct fields', async () => {
    const fakeFormId = 'asdUfu9l_Cjsxp7ic7345uUwmzytZ-2kHjeifqrYDibM'
    const googleForm = new DummyGoogleForm(fakeFormId)
    const responseObject = await googleForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.Delete>()

    const stringType = 'string'

    expect(googleForm).toBeInstanceOf(DummyGoogleForm)
    expect(typeof responseObject.id).toBe(stringType)
    expect(typeof responseObject.editResponseUrl).toBe(stringType)
    expect(typeof responseObject.email).toBe(stringType)
    expect(typeof responseObject.delete).toBe(stringType)
    expect(typeof responseObject.timestamp).toBe(stringType)
  })
})
