import GoogleFormBase from './google-form-base'

type IGoogleFormSuspend = RosterMechanics.GoogleApps.Form.IGoogleFormSuspend

// type FormResponseSuspendObject = RosterMechanics.GoogleApps.Form.FormResponseSuspendObject

// type FormResponseSuspendExtended = RosterMechanics.GoogleApps.Form.FormResponseSuspendExtended

type Suspend = RosterMechanics.GoogleApps.Form.FormTypes.Suspend

export default class GoogleFormSuspend extends GoogleFormBase implements IGoogleFormSuspend {
  constructor(formId: string) {
    super(formId, 'suspend')
  }

  static async toCamelCase(
    objWithMetadata: RosterMechanics.GoogleApps.Form.Utils.FormResponseExtended<Suspend>,
  ): Promise<RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<Suspend>> {
    return await new Promise((resolve) => {
      resolve({
        id: objWithMetadata.ID,
        timestamp: objWithMetadata.Timestamp,
        editResponseUrl: objWithMetadata['Edit Response URL'],

        email: objWithMetadata.Email,
        suspend: objWithMetadata.Suspend,
        severDate: objWithMetadata['Sever Date'],
        inactiveReason: objWithMetadata['Inactive Reason'],
        newBrokerage: objWithMetadata['New Brokerage'],
      })
    })
  }
}
