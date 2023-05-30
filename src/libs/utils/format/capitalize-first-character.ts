const capitalizeFirstChar: RosterMechanics.Utils.Format.Fn.CapitalizeFirstChar = async (
  name: string,
): Promise<string> => {
  return await new Promise((resolve, _reject) => {
    const capitalized = name.charAt(0).toUpperCase() + name.substring(1)
    resolve(capitalized)
  })
}

export default capitalizeFirstChar
