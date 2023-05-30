import spreadsheetAddMenuFieldsValidation from './utils/spreadsheet-app/spreadsheet-add-menu-fields-validation'

type ISpreadsheet = RosterMechanics.Test.Spreadsheet.ISpreadsheet

export default class Spreadsheet implements ISpreadsheet {
  private readonly sheets
  private readonly id
  constructor({ id, sheets }: { id: string; sheets: RosterMechanics.Test.Sheet.ISheet[] }) {
    this.sheets = sheets
    this.id = id
  }

  // addDeveloperMetadata(key: string): Spreadsheet {}
  // addDeveloperMetadata(key: string, visibility: DeveloperMetadataVisibility): Spreadsheet {}
  // addDeveloperMetadata(key: string, value: string): Spreadsheet {}
  // addDeveloperMetadata(key: string, value: string, visibility: DeveloperMetadataVisibility): Spreadsheet {}
  // addEditor(emailAddress: string): Spreadsheet {}
  // addEditor(user: Base.User): Spreadsheet {}
  // addEditors(emailAddresses: string[]): Spreadsheet {}

  // eslint-disable-next-line class-methods-use-this
  addMenu(name: string, subMenus: Array<{ name: string; functionName: string } | null>): void {
    spreadsheetAddMenuFieldsValidation(name, subMenus)
  }

  // addViewer(emailAddress: string): Spreadsheet {}
  // addViewer(user: Base.User): Spreadsheet {}
  // addViewers(emailAddresses: string[]): Spreadsheet {}
  // appendRow(rowContents: any[]): Sheet {}
  // autoResizeColumn(columnPosition: Integer): Sheet {}
  // copy(name: string): Spreadsheet {}
  // createDeveloperMetadataFinder(): DeveloperMetadataFinder {}
  // createTextFinder(findText: string): TextFinder {}
  // deleteActiveSheet(): Sheet {}
  // deleteColumn(columnPosition: Integer): Sheet {}
  // deleteColumns(columnPosition: Integer, howMany: Integer): void {}
  // deleteRow(rowPosition: Integer): Sheet {}
  // deleteRows(rowPosition: Integer, howMany: Integer): void {}
  // deleteSheet(sheet: Sheet): void {}
  // duplicateActiveSheet(): Sheet {}
  // getActiveCell(): Range {}
  // getActiveRange(): Range | null {}
  // getActiveRangeList(): RangeList | null {}
  // getActiveSheet(): Sheet {}
  // getAs(contentType: string): Base.Blob {}
  // getBandings(): Banding[] {}
  // getBlob(): Base.Blob {}
  // getColumnWidth(columnPosition: Integer): Integer {}
  // getCurrentCell(): Range | null {}
  // getDataRange(): Range {}
  // getDataSourceTables(): DataSourceTable[] {}
  // getDeveloperMetadata(): DeveloperMetadata[] {}
  // getEditors(): Base.User[] {}
  // getFormUrl(): string | null {}
  // getFrozenColumns(): Integer {}
  // getFrozenRows(): Integer {}
  // getId(): string {}
  // getImages(): OverGridImage[] {}
  // getIterativeCalculationConvergenceThreshold(): number {}
  // getLastColumn(): Integer {}
  // getLastRow(): Integer {}
  // getMaxIterativeCalculationCycles(): Integer {}
  // getName(): string {}
  // getNamedRanges(): NamedRange[] {}
  // getNumSheets(): Integer {}
  // getOwner(): Base.User | null {}
  // getPredefinedSpreadsheetThemes(): SpreadsheetTheme[] {}
  // getProtections(type: ProtectionType): Protection[] {}
  // getRange(a1Notation: string): Range {}
  // getRangeByName(name: string): Range | null {}
  // getRangeList(a1Notations: string[]): RangeList {}
  // getRecalculationInterval(): RecalculationInterval {}
  // getRowHeight(rowPosition: Integer): Integer {}
  // getSelection(): Selection {}

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  getSheetByName(name: string): RosterMechanics.Test.Sheet.ISheet | null {
    return this.sheets[1]
  }
  // getSheetId(): Integer {}
  // getSheetName(): string {}
  // getSheetValues(startRow: Integer, startColumn: Integer, numRows: Integer, numColumns: Integer): any[][] {}
  // getSheets(): Sheet[] {}
  // getSpreadsheetLocale(): string {}
  // getSpreadsheetTheme(): SpreadsheetTheme | null {}
  // getSpreadsheetTimeZone(): string {}
  // getUrl(): string {}
  // getViewers(): Base.User[] {}
  // hideColumn(column: Range): void {}
  // hideRow(row: Range): void {}
  // insertColumnAfter(afterPosition: Integer): Sheet {}
  // insertColumnBefore(beforePosition: Integer): Sheet {}
  // insertColumnsAfter(afterPosition: Integer, howMany: Integer): Sheet {}
  // insertColumnsBefore(beforePosition: Integer, howMany: Integer): Sheet {}
  // insertImage(blobSource: Base.BlobSource, column: Integer, row: Integer): OverGridImage {}
  // insertImage(
  //   blobSource: Base.BlobSource,
  //   column: Integer,
  //   row: Integer,
  //   offsetX: Integer,
  //   offsetY: Integer,
  // ): OverGridImage {}

  // insertImage(url: string, column: Integer, row: Integer): OverGridImage {}
  // insertImage(url: string, column: Integer, row: Integer, offsetX: Integer, offsetY: Integer): OverGridImage {}
  // insertRowAfter(afterPosition: Integer): Sheet {}
  // insertRowBefore(beforePosition: Integer): Sheet {}
  // insertRowsAfter(afterPosition: Integer, howMany: Integer): Sheet {}
  // insertRowsBefore(beforePosition: Integer, howMany: Integer): Sheet {}
  // insertSheet(): Sheet {}
  // insertSheet(sheetIndex: Integer): Sheet {}
  // insertSheet(sheetIndex: Integer, options: { template?: Sheet | undefined }): Sheet {}
  // insertSheet(options: { template?: Sheet | undefined }): Sheet {}
  // insertSheet(sheetName: string): Sheet {}
  // insertSheet(sheetName: string, sheetIndex: Integer): Sheet {}
  // insertSheet(sheetName: string, sheetIndex: Integer, options: { template?: Sheet | undefined }): Sheet {}
  // insertSheet(sheetName: string, options: { template?: Sheet | undefined }): Sheet {}
  // insertSheetWithDataSourceTable(spec: DataSourceSpec): Sheet {}
  // isColumnHiddenByUser(columnPosition: Integer): boolean {}
  // isIterativeCalculationEnabled(): boolean {}
  // isRowHiddenByFilter(rowPosition: Integer): boolean {}
  // isRowHiddenByUser(rowPosition: Integer): boolean {}
  // moveActiveSheet(pos: Integer): void {}
  // moveChartToObjectSheet(chart: EmbeddedChart): Sheet {}
  // removeEditor(emailAddress: string): Spreadsheet {}
  // removeEditor(user: Base.User): Spreadsheet {}
  // removeMenu(name: string): void {}
  // removeNamedRange(name: string): void {}
  // removeViewer(emailAddress: string): Spreadsheet {}
  // removeViewer(user: Base.User): Spreadsheet {}
  // rename(newName: string): void {}
  // renameActiveSheet(newName: string): void {}
  // resetSpreadsheetTheme(): SpreadsheetTheme {}
  // setActiveRange(range: Range): Range {}
  // setActiveRangeList(rangeList: RangeList): RangeList {}
  // setActiveSelection(range: Range): Range {}
  // setActiveSelection(a1Notation: string): Range {}
  // setActiveSheet(sheet: Sheet): Sheet {}
  // setActiveSheet(sheet: Sheet, restoreSelection: boolean): Sheet {}
  // setColumnWidth(columnPosition: Integer, width: Integer): Sheet {}
  // setCurrentCell(cell: Range): Range {}
  // setFrozenColumns(columns: Integer): void {}
  // setFrozenRows(rows: Integer): void {}
  // setIterativeCalculationConvergenceThreshold(minThreshold: number): Spreadsheet {}
  // setIterativeCalculationEnabled(isEnabled: boolean): Spreadsheet {}
  // setMaxIterativeCalculationCycles(maxIterations: Integer): Spreadsheet {}
  // setNamedRange(name: string, range: Range): void {}
  // setRecalculationInterval(recalculationInterval: RecalculationInterval): Spreadsheet {}
  // setRowHeight(rowPosition: Integer, height: Integer): Sheet {}
  // setSpreadsheetLocale(locale: string): void {}
  // setSpreadsheetTheme(theme: SpreadsheetTheme): SpreadsheetTheme {}
  // setSpreadsheetTimeZone(timezone: string): void {}
  // show(userInterface: HTML.HtmlOutput): void {}
  // sort(columnPosition: Integer): Sheet {}
  // sort(columnPosition: Integer, ascending: boolean): Sheet {}
  // toast(msg: string): void {}
  // toast(msg: string, title: string): void {}
  // toast(msg: string, title: string, timeoutSeconds: number | null): void {}
  // unhideColumn(column: Range): void {}
  // unhideRow(row: Range): void {}
  // updateMenu(name: string, subMenus: Array<{ name: string; functionName: string }>): void {}
  // /** @deprecated DO NOT USE */ getSheetProtection(): PageProtection {}
  // /** @deprecated DO NOT USE */ isAnonymousView(): boolean {}
  // /** @deprecated DO NOT USE */ isAnonymousWrite(): boolean {}
  // /** @deprecated DO NOT USE */ setAnonymousAccess(
  //   anonymousReadAllowed: boolean,
  //   anonymousWriteAllowed: boolean,
  // ): void {}

  // /** @deprecated DO NOT USE */ setSheetProtection(permissions: PageProtection): void {}
}
