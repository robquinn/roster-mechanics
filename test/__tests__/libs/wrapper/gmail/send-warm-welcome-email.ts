import { describe, it, expect, beforeEach, jest } from '@jest/globals'

// --- Inline mocks must be declared before importing the module under test ---

// Mock isProd so we can control whether we're in production.
jest.mock('../../../../../src/libs/utils/general/is-prod', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Mock RussLyonConfig to return a fixed configuration.
jest.mock('../../../../../src/config/company/russ-lyon', () => ({
  __esModule: true,
  default: Promise.resolve({
    offices: {
      Headquarters: {
        emails: {
          allInOffice: 'all@office.com',
        },
        manager: {
          email: 'manager@office.com',
          first: 'ManagerFirst',
          last: 'ManagerLast',
        },
      },
    },
  }),
}))

// Inline mock for WarmWelcomeEmail
jest.mock('../../../../../src/libs/emails/warm-welcome', () => {
  const mockSend = jest.fn().mockResolvedValue(undefined as never)
  const mockWarmWelcomeEmail = jest.fn().mockImplementation(() => ({
    send: mockSend,
  }))
  return {
    __esModule: true,
    default: mockWarmWelcomeEmail,
    // Expose the mockSend if needed for assertions.
    mockSend,
  }
})

// --- Import the module under test AFTER the mocks have been set up ---
/* eslint-disable import/first */
import sendWarmWelcomeEmail from '../../../../../src/libs/wrapper/gmail/send-warm-welcome-email'
import isProd from '../../../../../src/libs/utils/general/is-prod'
import WarmWelcomeEmail from '../../../../../src/libs/emails/warm-welcome' // This is now our inline mock
/* eslint-enable import/first */

describe('sendWarmWelcomeEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if office is not defined', async () => {
    const userWithoutOffice = {
      customSchemas: {
        Roster: {
          Office: '',
          Role: 'Sales Associate',
        },
      },
    }

    await expect(
      sendWarmWelcomeEmail(userWithoutOffice as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser),
    ).rejects.toThrow('Office is not defined')
    // WarmWelcomeEmail should not even be instantiated in this case.
    expect(WarmWelcomeEmail).not.toHaveBeenCalled()
  })

  it('should return early if the office is filtered out (e.g., Fountain Hills)', async () => {
    const userFiltered = {
      customSchemas: {
        Roster: {
          Office: 'Fountain Hills',
          Role: 'Sales Associate',
        },
      },
    }

    await expect(
      sendWarmWelcomeEmail(userFiltered as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser),
    ).resolves.toBeUndefined()
    // Should not instantiate WarmWelcomeEmail since the office is filtered.
    expect(WarmWelcomeEmail).not.toHaveBeenCalled()
  })

  it('should return early if the role is not "Sales Associate"', async () => {
    const userFiltered = {
      customSchemas: {
        Roster: {
          Office: 'Headquarters',
          Role: 'Manager',
        },
      },
    }

    await expect(
      sendWarmWelcomeEmail(userFiltered as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser),
    ).resolves.toBeUndefined()
    expect(WarmWelcomeEmail).not.toHaveBeenCalled()
  })

  it('should call warmWelcomeEmail.send with config from RussLyonConfig when in production', async () => {
    const validUser = {
      customSchemas: {
        Roster: {
          Office: 'Headquarters',
          Role: 'Sales Associate',
        },
      },
    }

    // Simulate production environment.
    ;(isProd as jest.Mock).mockResolvedValue(true as never)

    await sendWarmWelcomeEmail(validUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)

    // Ensure that WarmWelcomeEmail was instantiated with the user.
    expect(WarmWelcomeEmail).toHaveBeenCalledWith(validUser)
    const instance = (WarmWelcomeEmail as unknown as jest.Mock).mock.results[0].value as { send: jest.Mock }

    // Expected parameters are taken from the RussLyonConfig mock.
    expect(instance.send).toHaveBeenCalledWith({
      toEmail: 'all@office.com',
      fromEmail: 'manager@office.com',
      fromFirstName: 'ManagerFirst',
      fromLastName: 'ManagerLast',
    })
  })

  it('should call warmWelcomeEmail.send with fallback email when not in production', async () => {
    const validUser = {
      customSchemas: {
        Roster: {
          Office: 'Headquarters',
          Role: 'Sales Associate',
        },
      },
    }

    // Simulate non-production environment.
    ;(isProd as jest.Mock).mockResolvedValue(false as never)

    await sendWarmWelcomeEmail(validUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)

    expect(WarmWelcomeEmail).toHaveBeenCalledWith(validUser)
    const instance = (WarmWelcomeEmail as unknown as jest.Mock).mock.results[0].value as { send: jest.Mock }

    expect(instance.send).toHaveBeenCalledWith({
      toEmail: 'robert.quinn@russlyon.com',
      fromEmail: 'manager@office.com',
      fromFirstName: 'ManagerFirst',
      fromLastName: 'ManagerLast',
    })
  })
})
