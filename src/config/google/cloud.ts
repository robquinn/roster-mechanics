const GoogleCloudConsoleConfig: RosterMechanics.Config.Google.Cloud = (async () => {
  return await new Promise((resolve) => {
    resolve({
      serviceAccount: {
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string,
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL as string,
        client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID as string,
      },
    })
  })
})() as RosterMechanics.Config.Google.Cloud

export default GoogleCloudConsoleConfig
