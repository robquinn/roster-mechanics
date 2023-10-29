const isNinja: RosterMechanics.Utils.General.Fn.IsNinja = async (stringNinja: string): Promise<boolean> =>
  await new Promise((resolve) => {
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/
    if (
      stringNinja === 'Ninja' ||
      stringNinja === 'Ninja+' ||
      stringNinja === 'Ninja++' ||
      stringNinja === '気' ||
      stringNinja === '気+' ||
      stringNinja === '気++' ||
      dateRegex.test(stringNinja)
    ) {
      resolve(true)
    } else {
      resolve(false)
    }
  })

export default isNinja
