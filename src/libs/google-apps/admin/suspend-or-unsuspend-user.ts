import SuspensionEmail from '../../emails/suspension'
import ifEmptyThenNull from '../../utils/format/if-empty-then-null'
import getByEmail from './get-by-email'

type ICustomSchema = RosterMechanics.GoogleApps.Admin.Schema.ICustomSchema

const suspendOrUnsuspendUser: RosterMechanics.GoogleApps.Admin.Fn.SuspendOrUnsuspendUser = async (
  latestResponse: RosterMechanics.GoogleApps.Form.FormResponseSuspendObject,
): Promise<RosterMechanics.GoogleApps.Admin.Schema.GoogleUser> => {
  const user = await getByEmail(latestResponse.email)

  user.suspended = latestResponse.suspend === 'Suspend'
  ;(user.customSchemas as ICustomSchema).Roster.Sever_Date = await ifEmptyThenNull(latestResponse.severDate)
  ;(user.customSchemas as ICustomSchema).Roster.Inactive_Reason = await ifEmptyThenNull(latestResponse.inactiveReason)
  ;(user.customSchemas as ICustomSchema).Roster.New_Brokerage = await ifEmptyThenNull(latestResponse.newBrokerage)
  ;(user.customSchemas as ICustomSchema).Roster.Updated_At = new Date(Date.now()).toString()

  return await new Promise((resolve, reject) => {
    try {
      const updatedUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = AdminDirectory.Users?.update(
        user,
        user.id as string,
      ) as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser

      if (updatedUser?.suspended === true) {
        const suspensionEmail = new SuspensionEmail(user)
        suspensionEmail
          .send()
          .then(() => {
            return true
          })
          .catch((err) => {
            console.log('suspendUser suspensionEmail.send() ERROR', err)
          })
      }
      resolve(updatedUser)
    } catch (err) {
      reject(new Error(`suspendUser update ERROR: ${err as string}`))
    }
  })
}

export default suspendOrUnsuspendUser
