import updateUserGroups from './update-user-groups'

type ICustomSchema = RosterMechanics.GoogleApps.Admin.Schema.ICustomSchema
// type GoogleUser = RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

const updateUser: RosterMechanics.GoogleApps.Admin.Fn.UpdateUser = async ({
  oldUser,
  newUser,
}: {
  oldUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  newUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
}): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser> => {
  let updatedUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  const newU = newUser
  console.log('update', newU)
  return await new Promise((resolve, reject) => {
    try {
      ;(newU.customSchemas as ICustomSchema).Roster.Updated_At = new Date(Date.now()).toString()

      delete newU.changePasswordAtNextLogin
      delete newU.password

      // update user object
      updatedUser = AdminDirectory?.Users?.update(
        newU,
        oldUser.id as string,
      ) as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

      if ((updatedUser.customSchemas as ICustomSchema).Roster.Office === 'Coporate') resolve(updatedUser)

      if (newU.customSchemas?.Roster.Office !== oldUser.customSchemas?.Roster.Office) {
        void (async () => {
          await updateUserGroups({ oldUserData: oldUser, newUserData: updatedUser })
        })()
      }
      console.log('User %s updated with ID %s.', updatedUser.primaryEmail, updatedUser.id)
      resolve(updatedUser)
    } catch (error) {
      console.log('Error updating User (%s) with ID (%s): %s', newU.primaryEmail, oldUser.id, error)
      reject(new Error(`Error updating User (${oldUser.primaryEmail as string})`))
    }
  })
}

export default updateUser
