import clearUserCache from './clear-user-cache'
import updateSheet from './update-sheet'

const clearUserCacheAndUpdateSheet: RosterMechanics.Wrapper.Sheet.Fn.ClearUserCacheAndUpdateSheet =
  async (): Promise<void> => {
    await clearUserCache()
    await updateSheet()
  }
export default clearUserCacheAndUpdateSheet
