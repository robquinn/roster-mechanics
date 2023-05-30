import { beforeAll, describe, expect, it } from '@jest/globals'
import * as SampleCompanyConfigUnAwaited from '../../../../src/config/company/sample-company'

let SampleCompanyConfig: Awaited<RosterMechanics.Config.Company.Sample>

beforeAll(async () => {
  SampleCompanyConfig = await SampleCompanyConfigUnAwaited.default
})
describe('SampleCompanyConfig', () => {
  it('should have property "accouting" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('accounting')
    expect(SampleCompanyConfig.accounting).toHaveProperty('folders')
    expect(SampleCompanyConfig.accounting.folders).toHaveProperty('agentActionFormPDF')
    expect(SampleCompanyConfig.accounting.folders.agentActionFormPDF).toHaveProperty('parentFolderId')
    expect(SampleCompanyConfig.accounting.folders.agentActionFormPDF.parentFolderId).toBe(
      process.env.GOOGLE_DRIVE_ACCOUNTING_AGENT_ACTION_FORM_PARENT_FOLDER_ID,
    )
  })
  it('should have property "accounting" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('accounting')
    expect(SampleCompanyConfig.accounting).toHaveProperty('drives')
    expect(SampleCompanyConfig.accounting.drives).toHaveProperty('shared')
    expect(SampleCompanyConfig.accounting.drives.shared).toHaveProperty('folderId')
    expect(SampleCompanyConfig.accounting.drives.shared.folderId).toBe(
      process.env.GOOGLE_DRIVE_ACCOUNTING_DRIVE_FOLDER_ID,
    )
  })
  it('should have property "calendars" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('calendars')
    expect(SampleCompanyConfig.calendars).toHaveProperty('company')
    expect(SampleCompanyConfig.calendars.company).toHaveProperty('calendarId')
    expect(SampleCompanyConfig.calendars.company.calendarId).toBe(process.env.GOOGLE_CALENDAR_COMPANY_ID)
    expect(SampleCompanyConfig.calendars.company).toHaveProperty('calendarName')
    expect(SampleCompanyConfig.calendars.company.calendarName).toBe(process.env.GOOGLE_CALDENAR_COMPANY_NAME)
  })
  it('should have property "newHire" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('newHire')
    expect(SampleCompanyConfig.newHire).toHaveProperty('emails')
    expect(Array.isArray(SampleCompanyConfig.newHire.emails)).toBe(true)
  })
  it('should have property "sever" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('sever')
    expect(SampleCompanyConfig.sever).toHaveProperty('email')
    expect(typeof SampleCompanyConfig.sever.email === 'string').toBe(true)
  })
  it('should have property "users" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('users')
    expect(SampleCompanyConfig.users).toHaveProperty('boardEmails')
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('CAAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.CAAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('GVSAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.GVSAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('LHAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.LHAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('NAAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.NAAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('PAAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.PAAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('Phoenix Realtors')
    expect(typeof SampleCompanyConfig.users.boardEmails['Phoenix Realtors'] === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('SAAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.SAAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('SVVAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.SVVAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('TAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.TAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('WMAR')
    expect(typeof SampleCompanyConfig.users.boardEmails.WMAR === 'string').toBe(true)
    expect(SampleCompanyConfig.users.boardEmails).toHaveProperty('WeSERV')
    expect(typeof SampleCompanyConfig.users.boardEmails.WeSERV === 'string').toBe(true)

    expect(SampleCompanyConfig.users).toHaveProperty('protected')
    expect(Array.isArray(SampleCompanyConfig.users.protected)).toBe(true)

    expect(SampleCompanyConfig.users).toHaveProperty('testing')
    expect(Array.isArray(SampleCompanyConfig.users.testing)).toBe(true)
  })
  it('should have property "offices" and child properties"', () => {
    expect(SampleCompanyConfig).toHaveProperty('offices')
    expect(SampleCompanyConfig.offices).toHaveProperty('OfficeNameFirst')
    expect(SampleCompanyConfig.offices).toHaveProperty('OfficeNameSecond')
    Object.entries(SampleCompanyConfig.offices).forEach(([, office]) => {
      expect(office).toHaveProperty('name')
      expect(typeof office.name === 'string').toBe(true)
      expect(office).toHaveProperty('secretary')
      expect(office.secretary).toHaveProperty('first')
      expect(typeof office.secretary.first === 'string').toBe(true)

      expect(office).toHaveProperty('address')
      expect(office.address).toHaveProperty('street')
      expect(office.address).toHaveProperty('city')
      expect(office.address).toHaveProperty('state')
      expect(office.address).toHaveProperty('zip')
      expect(typeof office.address.street === 'string').toBe(true)
      expect(typeof office.address.city === 'string').toBe(true)
      expect(typeof office.address.state === 'string').toBe(true)
      expect(typeof office.address.zip === 'string').toBe(true)
      expect(office).toHaveProperty('link')
      expect(typeof office.link === 'string').toBe(true)

      expect(office).toHaveProperty('emails')
      expect(office.emails).toHaveProperty('allAgentsInOffice')
      expect(typeof office.emails.allAgentsInOffice === 'string').toBe(true)
      expect(office.emails).toHaveProperty('allInOffice')
      expect(typeof office.emails.allInOffice === 'string').toBe(true)
      expect(office.emails).toHaveProperty('emails')
      expect(Array.isArray(office.emails.emails)).toBe(true)
      expect(office.emails).toHaveProperty('emailsCc')
      expect(Array.isArray(office.emails.emailsCc)).toBe(true)
      expect(office.emails).toHaveProperty('sever')
      expect(Array.isArray(office.emails.sever)).toBe(true)
    })
  })
})
