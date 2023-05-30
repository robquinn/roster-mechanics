declare namespace RosterMechanics {
  namespace Test {
    namespace FolderIterator {
      interface IFolderIterator {
        // [Symbol.iterator]: () => { next: () => RosterMechanics.Test.Folder.IFolder }
        next: () => RosterMechanics.Test.Folder.IFolder
        hasNext: () => boolean
      }
    }
  }
}
