import { describe, expect, it, jest } from '@jest/globals'
import GoogleServiceAccount from '../../../../../src/libs/google-apis/service-account'
import { sampleUser1 } from '../../../../samples/users'
import createAgentDigestFilter from '../../../../../src/libs/wrapper/gmail/create-agent-digest-filter'
import * as exponentialBackoffAsync from '../../../../../src/libs/utils/general/exponential-backoff-async'
import GmailApi from '../../../../../src/libs/google-apis/gmail'

describe('createAgentDigestFilter', () => {
  it('should call "exponentialBackoffAsync" & "gmailApi.createFiler()"', async () => {
    const sampleUser = sampleUser1()
    const googleSA = new GoogleServiceAccount({
      userEmail: sampleUser.primaryEmail as string,
      serviceName: 'Gmail',
      scopes: GmailApi.Scopes(),
    })

    const gmailApi = new GmailApi(googleSA)

    const patchSendAsSpy = jest.spyOn(Object.getPrototypeOf(gmailApi), 'createFilter')
    const exponentialBackoffAsyncSpy = jest.spyOn(exponentialBackoffAsync, 'default')

    await createAgentDigestFilter(sampleUser)

    expect(exponentialBackoffAsyncSpy).toHaveBeenCalled()
    expect(patchSendAsSpy).toHaveBeenCalled()
  })
})
