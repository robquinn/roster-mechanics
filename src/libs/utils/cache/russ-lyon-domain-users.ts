import getAllUsers from './get-all-users'
import Roster from '../../google-apps/sheet/roster-sheet'
import sortUsersIntoGroups from './sort-users-into-groups'

const RussLyonDomainUsers: RosterMechanics.Utils.Cache.Fn.RussLyonDomainUsers = async (
  cacheArgs?: RosterMechanics.Utils.Cache.CacheArgs,
): Promise<{ notSuspendedUsers: Roster; suspendedUsers: Roster; pseudoUsers: Roster }> => {
  let users = await getAllUsers(cacheArgs)

  // make sure users is either included or not included depending on action
  if (cacheArgs?.action != null && cacheArgs?.googleAdminUser != null) {
    if (cacheArgs.action === 'update') {
      while (
        !users.some(
          (u) => u.id === (cacheArgs?.googleAdminUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser).id,
        )
      ) {
        // eslint-disable-next-line no-await-in-loop
        users = await getAllUsers(cacheArgs)
      }
    }
    if (cacheArgs.action === 'delete') {
      while (
        users.some(
          (u) => u.id === (cacheArgs?.googleAdminUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser).id,
        )
      ) {
        // eslint-disable-next-line no-await-in-loop
        users = await getAllUsers(cacheArgs)
      }
    }
  }

  const { regular, suspended, pseudo } = await sortUsersIntoGroups(users)
  return await new Promise((resolve) => {
    console.log('notSuspendedUsers', regular.length)
    console.log('suspendedUsers', suspended.length)
    console.log('pseudoUsers', pseudo.length)

    const notSuspendedUsers = new Roster(regular)
    const suspendedUsers = new Roster(suspended)
    const pseudoUsers = new Roster(pseudo)
    resolve({
      notSuspendedUsers,
      suspendedUsers,
      pseudoUsers,
    })
  })
}

export default RussLyonDomainUsers
