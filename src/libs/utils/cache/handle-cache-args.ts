const handleCacheArgs: RosterMechanics.Utils.Cache.Fn.HandleCacheArgs = async ({
  cache,
  googleAdminUser,
  action,
}: {
  cache: RosterMechanics.Utils.Cache.Batches.UsersBatch
  googleAdminUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  action: RosterMechanics.Utils.Cache.CacheAction
}): Promise<RosterMechanics.Utils.Cache.Batches.UsersBatch> => {
  return await new Promise((resolve) => {
    switch (action) {
      case 'update':
        console.log(`Updating user ${googleAdminUser?.primaryEmail as string} in cache`)
        cache.set(googleAdminUser?.id as string, googleAdminUser)
        console.log(`User ${googleAdminUser?.primaryEmail as string} updated in cache`)
        break
      case 'delete':
        console.log(`Deleting user ${googleAdminUser?.primaryEmail as string} from cache`)
        cache.delete(googleAdminUser?.id as string)
        console.log(`User ${googleAdminUser?.primaryEmail as string} deleted from cache`)
        break
      default:
        break
    }
    resolve(cache)
  })
}

export default handleCacheArgs
