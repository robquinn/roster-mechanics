const dateGoogle: RosterMechanics.Utils.Date.Fn.DateGoogle = async (date: string): Promise<string> => {
  return await new Promise((resolve) => {
    const now = new Date(date)
    const dateG = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd')
    resolve(dateG)
  })
}

export default dateGoogle
