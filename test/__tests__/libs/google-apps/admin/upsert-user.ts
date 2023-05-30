import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as getByEmail from '../../../../../src/libs/google-apps/admin/get-by-email'
import * as getByQuery from '../../../../../src/libs/google-apps/admin/get-by-query'
import GoogleUser from '../../../../../src/libs/google-apps/admin/google-user'
import * as insertUser from '../../../../../src/libs/google-apps/admin/insert-user'
import * as updateUser from '../../../../../src/libs/google-apps/admin/update-user'
import upsertUser from '../../../../../src/libs/google-apps/admin/upsert-user'
import * as handleReHire from '../../../../../src/libs/wrapper/company/handle-rehire'
import * as saveCriticalNewHirePDF from '../../../../../src/libs/wrapper/drive/save-critical-new-hire-pdf'
import * as createJustListedFilter from '../../../../../src/libs/wrapper/gmail/create-just-listed-filter'
import * as saveUserSignature from '../../../../../src/libs/wrapper/gmail/save-user-signature'
import * as sendNewHireEmail from '../../../../../src/libs/wrapper/gmail/send-new-hire-email'
import * as sendWelcomeEmail from '../../../../../src/libs/wrapper/gmail/send-welcome-email'
import { formResponseObject1, formResponseObject2, formResponseObject3 } from '../../../../samples/form-responses'

afterEach(() => {
  jest.resetAllMocks()
})

describe('upsertUser', () => {
  const getByQuerySpy = jest.spyOn(getByQuery, 'default')
  const getByEmailSpy = jest.spyOn(getByEmail, 'default')
  const handleReHireSpy = jest.spyOn(handleReHire, 'default')
  const updateUserSpy = jest.spyOn(updateUser, 'default')

  it('should upsert User and call proper functions when user ALREADY exists (UPDATE user path 1)', async () => {
    const formResponseObject = formResponseObject3()

    const googleUser = new GoogleUser(formResponseObject)
    await googleUser.init()

    const getUserSpy = jest.spyOn(Object.getPrototypeOf(googleUser), 'getUser')
    // formResposneObject2 user already exists

    const { user: receivedUser } = await upsertUser(googleUser)

    expect(getUserSpy).toHaveBeenCalled()
    expect(getByQuerySpy).toHaveBeenCalled()
    expect(handleReHireSpy).toHaveBeenCalled()
    expect(updateUserSpy).toHaveBeenCalled()

    expect(receivedUser).toEqual(googleUser.getUser())
  })
  it("should upsert User and call proper functions when user DOESN'T exist by FormResponseUrl but does by Email (UPDATE user path 2)", async () => {
    // formResposneObject2 user DOESN'T exists
    const formResponseObject = formResponseObject2()
    const googleUser = new GoogleUser(formResponseObject)
    await googleUser.init()

    const getUserSpy = jest.spyOn(Object.getPrototypeOf(googleUser), 'getUser')

    const { user: receivedUser } = await upsertUser(googleUser)

    expect(getByEmailSpy).toHaveBeenCalled()
    expect(getUserSpy).toHaveBeenCalled()
    expect(getByQuerySpy).toHaveBeenCalled()
    expect(handleReHireSpy).toHaveBeenCalled()
    expect(updateUserSpy).toHaveBeenCalled()

    expect(receivedUser).toEqual(googleUser.getUser())
  })
  it("should upsert User and call proper functions when user DOESN'T exist by FormResponseUrl or Email (INSERT user)", async () => {
    // formResposneObject2 user DOESN'T exists
    const formResponseObject = formResponseObject1()
    const googleUser = new GoogleUser(formResponseObject)
    const getUserSpy = jest.spyOn(Object.getPrototypeOf(googleUser), 'getUser')
    const insertUserSpy = jest.spyOn(insertUser, 'default')
    const createJustListedFilterSpy = jest.spyOn(createJustListedFilter, 'default')
    const sendNewHireEmailSpy = jest.spyOn(sendNewHireEmail, 'default')
    const saveCriticalNewHirePDFSpy = jest.spyOn(saveCriticalNewHirePDF, 'default')
    const sendWelcomeEmailSpy = jest.spyOn(sendWelcomeEmail, 'default')
    const saveUserSignatureSpy = jest.spyOn(saveUserSignature, 'default')

    console.log('upsertusergoogleuser', googleUser)
    await googleUser.init()

    const { user: receivedUser } = await upsertUser(googleUser)

    expect(getByEmailSpy).toHaveBeenCalled()
    expect(getUserSpy).toHaveBeenCalled()
    expect(getByQuerySpy).toHaveBeenCalled()
    expect(insertUserSpy).toHaveBeenCalled()
    expect(createJustListedFilterSpy).toHaveBeenCalled()
    expect(sendNewHireEmailSpy).toHaveBeenCalled()
    expect(saveCriticalNewHirePDFSpy).toHaveBeenCalled()
    expect(sendWelcomeEmailSpy).toHaveBeenCalled()
    expect(saveUserSignatureSpy).toHaveBeenCalled()

    expect(receivedUser).toEqual(googleUser.getUser())
  })
})
