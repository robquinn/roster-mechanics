import byteLength from './byte-length'

/**
 * Returns the length of the string to save in the stroage based on its limitation
 *
 * @param {Object / Array} value to be stored
 * @param {String} type cache / property
 * @return {Number} length of the string
 */
const getChunkSize: RosterMechanics.Utils.Cache.Fn.GetChunkSize = async (
  value: string,
  type: RosterMechanics.Utils.Cache.Storage.Type,
): Promise<number> => {
  // Sets the max limit of a chunk. For cache, it is 95KB and for property it is 8.5KB
  const sizeLimit = (type === 'cache' ? 95 : 8.5) * 1024

  let newValue = value
  let byteSize = await byteLength(newValue)

  while (byteSize > sizeLimit) {
    // Slices the string in half till it is within the size limit
    newValue = value.slice(0, newValue.length / 2)
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-await-in-loop,new-cap */
    byteSize = await byteLength(newValue)
  }

  return await Promise.resolve(newValue.length)
}

export default getChunkSize
