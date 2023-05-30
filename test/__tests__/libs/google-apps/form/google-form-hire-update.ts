import { describe, expect, it } from '@jest/globals'
import GoogleFormHireUpdate from '../../../../../src/libs/google-apps/form/google-form-hire-update'

describe('GoogleFormHireUpdate', () => {
  it('should process form response and contain all correct fields', async () => {
    const fakeFormId = 'asdUfu9l_Cjsxp7ic7345uUwmzytZ-2kHjeifqrYDibM'
    const googleForm = new GoogleFormHireUpdate(fakeFormId)
    const responseObject =
      await googleForm.getLatestResponseObject<RosterMechanics.GoogleApps.Form.FormTypes.HireUpdate>()

    const dateRegex = /\d{4}-\d{2}-\d{2}/
    const ninjaRegex = /(気\+{0,2})|(Ninja\+{1,2})|(Ninja)|([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})/
    const phoneRegex = /\d{3}-\d{3}-\d{4}/
    const yesOrNoArr = ['Yes', 'No']
    const stringType = 'string'

    expect(googleForm).toBeInstanceOf(GoogleFormHireUpdate)
    expect(typeof responseObject.adreLink).toBe(stringType)
    expect(Array.isArray(responseObject.agentActionFormPDF)).toBe(true)
    expect(typeof responseObject.adreLink).toBe(stringType)
    expect(typeof responseObject.board).toBe(stringType)
    expect(typeof responseObject.board2).toBe(stringType)
    expect(typeof responseObject.board3).toBe(stringType)
    expect(yesOrNoArr).toContain(responseObject.charge395)
    expect(responseObject.dateFeesToStart).toMatch(dateRegex)
    expect(responseObject.dateLicensed).toMatch(dateRegex)
    expect(typeof responseObject.editResponseUrl).toBe(stringType)
    expect(typeof responseObject.email).toBe(stringType)
    expect(typeof responseObject.firstName).toBe(stringType)
    expect(responseObject.hireDate).toMatch(dateRegex)
    expect(typeof responseObject.id).toBe(stringType)
    expect(typeof responseObject.lastName).toBe(stringType)
    expect(responseObject.licenseExpirationDate).toMatch(dateRegex)
    expect(typeof responseObject.licenseNumber).toBe(stringType)
    expect(typeof responseObject.loneWolfNumber).toBe(stringType)
    expect(typeof responseObject.mlsId).toBe(stringType)
    expect(typeof responseObject.mlsId2).toBe(stringType)
    expect(typeof responseObject.mlsId3).toBe(stringType)
    expect(typeof responseObject.monthlyFees).toBe(stringType)
    expect(responseObject.ninja).toMatch(ninjaRegex)
    expect(responseObject.ninjaAudit).toMatch(dateRegex)
    expect(typeof responseObject.notes).toBe(stringType)
    expect(typeof responseObject.office).toBe(stringType)
    expect(yesOrNoArr).toContain(responseObject.pcOrPllc)
    expect(responseObject.phone).toMatch(phoneRegex)
    expect(typeof responseObject.preferredName).toBe(stringType)
    expect(yesOrNoArr).toContain(responseObject.reHire)
    expect(typeof responseObject.recruitedFrom).toBe(stringType)
    expect(Array.isArray(responseObject.role)).toBe(true)
    expect(yesOrNoArr).toContain(responseObject.showOnRoster)
    expect(typeof responseObject.statusType).toBe(stringType)
    expect(typeof responseObject.timestamp).toBe(stringType)
  })
})
