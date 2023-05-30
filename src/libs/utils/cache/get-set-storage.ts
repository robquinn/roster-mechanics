/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import replacer from './replacer'
import reviver from './reviver'

/**
 * Function that gets data from or sets data to the property / cache.
 *
 * @param {String} storage property / cache (required).
 * @param {String} key to be used to get data stored in the property / cache (required).
 * @param {String} scope of the storage. valid scopes - user, script, document (required).
 * @param {String} dataType of the property / cache, possible values: json, bool, string (required when action is set).
 * @param {String} action to be performed, get / set the property / cache (required if the action is set).
 * @param {String} value if action === 'set', value to be set. (required if the action is set)
 * @param {number} expirationDuration  after which the cache expires (optional)
 * @return the data stored in the property / cache
 */
const getSetStorage: RosterMechanics.Utils.Cache.Fn.GetSetStorage = async (
  storage: RosterMechanics.Utils.Cache.Storage.Type,
  key: RosterMechanics.Utils.Cache.Storage.Key,
  scope: RosterMechanics.Utils.Cache.Storage.Scope,
  dataType: RosterMechanics.Utils.Cache.Storage.DataType,
  action?: RosterMechanics.Utils.Cache.Storage.Action,
  value?: RosterMechanics.Utils.Cache.Storage.Value,
  expirationDuration: RosterMechanics.Utils.Cache.Storage.expirationDuration = 21600,
): Promise<RosterMechanics.Utils.Cache.Storage.StoredValue> => {
  return await new Promise((resolve) => {
    let store: RosterMechanics.Utils.Cache.Storage.Store<typeof storage> =
      storage === 'cache' ? CacheService : PropertiesService
    let val

    if (scope === 'user') {
      if (storage === 'cache') store = (store as typeof CacheService).getUserCache()
      else store = (store as typeof PropertiesService).getUserProperties()
    } else if (scope === 'script') {
      if (storage === 'cache') store = (store as typeof CacheService).getScriptCache()
      else store = (store as typeof PropertiesService).getScriptProperties()
    } else if (storage === 'cache') store = (store as typeof CacheService).getDocumentCache()
    else store = (store as typeof PropertiesService).getDocumentProperties()

    if (action === 'set') {
      val = value
      const argsTobePassed: [string, string, number?] = [
        key,
        dataType === 'json' ? JSON.stringify(value, replacer) : value,
      ] as [string, string]

      if (storage === 'cache') argsTobePassed.push(expirationDuration)

      if (storage === 'cache')
        (store as GoogleAppsScript.Cache.Cache).put(...(argsTobePassed as [string, string, number]))
      else (store as GoogleAppsScript.Properties.Properties).setProperty(...(argsTobePassed as [string, string]))
    } else {
      let storedValue: string | null = null
      if (storage === 'cache') storedValue = (store as GoogleAppsScript.Cache.Cache).get(key)
      else storedValue = (store as GoogleAppsScript.Properties.Properties).getProperty(key)

      if (!storedValue) resolve(null)

      if (dataType === 'json') val = JSON.parse(storedValue as string, reviver)
      else if (dataType === 'bool') val = storedValue === 'true'
      else val = storedValue
    }

    resolve(val)
  })
}

export default getSetStorage
