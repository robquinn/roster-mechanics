import isProd from '../../utils/general/is-prod'
import RussLyonConfig from '../../../config/company/russ-lyon'
import WarmWelcomeEmail from '../../emails/warm-welcome'

const sendWarmWelcomeEmail: RosterMechanics.Wrapper.Gmail.Fn.SendwarmWelcomeEmail = async (
  googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<void> => {
  //   (await RussLyonConfig).offices[office].emails.allInOffice
  const userOffice = googleUserObj.customSchemas?.Roster.Office

  if (userOffice == null || userOffice === '') {
    throw new Error('Office is not defined')
  }

  if (
    userOffice === 'Fountain Hills' ||
    userOffice === 'Corporate' ||
    userOffice === 'Relocation' ||
    userOffice.includes("Lyon's Den") ||
    googleUserObj.customSchemas?.Roster.Role !== 'Sales Associate'
  ) {
    return
  }

  const userOfficeReference = (await RussLyonConfig).offices[userOffice]

  const warmWelcomeEmail = new WarmWelcomeEmail(googleUserObj)

  if (await isProd())
    await warmWelcomeEmail.send({
      toEmail: userOfficeReference.emails.allInOffice,
      fromEmail: userOfficeReference.manager.email,
      fromFirstName: userOfficeReference.manager.first,
      fromLastName: userOfficeReference.manager.last,
    })
  else
    await warmWelcomeEmail.send({
      toEmail: 'robert.quinn@russlyon.com' as string,
      fromEmail: userOfficeReference.manager.email,
      fromFirstName: userOfficeReference.manager.first,
      fromLastName: userOfficeReference.manager.last,
    })
}

export default sendWarmWelcomeEmail
