import queryGoogleAdminDirectory from './query-google-admin-directory'

const listAllUsers: RosterMechanics.GoogleApps.Admin.Fn.ListAllUsers = async (args?: {
  office: string | undefined
}): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
  const requestParams: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
    domain: 'russlyon.com',
    orderBy: 'givenName',
    viewType: 'admin_view',
    projection: 'full',
    maxResults: 500,
    customFieldMask: 'Roster',
    isSuspended: false,
    query:
      args?.office != null && args != null
        ? `Roster.Show_on_Roster=true orgUnitPath=/ Roster.Exists=true Roster.Office=${args.office}`
        : 'Roster.Show_on_Roster=true orgUnitPath=/ Roster.Exists=true',
  }

  return await queryGoogleAdminDirectory(requestParams)
}

export default listAllUsers
