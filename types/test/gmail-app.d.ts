declare namespace RosterMechanics {
  namespace Test {
    namespace GmailApp {
      namespace Fn {
        type GmailAppSendEmailParamsValidation = (
          recipient: string,
          subject: string,
          body: string,
          options: GoogleAppsScript.Mail.MailAdvancedParameters,
        ) => void
      }
      interface IGmailApp {
        getAliases: () => string[]
        sendEmail: (
          recipient: string,
          subject: string,
          body: string,
          options: GoogleAppsScript.Gmail.GmailAdvancedOptions,
        ) => RosterMechanics.Test.GmailApp.IGmailApp
      }
    }
  }
}
