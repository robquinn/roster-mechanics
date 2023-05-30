declare namespace RosterMechanics {
  namespace Test {
    namespace ResourcesCollection {
      interface IResourcesCollection {
        get Calendars(): RosterMechanics.Test.CalendarsCollection.ICalendarsCollection
      }
    }
  }
}
