declare namespace RosterMechanics {
  namespace Emails {
    interface INewHire {
      send: (sendTo: string[]) => Promise<void>
    }
  }
}
