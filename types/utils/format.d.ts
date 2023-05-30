declare namespace RosterMechanics {
  namespace Utils {
    namespace Format {
      namespace Fn {
        type CapitalizeFirstChar = (name: string) => Promise<string>
        type GetNumberEnding = (n: number) => string
        type IfEmptyThenNull = (value: string) => Promise<string | null>
        type IfNullThenEmptyElseValue = (value: string | boolean | null | undefined) => Promise<string>
        type LicenseNumberHTML = ({ number, link }: { number: string; link: string }) => Promise<string>
        type LicenseNumber = ({ number, link }: { number: string | null; link: string | null }) => Promise<string>
        type NinjaIn = (stringNinja: string) => Promise<string>
        type NinjaOut = (stringNinja: string) => Promise<string>
        type SortAlphabetically = ({
          array,
          firstNameCol,
          lastNameCol,
        }: {
          array: string[][]
          firstNameCol: number
          lastNameCol: number
        }) => Promise<string[][]>
      }
    }
  }
}
