type IGoogleSheet = RosterMechanics.GoogleApps.Sheet.IGoogleSheet

export default class GoogleSheet implements IGoogleSheet {
  private readonly _sheet: Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Sheet>
  private _values: Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values> | null

  constructor({ sheetId, sheetName }: { sheetId: string; sheetName: string; create?: boolean }) {
    this._sheet = new Promise((resolve) => {
      const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(
        sheetName,
      ) as RosterMechanics.GoogleApps.Sheet.Spreadsheet.Sheet
      resolve(sheet)
    })

    this._values = null
  }

  private get sheet(): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Sheet> {
    return this._sheet
  }

  private get dataRange(): Promise<GoogleAppsScript.Spreadsheet.Range> {
    return this.sheet.then(async (s) => {
      return await Promise.resolve(s.getDataRange())
    })
  }

  // get currently cached valued
  private get values(): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values> {
    // if we dont have any then get some
    if (this._values != null) {
      return this._values
    }
    this.values = this.getValues()
    return this.values
  }

  // set currently cached values
  private set values(values: Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values>) {
    this._values = values
  }

  public async getColByName(name: string): Promise<number> {
    const dataRange = await this.dataRange
    const headers = dataRange.getValues().shift() as RosterMechanics.GoogleApps.Sheet.Spreadsheet.Headers
    return headers.indexOf(name)
  }

  public async sortByColName(name: string): Promise<void> {
    const dataRange = await this.dataRange
    if (dataRange.getNumRows() > 1) {
      await this.sheet
        .then(async (s) => {
          const range = s.getRange(2, 1, s.getLastRow() - 1, s.getLastColumn())
          return { colNumber: await this.getColByName(name), range }
        })
        .then(({ colNumber, range }: { colNumber: number; range: GoogleAppsScript.Spreadsheet.Range }) => {
          return range.sort({ column: colNumber + 1, ascending: true })
        })
        .catch((err) => {
          console.log('GoogleSheet sortByColName ERROR', err)
        })
    }
  }

  // get sheet
  public async getSheet(): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Sheet> {
    return await this.sheet
  }

  // get values from sheet
  public async getValues(): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values> {
    const dataRange = await this.dataRange
    return await new Promise((resolve) => {
      const values = dataRange.getValues() as Array<Array<string | number>>
      // this.values = Promise.resolve(values)
      resolve(values)
    })
  }

  // write current (or new) values to sheet
  public async setValues(values?: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values): Promise<void> {
    if (values != null) {
      this.values = Promise.resolve(values)
      await this.replaceValues(values)
      // await this.replaceValuesIndividually(values)
      SpreadsheetApp.flush()
    }
  }

  private async replaceValuesIndividually(values: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values): Promise<void> {
    if (values.length > 0 && values[0].length > 0) {
      const dataRange = await this.dataRange
      dataRange.clear()
      await this.sheet
        .then((s) => {
          values.forEach((row, i) => {
            const range = s.getRange(i + 1, 1, 1, row.length)
            range.setValues([row])
          })
          SpreadsheetApp.flush()
          return true
        })
        .catch((err) => {
          console.log('GoogleSheet replaceValues ERROR', err)
        })
      await this.formatSheet()
    }
  }

  private async replaceValues(values: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values): Promise<void> {
    if (values.length > 0 && values[0].length > 0) {
      const dataRange = await this.dataRange
      await this.sheet
        .then(async (s) => {
          dataRange.clear()
          const range = s.getRange(1, 1, values.length, values[0].length)
          range.setValues(values)
          await this.formatSheet()
          return true
        })
        .catch((err) => {
          console.log('GoogleSheet replaceValues ERROR', err)
        })
    }
  }

  private async formatSheet(): Promise<void> {
    await this.boldAlignFreezeHeader()
    await this.formatDateColumns()
  }

  private async boldAlignFreezeHeader(): Promise<void> {
    const dataRange = await this.dataRange
    await this.sheet
      .then((s) => {
        s.setFrozenRows(1)
        const rows = dataRange.offset(0, 0, 1).getValues()[0]
        for (let i = 1; i <= rows.length; i += 1) {
          s.getRange(1, i).setFontWeight('bold')
          s.getRange(1, i).setHorizontalAlignment('left')
        }
        return true
      })
      .catch((err) => {
        console.log('GoogleSheet boldAlignFreezeHeader ERROR', err)
      })
  }

  private async formatDateColumns(): Promise<void> {
    const dateRanges = ['D:D', 'L:L', 'N:N', 'Q:Q', 'AA:AA', 'AC:AC', 'AK:AK']
    await this.sheet
      .then((s) => {
        const dateRangesLength = dateRanges.length
        for (let i = 0; i < dateRangesLength; i += 1) {
          s.getRange(dateRanges[i]).setNumberFormat('M/d/yyyy')
        }
        return true
      })
      .catch((err) => {
        console.log('GoogleSheet formatDateColumns ERROR', err)
      })
  }
}
