const dateForBackup: RosterMechanics.Utils.Date.Fn.DateForBackup = async (): Promise<string> => {
  return await new Promise((resolve, _reject) => {
    const currentdate = new Date()
    const datetime = `${
      currentdate.getMonth() + 1
    }/${currentdate.getDate()}/${currentdate.getFullYear()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
    resolve(datetime)
  })
}
export default dateForBackup
