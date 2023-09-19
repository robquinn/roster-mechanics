import RussLyonConfig from '../../config/company/russ-lyon'
import today from '../utils/date/today'

type ISuspensionEmail = RosterMechanics.Emails.ISuspensionEmail

export default class SuspensionEmail implements ISuspensionEmail {
  private readonly googleUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  constructor(googleUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) {
    this.googleUser = googleUser
  }

  public async send(): Promise<void> {
    const firstName = (this.googleUser.name?.givenName as string).toUpperCase()
    // let preferredName = this.formResponse.preferredName.toUpperCase()
    const lastName = (this.googleUser.name?.familyName as string).toUpperCase()
    const office = this.googleUser.customSchemas?.Roster.Office as string
    const board = this.googleUser.customSchemas?.Roster.Board as string
    const html = await SuspensionEmail.getHtml({
      firstName,
      lastName,
      office,
      board,
    })
    ;(await RussLyonConfig).sever.emails.forEach((email) => {
      GmailApp.sendEmail(email, `SEVER: ${firstName} ${lastName}`, html, {
        from: 'derek.zieder@russlyon.com',
        htmlBody: html,
      })
    })
  }

  static async getHtml({
    firstName,
    lastName,
    office,
    board,
  }: {
    firstName: string
    lastName: string
    office: string
    board: string
  }): Promise<string> {
    const first = firstName.toUpperCase()
    const last = lastName.toUpperCase()
    return /* html */ `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "https://www.w3.org/TR/html4/strict.dtd">
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style type="text/css" nonce="R8RR1+eTuw8pSD2LYW1u8g">
          body,
          td,
          div,
          p,
          a,
          input {
            font-family: arial, sans-serif;
          }
        </style>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="shortcut icon"
          href="https://www.google.com/a/cpanel/russlyon.com/images/favicon.ico"
          type="image/x-icon"
        />
        <title>Russ Lyon Sotheby's International Realty Mail - Fwd: [Licensing] SEVER: MEGAN FABER</title>
        <style type="text/css" nonce="R8RR1+eTuw8pSD2LYW1u8g">
          body,
          td {
            font-size: 13px;
          }
          a:link,
          a:active {
            color: #1155cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          a:visited {
            color: ##6611cc;
          }
          img {
            border: 0px;
          }
          pre {
            white-space: pre;
            white-space: -moz-pre-wrap;
            white-space: -o-pre-wrap;
            white-space: pre-wrap;
            word-wrap: break-word;
            max-width: 800px;
            overflow: auto;
          }
          .logo {
            left: -7px;
            position: relative;
          }
        </style>
      </head>
      <body>
        <div class="bodycontainer">
          <div class="maincontent">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr></tr>
              </tbody>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" class="message">
              <tbody>
                <tr>
                  <td align="right"></td>
                </tr>
                <tr></tr>
                <tr>
                  <td colspan="2">
                    <table width="100%" cellpadding="12" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td>
                            <div style="overflow: hidden">
                              <font size="-1"
                                ><div dir="ltr">
                                  <div>
                                    <div dir="ltr" data-smartmail="gmail_signature">
                                      <div dir="ltr"></div>
                                    </div>
                                  </div>

                                  <div class="gmail_quote">
                                    <div lang="EN-US" link="#0563C1" vlink="#954F72" style="word-wrap: break-word">
                                      <div>
                                        <p class="MsoNormal">
                                          The following agent has severed from the office noted below and are no longer
                                          associated with Russ Lyon | Sotheby's International Realty.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          <b>${first} ${last}</b> has severed from the ${office}
                                          office EFFECTIVE ${await today()}.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          ADVnet/DAVE: Please remove efax number if applicable. Please fully delete
                                          email when appropriate. Email has been suspended.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          ANSWERING SERVICE: Please remove from the Russ Lyon Sotheby’s International
                                          Realty roster.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          LISTING/CONTRACT ADMINS: Misty, please notify manager of any active listings
                                          under agent. Please review Lyon Connect for any missing documents for broker
                                          records and Exclusive Listings. Do not close files without appropriate, fully
                                          executed listing transfer forms. You will need to manage any active/pending
                                          listings on behalf of the agent until they are canceled or transferred. Any
                                          pending transactions will remain with your office until they close or cancel.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          ACCOUNTING: Please contact the office to determine if there are any
                                          outstanding AR's to be billed.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          OFFICE ADMIN: Please review for any signs which may still be on the property.
                                          Coordinate removal with Listing Admin as listings are transferred or canceled.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          DEREK/ALEXANDRA: Please review for any social media or additional web
                                          presences that may need to be updated.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          The following systems will be updated: RNet Roster/Email, Russlyon.com,
                                          SIR.com (will update overnight). LuxuryRealEstate.com, Toolkit, Lyon Connect,
                                          Xpressdocs.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          ${board.toUpperCase()} has been notified of severances.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">
                                          Please remove
                                          <b>${first} ${last}</b> from all remaining systems.
                                        </p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal">Thank you.</p>
                                        <p class="MsoNormal"></p>
                                        <p class="MsoNormal"></p>
                                        <a
                                          href="mailto:${(
                                            (await RussLyonConfig).offices[office].emails.sever as string[]
                                          ).join(';')}?subject"
                                          ="SEVER:"
                                          ${first}
                                          ${last}
                                          >Ready to send.</a
                                        >
                                        <br /><br />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </font>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `
  }
}
