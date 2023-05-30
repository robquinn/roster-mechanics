declare namespace RosterMechanics {
  namespace Test {
    namespace File {
      interface IFile {
        createFile: (blob: GoogleAppsScript.Base.BlobSource) => RosterMechanics.Test.File.IFile
        setName: (name: string) => RosterMechanics.Test.File.IFile
        getBlob: () => RosterMechanics.Test.Blob.IBlob
      }
    }
  }
}
