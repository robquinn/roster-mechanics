import GoogleCloudConsoleConfig from '../../config/google/cloud'
import makeQueryParams from '../utils/general/make-query-params'

type IGoogleServiceAccount = RosterMechanics.GoogleApis.ServiceAccount.IGoogleServiceAccount

export default class GoogleServiceAccount implements IGoogleServiceAccount {
  private PRIVATE_KEY = ''
  private CLIENT_EMAIL = ''
  private readonly USER_EMAIL: string

  private readonly serviceName: string
  private readonly scopes: string
  /*
   * This sample demonstrates how to configure the library for Google APIs, using
   * domain-wide delegation (Service Account flow).
   * https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
   */

  // Private key and client email of the service account.
  constructor({ userEmail, serviceName, scopes }: { userEmail: string; serviceName: string; scopes: string }) {
    this.USER_EMAIL = userEmail

    this.serviceName = serviceName
    this.scopes = scopes
    this.setCreds()
      .then(() => {
        return true
      })
      .catch((err) => {
        console.log('GoogleServiceAccount setCreds err', err)
      })
  }

  // public getCreds(): { privateKey: string; clientEmail: string } {
  //   return { privateKey: this.PRIVATE_KEY, clientEmail: this.CLIENT_EMAIL }
  // }

  public getUserEmail(): string {
    return this.USER_EMAIL
  }

  /**
   * Authorizes and makes a request to the Google Drive API.
   */
  public async run({
    url,
    method,
    payload = {},
  }: {
    url: string
    method: GoogleAppsScript.URL_Fetch.HttpMethod
    payload?: {
      query?: RosterMechanics.GoogleApis.ServiceAccount.Request.Query
      body?: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
    }
  }): Promise<JSON> {
    const requestUrl =
      Object.prototype.hasOwnProperty.call(payload, 'query') &&
      Object.keys(payload.query as RosterMechanics.GoogleApis.ServiceAccount.Request.Query).length > 0
        ? url + (await makeQueryParams(payload.query as RosterMechanics.GoogleApis.ServiceAccount.Request.Query))
        : url
    return await new Promise((resolve, reject) => {
      const service = this.getService_()
      if (service.hasAccess()) {
        const response = UrlFetchApp.fetch(requestUrl, {
          muteHttpExceptions: true,
          method,
          contentType: 'application/json',
          payload:
            Object.prototype.hasOwnProperty.call(payload, 'body') &&
            Object.keys(payload.body as RosterMechanics.GoogleApis.ServiceAccount.Request.Body).length > 0
              ? JSON.stringify(payload.body)
              : undefined,
          headers: {
            Authorization: `Bearer ${service.getAccessToken()}`,
          },
        })
        const responseCode = response.getResponseCode()
        const responseBody = response.getContentText()

        if (responseCode === 200) {
          const result = JSON.parse(responseBody) as JSON
          resolve(result)
        } else {
          console.log(Utilities.formatString('Request failed. Expected 200, got %d: %s', responseCode, responseBody))
          reject(responseBody)
        }
      } else {
        const err = service.getLastError() as unknown
        console.log(err)
        reject(err)
      }
    })
  }

  /**
   * Reset the authorization state, so that it can be re-tested.
   */
  public reset(): void {
    this.getService_().reset()
  }

  private async setCreds(): Promise<void> {
    this.PRIVATE_KEY = (await GoogleCloudConsoleConfig).serviceAccount.private_key
    this.CLIENT_EMAIL = (await GoogleCloudConsoleConfig).serviceAccount.client_email
  }

  /**
   * Configures the service.
   */
  private getService_(): GoogleAppsScriptOAuth2.OAuth2Service {
    return (
      OAuth2.createService(`${this.serviceName}:${this.USER_EMAIL}`)
        // Set the endpoint URL.
        .setTokenUrl('https://oauth2.googleapis.com/token')

        // Set the private key and issuer.
        .setPrivateKey(this.PRIVATE_KEY)
        .setIssuer(this.CLIENT_EMAIL)

        // Set the name of the user to impersonate. This will only work for
        // Google Apps for Work/EDU accounts whose admin has setup domain-wide
        // delegation:
        // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
        .setSubject(this.USER_EMAIL)

        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getScriptProperties())

        // Set the scope. This must match one of the scopes configured during the
        // setup of domain-wide delegation.
        .setScope(this.scopes)
    )
  }
}
