const makeQueryParams: RosterMechanics.Utils.General.Fn.MakeQueryParams = async (
  params: Record<string, unknown>,
): Promise<string> => {
  return await new Promise((resolve) => {
    let str = '?'

    const concatParam = (key: string | number | symbol, value: string | number | symbol | null | undefined): void => {
      const keyValue = `${key as string}=${value as string}`
      if (str === '?') str = str.concat(keyValue)
      else str = str.concat(`&${keyValue}`)
    }
    Object.keys(params).forEach((key) => {
      const value = params[key]
      switch (true) {
        case typeof value === 'object' && Array.isArray(value):
          ;(value as Array<string | number | symbol>).forEach((v) => {
            concatParam(key, v)
          })
          break
        case typeof value === 'object' && value !== null:
          Object.entries(value as object).forEach(
            ([k, v]: [string | number | symbol, string | number | symbol | null | undefined]) => {
              concatParam(k, v)
            },
          )
          break
        case typeof value === 'object' && value === null:
        case typeof value === 'boolean':
        case typeof value === 'number':
        case typeof value === 'string':
        case typeof value === 'symbol':
        case typeof value === 'undefined':
        case typeof value === 'bigint':
        case typeof value === 'function':
        default:
          concatParam(key, value as string | number | symbol | null | undefined)
          break
      }
    })

    resolve(str)
  })
}

export default makeQueryParams
