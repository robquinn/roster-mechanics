const queryGoogleAdminDirectory: RosterMechanics.GoogleApps.Admin.Fn.QueryGoogleAdminDirectory = async (
  requestParams: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
    projection: 'full',
    viewType: 'admin_view',
  },
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
  return await new Promise((resolve, _reject) => {
    let users: GoogleAppsScript.AdminDirectory.Schema.User[] = []
    let userListQuery: GoogleAppsScript.AdminDirectory.Schema.Users = {}
    let nextPageToken = ''
    const listObject: RosterMechanics.GoogleApps.Admin.Request.Params.List = requestParams
    do {
      listObject.pageToken = nextPageToken
      userListQuery = AdminDirectory?.Users?.list(listObject) as RosterMechanics.GoogleApps.Admin.Response.Body.List
      // if there are more users than fit in the query a nextPageToken is returned
      nextPageToken = userListQuery.nextPageToken as string
      // Add the query results to the users array
      if (userListQuery.users !== undefined) users = users.concat(userListQuery.users)
    } while (nextPageToken != null && nextPageToken.length > 0)

    resolve([...users] as unknown as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[])
  })
}

export default queryGoogleAdminDirectory
