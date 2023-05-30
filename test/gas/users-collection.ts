import usersArr from '../samples/users'
import userFieldValidation from './utils/admin-directory/user-field-validation'
import adminDirectoryUserQuery from './utils/admin-directory/user-query'
import getUserAdminDirectoryView from './utils/admin-directory/user-views'
import {
  orderUsersByEmail,
  orderUsersByFamilyName,
  orderUsersByGivenName,
} from './utils/admin-directory/users-order-by'

type IUsersCollection = RosterMechanics.Test.UsersCollection.IUsersCollection

export default class UsersCollection implements IUsersCollection {
  //   Aliases?: GoogleAppsScript.AdminDirectory.Collection.Users.AliasesCollection | undefined
  //   Photos?: AdminDirectory.Collection.Users.PhotosCollection | undefined
  private _users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

  constructor() {
    this._users = [...usersArr]
  }

  private get users(): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] {
    return this._users
  }

  private set users(users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]) {
    this._users = users
  }

  // retrieve user
  get(
    userKey: string,
    optionalArgs?: RosterMechanics.GoogleApps.Admin.Request.Params.Get,
  ): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser {
    const user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = this.users.find(
      (u) => u.primaryEmail === userKey || u.id === userKey,
    ) as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

    if (optionalArgs?.customFieldMask != null && optionalArgs?.viewType != null && optionalArgs?.projection != null) {
      return getUserAdminDirectoryView({
        customFieldMask: optionalArgs.customFieldMask,
        viewType: optionalArgs.viewType,
        projection: optionalArgs.projection,
        user,
      })
    }
    return user
  }

  // create user.
  // eslint-disable-next-line class-methods-use-this
  insert(
    resource: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
  ): RosterMechanics.GoogleApps.Admin.Response.Body.Get {
    userFieldValidation(resource)
    // ------------------- comment this start -------------------
    // this.users.push(resource)
    // -------------------- comment this end --------------------

    return resource
  }

  // Retrieve either deleted users or all users in a domain (paginated)
  list(
    optionalArgs: RosterMechanics.GoogleApps.Admin.Request.Params.List,
  ): RosterMechanics.GoogleApps.Admin.Response.Body.List {
    let { users } = this

    if (optionalArgs.query != null) {
      const query: RosterMechanics.Test.Utils.AdminDirectoryQuery.QueryPossibilities = adminDirectoryUserQuery(
        optionalArgs.query,
      )
      // console.log('listquery', query)
      if (Object.prototype.hasOwnProperty.call(query, 'Roster')) {
        if (Object.prototype.hasOwnProperty.call(query.Roster, 'Exists'))
          users = users.filter((user) => user.customSchemas?.Roster.Exists === query.Roster.Exists)
        if (Object.prototype.hasOwnProperty.call(query.Roster, 'Show_on_Roster'))
          users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === query.Roster.Show_on_Roster)
        if (Object.prototype.hasOwnProperty.call(query.Roster, 'Office'))
          users = users.filter((user) => user.customSchemas?.Roster.Office === query.Roster.Office)
        if (Object.prototype.hasOwnProperty.call(query.Roster, 'Edit_Response_URL'))
          users = users.filter(
            (user) => user.customSchemas?.Roster.Edit_Response_URL === query.Roster.Edit_Response_URL,
          )
      }
      if (Object.prototype.hasOwnProperty.call(query, 'isSuspended'))
        users = users.filter((user) => user.suspended === query.isSuspended)
      if (Object.prototype.hasOwnProperty.call(query, 'orgUnitPath'))
        users = users.filter((user) => user.orgUnitPath === query.orgUnitPath)
    }

    if (optionalArgs.viewType != null && optionalArgs.projection != null) {
      users = users.map((user) =>
        getUserAdminDirectoryView({
          customFieldMask: optionalArgs.customFieldMask,
          viewType: optionalArgs.viewType as RosterMechanics.GoogleApps.Admin.Request.Params.Helpers.ViewType,
          projection: optionalArgs.projection,
          user,
        }),
      )
    }

    if (optionalArgs.orderBy != null) {
      if (optionalArgs.orderBy === 'email') users = orderUsersByEmail(users)
      if (optionalArgs.orderBy === 'givenName') users = orderUsersByGivenName(users)
      if (optionalArgs.orderBy === 'familyName') users = orderUsersByFamilyName(users)
    }

    if (optionalArgs.sortOrder != null) {
      if (optionalArgs.sortOrder !== 'ASCENDING') users = users.reverse()
    }

    if (optionalArgs.maxResults != null) {
      users = users.slice(0, optionalArgs.maxResults)
    }

    return {
      kind: 'admin#directory#users',
      etag: '"sd3OmLqfGbdzQN419XrvAe2RZ3Piq6XDTVzEvVrOLN0/72QSQnpD-SlJvE1P7vuItjLssd3"',
      nextPageToken: '',
      users,
    }
  }

  //   // change admin status of a user
  // makeAdmin(resource: GoogleAppsScript.AdminDirectory.Schema.UserMakeAdmin, userKey: string): void {}
  //   // update user. This method supports patch semantics.
  // patch(resource: Schema.User, userKey: string): GoogleAppsScript.AdminDirectory.Schema.User {}
  //   // Delete user
  // eslint-disable-next-line no-unused-vars, class-methods-use-this, @typescript-eslint/no-unused-vars
  remove(userKey: string): void {
    if (typeof userKey !== 'string') {
      throw new Error('remove user param "userKey" must be a string')
    }
    // ------------------- comment this start -------------------
    // const { users } = this
    // const user = users.find((u) => u.id === userKey || u.primaryEmail === userKey)
    // const indexOfUser = users.indexOf(user as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    // if (indexOfUser > -1) {
    //   // only splice array when item is found
    //   users.splice(indexOfUser, 1) // 2nd parameter means remove one item only
    // }
    // this.users = users
    // -------------------- comment this end --------------------
  }

  //   // Undelete a deleted user
  // eslint-disable-next-line class-methods-use-this
  undelete(resource: GoogleAppsScript.AdminDirectory.Schema.UserUndelete, userKey: string): void {
    if (typeof userKey !== 'string') {
      throw new Error('undelete user param "userKey" must be a string')
    }
    if (typeof resource.orgUnitPath !== 'string' && typeof resource.orgUnitPath !== 'undefined') {
      throw new Error('undelete user param "orgUnitPath" must be a string or undefined')
    }
  }

  //   // update user
  // eslint-disable-next-line no-unused-vars, class-methods-use-this, @typescript-eslint/no-unused-vars
  update(
    // eslint-disable-next-line no-unused-vars
    resource: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    userKey: string,
  ): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser {
    userFieldValidation(resource)
    // ------------------- comment this start -------------------
    // const { users } = this
    // const user = users.find((u) => u.id === userKey || u.primaryEmail === userKey)
    // const indexOfUser = users.indexOf(user as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    // users[indexOfUser] = resource
    // this.users = users
    // -------------------- comment this end --------------------
    return resource
  }
  //   // Watch for changes in users list
  //   watch(resource: Schema.Channel): AdminDirectory.Schema.Channel {}
  //   // Watch for changes in users list
  //   watch(resource: Schema.Channel, optionalArgs: object): AdminDirectory.Schema.Channel {}
}
