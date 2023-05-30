import Blob from './blob'

type IHTTPResponse = RosterMechanics.Test.HTTPResponse.IHTTPResponse

export default class HTTPResponse implements IHTTPResponse {
  private readonly headers
  private readonly response
  private readonly code

  constructor({ headers, response, code }: { headers: object; response: string; code: number }) {
    this.headers = headers
    this.response = response
    this.code = code
  }

  getAllHeaders(): object {
    return this.headers
  }

  getAs(contentType: string): RosterMechanics.Test.Blob.IBlob {
    return new Blob({ contentType, name: 'blob name', data: this.response })
  }

  getBlob(): RosterMechanics.Test.Blob.IBlob {
    return new Blob({ contentType: 'text/plain', name: 'blob name', data: this.response })
  }

  //   getContent(): Byte[] {
  //     return this.response
  //   }

  getContentText(): string {
    return this.response
  }

  //   getContentText(charset: string): string {
  //     return this.response
  //   }

  getHeaders(): object {
    return this.headers
  }

  getResponseCode(): number {
    return this.code
  }
}
