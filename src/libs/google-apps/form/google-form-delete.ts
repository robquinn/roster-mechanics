// import staticImplements from '../../utils/general/static-implements'
import GoogleFormBase from './google-form-base'

type IGoogleFormDelete = RosterMechanics.GoogleApps.Form.IGoogleFormDelete

// type FormResponseDeleteObject = RosterMechanics.GoogleApps.Form.FormResponseDeleteObject

// type FormResponseDeleteExtended = RosterMechanics.GoogleApps.Form.FormResponseDeleteExtended

type Delete = RosterMechanics.GoogleApps.Form.FormTypes.Delete

export default class GoogleFormDelete extends GoogleFormBase implements IGoogleFormDelete {
  constructor(formId: string) {
    super(formId, 'delete')
  }

  static async toCamelCase(
    objWithMetadata: RosterMechanics.GoogleApps.Form.Utils.FormResponseExtended<Delete>,
  ): Promise<RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<Delete>> {
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
