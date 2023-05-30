import HTTPResponse from '../../../http-response'
import peopleArr from '../../../../samples/people'

const peopleApiSearchContactsResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    results: [...peopleArr.map((p) => ({ person: p }))],
  }),
  code: 200,
})

export default peopleApiSearchContactsResponse
