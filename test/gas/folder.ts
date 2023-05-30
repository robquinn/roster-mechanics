/* eslint-disable class-methods-use-this */
import File from './file'
import FolderIterator from './folder-iterator'

type IFolder = RosterMechanics.Test.Folder.IFolder

export default class Folder implements IFolder {
  private readonly name
  private readonly id
  private readonly folders

  constructor({
    name,
    id,
    folders,
  }: {
    name: string
    id: string
    folders: RosterMechanics.Test.FolderIterator.IFolderIterator
  }) {
    this.name = name
    this.id = id
    this.folders = folders
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getFoldersByName(name: string): RosterMechanics.Test.FolderIterator.IFolderIterator {
    const folders = []
    while (this.folders.hasNext()) {
      const folder = this.folders.next()
      if (name === folder.getName()) folders.push(folder)
    }
    return folders.length > 0
      ? new FolderIterator([...folders])
      : new FolderIterator([
          new Folder({
            name,
            id: 'Folder Id 1',
            folders: new FolderIterator([
              new Folder({ name: '#RL - Agent Paperwork', id: 'asdf', folders: new FolderIterator([]) }),
              new Folder({ name: 'A folder name 1', id: 'asdf', folders: new FolderIterator([]) }),
            ]),
          }),
          new Folder({
            name: 'Dummy Folder 3',
            id: 'Dummy Folder ID 1',
            folders: new FolderIterator([
              new Folder({ name: 'another name 1', id: 'asdf', folders: new FolderIterator([]) }),
              new Folder({ name: 'another name 2', id: 'asdf', folders: new FolderIterator([]) }),
            ]),
          }),
        ])
  }

  createFolder(name: string): RosterMechanics.Test.Folder.IFolder {
    return new Folder({ name, id: '', folders: new FolderIterator([]) })
  }

  createFile(blob: GoogleAppsScript.Base.BlobSource): RosterMechanics.Test.File.IFile {
    return new File({ blob, id: '', name: '' })
  }

  getFolders(): RosterMechanics.Test.FolderIterator.IFolderIterator {
    return this.folders
  }
}
