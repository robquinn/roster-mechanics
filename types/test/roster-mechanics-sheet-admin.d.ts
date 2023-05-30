declare namespace RosterMechanics {
  namespace Test {
    namespace RosterMechanicsSheetADMIN {
      namespace Fn {
        type RMUpdateSheetFieldValidation = (args?: RosterMechanics.Utils.Cache.CacheArgs) => void
      }
      interface IRosterMechanicsSheetADMIN {
        updateSheet: (args?: RosterMechanics.Utils.Cache.CacheArgs) => Promise<void>
      }
    }
  }
}
