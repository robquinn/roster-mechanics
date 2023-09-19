declare namespace RosterMechanics {
  namespace Test {
    namespace FileIterator {
      interface IFileIterator {
        // [Symbol.iterator]: () => { next: () => RosterMechanics.Test.Folder.IFolder }
        next: () => RosterMechanics.Test.File.IFile
        hasNext: () => boolean
      }
    }
  }
}
