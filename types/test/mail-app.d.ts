declare namespace RosterMechanics {
  namespace Test {
    namespace MailApp {
      namespace Fn {
        type MailAppSendEmailParamsValidation = (
          recipient: string,
          subject: string,
          body: string,
          options: GoogleAppsScript.Mail.MailAdvancedParameters,
        ) => void
      }
      interface IMailApp {
        sendEmail: (
          recipient: string,
          subject: string,
          body: string,
          options: GoogleAppsScript.Mail.MailAdvancedParameters,
        ) => void
      }
    }
  }
}
