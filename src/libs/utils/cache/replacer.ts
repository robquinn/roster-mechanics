const replacer: RosterMechanics.Utils.Cache.Fn.Replacer = (key: string, value: unknown): unknown => {
  if (value instanceof Map) {
    return {
      dataType: 'map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    }
  }
  return value
}

export default replacer
