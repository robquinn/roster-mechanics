import PropertiesService from './properties-service'

type IOAuth2Service = RosterMechanics.Test.OAuth2Service.IOAuth2Service

export default class OAuth2Service implements IOAuth2Service {
  private issuer: string
  private privateKey: string
  private propertyStore: RosterMechanics.Test.PropertiesService.IPropertiesService
  private scope: { scope: string | readonly string[]; separator: string | undefined }
  private subject: string
  private tokenUrl: string
  private access: boolean
  private accessToken: string
  private lastError

  constructor() {
    this.issuer = ''
    this.privateKey = ''
    this.propertyStore = new PropertiesService()
    this.scope = { scope: '', separator: ',' }
    this.subject = ''
    this.tokenUrl = ''
    this.access = true
    this.accessToken = 'asdflkajsdflkjasdflkjsdflkj2349u239'
    this.lastError = new Error('OAuth2 Service error')
  }

  getAccessToken(): string {
    return this.accessToken
  }

  // getAuthorizationUrl(optAdditionalParameters?: object): string {}
  // getIdToken(): string | undefined {}
  // getStorage(): Storage {}
  getLastError(): unknown {
    return this.lastError
  }

  // getRedirectUri(): string {}
  // getToken(optSkipMemoryCheck?: boolean): object | null {}
  // handleCallback(callbackRequest: object): boolean {}
  hasAccess(): boolean {
    return this.access
  }

  // refresh(): void {}
  reset(): void {
    this.issuer = ''
    this.privateKey = ''
    this.propertyStore = new PropertiesService()
    this.scope = { scope: '', separator: ',' }
    this.subject = ''
    this.tokenUrl = ''
    this.access = true
    this.accessToken = 'asdflkajsdflkjasdflkjsdflkj2349u239'
    this.lastError = new Error('OAuth2 Service error')
  }

  // setAdditionalClaims(additionalClaims: Record<string, string>): OAuth2Service {}
  // setAuthorizationBaseUrl(authorizationBaseUrl: string): OAuth2Service {}
  // setCache(cache: GoogleAppsScript.Cache.Cache): OAuth2Service {}
  // setLock(lock: GoogleAppsScript.Lock.Lock): OAuth2Service {}
  // setCallbackFunction(callbackFunctionName: string): OAuth2Service {}
  // setClientId(clientId: string): OAuth2Service {}
  // setClientSecret(clientSecret: string): OAuth2Service {}
  // setExpirationMinutes(expirationMinutes: string): OAuth2Service {}
  // setGrantType(grantType: string): OAuth2Service {}
  setIssuer(issuer: string): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    this.issuer = issuer
    return this
  }

  // setParam(name: string, value: string): OAuth2Service {}
  setPrivateKey(privateKey: string): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    this.privateKey = privateKey
    return this
  }

  setPropertyStore(
    propertyStore: RosterMechanics.Test.PropertiesService.IPropertiesService,
  ): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    this.propertyStore = propertyStore
    return this
  }

  // setRedirectUri(redirectUri: string): OAuth2Service {}
  // setRefreshUrl(refreshUrl: string): OAuth2Service {}
  setScope(scope: string | readonly string[], separator?: string): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    this.scope = { scope, separator }
    return this
  }

  setSubject(subject: string): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    this.subject = subject
    return this
  }

  // setTokenFormat(tokenFormat: TokenFormat): OAuth2Service {}
  // setTokenHeaders(tokenHeaders: Record<string, string>): OAuth2Service {}
  // setTokenPayloadHandler(tokenHandler: (tokenPayload: TokenPayload) => object): OAuth2Service {}
  setTokenUrl(tokenUrl: string): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    this.tokenUrl = tokenUrl
    return this
  }
}
