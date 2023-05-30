declare namespace RosterMechanics {
  namespace Test {
    namespace Cache {
      type Storage = Map<string, string>
      interface ICache {
        get: (key: string) => string | null
        getAll: (keys: string[]) => Record<string, string>
        put: (key: string, value: string, expirationInSeconds: number | undefined) => void
        putAll: (values: Record<string, string>, expirationInSeconds: number | undefined) => void
        remove: (key: string) => void
        removeAll: (keys: string[]) => void
      }
    }
  }
}
