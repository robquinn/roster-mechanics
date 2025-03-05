/* eslint-disable no-await-in-loop */
type IGmailApi = RosterMechanics.GoogleApis.Gmail.IGmailApi

export default class GmailApi implements IGmailApi {
  private readonly googleSA: RosterMechanics.GoogleApis.ServiceAccount.IGoogleServiceAccount
  constructor(googleSA: RosterMechanics.GoogleApis.ServiceAccount.IGoogleServiceAccount) {
    this.googleSA = googleSA
  }

  static Scopes(): string {
    return [
      'https://www.googleapis.com/auth/gmail.settings.basic',
      'https://www.googleapis.com/auth/gmail.settings.sharing',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.readonly',
    ].join(' ')
  }

  static Endpoints(params?: { sendAsEmail?: string }): RosterMechanics.GoogleApis.Gmail.Request.Endpoints {
    return {
      sendEmail: {
        url: `https://gmail.googleapis.com/gmail/v1/users/${params?.sendAsEmail as string}/messages/send`,
        method: 'post',
      },
      getUserSignature: {
        url: `https://gmail.googleapis.com/gmail/v1/users/${params?.sendAsEmail as string}/settings/sendAs/${
          params?.sendAsEmail as string
        }`,
        method: 'get',
      },
      listSendAs: {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs',
        method: 'get',
      },
      patchSendAs: {
        url: `https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/${params?.sendAsEmail as string}`,
        method: 'patch',
      },
      createLabel: {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/labels',
        method: 'post',
      },
      listLabels: {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/labels',
        method: 'get',
      },
      createFilter: {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/settings/filters',
        method: 'post',
      },
      batchModifyMessages: {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/batchModify',
        method: 'post',
      },
      listMessages: {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages',
        method: 'get',
      },
    }
  }

  public async sendEmailAsUser({
    fromEmail,
    fromFirstName,
    fromLastName,
    toEmail,
    subject,
    body,
  }: {
    fromEmail: string
    fromFirstName: string
    fromLastName: string
    toEmail: string
    subject: string
    body: string
  }): Promise<void> {
    const signature = await this.getUserSignature(fromEmail)
    if (signature === '') {
      throw new Error(`No signature found for ${fromEmail}. Email not sent.`)
    }
    const emailBody = `${body}\n\n${signature}` // Append signature

    const emailContent =
      `From: ${fromFirstName} ${fromLastName} <${fromEmail}>\r\n` +
      `To: ${toEmail}\r\n` +
      `Subject: ${subject}\r\n` +
      `MIME-Version: 1.0\r\n` +
      `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
      `${emailBody}`

    const rawEmail = Utilities.base64EncodeWebSafe(emailContent)

    const payload = {
      body: {
        raw: rawEmail,
      },
    }

    try {
      await this.googleSA.run({
        ...GmailApi.Endpoints({ sendAsEmail: fromEmail }).sendEmail,
        payload: payload as {
          body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
        },
      })
      console.log(`Email sent from ${fromFirstName} ${fromLastName} (${fromEmail}) to ${toEmail} with signature.`)
    } catch (err) {
      console.log(`Failed to send email: ${String(err)}`)
    }
  }

  public async getUserSignature(userEmail: string): Promise<string> {
    try {
      console.log(`Fetching email signature for: ${userEmail}`)

      const response = (await this.googleSA.run({
        ...GmailApi.Endpoints({ sendAsEmail: userEmail }).getUserSignature,
      })) as RosterMechanics.GoogleApis.Gmail.Response.Body.GetUserSignature

      console.log(`API Response for signature:`, response)

      if (response?.signature !== '') {
        return response.signature ?? ''
      }
      console.log(`No signature found for ${userEmail}. Response:`, response)
      return ''
    } catch (err) {
      console.log(`Failed to fetch email signature for ${userEmail}:`, err)
      return '' // Return an empty string if an error occurs
    }
  }

  public async listSendAs(): Promise<RosterMechanics.GoogleApis.Gmail.Response.Body.ListSendAs> {
    return (await this.googleSA.run({
      ...GmailApi.Endpoints().listSendAs,
    })) as RosterMechanics.GoogleApis.Gmail.Response.Body.ListSendAs
  }

  public async patchSendAs({
    firstName,
    lastName,
    userEmail,
    signatureHtml,
  }: {
    firstName: string
    lastName: string
    userEmail: string
    signatureHtml: string
  }): Promise<RosterMechanics.GoogleApis.Gmail.Response.Body.PatchSendAs> {
    const payload: {
      body: RosterMechanics.GoogleApis.Gmail.Request.Body.PatchSendAs
    } = {
      body: {
        sendAsEmail: userEmail,
        displayName: `${firstName} ${lastName}`,
        replyToAddress: userEmail,
        signature: signatureHtml,
        isPrimary: true,
        isDefault: true,
        treatAsAlias: false,
        verificationStatus: 'accepted',
      },
    }
    return (await this.googleSA.run({
      ...GmailApi.Endpoints({ sendAsEmail: userEmail }).patchSendAs,
      payload: payload as {
        body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
      },
    })) as RosterMechanics.GoogleApis.Gmail.Response.Body.PatchSendAs
  }

  public async createFilter({
    query,
    labelName,
    skipInbox,
  }: {
    query: string
    labelName: string
    skipInbox: boolean
  }): Promise<void> {
    // addDelegate({ userEmail: userEmail })

    let gmailGetLabelsResponse: RosterMechanics.GoogleApis.Gmail.Response.Body.ListLabels | null = null
    try {
      gmailGetLabelsResponse = (await this.googleSA.run({
        ...GmailApi.Endpoints().listLabels,
      })) as unknown as RosterMechanics.GoogleApis.Gmail.Response.Body.ListLabels
      console.log('gmailGetLabelsResponse', gmailGetLabelsResponse)
    } catch (err) {
      console.log('listLabels', err)
    }

    let label = null
    if (gmailGetLabelsResponse != null) {
      gmailGetLabelsResponse.labels.forEach((l: RosterMechanics.GoogleApis.Gmail.Label) => {
        if (l.name === labelName) {
          label = l
        }
      })
    }

    if (label == null) {
      label = await this.createLabelByGmailApi(labelName)
    } else {
      console.log('label already exits')
    }

    const filter = Gmail.newFilter()

    filter.criteria = Gmail.newFilterCriteria()
    filter.criteria.query = query

    filter.action = Gmail.newFilterAction()
    filter.action.addLabelIds = [label.id as string]

    const payloadCreateFilter: {
      body: RosterMechanics.GoogleApis.Gmail.Request.Body.CreateFilter
    } = {
      body: {
        criteria: {
          query: filter.criteria.query,
        },
        action: {
          addLabelIds: filter.action.addLabelIds,
          removeLabelIds: (skipInbox ? ['INBOX'] : []) as string[],
        },
      },
    }

    try {
      ;(await this.googleSA.run({
        ...GmailApi.Endpoints().createFilter,
        payload: payloadCreateFilter as {
          body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
        },
      })) as RosterMechanics.GoogleApis.Gmail.Response.Body.CreateFilter
    } catch (err) {
      console.log('createFilter', err)
    }

    const messages = await this.listAllUserGmailMessagesByQuery({
      maxResults: 500,
      query,
    })

    const messageIds: string[] = []

    for (let i = 0; i < messages.length; i += 1)
      messageIds.push(((messages[i] as GoogleAppsScript.Gmail.Schema.Message)?.id as string).toString())

    if (messageIds.length > 0) {
      const resource = Gmail.newBatchModifyMessagesRequest()
      resource.ids = messageIds
      resource.addLabelIds = [(label as GoogleAppsScript.Gmail.Schema.Label).id as string]
      resource.removeLabelIds = []

      const payloadBatchModifyMessages: {
        body: RosterMechanics.GoogleApis.Gmail.Request.Body.BatchModifyMessages
      } = {
        body: {
          ids: resource.ids,
          addLabelIds: resource.addLabelIds,
          removeLabelIds: resource.removeLabelIds,
        },
      }
      try {
        ;(await this.googleSA.run({
          ...GmailApi.Endpoints().batchModifyMessages,
          payload: payloadBatchModifyMessages as {
            body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
          },
        })) as RosterMechanics.GoogleApis.Gmail.Response.Body.BatchModifyMessages
      } catch (err) {
        console.log('batchModifyMessages', err)
      }
    }
  }

  private async createLabelByGmailApi(labelName: string): Promise<RosterMechanics.GoogleApis.Gmail.Label> {
    const textColor = '#ffffff'
    const backgroundColor = '#fb4c2f'

    const resource = Gmail.newLabel()
    resource.labelListVisibility = 'labelShow'
    resource.messageListVisibility = 'show'
    resource.name = labelName
    const labelColor = Gmail.newLabelColor()
    labelColor.textColor = textColor
    labelColor.backgroundColor = backgroundColor
    resource.color = labelColor

    const payload: {
      body: RosterMechanics.GoogleApis.Gmail.Request.Body.CreateLabel
    } = {
      body: {
        labelListVisibility: resource.labelListVisibility,
        messageListVisibility: resource.messageListVisibility,
        name: resource.name,
        color: {
          textColor: labelColor.textColor,
          backgroundColor: labelColor.backgroundColor,
        },
      },
    }

    const newLabel: RosterMechanics.GoogleApis.Gmail.Response.Body.CreateLabel = (await this.googleSA.run({
      ...GmailApi.Endpoints().createLabel,
      payload: payload as {
        body: RosterMechanics.GoogleApis.ServiceAccount.Request.Body
      },
    })) as RosterMechanics.GoogleApis.Gmail.Response.Body.CreateLabel

    return newLabel
  }

  private async listAllUserGmailMessagesByQuery({
    query,
    maxResults,
  }: {
    query: string
    maxResults: number
  }): Promise<RosterMechanics.GoogleApis.Gmail.Message[]> {
    let messages: RosterMechanics.GoogleApis.Gmail.Message[] = []

    const payload: {
      query: RosterMechanics.GoogleApis.Gmail.Request.Query.ListMessages
    } = {
      query: {
        includeSpamTrash: true,
        q: query,
        maxResults,
        pageToken: '',
      },
    }
    let gmailMessagesApiResponse: RosterMechanics.GoogleApis.Gmail.Response.Body.ListMessages | null = null
    do {
      try {
        gmailMessagesApiResponse = (await this.googleSA.run({
          ...GmailApi.Endpoints().listMessages,
          payload: payload as unknown as {
            query: RosterMechanics.GoogleApis.ServiceAccount.Request.Query
          },
        })) as RosterMechanics.GoogleApis.Gmail.Response.Body.ListMessages
      } catch (err) {
        console.log('listMessages', err)
      }
      if (gmailMessagesApiResponse != null) {
        console.log('gmailMessagesApiResponse', gmailMessagesApiResponse)
        payload.query.pageToken = gmailMessagesApiResponse.nextPageToken as string
        if (Object.prototype.hasOwnProperty.call(gmailMessagesApiResponse, 'messages'))
          messages = messages.concat(gmailMessagesApiResponse.messages as RosterMechanics.GoogleApis.Gmail.Message[])
      }
    } while (Object.prototype.hasOwnProperty.call(gmailMessagesApiResponse, 'nextPageToken'))

    return await Promise.resolve(messages)
  }
}
