declare namespace RosterMechanics {
  namespace Test {
    namespace ItemResponse {
      interface IItemResponse {
        getItem: () => RosterMechanics.Test.Item.IItem
        getResponse: () => string[][] | string[] | string
      }
    }
  }
}
