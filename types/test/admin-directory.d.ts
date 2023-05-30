declare namespace RosterMechanics {
  namespace Test {
    namespace AdminDirectory {
      interface IAdminDirectory {
        get Users(): RosterMechanics.Test.UsersCollection.IUsersCollection
        get Members(): RosterMechanics.Test.MembersCollection.IMembersCollection
      }
    }
  }
}
