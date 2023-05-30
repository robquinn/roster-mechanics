/* eslint-disable no-await-in-loop */
/* eslint no-unused-vars: 0 */ // --> OFF
/* eslint no-prototype-builtins: 0 */ // --> OFF

type IGooglePeopleApi = RosterMechanics.GoogleApis.People.IGooglePeopleApi

export default class GooglePeopleApi implements IGooglePeopleApi {
  private readonly googleSA: RosterMechanics.GoogleApis.ServiceAccount.IGoogleServiceAccount
  constructor(googleSA: RosterMechanics.GoogleApis.ServiceAccount.IGoogleServiceAccount) {
    this.googleSA = googleSA
  }

  static Scopes(): string {
    return 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/directory.readonly'
  }

  static Endpoints(params?: { resourceName: string | undefined }): RosterMechanics.GoogleApis.People.Request.Endpoints {
    return {
      listDirectoryPeople: {
        url: 'https://people.googleapis.com/v1/people:listDirectoryPeople',
        method: 'get',
      },
      listConnections: {
        url: 'https://people.googleapis.com/v1/people/me/connections',
        method: 'get',
      },
      batchCreateContacts: {
        url: 'https://people.googleapis.com/v1/people:batchCreateContacts',
        method: 'post',
      },
      batchDeleteContacts: {
        url: 'https://people.googleapis.com/v1/people:batchDeleteContacts',
        method: 'post',
      },
      searchContacts: {
        url: 'https://people.googleapis.com/v1/people:searchContacts',
        method: 'get',
      },
      createContact: {
        url: 'https://people.googleapis.com/v1/people:createContact',
        method: 'post',
      },
      deleteContact: {
        url: `https://people.googleapis.com/v1/${params?.resourceName as string}:deleteContact`,
        method: 'delete',
      },
    }
  }

  static getResourceNamesFromContacts(contacts: RosterMechanics.GoogleApis.People.Person[]): string[] {
    return contacts.map((c: RosterMechanics.GoogleApis.People.Person) => c.resourceName as string)
  }

  static createContactPersonObjForBatchCreate(contacts: RosterMechanics.GoogleApis.People.Person[]): Array<{
    contactPerson: RosterMechanics.GoogleApis.People.Person
  }> {
    return contacts.map((c: RosterMechanics.GoogleApis.People.Person) => ({
      contactPerson: {
        names: c.names,
        phoneNumbers: c.phoneNumbers,
        emailAddresses: c.emailAddresses,
      },
    }))
  }

  static createNewContactObject(
    contact: RosterMechanics.GoogleApis.People.Person,
  ): RosterMechanics.GoogleApis.People.Person {
    return {
      names: contact.names,
      phoneNumbers: contact.phoneNumbers,
      emailAddresses: contact.emailAddresses,
    }
  }

  async listDirectoryPeople(): Promise<RosterMechanics.GoogleApis.People.Person[]> {
    let people: RosterMechanics.GoogleApis.People.Person[] = []

    let directoryPeopleApiResponse: RosterMechanics.GoogleApis.People.Response.Body.ListDirectoryPeople
    do {
      const payload: { query: RosterMechanics.GoogleApis.People.Request.Query.ListDirectoryPeople } = {
        query: {
          readMask:
            'addresses,ageRanges,biographies,birthdays,calendarUrls,clientData,coverPhotos,emailAddresses,events,externalIds,genders,imClients,interests,locales,locations,memberships,metadata,miscKeywords,names,nicknames,occupations,organizations,phoneNumbers,photos,relations,sipAddresses,skills,urls,userDefined',
          sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
          pageToken: '',
        },
      }

      directoryPeopleApiResponse = (await this.googleSA.run({
        ...GooglePeopleApi.Endpoints().listDirectoryPeople,
        payload: payload as unknown as { query: RosterMechanics.GoogleApis.ServiceAccount.Request.Query },
      })) as unknown as RosterMechanics.GoogleApis.People.Response.Body.ListDirectoryPeople
      payload.query.pageToken = directoryPeopleApiResponse.nextPageToken
      people = people.concat(directoryPeopleApiResponse.people as RosterMechanics.GoogleApis.People.Person[])
    } while (Object.prototype.hasOwnProperty.call(directoryPeopleApiResponse, 'nextPageToken'))

    return people
  }

  public async listConnections(): Promise<RosterMechanics.GoogleApis.People.Person[]> {
    let connections: RosterMechanics.GoogleApis.People.Person[] = []

    let listConnectionsApiResponse: GoogleAppsScript.People.Schema.ListConnectionsResponse
    do {
      const payload: { query: RosterMechanics.GoogleApis.People.Request.Query.ListConnections } = {
        query: {
          personFields:
            'addresses,ageRanges,biographies,birthdays,calendarUrls,clientData,coverPhotos,emailAddresses,events,externalIds,genders,imClients,interests,locales,locations,memberships,metadata,miscKeywords,names,nicknames,occupations,organizations,phoneNumbers,photos,relations,sipAddresses,skills,urls,userDefined',
          sources: ['READ_SOURCE_TYPE_CONTACT'],
          pageToken: '',
        },
      }
      listConnectionsApiResponse = (await this.googleSA.run({
        ...GooglePeopleApi.Endpoints().listConnections,
        payload: payload as unknown as { query: RosterMechanics.GoogleApis.ServiceAccount.Request.Query },
      })) as RosterMechanics.GoogleApis.People.Response.Body.ListConnections

      payload.query.pageToken = listConnectionsApiResponse.nextPageToken
      connections = connections.concat(
        listConnectionsApiResponse.connections as RosterMechanics.GoogleApis.People.Person[],
      )
    } while (listConnectionsApiResponse.hasOwnProperty('nextPageToken'))

    return connections
  }

  public async batchCreateContacts(contacts: RosterMechanics.GoogleApis.People.Person[]): Promise<void> {
    const twoHundredDiff = 200 - (contacts.length - 1000)
    const contactsBatchLength = contacts.length + twoHundredDiff
    let contactBatch = []

    for (let x = 0; x < contactsBatchLength; x += 200) {
      contactBatch = contacts.slice(x, x + 200).map((person) => ({ contactPerson: person }))

      const payload: { body: RosterMechanics.GoogleApis.People.Request.Body.BatchCreateContacts } = {
        body: {
          contacts: contactBatch,
          readMask: 'emailAddresses,names,nicknames,organizations,phoneNumbers',
          sources: ['READ_SOURCE_TYPE_CONTACT'],
        },
      }

      ;(await this.googleSA.run({
        ...GooglePeopleApi.Endpoints().batchCreateContacts,
        payload: payload as unknown as { body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body },
      })) as RosterMechanics.GoogleApis.People.Response.Body.BatchCreateContacts
    }
  }

  public async batchDeleteContacts(resourceNames: string[]): Promise<void> {
    let contactBatch = []

    for (let x = 0; x < resourceNames.length + 500; x += 500) {
      try {
        contactBatch = resourceNames.slice(x, x + 500)
        console.log(contactBatch)

        const payload: { body: RosterMechanics.GoogleApis.People.Request.Body.BatchDeleteContacts } = {
          body: {
            resourceNames: contactBatch,
          },
        }
        ;(await this.googleSA.run({
          ...GooglePeopleApi.Endpoints().batchDeleteContacts,
          payload: payload as unknown as { body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body },
        })) as RosterMechanics.GoogleApis.People.Response.Body.BatchDeleteContacts
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    }
  }

  public async searchContacts(contactEmail: string): Promise<RosterMechanics.GoogleApis.People.Person> {
    const payload: { query: RosterMechanics.GoogleApis.People.Request.Query.SearchContacts } = {
      query: {
        query: contactEmail,
        readMask:
          'addresses,ageRanges,biographies,birthdays,calendarUrls,clientData,coverPhotos,emailAddresses,events,externalIds,genders,imClients,interests,locales,locations,memberships,metadata,miscKeywords,names,nicknames,occupations,organizations,phoneNumbers,photos,relations,sipAddresses,skills,urls,userDefined',
        sources: ['READ_SOURCE_TYPE_CONTACT'],
      },
    }

    const searchContactsApiResponse: RosterMechanics.GoogleApis.People.Response.Body.SearchContacts =
      (await this.googleSA.run({
        ...GooglePeopleApi.Endpoints().searchContacts,
        payload: payload as unknown as { query: RosterMechanics.GoogleApis.ServiceAccount.Request.Query },
      })) as unknown as RosterMechanics.GoogleApis.People.Response.Body.SearchContacts

    return searchContactsApiResponse.results[0].person
  }

  public async createContact(
    newContact: RosterMechanics.GoogleApis.People.Person,
  ): Promise<RosterMechanics.GoogleApis.People.Person> {
    const payload: {
      query: RosterMechanics.GoogleApis.People.Request.Query.CreateContact
      body: RosterMechanics.GoogleApis.People.Request.Body.CreateContact
    } = {
      query: {
        personFields: 'emailAddresses,names,organizations,phoneNumbers',
        sources: ['READ_SOURCE_TYPE_CONTACT'],
      },
      body: newContact,
    }

    return (await this.googleSA.run({
      ...GooglePeopleApi.Endpoints().createContact,
      payload: payload as unknown as {
        query: RosterMechanics.GoogleApis.ServiceAccount.Request.Query
        body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
      },
    })) as RosterMechanics.GoogleApis.People.Response.Body.CreateContact
  }

  public async deleteContact(
    resourceName: string,
  ): Promise<RosterMechanics.GoogleApis.People.Response.Body.DeleteContact> {
    return (await this.googleSA.run({
      ...GooglePeopleApi.Endpoints({ resourceName }).deleteContact,
    })) as RosterMechanics.GoogleApis.People.Response.Body.DeleteContact
  }

  private filterContactsForUserEmail(
    contacts: RosterMechanics.GoogleApis.People.Person[],
  ): RosterMechanics.GoogleApis.People.Person | null {
    let contact = null
    const contactsLength = contacts.length

    for (let x = 0; x < contactsLength; x += 1) {
      const c = contacts[x]
      const emailAddresses: string[] = []
      if (c.hasOwnProperty('emailAddresses')) {
        const emailAddressesLength = c.emailAddresses?.length
        if (emailAddressesLength != null && emailAddressesLength > 0) {
          for (let j = 0; j < emailAddressesLength; j += 1) {
            if (
              (c.emailAddresses as GoogleAppsScript.People.Schema.EmailAddress[])[j] != null &&
              (c.emailAddresses as GoogleAppsScript.People.Schema.EmailAddress[])[j].hasOwnProperty('value')
            )
              emailAddresses.push(
                (c.emailAddresses as GoogleAppsScript.People.Schema.EmailAddress[])[j].value as string,
              )
          }
        }
        if (emailAddresses.includes(this.googleSA.getUserEmail())) {
          contact = contacts[x]
        }
      }
    }
    return contact
  }
}
