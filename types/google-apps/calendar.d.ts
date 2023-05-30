declare namespace RosterMechanics {
  namespace GoogleApps {
    namespace Calendar {
      namespace Fn {
        type AddRlsirCalendar = (user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => Promise<void>
        type AddUserToCompanyCalendar = (email: string) => Promise<void>
        type ShareCalendar = (email: string) => Promise<GoogleAppsScript.Calendar.Schema.AclRule>
      }
    }
  }
}
