declare namespace RosterMechanics {
  namespace GoogleApps {
    namespace Sheet {
      namespace Fn {
        type AdminSheetHeaders = () => Promise<string[]>
        type GeneralSheetHeaders = () => Promise<string[]>
        type SheetRowAdmin = (user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => Promise<Spreadsheet.Row>
        type SheetRowGeneral = (user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) => Promise<Spreadsheet.Row>
        type SpreadsheetWriter = ({
          roster,
          name,
          settings,
          firstNameCol,
          lastNameCol,
        }: {
          roster: IRoster
          name: Roster.Sheets.Types
          settings: RosterMechanics.Config.Google.Worksheet
          firstNameCol: number
          lastNameCol: number
        }) => Promise<void>
      }

      namespace Spreadsheet {
        type Sheet = GoogleAppsScript.Spreadsheet.Sheet
        type Values = Array<Array<string | number>>
        type Headers = string[]
        type Range = GoogleAppsScript.Spreadsheet.Range
        type Row = string[]
      }

      interface IGoogleSheet {
        getColByName: (name: string) => Promise<number>
        sortByColName: (name: string) => Promise<void>
        getSheet: () => Promise<Spreadsheet.Sheet>
        getValues: () => Promise<Spreadsheet.Values>
        setValues: (values?: Spreadsheet.Values) => Promise<void>
      }

      interface IRoster {
        getSheet: (type: Roster.Sheets.Types) => Promise<Spreadsheet.Values>
      }
      namespace Roster {
        namespace Sheets {
          type Admin = 'admin'
          type General = 'general'
          type Suspension = 'suspension'
          type Pseudo = 'pseudo'

          type Types = Admin | General | Suspension | Pseudo

          interface Headers {
            admin: Spreadsheet.Headers
            general: Spreadsheet.Headers
            suspension: Spreadsheet.Headers
            pseudo: Spreadsheet.Headers
          }

          interface ITypes {
            adminSheet: Admin
            generalSheet: General
            suspensionSheet: Suspension
            pseudoSheet: Pseudo
          }
        }
      }

      interface ISheetObject {
        writeData: (data: Object.Data) => Promise<void>
        readData: () => Promise<Object.Data>
      }
      namespace Object {
        type Data = Array<Record<string, string | number>>
      }
      namespace Writer {
        interface Sheet {
          roster: IRoster
          name: Roster.Sheets.Types
          settings: RosterMechanics.Config.Google.Worksheet
          firstNameCol: number
          lastNameCol: number
        }
      }
    }
  }
}
