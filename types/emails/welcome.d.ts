declare namespace RosterMechanics {
  namespace Emails {
    interface IWelcomeEmail {
      send: ({ to, from }: { to: string; from: string }) => void
    }
  }
}
