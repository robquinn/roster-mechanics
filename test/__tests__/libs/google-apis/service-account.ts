import { describe, expect, it, jest } from '@jest/globals'
import GmailApi from '../../../../src/libs/google-apis/gmail'
import GoogleServiceAccount from '../../../../src/libs/google-apis/service-account'
import { sampleUser2 } from '../../../samples/users'
import * as makeQueryParams from '../../../../src/libs/utils/general/make-query-params'
import wwwGoogleResponse from '../../../gas/utils/url-fetch-app/http-responses/www-google'

describe('GoogleServiceAccount', () => {
  const googleSA = new GoogleServiceAccount({
    userEmail: sampleUser2().primaryEmail as string,
    serviceName: 'Gmail',
    scopes: GmailApi.Scopes(),
  })
  it('should be an instance of "GoogleServiceAccount"', () => {
    expect(googleSA).toBeInstanceOf(GoogleServiceAccount)
  })
  it('should return user email when calling "getUserEmail"', () => {
    expect(googleSA.getUserEmail()).toBe(sampleUser2().primaryEmail)
  })
  it('should call "GoogleServiceAccount.getService_()" when calling "GoogleSerivceAccount.reset()"', () => {
    const googleSAGetServiceSpy = jest.spyOn(Object.getPrototypeOf(googleSA), 'getService_')
    googleSA.reset()
    expect(googleSAGetServiceSpy).toHaveBeenCalled()
  })
  it('should call "new GoogleServiceAccount().getService_()" & "makeQueryParams" when calling "new GoogleSerivceAccount().run()"', async () => {
    const googleSAGetServiceSpy = jest.spyOn(Object.getPrototypeOf(googleSA), 'getService_')
    const makeQueryParamsSpy = jest.spyOn(makeQueryParams, 'default')

    const url = 'https://www.google.com'
    const payload = {
      query: {
        prop1: 'value1',
        prop2: 'value2',
        prop3: 'value3',
      },
      body: {
        someotherprop1: 'someothervalue1',
        someotherprop2: 'someothervalue2',
        someotherprop3: 'someothervalue3',
      },
    }
    const method = 'get'
    const response = await googleSA.run({
      url,
      payload,
      method,
    })
    expect(response).toEqual(JSON.parse(wwwGoogleResponse.getContentText()))
    expect(googleSAGetServiceSpy).toHaveBeenCalled()
    expect(makeQueryParamsSpy).toHaveBeenCalled()
    expect(makeQueryParamsSpy).toHaveBeenCalledWith(payload.query)
  })
  // it('should get cred', () => {
  //   console.log('thecreds', googleSA.getCreds())
  //   expect(googleSA.getCreds().privateKey).toBe(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)
  //   expect(googleSA.getCreds().clientEmail).toBe(process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL)
  // })
})
