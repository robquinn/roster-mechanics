import { describe, expect, it } from '@jest/globals'
import dateForBackup from '../../../../../src/libs/utils/date/date-for-backup'

describe('dateForBackup', () => {
  it('should return a date matching the current date and with a the current time', async () => {
    console.log(await dateForBackup())
    const currentdate = new Date()
    const regexp = new RegExp(
      `${
        currentdate.getMonth() + 1
      }/${currentdate.getDate()}/${currentdate.getFullYear()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
    )
    expect(await dateForBackup()).toMatch(regexp)
  })
})
