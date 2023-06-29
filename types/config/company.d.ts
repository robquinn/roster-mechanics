declare namespace RosterMechanics {
  namespace Config {
    namespace Company {
      // Sample Company Config
      type Sample = RussLyon

      // Russ Lyon Config

      type RussLyon = Promise<{
        offices: Record<
          | 'Carefree'
          | 'Desert Mountain'
          | 'Flagstaff'
          | 'Humphreys'
          | 'Market Street'
          | 'Pinnacle Peak'
          | 'Prescott'
          | 'Sedona'
          | 'Southeast Valley'
          | 'Tubac'
          | 'Tucson'
          | 'Camelback Tower'
          | 'West Valley'
          | 'Fountain Hills'
          | string,
          {
            name: string
            secretary: { first: string }
            address: OfficeAddress
            link: string
            emails: OfficeEmails
          }
        >
        users: {
          protected: string[]
          boardEmails: {
            CAAR: string
            GVSAR: string
            LHAR: string
            NAAR: string
            'Phoenix Realtors': string
            PAAR: string
            SAAR?: string
            SVVAR: string
            TAR: string
            WeSERV: string
            WMAR: string
          }
          testing: string[]
        }
        accounting: {
          drives: {
            shared: {
              folderId: string
            }
          }
        }
        newHire: {
          emails: string[]
        }
        sever: {
          emails: string[]
        }
        calendars: {
          company: {
            calendarId: string
            calendarName: string
          }
        }
      }>

      interface OfficeAddress {
        street: string
        city: string
        state: string
        zip: string
      }

      interface OfficeEmails {
        allInOffice: string
        allAgentsInOffice: string
        emails: string[]
        emailsCc: string[]
        sever?: string[]
      }

      interface OfficeEmailsJoined {
        allInOffice: string
        allAgentsInOffice: string
        emails: string
        emailsCc: string
      }
    }
  }
}
