import RMUpdateSheetFieldValidation from './field-validation/update-sheet-args'

type IRosterMechanicsSheetADMIN = RosterMechanics.Test.RosterMechanicsSheetADMIN.IRosterMechanicsSheetADMIN

export default class RosterMechanicsSheetADMIN implements IRosterMechanicsSheetADMIN {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/require-await
  async updateSheet(args?: RosterMechanics.Utils.Cache.CacheArgs): Promise<void> {
    if (args != null) RMUpdateSheetFieldValidation(args)
  }
}
