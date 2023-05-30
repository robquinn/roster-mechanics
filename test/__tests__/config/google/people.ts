import { describe, expect, it } from '@jest/globals'
import GooglePeopleConfig from '../../../../src/config/google/people'

describe('GooglePeopleConfig', () => {
  it('should have property "Contacts" and child properties"', async () => {
    const GooglePeopleConfigAwaited = await GooglePeopleConfig
    expect(GooglePeopleConfigAwaited).toHaveProperty('contacts')
    expect(GooglePeopleConfigAwaited.contacts).toHaveProperty('directory')
    expect(GooglePeopleConfigAwaited.contacts.directory).toHaveProperty('userEmailForDomainDirectory')
    expect(GooglePeopleConfigAwaited.contacts.directory.userEmailForDomainDirectory).toBe(
      process.env.GOOGLE_PEOPLE_DIRECTORY_LISTING_ACCOUNT,
    )
  })
})
