import mailAppSendEmailParamsValidation from './utils/mail-app/send-email-params-validation'

type IMailApp = RosterMechanics.Test.MailApp.IMailApp

export default class MailApp implements IMailApp {
  // getRemainingDailyQuota(): Integer {}
  // sendEmail(message: MailAdvancedParameters): void {}
  // sendEmail(recipient: string, subject: string, body: string): void {}

  // eslint-disable-next-line class-methods-use-this
  sendEmail(
    recipient: string,
    subject: string,
    body: string,
    options: GoogleAppsScript.Mail.MailAdvancedParameters,
  ): void {
    mailAppSendEmailParamsValidation(recipient, subject, body, options)
  }

  // sendEmail(to: string, replyTo: string, subject: string, body: string): void {}
}
