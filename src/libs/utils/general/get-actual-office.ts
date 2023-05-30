const getActualOffice: RosterMechanics.Utils.General.Fn.GetActualOffice = async (
  office: RosterMechanics.Utils.General.Offices.Office,
): Promise<RosterMechanics.Utils.General.Offices.Office> => {
  return await new Promise((resolve) => {
    let actualOffice: RosterMechanics.Utils.General.Offices.Office
    /* eslint-disable */
    switch (office) {
      case "Lyon's Den - PP":
        actualOffice = 'Pinnacle Peak'
        break
      case "Lyon's Den - CF":
        actualOffice = 'Carefree'
        break
      case "Lyon's Den - PR":
        actualOffice = 'Prescott'
        break
      case "Lyon's Den - CT":
        actualOffice = 'Camelback Tower'
        break
      case "Lyon's Den - TUC":
        actualOffice = 'Tucson'
        break
      case "Lyon's Den - TUB":
        actualOffice = 'Tubac'
        break
      case "Lyon's Den - FLG":
        actualOffice = 'Flagstaff'
        break
      case "Lyon's Den - DM":
        actualOffice = 'Desert Mountain'
        break
      case "Lyon's Den - SEV":
        actualOffice = 'Southeast Valley'
        break
      case "Lyon's Den - FH":
        actualOffice = 'Fountain Hills'
        break
      case "Lyon's Den - SED":
        actualOffice = 'Sedona'
        break
      case "Lyon's Den - WV":
        actualOffice = 'West Valley'
        break
      default:
        actualOffice = office
        break
    }
    resolve(actualOffice)
  })
}

export default getActualOffice
