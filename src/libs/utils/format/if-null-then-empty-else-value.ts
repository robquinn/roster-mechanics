const ifNullThenEmptyElseValue: RosterMechanics.Utils.Format.Fn.IfNullThenEmptyElseValue = async (
  value: string | boolean | null | undefined,
): Promise<string> => {
  return await new Promise((resolve) => {
    if (value == null) {
      resolve('')
    }
    if (typeof value === 'string') {
      resolve(value)
    }
    if (typeof value === 'boolean') {
      resolve(value ? 'Yes' : '')
    }
    resolve(value == null ? '' : value.toString())
  })
}

export default ifNullThenEmptyElseValue
