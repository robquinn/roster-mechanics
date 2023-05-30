require('dotenv').config()

module.exports = {
  timeZone: 'America/Phoenix',
  dependencies: {
    enabledAdvancedServices: [
      {
        userSymbol: 'AdminDirectory',
        version: 'directory_v1',
        serviceId: 'admin',
      },
      {
        userSymbol: 'Gmail',
        version: 'v1',
        serviceId: 'gmail',
      },
    ],
    libraries: [
      {
        userSymbol: 'RosterMechanicsSheetADMIN',
        version: '0',
        libraryId: process.env.GOOGLE_WORKBOOK_SCRIPT_ID_PROD,
        developmentMode: true,
      },
      {
        userSymbol: 'TESTRosterMechanicsADMIN',
        version: '0',
        libraryId: process.env.GOOGLE_WORKBOOK_SCRIPT_ID_DEV,
        developmentMode: true,
      },
    ],
  },
  exceptionLogging: 'STACKDRIVER',
  runtimeVersion: 'V8',
}
