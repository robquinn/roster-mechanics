declare namespace RosterMechanics {
  namespace Wrapper {
    namespace Company {
      namespace Fn {
        type HandleReHire = (
          googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
        ) => Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>
      }
    }
  }
}
