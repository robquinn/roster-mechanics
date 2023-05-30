const generalSheetHeaders: RosterMechanics.GoogleApps.Sheet.Fn.GeneralSheetHeaders = async (): Promise<string[]> =>
  await new Promise((resolve) => {
    const generalHeaders = ['First Name', 'Last Name', 'Office', 'Ninja', 'Phone', 'Email', 'Role']
    resolve(generalHeaders)
  })

export default generalSheetHeaders
