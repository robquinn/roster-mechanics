declare namespace RosterMechanics {
  namespace Test {
    namespace Form {
      interface IForm {
        getResponses: () => RosterMechanics.Test.FormResponse.IFormResponse[]
        deleteResponse: (responseId: string) => RosterMechanics.Test.Form.IForm
      }
    }
  }
}
