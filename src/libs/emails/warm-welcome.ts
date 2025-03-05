import GmailApi from '../google-apis/gmail'
import GoogleServiceAccount from '../google-apis/service-account'
import exponentialBackoffAsync from '../utils/general/exponential-backoff-async'

type IWarmWelcomeEmail = RosterMechanics.Emails.IWarmWelcomeEmail

export default class WarmWelcomeEmail implements IWarmWelcomeEmail {
  private readonly googleUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  constructor(googleUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) {
    this.googleUser = googleUser
  }

  public async send({
    toEmail,
    fromEmail,
    fromFirstName,
    fromLastName,
  }: {
    toEmail: string
    fromEmail: string
    fromFirstName: string
    fromLastName: string
  }): Promise<void> {
    const office = this.googleUser.customSchemas?.Roster.Office
    if (office === null || office === undefined || office === '') {
      throw new Error('Office is not defined')
    }

    const firstNameRecipient = this.googleUser.name?.givenName ?? 'Unknown'
    const lastNameRecipient = this.googleUser.name?.familyName ?? 'Unknown'
    const phoneRecipient = this.googleUser.customSchemas?.Roster.Phone ?? '000-000-0000'

    const subject = WarmWelcomeEmail.getSubject()

    const body = WarmWelcomeEmail.getBody({
      firstName: firstNameRecipient,
      lastName: lastNameRecipient,
      phone: phoneRecipient,
    })

    const googleSA = new GoogleServiceAccount({
      userEmail: fromEmail,
      serviceName: 'Gmail',
      scopes: GmailApi.Scopes(),
    })

    googleSA.reset()

    const gmailApi = new GmailApi(googleSA)

    // associate new email signature with user's primary alias
    await exponentialBackoffAsync({
      action: async () => {
        await gmailApi.sendEmailAsUser({
          fromEmail,
          fromFirstName,
          fromLastName,
          toEmail,
          subject,
          body,
        })
      },
      maxNumTries: 10,
      name: 'gmailApi.sendEmailAsUser.sendWarmWelcomeEmail',
    })
  }

  static getSubject(): string {
    return `Super Exciting News!`
  }

  static getBody({ firstName, lastName, phone }: { firstName: string; lastName: string; phone: string }): string {
    return `I am delighted, excited, and grateful to share this fantastic news. We have a new member in our family of real estate advisors. The one and only, world-famous, ${firstName} ${lastName} is now one of us!<br><br>Anyone who has worked with them knows they are a true professional with the highest level of expertise and integrity. Please pick up the phone and extend them the warmest welcome. Their number is ${phone}.<br><br>Plan on a happy hour celebration soon, we are overdue for a party. Stand by for the date as we work out a good time for everyone's busy schedules.<br><br>Respectfully,`
  }
}
