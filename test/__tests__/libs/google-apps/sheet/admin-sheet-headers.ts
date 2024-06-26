import { describe, expect, it } from '@jest/globals'
import adminSheetHeaders from '../../../../../src/libs/google-apps/sheet/admin-sheet-headers'

describe('adminSheetHeaders', () => {
  it('should return the admin sheet headers', async () => {
    const sheetHeaders = await adminSheetHeaders()
    expect(Array.isArray(sheetHeaders)).toBe(true)
    expect(sheetHeaders).toEqual([
      'Updated At',
      'Created At',
      'Edit Response URL',
      'Hire Date',
      'First Name',
      'Last Name',
      'Email',
      'Preferred Name',
      'Office',
      'Role',
      'Phone',
      'Date Licensed',
      'Licensed Number',
      'License Expiration Date',
      'Years Licensed',
      'Ninja',
      'Ninja Audit',
      'Lone Wolf Number',
      'PC or PLLC',
      'Board',
      'MLS ID',
      'Board 2',
      'MLS ID 2',
      'Board 3',
      'MLS ID 3',
      'Re-Hire',
      'Re-Hire Last Date with RLSIR',
      'Recruited From',
      'Sever Date',
      'New Brokerage',
      'Inactive Reason',
      'Special Status',
      'Status Type',
      'Joining Team',
      // 'Hire Fee',
      'Charge $395',
      'Monthly Fees',
      'Date Fees to Start',
      'Notes',
    ])
  })
})
