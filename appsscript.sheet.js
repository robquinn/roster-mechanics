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
      {
        userSymbol: 'People',
        version: 'v1',
        serviceId: 'peopleapi',
      },
      {
        userSymbol: 'Drive',
        version: 'v2',
        serviceId: 'drive',
      },
      {
        userSymbol: 'Sheets',
        version: 'v4',
        serviceId: 'sheets',
      },
      {
        userSymbol: 'AdminGroupsMigration',
        version: 'v1',
        serviceId: 'groupsmigration',
      },
      {
        userSymbol: 'AdminGroupsSettings',
        version: 'v1',
        serviceId: 'groupssettings',
      },
    ],
  },
  exceptionLogging: 'STACKDRIVER',
  executionApi: {
    access: 'MYSELF',
  },
  runtimeVersion: 'V8',
  oauthScopes: [
    'https://www.googleapis.com/auth/admin.directory.group',
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/admin.directory.group',
    'https://www.googleapis.com/auth/admin.directory.group.member',
    'https://www.googleapis.com/auth/gmail.settings.basic',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
    'https://www.googleapis.com/auth/script.send_mail',
    'https://www.googleapis.com/auth/script.external_request',
    'https://www.googleapis.com/auth/cloud-platform',
  ],
  webapp: {
    executeAs: 'USER_DEPLOYING',
    access: 'MYSELF',
  },
}
