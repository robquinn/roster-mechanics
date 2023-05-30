const GoogleAppsScriptConfig: RosterMechanics.Config.Google.AppsScript = (async () => {
  return await new Promise((resolve) => {
    resolve({
      cache: {
        users: {
          id: process.env.GAS_USERS_CACHE_ID as string,
          type: process.env.GAS_USERS_CACHE_TYPE as RosterMechanics.Utils.Cache.Storage.Type,
          scope: process.env.GAS_USERS_CACHE_SCOPE as RosterMechanics.Utils.Cache.Storage.Scope,
        },
        deletedUsers: {
          id: process.env.GAS_DELETED_USERS_CACHE_ID as string,
          type: process.env.GAS_DELETED_USERS_CACHE_TYPE as RosterMechanics.Utils.Cache.Storage.Type,
          scope: process.env.GAS_DELETED_USERS_CACHE_SCOPE as RosterMechanics.Utils.Cache.Storage.Scope,
        },
      },
    })
  })
})() as RosterMechanics.Config.Google.AppsScript

export default GoogleAppsScriptConfig
