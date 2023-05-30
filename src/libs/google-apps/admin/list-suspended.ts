import queryGoogleAdminDirectory from './query-google-admin-directory'

const listSuspended: RosterMechanics.GoogleApps.Admin.Fn.ListSuspended = async (): Promise<
  RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
> => {
  const requestParams: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
    domain: 'russlyon.com',
    maxResults: 500,
    orderBy: 'givenName',
    projection: 'full',
    viewType: 'admin_view',
    customFieldMask: 'Roster',
    query: 'Roster.Exists=true orgUnitPath=/ isSuspended=true',
  }
  return await queryGoogleAdminDirectory(requestParams)
}

export default listSuspended
