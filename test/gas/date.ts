/* eslint-disable class-methods-use-this */

type IGasDate = RosterMechanics.Test.GasDate.IGasDate

export default class GasDate implements IGasDate {
  private readonly date: Date
  constructor(date: Date) {
    this.date = date
  }

  toString(): string {
    return new Date(this.date).toString()
  }
}
