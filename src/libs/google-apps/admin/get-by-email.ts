const getByEmail: RosterMechanics.GoogleApps.Admin.Fn.GetByEmail = async (
  email: string,
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser> => {
  return await new Promise((resolve, reject) => {
    try {
      const user = AdminDirectory?.Users?.get(email, {
        customFieldMask: 'Roster',
        projection: 'full',
        viewType: 'admin_view',
      })
      resolve(user as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    } catch (err) {
      console.log('getByEmail() yielded an error', err)
      reject(err)
    }
  })
}

export default getByEmail
