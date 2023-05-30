const licenseNumberHyperlink: RosterMechanics.Utils.Format.Fn.LicenseNumber = async ({
  number,
  link,
}: {
  number: string | null
  link: string | null
}): Promise<string> => {
  return await new Promise((resolve, _reject) => {
    if (link != null && link.length > 0 && number != null && number.length > 0) {
      resolve(`=HYPERLINK("${link}","${number}")`)
    } else if ((link == null || link.length === 0) && number != null && number.length > 0) {
      resolve(number)
    } else {
      resolve('')
    }
  })
}

export default licenseNumberHyperlink
