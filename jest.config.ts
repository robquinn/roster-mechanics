import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  displayName: 'roster-mechanics',
  verbose: true,
  modulePaths: ['<rootDir>/src', '<rootDir>/types'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, '.ts', '.d.ts'],
  rootDir: '.',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/test/__tests__/**/**/*.ts'],
  testEnvironment: './test/setup-environment.ts',
  forceExit: true,
  openHandlesTimeout: 1000,
  setupFiles: ['<rootDir>/test/set-env-vars.ts'],
}

export default config
