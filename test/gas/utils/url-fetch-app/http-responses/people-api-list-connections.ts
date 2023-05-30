import peopleArr from '../../../../samples/people'
import HTTPResponse from '../../../http-response'

const peopleApiListConnectionsResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    connections: [...peopleArr],
    totalPeople: 1,
    totalItems: 1,
  }),
  code: 200,
})

export default peopleApiListConnectionsResponse
