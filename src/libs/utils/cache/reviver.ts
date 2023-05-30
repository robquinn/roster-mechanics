const reviver: RosterMechanics.Utils.Cache.Fn.Reviver = (
  key: string,
  value: { dataType: string; value: Array<[string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser]> | unknown },
): unknown => {
  if (typeof value === 'object' && value !== null && value.dataType === 'map') {
    return new Map(value.value as Array<[string, RosterMechanics.GoogleApps.Admin.Schema.GoogleUser]>)
  }
  return value
}

export default reviver
