declare namespace RosterMechanics {
  namespace Emails {
    interface IWarmWelcomeEmail {
      send: ({
        toEmail,
        fromEmail,
        fromFirstName,
        fromLastName,
      }: {
        toEmail: string
        fromEmail: string
        fromFirstName: string
        fromLastName: string
      }) => Promise<void>
    }
  }
}
