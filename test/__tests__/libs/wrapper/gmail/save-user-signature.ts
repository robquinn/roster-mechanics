import { describe, expect, it, jest } from '@jest/globals'
import GmailApi from '../../../../../src/libs/google-apis/gmail'
import GoogleServiceAccount from '../../../../../src/libs/google-apis/service-account'
import * as getSignatureHtml from '../../../../../src/libs/google-apps/gmail/get-signature-html'
import saveUserSignature from '../../../../../src/libs/wrapper/gmail/save-user-signature'
import { sampleUser1 } from '../../../../samples/users'

describe('saveUserSignature', () => {
  it('should call "getSignatureHtml" & "gmailApi.patchSendAs()"', async () => {
    const sampleUser = sampleUser1()
    const googleSA = new GoogleServiceAccount({
      userEmail: sampleUser.primaryEmail as string,
      serviceName: 'Gmail',
      scopes: GmailApi.Scopes(),
    })

    const gmailApi = new GmailApi(googleSA)

    const patchSendAsSpy = jest.spyOn(Object.getPrototypeOf(gmailApi), 'patchSendAs')
    const getSignatureHtmlSpy = jest.spyOn(getSignatureHtml, 'default')

    await saveUserSignature(sampleUser)

    expect(getSignatureHtmlSpy).toHaveBeenCalled()
    expect(patchSendAsSpy).toHaveBeenCalled()
  })
})
