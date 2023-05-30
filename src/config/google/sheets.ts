import isProd from '../../libs/utils/general/is-prod'

const GoogleSheetsConfig: RosterMechanics.Config.Google.Sheets = (async () => {
  const isProduction = await isProd()
  return await new Promise((resolve) => {
    resolve({
      workbooks: {
        rosterMechanics: {
          worksheets: {
            adminRoster: {
              sheetId: isProduction
                ? (process.env.GOOGLE_WORKBOOK_ID_PROD as string)
                : (process.env.GOOGLE_WORKBOOK_ID_DEV as string),
              sheetName: process.env.GOOGLE_SHEET_ADMIN_NAME as string,
            },
            generalRoster: {
              sheetId: isProduction
                ? (process.env.GOOGLE_WORKBOOK_ID_PROD as string)
                : (process.env.GOOGLE_WORKBOOK_ID_DEV as string),
              sheetName: process.env.GOOGLE_SHEET_GENERAL_NAME as string,
            },
            suspensionLog: {
              sheetId: isProduction
                ? (process.env.GOOGLE_WORKBOOK_ID_PROD as string)
                : (process.env.GOOGLE_WORKBOOK_ID_DEV as string),
              sheetName: process.env.GOOGLE_SHEET_SUSPENSION_NAME as string,
            },
            pseudoRoster: {
              sheetId: isProduction
                ? (process.env.GOOGLE_WORKBOOK_ID_PROD as string)
                : (process.env.GOOGLE_WORKBOOK_ID_DEV as string),
              sheetName: process.env.GOOGLE_SHEET_PSEUDO_NAME as string,
            },
          },
        },
      },
    })
  })
})() as RosterMechanics.Config.Google.Sheets

export default GoogleSheetsConfig
