const dateIsoToAnsi: RosterMechanics.Utils.Date.Fn.DateIsoToAnsi = async (
  dategiven: string | null,
): Promise<string> => {
  return await new Promise((resolve) => {
    if (dategiven != null && dategiven.length > 0) {
      const oldDate = dategiven.toString().split('-')
      resolve(`${oldDate[1]}/${oldDate[2]}/${oldDate[0]}`)
    }
    resolve('')
  })
}

export default dateIsoToAnsi
