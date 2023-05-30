export const orderUsersByEmail: RosterMechanics.Test.Utils.Fn.OrderUsersByEmail = (
  users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] => {
  const usersWithEmails = users.filter((u) => u.primaryEmail != null)
  const usersWithoutEmails = users.filter((u) => u.primaryEmail == null)
  usersWithEmails.sort((a, b) => {
    if ((a.primaryEmail as string) < (b.primaryEmail as string)) {
      return -1
    }
    if ((a.primaryEmail as string) > (b.primaryEmail as string)) {
      return 1
    }
    return 0
  })
  return usersWithEmails.concat(usersWithoutEmails)
}

export const orderUsersByGivenName: RosterMechanics.Test.Utils.Fn.OrderUsersByGivenName = (
  users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] => {
  const usersWithGivenName = users.filter((u) => u.name?.givenName != null)
  const usersWithoutGivenName = users.filter((u) => u.name?.givenName == null)
  usersWithGivenName.sort((a, b) => {
    if ((a.name?.givenName as string) < (b.name?.givenName as string)) {
      return -1
    }
    if ((a.name?.givenName as string) > (b.name?.givenName as string)) {
      return 1
    }
    return 0
  })
  return usersWithGivenName.concat(usersWithoutGivenName)
}

export const orderUsersByFamilyName: RosterMechanics.Test.Utils.Fn.OrderUsersByFamilyName = (
  users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] => {
  const usersWithFamilyName = users.filter((u) => u.name?.familyName != null)
  const usersWithoutFamilyName = users.filter((u) => u.name?.familyName == null)
  usersWithFamilyName.sort((a, b) => {
    if ((a.name?.familyName as string) < (b.name?.familyName as string)) {
      return -1
    }
    if ((a.name?.familyName as string) > (b.name?.familyName as string)) {
      return 1
    }
    return 0
  })
  return usersWithFamilyName.concat(usersWithoutFamilyName)
}

export default {
  orderUsersByEmail,
  orderUsersByGivenName,
  orderUsersByFamilyName,
}
