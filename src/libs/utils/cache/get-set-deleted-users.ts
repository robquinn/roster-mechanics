import GoogleAppsScriptConfig from '../../../config/google/apps-script'
import retrieveFromBatches from './retrieve-from-batches'
import saveInBatches from './save-in-batches'

const getSetDeletedUsers: RosterMechanics.Utils.Cache.Fn.GetSetDeletedUsers = async (args?: {
  email: string
  id: string
}): Promise<RosterMechanics.Utils.Cache.Batches.DeletedUsersBatch> => {
  const { id: cacheId, type: cacheType, scope: cacheScope } = (await GoogleAppsScriptConfig).cache.deletedUsers
  let cache = await retrieveFromBatches(cacheId, cacheType, cacheScope)

  if (cache == null) {
    console.log(`Cache ${cacheId} is expired or empty. Creating anew.`)
    cache = new Map<string, string>()
  }

  if (args?.id != null && args?.email != null) {
    console.log(`Adding to cache (${cacheId}) user email (${args.email}) under id (${args.id})`)
    ;(cache as RosterMechanics.Utils.Cache.Batches.DeletedUsersBatch).set(args.email, args.id)
    await saveInBatches(cacheId, cache, cacheType, cacheScope)
  }

  console.log(`Resolving cache (${cacheId}) of size (${cache.size})`)
  return await Promise.resolve(cache as RosterMechanics.Utils.Cache.Batches.DeletedUsersBatch)
}

export default getSetDeletedUsers
