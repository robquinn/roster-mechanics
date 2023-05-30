import Range from './range'

type ISheet = RosterMechanics.Test.Sheet.ISheet

export default class Sheet implements ISheet {
  private frozenRows = 0
  private readonly originalValues
  private values
  private readonly name
  constructor({ name, values }: { name: string; values: string[][] }) {
    this.originalValues = values
    this.values = new Range({ values, range: [] })
    this.name = name
  }

  // activate(): Sheet {}
  // addDeveloperMetadata(key: string): Sheet {}
  // addDeveloperMetadata(key: string, visibility: DeveloperMetadataVisibility): Sheet {}
  // addDeveloperMetadata(key: string, value: string): Sheet {}
  // addDeveloperMetadata(key: string, value: string, visibility: DeveloperMetadataVisibility): Sheet {}
  // appendRow(rowContents: any[]): Sheet {}
  // autoResizeColumn(columnPosition: Integer): Sheet {}
  // autoResizeColumns(startColumn: Integer, numColumns: Integer): Sheet {}
  // autoResizeRows(startRow: Integer, numRows: Integer): Sheet {}
  // clear(): Sheet {}
  // clear(options: { formatOnly?: boolean | undefined; contentsOnly?: boolean | undefined }): Sheet {}
  // clearConditionalFormatRules(): void {}
  // clearContents(): Sheet {}
  // clearFormats(): Sheet {}
  // clearNotes(): Sheet {}
  // collapseAllColumnGroups(): Sheet {}
  // collapseAllRowGroups(): Sheet {}
  // copyTo(spreadsheet: Spreadsheet): Sheet {}
  // createDeveloperMetadataFinder(): DeveloperMetadataFinder {}
  // createTextFinder(findText: string): TextFinder {}
  // deleteColumn(columnPosition: Integer): Sheet {}
  // deleteColumns(columnPosition: Integer, howMany: Integer): void {}
  // deleteRow(rowPosition: Integer): Sheet {}
  // deleteRows(rowPosition: Integer, howMany: Integer): void {}
  // expandAllColumnGroups(): Sheet {}
  // expandAllRowGroups(): Sheet {}
  // expandColumnGroupsUpToDepth(groupDepth: Integer): Sheet {}
  // expandRowGroupsUpToDepth(groupDepth: Integer): Sheet {}
  // getActiveCell(): Range {}
  // getActiveRange(): Range | null {}
  // getActiveRangeList(): RangeList | null {}
  // getBandings(): Banding[] {}
  // getCharts(): EmbeddedChart[] {}
  // getColumnGroup(columnIndex: Integer, groupDepth: Integer): Group | null {}
  // getColumnGroupControlPosition(): GroupControlTogglePosition {}
  // getColumnGroupDepth(columnIndex: Integer): Integer {}
  // getColumnWidth(columnPosition: Integer): Integer {}
  // getConditionalFormatRules(): ConditionalFormatRule[] {}
  // getCurrentCell(): Range | null {}
  getDataRange(): RosterMechanics.Test.Range.IRange {
    return this.values
  }

  // getDataSourceTables(): DataSourceTable[] {}
  // getDeveloperMetadata(): DeveloperMetadata[] {}
  // getDrawings(): Drawing[] {}
  // getFilter(): Filter | null {}
  // getFormUrl(): string | null {}
  // getFrozenColumns(): Integer {}
  // getFrozenRows(): Integer {}
  // getImages(): OverGridImage[] {}
  // getIndex(): Integer {}
  getLastColumn(): number {
    return this.values.getValues()[0].length
  }

  getLastRow(): number {
    return this.values.getValues().length
  }

  // getMaxColumns(): Integer {}
  // getMaxRows(): Integer {}
  getName(): string {
    return this.name
  }

  // getNamedRanges(): NamedRange[] {}
  // getParent(): Spreadsheet {}
  // getPivotTables(): PivotTable[] {}
  // getProtections(type: ProtectionType): Protection[] {}
  // getRange(row: Integer, column: Integer): Range {}
  // getRange(row: Integer, column: Integer, numRows: Integer): Range {}

  getRange(
    row: number | string,
    column?: number,
    numRows?: number,
    numColumns?: number,
  ): RosterMechanics.Test.Range.IRange {
    const startRow = row != null && typeof row === 'number' ? row : 0
    let startColumn = column != null ? column : 0
    const numberOfRows = numRows != null ? numRows : this.values.getValues()?.length
    const numberOfColumns = numColumns != null ? numColumns : this.values.getValues()[0]?.length

    if (typeof row === 'string' && row.split(':')[0] === row.split(':')[1]) {
      const getA1NotationNumber = (range: string): number => {
        const firstLetter = range.charCodeAt(0) - 64
        if (range.substring(1, 2) === ':') return firstLetter
        return firstLetter + (26 - (range.charCodeAt(0) - 64)) + (range.charCodeAt(1) - 64)
      }
      startColumn = getA1NotationNumber(row)
    }
    const { values } = this

    const range: Array<[number, number]> = []
    values.getValues().forEach((r, i) => {
      if (i >= startRow && i < numberOfRows) {
        r.forEach((val, j) => {
          if (j >= startColumn && j < numberOfColumns) {
            range.push([i, j])
          }
        })
      }
    })
    this.values = new Range({ values: values.getValues(), range })
    return this.values
  }

  // getRange(a1Notation: string): Range {}
  // getRangeList(a1Notations: string[]): RangeList {}
  // getRowGroup(rowIndex: Integer, groupDepth: Integer): Group | null {}
  // getRowGroupControlPosition(): GroupControlTogglePosition {}
  // getRowGroupDepth(rowIndex: Integer): Integer {}
  // getRowHeight(rowPosition: Integer): Integer {}
  // getSelection(): Selection {}
  // getSheetId(): Integer {}
  // getSheetName(): string {}
  // getSheetValues(startRow: Integer, startColumn: Integer, numRows: Integer, numColumns: Integer): any[][] {}
  // getSlicers(): Slicer[] {}
  // getTabColor(): string | null {}
  // getType(): SheetType {}
  // hasHiddenGridlines(): boolean {}
  // hideColumn(column: Range): void {}
  // hideColumns(columnIndex: Integer): void {}
  // hideColumns(columnIndex: Integer, numColumns: Integer): void {}
  // hideRow(row: Range): void {}
  // hideRows(rowIndex: Integer): void {}
  // hideRows(rowIndex: Integer, numRows: Integer): void {}
  // hideSheet(): Sheet {}
  // insertChart(chart: EmbeddedChart): void {}
  // insertColumnAfter(afterPosition: Integer): Sheet {}
  // insertColumnBefore(beforePosition: Integer): Sheet {}
  // insertColumns(columnIndex: Integer): void {}
  // insertColumns(columnIndex: Integer, numColumns: Integer): void {}
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
  // insertRows(rowIndex: Integer): void {}
  // insertRows(rowIndex: Integer, numRows: Integer): void {}
  // insertRowsAfter(afterPosition: Integer, howMany: Integer): Sheet {}
  // insertRowsBefore(beforePosition: Integer, howMany: Integer): Sheet {}
  // insertSlicer(range: Range, anchorRowPos: Integer, anchorColPos: Integer): Slicer {}
  // insertSlicer(
  //   range: Range,
  //   anchorRowPos: Integer,
  //   anchorColPos: Integer,
  //   offsetX: Integer,
  //   offsetY: Integer,
  // ): Slicer {}
  // isColumnHiddenByUser(columnPosition: Integer): boolean {}
  // isRightToLeft(): boolean {}
  // isRowHiddenByFilter(rowPosition: Integer): boolean {}
  // isRowHiddenByUser(rowPosition: Integer): boolean {}
  // isSheetHidden(): boolean {}
  // moveColumns(columnSpec: Range, destinationIndex: Integer): void {}
  // moveRows(rowSpec: Range, destinationIndex: Integer): void {}
  // newChart(): EmbeddedChartBuilder {}
  // protect(): Protection {}
  // removeChart(chart: EmbeddedChart): void {}
  // setActiveRange(range: Range): Range {}
  // setActiveRangeList(rangeList: RangeList): RangeList {}
  // setActiveSelection(range: Range): Range {}
  // setActiveSelection(a1Notation: string): Range {}
  // setColumnGroupControlPosition(position: GroupControlTogglePosition): Sheet {}
  // setColumnWidth(columnPosition: Integer, width: Integer): Sheet {}
  // setColumnWidths(startColumn: Integer, numColumns: Integer, width: Integer): Sheet {}
  // setConditionalFormatRules(rules: ConditionalFormatRule[]): void {}
  // setCurrentCell(cell: Range): Range {}
  // setFrozenColumns(columns: Integer): void {}

  setFrozenRows(rows: number): void {
    this.frozenRows = rows
  }

  // setHiddenGridlines(hideGridlines: boolean): Sheet {}
  // setName(name: string): Sheet {}
  // setRightToLeft(rightToLeft: boolean): Sheet {}
  // setRowGroupControlPosition(position: GroupControlTogglePosition): Sheet {}
  // setRowHeight(rowPosition: Integer, height: Integer): Sheet {}
  // setRowHeights(startRow: Integer, numRows: Integer, height: Integer): Sheet {}
  // setRowHeightsForced(startRow: Integer, numRows: Integer, height: Integer): Sheet {}
  // setTabColor(color: string | null): Sheet {}
  // showColumns(columnIndex: Integer): void {}
  // showColumns(columnIndex: Integer, numColumns: Integer): void {}
  // showRows(rowIndex: Integer): void {}
  // showRows(rowIndex: Integer, numRows: Integer): void {}
  // showSheet(): Sheet {}
  // sort(columnPosition: Integer): Sheet {}
  // sort(columnPosition: Integer, ascending: boolean): Sheet {}
  // unhideColumn(column: Range): void {}
  // unhideRow(row: Range): void {}
  // updateChart(chart: EmbeddedChart): void {}
  // /** @deprecated DO NOT USE */ getSheetProtection(): PageProtection {}
  // /** @deprecated DO NOT USE */ setSheetProtection(permissions: PageProtection): void {}
}
