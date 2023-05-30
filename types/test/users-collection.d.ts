declare namespace RosterMechanics {
  namespace Test {
    namespace UsersCollection {
      interface IUsersCollection {
        get: (
          userKey: string,
          optionalArgs?: RosterMechanics.GoogleApps.Admin.Request.Params.Get,
        ) => RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
        insert: (
          resource: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
        ) => RosterMechanics.GoogleApps.Admin.Response.Body.Get
        list: (
          optionalArgs: RosterMechanics.GoogleApps.Admin.Request.Params.List,
        ) => RosterMechanics.GoogleApps.Admin.Response.Body.List
        remove: (userKey: string) => void
        undelete: (resource: GoogleAppsScript.AdminDirectory.Schema.UserUndelete, userKey: string) => void
        update: (
          resource: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
          userKey: string,
        ) => RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
      }
    }
  }
}
