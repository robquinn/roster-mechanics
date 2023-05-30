// type FormResponseHireUpdateExtended = RosterMechanics.GoogleApps.Form.FormResponseHireUpdateExtended
// type FormResponseSuspendExtended = RosterMechanics.GoogleApps.Form.FormResponseSuspendExtended
// type FormResponseDeleteExtended = RosterMechanics.GoogleApps.Form.FormResponseDeleteExtended

type FormResponseHireUpdate = RosterMechanics.GoogleApps.Form.FormResponseHireUpdate
type FormResponseSuspend = RosterMechanics.GoogleApps.Form.FormResponseSuspend
type FormResponseDelete = RosterMechanics.GoogleApps.Form.FormResponseDelete

// type FormResponseHireUpdateObject = RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject
// type FormResponseSuspendObject = RosterMechanics.GoogleApps.Form.FormResponseSuspendObject
// type FormResponseDeleteObject = RosterMechanics.GoogleApps.Form.FormResponseDeleteObject

type IGoogleFormBase = RosterMechanics.GoogleApps.Form.IGoogleFormBase

export default abstract class GoogleFormBase implements IGoogleFormBase {
  private formResponse: GoogleAppsScript.Forms.FormResponse | undefined
  private readonly type: RosterMechanics.GoogleApps.Form.FormTypes.Types
  private readonly formId: string

  constructor(formId: string, type: RosterMechanics.GoogleApps.Form.FormTypes.Types) {
    this.formId = formId
    this.type = type
  }

  public async getLatestResponseObject<T extends RosterMechanics.GoogleApps.Form.FormTypes.Types>(): Promise<
    RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<T>
  > {
    await this.getLastestResponse()
    return await this.responseToObject<T>()
  }

  private async responseToObject<T>(): Promise<RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<T>> {
    const objectWithoutMetaData = await this.makeFromArray()
    const withMetaData = await this.addMetadata(objectWithoutMetaData)
    const responseObject: RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<typeof this.type> = await (
      Object.getPrototypeOf(this as GoogleFormBase) as RosterMechanics.GoogleApps.Form.Utils.ObjectPrototypeOf<
        typeof this.type
      >
    ).constructor // @ts-expect-error withMetaData will be the correct type at runtime
      .toCamelCase(withMetaData)
    return await new Promise((resolve) => {
      resolve(responseObject as RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<T>)
    })
  }

  private async getLastestResponse(): Promise<GoogleAppsScript.Forms.FormResponse> {
    return await new Promise((resolve) => {
      const formResponses = FormApp.openById(this.formId).getResponses()
      const formResponse = formResponses[formResponses.length - 1]
      this.formResponse = formResponse
      resolve(formResponse)
    })
  }

  private async makeFromArray(): Promise<RosterMechanics.GoogleApps.Form.Utils.FormResponse<typeof this.type>> {
    return await new Promise((resolve) => {
      const objectWithoutMetaData = (this.formResponse as GoogleAppsScript.Forms.FormResponse)
        .getItemResponses()
        .reduce((acc: Record<string, string | string[] | string[][]>, val: GoogleAppsScript.Forms.ItemResponse) => {
          acc[val.getItem().getTitle()] = val.getResponse()
          return acc
        }, {}) as unknown as FormResponseHireUpdate | FormResponseSuspend | FormResponseDelete
      resolve(objectWithoutMetaData)
    })
  }

  private async addMetadata(
    object: RosterMechanics.GoogleApps.Form.Utils.FormResponse<typeof this.type>,
  ): Promise<RosterMechanics.GoogleApps.Form.Utils.FormResponseExtended<typeof this.type>> {
    return await new Promise((resolve) => {
      const withMetaData = Object.assign(object, {
        Timestamp: (this.formResponse as GoogleAppsScript.Forms.FormResponse).getTimestamp().toString(),
        'Edit Response URL': (this.formResponse as GoogleAppsScript.Forms.FormResponse).getEditResponseUrl(),
        ID: (this.formResponse as GoogleAppsScript.Forms.FormResponse).getId(),
      })
      resolve(withMetaData)
    })
  }
}
