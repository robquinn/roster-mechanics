declare namespace RosterMechanics {
  namespace Test {
    namespace AclCollection {
      type Acls = Map<string, GoogleAppsScript.Calendar.Schema.AclRule[]>
      interface IAclCollection {
        get: (calendarId: string, ruleId: string) => GoogleAppsScript.Calendar.Schema.AclRule
        insert: (
          resource: GoogleAppsScript.Calendar.Schema.AclRule,
          calendarId: string,
        ) => GoogleAppsScript.Calendar.Schema.AclRule
        update: (
          resource: GoogleAppsScript.Calendar.Schema.AclRule,
          calendarId: string,
          ruleId: string,
        ) => GoogleAppsScript.Calendar.Schema.AclRule
      }
    }
  }
}
