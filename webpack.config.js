/* eslint-disable */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const GasPlugin = require('gas-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const AppsScriptFormHireUpdateJson = require('./appsscript.form-hire-update.js')
const AppsScriptFormSuspendJson = require('./appsscript.form-suspend.js')
const AppsScriptFormDeleteJson = require('./appsscript.form-delete.js')
const AppsScriptSheetJson = require('./appsscript.sheet.js')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { fileURLToPath } = require('url')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const dotenv = require('dotenv').config()

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'

const commonConfig = {
  entry: {
    'form-hire-update': path.resolve(__dirname, 'src/form-hire-update.ts'),
    'form-suspend': path.resolve(__dirname, 'src/form-suspend.ts'),
    'form-delete': path.resolve(__dirname, 'src/form-delete.ts'),
    sheet: path.resolve(__dirname, 'src/sheet.ts'),
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (pathData) => {
      return `${pathData.chunk.name}/Code.js`
    },
    libraryTarget: 'this',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new GenerateJsonPlugin('form-hire-update/appsscript.json', AppsScriptFormHireUpdateJson),
    new GenerateJsonPlugin('form-suspend/appsscript.json', AppsScriptFormSuspendJson),
    new GenerateJsonPlugin('form-delete/appsscript.json', AppsScriptFormDeleteJson),
    new GenerateJsonPlugin('sheet/appsscript.json', AppsScriptSheetJson),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // include specific files based on a RegExp
      include: /src\/.*\.ts/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
    new GasPlugin({
      autoGlobalExportsFiles: ['src/form-hire-update.ts', 'src/form-suspend.ts', 'src/form-delete.ts', 'src/sheet.ts'],
    }),
  ],
}

const optimization = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // ecma 5 is needed to support Rhino "DEPRECATED_ES5" runtime
          // can use ecma 6 if V8 runtime is used
          ecma: 5,
          warnings: false,
          parse: {},
          compress: {
            properties: false,
          },
          mangle: false,
          module: false,
          output: {
            beautify: true,
            // support custom function autocompletion
            // https://developers.google.com/apps-script/guides/sheets/functions
            comments: /\@(customfunction|OnlyCurrentDoc)/,
          },
        },
        extractComments: false,
      }),
    ],
  },
}

const devConfig = (env, argv) => {
  return {
    mode: 'development',
    ...commonConfig,
    ...optimization,
  }
}

const prodConfig = (env, argv) => {
  return {
    mode: 'production',
    ...optimization,
    ...commonConfig,
  }
}

module.exports = isProd ? prodConfig : devConfig
