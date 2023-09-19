const insertUserAsMember: RosterMechanics.GoogleApps.Admin.Fn.InsertUserAsMember = ({
  user,
  groupEmail,
}: {
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  groupEmail: string
}): { data: GoogleAppsScript.AdminDirectory.Schema.Member | null; error: unknown | null } => {
  const member = {
    email: user?.primaryEmail,
    role: 'MEMBER',
  }
  let result
  try {
    result = AdminDirectory?.Members?.insert(member, groupEmail)
    console.log('User (%s) added to group email (%s).', user?.primaryEmail, groupEmail)
    return { data: result ?? null, error: null }
  } catch (e) {
    console.log('Error adding User (%s) to group (%s): %s.', user?.primaryEmail, groupEmail, e?.toString())
    return { data: null, error: e }
  }
}

export default insertUserAsMember
