declare namespace RosterMechanics {
  namespace Test {
    namespace CacheService {
      interface ICacheService {
        getDocumentCache: () => RosterMechanics.Test.Cache.ICache
        getScriptCache: () => RosterMechanics.Test.Cache.ICache
        getUserCache: () => RosterMechanics.Test.Cache.ICache
      }
    }
  }
}
