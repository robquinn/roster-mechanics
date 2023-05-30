import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import * as insertUserAsMember from '../../../../../src/libs/google-apps/admin/insert-user-as-memeber'
import * as getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import updateUserGroups from '../../../../../src/libs/google-apps/admin/update-user-groups'
import { sampleUser5 } from '../../../../samples/users'

type ICustomSchema = RosterMechanics.GoogleApps.Admin.Schema.ICustomSchema
type Office = RosterMechanics.Utils.General.Offices.Office

const newUserData: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = sampleUser5()
const oldUserData: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = sampleUser5()

let oldOffice: string
let allInOfficeGroupEmailOld: string
let allAgentsInOfficeGroupEmailOld: string

let newOffice: string
let allInOfficeGroupEmailNew: string
let allAgentsInOfficeGroupEmailNew: string

beforeAll(async () => {
  ;(newUserData.customSchemas as ICustomSchema).Roster.Office = 'Pinnacle Peak'

  oldOffice = await getActualOffice.default(oldUserData.customSchemas?.Roster.Office as Office)
  allInOfficeGroupEmailOld = (await RussLyonConfig).offices[oldOffice].emails.allInOffice
  allAgentsInOfficeGroupEmailOld = (await RussLyonConfig).offices[oldOffice].emails.allAgentsInOffice

  newOffice = await getActualOffice.default(newUserData.customSchemas?.Roster.Office as Office)
  allInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.allInOffice
  allAgentsInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.allAgentsInOffice
})

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

describe('updateUserGroups', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')
    await updateUserGroups({ newUserData, oldUserData })
    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      'User (%s) has been removed from group (%s)',
      oldUserData.primaryEmail,
      allInOfficeGroupEmailOld,
    )
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      'User (%s) has been removed from group (%s)',
      oldUserData.primaryEmail,
      allAgentsInOfficeGroupEmailOld,
    )
    expect(logSpy).toHaveBeenNthCalledWith(
      3,
      'User (%s) added to group email (%s).',
      newUserData?.primaryEmail,
      allInOfficeGroupEmailNew,
    )
    expect(logSpy).toHaveBeenNthCalledWith(
      4,
      'User (%s) added to group email (%s).',
      newUserData?.primaryEmail,
      allAgentsInOfficeGroupEmailNew,
    )
  })
  it('should call insertUserAsMember', async () => {
    const spyOnInsertUserAsMember = jest.spyOn(insertUserAsMember, 'default')
    await updateUserGroups({ newUserData, oldUserData })
    expect(spyOnInsertUserAsMember).toHaveBeenCalledTimes(2)
  })
  it('should call getActualOffice', async () => {
    const spyOnGetActualOffice = jest.spyOn(getActualOffice, 'default')
    await updateUserGroups({ newUserData, oldUserData })
    expect(spyOnGetActualOffice).toHaveBeenCalledTimes(2)
  })
})
