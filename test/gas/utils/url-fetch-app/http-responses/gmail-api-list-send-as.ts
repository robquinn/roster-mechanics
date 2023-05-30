import HTTPResponse from '../../../http-response'

const gmailApiListSendAsResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    sendAs: [
      {
        sendAsEmail: 'asdf',
        displayName: 'adsf',
        replyToAddress: 'adsf',
        signature: 'sdfasdf',
        isPrimary: true,
        isDefault: true,
        treatAsAlias: true,
        smtpMsa: {
          host: 'asdf',
          port: 8080,
          username: 'asdf',
          password: 'asdf',
          securityMode: 'ssl',
        },
        verificationStatus: 'accepted',
      },
    ],
  }),
  code: 200,
})

export default gmailApiListSendAsResponse
