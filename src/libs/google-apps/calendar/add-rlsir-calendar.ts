import RussLyonConfig from '../../../config/company/russ-lyon'

const addRlsirCalendar: RosterMechanics.GoogleApps.Calendar.Fn.AddRlsirCalendar = async (
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<void> => {
  const calId = (await RussLyonConfig).calendars.company.calendarId
  const calName = (await RussLyonConfig).calendars.company.calendarName

  try {
    const resource = {
      resourceId: calId,
      resourceName: calName,
    }
    AdminDirectory?.Resources?.Calendars?.insert(resource, user.id as string)
    console.log('The user (%s) was successfully added to calendar with id (%s)', user.primaryEmail, calId)
  } catch (error) {
    console.log('There was an error adding user (%s) to calendar with id (%s) ', user.primaryEmail, calId)
  }
}

export default addRlsirCalendar
