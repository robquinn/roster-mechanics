// Type definitions for [~Roster Mechanics~] [~1.0.1~]
// Project: [~Roster Mechanics~]
// Definitions by: [~Robert Quinn~] <[~https://robquinn.dev~]>

// type ZeroThroughNine = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
interface Global {
  backupSheet: RosterMechanics.Wrapper.Sheet.Fn.BackupSheet
  clearUserCache: RosterMechanics.Wrapper.Sheet.Fn.ClearUserCache
  clearUserCacheAndUpdateSheet: RosterMechanics.Wrapper.Sheet.Fn.ClearUserCacheAndUpdateSheet
  onSpreadsheetOpen: RosterMechanics.Wrapper.Sheet.Fn.OnSpreadsheetOpen
  updateSheet: RosterMechanics.Wrapper.Sheet.Fn.UpdateSheet
  onFormSubmit: RosterMechanics.Wrapper.Form.Fn.OnFormSubmitHireUpdate
}

declare namespace RosterMechanics {
  namespace Base {
    type YesOrNo = 'Yes' | 'No'

    interface RosterMechanicsSheetADMIN {
      updateSheet: ({
        googleAdminUser,
        action,
      }: {
        googleAdminUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
        action: RosterMechanics.Utils.Cache.CacheAction
      }) => Promise<void>
      clearUserCacheAndUpdateSheet: () => Promise<void>
    }

    type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
      ? Acc[number]
      : Enumerate<N, [...Acc, Acc['length']]>

    type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
  }
}
