declare namespace RosterMechanics {
  namespace Wrapper {
    namespace Gmail {
      namespace Fn {
        type CreateJustListedFilter = (
          googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
        ) => Promise<void>
        type SaveUserSignature = (googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => Promise<void>
        type SendNewHireEmail = (googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => Promise<void>
        type SendWelcomeEmail = (googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => Promise<void>
      }
    }
  }
}
