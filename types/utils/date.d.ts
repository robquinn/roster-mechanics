declare namespace RosterMechanics {
  namespace Utils {
    namespace Date {
      namespace Fn {
        type CalculateYears = (sincedate: string | null) => Promise<string>
        type DateAnsiToIso = (stringDate: string) => Promise<string>
        type DateForBackup = () => Promise<string>
        type DateGoogle = (date: string) => Promise<string>
        type DateIsoToAnsi = (dategiven: string | null) => Promise<string>
        type Today = () => Promise<string>
      }
    }
  }
}
