import RussLyonConfig from '../../../config/company/russ-lyon'
import getActualOffice from '../../utils/general/get-actual-office'
import insertUserAsMember from './insert-user-as-memeber'

const updateUserGroups: RosterMechanics.GoogleApps.Admin.Fn.UpdateUserGroups = async ({
  oldUserData,
  newUserData,
}: {
  oldUserData: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  newUserData: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
}): Promise<void> => {
  // Removing old groups
  const oldOffice = await getActualOffice(
    oldUserData.customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office,
  )
  const allInOfficeGroupEmailOld = (await RussLyonConfig).offices[oldOffice].emails.allInOffice
  const allAgentsInOfficeGroupEmailOld = (await RussLyonConfig).offices[oldOffice].emails.allAgentsInOffice

  try {
    AdminDirectory?.Members?.remove(allInOfficeGroupEmailOld, oldUserData.id as string)
    console.log('User (%s) has been removed from group (%s)', newUserData.primaryEmail, allInOfficeGroupEmailOld)
  } catch (err) {
    console.log(
      'Error removing user (%s) from group (%s): (%s)',
      newUserData.primaryEmail,
      allInOfficeGroupEmailOld,
      err,
    )
  }
  try {
    AdminDirectory?.Members?.remove(allAgentsInOfficeGroupEmailOld, oldUserData.id as string)
    console.log('User (%s) has been removed from group (%s)', newUserData.primaryEmail, allAgentsInOfficeGroupEmailOld)
  } catch (err) {
    console.log(
      'Error removing user (%s) from group (%s): (%s)',
      newUserData.primaryEmail,
      allInOfficeGroupEmailOld,
      err,
    )
  }

  // Adding new groups
  const newOffice = await getActualOffice(
    newUserData.customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office,
  )
  const allInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.allInOffice
  const allAgentsInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.allAgentsInOffice
  insertUserAsMember({ user: newUserData, groupEmail: allInOfficeGroupEmailNew })
  insertUserAsMember({ user: newUserData, groupEmail: allAgentsInOfficeGroupEmailNew })
}

export default updateUserGroups
