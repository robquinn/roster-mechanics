type IFormResponse = RosterMechanics.Test.FormResponse.IFormResponse

export default class FormResponse implements IFormResponse {
  private readonly id
  private readonly editResponseUrl
  private readonly itemResponses
  private readonly timestamp
  private readonly respondentEmail
  constructor({
    id,
    editResponseUrl,
    itemResponses,
    timestamp,
    respondentEmail,
  }: {
    id: string
    editResponseUrl: string
    itemResponses: RosterMechanics.Test.ItemResponse.IItemResponse[]
    timestamp: RosterMechanics.Test.GasDate.IGasDate
    respondentEmail: string
  }) {
    this.id = id
    this.editResponseUrl = editResponseUrl
    this.itemResponses = itemResponses
    this.timestamp = timestamp
    this.respondentEmail = respondentEmail
  }

  getId(): string {
    return this.id
  }

  getEditResponseUrl(): string {
    return this.editResponseUrl
  }

  //   getGradableItemResponses(): ItemResponse[] {}
  //   getGradableResponseForItem(item: Item): ItemResponse {}
  //   getId(): string {}
  getItemResponses(): RosterMechanics.Test.ItemResponse.IItemResponse[] {
    return this.itemResponses
  }

  getRespondentEmail(): string {
    return this.respondentEmail
  }

  //   getResponseForItem(item: Item): ItemResponse {}
  getTimestamp(): RosterMechanics.Test.GasDate.IGasDate {
    return this.timestamp
  }
  //   submit(): FormResponse {}
  //   toPrefilledUrl(): string {}
  //   withItemGrade(gradedResponse: ItemResponse): FormResponse {}
  //   withItemResponse(response: ItemResponse): FormResponse {}
}
