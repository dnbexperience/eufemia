/**
 * This file will be transformed by makeReleaseVersion.ts
 */

const getInfo = () => {
  try {
    delete require.cache[require.resolve('./BuildInfo.js')]
  } catch (error) {
    //
  }
  return require('./BuildInfo.js')
}

const getVersion = () => {
  return getInfo().version
}
const getSha = () => {
  return getInfo().sha
}

exports.getVersion = getVersion
exports.getSha = getSha
