// import RussLyonConfig from '../../../config/company/russ-lyon'
// import NewHireEmail from '../../emails/new-hire'

const handleReHire: RosterMechanics.Wrapper.Company.Fn.HandleReHire = async (
  googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser> => {
  const user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = googleUserObj
  if (googleUserObj.customSchemas?.Roster['Re-Hire'] === true) {
    user.suspended = false
    // const newHireEmail = new NewHireEmail(user)
    // if ((await RussLyonConfig).users.testing.includes(user.primaryEmail as string)) {
    //   await newHireEmail.send(['rob@russlyon.com'])
    // } else {
    //   await newHireEmail.send((await RussLyonConfig).newHire.emails)
    // }
  }
  return await Promise.resolve(user)
}

export default handleReHire
