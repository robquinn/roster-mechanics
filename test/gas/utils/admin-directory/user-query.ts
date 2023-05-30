const adminDirectoryUserQuery: RosterMechanics.Test.Utils.Fn.AdminDirectoryUserQuery = <T extends string>(
  q: T,
): RosterMechanics.Test.Utils.AdminDirectoryQuery.Query<T> => {
  const parts = q.toString().split(' ')
  const obj: RosterMechanics.Test.Utils.AdminDirectoryQuery.Query<T> | Record<string, unknown> = {}

  parts.forEach((part) => {
    const key = part.split(/=(.*)/s)[0]
    let value: boolean | string = part.split(/=(.*)/s)[1].toString().replaceAll('(\'|")', '')

    if (value === 'true') value = true
    if (value === 'false') value = false

    if (key.includes('.')) {
      const keyParts = key.split('.')
      obj[keyParts[0]] = { ...(obj[keyParts[0]] as object) }
      ;(obj as Record<string, Record<string, string | boolean>>)[keyParts[0]][keyParts[1]] = value
    } else {
      obj[key] = value
    }
  })

  return obj as RosterMechanics.Test.Utils.AdminDirectoryQuery.Query<T>
}

export default adminDirectoryUserQuery
