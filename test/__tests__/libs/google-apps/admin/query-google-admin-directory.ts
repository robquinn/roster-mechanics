import { beforeAll, describe, expect, it } from '@jest/globals'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'
import getUserAdminDirectoryView from '../../../../gas/utils/admin-directory/user-views'
import queryGoogleAdminDirectory from '../../../../../src/libs/google-apps/admin/query-google-admin-directory'
import usersArr from '../../../../samples/users'
import getEmails from '../../../../utils/get-emails'

let suspendedUsersExpected: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
let notSuspendedUsersExpected: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

// query for suspended users
const requestParamsForSuspendedUsers: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
  domain: 'russlyon.com',
  maxResults: 500,
  orderBy: 'givenName',
  projection: 'full',
  viewType: 'admin_view',
  customFieldMask: 'Roster',
  query: 'Roster.Exists=true orgUnitPath=/ isSuspended=true',
}

const requestParamsForNotSuspendedUsers: RosterMechanics.GoogleApps.Admin.Request.Params.List = {
  domain: 'russlyon.com',
  maxResults: 500,
  orderBy: 'givenName',
  projection: 'full',
  viewType: 'admin_view',
  customFieldMask: 'Roster',
  query: 'Roster.Exists=true Roster.Show_on_Roster=true orgUnitPath=/ isSuspended=false',
}

beforeAll(async () => {
  // suspended users
  const suspendedUsers = async (): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
    return await new Promise((resolve) => {
      let users = usersArr
      users = users.filter((user) => user.suspended === true)
      users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
      users = users.filter((user) => user.orgUnitPath === '/')
      users = users.map((user) =>
        getUserAdminDirectoryView({
          customFieldMask: 'Roster',
          viewType: 'admin_view' as RosterMechanics.GoogleApps.Admin.Request.Params.Helpers.ViewType,
          projection: 'full',
          user,
        }),
      )
      resolve(orderUsersByGivenName(users))
    })
  }
  suspendedUsersExpected = await suspendedUsers()
  // not suspended users
  const notSuspendedUsers = async (): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
    return await new Promise((resolve) => {
      let users = usersArr
      users = users.filter((user) => user.suspended === false)
      users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
      users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
      users = users.filter((user) => user.orgUnitPath === '/')
      users = users.map((user) =>
        getUserAdminDirectoryView({
          customFieldMask: 'Roster',
          viewType: 'admin_view' as RosterMechanics.GoogleApps.Admin.Request.Params.Helpers.ViewType,
          projection: 'full',
          user,
        }),
      )
      resolve(orderUsersByGivenName(users))
    })
  }
  notSuspendedUsersExpected = await notSuspendedUsers()
})

describe('queryGoogleAdminDirectory', () => {
  it('should return only suspended users given a query for suspended users', async () => {
    const suspendedUsersReceieved = orderUsersByGivenName(
      await queryGoogleAdminDirectory(requestParamsForSuspendedUsers),
    )
    expect(suspendedUsersReceieved).toHaveLength(suspendedUsersExpected.length)
    expect(suspendedUsersReceieved).toEqual(suspendedUsersExpected)
  })
  it('should return not suspended users given a query for not suspended users', async () => {
    const notSuspendedUsersReceieved = orderUsersByGivenName(
      await queryGoogleAdminDirectory(requestParamsForNotSuspendedUsers),
    )
    const expectedEmails = await getEmails(notSuspendedUsersExpected)
    const receivedEmails = await getEmails(notSuspendedUsersReceieved)
    expect(notSuspendedUsersReceieved).toHaveLength(notSuspendedUsersExpected.length)
    expect(receivedEmails).toEqual(expectedEmails)
  })
})
