import isProd from '../../libs/utils/general/is-prod'

const GoogleFormsConfig: RosterMechanics.Config.Google.Forms = (async () => {
  const isProduction: boolean = await isProd()
  return await new Promise((resolve) => {
    resolve({
      forms: {
        hireUpdate: {
          formId: isProduction
            ? (process.env.GOOGLE_FORM_HIRE_UPDATE_ID_PROD as string)
            : (process.env.GOOGLE_FORM_HIRE_UPDATE_ID_DEV as string),
        },
        suspend: {
          formId: isProduction
            ? (process.env.GOOGLE_FORM_SUSPEND_ID_PROD as string)
            : (process.env.GOOGLE_FORM_SUSPEND_ID_DEV as string),
        },
        delete: {
          formId: isProduction
            ? (process.env.GOOGLE_FORM_DELETE_ID_PROD as string)
            : (process.env.GOOGLE_FORM_DELETE_ID_DEV as string),
        },
      },
    })
  })
})() as RosterMechanics.Config.Google.Forms

export default GoogleFormsConfig
