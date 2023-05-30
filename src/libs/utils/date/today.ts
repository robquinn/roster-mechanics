const today: RosterMechanics.Utils.Date.Fn.Today = async (): Promise<string> => {
  return await new Promise((resolve) => {
    const date = new Date(Date.now())
    resolve(`${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`)
  })
}

export default today
