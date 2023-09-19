/* eslint-disable no-plusplus */
type IFileIterator = RosterMechanics.Test.FileIterator.IFileIterator

export default class FileIterator implements IFileIterator {
  private readonly files
  private index

  constructor(files: RosterMechanics.Test.File.IFile[]) {
    this.files = files
    this.index = -1
  }

  next(): RosterMechanics.Test.File.IFile {
    this.index += 1
    return this.files[this.index]
  }

  hasNext(): boolean {
    return this.index < this.files.length - 1
  }
}
