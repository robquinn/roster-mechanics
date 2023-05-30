const GooglePeopleConfig: RosterMechanics.Config.Google.People = (async () => {
  return await new Promise((resolve) => {
    resolve({
      contacts: {
        directory: {
          userEmailForDomainDirectory: process.env.GOOGLE_PEOPLE_DIRECTORY_LISTING_ACCOUNT as string,
        },
      },
    })
  })
})() as RosterMechanics.Config.Google.People

export default GooglePeopleConfig
