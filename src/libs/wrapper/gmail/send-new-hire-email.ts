import RussLyonConfig from '../../../config/company/russ-lyon'
import NewHireEmail from '../../emails/new-hire'

const sendNewHireEmail: RosterMechanics.Wrapper.Gmail.Fn.SendNewHireEmail = async (
  googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<void> => {
  const newHireEmail = new NewHireEmail(googleUserObj)

  if ((await RussLyonConfig).users.testing.includes(googleUserObj.primaryEmail as string)) {
    await newHireEmail.send(['rob@russlyon.com'])
  } else {
    await newHireEmail.send((await RussLyonConfig).newHire.emails)
  }
}

export default sendNewHireEmail
