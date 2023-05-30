declare namespace RosterMechanics {
  namespace Test {
    namespace Range {
      interface IRange {
        clear: () => RosterMechanics.Test.Range.IRange
        getNumColumns: () => number
        getNumRows: () => number
        getValues: () => string[][]
        offset: (
          rowOffset: number,
          columnOffset: number,
          numRows: number,
          numColumns: number,
        ) => RosterMechanics.Test.Range.IRange
        setFontWeight: (fontWeight: GoogleAppsScript.Spreadsheet.FontWeight | null) => RosterMechanics.Test.Range.IRange
        setHorizontalAlignment: (
          alignment: 'left' | 'center' | 'normal' | 'right' | null,
        ) => RosterMechanics.Test.Range.IRange
        setNumberFormat: (numberFormat: string) => RosterMechanics.Test.Range.IRange
        setValues: (values: string[][]) => RosterMechanics.Test.Range.IRange
        sort: (sortSpecObj: { column: number; ascending: boolean }) => RosterMechanics.Test.Range.IRange
      }
    }
  }
}
