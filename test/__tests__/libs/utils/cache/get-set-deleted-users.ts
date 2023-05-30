import { describe, expect, it } from '@jest/globals'
import getSetDeletedUsers from '../../../../../src/libs/utils/cache/get-set-deleted-users'
import { sampleUser1, sampleUser2, sampleUser3 } from '../../../../samples/users'

describe('getSetDeletedUsers', () => {
  it(`should set and get user style 1`, async () => {
    const sampleUser = sampleUser1()
    const cache = await getSetDeletedUsers({ email: sampleUser.primaryEmail as string, id: sampleUser.id as string })
    expect(cache.get(sampleUser.primaryEmail as string)).toBe(sampleUser.id)
  })
  it(`should set and get user style 2`, async () => {
    const sampleU1 = sampleUser1()
    const sampleU2 = sampleUser2()
    const sampleU3 = sampleUser3()

    await getSetDeletedUsers({ email: sampleU1.primaryEmail as string, id: sampleU1.id as string })
    await getSetDeletedUsers({ email: sampleU2.primaryEmail as string, id: sampleU2.id as string })
    await getSetDeletedUsers({ email: sampleU3.primaryEmail as string, id: sampleU3.id as string })

    const cache = await getSetDeletedUsers()

    expect(cache.get(sampleU1.primaryEmail as string)).toBe(sampleU1.id)
    expect(cache.get(sampleU2.primaryEmail as string)).toBe(sampleU2.id)
    expect(cache.get(sampleU3.primaryEmail as string)).toBe(sampleU3.id)
  })
})
