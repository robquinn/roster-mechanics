/**
 * Converts string to byte length
 *
 * @param {String} str string value to be converted to size
 * @return {Number} byte size of the string passed
 */
const byteLength: RosterMechanics.Utils.Cache.Fn.ByteLength = async (str: string): Promise<number> => {
  return await new Promise((resolve) => {
    // returns the byte length of an utf8 string
    let s = str.length
    for (let i = str.length - 1; i >= 0; i -= 1) {
      const code = str.charCodeAt(i)
      if (code > 0x7f && code <= 0x7ff) s += 1
      else if (code > 0x7ff && code <= 0xffff) s += 2
      if (code >= 0xdc00 && code <= 0xdfff) i -= 1 // trail surrogate
    }
    resolve(s)
  })
}

export default byteLength
