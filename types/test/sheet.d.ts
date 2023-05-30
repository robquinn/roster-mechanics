declare namespace RosterMechanics {
  namespace Test {
    namespace Sheet {
      interface ISheet {
        getDataRange: () => RosterMechanics.Test.Range.IRange
        getName: () => string
        getLastColumn: () => number
        getLastRow: () => number
        getRange: (
          row: number | string,
          column?: number,
          numRows?: number,
          numColumns?: number,
        ) => RosterMechanics.Test.Range.IRange
        setFrozenRows: (rows: number) => void
      }
    }
  }
}
