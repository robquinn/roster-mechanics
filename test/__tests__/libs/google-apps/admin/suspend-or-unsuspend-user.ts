import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import * as getByEmail from '../../../../../src/libs/google-apps/admin/get-by-email'
import suspendOrUnsuspendUser from '../../../../../src/libs/google-apps/admin/suspend-or-unsuspend-user'
import * as ifEmptyThenNull from '../../../../../src/libs/utils/format/if-empty-then-null'
import { formResponseObject4, formResponseObject5 } from '../../../../samples/form-responses'
import SuspensionEmail from '../../../../../src/libs/emails/suspension'
import { sampleUser4 } from '../../../../samples/users'

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

beforeEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

describe('suspendOrUnsuspendUser', () => {
  const suspensionEmail = new SuspensionEmail(sampleUser4())
  const getByEmailSpy = jest.spyOn(getByEmail, 'default')
  const ifEmptyThenNullSpy = jest.spyOn(ifEmptyThenNull, 'default')
  // @ts-expect-error global.AdminDirectory.Users exists
  const updateUserSpy = jest.spyOn(global.AdminDirectory.Users, 'update')
  const suspensionEmailSendSpy = jest.spyOn(Object.getPrototypeOf(suspensionEmail), 'send')

  it('should suspend User and call proper functions', async () => {
    const formResponseObject = { ...formResponseObject4() }

    const suspendedUser = await suspendOrUnsuspendUser(formResponseObject)

    expect(getByEmailSpy).toHaveBeenCalled()
    expect(suspensionEmailSendSpy).toHaveBeenCalled()
    expect(ifEmptyThenNullSpy).toHaveBeenCalledTimes(3)
    expect(updateUserSpy).toHaveBeenCalled()

    expect(suspendedUser.suspended).toBe(true)
  })
  it('should unsuspend User and call proper functions', async () => {
    const formResponseObject = { ...formResponseObject5() }

    const suspendedUser = await suspendOrUnsuspendUser(formResponseObject)

    expect(getByEmailSpy).toHaveBeenCalled()
    expect(suspensionEmailSendSpy).not.toHaveBeenCalled()
    expect(ifEmptyThenNullSpy).toHaveBeenCalledTimes(3)
    expect(updateUserSpy).toHaveBeenCalled()

    expect(suspendedUser.suspended).toBe(false)
  })
})
