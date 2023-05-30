type IBlob = RosterMechanics.Test.Blob.IBlob

export default class Blob implements IBlob {
  private readonly data
  private name
  private readonly contentType

  constructor({ contentType, name, data }: { contentType: string; name: string; data: string }) {
    this.data = data
    this.name = name
    this.contentType = contentType
  }

  getAs(contentType: string): RosterMechanics.Test.Blob.IBlob {
    return new Blob({ contentType, name: 'blob name', data: this.data })
  }

  setName(name: string): RosterMechanics.Test.Blob.IBlob {
    this.name = name
    return this
  }
}
