/**
 * Verify that a release build carries a real version.
 *
 * `Eufemia.version`, the `--eufemia-version` custom property and the isolated
 * style scope class are all derived from the version the prebuild stamps, and a
 * build that carries no version ships that instead — which is how 11.12.0
 * published as "release". Run this on a release build so it fails here rather
 * than in the package.
 */

import { readFileSync, realpathSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const BUILD_INFO_FILE = 'shared/build-info/BuildInfoData.js'
export const STYLE_FILE = 'style/dnb-ui-core.min.css'

const RELEASE_VERSION = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/
const JS_VERSION = /export const version = '([^']*)'/
const CSS_VERSION = /--eufemia-version:\s*["']?([^"';]+)/

export function extractJsVersion(source) {
  return source.match(JS_VERSION)?.[1]
}

export function extractCssVersion(source) {
  return source.match(CSS_VERSION)?.[1]?.trim()
}

export function findVersionViolations({ jsVersion, cssVersion }) {
  const violations = []

  if (!jsVersion) {
    violations.push(`${BUILD_INFO_FILE} declares no version`)
  } else if (!RELEASE_VERSION.test(jsVersion)) {
    violations.push(
      `${BUILD_INFO_FILE} is stamped with "${jsVersion}" instead of a release version`
    )
  }

  if (!cssVersion) {
    violations.push(`${STYLE_FILE} declares no --eufemia-version`)
  } else if (jsVersion && cssVersion !== jsVersion) {
    violations.push(
      `${STYLE_FILE} is stamped with "${cssVersion}", but ${BUILD_INFO_FILE} is stamped with "${jsVersion}"`
    )
  }

  return violations
}

export function verifyReleaseVersion(buildDirectory) {
  const read = (file) =>
    readFileSync(path.join(buildDirectory, file), 'utf-8')

  const jsVersion = extractJsVersion(read(BUILD_INFO_FILE))
  const cssVersion = extractCssVersion(read(STYLE_FILE))
  const violations = findVersionViolations({ jsVersion, cssVersion })

  if (violations.length > 0) {
    throw new Error(
      [
        'This release build does not carry a release version:',
        ...violations.map((violation) => `- ${violation}`),
        '',
        'The prebuild stamps the version it resolves for the current branch, so',
        'check the "Prebuild Library" step for why it could not resolve one.',
      ].join('\n')
    )
  }

  return jsVersion
}

function main() {
  const buildDirectory = process.argv[2]

  if (!buildDirectory) {
    console.error(
      'Usage: node ./scripts/postbuild/verifyReleaseVersion.mjs <buildDir>'
    )
    process.exit(1)
  }

  let version
  try {
    version = verifyReleaseVersion(buildDirectory)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }

  console.log(`The release build is stamped with ${version}`)
}

const invokedPath = process.argv[1]
// Resolve the invoked path before comparing, the same way writeReleaseConfig
// does: an invocation through a symlinked path would otherwise leave a guard
// that exits 0 without checking anything.
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
