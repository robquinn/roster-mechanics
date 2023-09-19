import getActualOffice from '../../utils/general/get-actual-office'
import ifEmptyThenNull from '../../utils/format/if-empty-then-null'
import ninjaIn from '../../utils/format/ninja-in'

type IGoogleUser = RosterMechanics.GoogleApps.Admin.IGoogleUser

export default class GoogleUser implements IGoogleUser {
  private readonly formResponseObject: RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject
  private user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = {}
  private readonly agentActionFormPDF: string[]

  constructor(formResponseObject: RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    this.formResponseObject = formResponseObject
    this.agentActionFormPDF = formResponseObject?.agentActionFormPDF ?? null
  }

  public async init(): Promise<void> {
    const currentTimestamp = new Date(Date.now()).toString()

    const { editResponseUrl } = this.formResponseObject
    const hireDate = await ifEmptyThenNull(this.formResponseObject.hireDate)
    const dateLicensed = await ifEmptyThenNull(this.formResponseObject.dateLicensed)
    const licenseExpirationDate = await ifEmptyThenNull(this.formResponseObject.licenseExpirationDate)
    const ninjaAudit = await ifEmptyThenNull(this.formResponseObject.ninjaAudit)
    const dateFeesToStart = await ifEmptyThenNull(this.formResponseObject.dateFeesToStart)
    const preferredName = await ifEmptyThenNull(this.formResponseObject.preferredName)
    const office = await ifEmptyThenNull(this.formResponseObject.office)
    const role = (await ifEmptyThenNull(this.formResponseObject.role.toString()))?.split(',').join(', ') ?? null
    const phone = await ifEmptyThenNull(this.formResponseObject.phone)
    const licenseNumber = await ifEmptyThenNull(this.formResponseObject.licenseNumber)
    const adreLink = await ifEmptyThenNull(this.formResponseObject.adreLink)
    const ninja = (await ifEmptyThenNull(await ninjaIn(this.formResponseObject.ninja))) ?? 'NOT_NINJA'
    const loneWolfNumber = await ifEmptyThenNull(this.formResponseObject.loneWolfNumber)
    const pcOrPllc = (await ifEmptyThenNull(this.formResponseObject.pcOrPllc)) === 'Yes'
    const board = await ifEmptyThenNull(this.formResponseObject.board)
    const mlsId = await ifEmptyThenNull(this.formResponseObject.mlsId)
    const board2 = await ifEmptyThenNull(this.formResponseObject.board2)
    const mlsId2 = await ifEmptyThenNull(this.formResponseObject.mlsId2)
    const board3 = await ifEmptyThenNull(this.formResponseObject.board3)
    const mlsId3 = await ifEmptyThenNull(this.formResponseObject.mlsId3)
    const reHire = (await ifEmptyThenNull(this.formResponseObject.reHire)) === 'Yes'
    const recruitedFrom = await ifEmptyThenNull(this.formResponseObject.recruitedFrom)
    const showOnRoster = (await ifEmptyThenNull(this.formResponseObject.showOnRoster)) === 'Yes'
    const exists = true
    const statusType = await ifEmptyThenNull(this.formResponseObject.statusType)
    const specialStatus = statusType != null
    const charge395 = (await ifEmptyThenNull(this.formResponseObject.charge395)) === 'Yes'
    const monthlyFees = await ifEmptyThenNull(this.formResponseObject.monthlyFees)
    const notes = await ifEmptyThenNull(this.formResponseObject.notes)

    const reHireLastDateWithRlsir = null
    const severDate = null
    const inactiveReason = null
    const newBrokerage = null
    const hireFee = null

    const user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = {
      primaryEmail: this.formResponseObject.email,
      name: {
        givenName: this.formResponseObject.firstName,
        familyName: this.formResponseObject.lastName,
      },
      password: process.env.GOOGLE_ADMIN_DEFAULT_ACCOUNT_PASSWORD,
      changePasswordAtNextLogin: true,
      customSchemas: {
        Roster: {
          Created_At: currentTimestamp,
          Updated_At: currentTimestamp,
          Edit_Response_URL: editResponseUrl,
          Hire_Date: hireDate,
          Date_Licensed: dateLicensed,
          License_Expiration_Date: licenseExpirationDate,
          Ninja_Audit: ninjaAudit,
          'Re-Hire_Last_Date_with_RLSIR': reHireLastDateWithRlsir,
          Date_Fees_to_Start: dateFeesToStart,
          Preferred_Name: preferredName,
          Office: office,
          Role: role,
          Phone: phone,
          License_Number: licenseNumber,
          ADRE_Link: adreLink,
          Ninja: ninja,
          Lone_Wolf_Number: loneWolfNumber,
          PC_or_PLLC: pcOrPllc,
          Board: board,
          MLS_ID: mlsId,
          Board_2: board2,
          MLS_ID_2: mlsId2,
          Board_3: board3,
          MLS_ID_3: mlsId3,
          'Re-Hire': reHire,
          Recruited_From: recruitedFrom,
          Show_on_Roster: showOnRoster,
          Exists: exists,
          Special_Status: specialStatus,
          Status_Type: statusType,
          Charge_395: charge395,
          Monthly_Fees: monthlyFees,
          Notes: notes,
          Sever_Date: severDate,
          Inactive_Reason: inactiveReason,
          New_Brokerage: newBrokerage,
          Hire_Fee: hireFee,
        },
      },
      // ---- part from derek's script START ---- //
      phones: [
        {
          value: this.formResponseObject.phone,
          primary: true,
          type: 'mobile',
        },
      ],
      organizations: [
        {
          primary: true,
          name: this.formResponseObject.office,
          customType: 'other',
        },
      ],
      locations: [
        {
          type: 'desk',
          area: await getActualOffice(this.formResponseObject.office as RosterMechanics.Utils.General.Offices.Office),
          buildingId: this.formResponseObject.office,
        },
      ],
      // ---- part from derek's script END ---- //
    }

    this.user = user
  }

  public getAgentActionPDF(): string[] {
    return this.agentActionFormPDF
  }

  public getUser(): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser {
    return this.user
  }
}
