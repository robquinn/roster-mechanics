declare namespace RosterMechanics {
  namespace Test {
    namespace Spreadsheet {
      interface ISpreadsheet {
        addMenu: (name: string, subMenus: Array<{ name: string; functionName: string } | null>) => void
        getSheetByName: (name: string) => RosterMechanics.Test.Sheet.ISheet | null
      }
    }
  }
}
