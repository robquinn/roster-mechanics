import Sheet from './sheet'
import Spreadsheet from './spreadsheet'
import sampleRowsAdminRoster from './utils/spreadsheet-app/sample-rows-admin-roster'
import sampleRowsGeneralRoster from './utils/spreadsheet-app/sample-rows-general-roster'

type ISpreadsheetApp = RosterMechanics.Test.SpreadsheetApp.ISpreadsheetApp

export default class SpreadsheetApp implements ISpreadsheetApp {
  // AutoFillSeries: typeof AutoFillSeries
  // BandingTheme: typeof BandingTheme
  // BooleanCriteria: typeof BooleanCriteria
  // BorderStyle: typeof BorderStyle
  // ColorType: typeof Base.ColorType
  // CopyPasteType: typeof CopyPasteType
  // DataExecutionErrorCode: typeof DataExecutionErrorCode
  // DataExecutionState: typeof DataExecutionState
  // DataSourceParameterType: typeof DataSourceParameterType
  // DataSourceType: typeof DataSourceType
  // DataValidationCriteria: typeof DataValidationCriteria
  // DeveloperMetadataLocationType: typeof DeveloperMetadataLocationType
  // DeveloperMetadataVisibility: typeof DeveloperMetadataVisibility
  // Dimension: typeof Dimension
  // Direction: typeof Direction
  // GroupControlTogglePosition: typeof GroupControlTogglePosition
  // InterpolationType: typeof InterpolationType
  // PivotTableSummarizeFunction: typeof PivotTableSummarizeFunction
  // PivotValueDisplayType: typeof PivotValueDisplayType
  // ProtectionType: typeof ProtectionType
  // RecalculationInterval: typeof RecalculationInterval
  // RelativeDate: typeof RelativeDate
  // SheetType: typeof SheetType
  // TextDirection: typeof TextDirection
  // TextToColumnsDelimiter: typeof TextToColumnsDelimiter
  // ThemeColorType: typeof ThemeColorType
  // WrapStrategy: typeof WrapStrategy
  // create(name: string): Spreadsheet {}
  // create(name: string, rows: Integer, columns: Integer): Spreadsheet {}
  // enableAllDataSourcesExecution(): void {}
  // enableBigQueryExecution(): void {}

  // eslint-disable-next-line class-methods-use-this
  flush(): void {}

  // eslint-disable-next-line class-methods-use-this
  getActive(): RosterMechanics.Test.Spreadsheet.ISpreadsheet {
    return new Spreadsheet({
      id: 'somesheetid',
      sheets: [
        new Sheet({
          name: 'GeneralRoster',
          values: sampleRowsGeneralRoster(),
        }),
        new Sheet({
          name: 'AdminRoster',
          values: sampleRowsAdminRoster(),
        }),
      ],
    })
  }

  // getActiveRange(): Range {}
  // getActiveRangeList(): RangeList {}
  // getActiveSheet(): Sheet {}
  // getActiveSpreadsheet(): Spreadsheet {}
  // getCurrentCell(): Range {}
  // getSelection(): Selection {}
  // getUi(): Base.Ui {}
  // newColor(): ColorBuilder {}
  // newConditionalFormatRule(): ConditionalFormatRuleBuilder {}
  // newDataSourceSpec(): DataSourceSpecBuilder {}
  // newDataValidation(): DataValidationBuilder {}
  // newFilterCriteria(): FilterCriteriaBuilder {}
  // newRichTextValue(): RichTextValueBuilder {}
  // newTextStyle(): TextStyleBuilder {}
  // open(file: Drive.File): Spreadsheet {}

  // eslint-disable-next-line class-methods-use-this
  openById(id: string): RosterMechanics.Test.Spreadsheet.ISpreadsheet {
    return new Spreadsheet({
      id,
      sheets: [
        new Sheet({
          name: 'GeneralRoster',
          values: sampleRowsGeneralRoster(),
        }),
        new Sheet({
          name: 'AdminRoster',
          values: sampleRowsAdminRoster(),
        }),
      ],
    })
  }

  // openByUrl(url: string): Spreadsheet {}
  // setActiveRange(range: Range): Range {}
  // setActiveRangeList(rangeList: RangeList): RangeList {}
  // setActiveSheet(sheet: Sheet): Sheet {}
  // setActiveSheet(sheet: Sheet, restoreSelection: boolean): Sheet {}
  // setActiveSpreadsheet(newActiveSpreadsheet: Spreadsheet): void {}
  // setCurrentCell(cell: Range): Range {}
}
