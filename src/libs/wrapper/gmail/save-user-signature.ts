import GmailApi from '../../google-apis/gmail'
import GoogleServiceAccount from '../../google-apis/service-account'
import getSignatureHtml from '../../google-apps/gmail/get-signature-html'
import exponentialBackoffAsync from '../../utils/general/exponential-backoff-async'

const saveUserSignature: RosterMechanics.Wrapper.Gmail.Fn.SaveUserSignature = async (
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

  // Generate the html for the new user's email signature
  const signatureHtml = await getSignatureHtml({
    firstName: googleUserObj?.name?.givenName as string,
    lastName: googleUserObj?.name?.familyName as string,
    officeName: googleUserObj?.customSchemas?.Roster.Office as string,
    phoneNumber: (googleUserObj.phones as GoogleAppsScript.AdminDirectory.Schema.UserPhone[])?.find(
      (p) => p?.primary === true,
    )?.value as string,
    emailAddress: googleUserObj.primaryEmail as string,
  })

  console.log('Creating email signature...')

  // associate new email signature with user's primary alias
  await exponentialBackoffAsync({
    action: async () => {
      await gmailApi.patchSendAs({
        firstName: googleUserObj?.name?.givenName as string,
        lastName: googleUserObj?.name?.familyName as string,
        userEmail: googleUserObj.primaryEmail as string,
        signatureHtml,
      })
    },
    maxNumTries: 10,
    name: 'gmailApi.createFilter',
  })

  await Promise.resolve()
}

export default saveUserSignature
