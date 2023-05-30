const dateAnsiToIso: RosterMechanics.Utils.Date.Fn.DateAnsiToIso = async (stringDate: string): Promise<string> => {
  return await new Promise((resolve) => {
    const nonEmptyOrNullDate = stringDate
    const date = new Date(nonEmptyOrNullDate)
    const dateIso = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    resolve(dateIso)
  })
}

export default dateAnsiToIso
