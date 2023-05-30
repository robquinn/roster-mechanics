import listAllUsers from '../../google-apps/admin/list-all-users'

const makeFreshCache: RosterMechanics.Utils.Cache.Fn.MakeFreshCache =
  async (): Promise<RosterMechanics.Utils.Cache.Batches.UsersBatch> => {
    const users = await listAllUsers()
    return await new Promise((resolve) => {
      console.log('Cache is empty or expired. retrieving users to save...')
      const mapped = new Map<string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>()
      const uLength = users.length
      for (let i = 0; i < uLength; i += 1) {
        mapped.set(users[i].id as string, users[i])
      }
      console.log('All users in saved to cache.')
      resolve(mapped)
    })
  }

export default makeFreshCache
