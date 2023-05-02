const path = require('path')
const fs = require('fs-extra')

function shouldUsePrebuild() {
  const rootPath = path.dirname(require.resolve('@dnb/eufemia'))
  const buildPath = path.resolve(rootPath, 'build')

  global.PREBUILD_EXISTS = fs.existsSync(buildPath)

  return Boolean(
    global.PREBUILD_EXISTS && process.env.NODE_ENV === 'production'
  )
}
module.exports.shouldUsePrebuild = shouldUsePrebuild
