declare namespace RosterMechanics {
  namespace Config {
    namespace Google {
      interface Worksheet {
        sheetId: string
        sheetName: string
      }

      // Google Forms Config
      type Forms = Promise<{
        forms: Record<
          'hireUpdate' | 'suspend' | 'delete' | string,
          {
            formId: string
          }
        >
      }>

      // Google Sheets Config
      type Sheets = Promise<{
        workbooks: Record<
          'rosterMechanics' | string,
          {
            worksheets: Record<'adminRoster' | 'generalRoster' | 'suspensionLog' | 'pseudoRoster' | string, Worksheet>
          }
        >
      }>

      // Google Cloud Config
      type Cloud = Promise<{
        serviceAccount: {
          private_key: string
          client_email: string
          client_id: string
        }
      }>

      // Google People Config
      type People = Promise<{
        contacts: {
          directory: {
            userEmailForDomainDirectory: string
          }
        }
      }>

      type AppsScript = Promise<{
        cache: Record<
          'users' | 'deleteUsers' | string,
          {
            id: string
            type: RosterMechanics.Utils.Cache.Storage.Type
            scope: RosterMechanics.Utils.Cache.Storage.Scope
          }
        >
      }>
    }
  }
}
