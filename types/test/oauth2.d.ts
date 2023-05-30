declare namespace RosterMechanics {
  namespace Test {
    namespace OAuth2 {
      interface IOAuth2 {
        createService: (serviceName: string) => RosterMechanics.Test.OAuth2Service.IOAuth2Service
      }
    }
  }
}
