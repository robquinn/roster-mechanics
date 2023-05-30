import { samplePerson1 } from '../../../../samples/people'
import HTTPResponse from '../../../http-response'

const peopleApiCreateContactResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify(samplePerson1()),
  code: 200,
})

export default peopleApiCreateContactResponse
