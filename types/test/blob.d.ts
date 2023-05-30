declare namespace RosterMechanics {
  namespace Test {
    namespace Blob {
      interface IBlob {
        getAs: (contentType: string) => RosterMechanics.Test.Blob.IBlob
      }
    }
  }
}
