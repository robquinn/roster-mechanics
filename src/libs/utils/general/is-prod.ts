const isProd: RosterMechanics.Utils.General.Fn.IsProd = async (): Promise<boolean> =>
  await new Promise((resolve) => {
    resolve(process.env.NODE_ENV === 'production')
  })

export default isProd
