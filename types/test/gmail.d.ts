declare namespace RosterMechanics {
  namespace Test {
    namespace Gmail {
      interface IGmail {
        newFilter: () => GoogleAppsScript.Gmail.Schema.Filter
        newFilterAction: () => GoogleAppsScript.Gmail.Schema.FilterAction
        newFilterCriteria: () => GoogleAppsScript.Gmail.Schema.FilterCriteria
        newLabel: () => GoogleAppsScript.Gmail.Schema.Label
        newLabelColor: () => GoogleAppsScript.Gmail.Schema.LabelColor
      }
    }
  }
}
