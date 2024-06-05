import GoogleFormBase from './google-form-base'

type IGoogleFormHireUpdate = RosterMechanics.GoogleApps.Form.IGoogleFormHireUpdate

// type FormResponseHireUpdateObject = RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject

// type FormResponseHireUpdateExtended = RosterMechanics.GoogleApps.Form.FormResponseHireUpdateExtended

type HireUpdate = RosterMechanics.GoogleApps.Form.FormTypes.HireUpdate

export default class GoogleFormHireUpdate extends GoogleFormBase implements IGoogleFormHireUpdate {
  constructor(formId: string) {
    super(formId, 'hireUpdate')
  }

  static async toCamelCase(
    objWithMetadata: RosterMechanics.GoogleApps.Form.Utils.FormResponseExtended<HireUpdate>,
  ): Promise<RosterMechanics.GoogleApps.Form.Utils.FormResponseObject<HireUpdate>> {
    return await new Promise((resolve) => {
      resolve({
        id: objWithMetadata.ID,
        timestamp: objWithMetadata.Timestamp,
        editResponseUrl: objWithMetadata['Edit Response URL'],

        hireDate: objWithMetadata['Hire Date'],
        firstName: objWithMetadata['First Name'],
        preferredName: objWithMetadata['Preferred Name'],
        lastName: objWithMetadata['Last Name'],
        email: objWithMetadata.Email,
        role: objWithMetadata.Role,
        office: objWithMetadata.Office,
        phone: objWithMetadata.Phone,
        licenseNumber: objWithMetadata['License Number'],
        adreLink: objWithMetadata['ADRE Link'],
        dateLicensed: objWithMetadata['Date Licensed'],
        licenseExpirationDate: objWithMetadata['License Expiration Date'],
        board: objWithMetadata.Board,
        mlsId: objWithMetadata['MLS ID'],
        board2: objWithMetadata['Board 2'],
        mlsId2: objWithMetadata['MLS ID 2'],
        board3: objWithMetadata['Board 3'],
        mlsId3: objWithMetadata['MLS ID 3'],
        ninja: objWithMetadata.Ninja,
        ninjaAudit: objWithMetadata['Ninja Audit'],
        loneWolfNumber: objWithMetadata['Lone Wolf Number'],
        pcOrPllc: objWithMetadata['PC or PLLC'],
        reHire: objWithMetadata['Re-Hire'],
        reHireLastDateWithRlsir: objWithMetadata['Re-Hire Last Date with RLSIR'],
        recruitedFrom: objWithMetadata['Recruited From'],
        statusType: objWithMetadata['Status Type'],
        joiningTeam: objWithMetadata['Will This Agent Be Joining a Team?'],
        charge395: objWithMetadata['Charge $395'],
        monthlyFees: objWithMetadata['Monthly Fees'],
        dateFeesToStart: objWithMetadata['Date Fees to Start'],
        notes: objWithMetadata.Notes,
        agentActionFormPDF: objWithMetadata['Critical New Hire Form'],
        showOnRoster: objWithMetadata['Show on Roster'],
      })
    })
  }
}
