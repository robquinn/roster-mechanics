declare namespace RosterMechanics {
  namespace Test {
    namespace Folder {
      interface IFolder {
        getId: () => string
        getName: () => string
        getFoldersByName: (name: string) => RosterMechanics.Test.FolderIterator.IFolderIterator
        createFolder: (name: string) => RosterMechanics.Test.Folder.IFolder
        createFile: (blob: GoogleAppsScript.Base.BlobSource) => RosterMechanics.Test.File.IFile
        getFolders: () => RosterMechanics.Test.FolderIterator.IFolderIterator
      }
    }
  }
}
