import { describe, expect, it, jest, beforeEach } from '@jest/globals'

// --- Inline mocks using factory functions ---
jest.mock('../../../../src/libs/google-apis/gmail', () => {
  const sendEmailAsUser = jest.fn().mockResolvedValue(undefined as never)
  class GmailApi {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, class-methods-use-this, @typescript-eslint/no-explicit-any
    sendEmailAsUser(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return sendEmailAsUser(...args)
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    static Scopes() {
      return ['scope1', 'scope2']
    }
  }
  return {
    __esModule: true,
    default: GmailApi,
    mockSendEmailAsUser: sendEmailAsUser,
  }
})

jest.mock('../../../../src/libs/google-apis/service-account', () => {
  const reset = jest.fn()
  const GoogleServiceAccount = jest.fn().mockImplementation(() => ({
    reset,
  }))
  return {
    __esModule: true,
    default: GoogleServiceAccount,
    mockReset: reset,
  }
})

jest.mock('../../../../src/libs/utils/general/exponential-backoff-async', () => {
  const mockExponentialBackoffAsync = jest.fn(async ({ action }: { action: () => Promise<unknown> }) => await action())
  return {
    __esModule: true,
    default: mockExponentialBackoffAsync,
    mockExponentialBackoffAsync,
  }
})

// --- Import the module under test AFTER the mocks are defined ---
/* eslint-disable import/first */
import WarmWelcomeEmail from '../../../../src/libs/emails/warm-welcome'
/* eslint-enable import/first */

// Retrieve the mocks from the mocked modules
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
const { mockSendEmailAsUser } = jest.requireMock('../../../../src/libs/google-apis/gmail') as {
  mockSendEmailAsUser: jest.Mock
}
const { mockReset } = jest.requireMock('../../../../src/libs/google-apis/service-account') as { mockReset: jest.Mock }
/* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */

// --- Sample User Data for Tests ---
const sampleUser = {
  customSchemas: {
    Roster: {
      Office: 'Headquarters',
      Phone: '123-456-7890',
    },
  },
  name: {
    givenName: 'Alice',
    familyName: 'Smith',
  },
}

const validEmailParams = {
  toEmail: 'recipient@example.com',
  fromEmail: 'sender@example.com',
  fromFirstName: 'SenderFirstName',
  fromLastName: 'SenderLastName',
}

describe('WarmWelcomeEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be an instance of WarmWelcomeEmail', () => {
    const email = new WarmWelcomeEmail(sampleUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    expect(email).toBeInstanceOf(WarmWelcomeEmail)
  })

  it('should throw an error if office is not defined', async () => {
    const userWithoutOffice = {
      ...sampleUser,
      customSchemas: {
        Roster: {
          Office: '',
          Phone: sampleUser.customSchemas.Roster.Phone,
        },
      },
    }
    const email = new WarmWelcomeEmail(userWithoutOffice as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    await expect(email.send(validEmailParams)).rejects.toThrow('Office is not defined')
  })

  it('should call sendEmailAsUser with correct parameters when sending email', async () => {
    const email = new WarmWelcomeEmail(sampleUser as RosterMechanics.GoogleApps.Admin.Schema.GoogleUser)
    await email.send(validEmailParams)

    const expectedSubject = WarmWelcomeEmail.getSubject()
    const expectedBody = WarmWelcomeEmail.getBody({
      firstName: sampleUser.name.givenName,
      lastName: sampleUser.name.familyName,
      phone: sampleUser.customSchemas.Roster.Phone,
    })

    expect(mockSendEmailAsUser).toHaveBeenCalledWith({
      fromEmail: validEmailParams.fromEmail,
      fromFirstName: validEmailParams.fromFirstName,
      fromLastName: validEmailParams.fromLastName,
      toEmail: validEmailParams.toEmail,
      subject: expectedSubject,
      body: expectedBody,
    })

    expect(mockReset).toHaveBeenCalled()
  })

  it('getSubject should return the correct subject', () => {
    expect(WarmWelcomeEmail.getSubject()).toBe('Super Exciting News!')
  })

  it('getBody should return a body containing the recipient details', () => {
    const firstName = sampleUser.name.givenName
    const lastName = sampleUser.name.familyName
    const phone = sampleUser.customSchemas.Roster.Phone
    const body = WarmWelcomeEmail.getBody({ firstName, lastName, phone })

    expect(typeof body).toBe('string')
    expect(body).toContain(firstName)
    expect(body).toContain(lastName)
    expect(body).toContain(phone)
  })
})
