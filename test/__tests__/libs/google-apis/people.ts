import { describe, expect, it, jest } from '@jest/globals'
import GooglePeopleApi from '../../../../src/libs/google-apis/people'
import GoogleServiceAccount from '../../../../src/libs/google-apis/service-account'
import peopleArr, { samplePerson1 } from '../../../samples/people'
import { sampleUser4 } from '../../../samples/users'
import peopleApiListConnectionsResponse from '../../../gas/utils/url-fetch-app/http-responses/people-api-list-connections'
import peopleApiListDirectoryPeopleResponse from '../../../gas/utils/url-fetch-app/http-responses/people-api-list-directory-people'
import peopleApiSearchContactsResponse from '../../../gas/utils/url-fetch-app/http-responses/people-api-search-contacts'

describe('GooglePeopleApi', () => {
  const googleSA = new GoogleServiceAccount({
    userEmail: sampleUser4().primaryEmail as string,
    serviceName: 'Gmail',
    scopes: GooglePeopleApi.Scopes(),
  })

  const googleSASpy = jest.spyOn(googleSA, 'run')
  const googlePeopleApi = new GooglePeopleApi(googleSA)
  it('should be an instance of "GmailApi"', () => {
    expect(googlePeopleApi).toBeInstanceOf(GooglePeopleApi)
  })
  it('should return correct response when calling "listDirectoryPeople"', async () => {
    const response = await googlePeopleApi.listDirectoryPeople()
    expect(response).toEqual(
      (JSON.parse(peopleApiListDirectoryPeopleResponse.getContentText()) as { people: unknown }).people,
    )
  })
  it('should return correct response when calling "listConnections"', async () => {
    const response = await googlePeopleApi.listConnections()
    expect(response).toEqual(
      (JSON.parse(peopleApiListConnectionsResponse.getContentText()) as { connections: unknown }).connections,
    )
  })
  it('should call "googleSA.run()" with correct arguments when calling "batchCreateContacts"', async () => {
    await googlePeopleApi.batchCreateContacts(peopleArr)

    const contactBatch = peopleArr.map((person) => ({ contactPerson: person }))
    const payload: { body: RosterMechanics.GoogleApis.People.Request.Body.BatchCreateContacts } = {
      body: {
        contacts: contactBatch,
        readMask: 'emailAddresses,names,nicknames,organizations,phoneNumbers',
        sources: ['READ_SOURCE_TYPE_CONTACT'],
      },
    }
    expect(googleSASpy).toHaveBeenCalledWith({ ...GooglePeopleApi.Endpoints().batchCreateContacts, payload })
  })
  it('should call "googleSA.run()" with correct arguments when calling "batchDeleteContacts"', async () => {
    const contactBatch = peopleArr.map((person) => person.resourceName as string)

    await googlePeopleApi.batchDeleteContacts(contactBatch)

    const payload: { body: RosterMechanics.GoogleApis.People.Request.Body.BatchDeleteContacts } = {
      body: {
        resourceNames: contactBatch,
      },
    }
    expect(googleSASpy).toHaveBeenCalledWith({ ...GooglePeopleApi.Endpoints().batchDeleteContacts, payload })
  })
  it('should return correct response when calling "searchContacts"', async () => {
    const contactEmail = 'does.matter@this-email-doesnt-matter-because-the-response-is-controlled.com'
    const response = await googlePeopleApi.searchContacts(contactEmail)
    expect(response).toEqual(
      (JSON.parse(peopleApiSearchContactsResponse.getContentText()) as { results: [{ person: unknown }] }).results[0]
        .person,
    )
  })
  it('should return correct response when calling "createContact"', async () => {
    const response = await googlePeopleApi.createContact(samplePerson1())
    expect(response).toEqual(
      (JSON.parse(peopleApiSearchContactsResponse.getContentText()) as { results: [{ person: unknown }] }).results[0]
        .person,
    )
  })
  it('should call "googleSA.run()" with correct arguments when calling "deleteContact"', async () => {
    const { resourceName } = samplePerson1()

    await googlePeopleApi.deleteContact(resourceName as string)

    expect(googleSASpy).toHaveBeenCalledWith({ ...GooglePeopleApi.Endpoints({ resourceName }).deleteContact })
  })
})
