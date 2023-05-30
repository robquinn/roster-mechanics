import dateIsoToAnsi from '../date/date-iso-to-ansi'

const ninjaOut: RosterMechanics.Utils.Format.Fn.NinjaOut = async (stringNinja: string): Promise<string> => {
  const dateAnsi = dateIsoToAnsi(stringNinja)
  return await new Promise((resolve) => {
    if (stringNinja === 'NOT_NINJA') {
      resolve('')
    }
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
    if (stringNinja != null && stringNinja.length > 0) {
      // const oldDate = stringNinja.toString().split('-')
      // resolve(`${oldDate[1]}/${oldDate[2]}/${oldDate[0]}`)
      resolve(dateAnsi)
    }
    resolve('')
  })
}
export default ninjaOut
