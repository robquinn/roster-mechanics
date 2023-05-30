declare namespace RosterMechanics {
  namespace GoogleApps {
    namespace Admin {
      namespace Fn {
        type GetByEmail = (email: string) => Promise<Schema.GoogleUser>
        type GetByQuery = (query: string) => Promise<GoogleAppsScript.AdminDirectory.Schema.User[]>
        type InsertUserAsMember = ({ user, groupEmail }: { user: Schema.GoogleUser; groupEmail: string }) => {
          data: GoogleAppsScript.AdminDirectory.Schema.Member | null
          error: unknown | null
        }
        type InsertUser = (user: Schema.GoogleUser) => Promise<Schema.GoogleUser>
        type ListAllUsersEmails = () => Promise<string[]>
        type ListAllUsers = (args?: { office: string | undefined }) => Promise<Schema.GoogleUser[]>
        type ListNotSuspended = () => Promise<Schema.GoogleUser[]>
        type ListPseudo = () => Promise<Schema.GoogleUser[]>
        type ListSuspended = () => Promise<Schema.GoogleUser[]>
        type QueryGoogleAdminDirectory = (requestParams: Request.Params.List) => Promise<Schema.GoogleUser[]>
        type RemoveUser = (user: Schema.GoogleUser) => void
        type UpdateUserGroups = ({
          oldUserData,
          newUserData,
        }: {
          oldUserData: Schema.GoogleUser
          newUserData: Schema.GoogleUser
        }) => Promise<void>
        type UpdateUser = ({
          oldUser,
          newUser,
        }: {
          oldUser: Schema.GoogleUser
          newUser: Schema.GoogleUser
        }) => Promise<Schema.GoogleUser>
        type UpsertUser = (googleUser: IGoogleUser) => Promise<{
          user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
          action: RosterMechanics.Utils.Cache.CacheAction
        }>
        type SuspendOrUnsuspendUser = (
          latestResponse: RosterMechanics.GoogleApps.Form.FormResponseSuspendObject,
        ) => Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser>
        type DeleteOrUndeleteUser = (
          latestResponse: RosterMechanics.GoogleApps.Form.FormResponseDeleteObject,
        ) => Promise<{
          user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser | null
          action: RosterMechanics.Utils.Cache.CacheAction | 'void'
        }>
      }

      interface IGoogleUser {
        init: () => Promise<void>
        getUser: () => Schema.GoogleUser
        getAgentActionPDF: () => string[]
      }

      namespace Request {
        namespace Params {
          namespace Helpers {
            type ViewType = 'admin_view' | 'domain_public'

            type Projection = 'basic' | 'custom' | 'full'
          }

          interface Get {
            customFieldMask: string
            projection: Helpers.Projection
            viewType: Helpers.ViewType
          }
          interface List {
            /** A comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom. */
            customFieldMask?: 'Roster' | string
            /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of domain. You can also use the my_customer alias to represent your account's customerId. The customerId is also returned as part of the Users resource. You must provide either the customer or the domain parameter. */
            customer?: string
            /** The domain name. Use this field to get groups from only one domain. To return all domains for a customer account, use the customer query parameter instead. Either the customer or the domain parameter must be provided. */
            domain?: 'russlyon.com' | string
            /** Event on which subscription is intended (if subscribing) */
            event?: 'ADD' | 'DELETE' | 'MAKE_ADMIN' | 'UNDELETE' | 'UPDATE'
            /** Maximum number of results to return. */
            maxResults?: number
            /** Property to use for sorting results. */
            orderBy?: 'email' | 'familyName' | 'givenName'
            /** Token to specify next page in the list */
            pageToken?: string
            /** What subset of fields to fetch for this user. */
            projection: Request.Params.Helpers.Projection
            /** Query string for searching user fields. For more information on constructing user queries, see Search for Users. */
            query?: string
            /** If set to true, retrieves the list of deleted users. (Default: false) */
            showDeleted?: boolean
            /** Whether to return results in ascending or descending order, ignoring case. */
            sortOrder?: 'ASCENDING' | 'DESCENDING'
            /** Whether to fetch the administrator-only or domain-wide public view of the user. For more information, see Retrieve a user as a non-administrator. */
            viewType?: Request.Params.Helpers.ViewType
            isSuspended?: boolean
          }
        }
      }

      namespace Response {
        namespace Body {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface Get extends GoogleAppsScript.AdminDirectory.Schema.User {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface List extends GoogleAppsScript.AdminDirectory.Schema.Users {}
        }
      }

      namespace Schema {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        interface GoogleUser extends GoogleAppsScript.AdminDirectory.Schema.User {
          customSchemas?: ICustomSchema
          recoveryPhone?: string
          recoveryEmail?: string
        }

        interface ICustomSchema {
          Roster: {
            Created_At: string
            Updated_At: string
            Edit_Response_URL: string
            Hire_Date: string | null
            Date_Licensed: string | null
            License_Expiration_Date: string | null
            Ninja_Audit: string | null

            'Re-Hire_Last_Date_with_RLSIR': string | null

            Date_Fees_to_Start: string | null
            Preferred_Name: string | null
            Office: string | null
            Role: string | null
            Phone: string | null
            License_Number: string | null
            ADRE_Link: string | null
            Ninja: string | 'NOT_NINJA'
            Lone_Wolf_Number: string | null
            PC_or_PLLC: boolean | null // boolean
            Board: string | null
            MLS_ID: string | null
            Board_2: string | null
            MLS_ID_2: string | null
            Board_3: string | null
            MLS_ID_3: string | null
            'Re-Hire': boolean | null // boolean
            Recruited_From: string | null
            Show_on_Roster: boolean | null // boolean
            Exists: boolean | null // boolean
            Status_Type: string | null
            Charge_395: boolean | null // boolean
            Monthly_Fees: string | null
            Notes: string | null
            // ------------------------------ new
            Sever_Date: string | null
            Inactive_Reason: string | null
            New_Brokerage: string | null
            Special_Status: boolean | null
            Hire_Fee: string | null
          }
        }
      }
      interface IPromiseStatusAndUser {
        status: 'SUCCESS' | 'ERROR'
        user?: Schema.GoogleUser
      }

      type YesOrNo = 'Yes' | 'No'
      type YesOrNoOrNA = 'Yes' | 'No' | 'N/A'
      type Ninja = 'Ninja' | '' | `${number}/${number}/${number}`
    }
  }
}
