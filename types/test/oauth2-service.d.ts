declare namespace RosterMechanics {
  namespace Test {
    namespace OAuth2Service {
      interface IOAuth2Service {
        getAccessToken: () => string
        getLastError: () => unknown
        hasAccess: () => boolean
        reset: () => void
        setIssuer: (issuer: string) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
        setPrivateKey: (privateKey: string) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
        setPropertyStore: (
          propertyStore: RosterMechanics.Test.PropertiesService.IPropertiesService,
        ) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
        setScope: (
          scope: string | readonly string[],
          separator?: string,
        ) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
        setSubject: (subject: string) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
        setTokenUrl: (tokenUrl: string) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
      }
    }
  }
}
