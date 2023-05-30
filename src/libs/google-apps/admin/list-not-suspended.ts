import queryGoogleAdminDirectory from './query-google-admin-directory'

const listNotSuspended: RosterMechanics.GoogleApps.Admin.Fn.ListNotSuspended = async (): Promise<
  RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
> => {
  const requestParams: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
    domain: 'russlyon.com',
    maxResults: 500,
    orderBy: 'givenName',
    projection: 'full',
    viewType: 'admin_view',
    customFieldMask: 'Roster',
    query: 'Roster.Exists=true Roster.Show_on_Roster=true orgUnitPath=/ isSuspended=false',
  }
  return await queryGoogleAdminDirectory(requestParams)
}

export default listNotSuspended
