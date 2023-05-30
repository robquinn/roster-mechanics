module.exports = {
  '*.{js,ts,jsx,tsx,json}': ['npm run prettier:write', 'npm run eslint:fix'],
  './package.json': ['npm run sort'],
}
