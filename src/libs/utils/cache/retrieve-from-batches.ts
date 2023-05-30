/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import getSetStorage from './get-set-storage'
import reviver from './reviver'

/**
 * Retreive the property in batches to avoid Argument too large error
 *
 * @param {String} name of the property
 * @param {String} type of the storage property / cache
 * @param {String} scope of the storage user / document / script
 * @return saved value in the property after fetching from batches
 */
const retrieveFromBatches: RosterMechanics.Utils.Cache.Fn.RetrieveFromBatches = async (
  name: string,
  type: RosterMechanics.Utils.Cache.Storage.Type = 'property',
  scope: RosterMechanics.Utils.Cache.Storage.Scope = 'user',
): Promise<
  RosterMechanics.Utils.Cache.Batches.UsersBatch | RosterMechanics.Utils.Cache.Batches.DeletedUsersBatch | undefined
> => {
  const count = Number(await getSetStorage(type, `${name}_total`, scope, 'number')) || 0
  if (count === 0)
    return await new Promise((resolve) => {
      resolve(undefined)
    })

  let jsonStr = ''

  for (let i = 0; i < count; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const tempStr = await getSetStorage(type, `${name}_${i}`, scope, 'string')

    // JSON string is stitched here
    jsonStr += tempStr
  }

  return await new Promise<RosterMechanics.Utils.Cache.Batches.UsersBatch>((resolve) => {
    resolve(JSON.parse(jsonStr, reviver) as RosterMechanics.Utils.Cache.Batches.UsersBatch)
  })
  // JSON string is parsed and returned
}
export default retrieveFromBatches
