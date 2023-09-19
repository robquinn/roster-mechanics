/* eslint-disable class-methods-use-this */
import File from './file'
import FolderIterator from './folder-iterator'
import FileIterator from './file-iterator'
import Blob from './blob'

type IFolder = RosterMechanics.Test.Folder.IFolder

export default class Folder implements IFolder {
  private readonly name
  private readonly id
  private readonly folders
  private readonly files

  constructor({
    name,
    id,
    folders,
    files,
  }: {
    name: string
    id: string
    folders: RosterMechanics.Test.FolderIterator.IFolderIterator
    files: RosterMechanics.Test.FileIterator.IFileIterator
  }) {
    this.name = name
    this.id = id
    this.folders = folders
    this.files = files
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
              new Folder({
                name: '#RL - Agent Paperwork',
                id: 'asdf',
                folders: new FolderIterator([]),
                files: new FileIterator([]),
              }),
              new Folder({
                name: 'A folder name 1',
                id: 'asdf',
                folders: new FolderIterator([]),
                files: new FileIterator([]),
              }),
            ]),
            files: new FileIterator([]),
          }),
          new Folder({
            name: 'Dummy Folder 3',
            id: 'Dummy Folder ID 1',
            folders: new FolderIterator([
              new Folder({
                name: 'another name 1',
                id: 'asdf',
                folders: new FolderIterator([]),
                files: new FileIterator([]),
              }),
              new Folder({
                name: 'another name 2',
                id: 'asdf',
                folders: new FolderIterator([]),
                files: new FileIterator([]),
              }),
            ]),
            files: new FileIterator([]),
          }),
        ])
  }

  getFilesByName(name: string): RosterMechanics.Test.FileIterator.IFileIterator {
    const files = []
    while (this.files.hasNext()) {
      const file = this.files.next()
      if (name === file.getName()) files.push(file)
    }
    return files.length > 0
      ? new FileIterator([...files])
      : new FileIterator([
          new File({
            name,
            id: 'Folder Id 1',
            blob: new Blob({ contentType: 'application/pdf', name: 'blob name', data: 'some data' }),
          }),
          new File({
            name,
            id: 'Folder Id 2',
            blob: new Blob({ contentType: 'application/pdf', name: 'blob name 2', data: 'some data 2' }),
          }),
        ])
  }

  createFolder(name: string): RosterMechanics.Test.Folder.IFolder {
    return new Folder({ name, id: '', folders: new FolderIterator([]), files: new FileIterator([]) })
  }

  createFile(blob: GoogleAppsScript.Base.BlobSource): RosterMechanics.Test.File.IFile {
    return new File({ blob, id: '', name: '' })
  }

  getFolders(): RosterMechanics.Test.FolderIterator.IFolderIterator {
    return this.folders
  }
}
