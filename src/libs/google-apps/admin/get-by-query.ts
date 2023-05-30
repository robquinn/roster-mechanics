import queryGoogleAdminDirectory from './query-google-admin-directory'

const getByQuery: RosterMechanics.GoogleApps.Admin.Fn.GetByQuery = async (
  query: string,
): Promise<GoogleAppsScript.AdminDirectory.Schema.User[]> => {
  const requestParams: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
    domain: 'russlyon.com',
    maxResults: 1,
    orderBy: 'givenName',
    viewType: 'admin_view',
    projection: 'full',
    customFieldMask: 'Roster',
    query,
  }
  return await queryGoogleAdminDirectory(requestParams)
}

export default getByQuery
