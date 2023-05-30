declare namespace RosterMechanics {
  namespace Test {
    namespace HTTPResponse {
      interface IHTTPResponse {
        getAllHeaders: () => object
        getAs: (contentType: string) => RosterMechanics.Test.Blob.IBlob
        getBlob: () => RosterMechanics.Test.Blob.IBlob
        getContentText: () => string
        getHeaders: () => object
        getResponseCode: () => number
      }
    }
  }
}
