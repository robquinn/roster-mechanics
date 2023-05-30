import HTTPResponse from '../../../http-response'

const gmailApiListLabelsResponse: RosterMechanics.Test.HTTPResponse.IHTTPResponse = new HTTPResponse({
  headers: {},
  response: JSON.stringify({
    labels: [
      {
        id: 'CHAT',
        name: 'CHAT',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'SENT',
        name: 'SENT',
        type: 'system',
      },
      {
        id: 'INBOX',
        name: 'INBOX',
        type: 'system',
      },
      {
        id: 'IMPORTANT',
        name: 'IMPORTANT',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'TRASH',
        name: 'TRASH',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'DRAFT',
        name: 'DRAFT',
        type: 'system',
      },
      {
        id: 'SPAM',
        name: 'SPAM',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelShow',
        type: 'system',
      },
      {
        id: 'CATEGORY_FORUMS',
        name: 'CATEGORY_FORUMS',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'CATEGORY_UPDATES',
        name: 'CATEGORY_UPDATES',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'CATEGORY_PERSONAL',
        name: 'CATEGORY_PERSONAL',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'CATEGORY_PROMOTIONS',
        name: 'CATEGORY_PROMOTIONS',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'CATEGORY_SOCIAL',
        name: 'CATEGORY_SOCIAL',
        messageListVisibility: 'hide',
        labelListVisibility: 'labelHide',
        type: 'system',
      },
      {
        id: 'STARRED',
        name: 'STARRED',
        type: 'system',
      },
      {
        id: 'UNREAD',
        name: 'UNREAD',
        type: 'system',
      },
      {
        id: 'Label_40',
        name: 'Notes',
        type: 'user',
      },
      {
        id: 'Label_41',
        name: '[Imap]/Drafts',
        type: 'user',
      },
    ],
  }),
  code: 200,
})

export default gmailApiListLabelsResponse
