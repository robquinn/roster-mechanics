import HTTPResponse from '../../../http-response'

const wwwGoogleResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: 'value4',
  }),
  code: 200,
})

export default wwwGoogleResponse
