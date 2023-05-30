import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import getByQuery from '../../../../../src/libs/google-apps/admin/get-by-query'
import * as queryGoogleAdminDirectory from '../../../../../src/libs/google-apps/admin/query-google-admin-directory'
import { sampleUser1 } from '../../../../samples/users'

const requestParams = (query: string): RosterMechanics.GoogleApps.Admin.Request.Params.List => ({
  domain: 'russlyon.com',
  maxResults: 1,
  orderBy: 'givenName',
  viewType: 'admin_view',
  projection: 'full',
  customFieldMask: 'Roster',
  pageToken: '',
  query,
})

beforeEach(() => {
  jest.resetModules()
})

describe('getByQuery', () => {
  it("should return sampleUser1 given sampleUser1's primaryEmail", async () => {
    const spyOn = jest.spyOn(queryGoogleAdminDirectory, 'default')
    const query = `Roster.Edit_Response_URL=${
      sampleUser1().customSchemas?.Roster.Edit_Response_URL as string
    } orgUnitPath=/`
    console.log('getByQueryquery', query)
    const queryResult = await getByQuery(query)
    expect(queryResult).toHaveLength(1)
    expect(queryResult).toEqual([{ ...sampleUser1() }])

    expect(spyOn).toHaveBeenCalledTimes(1)
    expect(spyOn).toHaveBeenCalledWith(requestParams(query))
  })
})
