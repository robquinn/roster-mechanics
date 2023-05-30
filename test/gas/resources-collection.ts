import CalendarsCollection from './calendars-collection'

type IResourcesCollection = RosterMechanics.Test.ResourcesCollection.IResourcesCollection

export default class ResourcesCollection implements IResourcesCollection {
  private readonly calendarsCollection: RosterMechanics.Test.CalendarsCollection.ICalendarsCollection

  constructor() {
    this.calendarsCollection = new CalendarsCollection()
  }

  public get Calendars(): RosterMechanics.Test.CalendarsCollection.ICalendarsCollection {
    return this.calendarsCollection
  }
}
