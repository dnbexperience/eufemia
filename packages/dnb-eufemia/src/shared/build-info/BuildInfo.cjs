/**
 * This file will be transformed by makeReleaseVersion.ts
 */

const getInfo = () => {
  try {
    delete require.cache[require.resolve('./BuildInfoData.cjs')]
  } catch (error) {
    //
  }
  return require('./BuildInfoData.cjs')
}

const getVersion = () => {
  return getInfo().version
}
const getSha = () => {
  return getInfo().sha
}

exports.getVersion = getVersion
exports.getSha = getSha
