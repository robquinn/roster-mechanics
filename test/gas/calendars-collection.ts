type ICalendarsCollection = RosterMechanics.Test.CalendarsCollection.ICalendarsCollection

export default class CalendarsCollection implements ICalendarsCollection {
  private _calendars: RosterMechanics.Test.CalendarsCollection.Calendars
  constructor() {
    this._calendars = new Map<string, GoogleAppsScript.AdminDirectory.Schema.CalendarResource[]>()
  }

  private get calendars(): RosterMechanics.Test.CalendarsCollection.Calendars {
    return this._calendars
  }

  private set calendars(calendars: RosterMechanics.Test.CalendarsCollection.Calendars) {
    this._calendars = calendars
  }

  // Retrieves a calendar resource.
  get(customer: string, calendarResourceId: string): GoogleAppsScript.AdminDirectory.Schema.CalendarResource {
    return this.calendars
      .get(customer)
      ?.find((cal) => cal.resourceId === calendarResourceId) as GoogleAppsScript.AdminDirectory.Schema.CalendarResource
  }

  // Inserts a calendar resource.
  insert(
    resource: GoogleAppsScript.AdminDirectory.Schema.RoleAssignment,
    customer: string,
  ): GoogleAppsScript.AdminDirectory.Schema.CalendarResource {
    if (!this.calendars.has(customer)) {
      this.calendars.set(customer, [])
    }
    this.calendars.get(customer)?.push(resource)
    return resource
  }

  //   // Retrieves a list of calendar resources for an account.
  //   list(customer: string): GoogleAppsScript.AdminDirectory.Schema.CalendarResources {}
  //   // Retrieves a list of calendar resources for an account.
  //   list(customer: string, optionalArgs: object): GoogleAppsScript.AdminDirectory.Schema.CalendarResources {}
  //   // Updates a calendar resource.
  //   // This method supports patch semantics, meaning you only need to include the fields you wish to update. Fields that are not present in the request will be preserved. This method supports patch semantics.
  //   patch(
  //     resource: Schema.CalendarResource,
  //     customer: string,
  //     calendarResourceId: string,
  //   ): GoogleAppsScript.AdminDirectory.Schema.CalendarResource {}

  //   // Deletes a calendar resource.
  //   remove(customer: string, calendarResourceId: string): void {}
  //   // Updates a calendar resource.
  //   // This method supports patch semantics, meaning you only need to include the fields you wish to update. Fields that are not present in the request will be preserved.
  update(
    resource: GoogleAppsScript.AdminDirectory.Schema.RoleAssignment,
    customer: string,
    calendarResourceId: string,
  ): GoogleAppsScript.AdminDirectory.Schema.CalendarResource {
    const calendars: GoogleAppsScript.AdminDirectory.Schema.CalendarResource[] = this.calendars.get(
      customer,
    ) as GoogleAppsScript.AdminDirectory.Schema.CalendarResource[]
    const calendar: GoogleAppsScript.AdminDirectory.Schema.CalendarResource = calendars.find(
      (cal) => cal.resourceId === calendarResourceId,
    ) as GoogleAppsScript.AdminDirectory.Schema.CalendarResource
    calendars[calendars.indexOf(calendar)] = resource
    this.calendars.set(customer, calendars)
    return resource
  }
}
