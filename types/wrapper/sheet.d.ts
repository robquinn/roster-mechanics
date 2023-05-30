declare namespace RosterMechanics {
  namespace Wrapper {
    namespace Sheet {
      namespace Fn {
        type BackupSheet = () => Promise<void>
        type ClearUserCacheAndUpdateSheet = () => Promise<void>
        type ClearUserCache = () => Promise<void>
        type OnSpreadsheetOpen = () => Promise<void>
        type UpdateSheet = (args?: RosterMechanics.Utils.Cache.CacheArgs) => Promise<void>
      }
    }
  }
}
