declare namespace RosterMechanics {
  namespace Test {
    namespace SpreadsheetApp {
      namespace Fn {
        type SampleRowsGeneralRoster = () => string[][]
        type SampleRowsAdminRoster = () => string[][]
        type SpreadsheetAddMenuFieldsValidation = (
          name: string,
          subMenus: Array<{ name: string; functionName: string } | null>,
        ) => void
      }
      interface ISpreadsheetApp {
        flush: () => void
        getActive: () => RosterMechanics.Test.Spreadsheet.ISpreadsheet
        openById: (id: string) => RosterMechanics.Test.Spreadsheet.ISpreadsheet
      }
    }
  }
}
