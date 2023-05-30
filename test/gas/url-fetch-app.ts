/* eslint-disable class-methods-use-this */
import urlFetchAppHTTPResponses from './utils/url-fetch-app/http-responses'
import urlFetchAppParamsFieldValidation from './utils/url-fetch-app/params-field-validation'

type IUrlFetchApp = RosterMechanics.Test.UrlFetchApp.IUrlFetchApp
// type HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse
type URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
type URLFetchRequest = GoogleAppsScript.URL_Fetch.URLFetchRequest

export default class UrlFetchApp implements IUrlFetchApp {
  fetch(url: string, params?: URLFetchRequestOptions | undefined): RosterMechanics.Test.HTTPResponse.IHTTPResponse {
    if (params != null) urlFetchAppParamsFieldValidation(params)
    return urlFetchAppHTTPResponses({ url, params })
  }

  fetchAll(requests: Array<URLFetchRequest | string>): RosterMechanics.Test.HTTPResponse.IHTTPResponse[] {
    const responses: RosterMechanics.Test.HTTPResponse.IHTTPResponse[] = []
    requests.forEach((request: URLFetchRequest | string) => {
      let response: RosterMechanics.Test.HTTPResponse.IHTTPResponse
      if (typeof request === 'string') {
        response = this.fetch(request)
      } else {
        response = this.fetch(request.url, {
          contentType: request.contentType,
          escaping: request.escaping,
          followRedirects: request.followRedirects,
          headers: request.headers,
          method: request.method,
          muteHttpExceptions: request.muteHttpExceptions,
          payload: request.payload,
          useIntranet: request.useIntranet,
          validateHttpsCertificates: request.validateHttpsCertificates,
        })
      }
      responses.push(response)
    })
    return responses
  }

  //   getRequest(url: string, params: URLFetchRequestOptions): URLFetchRequest {
  //     const response = this.fetch(url, params)
  //     return {
  //         contentType: response.getAllHeaders()['Content-Type'],
  //         escaping: request.escaping,
  //         followRedirects: request.followRedirects,
  //         headers: request.headers,
  //         method: request.method,
  //         muteHttpExceptions: request.muteHttpExceptions,
  //         payload: request.payload,
  //         useIntranet: request.useIntranet,
  //         validateHttpsCertificates: request.validateHttpsCertificates,
  //     }
  //   }
}
