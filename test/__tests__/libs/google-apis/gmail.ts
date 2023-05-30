import { describe, expect, it, jest } from '@jest/globals'
import EmailConfig from '../../../../src/config/other/email'
import GmailApi from '../../../../src/libs/google-apis/gmail'
import GoogleServiceAccount from '../../../../src/libs/google-apis/service-account'
import { sampleUser3 } from '../../../samples/users'
import gmailApiListSendAsResponse from '../../../gas/utils/url-fetch-app/http-responses/gmail-api-list-send-as'
import gmailApiPatchSendAsResponse from '../../../gas/utils/url-fetch-app/http-responses/gmail-api-patch-send-as'

describe('GmailApi', () => {
  const googleSA = new GoogleServiceAccount({
    userEmail: sampleUser3().primaryEmail as string,
    serviceName: 'Gmail',
    scopes: GmailApi.Scopes(),
  })

  const gmailApi = new GmailApi(googleSA)
  it('should be an instance of "GmailApi"', () => {
    expect(gmailApi).toBeInstanceOf(GmailApi)
  })
  it('should call "createLabelByGmailApi" and "listAllUserGmailMessagesByQuery" when calling "gmailApi.createFilter"', async () => {
    const createLabelByGmailApiSpy = jest.spyOn(Object.getPrototypeOf(gmailApi), 'createLabelByGmailApi')
    const listAllUserGmailMessagesByQuerySpy = jest.spyOn(
      Object.getPrototypeOf(gmailApi),
      'listAllUserGmailMessagesByQuery',
    )
    await gmailApi.createFilter({
      query: (await EmailConfig).filters.justListed.query,
      labelName: (await EmailConfig).filters.justListed.labelName,
    })
    expect(createLabelByGmailApiSpy).toHaveBeenCalled()
    expect(listAllUserGmailMessagesByQuerySpy).toHaveBeenCalled()
  })
  it('should get correct response when calling "gmailApi.listSendAs()', async () => {
    const response = await gmailApi.listSendAs()
    expect(response).toEqual(JSON.parse(gmailApiListSendAsResponse.getContentText()))
  })
  it('should get correct response when calling "gmailApi.patchSendAs()', async () => {
    const response = await gmailApi.patchSendAs({
      firstName: sampleUser3()?.name?.givenName as string,
      lastName: sampleUser3()?.name?.familyName as string,
      userEmail: sampleUser3().primaryEmail as string,
      signatureHtml: 'asdfasdfasdf',
    })
    expect(response).toEqual(JSON.parse(gmailApiPatchSendAsResponse.getContentText()))
  })
})
