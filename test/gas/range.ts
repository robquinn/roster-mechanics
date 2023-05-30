type IRange = RosterMechanics.Test.Range.IRange

export default class Range implements IRange {
  private fontWeight: GoogleAppsScript.Spreadsheet.FontWeight | null = 'normal'
  private horizontalAlignment: 'left' | 'center' | 'normal' | 'right' | null = 'normal'
  private numberFormat = ''
  private values
  private range

  constructor({ values, range }: { values: string[][]; range: Array<[number, number]> }) {
    this.values = values
    this.range = range
  }

  // activate(): Range {}
  // activateAsCurrentCell(): Range {}
  // addDeveloperMetadata(key: string): Range {}
  // addDeveloperMetadata(key: string, visibility: DeveloperMetadataVisibility): Range {}
  // addDeveloperMetadata(key: string, value: string): Range {}
  // addDeveloperMetadata(key: string, value: string, visibility: DeveloperMetadataVisibility): Range {}
  // applyColumnBanding(): Banding {}
  // applyColumnBanding(bandingTheme: BandingTheme): Banding {}
  // applyColumnBanding(bandingTheme: BandingTheme, showHeader: boolean, showFooter: boolean): Banding {}
  // applyRowBanding(): Banding {}
  // applyRowBanding(bandingTheme: BandingTheme): Banding {}
  // applyRowBanding(bandingTheme: BandingTheme, showHeader: boolean, showFooter: boolean): Banding {}
  // autoFill(destination: Range, series: AutoFillSeries): void {}
  // autoFillToNeighbor(series: AutoFillSeries): void {}
  // breakApart(): Range {}
  // canEdit(): boolean {}
  // check(): Range {}
  clear(): RosterMechanics.Test.Range.IRange {
    this.values = []
    return this
  }

  // clear(options: {
  //   commentsOnly?: boolean | undefined
  //   contentsOnly?: boolean | undefined
  //   formatOnly?: boolean | undefined
  //   validationsOnly?: boolean | undefined
  //   skipFilteredRows?: boolean | undefined
  // }): Range {}
  // clearContent(): Range {}
  // clearDataValidations(): Range {}
  // clearFormat(): Range {}
  // clearNote(): Range {}
  // collapseGroups(): Range {}
  // copyFormatToRange(gridId: Integer, column: Integer, columnEnd: Integer, row: Integer, rowEnd: Integer): void {}
  // copyFormatToRange(sheet: Sheet, column: Integer, columnEnd: Integer, row: Integer, rowEnd: Integer): void {}
  // copyTo(destination: Range): void {}
  // copyTo(destination: Range, copyPasteType: CopyPasteType, transposed: boolean): void {}
  // copyTo(destination: Range, options: { formatOnly?: boolean | undefined; contentsOnly?: boolean | undefined }): void {}
  // copyValuesToRange(gridId: Integer, column: Integer, columnEnd: Integer, row: Integer, rowEnd: Integer): void {}
  // copyValuesToRange(sheet: Sheet, column: Integer, columnEnd: Integer, row: Integer, rowEnd: Integer): void {}
  // createDeveloperMetadataFinder(): DeveloperMetadataFinder {}
  // createFilter(): Filter {}
  // createPivotTable(sourceData: Range): PivotTable {}
  // createTextFinder(findText: string): TextFinder {}
  // deleteCells(shiftDimension: Dimension): void {}
  // expandGroups(): Range {}
  // getA1Notation(): string {}
  // getBackground(): string {}
  // getBackgrounds(): string[][] {}
  // getBandings(): Banding[] {}
  // getCell(row: Integer, column: Integer): Range {}
  // getColumn(): Integer {}
  // getDataRegion(): Range {}
  // getDataRegion(dimension: Dimension): Range {}
  // getDataSourceTables(): DataSourceTable[] {}
  // getDataSourceUrl(): string {}
  // getDataTable(): Charts.DataTable {}
  // getDataTable(firstRowIsHeader: boolean): Charts.DataTable {}
  // getDataValidation(): DataValidation | null {}
  // getDataValidations(): Array<Array<DataValidation | null>> {}
  // getDeveloperMetadata(): DeveloperMetadata[] {}
  // getDisplayValue(): string {}
  // getDisplayValues(): string[][] {}
  // getFilter(): Filter | null {}
  // getFontColor(): string {}
  // getFontColors(): string[][] {}
  // getFontFamilies(): string[][] {}
  // getFontFamily(): string {}
  // getFontLine(): FontLine {}
  // getFontLines(): FontLine[][] {}
  // getFontSize(): Integer {}
  // getFontSizes(): Integer[][] {}
  // getFontStyle(): FontStyle {}
  // getFontStyles(): FontStyle[][] {}
  // getFontWeight(): FontWeight {}
  // getFontWeights(): FontWeight[][] {}
  // getFormula(): string {}
  // getFormulaR1C1(): string | null {}
  // getFormulas(): string[][] {}
  // getFormulasR1C1(): Array<Array<string | null>> {}
  // getGridId(): Integer {}
  // getHeight(): Integer {}
  // getHorizontalAlignment(): string {}
  // getHorizontalAlignments(): string[][] {}
  // getLastColumn(): Integer {}
  // getLastRow(): Integer {}
  // getMergedRanges(): Range[] {}
  // getNextDataCell(direction: Direction): Range {}
  // getNote(): string {}
  // getNotes(): string[][] {}

  getNumColumns(): number {
    return this.values[0].length
  }

  getNumRows(): number {
    return this.values.length
  }

  // getNumberFormat(): string {}
  // getNumberFormats(): string[][] {}
  // getRichTextValue(): RichTextValue | null {}
  // getRichTextValues(): Array<Array<RichTextValue | null>> {}
  // getRow(): Integer {}
  // getRowIndex(): Integer {}
  // getSheet(): Sheet {}
  // getTextDirection(): TextDirection | null {}
  // getTextDirections(): Array<Array<TextDirection | null>> {}
  // getTextRotation(): TextRotation {}
  // getTextRotations(): TextRotation[][] {}
  // getTextStyle(): TextStyle {}
  // getTextStyles(): TextStyle[][] {}
  // getValue(): any {}
  getValues(): string[][] {
    return this.values
  }

  // getVerticalAlignment(): string {}
  // getVerticalAlignments(): string[][] {}
  // getWidth(): Integer {}
  // getWrap(): boolean {}
  // getWrapStrategies(): WrapStrategy[][] {}
  // getWrapStrategy(): WrapStrategy {}
  // getWraps(): boolean[][] {}
  // insertCells(shiftDimension: Dimension): Range {}
  // insertCheckboxes(): Range {}
  // insertCheckboxes(checkedValue: any): Range {}
  // insertCheckboxes(checkedValue: any, uncheckedValue: any): Range {}
  // isBlank(): boolean {}
  // isChecked(): boolean | null {}
  // isEndColumnBounded(): boolean {}
  // isEndRowBounded(): boolean {}
  // isPartOfMerge(): boolean {}
  // isStartColumnBounded(): boolean {}
  // isStartRowBounded(): boolean {}
  // merge(): Range {}
  // mergeAcross(): Range {}
  // mergeVertically(): Range {}
  // moveTo(target: Range): void {}
  // offset(rowOffset: Integer, columnOffset: Integer): Range {}
  // offset(rowOffset: Integer, columnOffset: Integer, numRows: Integer): Range {}
  offset(
    rowOffset: number,
    columnOffset: number,
    numRows: number,
    numColumns: number,
  ): RosterMechanics.Test.Range.IRange {
    const startRow = rowOffset
    const startColumn = columnOffset
    const numberOfRows = numRows != null ? numRows : this.values?.length
    const numberOfColumns = numColumns != null ? numColumns : this.values[0]?.length

    const range: Array<[number, number]> = []
    this.values.forEach((r, i) => {
      if (i >= startRow && i < numberOfRows) {
        r.forEach((val, j) => {
          if (j >= startColumn && j < numberOfColumns) {
            range.push([i, j])
          }
        })
      }
    })
    this.range = range
    return this
  }

  // protect(): Protection {}
  // randomize(): Range {}
  // removeCheckboxes(): Range {}
  // removeDuplicates(): Range {}
  // removeDuplicates(columnsToCompare: Integer[]): Range {}
  // setBackground(color: string | null): Range {}
  // setBackgroundRGB(red: Integer, green: Integer, blue: Integer): Range {}
  // setBackgrounds(color: Array<Array<string | null>>): Range {}
  // setBorder(
  //   top: boolean | null,
  //   left: boolean | null,
  //   bottom: boolean | null,
  //   right: boolean | null,
  //   vertical: boolean | null,
  //   horizontal: boolean | null,
  // ): Range {}
  // setBorder(
  //   top: boolean | null,
  //   left: boolean | null,
  //   bottom: boolean | null,
  //   right: boolean | null,
  //   vertical: boolean | null,
  //   horizontal: boolean | null,
  //   color: string | null,
  //   style: BorderStyle | null,
  // ): Range {}
  // setDataValidation(rule: DataValidation | null): Range {}
  // setDataValidations(rules: Array<Array<DataValidation | null>>): Range {}
  // setFontColor(color: string | null): Range {}
  // setFontColorObject(color: Color | null): Range {}
  // setFontColorObjects(colors: Array<Array<Color | null>>): Range {}
  // setFontColors(colors: any[][]): Range {}
  // setFontFamilies(fontFamilies: Array<Array<string | null>>): Range {}
  // setFontFamily(fontFamily: string | null): Range {}
  // setFontLine(fontLine: FontLine | null): Range {}
  // setFontLines(fontLines: Array<Array<FontLine | null>>): Range {}
  // setFontSize(size: Integer): Range {}
  // setFontSizes(sizes: Integer[][]): Range {}
  // setFontStyle(fontStyle: FontStyle | null): Range {}
  // setFontStyles(fontStyles: Array<Array<FontStyle | null>>): Range {}
  setFontWeight(fontWeight: GoogleAppsScript.Spreadsheet.FontWeight | null): RosterMechanics.Test.Range.IRange {
    this.fontWeight = fontWeight
    return this
  }

  // setFontWeights(fontWeights: Array<Array<FontWeight | null>>): Range {}
  // setFormula(formula: string): Range {}
  // setFormulaR1C1(formula: string): Range {}
  // setFormulas(formulas: string[][]): Range {}
  // setFormulasR1C1(formulas: string[][]): Range {}
  setHorizontalAlignment(alignment: 'left' | 'center' | 'normal' | 'right' | null): RosterMechanics.Test.Range.IRange {
    this.horizontalAlignment = alignment
    return this
  }

  // setHorizontalAlignments(alignments: Array<Array<'left' | 'center' | 'normal' | 'right' | null>>): Range {}
  // setNote(note: string | null): Range {}
  // setNotes(notes: Array<Array<string | null>>): Range {}
  setNumberFormat(numberFormat: string): RosterMechanics.Test.Range.IRange {
    this.numberFormat = numberFormat
    return this
  }

  // setNumberFormats(numberFormats: string[][]): Range {}
  // setRichTextValue(value: RichTextValue): Range {}
  // setRichTextValues(values: RichTextValue[][]): Range {}
  // setShowHyperlink(showHyperlink: boolean): Range {}
  // setTextDirection(direction: TextDirection | null): Range {}
  // setTextDirections(directions: Array<Array<TextDirection | null>>): Range {}
  // setTextRotation(degrees: Integer): Range {}
  // setTextRotation(rotation: TextRotation): Range {}
  // setTextRotations(rotations: TextRotation[][]): Range {}
  // setTextStyle(style: TextStyle): Range {}
  // setTextStyles(styles: TextStyle[][]): Range {}
  // setValue(value: any): Range {}
  setValues(values: string[][]): RosterMechanics.Test.Range.IRange {
    this.values = values

    let x = 0
    let y = 0
    this.range.every(([i, j]) => {
      this.values[i][j] = values[x][y]
      x += 1
      if (x === values[0].length - 1) {
        x = 0
        y += 1
      }
      if (y === values.length - 1 && x === values[0].length - 1) return false
      return true
    })
    return this
  }

  // setVerticalAlignment(alignment: 'top' | 'middle' | 'bottom' | null): Range {}
  // setVerticalAlignments(alignments: Array<Array<'top' | 'middle' | 'bottom' | null>>): Range {}
  // setVerticalText(isVertical: boolean): Range {}
  // setWrap(isWrapEnabled: boolean): Range {}
  // setWrapStrategies(strategies: WrapStrategy[][]): Range {}
  // setWrapStrategy(strategy: WrapStrategy): Range {}
  // setWraps(isWrapEnabled: boolean[][]): Range {}
  // shiftColumnGroupDepth(delta: Integer): Range {}
  // shiftRowGroupDepth(delta: Integer): Range {}
  sort(sortSpecObj: { column: number; ascending: boolean }): RosterMechanics.Test.Range.IRange {
    const { values } = this
    values.sort((a: Array<string | number>, b: Array<string | number>) => {
      if (sortSpecObj.ascending) {
        if (a[sortSpecObj.column - 1] < b[sortSpecObj.column - 1]) {
          return -1
        }
        if (a[sortSpecObj.column - 1] > b[sortSpecObj.column - 1]) {
          return 1
        }
        return 0
      }
      if (a[sortSpecObj.column - 1] < b[sortSpecObj.column - 1]) {
        return 1
      }
      if (a[sortSpecObj.column - 1] > b[sortSpecObj.column - 1]) {
        return -1
      }
      return 0
    })
    // this.values = values
    return this
  }
  // splitTextToColumns(): void {}
  // splitTextToColumns(delimiter: string): void {}
  // splitTextToColumns(delimiter: TextToColumnsDelimiter): void {}
  // trimWhitespace(): Range {}
  // uncheck(): Range {}
}
