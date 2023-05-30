import RussLyonConfig from '../../../config/company/russ-lyon'

const shareCalendar: RosterMechanics.GoogleApps.Calendar.Fn.ShareCalendar = async (
  email: string,
): Promise<GoogleAppsScript.Calendar.Schema.AclRule> => {
  const role = 'reader'
  const calId = (await RussLyonConfig).calendars.company.calendarId
  let acl: GoogleAppsScript.Calendar.Schema.AclRule | null = null
  let newRule: GoogleAppsScript.Calendar.Schema.AclRule | null = null

  // Check whether there is already a rule for this user
  try {
    acl = Calendar?.Acl?.get(calId, `user:${email}`) as GoogleAppsScript.Calendar.Schema.AclRule
    console.log('ACL rule for user (%s) has been found: (%s)', email, acl)
  } catch (e) {
    // no existing acl record for this user - as expected. Carry on.
    console.log('No ACL rule has been found for user (%s)', email)
  }

  if (acl == null) {
    acl = {
      scope: {
        type: 'user',
        value: email,
      },
      role,
    }
    // No existing rule - insert one.
    newRule = Calendar?.Acl?.insert(acl, calId) as GoogleAppsScript.Calendar.Schema.AclRule
    console.log('New ACL rule created for user (%s): %s', email, newRule)
  } else {
    // There was a rule for this user - update it.
    acl.role = role
    newRule = Calendar?.Acl?.update(acl, calId, acl.id as string) as GoogleAppsScript.Calendar.Schema.AclRule
    console.log('Existing ACL rule for user (%s) was updated: %s', email, newRule)
  }

  // Calendar.CalendarList.insert({
  //   accessRole: role,
  //   id: calId,
  //   hidden: false,
  //   selected: true,
  // })

  return newRule
}

export default shareCalendar
