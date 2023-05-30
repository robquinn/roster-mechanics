import HTTPResponse from '../../../http-response'

const gmailApiCreateLabelResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    id: 'asdf',
    name: 'asdf',
    messageListVisibility: 'show',
    labelListVisibility: 'labelShow',
    type: 'user',
    messagesTotal: 2,
    messagesUnread: 2,
    threadsTotal: 2,
    threadsUnread: 2,
    color: {
      textColor: '#000000',
      backgroundColor: '#000000',
    },
  }),
  code: 200,
})

export default gmailApiCreateLabelResponse
