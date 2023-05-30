declare namespace RosterMechanics {
  namespace Test {
    namespace Utilities {
      interface IUtilities {
        sleep: (milliseconds: number) => void
        formatDate: (date: Date, timeZone: string, format: string) => string
        formatString: (template: string, ...args: Array<string | number | object>) => string
      }
    }
  }
}
