/* eslint-disable no-plusplus */
type IFolderIterator = RosterMechanics.Test.FolderIterator.IFolderIterator

export default class FolderIterator implements IFolderIterator {
  private readonly folders
  private index

  constructor(folders: RosterMechanics.Test.Folder.IFolder[]) {
    this.folders = folders
    this.index = -1
  }

  next(): RosterMechanics.Test.Folder.IFolder {
    this.index += 1
    return this.folders[this.index]
  }

  hasNext(): boolean {
    return this.index < this.folders.length - 1
  }
}
