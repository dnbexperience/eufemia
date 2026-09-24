const stableFontBasePath = 'https://assets.eufemia.dnb.no/fonts/'
const { getVersion } = require('../../../shared/build-info/BuildInfo.cjs')

exports.getFontBasePath = (version) => {
  const releaseVersion = version || getVersion()

  if (/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(releaseVersion)) {
    return `https://assets.eufemia.dnb.no/v${releaseVersion}/fonts/`
  }

  return stableFontBasePath
}
