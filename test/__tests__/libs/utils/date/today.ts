import { describe, expect, it } from '@jest/globals'
import moment from 'moment'
import today from '../../../../../src/libs/utils/date/today'

describe('today', () => {
  it("should return today's date in ISO format", async () => {
    const todaysDate = moment(new Date(Date.now())).format('M.D.YYYY')
    expect(await today()).toBe(todaysDate)
  })
})
