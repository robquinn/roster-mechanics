import RussLyonConfig from '../../../config/company/russ-lyon'
import getActualOffice from '../../utils/general/get-actual-office'
import isNinja from '../../utils/general/is-ninja'
import insertUserAsMember from './insert-user-as-member'
import removeUserAsMember from './remove-user-as-member'

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
  const allNinjasInOfficeGroupEmailOld = (await RussLyonConfig).offices[oldOffice].emails.ninjasInOffice

  const groupEmailsOld = [allInOfficeGroupEmailOld, allAgentsInOfficeGroupEmailOld]

  groupEmailsOld.forEach((groupEmail) => {
    removeUserAsMember({ user: newUserData, groupEmail })
  })

  if (await isNinja(newUserData.customSchemas?.Roster.Ninja as string)) {
    removeUserAsMember({ user: newUserData, groupEmail: allNinjasInOfficeGroupEmailOld })
  }

  // Adding new groups
  const newOffice = await getActualOffice(
    newUserData.customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office,
  )
  const allInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.allInOffice
  const allAgentsInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.allAgentsInOffice
  const allNinjasInOfficeGroupEmailNew = (await RussLyonConfig).offices[newOffice].emails.ninjasInOffice

  const newGroupEmails = [allInOfficeGroupEmailNew, allAgentsInOfficeGroupEmailNew]

  newGroupEmails.forEach((groupEmail) => {
    insertUserAsMember({ user: newUserData, groupEmail })
  })

  if (await isNinja(newUserData.customSchemas?.Roster.Ninja as string)) {
    insertUserAsMember({ user: newUserData, groupEmail: allNinjasInOfficeGroupEmailNew })
  }
}

export default updateUserGroups
