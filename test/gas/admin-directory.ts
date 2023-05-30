import MembersCollection from './members-collection'
import ResourcesCollection from './resources-collection'
import UsersCollection from './users-collection'

type IAdminDirectory = RosterMechanics.Test.AdminDirectory.IAdminDirectory

export default class AdminDirectory implements IAdminDirectory {
  private readonly usersCollection
  private readonly membersCollection
  private readonly resourcesCollection

  constructor() {
    this.usersCollection = new UsersCollection()
    this.membersCollection = new MembersCollection()
    this.resourcesCollection = new ResourcesCollection()
  }

  public get Users(): RosterMechanics.Test.UsersCollection.IUsersCollection {
    return this.usersCollection
  }

  public get Members(): RosterMechanics.Test.MembersCollection.IMembersCollection {
    return this.membersCollection
  }

  public get Resources(): RosterMechanics.Test.ResourcesCollection.IResourcesCollection {
    return this.resourcesCollection
  }
}
