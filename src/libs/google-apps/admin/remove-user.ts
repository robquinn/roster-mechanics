const removeUser: RosterMechanics.GoogleApps.Admin.Fn.RemoveUser = (
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): void => {
  try {
    AdminDirectory?.Users?.remove(user.primaryEmail as string)
    console.log('User %s deleted with ID %s.', user.primaryEmail, user.id)
  } catch (e) {
    console.log(`Error removing User (${user.primaryEmail as string}) with ID (${user.id as string})`, e)
  }
}

export default removeUser
