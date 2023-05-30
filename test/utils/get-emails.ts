const getEmails: RosterMechanics.Test.Utils.Fn.getEmails = async (
  adminUsers: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
): Promise<string[]> =>
  await new Promise((resolve) => {
    const emails = adminUsers.map((u) => u.primaryEmail as string)
    resolve(emails)
  })

export default getEmails
