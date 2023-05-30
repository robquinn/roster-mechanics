import pickObjKeys from './utils/general/pick-obj-keys'

type ICache = RosterMechanics.Test.Cache.ICache

export default class Cache implements ICache {
  private _storage: RosterMechanics.Test.Cache.Storage

  constructor() {
    this._storage = new Map<string, string>()
  }

  private get storage(): RosterMechanics.Test.Cache.Storage {
    return this._storage
  }

  private set storage(storage: RosterMechanics.Test.Cache.Storage) {
    this._storage = storage
  }

  get(key: string): string | null {
    const value = this.storage.get(key)
    return value != null ? value : null
  }

  getAll(keys: string[]): Record<string, string> {
    return pickObjKeys(Object.fromEntries(this.storage), keys)
  }

  put(key: string, value: string, expirationInSeconds: number | undefined): void {
    this.storage.set(key, value)
    if (expirationInSeconds != null && Number.isInteger(expirationInSeconds)) {
      const deleteValue = async (): Promise<void> => {
        await new Promise<void>((resolve): void => {
          const timeoutRef = setTimeout((): void => {
            this.remove(key)
            resolve()
          }, expirationInSeconds * 1000)
          // avoid jest open handle error
          timeoutRef.unref()
        })
      }
      deleteValue()
        .then(() => ({}))
        .catch((err) => {
          console.log(err)
        })
    }
  }

  putAll(values: Record<string, string>, expirationInSeconds: number | undefined): void {
    Object.entries(values).forEach(([key, value]: [string, string]) => {
      this.storage.set(key, value)
    })
    if (expirationInSeconds != null && Number.isInteger(expirationInSeconds)) {
      const deleteValues = async (): Promise<void> => {
        await new Promise<void>((resolve) => {
          const timeoutRef = setTimeout(() => {
            this.removeAll(Object.keys(values))
            resolve()
          }, expirationInSeconds * 1000)
          // avoid jest open handle error
          timeoutRef.unref()
        })
      }
      deleteValues()
        .then(() => ({}))
        .catch((err) => {
          console.log(err)
        })
    }
  }

  remove(key: string): void {
    this.storage.delete(key)
  }

  removeAll(keys: string[]): void {
    keys.forEach((key) => {
      this.storage.delete(key)
    })
  }
}
