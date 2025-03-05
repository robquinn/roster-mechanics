import EmailConfig from '../../../config/other/email'
import GmailApi from '../../google-apis/gmail'
import GoogleServiceAccount from '../../google-apis/service-account'
import exponentialBackoffAsync from '../../utils/general/exponential-backoff-async'

const createJustListedFilter: RosterMechanics.Wrapper.Gmail.Fn.CreateJustListedFilter = async (
  googleUserObj: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser,
): Promise<void> => {
  // Google Service Account needed to impersonate new user & configure their gmail account
  const googleSA = new GoogleServiceAccount({
    userEmail: googleUserObj.primaryEmail as string,
    serviceName: 'Gmail',
    scopes: GmailApi.Scopes(),
  })

  googleSA.reset()

  const gmailApi = new GmailApi(googleSA)

  // Utilities.sleep(5000)
  // One of the gmail configurations is creating a ***JUST LISTED*** filter
  await exponentialBackoffAsync({
    action: async () => {
      await gmailApi.createFilter({
        query: (await EmailConfig).filters.justListed.query,
        labelName: (await EmailConfig).filters.justListed.labelName,
        skipInbox: true,
      })
    },
    maxNumTries: 10,
    name: 'gmailApi.createFilter.createJustListedFilter',
  })

  await Promise.resolve()
}

export default createJustListedFilter
