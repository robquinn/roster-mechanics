type ISession = RosterMechanics.Test.Session.ISession

export default class Session implements ISession {
  // eslint-disable-next-line class-methods-use-this
  getScriptTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}
