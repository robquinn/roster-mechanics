const sortAlphabetically: RosterMechanics.Utils.Format.Fn.SortAlphabetically = async ({
  array,
  firstNameCol,
  lastNameCol,
}: {
  array: string[][]
  firstNameCol: number
  lastNameCol: number
}): Promise<string[][]> => {
  return await new Promise((resolve) => {
    const sortedArray = array.sort((a, b): number => {
      const aFirst = a[firstNameCol]
      const bFirst = b[firstNameCol]
      const aLast = a[lastNameCol]
      const bLast = b[lastNameCol]

      if (aFirst === 'First Name') return -1
      if (bFirst === 'First Name') return 1
      if (aLast === bLast) return 0
      if (aLast === 'Last Name') return -1
      if (bLast === 'Last Name') return 1

      if (aFirst === bFirst) {
        if (aLast < bLast) return -1
        if (aLast > bLast) return 1
        return 0
      }
      if (aFirst < bFirst) return -1
      return 1
    })
    resolve(sortedArray)
  })
}

export default sortAlphabetically
