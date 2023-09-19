/* eslint-disable class-methods-use-this */

type IFile = RosterMechanics.Test.File.IFile

export default class File implements IFile {
  private readonly blob: RosterMechanics.Test.Blob.IBlob
  private name: string
  private readonly id: string

  constructor({ id, name, blob }: { id: string; name: string; blob: RosterMechanics.Test.Blob.IBlob }) {
    this.blob = blob
    this.name = name
    this.id = id
  }

  createFile(blob: GoogleAppsScript.Base.BlobSource): RosterMechanics.Test.File.IFile {
    return new File({ blob, id: 'File id', name: 'File Name' })
  }

  setName(name: string): RosterMechanics.Test.File.IFile {
    this.name = name
    return this
  }

  getName(): string {
    return this.name
  }

  getBlob(): RosterMechanics.Test.Blob.IBlob {
    return this.blob
  }
}
