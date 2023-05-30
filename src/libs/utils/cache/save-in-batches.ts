import getChunkSize from './get-chunk-size'
import getSetStorage from './get-set-storage'
import replacer from './replacer'

/**
 * Saves the property without the Argument too large error
 *
 * @param {String} name of the property
 * @param {Object / Array} value of the property
 * @param {String} type of the storage property / cache
 * @param {String} scope of the storage user / document / script
 */
const saveInBatches: RosterMechanics.Utils.Cache.Fn.SaveInBatches = async (
  name: string,
  value: object | unknown,
  type: RosterMechanics.Utils.Cache.Storage.Type = 'property',
  scope: RosterMechanics.Utils.Cache.Storage.Scope = 'user',
): Promise<void> => {
  const jsonStr = JSON.stringify(value, replacer)
  const strSliceLength = await getChunkSize(jsonStr, type)

  // Number of iteration to perform
  const totalChunkedIterations = Math.ceil(jsonStr.length / strSliceLength)
  let counter = 0

  const getSetStoragePromises = []
  for (let i = 0; i < jsonStr.length; i += strSliceLength) {
    const prop = jsonStr.slice(i, i + strSliceLength)

    getSetStoragePromises.push(getSetStorage(type, `${name}_${counter}`, scope, 'string', 'set', prop))
    counter += 1
  }
  await Promise.all(getSetStoragePromises)

  // Stores the total number of chunks stored to be used when retrieving
  await getSetStorage(type, `${name}_total`, scope, 'number', 'set', totalChunkedIterations)
}

export default saveInBatches
