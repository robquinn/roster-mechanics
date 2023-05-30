declare namespace RosterMechanics {
  namespace Test {
    namespace FormResponse {
      interface IFormResponse {
        getId: () => string
        getEditResponseUrl: () => string
        getItemResponses: () => RosterMechanics.Test.ItemResponse.IItemResponse[]
        getTimestamp: () => RosterMechanics.Test.GasDate.IGasDate
      }
    }
  }
}
