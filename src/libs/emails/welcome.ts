type IWelcomeEmail = RosterMechanics.Emails.IWelcomeEmail

export default class WelcomeEmail implements IWelcomeEmail {
  private readonly googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

  constructor(googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser) {
    this.googleUserObj = googleUserObj
  }

  public send({ to, from }: { to: string; from: string }): void {
    const htmlBody = WelcomeEmail.getHtml({
      preferredName: this.googleUserObj.customSchemas?.Roster.Preferred_Name as string,
      last: this.googleUserObj.name?.familyName as string,
    })

    console.log('GmailApp.getAliases()', GmailApp.getAliases())

    GmailApp.sendEmail(to, 'Welcome!', htmlBody, {
      // 'from' must be an alias of the sender
      // from: isProd() ? 'welcome@russlyon.com' : 'welcome.test@russlyon.com',
      from,
      htmlBody,
    })
  }

  static getHtml({ last, preferredName }: { last: string; preferredName: string }): string {
    return /* html */ `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        lang="en"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <!--[if (gte mso 9)|(IE)
            ]><xml
              ><o:OfficeDocumentSettings
                ><o:AllowPNG></o:AllowPNG
                ><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings
              ></xml
            ><!
          [endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="date=no" />
          <meta name="format-detection" content="address=no" />
          <meta name="format-detection" content="email=no" />
          <style type="text/css">
            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              word-break: break-word;
              mso-line-height-rule: exactly;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            table {
              border: 0;
              border-spacing: 0;
              border-collapse: collapse;
            }
            img {
              height: auto;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
            img:hover {
              opacity: 0.9 !important;
            }
            a {
              text-decoration: none;
            }
            p {
              margin: 0;
            }
            ul,
            ol {
              margin: 0 0 1em;
            }
            strong {
              font-weight: 700;
            }
            #outlook a {
              padding: 0;
            }
            .ReadMsgBody {
              width: 100%;
            }
            .ExternalClass {
              width: 100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
            }
            img.g-img + div {
              display: none !important;
            }
            .preheader {
              padding: 0;
              font-size: 0;
              display: none;
              max-height: 0;
              mso-hide: all;
              line-height: 0;
              color: transparent;
              height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              visibility: hidden;
              width: 0;
            }
            .star:hover a,
            .star:hover ~ .star a {
              color: #ffcf0f !important;
            }
          </style>
          <style type="text/css">
            @font-face {
              font-family: 'Open Sans';
              font-style: italic;
              font-weight: 400;
              src: local('Open Sans Italic'), local('OpenSans-Italic'),
                url(https://fonts.gstatic.com/s/opensans/v17/mem6YaGs126MiZpBA-UFUK0Zdc0.woff2)
                  format('woff2');
            }
            @font-face {
              font-family: 'Open Sans';
              font-style: italic;
              font-weight: 700;
              src: local('Open Sans Bold Italic'), local('OpenSans-BoldItalic'),
                url(https://fonts.gstatic.com/s/opensans/v17/memnYaGs126MiZpBA-UFUKWiUNhrIqM.woff2)
                  format('woff2');
            }
            @font-face {
              font-family: 'Open Sans';
              font-style: normal;
              font-weight: 400;
              src: local('Open Sans Regular'), local('OpenSans-Regular'),
                url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2)
                  format('woff2');
            }
            @font-face {
              font-family: 'Open Sans';
              font-style: normal;
              font-weight: 700;
              src: local('Open Sans Bold'), local('OpenSans-Bold'),
                url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2)
                  format('woff2');
            }
          </style>
          <style type="text/css"></style>
          <style type="text/css">
            @media only screen and (max-width: 699px) {
              table.hideMobile,
              tr.hideMobile,
              td.hideMobile,
              br.hideMobile {
                display: none !important;
              }
              table.mobilePadding {
                margin: 15px 0 !important;
              }
              table.row,
              div.row {
                width: 100% !important;
                max-width: 100% !important;
              }
              table.centerFloat,
              td.centerFloat,
              img.centerFloat {
                float: none !important;
                margin: 0 auto !important;
              }
              td.menuContainer {
                text-align: center !important;
              }
              td.autoHeight {
                height: auto !important;
              }
              td.height200 {
                height: 200px !important;
              }
              td.borderRounded {
                border-radius: 6px !important;
              }
              td.borderNone {
                border: none !important;
              }
              td.imgResponsive img {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin: auto;
              }
              td.centerText {
                text-align: center !important;
              }
              td.containerPadding {
                width: 100% !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
              }
              td.spaceControl {
                height: 15px !important;
                font-size: 15px !important;
                line-height: 15px !important;
              }
            }
          </style>
        </head>
        <body
          style="mso-line-height-rule: exactly; word-break: break-word; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: 0; padding: 0; width: 100%"
          width="100%"
        >
          <center>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="headerBgColor" align="center" valign="top" bgcolor="#FFFFFF">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="30"
                              align="center"
                              valign="top"
                              style="font-size: 30px; line-height: 30px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top" style="font-size: 0; padding: 0">
                              <table
                                class="row"
                                border="0"
                                align="Center"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tr>
                                  <td align="center" valign="top">
                                    <a href="https://example.com/"
                                      ><img
                                        src="https://editor.liramail.com/images/uploads/647270/1634693350-rl.png"
                                        width="200"
                                        alt="Russ Lyon"
                                        style="display: block; border: 0px; width: 200px; border-radius: 4px"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="30"
                              align="center"
                              valign="top"
                              style="font-size: 30px; line-height: 30px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              height="30"
                              style="font-size: 30px; line-height: 30px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td
                                    class="midTitle"
                                    align="center"
                                    valign="middle"
                                    style="
                                font-family: Open Sans, Arial, Helvetica, sans-serif;
                                color: #191919;
                                font-size: 20px;
                                line-height: 30px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                padding-bottom: 20px;
                              "
                                  >
                                    An inspired family relentlessly pursuing excellence in our
                                    industry and in life.
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="middle">
                                    <table
                                      width="50"
                                      border="0"
                                      align="center"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td
                                          class="titleDivider"
                                          align="center"
                                          valign="middle"
                                          bgcolor="#E00734"
                                          style="background-color: #000000; font-size: 1px; height: 1px; line-height: 1px"
                                        >
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td
                                    class="centerText senderName"
                                    align="left"
                                    valign="middle"
                                    style="font-family: Open Sans, Arial, Helvetica, sans-serif; color: #444444; font-size: 16px; line-height: 26px; font-weight: 700; letter-spacing: 0px; padding: 0px"
                                  >
                                    Dear ${preferredName},
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="centerText descrption"
                                    align="left"
                                    valign="middle"
                                    style="font-family: Open Sans, Arial, Helvetica, sans-serif; color: #444444; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px"
                                  >
                                    We're excited to have you part of the family! Below will be some
                                    of the most essential information you'll receive. Please take
                                    the time to read it and plan to reference it as much as needed.
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 0px; line-height: 0px; height: 0px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px; height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td
                                    class="centerText title"
                                    align="left"
                                    valign="middle"
                                    style="font-family: Open Sans, Arial, Helvetica, sans-serif; color: #444444; font-size: 18px; line-height: 30px; font-weight: 700; letter-spacing: 0px; padding: 0px"
                                  >
                                    What's next?
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="centerText descrption"
                                    align="left"
                                    valign="middle"
                                    style="font-family: 'Open Sans', Arial, Helvetica, sans-serif; color: #444444; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0"
                                  >
                                    Over the next week or two you will receive quite a bit of
                                    information, it can be a lot, but it’s ok! We will help you
                                    succeed and you have an amazing team at your fingertips.<br /><br />You
                                    will meet our Corproate Staff at the New Agent Orientation
                                    hosted by
                                    <a
                                      href="mailto:mike.balzotti@russlyon.com"
                                      style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                      >Mike Balzotti</a
                                    >. Be sure to sign up as soon as you can, he provides valuable
                                    information about the tools you now have at access to.&nbsp;<br /><br /><a
                                      href=" https://bcove.video/2Jgol0K"
                                      style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                      >Here is a quick video from Mike to get you started<br /></a
                                    ><a
                                      href="https://peaktraining.org/training.html"
                                      style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                      >Register for New Agent Orientation Here<br /></a
                                    ><br />Your Office Manager and/or your Office’s Director of
                                    First Impressions will also be providing an orientation, which
                                    will differ from Mikes New Agent Orientation. They will help you
                                    sign into all those tools that Mike will review and familiarize
                                    you with your office. Your Branch Manager and Director of First
                                    Impressions will be your go-to for any questions you have.
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 9px; line-height: 9px; height: 9px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px; height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td
                                    class="centerText title"
                                    align="left"
                                    valign="middle"
                                    style="font-family: Open Sans, Arial, Helvetica, sans-serif; color: #444444; font-size: 18px; line-height: 30px; font-weight: 700; letter-spacing: 0px; padding: 0px"
                                  >
                                    Important Logins
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="centerText descrption"
                                    align="left"
                                    valign="middle"
                                    style="font-family: 'Open Sans', Arial, Helvetica, sans-serif; color: #444444; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0"
                                  >
                                    We have a few applications we use which require logins, some use
                                    whats called SSO (securely use one set of credentials for
                                    multiple logins) and some do not.&nbsp;<br /><br />With this
                                    said, your @russlyon.com email address and password will be your
                                    most important and if you're reading this, you're good to
                                    go!&nbsp;<br /><br /><b>Email (Rnet)<br /></b>
                                    <ul>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Login URL -
                                        <a
                                          href="https://gmail.com"
                                          style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                          >gmail.com</a
                                        >
                                      </li>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Username -
                                        ${preferredName.toLowerCase()}.${last.toLowerCase()}@russlyon.com
                                      </li>
                                    </ul>
                                    <b>Lyon Connect<br /></b>
                                    <ul>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Login URL -
                                        <a
                                          href="https://connect.russlyon.com"
                                          style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                          >https://connect.russlyon.com</a
                                        >
                                      </li>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Username &amp; Password - Just login with your @russlyon.com
                                        email
                                      </li>
                                    </ul>
                                    <b>Agent Profile<br /></b>Please use this form to submit your
                                    personal profile. We will update russlyon.com, sir.com, &amp;
                                    luxre.com for you.<br />
                                    <ul>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        <a
                                          href="https://connect.russlyon.com/marketing/5eb0b5464fec825a5d7ed9bf/order"
                                          style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                          >Agent Profile Form</a
                                        >
                                      </li>
                                    </ul>
                                    <b>Access (https://access.sir.com)<br /></b>
                                    <ul>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Login URL - https://access.sir.com
                                      </li>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Username
                                        -&nbsp;${preferredName.toLowerCase()}.${last.toLowerCase()}@sothebysrealty.com
                                      </li>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Temp Password - this password arrives within 72 hours of you
                                        coming on board.&nbsp;Once you receive it sign in as soon as
                                        possible, it expires after 72 hours.
                                      </li>
                                    </ul>
                                    Collateral Analytics<br />
                                    <ul>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Login URL -&nbsp;<a
                                          href="https://amw.collateralanalytics.com/login.aspx"
                                          style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                          >https://amw.collateralanalytics.com/login.aspx</a
                                        >
                                      </li>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Username -
                                        ${preferredName.toLowerCase()}.${last.toLowerCase()}@russlyon.com
                                      </li>
                                      <li style="margin: 0px; padding: 0px 0px 10px">
                                        Temp Password - p1wd
                                      </li>
                                    </ul>
                                    <b
                                      >Links to all Russ Lyon Sotheby’s International Realty systems
                                      available on - we suggest you bookmark this page:
                                      <a
                                        href="https://start.russlyon.com"
                                        style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                        >https://start.russlyon.com</a
                                      ></b
                                    ><br /><br />You’ll be guided through the rest of the details
                                    soon. Take it at your pace, but be sure to stay in touch with
                                    your office staff. We’ll all do our best to ensure you have
                                    everything you need.
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 0px; line-height: 0px; height: 0px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td
                                    class="centerText title"
                                    align="left"
                                    valign="middle"
                                    style="font-family: Open Sans, Arial, Helvetica, sans-serif; color: #444444; font-size: 18px; line-height: 30px; font-weight: 700; letter-spacing: 0px; padding: 0px"
                                  >
                                    Cloze CRM and ActivePipe Email Marketing
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="centerText descrption"
                                    align="left"
                                    valign="middle"
                                    style="font-family: 'Open Sans', Arial, Helvetica, sans-serif; color: #444444; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0"
                                  >
                                    Russ Lyon is a proud partner of Cloze CRM and ActivePipe, two of
                                    the best customer relationship and marketing tools around. We
                                    have negotiated pricing with them which offer you the most
                                    features at a reduced cost. These two apps will help you keep
                                    your clients organized and you top-of-mind. We strongly
                                    encourage you to take advantage of both.<br /><br /><a
                                      href="https://connect.russlyon.com/marketing/5e4988ab834b5d723b783196/order"
                                      style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                      >Sign up for Cloze Here</a
                                    ><br /><a
                                      href="https://connect.russlyon.com/marketing/5e498c5a834b5d723b7831f4/order"
                                      style="text-size-adjust: 100%; text-decoration: none; color: #0f90d3"
                                      >Sign up for ActivePipe Here</a
                                    ><br />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 0px; line-height: 0px; height: 0px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 0px; line-height: 0px; height: 0px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td
                                    class="centerText title"
                                    align="left"
                                    valign="middle"
                                    style="font-family: Open Sans, Arial, Helvetica, sans-serif; color: #444444; font-size: 18px; line-height: 30px; font-weight: 700; letter-spacing: 0px; padding: 0px"
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    class="centerText descrption"
                                    align="left"
                                    valign="middle"
                                    style="font-family: 'Open Sans', Arial, Helvetica, sans-serif; color: #444444; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0"
                                  >
                                    We look forward to seeing you at New Agent Orientation!
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#F5F5F5">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              height="30"
                              style="font-size: 30px; line-height: 30px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#FFFFFF">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td class="containerPadding" align="center" valign="middle">
                              <table
                                class="row"
                                border="0"
                                width="500"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 500px; max-width: 500px"
                              >
                                <tr>
                                  <td valign="middle" align="left" width="60"></td>
                                  <td valign="middle" align="left">
                                    <table
                                      class="row"
                                      border="0"
                                      align="left"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td
                                          class="signatureRegards"
                                          align="left"
                                          valign="middle"
                                          style="
                                      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                                      color: #191919;
                                      font-size: 14px;
                                      line-height: 24px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      padding: 0;
                                    "
                                        ></td>
                                      </tr>
                                      <tr>
                                        <td
                                          class="signatureName"
                                          align="left"
                                          valign="middle"
                                          style="
                                      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
                                      color: #5f6c72;
                                      font-size: 14px;
                                      line-height: 24px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      padding: 0;
                                    "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="20"
                              align="center"
                              valign="top"
                              style="font-size: 20px; line-height: 20px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="bodyBgColor"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#FFFFFF"
              style="width: 100%; max-width: 100%"
            >
              <tr>
                <td align="center" valign="top">
                  <table
                    class="row"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td class="whiteBgcolor" align="center" valign="top" bgcolor="#FFFFFF">
                        <table
                          class="row"
                          width="600"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 600px; max-width: 600px"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              height="30"
                              style="font-size: 30px; line-height: 30px"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </body>
      </html>
    `
  }
}
