declare namespace RosterMechanics {
  namespace Test {
    namespace MembersCollection {
      type Members = Map<string, GoogleAppsScript.AdminDirectory.Schema.Member[]>
      interface IMembersCollection {
        get: (groupKey: string, memberKey: string) => GoogleAppsScript.AdminDirectory.Schema.Member
        hasMember: (groupKey: string, memberKey: string) => GoogleAppsScript.AdminDirectory.Schema.MembersHasMember
        insert: (
          resource: GoogleAppsScript.AdminDirectory.Schema.Member,
          groupKey: string,
        ) => GoogleAppsScript.AdminDirectory.Schema.Member
        remove: (groupKey: string, memberKey: string) => void
      }
    }
  }
}
