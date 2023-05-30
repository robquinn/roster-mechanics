// create and manage an object from sheet values
type ISheetObject = RosterMechanics.GoogleApps.Sheet.ISheetObject

export default class SheetObject implements ISheetObject {
  private readonly _sheet: RosterMechanics.GoogleApps.Sheet.IGoogleSheet
  private _data: RosterMechanics.GoogleApps.Sheet.Object.Data | null
  private _values: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values | null
  private _headers: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Headers | null

  constructor(sheet: RosterMechanics.GoogleApps.Sheet.IGoogleSheet) {
    this._sheet = sheet
    this._data = null
    this._values = null
    this._headers = null
  }

  static async makeValues(
    data: RosterMechanics.GoogleApps.Sheet.Object.Data,
  ): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values> {
    return await new Promise((resolve) => {
      // derive the headers from the data
      const headers = Object.keys(
        data.reduce((acc, row) => {
          const obj = acc
          Object.keys(row).forEach((col) => {
            obj[col] = col
          })
          return obj
        }, {}),
      )
      // combine the headers and the values
      resolve([headers as Array<string | number>].concat(data.map((row) => headers.map((col) => row[col]))))
    })
  }

  static async makeData(values: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values): Promise<{
    data: RosterMechanics.GoogleApps.Sheet.Object.Data
    headers: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Headers
  }> {
    return await new Promise((resolve) => {
      const [headers, ...data] = values
      const dataAndHeaders = {
        data: data.map((row) =>
          headers.reduce((p: Record<string, string | number>, c, i) => {
            const obj = p
            obj[c.toString()] = row[i]
            return obj
          }, {}),
        ),
        headers: headers as string[],
      }
      resolve(dataAndHeaders)
    })
  }

  private set values(values) {
    this._values = values
  }

  private get values(): RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values | null {
    return this._values
  }

  private set headers(headers) {
    this._headers = headers
  }

  private get headers(): RosterMechanics.GoogleApps.Sheet.Spreadsheet.Headers | null {
    return this._headers
  }

  private set data(data) {
    this._data = data
  }

  private get data(): RosterMechanics.GoogleApps.Sheet.Object.Data | null {
    return this._data
  }

  private get sheet(): RosterMechanics.GoogleApps.Sheet.IGoogleSheet {
    return this._sheet
  }

  public async writeData(data: RosterMechanics.GoogleApps.Sheet.Object.Data): Promise<void> {
    // convert data to values and write to sheet
    await this.setValues(data)
    await this.writeValues(this.values as RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values)
  }

  public async readData(): Promise<RosterMechanics.GoogleApps.Sheet.Object.Data> {
    this.values = await this.sheet.getValues()
    await this.setData(this.values)
    return await Promise.resolve(this.data as RosterMechanics.GoogleApps.Sheet.Object.Data)
  }

  // convert data to values and store
  private async setValues(data: RosterMechanics.GoogleApps.Sheet.Object.Data): Promise<void> {
    this.values = await SheetObject.makeValues(data)
  }

  private async writeValues(values: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values): Promise<void> {
    await this.sheet.setValues(values)
  }

  // convert values to data and store
  private async setData(values: RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values): Promise<void> {
    const { headers, data } = await SheetObject.makeData(values)
    this.headers = headers
    this.data = data
  }
}
