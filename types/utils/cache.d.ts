declare namespace RosterMechanics {
  namespace Utils {
    namespace Cache {
      namespace Fn {
        type ByteLength = (str: string) => Promise<number>
        type DeleteBatches = (
          name: string,
          type: RosterMechanics.Utils.Cache.Storage.Type,
          scope: RosterMechanics.Utils.Cache.Storage.Scope,
        ) => Promise<void>
        type GetAllUsers = (args?: CacheArgs) => Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]>

        type GetChunkSize = (value: string, type: RosterMechanics.Utils.Cache.Storage.Type) => Promise<number>
        type GetSetStorage = (
          storage: Storage.Type,
          key: Storage.Key,
          scope: Storage.Scope,
          dataType: Storage.DataType,
          action?: Storage.Action,
          value?: Storage.Value,
        ) => Storage.StoredValue

        type MapValuesToArray = (
          map: Batches.UsersBatch,
        ) => Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]>

        type Replacer = (key: string, value: unknown) => unknown

        type RetrieveFromBatches = (
          name: string,
          type: RosterMechanics.Utils.Cache.Storage.Type,
          scope: RosterMechanics.Utils.Cache.Storage.Scope,
        ) => Promise<Batches.UsersBatch | Batches.DeletedUsersBatch | undefined>
        type Reviver = (
          key: string,
          value: {
            dataType: string
            value: Array<[string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser]> | unknown
          },
        ) => unknown
        type RussLyonDomainUsers = (cacheArgs?: CacheArgs) => Promise<DomainUsers.RussLyon>

        type SaveInBatches = (
          name: string,
          value: object | unknown,
          type: Storage.Type,
          scope: Storage.Scope,
        ) => Promise<void>

        type SortUsersIntoGroups = (users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]) => Promise<{
          regular: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
          suspended: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
          pseudo: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
        }>

        type HandleCacheArgs = ({
          cache,
          googleAdminUser,
          action,
        }: {
          cache: RosterMechanics.Utils.Cache.Batches.UsersBatch
          googleAdminUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
          action: RosterMechanics.Utils.Cache.CacheAction
        }) => Promise<RosterMechanics.Utils.Cache.Batches.UsersBatch>

        type MakeFreshCache = () => Promise<RosterMechanics.Utils.Cache.Batches.UsersBatch>

        type GetSetDeletedUsers = (args?: {
          email: string
          id: string
        }) => Promise<RosterMechanics.Utils.Cache.Batches.DeletedUsersBatch>
      }

      namespace Batches {
        type DeleteObj = GoogleAppsScript.Cache.Cache | GoogleAppsScript.Properties.Properties | null
        type UsersBatch = Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>
        type DeletedUsersBatch = Map<string, string>
      }
      namespace GAS {
        type Properties = 'getUserProperties' | 'getDocumentProperties' | 'getScriptProperties'
        type Cache = 'getUserCache' | 'getDocumentCache' | 'getScriptCache'
      }

      namespace Storage {
        type Store<T> = T extends 'cache'
          ? GoogleAppsScript.Cache.CacheService | GoogleAppsScript.Cache.Cache | null
          : GoogleAppsScript.Properties.PropertiesService | GoogleAppsScript.Properties.Properties

        type Type = 'property' | 'cache'
        type Key = string
        type Scope = 'user' | 'script' | 'document'
        type DataType = 'json' | 'bool' | 'string' | 'number'
        type Action = 'get' | 'set'
        type Value = string | number | JSON

        type expirationDuration = number

        type StoredValue =
          | string
          | number
          | JSON
          | boolean
          | Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>
          | unknown
          | null
      }

      type CacheAction = 'delete' | 'insert' | 'update'

      interface CacheArgs {
        googleAdminUser?: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
        action?: CacheAction
      }

      namespace DomainUsers {
        interface RussLyon {
          notSuspendedUsers: RosterMechanics.GoogleApps.Sheet.IRoster
          suspendedUsers: RosterMechanics.GoogleApps.Sheet.IRoster
          pseudoUsers: RosterMechanics.GoogleApps.Sheet.IRoster
        }
      }
    }
  }
}
