const removeUserAsMember: RosterMechanics.GoogleApps.Admin.Fn.RemoveUserAsMember = ({
  user,
  groupEmail,
}: {
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  groupEmail: string
}): void => {
  try {
    AdminDirectory?.Members?.remove(groupEmail, user.id as string)
    console.log('User (%s) has been removed from group (%s)', user.primaryEmail, groupEmail)
  } catch (err) {
    console.log('Error removing user (%s) from group (%s): (%s)', user.primaryEmail, groupEmail, err)
  }
}

export default removeUserAsMember
