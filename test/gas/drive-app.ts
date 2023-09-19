/* eslint-disable class-methods-use-this */
import Blob from './blob'
import File from './file'
import FileIterator from './file-iterator'
import Folder from './folder'
import FolderIterator from './folder-iterator'

type IDriveApp = RosterMechanics.Test.DriveApp.IDriveApp

export default class DriveApp implements IDriveApp {
  getFolderById(id: string): RosterMechanics.Test.Folder.IFolder {
    const folderTree = new Folder({
      name: 'Dummy Folder 1',
      id: 'Dummy Folder ID 1',
      folders: new FolderIterator([
        new Folder({
          name: 'Dummy Folder 1',
          id: 'Dummy Folder ID 1',
          folders: new FolderIterator([
            new Folder({ name: 'name 1', id: 'asdf', folders: new FolderIterator([]), files: new FileIterator([]) }),
            new Folder({ name: 'name 2', id: 'asdf', folders: new FolderIterator([]), files: new FileIterator([]) }),
          ]),
          files: new FileIterator([]),
        }),
        new Folder({
          name: 'Dummy Folder 2',
          id: 'Dummy Folder ID 1',
          folders: new FolderIterator([
            new Folder({
              name: 'other name 1',
              id: 'asdf',
              folders: new FolderIterator([]),
              files: new FileIterator([]),
            }),
            new Folder({
              name: 'other name 2',
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
        new Folder({
          name: 'Dummy Folder 4',
          id,
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
      ]),
      files: new FileIterator([]),
    })

    let folderWithId
    const folderTreeFolders = folderTree.getFolders()
    // console.log('folderTreeFolders', folderTreeFolders)
    while (folderTreeFolders.hasNext()) {
      const folder = folderTreeFolders.next()
      // console.log('thefolder', folder)
      if (id === folder.getId()) folderWithId = folder
    }

    // console.log('folderWithId', folderWithId)
    return folderWithId as RosterMechanics.Test.Folder.IFolder
  }

  getFileById(id: string): RosterMechanics.Test.File.IFile {
    return new File({
      blob: new Blob({ contentType: 'application/pdf', name: 'blob name', data: 'asdf' }),
      id,
      name: '',
    })
  }
}
