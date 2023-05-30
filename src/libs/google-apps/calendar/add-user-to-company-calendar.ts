import RussLyonConfig from '../../../config/company/russ-lyon'

const addUserToCompanyCalendar: RosterMechanics.GoogleApps.Calendar.Fn.AddUserToCompanyCalendar = async (
  email: string,
): Promise<void> => {
  const calId = (await RussLyonConfig).calendars.company.calendarId

  try {
    const resource = {
      scope: {
        type: 'user',
        value: email,
      },
      role: 'reader',
      selected: true,
      hidden: false,
    }

    const acl = Calendar?.Acl?.insert(resource, calId)
    Calendar?.Acl?.update(
      acl as GoogleAppsScript.Calendar.Schema.AclRule,
      calId,
      (acl as GoogleAppsScript.Calendar.Schema.AclRule).id as string,
    )

    // CalendarApp.subscribeToCalendar(calendarId, {
    //   hidden: false,
    //   selected: true,
    // })
    // let cal = CalendarApp.getCalendarById(calendarId)
    // cal.setSelected(true)
    // cal.setHidden(false)
    // Calendar.CalendarList.insert({
    //   id: calendarId,
    //   selected: true,
    // })
    console.log('The user (%s) was successfully added to calendar with id (%s)', email, calId)
  } catch (e) {
    console.log('There was an error adding user (%s) to calendar with id (%s) ', email, calId)
  }
}

export default addUserToCompanyCalendar
