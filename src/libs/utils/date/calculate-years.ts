const calculateYears: RosterMechanics.Utils.Date.Fn.CalculateYears = async (
  sincedate: string | null,
): Promise<string> => {
  return await new Promise((resolve, _reject) => {
    if (sincedate != null && sincedate.length > 0) {
      const datenew = new Date(sincedate)
      const dateold = new Date(Date.now())
      const ynew = datenew.getFullYear() + 1
      const mnew = datenew.getMonth()
      const dnew = datenew.getDate()
      const yold = dateold.getFullYear()
      const mold = dateold.getMonth()
      const dold = dateold.getDate()
      let diff = ynew - yold
      if (mold > mnew) diff -= 1
      else if (mold === mnew) {
        if (dold > dnew) diff -= 1
      }
      resolve(Math.abs(diff).toString())
    } else {
      resolve('')
    }
  })
}

export default calculateYears
