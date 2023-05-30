import { describe, expect, it, jest } from '@jest/globals'
import deleteFormResponse from '../../../../../src/libs/google-apps/form/delete-form-response'
import GoogleFormsConfig from '../../../../../src/config/google/forms'

describe('deleteFormResponse', () => {
  it('should call "FormApp.openById" and "form.deleteResponse"', async () => {
    const form = FormApp.openById((await GoogleFormsConfig).forms.suspend.formId)

    const openByIdSpy = jest.spyOn(global.FormApp, 'openById')
    const deleteResponseSpy = jest.spyOn(Object.getPrototypeOf(form), 'deleteResponse')

    await deleteFormResponse({
      email: 'mocha.banjo@russlyon.com',
      formId: (await GoogleFormsConfig).forms.suspend.formId,
    })
    // await deleteFormResponse({
    //   email: 'banjoo.mochaa@russlyon.com',
    //   formId: (await GoogleFormsConfig).forms.suspend.formId,
    // })
    expect(openByIdSpy).toHaveBeenCalled()
    expect(deleteResponseSpy).toHaveBeenCalled()
  })
})
