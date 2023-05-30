import GoogleAppsScriptConfig from '../../../config/google/apps-script'
import deleteBatches from './delete-batches'
import handleCacheArgs from './handle-cache-args'
import makeFreshCache from './make-fresh-cache'
import mapValuesToArray from './map-values-to-array'
import retrieveFromBatches from './retrieve-from-batches'
import saveInBatches from './save-in-batches'

const getAllUsers: RosterMechanics.Utils.Cache.Fn.GetAllUsers = async (
  args?: RosterMechanics.Utils.Cache.CacheArgs,
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> => {
  const { id: cacheId, type: cacheType, scope: cacheScope } = (await GoogleAppsScriptConfig).cache.users
  let cache = (await retrieveFromBatches(
    cacheId,
    cacheType,
    cacheScope,
  )) as RosterMechanics.Utils.Cache.Batches.UsersBatch

  if (cache != null) {
    console.log(`Cache exists of ${cache.size} users`)
    // let mapped = await deSerializeMap(cached)
    if (args?.googleAdminUser != null && args?.action != null) {
      cache = await handleCacheArgs({ cache, googleAdminUser: args.googleAdminUser, action: args.action })
      await deleteBatches(cacheId, cacheType, cacheScope)
      await saveInBatches(cacheId, cache, cacheType, cacheScope)
    }
    console.log(`Cache of ${cache.size} users has been saved`)
    const usersArr = await mapValuesToArray(cache)
    return await Promise.resolve(usersArr)
  }

  let freshCache = await makeFreshCache()
  if (args?.googleAdminUser != null && args?.action != null) {
    freshCache = await handleCacheArgs({
      cache: freshCache,
      googleAdminUser: args.googleAdminUser,
      action: args.action,
    })
  }
  await deleteBatches(cacheId, cacheType, cacheScope)
  await saveInBatches(cacheId, freshCache, cacheType, cacheScope)
  console.log(`Cache of ${freshCache.size} users has been saved`)
  const usersArr = await mapValuesToArray(freshCache)
  return await Promise.resolve(usersArr)
}

export default getAllUsers
