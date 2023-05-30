const sortUsersIntoGroups: RosterMechanics.Utils.Cache.Fn.SortUsersIntoGroups = async (
  users: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[],
): Promise<{
  regular: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
  suspended: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
  pseudo: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[]
}> => {
  return await new Promise((resolve) => {
    const regular: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] = []
    const pseudo: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] = []
    const suspended: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser[] = []

    const uLength: number = users?.length
    for (let i = 0; i < uLength; i += 1) {
      if (users[i]?.suspended != null && users[i]?.suspended === true) {
        suspended.push(users[i])
      } else if (
        users[i]?.suspended != null &&
        users[i]?.suspended === false &&
        users[i].customSchemas?.Roster.Show_on_Roster === true
      ) {
        regular.push(users[i])
      } else if (
        users[i].customSchemas?.Roster.Show_on_Roster == null ||
        (users[i].customSchemas?.Roster.Show_on_Roster != null &&
          users[i].customSchemas?.Roster.Show_on_Roster === false)
      ) {
        pseudo.push(users[i])
      }
    }
    resolve({
      regular,
      suspended,
      pseudo,
    })
  })
}

export default sortUsersIntoGroups
