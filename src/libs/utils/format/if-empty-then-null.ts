const ifEmptyThenNull: RosterMechanics.Utils.Format.Fn.IfEmptyThenNull = async (
  value: string,
): Promise<string | null> => {
  return await new Promise((resolve) => {
    if (value == null || value.length === 0) {
      resolve(null)
    }
    resolve(value)
  })
}

export default ifEmptyThenNull
