import { beforeAll, describe, expect, it } from '@jest/globals'
import ifEmptyThenNull from '../../../../../src/libs/utils/format/if-empty-then-null'
import { formResponseObject1 } from '../../../../samples/form-responses'
import GoogleUser from '../../../../../src/libs/google-apps/admin/google-user'

let formResponseObject: RosterMechanics.GoogleApps.Form.FormResponseHireUpdateObject
let googleUser: RosterMechanics.GoogleApps.Admin.IGoogleUser

beforeAll(async () => {
  formResponseObject = formResponseObject1()
  googleUser = new GoogleUser(formResponseObject)
  await googleUser.init()
})

describe('GoogleUser', () => {
  it('should return Google User and all fields should be correct', async () => {
    expect(googleUser).toBeInstanceOf(GoogleUser)
    expect(googleUser.getUser().customSchemas?.Roster.ADRE_Link).toBe(
      await ifEmptyThenNull(formResponseObject.adreLink),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Board).toBe(await ifEmptyThenNull(formResponseObject.board))
    expect(googleUser.getUser().customSchemas?.Roster.Board_2).toBe(await ifEmptyThenNull(formResponseObject.board2))
    expect(googleUser.getUser().customSchemas?.Roster.Board_3).toBe(await ifEmptyThenNull(formResponseObject.board3))
    expect(googleUser.getUser().customSchemas?.Roster.Charge_395).toBe(
      (await ifEmptyThenNull(formResponseObject.charge395)) === 'Yes',
    )
    // expect(googleUser.getUser().customSchemas?.Roster.Created_At).toBe(new Date(Date.now()).toString())
    expect(googleUser.getUser().customSchemas?.Roster.Date_Fees_to_Start).toBe(
      await ifEmptyThenNull(formResponseObject.dateFeesToStart),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Date_Licensed).toBe(
      await ifEmptyThenNull(formResponseObject.dateLicensed),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Edit_Response_URL).toBe(
      await ifEmptyThenNull(formResponseObject.editResponseUrl),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Exists).toBe(true)
    expect(googleUser.getUser().customSchemas?.Roster.Hire_Date).toBe(
      await ifEmptyThenNull(formResponseObject.hireDate),
    )
    expect(googleUser.getUser().customSchemas?.Roster.License_Expiration_Date).toBe(
      await ifEmptyThenNull(formResponseObject.licenseExpirationDate),
    )
    expect(googleUser.getUser().customSchemas?.Roster.License_Number).toBe(
      await ifEmptyThenNull(formResponseObject.licenseNumber),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Lone_Wolf_Number).toBe(
      await ifEmptyThenNull(formResponseObject.loneWolfNumber),
    )
    expect(googleUser.getUser().customSchemas?.Roster.MLS_ID).toBe(await ifEmptyThenNull(formResponseObject.mlsId))
    expect(googleUser.getUser().customSchemas?.Roster.MLS_ID_2).toBe(await ifEmptyThenNull(formResponseObject.mlsId2))
    expect(googleUser.getUser().customSchemas?.Roster.MLS_ID_3).toBe(await ifEmptyThenNull(formResponseObject.mlsId3))
    expect(googleUser.getUser().customSchemas?.Roster.Monthly_Fees).toBe(
      await ifEmptyThenNull(formResponseObject.monthlyFees),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Ninja).toBe(
      (await ifEmptyThenNull(formResponseObject.ninja)) ?? 'NOT_NINJA',
    )
    expect(googleUser.getUser().customSchemas?.Roster.Ninja_Audit).toBe(
      await ifEmptyThenNull(formResponseObject.ninjaAudit),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Notes).toBe(await ifEmptyThenNull(formResponseObject.notes))
    expect(googleUser.getUser().customSchemas?.Roster.Office).toBe(await ifEmptyThenNull(formResponseObject.office))
    expect(googleUser.getUser().customSchemas?.Roster.PC_or_PLLC).toBe(
      (await ifEmptyThenNull(formResponseObject.pcOrPllc)) === 'Yes',
    )
    expect(googleUser.getUser().customSchemas?.Roster.Phone).toBe(await ifEmptyThenNull(formResponseObject.phone))
    expect(googleUser.getUser().customSchemas?.Roster['Re-Hire']).toBe(
      (await ifEmptyThenNull(formResponseObject.reHire)) === 'Yes',
    )
    expect(googleUser.getUser().customSchemas?.Roster.Recruited_From).toBe(
      await ifEmptyThenNull(formResponseObject.recruitedFrom),
    )
    expect(googleUser.getUser().customSchemas?.Roster.Role).toBe(
      (await ifEmptyThenNull(formResponseObject.role.toString()))?.split(',').join(', ') ?? null,
    )
    expect(googleUser.getUser().customSchemas?.Roster.Show_on_Roster).toBe(
      (await ifEmptyThenNull(formResponseObject.showOnRoster)) === 'Yes',
    )
    expect(googleUser.getUser().customSchemas?.Roster.Status_Type).toBe(
      await ifEmptyThenNull(formResponseObject.statusType),
    )
    // expect(googleUser.getUser().customSchemas?.Roster.Updated_At).toBe(new Date(Date.now()).toString())
  })
  it('should return Google User and all fields should be correct', () => {
    expect(googleUser.getAgentActionPDF()).toBe(formResponseObject.agentActionFormPDF)
  })
})
