declare namespace RosterMechanics {
  namespace Test {
    namespace UrlFetchApp {
      namespace Fn {
        type UrlFetchAppParamsFieldValidation = (params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions) => void
        type UrlFetchAppHTTPResponses = ({
          url,
          params,
        }: {
          url: string
          params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions | undefined
        }) => RosterMechanics.Test.HTTPResponse.IHTTPResponse
      }
      interface IUrlFetchApp {
        fetch: (
          url: string,
          params?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions | undefined,
        ) => RosterMechanics.Test.HTTPResponse.IHTTPResponse
        fetchAll: (
          requests: Array<GoogleAppsScript.URL_Fetch.URLFetchRequest | string>,
        ) => RosterMechanics.Test.HTTPResponse.IHTTPResponse[]
      }
    }
  }
}
