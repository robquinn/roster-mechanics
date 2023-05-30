const gmailAppSendEmailParamsValidation: RosterMechanics.Test.GmailApp.Fn.GmailAppSendEmailParamsValidation = (
  recipient: string,
  subject: string,
  body: string,
  options: GoogleAppsScript.Mail.MailAdvancedParameters,
): void => {
  if (typeof recipient !== 'string') {
    throw new Error('sendEmail recipient must be a string')
  }
  if (typeof subject !== 'string') {
    throw new Error('sendEmail subject must be a string')
  }
  if (typeof body !== 'string') {
    throw new Error('sendEmail body must be a string')
  }
  if (typeof options.attachments !== 'object' && typeof options.attachments !== 'undefined') {
    throw new Error('sendEmail options.attachments must be a object or undefined')
  }
  if (typeof options.bcc !== 'string' && typeof options.bcc !== 'undefined') {
    throw new Error('sendEmail options.bcc must be a string or undefined')
  }
  if (typeof options.cc !== 'string' && typeof options.cc !== 'undefined') {
    throw new Error('sendEmail options.cc must be a string or undefined')
  }
  if (typeof options.htmlBody !== 'string' && typeof options.htmlBody !== 'undefined') {
    throw new Error('sendEmail options.htmlBody must be a string or undefined')
  }
  if (typeof options.inlineImages !== 'object' && typeof options.inlineImages !== 'undefined') {
    throw new Error('sendEmail options.inlineImages must be a object or undefined')
  }
  if (typeof options.name !== 'string' && typeof options.name !== 'undefined') {
    throw new Error('sendEmail options.name must be a string or undefined')
  }
  if (typeof options.noReply !== 'boolean' && typeof options.noReply !== 'undefined') {
    throw new Error('sendEmail options.noReply must be a boolean or undefined')
  }
  if (typeof options.replyTo !== 'string' && typeof options.replyTo !== 'undefined') {
    throw new Error('sendEmail options.replyTo must be a string or undefined')
  }
  if (typeof options.subject !== 'string' && typeof options.subject !== 'undefined') {
    throw new Error('sendEmail options.subject must be a string or undefined')
  }
  if (typeof options.to !== 'string' && typeof options.to !== 'undefined') {
    throw new Error('sendEmail options.to must be a string or undefined')
  }
}

export default gmailAppSendEmailParamsValidation
