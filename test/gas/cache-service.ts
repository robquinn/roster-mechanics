import Cache from './cache'

type ICacheService = RosterMechanics.Test.CacheService.ICacheService

export default class CacheService implements ICacheService {
  private readonly document: RosterMechanics.Test.Cache.ICache
  private readonly script: RosterMechanics.Test.Cache.ICache
  private readonly user: RosterMechanics.Test.Cache.ICache
  constructor() {
    this.document = new Cache()
    this.script = new Cache()
    this.user = new Cache()
  }

  getDocumentCache(): RosterMechanics.Test.Cache.ICache {
    return this.document
  }

  getScriptCache(): RosterMechanics.Test.Cache.ICache {
    return this.script
  }

  getUserCache(): RosterMechanics.Test.Cache.ICache {
    return this.user
  }
}
