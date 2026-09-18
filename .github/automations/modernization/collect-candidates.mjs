import browserslistConfig from '@dnb/browserslist-config'
import supportedBrowsers from '@dnb/browserslist-config/supportedBrowsers.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const compatData = require('@mdn/browser-compat-data')

const [registryPath, outputPath] = process.argv.slice(2)

if (!registryPath || !outputPath) {
  throw new Error('Pass the candidate registry and output paths')
}

const browserKeys = {
  Chrome: 'chrome',
  'Chrome Android': 'chrome_android',
  Edge: 'edge',
  Firefox: 'firefox',
  'Firefox Android': 'firefox_android',
  'iOS Safari': 'safari_ios',
  Safari: 'safari',
  'Samsung Browser': 'samsunginternet_android',
}

const compareVersions = (left, right) => {
  const leftParts = String(left).split('.').map(Number)
  const rightParts = String(right).split('.').map(Number)
  const length = Math.max(leftParts.length, rightParts.length)

  for (let index = 0; index < length; index += 1) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0)
    if (difference !== 0) {
      return difference
    }
  }

  return 0
}

const readCompatEntry = (path) => {
  let entry = compatData
  for (const segment of path.split('.')) {
    entry = entry?.[segment]
  }

  if (!entry?.__compat?.support) {
    throw new Error(`Unknown MDN compatibility key: ${path}`)
  }

  return entry.__compat
}

const getSupportStatement = (support) => {
  const statements = Array.isArray(support) ? support : [support]
  const unflagged = statements.filter(
    (statement) =>
      statement &&
      !statement.flags &&
      !statement.prefix &&
      !statement.alternative_name &&
      statement.version_added !== false
  )

  return (
    unflagged.find(
      (statement) =>
        !statement.partial_implementation && !statement.version_removed
    ) ??
    unflagged.find((statement) => !statement.version_removed) ??
    unflagged[0]
  )
}

const evaluateBrowser = (browser, support) => {
  const statement = getSupportStatement(support)
  const versionAdded = statement?.version_added
  let supported = false
  let reason = 'No unprefixed support is recorded'

  if (versionAdded === true) {
    reason = 'Support is recorded without a verifiable minimum version'
  } else if (
    typeof versionAdded === 'string' &&
    /^≤?\d/.test(versionAdded)
  ) {
    const requiredVersion = versionAdded.replace(/^≤/, '')
    supported =
      !statement.partial_implementation &&
      !statement.version_removed &&
      compareVersions(browser.minimumVersion, requiredVersion) >= 0
    reason = statement.partial_implementation
      ? `Only partial support is recorded from ${versionAdded}`
      : statement.version_removed
        ? `Support was removed in ${statement.version_removed}`
        : `Requires ${versionAdded}`
  } else if (versionAdded === 'preview') {
    reason = 'Only preview support is recorded'
  }

  return {
    browser: browser.name,
    configuredMinimum: browser.minimumVersion,
    versionAdded: versionAdded ?? null,
    partialImplementation: Boolean(statement?.partial_implementation),
    supported,
    reason,
  }
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8'))
if (registry.schemaVersion !== 1 || !Array.isArray(registry.candidates)) {
  throw new Error('Modernization candidate registry has an invalid shape')
}

const candidates = registry.candidates.map((candidate) => {
  const compatibility = readCompatEntry(candidate.compatKey)
  const files = candidate.files.map((file) => {
    let content = ''
    let exists = true

    try {
      content = readFileSync(file, 'utf8')
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
      exists = false
    }

    return {
      file,
      exists,
      matchedPatterns: exists
        ? candidate.evidencePatterns.filter((pattern) =>
            content.includes(pattern)
          )
        : [],
    }
  })
  const browsers = supportedBrowsers.map((browser) => {
    const browserKey = browserKeys[browser.name]
    if (!browserKey) {
      throw new Error(`Unsupported configured browser: ${browser.name}`)
    }

    return evaluateBrowser(browser, compatibility.support[browserKey])
  })
  const matchedPatterns = new Set(
    files.flatMap(({ matchedPatterns }) => matchedPatterns)
  )
  const evidencePresent =
    files.length > 0 &&
    files.every(({ exists }) => exists) &&
    candidate.evidencePatterns.every((pattern) =>
      matchedPatterns.has(pattern)
    )

  return {
    id: candidate.id,
    title: candidate.title,
    reason: candidate.reason,
    compatKey: candidate.compatKey,
    mdnUrl: compatibility.mdn_url ?? null,
    evidencePresent,
    eligible:
      evidencePresent && browsers.every(({ supported }) => supported),
    files,
    browsers,
  }
})

const result = {
  generatedAt: new Date().toISOString(),
  compatibilityData: compatData.__meta,
  browserslistConfig,
  supportedBrowsers,
  candidates,
  summary: {
    registered: candidates.length,
    present: candidates.filter(({ evidencePresent }) => evidencePresent)
      .length,
    eligible: candidates.filter(({ eligible }) => eligible).length,
    blocked: candidates.filter(
      ({ eligible, evidencePresent }) => evidencePresent && !eligible
    ).length,
  },
}

writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`)
