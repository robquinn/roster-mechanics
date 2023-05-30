/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import HTTPResponse from '../../http-response'
import gmailApiListSendAsResponse from './http-responses/gmail-api-list-send-as'
import gmailApiCreateLabelResponse from './http-responses/gmail-api-create-label'
import gmailApiListLabelsResponse from './http-responses/gmail-api-list-labels'
import spreadSheetDownloadResponse from './http-responses/spreadsheet-download'
import wwwGoogleResponse from './http-responses/www-google'
import gmailApiPatchSendAsResponse from './http-responses/gmail-api-patch-send-as'
import peopleApiListDirectoryPeopleResponse from './http-responses/people-api-list-directory-people'
import peopleApiListConnectionsResponse from './http-responses/people-api-list-connections'
import peopleApiSearchContactsResponse from './http-responses/people-api-search-contacts'
import peopleApiCreateContactResponse from './http-responses/people-api-create-contact'

const urlFetchAppHTTPResponses: RosterMechanics.Test.UrlFetchApp.Fn.UrlFetchAppHTTPResponses = ({
  url,
  params,
}: {
  url: string
  params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions | undefined
}): RosterMechanics.Test.HTTPResponse.IHTTPResponse => {
  switch (true) {
    case /(https|http):\/\/docs\.google.com\/feeds\/download\/spreadsheets\/Export\?key=.*&exportFormat=xlsx/gm.test(
      url,
    ):
      return spreadSheetDownloadResponse
    case params?.method === 'get' &&
      /^(https|http):\/\/gmail\.googleapis\.com\/gmail\/v1\/users\/me\/labels$/gm.test(url):
      return gmailApiListLabelsResponse
    case params?.method === 'post' &&
      /^(https|http):\/\/gmail\.googleapis\.com\/gmail\/v1\/users\/me\/labels$/gm.test(url):
      return gmailApiCreateLabelResponse
    case params?.method === 'get' &&
      /^(https|http):\/\/gmail\.googleapis\.com\/gmail\/v1\/users\/me\/settings\/sendAs$/gm.test(url):
      return gmailApiListSendAsResponse
    case params?.method === 'patch' &&
      /^(https|http):\/\/gmail\.googleapis\.com\/gmail\/v1\/users\/me\/settings\/sendAs\/.*$/gm.test(url):
      return gmailApiPatchSendAsResponse
    case params?.method === 'get' &&
      /^(https|http):\/\/people\.googleapis\.com\/v1\/people:listDirectoryPeople.*$/gm.test(url):
      return peopleApiListDirectoryPeopleResponse
    case params?.method === 'get' &&
      /^(https|http):\/\/people\.googleapis\.com\/v1\/people\/me\/connections.*$/gm.test(url):
      return peopleApiListConnectionsResponse
    case params?.method === 'get' &&
      /^(https|http):\/\/people\.googleapis\.com\/v1\/people:searchContacts.*$/gm.test(url):
      return peopleApiSearchContactsResponse
    case params?.method === 'post' &&
      /^(https|http):\/\/people\.googleapis\.com\/v1\/people:createContact.*$/gm.test(url):
      return peopleApiCreateContactResponse
    case params?.method === 'get' && /^(https|http):\/\/www\.google.com\/$/gm.test(url):
      return wwwGoogleResponse
    default:
      return wwwGoogleResponse
  }
}
export default urlFetchAppHTTPResponses
