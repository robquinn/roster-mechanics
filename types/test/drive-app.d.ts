declare namespace RosterMechanics {
  namespace Test {
    namespace DriveApp {
      interface IDriveApp {
        getFolderById: (id: string) => RosterMechanics.Test.Folder.IFolder
        getFileById: (id: string) => RosterMechanics.Test.File.IFile
      }
    }
  }
}
