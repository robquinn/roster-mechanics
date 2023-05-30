import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import listAllUsers from '../../../../../src/libs/google-apps/admin/list-all-users'
import * as queryGoogleAdminDirectory from '../../../../../src/libs/google-apps/admin/query-google-admin-directory'
import { orderUsersByGivenName } from '../../../../gas/utils/admin-directory/users-order-by'
import usersArr from '../../../../samples/users'
import getEmails from '../../../../utils/get-emails'

const requestParams = (office: string | undefined): RosterMechanics.GoogleApps.Admin.Request.Params.List => ({
  domain: 'russlyon.com',
  orderBy: 'givenName',
  viewType: 'admin_view',
  projection: 'full',
  maxResults: 500,
  customFieldMask: 'Roster',
  pageToken: '',
  isSuspended: false,
  query:
    office != null
      ? `Roster.Show_on_Roster=true orgUnitPath=/ Roster.Exists=true Roster.Office=${office}`
      : 'Roster.Show_on_Roster=true orgUnitPath=/ Roster.Exists=true',
})

interface Case {
  users: () => Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]>
  office: string | undefined
}

const cases: Case[] = [
  {
    users: async () => {
      return await new Promise((resolve) => {
        let users = [...usersArr]
        users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
        users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
        resolve(users)
      })
    },
    office: undefined,
  },
  {
    users: async () => {
      return await new Promise((resolve) => {
        let users = [...usersArr]
        users = users.filter((user) => user.customSchemas?.Roster.Show_on_Roster === true)
        users = users.filter((user) => user.customSchemas?.Roster.Exists === true)
        users = users.filter((user) => user.customSchemas?.Roster.Office === 'Carefree')
        resolve(users)
      })
    },
    office: 'Carefree',
  },
]

afterEach(() => {
  jest.restoreAllMocks()
})
beforeEach(() => {
  jest.restoreAllMocks()
  jest.resetModules()
})

describe('listAllUsers', () => {
  cases.forEach(({ users, office }: Case) => {
    it(`should return all users ${
      office != null ? `from office "${office}"` : ''
    } where "Roster.Show_on_Roster" and "Roster.Exists" is true`, async () => {
      const spy = jest.spyOn(queryGoogleAdminDirectory, 'default')
      const expectedUsers = orderUsersByGivenName(await users())
      const recievedUsers = orderUsersByGivenName(await listAllUsers({ office }))

      const expectedEmails = await getEmails(expectedUsers)
      const receivedEmails = await getEmails(recievedUsers)

      expect(recievedUsers).toHaveLength(expectedUsers.length)
      // expect(recievedUsers).toEqual(expect.arrayContaining(expectedUsers))
      expect(receivedEmails).toEqual(expectedEmails)
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith(requestParams(office))
    })
  })
})
