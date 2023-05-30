declare namespace RosterMechanics {
  namespace GoogleApis {
    namespace People {
      interface IGooglePeopleApi {
        listDirectoryPeople: () => Promise<RosterMechanics.GoogleApis.People.Person[]>
        listConnections: () => Promise<RosterMechanics.GoogleApis.People.Person[]>
        batchCreateContacts: (contacts: RosterMechanics.GoogleApis.People.Person[]) => Promise<void>
        batchDeleteContacts: (resourceNames: string[]) => Promise<void>
        searchContacts: (contactEmail: string) => Promise<RosterMechanics.GoogleApis.People.Person>
        createContact: (
          newContact: RosterMechanics.GoogleApis.People.Person,
        ) => Promise<RosterMechanics.GoogleApis.People.Person>
        deleteContact: (resourceName: string) => Promise<RosterMechanics.GoogleApis.People.Response.Body.DeleteContact>
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      interface Person extends GoogleAppsScript.People.Schema.Person {}
      namespace Request {
        type ReadSourceType = Array<
          | 'READ_SOURCE_TYPE_UNSPECIFIED'
          | 'READ_SOURCE_TYPE_PROFILE'
          | 'READ_SOURCE_TYPE_CONTACT'
          | 'READ_SOURCE_TYPE_DOMAIN_CONTACT'
        >
        type DirectorySourceType = Array<
          | 'DIRECTORY_SOURCE_TYPE_UNSPECIFIED'
          | 'DIRECTORY_SOURCE_TYPE_DOMAIN_CONTAT'
          | 'DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'
        >
        type DirectoryMergeSourceType = Array<
          'DIRECTORY_MERGE_SOURCE_TYPE_UNSPECIFIED' | 'DIRECTORY_MERGE_SOURCE_TYPE_CONTACT'
        >
        type SortOrder = Array<
          'LAST_MODIFIED_ASCENDING' | 'LAST_MODIFIED_DESCENDING' | 'FIRST_NAME_ASCENDING' | 'LAST_NAME_ASCENDING'
        >
        type Endpoints = Record<
          | 'listDirectoryPeople'
          | 'listConnections'
          | 'batchCreateContacts'
          | 'batchDeleteContacts'
          | 'searchContacts'
          | 'createContact'
          | 'deleteContact',
          {
            url: string
            method: 'get' | 'post' | 'delete'
          }
        >
        namespace Query {
          interface ListDirectoryPeople {
            readMask: string
            sources: DirectorySourceType
            mergeSources?: DirectoryMergeSourceType
            /** Global.IntRange<0, 1000> */
            pageSize?: number
            pageToken?: string
            requestSyncToken?: boolean
            syncToken?: string
          }

          interface ListConnections {
            pageToken?: string
            /** Global.IntRange<0, 1000> */
            pageSize?: number
            sortOrder?: SortOrder
            requestSyncToken?: boolean
            syncToken?: string
            requestMask?: { includeField: string }
            personFields: string
            sources: ReadSourceType
          }
          interface SearchContacts {
            query: string
            pageSize?: RosterMechanics.Base.IntRange<0, 30>
            readMask: string
            sources?: ReadSourceType
          }
          interface CreateContact {
            personFields: string
            sources: ReadSourceType
          }
        }
        namespace Body {
          interface BatchCreateContacts {
            contacts: Array<{ contactPerson: Person }>
            readMask: string
            sources: ReadSourceType
          }
          interface BatchDeleteContacts {
            resourceNames: string[]
          }
          type CreateContact = Person
          // eslint-disable-next-line @typescript-eslint/no-empty-interface
          interface DeleteContact {}
        }
      }

      namespace Response {
        namespace Body {
          interface ListDirectoryPeople {
            people: GoogleAppsScript.People.Schema.Person[]
            nextPageToken: string
            nextSyncToken: string
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface ListConnections extends GoogleAppsScript.People.Schema.ListConnectionsResponse {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface BatchCreateContacts extends GoogleAppsScript.People.Schema.PersonResponse {}
          // eslint-disable-next-line @typescript-eslint/no-empty-interface
          interface BatchDeleteContacts {} // empty response
          interface SearchContacts {
            results: Array<{ person: GoogleAppsScript.People.Schema.Person }>
          }
          type CreateContact = Person
          // eslint-disable-next-line @typescript-eslint/no-empty-interface
          interface DeleteContact {}
        }
      }
    }
  }
}
