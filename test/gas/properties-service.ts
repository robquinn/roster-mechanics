import Properties from './properties'

type IPropertiesService = RosterMechanics.Test.PropertiesService.IPropertiesService

export default class PropertiesService implements IPropertiesService {
  private readonly document: RosterMechanics.Test.Properties.IProperties
  private readonly script: RosterMechanics.Test.Properties.IProperties
  private readonly user: RosterMechanics.Test.Properties.IProperties
  constructor() {
    this.document = new Properties()
    this.script = new Properties()
    this.user = new Properties()
  }

  getDocumentProperties(): RosterMechanics.Test.Properties.IProperties {
    return this.document
  }

  getScriptProperties(): RosterMechanics.Test.Properties.IProperties {
    return this.script
  }

  getUserProperties(): RosterMechanics.Test.Properties.IProperties {
    return this.user
  }
}
