/* eslint-disable no-unused-vars,class-methods-use-this,@typescript-eslint/no-unused-vars  */
import OAuth2Service from './oauth2-service'

type IOAuth2 = RosterMechanics.Test.OAuth2.IOAuth2

export default class OAuth2 implements IOAuth2 {
  // TOKEN_FORMAT: TokenFormat

  createService(serviceName: string): RosterMechanics.Test.OAuth2Service.IOAuth2Service {
    return new OAuth2Service()
  }

  // getRedirectUri(scriptId?: string): string {}
}
