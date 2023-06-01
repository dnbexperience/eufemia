const path = require('path')
const fs = require('fs-extra')

function shouldUsePrebuild() {
  const rootPath = path.dirname(require.resolve('@dnb/eufemia'))
  const buildPath = path.resolve(rootPath, 'build')
  const packageJsonPath = path.resolve(buildPath, 'package.json')
  const prebuildExists = fs.existsSync(packageJsonPath)

  return Boolean(prebuildExists && process.env.NODE_ENV === 'production')
}
module.exports.shouldUsePrebuild = shouldUsePrebuild
