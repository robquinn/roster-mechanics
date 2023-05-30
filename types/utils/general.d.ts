declare namespace RosterMechanics {
  namespace Utils {
    namespace General {
      namespace Fn {
        type IsProd = () => Promise<boolean>
        type ExponentialBackoffSync = <T extends (...args: unknown[]) => ReturnType<T>>({
          action,
          tryNumber = 1,
          maxNumTries = 10,
          name = 'default',
        }: {
          action: T
          tryNumber?: number
          maxNumTries: number
          name: string
        }) => ReturnType<T>
        type ExponentialBackoffAsync = <T extends (...args: unknown[]) => Promise<unknown>>({
          action,
          tryNumber = 1,
          maxNumTries = 10,
          name = 'default',
        }: {
          action: T
          tryNumber?: number
          maxNumTries: number
          name: string
        }) => Promise<unknown>
        type ObjectsAreEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => Promise<boolean>
        type GetActualOffice = (office: Offices.Office) => Promise<Offices.Office>
        type MakeQueryParams = (params: Record<string, unknown>) => Promise<string>
      }

      namespace Offices {
        type Office = LyonsDen | Actual

        type LyonsDen =
          | "Lyon's Den - DM"
          | "Lyon's Den - CT"
          | "Lyon's Den - CF"
          | "Lyon's Den - SEV"
          | "Lyon's Den - FLG"
          | "Lyon's Den - PP"
          | "Lyon's Den - PR"
          | "Lyon's Den - WV"
          | "Lyon's Den - FH"
          | "Lyon's Den - TUB"
          | "Lyon's Den - TUC"
          | "Lyon's Den - SED"

        type Actual =
          | 'Carefree'
          | 'Desert Mountain'
          | 'Flagstaff'
          | 'Market Street'
          | 'Pinnacle Peak'
          | 'Prescott'
          | 'Sedona'
          | 'Southeast Valley'
          | 'Tubac'
          | 'Tucson'
          | 'Camelback Tower'
          | 'West Valley'
          | 'Fountain Hills'
          | 'Relocation'
          | 'Corporate'
          | 'Humphreys'
      }
    }
  }
}
