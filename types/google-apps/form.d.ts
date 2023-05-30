declare namespace RosterMechanics {
  namespace GoogleApps {
    namespace Form {
      namespace Fn {
        type DeleteFormResponse = ({ email, formId }: { email: string; formId: string }) => Promise<void>
      }
      interface IGoogleFormBase {
        // formResponse: GoogleAppsScript.Forms.FormResponse | undefined
        // formId: string
        // type: RosterMechanics.GoogleApps.Form.FormTypes.Types

        getLatestResponseObject: <T extends FormTypes.Types>() => Promise<Utils.FormResponseObject<T>>
        // responseToObject: () => Promise<Utils.FormResponseObject<FormTypes.Types>>
        // getLastestResponse: () => Promise<GoogleAppsScript.Forms.FormResponse>
        // makeFromArray: () => Promise<Utils.FormResponse<FormTypes.Types>>
        // addMetadata: (
        //   object: Utils.FormResponse<FormTypes.Types>,
        // ) => Promise<Utils.FormResponseExtended<FormTypes.Types>>
      }

      interface IGoogleFormHireUpdate extends IGoogleFormBase {}
      interface IGoogleFormSuspend extends IGoogleFormBase {}
      interface IGoogleFormDelete extends IGoogleFormBase {}

      namespace FormTypes {
        type HireUpdate = 'hireUpdate'
        type Suspend = 'suspend'
        type Delete = 'delete'
        type Types = HireUpdate | Suspend | Delete
      }

      namespace Utils {
        type FormResponse<T> = T extends FormTypes.HireUpdate
          ? FormResponseHireUpdate
          : T extends FormTypes.Suspend
          ? FormResponseSuspend
          : T extends FormTypes.Delete
          ? FormResponseDelete
          : never

        type FormResponseExtended<T> = T extends FormTypes.HireUpdate
          ? FormResponseHireUpdateExtended
          : T extends FormTypes.Suspend
          ? FormResponseSuspendExtended
          : T extends FormTypes.Delete
          ? FormResponseDeleteExtended
          : never

        type FormResponseObject<T> = T extends FormTypes.HireUpdate
          ? FormResponseHireUpdateObject
          : T extends FormTypes.Suspend
          ? FormResponseSuspendObject
          : T extends FormTypes.Delete
          ? FormResponseDeleteObject
          : never

        type ObjectPrototypeOf<T> = T extends FormTypes.HireUpdate
          ? { constructor: Constructor<T> }
          : T extends FormTypes.Suspend
          ? { constructor: Constructor<T> }
          : T extends FormTypes.Delete
          ? { constructor: Constructor<T> }
          : never

        type Constructor<T> = T extends FormTypes.HireUpdate
          ? { toCamelCase: (objWithMetadata: FormResponseHireUpdateExtended) => Promise<FormResponseHireUpdateObject> }
          : T extends FormTypes.Suspend
          ? { toCamelCase: (objWithMetadata: FormResponseSuspendExtended) => Promise<FormResponseSuspendObject> }
          : T extends FormTypes.Delete
          ? { toCamelCase: (objWithMetadata: FormResponseDeleteExtended) => Promise<FormResponseDeleteObject> }
          : never

        // ----------------------
      }

      namespace Utils {
        type Suspend = 'Suspend' | 'Unsuspend'
        type Delete = 'Delete' | 'Undelete'
      }

      interface FormResponseHireUpdateObject {
        id: string
        timestamp: string
        editResponseUrl: string

        hireDate: string
        firstName: string
        lastName: string
        email: string
        preferredName: string
        office: string
        role: string[]
        phone: string
        dateLicensed: string
        licenseNumber: string
        adreLink: string
        licenseExpirationDate: string
        ninja: string
        ninjaAudit: string
        loneWolfNumber: string
        pcOrPllc: Base.YesOrNo
        board: string
        mlsId: string
        board2: string
        mlsId2: string
        board3: string
        mlsId3: string
        reHire: Base.YesOrNo
        reHireLastDateWithRlsir: string
        recruitedFrom: string
        showOnRoster: Base.YesOrNo
        statusType: string
        charge395: Base.YesOrNo
        monthlyFees: string
        dateFeesToStart: string
        notes: string
        agentActionFormPDF: string[]
      }

      interface FormResponseSuspendObject {
        id: string
        timestamp: string
        editResponseUrl: string

        email: string
        suspend: Utils.Suspend
        severDate: string
        inactiveReason: string
        newBrokerage: string
      }

      interface FormResponseDeleteObject {
        id: string
        timestamp: string
        editResponseUrl: string

        email: string
        delete: Utils.Delete
      }

      interface FormResponseHireUpdateExtended extends FormResponseHireUpdate {
        ID: string
        Timestamp: string
        ['Edit Response URL']: string
      }

      interface FormResponseSuspendExtended extends FormResponseSuspend {
        ID: string
        Timestamp: string
        ['Edit Response URL']: string
      }

      interface FormResponseDeleteExtended extends FormResponseDelete {
        ID: string
        Timestamp: string
        ['Edit Response URL']: string
      }

      interface FormResponseHireUpdate {
        ['Hire Date']: string
        ['First Name']: string
        ['Preferred Name']: string
        ['Last Name']: string
        ['Email']: string
        ['Role']: string[]
        ['Office']: string
        ['Critical New Hire Form']: string[]
        ['Phone']: string
        ['License Number']: string
        ['ADRE Link']: string
        ['Date Licensed']: string
        ['License Expiration Date']: string
        ['Board']: string
        ['MLS ID']: string
        ['Board 2']: string
        ['MLS ID 2']: string
        ['Board 3']: string
        ['MLS ID 3']: string
        ['Ninja']: string
        ['Ninja Audit']: string
        ['Lone Wolf Number']: string
        ['PC or PLLC']: Base.YesOrNo
        ['Re-Hire']: Base.YesOrNo
        ['Re-Hire Last Date with RLSIR']: string
        ['Recruited From']: string
        ['Status Type']: string
        ['Charge $395']: Base.YesOrNo
        ['Monthly Fees']: string
        ['Date Fees to Start']: string
        ['Notes']: string
        ['Show on Roster']: Base.YesOrNo
      }

      interface FormResponseSuspend {
        ['Email']: string
        ['Suspend']: Utils.Suspend
        ['Sever Date']: string
        ['Inactive Reason']: string
        ['New Brokerage']: string
      }

      interface FormResponseDelete {
        ['Email']: string
        ['Delete']: Utils.Delete
      }
    }
  }
}
