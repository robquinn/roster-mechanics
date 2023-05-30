declare namespace RosterMechanics {
  namespace Emails {
    interface ISuspensionEmail {
      send: () => Promise<void>
    }
  }
}
