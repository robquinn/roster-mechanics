import gmailAppSendEmailParamsValidation from './utils/gmail-app/send-email-params-validation'

type IGmailApp = RosterMechanics.Test.GmailApp.IGmailApp

export default class GmailApp implements IGmailApp {
  private readonly aliases
  constructor() {
    this.aliases = ['some.alias@somecompany.com', 'some.otheralias@somecompany.com']
  }

  // createDraft(recipient: string, subject: string, body: string): GmailDraft {}
  // createDraft(recipient: string, subject: string, body: string, options: GmailAdvancedOptions): GmailDraft {}
  // createLabel(name: string): GmailLabel {}
  // deleteLabel(label: GmailLabel): GmailApp {}
  getAliases(): string[] {
    return this.aliases
  }

  // getChatThreads(): GmailThread[] {}
  // getChatThreads(start: Integer, max: Integer): GmailThread[] {}
  // getDraft(draftId: string): GmailDraft {}
  // getDraftMessages(): GmailMessage[] {}
  // getDrafts(): GmailDraft[] {}
  // getInboxThreads(): GmailThread[] {}
  // getInboxThreads(start: Integer, max: Integer): GmailThread[] {}
  // getInboxUnreadCount(): Integer {}
  // getMessageById(id: string): GmailMessage {}
  // getMessagesForThread(thread: GmailThread): GmailMessage[] {}
  // getMessagesForThreads(threads: GmailThread[]): GmailMessage[][] {}
  // getPriorityInboxThreads(): GmailThread[] {}
  // getPriorityInboxThreads(start: Integer, max: Integer): GmailThread[] {}
  // getPriorityInboxUnreadCount(): Integer {}
  // getSpamThreads(): GmailThread[] {}
  // getSpamThreads(start: Integer, max: Integer): GmailThread[] {}
  // getSpamUnreadCount(): Integer {}
  // getStarredThreads(): GmailThread[] {}
  // getStarredThreads(start: Integer, max: Integer): GmailThread[] {}
  // getStarredUnreadCount(): Integer {}
  // getThreadById(id: string): GmailThread {}
  // getTrashThreads(): GmailThread[] {}
  // getTrashThreads(start: Integer, max: Integer): GmailThread[] {}
  // getUserLabelByName(name: string): GmailLabel {}
  // getUserLabels(): GmailLabel[] {}
  // markMessageRead(message: GmailMessage): GmailApp {}
  // markMessageUnread(message: GmailMessage): GmailApp {}
  // markMessagesRead(messages: GmailMessage[]): GmailApp {}
  // markMessagesUnread(messages: GmailMessage[]): GmailApp {}
  // markThreadImportant(thread: GmailThread): GmailApp {}
  // markThreadRead(thread: GmailThread): GmailApp {}
  // markThreadUnimportant(thread: GmailThread): GmailApp {}
  // markThreadUnread(thread: GmailThread): GmailApp {}
  // markThreadsImportant(threads: GmailThread[]): GmailApp {}
  // markThreadsRead(threads: GmailThread[]): GmailApp {}
  // markThreadsUnimportant(threads: GmailThread[]): GmailApp {}
  // markThreadsUnread(threads: GmailThread[]): GmailApp {}
  // moveMessageToTrash(message: GmailMessage): GmailApp {}
  // moveMessagesToTrash(messages: GmailMessage[]): GmailApp {}
  // moveThreadToArchive(thread: GmailThread): GmailApp {}
  // moveThreadToInbox(thread: GmailThread): GmailApp {}
  // moveThreadToSpam(thread: GmailThread): GmailApp {}
  // moveThreadToTrash(thread: GmailThread): GmailApp {}
  // moveThreadsToArchive(threads: GmailThread[]): GmailApp {}
  // moveThreadsToInbox(threads: GmailThread[]): GmailApp {}
  // moveThreadsToSpam(threads: GmailThread[]): GmailApp {}
  // moveThreadsToTrash(threads: GmailThread[]): GmailApp {}
  // refreshMessage(message: GmailMessage): GmailApp {}
  // refreshMessages(messages: GmailMessage[]): GmailApp {}
  // refreshThread(thread: GmailThread): GmailApp {}
  // refreshThreads(threads: GmailThread[]): GmailApp {}
  // search(query: string): GmailThread[] {}
  // search(query: string, start: Integer, max: Integer): GmailThread[] {}
  // sendEmail(recipient: string, subject: string, body: string): GmailApp {}
  sendEmail(
    recipient: string,
    subject: string,
    body: string,
    options: GoogleAppsScript.Gmail.GmailAdvancedOptions,
  ): RosterMechanics.Test.GmailApp.IGmailApp {
    gmailAppSendEmailParamsValidation(recipient, subject, body, options)
    return this
  }
  // setCurrentMessageAccessToken(accessToken: string): void {}
  // starMessage(message: GmailMessage): GmailApp {}
  // starMessages(messages: GmailMessage[]): GmailApp {}
  // unstarMessage(message: GmailMessage): GmailApp {}
  // unstarMessages(messages: GmailMessage[]): GmailApp {}
}
