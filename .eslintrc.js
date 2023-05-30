module.exports = {
  root: true,
  env: {
    'jest/globals': true,
    jest: true,
    node: true,
  },
  extends: [
    /* airbnb */
    'airbnb-base',
    'airbnb-typescript/base',
    /* eslint */
    'eslint:recommended',
    /* "plugin:@typescript-eslint */
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    /* eslint-plugin-promise */
    'plugin:promise/recommended',
    /* eslint-config-n (node) */
    'plugin:n/recommended',
    /* eslint-config-standard-with-typescript */
    'standard-with-typescript',
    /* prettier */
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'promise', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    node: {
      version: '>=v18.16.0',
      extensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn"t contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default
        // use <root>/path/to/folder/tsconfig.json
        project: '<root>/tsconfig.json',
      },
    },
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'n/no-unpublished-import': [
      'error',
      {
        allowModules: [
          '@jest/globals',
          'jest',
          'jest-config',
          'moment',
          'moment-timezone',
          'jest-environment-node',
          '@jest/environment',
          'gas-webpack-plugin',
          'webpack',
          'generate-json-webpack-plugin',
          'terser-webpack-plugin',
          'dotenv',
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: true, peerDependencies: true },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-field',
          'protected-field',
          'private-field',
          'constructor',
          'public-method',
          'protected-method',
          'private-method',
        ],
      },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',
    'n/no-missing-import': [
      'off',
      {
        allowModules: [],
        resolvePaths: [__dirname],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}
