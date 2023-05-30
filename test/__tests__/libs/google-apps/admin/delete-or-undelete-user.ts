import { afterEach, beforeAll, describe, expect, it, jest, beforeEach } from '@jest/globals'
import deleteOrUndeleteUser from '../../../../../src/libs/google-apps/admin/delete-or-undelete-user'
import * as getByEmail from '../../../../../src/libs/google-apps/admin/get-by-email'
import { formResponseObject6, formResponseObject7, formResponseObject8 } from '../../../../samples/form-responses'
import { sampleUser9 } from '../../../../samples/users'
import getSetDeletedUsers from '../../../../../src/libs/utils/cache/get-set-deleted-users'
import GoogleAppsScriptConfig from '../../../../../src/config/google/apps-script'

let user1: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
let user2: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

beforeEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})
beforeAll(async () => {
  user1 = await getByEmail.default(formResponseObject6().email)
  user2 = await getByEmail.default(formResponseObject7().email)
})

describe('deleteOrUndeleteUser', () => {
  const getByEmailSpy = jest.spyOn(getByEmail, 'default')
  // @ts-expect-error the property global.AdminDirectory.Users.remove exists
  const undeleteUserSpy = jest.spyOn(global.AdminDirectory.Users, 'undelete')
  it('should delete User and call proper functions (PATH 1)', async () => {
    // @ts-expect-error the property global.AdminDirectory.Users.remove exists
    const removeUserSpy = jest.spyOn(global.AdminDirectory.Users, 'remove')

    const formResponseObject = formResponseObject6()

    const { user, action } = await deleteOrUndeleteUser(formResponseObject)

    expect(getByEmailSpy).toHaveBeenCalled()
    expect(removeUserSpy).toHaveBeenCalled()
    expect(removeUserSpy).toHaveBeenCalledWith(user1.primaryEmail)

    expect(user).toEqual(user1)
    expect(action).toEqual('delete')
  })

  it('should undelete User and call proper functions (PATH 2)', async () => {
    const sampleU1 = sampleUser9()

    await getSetDeletedUsers({ email: sampleU1.primaryEmail as string, id: sampleU1.id as string })

    const formResponseObject = formResponseObject7()

    const { user, action } = await deleteOrUndeleteUser(formResponseObject)

    expect(getByEmailSpy).toHaveBeenCalled()
    expect(undeleteUserSpy).toHaveBeenCalled()
    expect(undeleteUserSpy).toHaveBeenCalledWith({ orgUnitPath: '/' }, user2.id)

    expect(user).toEqual(user2)
    expect(action).toEqual('update')
  })
  it('should undelete User and call proper functions (PATH 3)', async () => {
    const logSpy = jest.spyOn(console, 'log')

    const formResponseObject = formResponseObject8()

    const { user, action } = await deleteOrUndeleteUser(formResponseObject)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith(
      `Cannot undelete user as their userId was not found in the cache: ${
        (await GoogleAppsScriptConfig).cache.deletedUsers.id
      }`,
    )

    expect(user).toEqual(null)
    expect(action).toEqual('void')
  })
})
