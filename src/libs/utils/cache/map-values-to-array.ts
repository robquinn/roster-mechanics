const mapValuesToArray: RosterMechanics.Utils.Cache.Fn.MapValuesToArray = async (
  map: RosterMechanics.Utils.Cache.Batches.UsersBatch,
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]> =>
  await new Promise((resolve) => {
    resolve(Array.from(map.values()))
  })

export default mapValuesToArray
