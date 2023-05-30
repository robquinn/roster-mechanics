import WelcomeEmail from '../../emails/welcome'
import isProd from '../../utils/general/is-prod'

const sendWelcomeEmail: RosterMechanics.Wrapper.Gmail.Fn.SendWelcomeEmail = async (
  googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<void> => {
  const welcomeEmail = new WelcomeEmail(googleUserObj)

  if (await isProd()) welcomeEmail.send({ to: googleUserObj.primaryEmail as string, from: 'welcome@russlyon.com' })
  else welcomeEmail.send({ to: googleUserObj.primaryEmail as string, from: 'welcome-email@russlyon.com' })

  await Promise.resolve()
}
export default sendWelcomeEmail
