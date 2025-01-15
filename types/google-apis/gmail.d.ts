declare namespace RosterMechanics {
  namespace GoogleApis {
    namespace Gmail {
      interface IGmailApi {
        listSendAs: () => Promise<Response.Body.ListSendAs>
        patchSendAs: ({
          firstName,
          lastName,
          userEmail,
          signatureHtml,
        }: {
          firstName: string
          lastName: string
          userEmail: string
          signatureHtml: string
        }) => Promise<Response.Body.PatchSendAs>
        createFilter: ({
          query,
          labelName,
          skipInbox,
        }: {
          query: string
          labelName: string
          skipInbox: boolean
        }) => Promise<void>
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      interface Label extends GoogleAppsScript.Gmail.Schema.Label {}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      interface Message extends GoogleAppsScript.Gmail.Schema.Message {}
      namespace Request {
        type Endpoints = Record<
          | 'listSendAs'
          | 'patchSendAs'
          | 'createLabel'
          | 'listLabels'
          | 'createFilter'
          | 'batchModifyMessages'
          | 'listMessages',
          {
            url: string
            method: GoogleAppsScript.URL_Fetch.HttpMethod
          }
        >
        namespace Query {
          interface ListMessages {
            /** Global.IntRange<0,500> */
            maxResults: number
            pageToken: string
            q: string
            labelIds?: string[]
            includeSpamTrash: boolean
          }
        }
        namespace Body {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface PatchSendAs extends GoogleAppsScript.Gmail.Schema.SendAs {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface CreateLabel extends GoogleAppsScript.Gmail.Schema.Label {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface CreateFilter extends GoogleAppsScript.Gmail.Schema.Filter {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface BatchModifyMessages extends GoogleAppsScript.Gmail.Schema.BatchModifyMessagesRequest {}
        }
      }

      namespace Response {
        namespace Body {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface ListSendAs extends GoogleAppsScript.Gmail.Schema.SendAs {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface PatchSendAs extends GoogleAppsScript.Gmail.Schema.SendAs {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface CreateLabel extends GoogleAppsScript.Gmail.Schema.Label {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface ListLabels {
            labels: GoogleAppsScript.Gmail.Schema.Label[]
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface CreateFilter extends GoogleAppsScript.Gmail.Schema.Filter {}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          interface ListMessages extends GoogleAppsScript.Gmail.Schema.ListMessagesResponse {}
          // eslint-disable-next-line @typescript-eslint/no-empty-interface
          interface BatchModifyMessages {}
        }
      }
    }
  }
}
