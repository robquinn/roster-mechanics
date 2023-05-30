type IGmail = RosterMechanics.Test.Gmail.IGmail

export default class Gmail implements IGmail {
  private readonly label
  private readonly labelColor
  private readonly filter
  private readonly filterAction
  private readonly filterCriteria

  constructor() {
    this.label = {
      color: {
        backgroundColor: '',
        textColor: '',
      },
      id: '',
      labelListVisibility: '',
      messageListVisibility: '',
      messagesTotal: 0,
      messagesUnread: 0,
      name: '',
      threadsTotal: 0,
      threadsUnread: 0,
      type: '',
    }
    this.labelColor = {
      backgroundColor: '',
      textColor: '',
    }
    this.filterAction = {
      addLabelIds: [],
      forward: '',
      removeLabelIds: [],
    }
    this.filterCriteria = {
      excludeChats: true,
      from: '',
      hasAttachment: true,
      negatedQuery: '',
      query: '',
      size: 0,
      sizeComparison: '',
      subject: '',
      to: '',
    }
    this.filter = {
      action: { ...this.filterAction },
      criteria: { ...this.filterCriteria },
      id: '',
    }
  }

  // Users?: Gmail.Collection.UsersCollection | undefined;
  // newAutoForwarding(): Gmail.Schema.AutoForwarding {}
  // newBatchDeleteMessagesRequest(): Gmail.Schema.BatchDeleteMessagesRequest {}
  // newBatchModifyMessagesRequest(): Gmail.Schema.BatchModifyMessagesRequest {}
  // newDelegate(): Gmail.Schema.Delegate {}
  // newDraft(): Gmail.Schema.Draft {}
  newFilter(): GoogleAppsScript.Gmail.Schema.Filter {
    return { ...this.filter }
  }

  newFilterAction(): GoogleAppsScript.Gmail.Schema.FilterAction {
    return { ...this.filterAction }
  }

  newFilterCriteria(): GoogleAppsScript.Gmail.Schema.FilterCriteria {
    return { ...this.filterCriteria }
  }

  // newForwardingAddress(): Gmail.Schema.ForwardingAddress {}
  // newImapSettings(): Gmail.Schema.ImapSettings {}
  newLabel(): GoogleAppsScript.Gmail.Schema.Label {
    return { ...this.label }
  }

  newLabelColor(): GoogleAppsScript.Gmail.Schema.LabelColor {
    return { ...this.labelColor }
  }
  // newMessage(): Gmail.Schema.Message {}
  // newMessagePart(): Gmail.Schema.MessagePart {}
  // newMessagePartBody(): Gmail.Schema.MessagePartBody {}
  // newMessagePartHeader(): Gmail.Schema.MessagePartHeader {}
  // newModifyMessageRequest(): Gmail.Schema.ModifyMessageRequest {}
  // newModifyThreadRequest(): Gmail.Schema.ModifyThreadRequest {}
  // newPopSettings(): Gmail.Schema.PopSettings {}
  // newSendAs(): Gmail.Schema.SendAs {}
  // newSmimeInfo(): Gmail.Schema.SmimeInfo {}
  // newSmtpMsa(): Gmail.Schema.SmtpMsa {}
  // newVacationSettings(): Gmail.Schema.VacationSettings {}
  // newWatchRequest(): Gmail.Schema.WatchRequest {}
}
