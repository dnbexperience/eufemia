const stableFontBasePath = 'https://assets.eufemia.dnb.no/fonts/'
const { getVersion } = require('../../../shared/build-info/BuildInfo.cjs')

exports.getFontBasePath = (version) => {
  const releaseVersion = version || getVersion()

  if (/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(releaseVersion)) {
    return `https://assets.eufemia.dnb.no/v${releaseVersion}/fonts/`
  }

  return stableFontBasePath
}

/**
 * The immutable version path is published after the package, so a release
 * build emits the stable alias as a `src` fallback next to it.
 */
exports.getFontBasePaths = (version) => {
  const basePath = exports.getFontBasePath(version)

  return {
    basePath,
    fallbackBasePath:
      basePath === stableFontBasePath ? undefined : stableFontBasePath,
  }
}
