import HTTPResponse from '../../../http-response'
import peopleArr from '../../../../samples/people'

const peopleApiListDirectoryPeopleResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    people: [...peopleArr],
  }),
  code: 200,
})

export default peopleApiListDirectoryPeopleResponse
