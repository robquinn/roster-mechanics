import dateAnsiToIso from '../date/date-ansi-to-iso'

const ninjaIn: RosterMechanics.Utils.Format.Fn.NinjaIn = async (stringNinja: string): Promise<string> => {
  const dateIso = dateAnsiToIso(stringNinja)
  return await new Promise((resolve) => {
    if (
      stringNinja === 'Ninja' ||
      stringNinja === 'Ninja+' ||
      stringNinja === 'Ninja++' ||
      stringNinja === '気' ||
      stringNinja === '気+' ||
      stringNinja === '気++' ||
      stringNinja === ''
    ) {
      resolve(stringNinja)
    }
    resolve(dateIso)
  })
}

export default ninjaIn
