declare namespace RosterMechanics {
  namespace Test {
    namespace CalendarsCollection {
      type Calendars = Map<string, GoogleAppsScript.AdminDirectory.Schema.CalendarResource[]>
      interface ICalendarsCollection {
        get: (customer: string, calendarResourceId: string) => GoogleAppsScript.AdminDirectory.Schema.CalendarResource
        insert: (
          resource: GoogleAppsScript.AdminDirectory.Schema.RoleAssignment,
          customer: string,
        ) => GoogleAppsScript.AdminDirectory.Schema.CalendarResource
        update: (
          resource: GoogleAppsScript.AdminDirectory.Schema.RoleAssignment,
          customer: string,
          calendarResourceId: string,
        ) => GoogleAppsScript.AdminDirectory.Schema.CalendarResource
      }
    }
  }
}
