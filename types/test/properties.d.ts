declare namespace RosterMechanics {
  namespace Test {
    namespace Properties {
      type Storage = Map<string, string>
      interface IProperties {
        deleteAllProperties: () => IProperties
        deleteProperty: (key: string) => IProperties
        getKeys: () => string[]
        getProperties: () => Record<string, string>
        getProperty: (key: string) => string | null
        setProperties: (properties: Record<string, string>, deleteAllOthers: boolean | undefined) => IProperties
        setProperty: (key: string, value: string) => IProperties
      }
    }
  }
}
