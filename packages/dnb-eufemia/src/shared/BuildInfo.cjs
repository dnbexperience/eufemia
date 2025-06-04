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

const getStyleScopeHash = () => {
  const version = getVersion()

  // Check for version or branch name with slash
  if (/\d|\//.test(String(version))) {
    const slugify = (s) =>
      String(s)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return slugify(`v-${version}-${getSha()}`)
  }
  return 'eufemia-default-scope'
}

exports.getStyleScopeHash = getStyleScopeHash
