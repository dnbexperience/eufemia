import { getVersion, getSha } from '../../shared/build-info/BuildInfo.js'

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '_')

export const getStyleScopeHash = (opts) => {
  const version = opts?.version || getVersion()
  const isVersion = String(version).match(/^\d/)
  const isBranch = String(version).includes('/')

  if (isVersion) {
    return slugify(`eufemia-scope--${version}`)
  }

  if (isBranch) {
    const sha = opts?.sha || getSha()
    return slugify(`eufemia-scope--${sha}`)
  }

  return 'eufemia-scope--default'
}
