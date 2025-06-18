// Because of the usage of "lebab" in the build, we need to export the plugin by using a const first.
// Also, a ".js" extension is needed to make ESM import work.
const styleScopePlugin = require('./isolated-style-scope-plugin.js')
module.exports = styleScopePlugin
