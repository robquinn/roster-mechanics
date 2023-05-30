declare namespace RosterMechanics {
  namespace GoogleApis {
    namespace ServiceAccount {
      namespace Request {
        type Query = Record<string, unknown>
        type Body = Record<string, unknown>
      }
      interface IGoogleServiceAccount {
        getUserEmail: () => string
        reset: () => void
        run: ({
          url,
          method,
          payload = {},
        }: {
          url: string
          method: GoogleAppsScript.URL_Fetch.HttpMethod
          payload?: { query?: Request.Query; body?: Request.Body }
        }) => Promise<JSON>
      }
    }
  }
}
