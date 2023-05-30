import adminSheetHeaders from './admin-sheet-headers'
import generalSheetHeaders from './general-sheet-headers'
import sheetRowAdmin from './sheet-row-admin'
import sheetRowGeneral from './sheet-row-general'

type IRoster = RosterMechanics.GoogleApps.Sheet.IRoster

export default class Roster implements IRoster {
  private _users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
  private _sheets: RosterMechanics.GoogleApps.Sheet.Roster.Sheets.ITypes

  constructor(users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]) {
    this._users = users
    this._sheets = {
      adminSheet: 'admin',
      generalSheet: 'general',
      suspensionSheet: 'suspension',
      pseudoSheet: 'pseudo',
    }
  }

  private get sheets(): RosterMechanics.GoogleApps.Sheet.Roster.Sheets.ITypes {
    return this._sheets
  }

  private set sheets(sheets: RosterMechanics.GoogleApps.Sheet.Roster.Sheets.ITypes) {
    this._sheets = sheets
  }

  private get users(): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] {
    return this._users
  }

  private set users(users) {
    this._users = users
  }

  static async makeGeneralSheetRow(
    user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
  ): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row> {
    return await sheetRowGeneral(user)
  }

  static async makeAdminSheetRow(
    user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
  ): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row> {
    return await sheetRowAdmin(user)
  }

  public async getSheet(
    type: RosterMechanics.GoogleApps.Sheet.Roster.Sheets.Types,
  ): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Values> {
    const headers = this.getHeaders(type)
    const roster = []
    roster.push(headers)
    this.users.forEach((user) => {
      let row: Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Row>
      if (type === this.sheets.adminSheet || type === this.sheets.suspensionSheet || type === this.sheets.pseudoSheet)
        row = Roster.makeAdminSheetRow(user)
      else row = Roster.makeGeneralSheetRow(user)
      roster.push(row)
    })
    return await Promise.all(roster)
  }

  private async getHeaders(
    type?: RosterMechanics.GoogleApps.Sheet.Roster.Sheets.Types,
  ): Promise<RosterMechanics.GoogleApps.Sheet.Spreadsheet.Headers> {
    const adminHeaders = await adminSheetHeaders()
    const generalHeaders = await generalSheetHeaders()
    return await new Promise((resolve, _reject) => {
      let headers
      switch (type) {
        case this.sheets.adminSheet:
          headers = adminHeaders
          break
        case this.sheets.generalSheet:
          headers = generalHeaders
          break
        case this.sheets.suspensionSheet:
          headers = adminHeaders
          break
        case this.sheets.pseudoSheet:
          headers = adminHeaders
          break
        default:
          headers = generalHeaders
          break
      }
      resolve(headers)
    })
  }
}
