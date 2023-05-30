import { afterAll, describe, expect, it, jest } from '@jest/globals'
import * as updateUserGroups from '../../../../../src/libs/google-apps/admin/update-user-groups'
import updateUser from '../../../../../src/libs/google-apps/admin/update-user'
import { sampleUser8 } from '../../../../samples/users'

type ICustomSchema = RosterMechanics.GoogleApps.Admin.Schema.ICustomSchema

const newUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = sampleUser8()
const oldUser: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser = sampleUser8()

afterAll(() => {
  ;(newUser.customSchemas as ICustomSchema).Roster.Office = 'Carefree'
})

describe('updateUser', () => {
  ;(newUser.customSchemas as ICustomSchema).Roster.Office = 'Pinnacle Peak'

  it('should call console log with correct message if successful', async () => {
    const logSpy = jest.spyOn(console, 'log')
    const updateUserGroupsSpy = jest.spyOn(updateUserGroups, 'default')

    const updatedUser = await updateUser({ newUser, oldUser })
    expect(logSpy).toHaveBeenCalledWith('User %s updated with ID %s.', updatedUser.primaryEmail, updatedUser.id)
    expect(updateUserGroupsSpy).toHaveBeenCalledTimes(1)
    expect(updateUserGroupsSpy).toHaveBeenCalledWith({ newUserData: newUser, oldUserData: oldUser })
  })
})
