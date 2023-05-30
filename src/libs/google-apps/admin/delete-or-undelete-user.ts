import GoogleAppsScriptConfig from '../../../config/google/apps-script'
import getSetDeletedUsers from '../../utils/cache/get-set-deleted-users'
import getByEmail from './get-by-email'

const deleteOrUndeleteUser: RosterMechanics.GoogleApps.Admin.Fn.DeleteOrUndeleteUser = async (
  latestResponse: RosterMechanics.GoogleApps.Form.FormResponseDeleteObject,
): Promise<{
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser | null
  action: RosterMechanics.Utils.Cache.CacheAction | 'void'
}> => {
  const shouldDeleteUser = latestResponse.delete === 'Delete'

  return await new Promise((resolve, reject) => {
    try {
      if (shouldDeleteUser) {
        getByEmail(latestResponse.email)
          .then(async (user) => {
            await getSetDeletedUsers({ email: user.primaryEmail as string, id: user.id as string })
            AdminDirectory.Users?.remove(latestResponse.email)
            resolve({ user, action: 'delete' })
            return true
          })
          .catch((err) => {
            console.log('deleteUser getByEmail (remove) ERROR', err)
          })
      } else {
        getSetDeletedUsers()
          .then(async (cache) => {
            const userId = cache.get(latestResponse.email)
            if (userId != null) {
              AdminDirectory.Users?.undelete({ orgUnitPath: '/' }, userId)
              Utilities.sleep(15000)
              const user = await getByEmail(latestResponse.email)
              resolve({ user, action: 'update' })
            } else {
              console.log(
                `Cannot undelete user as their userId was not found in the cache: ${
                  (await GoogleAppsScriptConfig).cache.deletedUsers.id
                }`,
              )
              resolve({ user: null, action: 'void' })
            }
            return true
          })
          .catch((err) => {
            console.log('deleteUser getSetDeletedUsers ERROR', err)
          })
      }
    } catch (err) {
      reject(new Error(`suspendUser update ERROR: ${err as string}`))
    }
  })
}

export default deleteOrUndeleteUser
