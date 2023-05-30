import GoogleAppsScriptConfig from '../../../config/google/apps-script'
import deleteBatches from '../../utils/cache/delete-batches'

const clearUserCache: RosterMechanics.Wrapper.Sheet.Fn.ClearUserCache = async (): Promise<void> => {
  const { id, type, scope } = (await GoogleAppsScriptConfig).cache.users
  await deleteBatches(id, type, scope)
}

export default clearUserCache
