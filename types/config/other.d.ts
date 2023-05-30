declare namespace RosterMechanics {
  namespace Config {
    namespace Other {
      type Email = Promise<{
        confidentiality: {
          text: string
        }
        filters: {
          justListed: {
            labelName: string
            query: string
          }
        }
      }>
    }
  }
}
