type IProperties = RosterMechanics.Test.Properties.IProperties

export default class Properties implements IProperties {
  private _storage: RosterMechanics.Test.Properties.Storage
  constructor() {
    this._storage = new Map<string, string>()
  }

  private get storage(): RosterMechanics.Test.Properties.Storage {
    return this._storage
  }

  private set storage(storage: RosterMechanics.Test.Properties.Storage) {
    this._storage = storage
  }

  deleteAllProperties(): RosterMechanics.Test.Properties.IProperties {
    this.storage.clear()
    return this
  }

  deleteProperty(key: string): RosterMechanics.Test.Properties.IProperties {
    this.storage.delete(key)
    return this
  }

  getKeys(): string[] {
    return Array.from(this.storage?.keys())
  }

  getProperties(): Record<string, string> {
    return Object.fromEntries(this.storage)
  }

  getProperty(key: string): string | null {
    const value = this.storage.get(key)
    return value != null ? value : null
  }

  setProperties(
    properties: Record<string, string>,
    deleteAllOthers: boolean | undefined,
  ): RosterMechanics.Test.Properties.IProperties {
    if (deleteAllOthers === true) {
      this.storage = new Map(Object.entries(properties))
    } else {
      Object.entries(properties).forEach(([key, value]: [string, string]) => {
        this.storage.set(key, value)
      })
    }
    return this
  }

  setProperty(key: string, value: string): RosterMechanics.Test.Properties.IProperties {
    this.storage.set(key, value)
    return this
  }
}
