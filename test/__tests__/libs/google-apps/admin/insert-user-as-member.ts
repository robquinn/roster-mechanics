import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import insertUserAsMember from '../../../../../src/libs/google-apps/admin/insert-user-as-memeber'
import getActualOffice from '../../../../../src/libs/utils/general/get-actual-office'
import RussLyonConfig from '../../../../../src/config/company/russ-lyon'
import { sampleUser1 } from '../../../../samples/users'

beforeAll(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

describe('insertUserAsMember', () => {
  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')

    const userOffice = await getActualOffice(
      sampleUser1().customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office,
    )
    const allInOfficeGroupEmail = (await RussLyonConfig).offices[userOffice].emails.allInOffice
    const allAgentsInOfficeGroupEmail = (await RussLyonConfig).offices[userOffice].emails.allAgentsInOffice
    insertUserAsMember({ user: sampleUser1(), groupEmail: allInOfficeGroupEmail })
    insertUserAsMember({ user: sampleUser1(), groupEmail: allAgentsInOfficeGroupEmail })
    expect(logSpy).toHaveBeenCalledWith(
      'User (%s) added to group email (%s).',
      sampleUser1()?.primaryEmail,
      allInOfficeGroupEmail,
    )
    expect(logSpy).toHaveBeenCalledWith(
      'User (%s) added to group email (%s).',
      sampleUser1()?.primaryEmail,
      allAgentsInOfficeGroupEmail,
    )
  })
})
