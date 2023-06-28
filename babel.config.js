module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [['dynamic-import-node', { noInterop: true }], '@babel/plugin-transform-class-properties'],
}
