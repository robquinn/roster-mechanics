declare namespace RosterMechanics {
  namespace Test {
    namespace Utils {
      namespace Var {
        type AdminUserFields = Array<keyof RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>
        type PublicUserFields = Array<keyof RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>
      }
      namespace Fn {
        type AdminDirectoryUserViews = ({
          user,
          customFieldMask,
        }: {
          user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
          customFieldMask: string | undefined
        }) => RosterMechanics.Test.Utils.AdminDirectoryViews.Views
        type PickObjKeys = <T extends object, K extends string>(
          obj: T,
          paths: K[],
        ) => PickObjKeys.PickByDotNotation<T, K>
        type GetUserAdminDirectoryView = ({
          customFieldMask,
          viewType,
          projection,
          user,
        }: {
          customFieldMask: string | undefined
          viewType: 'domain_public' | 'admin_view'
          projection: 'basic' | 'custom' | 'full'
          user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
        }) => RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
        type AdminDirectoryUserQuery = <T extends string>(
          q: T,
        ) => RosterMechanics.Test.Utils.AdminDirectoryQuery.Query<T>
        type OrderUsersByEmail = (
          users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
        ) => RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
        type OrderUsersByGivenName = (
          users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
        ) => RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
        type OrderUsersByFamilyName = (
          users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
        ) => RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]

        type getEmails = (adminUsers: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]) => Promise<string[]>
      }

      namespace AdminDirectoryViews {
        interface Views {
          basic: {
            domain_public: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
            admin_view: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
          }
          custom: {
            domain_public: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
            admin_view: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
          }
          full: {
            domain_public: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
            admin_view: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
          }
        }
      }
      namespace AdminDirectoryQuery {
        type Query<T extends string> = T extends `${infer Part1} ${infer Rest}`
          ? QueryPart<Part1> & Query<Rest>
          : T extends `${infer Part1}`
          ? QueryPart<Part1>
          : never

        type QueryPart<T extends string> =
          T extends `${infer Part1 extends string}.${infer Part2 extends string}=${infer Value}`
            ? { [key in Part1]: { [key2 in Part2]: CastQueryString<Value> } }
            : T extends `${infer Part1}=${infer Value}`
            ? { [key in Part1]: Value }
            : never

        type CastQueryString<T extends string> = T extends 'true' | 'false'
          ? boolean
          : T extends string
          ? string
          : never

        type QueryString = 'Roster.Exists=true Roster.Show_on_Roster=true orgUnitPath=/'

        interface QueryPossibilities {
          orgUnitPath?: string
          isSuspended?: boolean
          Roster: {
            Exists?: boolean
            Show_on_Roster?: boolean
            Office?: string
            Edit_Response_URL?: string
          }
        }

        type result = Query<QueryString>
      }
      namespace PickObjKeys {
        // type Dot<T extends string, U extends string> = '' extends U ? T : `${T}.${U}`
        // type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

        // type StopTypes = number | string | boolean | symbol

        // type DeepPaths<T> = T extends StopTypes
        //   ? ''
        //   : {
        //       [K in keyof T & string]: string extends K
        //         ? Dot<'string', DeepPaths<T[string]>>
        //         : K | Dot<K, DeepPaths<T[K]>>
        //     }[keyof T & string]

        // type Prettify<T> = T extends infer R
        //   ? {
        //       [K in keyof R]: R[K] extends Record<string, unknown> ? Prettify<R[K]> : R[K]
        //     }
        //   : never

        // type NestedPick<T, Paths extends Array<DeepPaths<T>>> = Prettify<
        //   UnionToIntersection<
        //     {
        //       [K in Paths[number]]: K extends keyof T
        //         ? K extends `${string}.${infer SubField}`
        //           ? string extends keyof T
        //             ? SubField extends DeepPaths<T[string]>
        //               ? Record<string, NestedPick<T[string], [SubField]>>
        //               : never
        //             : { [P in K]: T[K] }
        //           : { [P in K]: T[K] }
        //         : K extends `${infer Property}.${infer SubField}`
        //         ? Property extends keyof T
        //           ? SubField extends DeepPaths<T[Property]>
        //             ? {
        //                 [P in Property]: NestedPick<T[Property], [SubField]>
        //               }
        //             : never
        //           : never
        //         : never
        //     }[Paths[number]]
        //   >
        // >

        // interface Test {
        //   customer: {
        //     email: string
        //     id: string
        //     suspended: boolean
        //     twoFactor: boolean
        //   }
        // }

        type PickByDotNotation<T, K extends string> = {
          [P in keyof T as P extends (K extends `${infer K0}.${string}` ? K0 : K) ? P : never]: P extends K
            ? T[P]
            : PickByDotNotation<T[P], K extends `${Exclude<P, symbol>}.${infer R}` ? R : never>
          // eslint-disable-next-line @typescript-eslint/ban-types
        } & {} // <-- & {} just hints that the compiler should expand the result instead of leaving it expressed as PickByDotNotation<...>
      }
    }
  }
}
