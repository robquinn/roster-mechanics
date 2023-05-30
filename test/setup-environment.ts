import { type JestEnvironmentConfig, type EnvironmentContext } from '@jest/environment'
import { TestEnvironment } from 'jest-environment-node'
import { type Context } from 'vm'
import Session from './gas/session'
import Utilities from './gas/utilities'
import CacheService from './gas/cache-service'
import PropertiesService from './gas/properties-service'
import AdminDirectory from './gas/admin-directory'
import Calendar from './gas/calendar'
import DriveApp from './gas/drive-app'
import UrlFetchApp from './gas/url-fetch-app'
import ScriptApp from './gas/script-app'
import FormApp from './gas/form-app'
import SpreadsheetApp from './gas/spreadsheet-app'
import OAuth2 from './gas/oauth2'
import Gmail from './gas/gmail'
import MailApp from './gas/mail-app'
import GmailApp from './gas/gmail-app'
import RosterMechanicsSheetADMIN from './gas-libs/roster-mechanics-sheet-admin'

export default class CustomEnvironment extends TestEnvironment {
  private readonly testPath
  private readonly docblockPragmas

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    // console.log(config.globalConfig)
    // console.log(config.projectConfig)
    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
  }

  async setup(): Promise<void> {
    await super.setup()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.Utilties
    this.global.Utilities = new Utilities()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.Session
    this.global.Session = new Session()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.CacheService
    this.global.CacheService = new CacheService()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.PropertiesService
    this.global.PropertiesService = new PropertiesService()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.AdminDirectory
    this.global.AdminDirectory = new AdminDirectory()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.Calendar
    this.global.Calendar = new Calendar()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.DriveApp
    this.global.DriveApp = new DriveApp()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.UrlFetchApp
    this.global.UrlFetchApp = new UrlFetchApp()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.ScriptApp
    this.global.ScriptApp = new ScriptApp()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.FormApp
    this.global.FormApp = new FormApp()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.SpreadsheetApp
    this.global.SpreadsheetApp = new SpreadsheetApp()
    // @ts-expect-error Mocking the functionality of GoogleAppsScriptOAuth2.OAuth2
    this.global.OAuth2 = new OAuth2()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.Gmail
    this.global.Gmail = new Gmail()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.MailApp
    this.global.MailApp = new MailApp()
    // @ts-expect-error Mocking the functionality of GoogleAppsScript.GmailApp
    this.global.GmailApp = new GmailApp()

    this.global.TESTRosterMechanicsADMIN = new RosterMechanicsSheetADMIN()
    this.global.RosterMechanicsSheetADMIN = new RosterMechanicsSheetADMIN()

    // // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (this.docblockPragmas['my-custom-pragma'] === 'my-pragma-value') {
    //   // ...
    // }
  }

  async teardown(): Promise<void> {
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.Utilties
    delete this.global.Utilities
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.Session
    delete this.global.Session
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.CacheService
    delete this.global.CacheService
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.PropertiesService
    delete this.global.PropertiesService
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.AdminDirectory
    delete this.global.AdminDirectory
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.Calendar
    delete this.global.Calendar
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.DriveApp
    delete this.global.DriveApp
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.ScriptApp
    delete this.global.ScriptApp
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.FormApp
    delete this.global.FormApp
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.SpreadsheetApp
    delete this.global.SpreadsheetApp
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScriptOAuth2.OAuth2
    delete this.global.OAuth2
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.Gmail
    delete this.global.Gmail
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.MailApp
    delete this.global.MailApp
    // @ts-expect-error Tearing down the mock functionlity of GoogleAppsScript.GmailApp
    delete this.global.GmailApp

    delete this.global.TESTRosterMechanicsADMIN
    delete this.global.RosterMechanicsSheetADMIN

    await super.teardown()
  }

  getVmContext(): Context | null {
    return super.getVmContext()
  }

  // async handleTestEvent(event, state) {
  //   if (event.name === 'test_start') {
  //     // ...
  //   }
  // }
}
