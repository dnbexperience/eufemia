const fs = require('node:fs')
const path = require('node:path')

const EUFEMIA_PACKAGE_NAME = '@dnb/eufemia'
const EXPLICIT_PREBUILD_TARGETS = new Set([
  'build',
  'cjs',
  'es',
  'esm',
  'src',
  'umd',
])

function getEufemiaRoot() {
  return path.dirname(require.resolve(EUFEMIA_PACKAGE_NAME))
}

function hasPrebuild(eufemiaRoot = getEufemiaRoot()) {
  const buildIndex = path.resolve(eufemiaRoot, 'build', 'index.js')
  return fs.existsSync(buildIndex)
}

function rewriteToPrebuild(source) {
  if (source === EUFEMIA_PACKAGE_NAME) {
    return `${EUFEMIA_PACKAGE_NAME}/build`
  }

  if (!source.startsWith(`${EUFEMIA_PACKAGE_NAME}/`)) {
    return null
  }

  const subpath = source.slice(EUFEMIA_PACKAGE_NAME.length + 1)
  const [topLevelSegment] = subpath.split('/')

  if (EXPLICIT_PREBUILD_TARGETS.has(topLevelSegment)) {
    if (topLevelSegment === 'src') {
      return `${EUFEMIA_PACKAGE_NAME}/build/${subpath.slice('src/'.length)}`
    }

    return null
  }

  return `${EUFEMIA_PACKAGE_NAME}/build/${subpath}`
}

function getAbsolutePackagePath(source, eufemiaRoot = getEufemiaRoot()) {
  if (source === EUFEMIA_PACKAGE_NAME) {
    return eufemiaRoot
  }

  if (!source.startsWith(`${EUFEMIA_PACKAGE_NAME}/`)) {
    return null
  }

  return path.resolve(
    eufemiaRoot,
    source.slice(EUFEMIA_PACKAGE_NAME.length + 1)
  )
}

function hasResolvablePrebuildTarget(
  source,
  eufemiaRoot = getEufemiaRoot()
) {
  const rewritten = rewriteToPrebuild(source)
  if (!rewritten) {
    return false
  }

  const absoluteTarget = getAbsolutePackagePath(rewritten, eufemiaRoot)
  if (!absoluteTarget) {
    return false
  }

  const candidates = [
    absoluteTarget,
    `${absoluteTarget}.js`,
    `${absoluteTarget}.cjs`,
    path.resolve(absoluteTarget, 'index.js'),
    path.resolve(absoluteTarget, 'index.cjs'),
  ]

  return candidates.some((candidate) => fs.existsSync(candidate))
}

function resolveConfigTimeEufemiaPath(
  source,
  eufemiaRoot = getEufemiaRoot()
) {
  if (!hasPrebuild(eufemiaRoot)) {
    return source
  }

  if (!hasResolvablePrebuildTarget(source, eufemiaRoot)) {
    return source
  }

  return rewriteToPrebuild(source) ?? source
}

function unwrapConfigTimeModule(moduleExports) {
  if (!moduleExports || typeof moduleExports !== 'object') {
    return moduleExports
  }

  if (!('default' in moduleExports)) {
    return moduleExports
  }

  const exportKeys = Object.keys(moduleExports).filter(
    (key) => key !== '__esModule'
  )

  if (exportKeys.length === 1 && exportKeys[0] === 'default') {
    return moduleExports.default
  }

  return moduleExports
}

function requireConfigTimeEufemiaModule(
  source,
  moduleLoader = require,
  eufemiaRoot = getEufemiaRoot()
) {
  const resolvedPath = resolveConfigTimeEufemiaPath(source, eufemiaRoot)
  return unwrapConfigTimeModule(moduleLoader(resolvedPath))
}

module.exports = {
  getAbsolutePackagePath,
  hasPrebuild,
  hasResolvablePrebuildTarget,
  requireConfigTimeEufemiaModule,
  resolveConfigTimeEufemiaPath,
  rewriteToPrebuild,
  unwrapConfigTimeModule,
}
