const spreadsheetAddMenuFieldsValidation: RosterMechanics.Test.SpreadsheetApp.Fn.SpreadsheetAddMenuFieldsValidation = (
  name: string,
  subMenus: Array<{ name: string; functionName: string } | null>,
): void => {
  if (typeof name !== 'string') {
    throw new Error('Spreadsheet addMenu param name should be a string')
  }
  subMenus.forEach((subMenu) => {
    if (subMenu != null && typeof subMenu?.name !== 'string') {
      throw new Error('Spreadsheet addMenu param subMenus[].name should be a string')
    }
    if (subMenu != null && typeof subMenu?.functionName !== 'string') {
      throw new Error('Spreadsheet addMenu param subMenus[].functionName should be a string')
    }
  })
}

export default spreadsheetAddMenuFieldsValidation
