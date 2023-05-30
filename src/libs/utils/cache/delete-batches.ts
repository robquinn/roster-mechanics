/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import getSetStorage from './get-set-storage'

/**
 * Deletes all the saved batches
 *
 * @param {String} name of the property
 * @param {String} type of the storage property / cache
 * @param {String} scope of the storage user / document / script
 */
const deleteBatches: RosterMechanics.Utils.Cache.Fn.DeleteBatches = async (
  name: string,
  type: RosterMechanics.Utils.Cache.Storage.Type = 'property',
  scope: RosterMechanics.Utils.Cache.Storage.Scope = 'user',
): Promise<void> => {
  const count = Number(await getSetStorage(type, `${name}_total`, scope, 'number')) || 0
  // const serviceFunc = type === 'property' ? PropertiesService : CacheService

  await new Promise<void>((resolve) => {
    // returns the method to be used based on the type of storage and scope
    let deleteObj: RosterMechanics.Utils.Cache.Batches.DeleteObj = null

    if (type === 'property') {
      if (scope === 'user') deleteObj = PropertiesService.getUserProperties()
      if (scope === 'document') deleteObj = PropertiesService.getDocumentProperties()
      if (scope === 'script') deleteObj = PropertiesService.getScriptProperties()
    } else {
      if (scope === 'user') deleteObj = CacheService.getUserCache()
      if (scope === 'document') deleteObj = CacheService.getDocumentCache()
      if (scope === 'script') deleteObj = CacheService.getScriptCache()
    }

    // const deleteMethod = type === 'property' ? 'deleteProperty' : 'remove'

    for (let i = 0; i < count; i += 1) {
      if (type === 'property') (deleteObj as GoogleAppsScript.Properties.Properties).deleteProperty(`${name}_${i}`)
      else (deleteObj as GoogleAppsScript.Cache.Cache).remove(`${name}_${i}`)
    }
    if (type === 'property') (deleteObj as GoogleAppsScript.Properties.Properties).deleteProperty(`${name}_total`)
    else (deleteObj as GoogleAppsScript.Cache.Cache).remove(`${name}_total`)
    resolve()
  })
}
export default deleteBatches
