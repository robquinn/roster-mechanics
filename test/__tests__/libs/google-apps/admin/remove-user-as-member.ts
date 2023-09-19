import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import { sampleUser1 } from '../../../../samples/users'
import removeUserAsMember from '../../../../../src/libs/google-apps/admin/remove-user-as-member'

beforeAll(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

describe('removeUserAsMember', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')

    const userOffice = await getActualOffice(
      sampleUser1().customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office,
    )
    const allInOfficeGroupEmail = (await RussLyonConfig).offices[userOffice].emails.allInOffice
    const allAgentsInOfficeGroupEmail = (await RussLyonConfig).offices[userOffice].emails.allAgentsInOffice
    const allNinjasInOfficeGroupEmail = (await RussLyonConfig).offices[userOffice].emails.ninjasInOffice

    removeUserAsMember({ user: sampleUser1(), groupEmail: allInOfficeGroupEmail })
    removeUserAsMember({ user: sampleUser1(), groupEmail: allAgentsInOfficeGroupEmail })
    removeUserAsMember({ user: sampleUser1(), groupEmail: allNinjasInOfficeGroupEmail })

    expect(logSpy).toHaveBeenCalledWith(
      'User (%s) has been removed from group (%s)',
      sampleUser1()?.primaryEmail,
      allInOfficeGroupEmail,
    )
    expect(logSpy).toHaveBeenCalledWith(
      'User (%s) has been removed from group (%s)',
      sampleUser1()?.primaryEmail,
      allAgentsInOfficeGroupEmail,
    )
    expect(logSpy).toHaveBeenCalledWith(
      'User (%s) has been removed from group (%s)',
      sampleUser1()?.primaryEmail,
      allNinjasInOfficeGroupEmail,
    )
  })
})
