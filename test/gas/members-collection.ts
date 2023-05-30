import memberFieldValidation from './utils/admin-directory/member-field-validation'

type IMembersCollection = RosterMechanics.Test.MembersCollection.IMembersCollection

export default class MembersCollection implements IMembersCollection {
  private _members: RosterMechanics.Test.MembersCollection.Members
  constructor() {
    this._members = new Map<string, GoogleAppsScript.AdminDirectory.Schema.Member[]>()
  }

  private get members(): RosterMechanics.Test.MembersCollection.Members {
    return this._members
  }

  private set members(members: RosterMechanics.Test.MembersCollection.Members) {
    this._members = members
  }

  //   // Retrieve Group Member
  get(groupKey: string, memberKey: string): GoogleAppsScript.AdminDirectory.Schema.Member {
    const member = this.members.get(groupKey)?.find((m) => m.email === memberKey || m.id === memberKey)
    return member as GoogleAppsScript.AdminDirectory.Schema.Member
  }

  //   // Checks whether the given user is a member of the group. Membership can be direct or nested.
  hasMember(groupKey: string, memberKey: string): GoogleAppsScript.AdminDirectory.Schema.MembersHasMember {
    const member = this.members.get(groupKey)?.find((m) => m.email === memberKey || m.id === memberKey)
    if (member != null) {
      return { isMember: true }
    }
    return { isMember: undefined }
  }

  // Add user to the specified group.
  insert(
    resource: GoogleAppsScript.AdminDirectory.Schema.Member,
    groupKey: string,
  ): GoogleAppsScript.AdminDirectory.Schema.Member {
    if (typeof groupKey !== 'string') {
      throw new Error('groupKey must be defined and must be a string')
    }
    memberFieldValidation(resource)
    if (!this.members.has(groupKey)) {
      this.members.set(groupKey, [])
    }
    this.members.get(groupKey)?.push(resource)
    return resource
  }

  // Retrieve all members in a group (paginated)
  // list(groupKey: string): GoogleAppsScript.AdminDirectory.Schema.Members {}
  //   // Retrieve all members in a group (paginated)
  //   list(groupKey: string, optionalArgs: object): AdminDirectory.Schema.Members {}
  //   // Update membership of a user in the specified group. This method supports patch semantics.
  //   patch(resource: Schema.Member, groupKey: string, memberKey: string): AdminDirectory.Schema.Member {}
  //   // Remove membership.
  remove(groupKey: string, memberKey: string): void {
    const membersArr = this.members.get(groupKey)
    const member = membersArr?.find((m) => m.email === memberKey || m.id === memberKey)
    if (member != null && membersArr != null) {
      const indexOfMember = membersArr.indexOf(member)
      membersArr.splice(indexOfMember, 1)
    }
  }
  //   // Update membership of a user in the specified group.
  //   update(resource: Schema.Member, groupKey: string, memberKey: string): AdminDirectory.Schema.Member {}
}
