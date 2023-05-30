declare namespace RosterMechanics {
  namespace Test {
    namespace FormApp {
      interface IFormApp {
        openById: (id: string) => RosterMechanics.Test.Form.IForm
      }
    }
  }
}
