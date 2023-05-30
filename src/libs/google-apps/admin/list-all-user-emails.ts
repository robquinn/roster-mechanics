import queryGoogleAdminDirectory from './query-google-admin-directory'

const listAllUsersEmails: RosterMechanics.GoogleApps.Admin.Fn.ListAllUsersEmails = async (): Promise<string[]> => {
  const requestParams: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
    domain: 'russlyon.com',
    viewType: 'admin_view',
    orderBy: 'givenName',
    projection: 'full',
    maxResults: 500,
    isSuspended: false,
    // fields: 'users.primaryEmail',
    query: 'orgUnitPath=/',
  }

  const users = await queryGoogleAdminDirectory(requestParams)
  return users.map((u) => u.primaryEmail as string)
}

export default listAllUsersEmails
