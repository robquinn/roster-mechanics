type IAclCollection = RosterMechanics.Test.AclCollection.IAclCollection

export default class AclCollection implements IAclCollection {
  private _acls: RosterMechanics.Test.AclCollection.Acls
  constructor() {
    this._acls = new Map<string, GoogleAppsScript.Calendar.Schema.AclRule[]>()
  }

  private get acls(): RosterMechanics.Test.AclCollection.Acls {
    return this._acls
  }

  private set acls(acls: RosterMechanics.Test.AclCollection.Acls) {
    this._acls = acls
  }

  //   // Returns an access control rule.
  get(calendarId: string, ruleId: string): GoogleAppsScript.Calendar.Schema.AclRule {
    return this.acls
      .get(calendarId)
      ?.find((acl) => acl.id === ruleId) as GoogleAppsScript.AdminDirectory.Schema.CalendarResource
  }

  //   // Returns an access control rule.
  //   get(calendarId: string, ruleId: string, optionalArgs: object, headers: object): Calendar.Schema.AclRule;
  //   // Creates an access control rule.
  insert(
    resource: GoogleAppsScript.Calendar.Schema.AclRule,
    calendarId: string,
  ): GoogleAppsScript.Calendar.Schema.AclRule {
    if (!this.acls.has(calendarId)) {
      this.acls.set(calendarId, [])
    }
    this.acls.get(calendarId)?.push(resource)
    return resource
  }

  //   // Creates an access control rule.
  //   insert(resource: Schema.AclRule, calendarId: string, optionalArgs: object): Calendar.Schema.AclRule;
  //   // Creates an access control rule.
  //   insert(resource: Schema.AclRule, calendarId: string, optionalArgs: object, headers: object): Calendar.Schema.AclRule;
  //   // Returns the rules in the access control list for the calendar.
  //   list(calendarId: string): Calendar.Schema.Acl;
  //   // Returns the rules in the access control list for the calendar.
  //   list(calendarId: string, optionalArgs: object): Calendar.Schema.Acl;
  //   // Returns the rules in the access control list for the calendar.
  //   list(calendarId: string, optionalArgs: object, headers: object): Calendar.Schema.Acl;
  //   // Updates an access control rule. This method supports patch semantics.
  //   patch(resource: Schema.AclRule, calendarId: string, ruleId: string): Calendar.Schema.AclRule;
  //   // Updates an access control rule. This method supports patch semantics.
  //   patch(resource: Schema.AclRule, calendarId: string, ruleId: string, optionalArgs: object): Calendar.Schema.AclRule;
  //   // Updates an access control rule. This method supports patch semantics.
  //   patch(resource: Schema.AclRule, calendarId: string, ruleId: string, optionalArgs: object, headers: object): Calendar.Schema.AclRule;
  //   // Deletes an access control rule.
  //   remove(calendarId: string, ruleId: string): void;
  //   // Deletes an access control rule.
  //   remove(calendarId: string, ruleId: string, optionalArgs: object, headers: object): void;
  //   // Updates an access control rule.
  update(
    resource: GoogleAppsScript.Calendar.Schema.AclRule,
    calendarId: string,
    ruleId: string,
  ): GoogleAppsScript.Calendar.Schema.AclRule {
    const acls: GoogleAppsScript.Calendar.Schema.AclRule[] = this.acls.get(
      calendarId,
    ) as GoogleAppsScript.Calendar.Schema.AclRule[]
    const acl: GoogleAppsScript.Calendar.Schema.AclRule = acls.find(
      (a) => a.id === ruleId,
    ) as GoogleAppsScript.Calendar.Schema.AclRule
    acls[acls.indexOf(acl)] = resource
    this.acls.set(calendarId, acls)
    return resource
  }
  //   // Updates an access control rule.
  //   update(resource: Schema.AclRule, calendarId: string, ruleId: string, optionalArgs: object): Calendar.Schema.AclRule;
  //   // Updates an access control rule.
  //   update(resource: Schema.AclRule, calendarId: string, ruleId: string, optionalArgs: object, headers: object): Calendar.Schema.AclRule;
  //   // Watch for changes to ACL resources.
  //   watch(resource: Schema.Channel, calendarId: string): Calendar.Schema.Channel;
  //   // Watch for changes to ACL resources.
  //   watch(resource: Schema.Channel, calendarId: string, optionalArgs: object): Calendar.Schema.Channel;
  //   // Watch for changes to ACL resources.
  //   watch(resource: Schema.Channel, calendarId: string, optionalArgs: object, headers: object): Calendar.Schema.Channel;
}
