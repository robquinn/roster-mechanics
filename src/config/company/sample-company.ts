const SampleCompanyConfig: RosterMechanics.Config.Company.Sample = (async () => {
  return await new Promise((resolve) => {
    resolve({
      offices: {
        OfficeNameFirst: {
          name: 'Office Name 1',
          secretary: { first: 'John' },
          address: {
            street: '4444 The Universe Dr.',
            city: 'Mayfair',
            state: 'TX',
            zip: '45845',
          },
          link: 'https://www.google.com/search?q=link+to+google+business+page',
          emails: {
            allInOffice: 'email.alias.for.all.in.office@somedomain.com',
            allAgentsInOffice: 'email.alias.for.all.agents.in.office@somedomain.com',
            emails: [
              'office.email.recipient.1@somedomain.com',
              'office.email.recipient.2@somedomain.com',
              'office.email.recipient.3@somedomain.com',
              'office.email.recipient.4@somedomain.com',
            ],
            emailsCc: [
              'office.email.recipient.cc.1@somedomain.com',
              'office.email.recipient.cc.2@somedomain.com',
              'office.email.recipient.cc.3@somedomain.com',
              'office.email.recipient.cc.4@somedomain.com',
            ],
            ninjasInOffice: 'ninjas.in.office.email@somedomain.com',
            sever: [],
          },
        },
        OfficeNameSecond: {
          name: 'Office Name 2',
          secretary: { first: 'Jane' },
          address: {
            street: '4444 The Universe Dr.',
            city: 'Mayfair',
            state: 'TX',
            zip: '45845',
          },
          link: 'https://www.google.com/search?q=link+to+google+business+page',
          emails: {
            allInOffice: 'email.alias.for.all.in.office@somedomain.com',
            allAgentsInOffice: 'email.alias.for.all.agents.in.office@somedomain.com',
            emails: [
              'office.email.recipient.1@somedomain.com',
              'office.email.recipient.2@somedomain.com',
              'office.email.recipient.3@somedomain.com',
              'office.email.recipient.4@somedomain.com',
            ],
            emailsCc: [
              'office.email.recipient.cc.1@somedomain.com',
              'office.email.recipient.cc.2@somedomain.com',
              'office.email.recipient.cc.3@somedomain.com',
              'office.email.recipient.cc.4@somedomain.com',
            ],
            sever: [],
            ninjasInOffice: 'ninjas.in.office.email@somedomain.com',
          },
        },
      },
      users: {
        testing: ['testing.user.1@somedomain.com', 'testing.user.2@somedomain.com'],
        protected: ['protected.user.1@somedomain.com', 'protected.user.2@somedomain.com'],
        boardEmails: {
          CAAR: 'board.email@somedomain.com',
          GVSAR: 'board.email@somedomain.com',
          LHAR: 'board.email@somedomain.com',
          NAAR: 'board.email@somedomain.com',
          'Phoenix Realtors': 'board.email@somedomain.com',
          PAAR: 'board.email@somedomain.com',
          SAAR: 'board.email@somedomain.com',
          SVVAR: 'board.email@somedomain.com',
          TAR: 'board.email@somedomain.com',
          WeSERV: 'board.email@somedomain.com',
          WMAR: 'board.email@somedomain.com',
        },
      },
      accounting: {
        drives: {
          shared: {
            folderId: process.env.GOOGLE_DRIVE_ACCOUNTING_DRIVE_FOLDER_ID as string,
          },
        },
      },
      newHire: {
        emails: [
          'newhire.email.recipient.1@somedomain.com',
          'newhire.email.recipient.2@somedomain.com',
          'newhire.email.recipient.3@somedomain.com',
        ],
      },
      sever: {
        emails: ['sever.email.recipient.1@somedomain.com'],
        protected: ['protected.from.sever.1@somedomain.com'],
      },
      calendars: {
        company: {
          calendarId: process.env.GOOGLE_CALENDAR_COMPANY_ID as string,
          calendarName: process.env.GOOGLE_CALENDAR_COMPANY_NAME as string,
        },
      },
    })
  })
})() as RosterMechanics.Config.Company.Sample

export default SampleCompanyConfig
