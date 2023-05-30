import RussLyonConfig from '../../config/company/russ-lyon'
import dateIsoToAnsi from '../utils/date/date-iso-to-ansi'
import capitalizeFirstChar from '../utils/format/capitalize-first-character'
import licenseNumberHTML from '../utils/format/license-number-html'
import getActualOffice from '../utils/general/get-actual-office'

/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */

// import { GoogleServiceAccount } from '../utils/google-service-account'
type INewHire = RosterMechanics.Emails.INewHire

export default class NewHireEmail implements INewHire {
  private readonly googleUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

  private emails: RosterMechanics.Config.Company.OfficeEmailsJoined = {
    allInOffice: '',
    allAgentsInOffice: '',
    emails: '',
    emailsCc: '',
  }

  private subject = ''
  private messageHtml = ''
  private messagePlainText = ''

  constructor(googleUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) {
    this.googleUser = googleUser
  }

  static async makeEmails(
    emailsInfo: RosterMechanics.Config.Company.OfficeEmails,
  ): Promise<RosterMechanics.Config.Company.OfficeEmailsJoined> {
    return await new Promise((resolve, _reject) => {
      const emails = {
        allInOffice: emailsInfo.allInOffice,
        allAgentsInOffice: emailsInfo.allAgentsInOffice,
        emails: emailsInfo.emails.join(';'),
        emailsCc: emailsInfo.emailsCc.join(';'),
      }
      resolve(emails)
    })
  }

  static async getGreeting(): Promise<string> {
    return await new Promise((resolve, _reject) => {
      const time = new Date().getHours()
      let greeting
      if (time < 12) {
        greeting = 'Good Morning,'
      } else if (time < 17) {
        greeting = 'Good Afternoon,'
      } else {
        greeting = 'Good Evening,'
      }
      resolve(greeting)
    })
  }

  public async send(sendTo: string[]): Promise<void> {
    console.log('sendEmail')

    await this.getSubject()
      .then(async (subject) => {
        this.subject = subject
        console.log('\nsubject: %s', subject)
        return await NewHireEmail.makeEmails(
          (
            await RussLyonConfig
          ).offices[
            await getActualOffice(
              this.googleUser.customSchemas?.Roster.Office as RosterMechanics.Utils.General.Offices.Office,
            )
          ].emails,
        )
      })
      .then(async (emails) => {
        this.emails = emails
        console.log('\nemails: %s', emails)
        return await this.getMessageHtml()
      })
      .then(async (messageHtml) => {
        this.messageHtml = messageHtml
        console.log('\nmessageHtml: %s', messageHtml)
        return await this.getMessagePlainText()
      })
      .then((messagePlainText) => {
        this.messagePlainText = messagePlainText
        console.log('\nmessagePlainText: %s', messagePlainText)

        sendTo.forEach((email: string) => {
          MailApp.sendEmail(email, this.subject, this.messagePlainText, {
            htmlBody: this.messageHtml,
          })
        })
        return true
      })
      .catch((err) => {
        console.log('NewHireEmail.send ERROR', err)
      })
  }

  private async getSubject(): Promise<string> {
    const hireOrRehireText = await this.getHireOrRehireText()
    // let first = await this.capitalizeFirstChar(this.formResponse.firstName)
    const preferredName = await capitalizeFirstChar(this.googleUser.customSchemas?.Roster.Preferred_Name as string)
    const firstName = await capitalizeFirstChar(this.googleUser?.name?.givenName as string)
    const last = await capitalizeFirstChar(this.googleUser?.name?.familyName as string)
    return await new Promise((resolve, _reject) => {
      const subject = `${(this.googleUser.customSchemas?.Roster.Office as string).toUpperCase()} ${hireOrRehireText} ${
        preferredName ?? firstName
      } ${last}`
      resolve(subject)
    })
  }

  private async getHireOrRehireText(): Promise<string> {
    // let user = GoogleAdmin.User.getByEmail(this.formResponse.email)
    return await new Promise((resolve, _reject) => {
      let hireOrRehireText
      if (this.googleUser.customSchemas?.Roster['Re-Hire'] === true) {
        hireOrRehireText = 'RE-HIRE:'
      } else {
        hireOrRehireText = 'New Hire:'
      }
      resolve(hireOrRehireText)
    })
  }

  /* eslint-disable */
  private async getMessageHtml(): Promise<string> {
    let greeting = await NewHireEmail.getGreeting()
    let first = await capitalizeFirstChar(this.googleUser.name?.givenName as string)
    let preferredName = await capitalizeFirstChar(this.googleUser.customSchemas?.Roster.Preferred_Name as string)
    let last = await capitalizeFirstChar(this.googleUser.name?.familyName as string)
    let phone = (this.googleUser?.phones as GoogleAppsScript.AdminDirectory.Schema.UserPhone[])?.find(
      (p) => p.primary === true,
    )?.value as string
    let officeUpper = this.googleUser.customSchemas?.Roster.Office?.toUpperCase()
    let hireDate = await dateIsoToAnsi(this.googleUser.customSchemas?.Roster.Hire_Date as string)
    let licenseExpireDate = await dateIsoToAnsi(this.googleUser.customSchemas?.Roster.License_Expiration_Date as string)
    let adreLink = await licenseNumberHTML({
      number: this.googleUser.customSchemas?.Roster.License_Number as string,
      link: this.googleUser.customSchemas?.Roster.ADRE_Link as string,
    })

    let noAnswerMessage = '<b>No Answer Provided</b>'
    console.log('this.emails.emailsCc ', this.emails.emailsCc)
    return new Promise((resolve, _reject) => {
      const messageHtml =
        greeting +
        '<br><br>' +
        'Please set up the following new ' +
        officeUpper +
        ' agent in all systems:<br><br>' +
        "Affiliates: This agent has been hired into the Russ Lyon Sotheby's International Realty " +
        officeUpper +
        ' Office.<br><br>' +
        "Answering Service: Please set up for Russ Lyon Sotheby's International Realty " +
        officeUpper +
        ' Office.\n\n' +
        '<br><br>' +
        'Office Admin: Please set up in all ' +
        officeUpper +
        ' Office systems.<br><br>' +
        'Accounting: Documents will be provided through Paycom agent onboarding system.<br><br>' +
        'Agent profiles/accounts will be created for: agent email, Lyon Connect, ' +
        '<a href="http://russlyon.com" target="_blank" class="href-tip" data-tippy-content="http://russlyon.com">russlyon.com</a>' +
        ' ' +
        ', dash (' +
        '<a href="http://SIR.com" class="href-tip" data-tippy-content="http://SIR.com">SIR.com</a>' +
        '), ' +
        '<a href="http://LuxuryRealEstate.com" class="href-tip" data-tippy-content="http://LuxuryRealEstate.com">LuxuryRealEstate.com</a>' +
        ', RNet Roster, Xpressdocs, Collateral Analytics.<br/><br/>' +
        'ADRE License Name: ' +
        first +
        ' ' +
        last +
        '<br>' +
        'ADRE Approved Nickname: ' +
        preferredName +
        ' ' +
        last +
        '<br>' +
        'Email: ' +
        this.googleUser.primaryEmail +
        '<br>' +
        'Cell: ' +
        (phone ?? noAnswerMessage) +
        '<br>' +
        'Board: ' +
        (this.googleUser.customSchemas?.Roster.Board ? this.googleUser.customSchemas?.Roster.Board : noAnswerMessage) +
        '<br>' +
        'MLS: ' +
        (this.googleUser.customSchemas?.Roster.MLS_ID
          ? this.googleUser.customSchemas?.Roster.MLS_ID
          : noAnswerMessage) +
        '<br>' +
        'License Number: ' +
        (this.googleUser.customSchemas?.Roster.License_Number
          ? this.googleUser.customSchemas?.Roster.License_Number
          : noAnswerMessage) +
        '<br>' +
        'ADRE Link: ' +
        (adreLink ? adreLink : noAnswerMessage) +
        '<br>' +
        'Hire Date: ' +
        hireDate +
        '<br>' +
        'License Expire Date: ' +
        (licenseExpireDate ? licenseExpireDate : noAnswerMessage) +
        '<br>' +
        'PC or PLLC: ' +
        (this.googleUser.customSchemas?.Roster.PC_or_PLLC
          ? this.googleUser.customSchemas?.Roster.PC_or_PLLC
          : noAnswerMessage) +
        '<br>' +
        // 'Lone Wolf Number: ' +
        // (this.formResponse.loneWolfNumber ? this.formResponse.loneWolfNumber : noAnswerMessage) +
        '<br>' +
        'Licensed Assistant: ' +
        (this.googleUser.customSchemas?.Roster.Role?.includes('Licensed Assistant') ? 'Yes' : 'No') +
        '<br>' +
        '<p>' +
        '<a href="mailto:' +
        this.emails.emails +
        '?subject=' +
        this.subject +
        '&cc=' +
        this.emails.emailsCc +
        '">Ready to send.</a><br><br>' +
        '<a href="mailto:staff@russlyon.com?subject=' +
        'New Hire: ' +
        first +
        ' ' +
        last +
        '&body=' +
        greeting +
        '%0D%0DPlease join me in welcoming ' +
        preferredName +
        ' ' +
        last +
        ' to the Russ Lyon Sotheby’s International Realty ' +
        this.googleUser.customSchemas?.Roster.Office +
        ' Office.%0D%0DThank you,%0D%0D' +
        '">Ready to send.</a>' +
        '</p>'
      resolve(messageHtml)
    })
  }
  /* eslint-enable */

  private async getMessagePlainText(): Promise<string> {
    return await new Promise((resolve, _reject) => {
      const messagePlainText = this.messageHtml.replace(/(<([^>]+)>)/gi, '')
      resolve(messagePlainText)
    })
  }
}
