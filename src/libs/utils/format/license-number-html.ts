const licenseNumberHTML: RosterMechanics.Utils.Format.Fn.LicenseNumberHTML = async ({
  number,
  link,
}: {
  number: string
  link: string
}): Promise<string> => {
  return await new Promise((resolve, _reject) => {
    if (link.length > 0) {
      resolve(`<a href="${link}">${number}</a>`)
    } else {
      resolve(number)
    }
  })
}

export default licenseNumberHTML
