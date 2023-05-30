declare namespace RosterMechanics {
  namespace Test {
    namespace PropertiesService {
      interface IPropertiesService {
        getDocumentProperties: () => RosterMechanics.Test.Properties.IProperties
        getScriptProperties: () => RosterMechanics.Test.Properties.IProperties
        getUserProperties: () => RosterMechanics.Test.Properties.IProperties
      }
    }
  }
}
