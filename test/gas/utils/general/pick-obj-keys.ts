const pickObjKeys: RosterMechanics.Test.Utils.Fn.PickObjKeys = <T extends object, K extends string>(
  obj: T,
  paths: K[],
): RosterMechanics.Test.Utils.PickObjKeys.PickByDotNotation<T, K> => {
  let newObj: Record<string, unknown> = {}

  paths.forEach((path) => {
    const value = path.split('.').reduce(
      (prev: T, curr: string): T => {
        return prev[curr as keyof typeof prev] as T
      },
      { ...obj },
    ) as unknown

    const buildObj = (key: string, val: unknown): Record<string, unknown> => {
      let object: Record<string | number | symbol, unknown>
      // eslint-disable-next-line no-multi-assign
      const result = (object = {})
      const arr = key.split('.')
      for (let i = 0; i < arr.length - 1; i += 1) {
        // eslint-disable-next-line no-multi-assign
        object = object[arr[i]] = {}
      }
      object[arr[arr.length - 1]] = val
      return result
    }

    if (value !== undefined) {
      newObj = Object.assign(newObj, {
        ...buildObj(path, value),
      })
    }
  })
  return newObj as RosterMechanics.Test.Utils.PickObjKeys.PickByDotNotation<T, K>
}

export default pickObjKeys
