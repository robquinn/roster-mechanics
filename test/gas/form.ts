type IForm = RosterMechanics.Test.Form.IForm

export default class Form implements IForm {
  private readonly formResponses
  constructor(formResponses: RosterMechanics.Test.FormResponse.IFormResponse[]) {
    this.formResponses = formResponses
  }

  //   addCheckboxGridItem(): CheckboxGridItem {}
  //   addCheckboxItem(): CheckboxItem {}
  //   addDateItem(): DateItem {}
  //   addDateTimeItem(): DateTimeItem {}
  //   addDurationItem(): DurationItem {}
  //   addEditor(emailAddress: string): Form {}
  //   addEditor(user: Base.User): Form {}
  //   addEditors(emailAddresses: string[]): Form {}
  //   addGridItem(): GridItem {}
  //   addImageItem(): ImageItem {}
  //   addListItem(): ListItem {}
  //   addMultipleChoiceItem(): MultipleChoiceItem {}
  //   addPageBreakItem(): PageBreakItem {}
  //   addParagraphTextItem(): ParagraphTextItem {}
  //   addScaleItem(): ScaleItem {}
  //   addSectionHeaderItem(): SectionHeaderItem {}
  //   addTextItem(): TextItem {}
  //   addTimeItem(): TimeItem {}
  //   addVideoItem(): VideoItem {}
  //   canEditResponse(): boolean {}
  //   collectsEmail(): boolean {}
  //   createResponse(): FormResponse {}
  //   deleteAllResponses(): Form {}
  //   deleteItem(index: Integer): void {}
  //   deleteItem(item: Item): void {}
  deleteResponse(responseId: string): RosterMechanics.Test.Form.IForm {
    if (typeof responseId !== 'string') {
      throw new Error('Form deleteResponse param responseId must be a string')
    }
    // const formResponse = this.formResponses.find((r) => r.getId() === responseId)
    // if (formResponse != null) {
    //   const indexOf = this.formResponses.indexOf(formResponse)
    //   if (indexOf > -1) {
    //     this.formResponses.splice(indexOf, 1)
    //   }
    // }
    return this
  }
  //   getConfirmationMessage(): string {}
  //   getCustomClosedFormMessage(): string {}
  //   getDescription(): string {}
  //   getDestinationId(): string {}
  //   getDestinationType(): DestinationType {}
  //   getEditUrl(): string {}
  //   getEditors(): Base.User[] {}
  //   getId(): string {}
  //   getItemById(id: Integer): Item {}
  //   getItems(): Item[] {}
  //   getItems(itemType: ItemType): Item[] {}
  //   getPublishedUrl(): string {}
  //   getResponse(responseId: string): FormResponse {}

  getResponses(): RosterMechanics.Test.FormResponse.IFormResponse[] {
    return this.formResponses
  }

  //   getResponses(timestamp: Base.Date): FormResponse[] {}
  //   getShuffleQuestions(): boolean {}
  //   getSummaryUrl(): string {}
  //   getTitle(): string {}
  //   hasLimitOneResponsePerUser(): boolean {}
  //   hasProgressBar(): boolean {}
  //   hasRespondAgainLink(): boolean {}
  //   isAcceptingResponses(): boolean {}
  //   isPublishingSummary(): boolean {}
  //   isQuiz(): boolean {}
  //   moveItem(from: Integer, to: Integer): Item {}
  //   moveItem(item: Item, toIndex: Integer): Item {}
  //   removeDestination(): Form {}
  //   removeEditor(emailAddress: string): Form {}
  //   removeEditor(user: Base.User): Form {}
  //   requiresLogin(): boolean {}
  //   setAcceptingResponses(enabled: boolean): Form {}
  //   setAllowResponseEdits(enabled: boolean): Form {}
  //   setCollectEmail(collect: boolean): Form {}
  //   setConfirmationMessage(message: string): Form {}
  //   setCustomClosedFormMessage(message: string): Form {}
  //   setDescription(description: string): Form {}
  //   setDestination(type: DestinationType, id: string): Form {}
  //   setIsQuiz(enabled: boolean): Form {}
  //   setLimitOneResponsePerUser(enabled: boolean): Form {}
  //   setProgressBar(enabled: boolean): Form {}
  //   setPublishingSummary(enabled: boolean): Form {}
  //   setRequireLogin(requireLogin: boolean): Form {}
  //   setShowLinkToRespondAgain(enabled: boolean): Form {}
  //   setShuffleQuestions(shuffle: boolean): Form {}
  //   setTitle(title: string): Form {}
  //   shortenFormUrl(url: string): string {}
  //   submitGrades(responses: FormResponse[]): Form {}
}
