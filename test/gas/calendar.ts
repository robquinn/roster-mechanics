import AclCollection from './acl-collection'

type ICalendar = RosterMechanics.Test.Calendar.ICalendar

export default class Calendar implements ICalendar {
  private readonly aclCollection

  constructor() {
    this.aclCollection = new AclCollection()
  }

  public get Acl(): RosterMechanics.Test.AclCollection.IAclCollection {
    return this.aclCollection
  }
}
