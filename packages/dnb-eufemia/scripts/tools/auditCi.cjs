/**
 * Dependency vulnerability gate.
 *
 * Replaces the `audit-ci` binary, which cannot parse the audit JSON emitted by
 * Yarn 4 (the new `{ "value", "children" }` per-line format), and therefore
 * silently reports zero vulnerabilities regardless of the real state.
 *
 * This gate reads the same `audit-ci.json` config and:
 * - audits production dependencies only when `skip-dev` is true, so dev/build
 *   tooling advisories do not block the library release,
 * - fails on advisories at or above the configured severity threshold
 *   (`critical` | `high` | `moderate` | `low`),
 * - ignores advisories listed in `allowlist` (by numeric advisory id, GHSA id,
 *   or module name).
 *
 * Run directly: `node ./scripts/tools/auditCi.cjs --config ./audit-ci.json`
 */

const { spawnSync } = require('child_process')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const SEVERITY_RANK = {
  info: 0,
  low: 1,
  moderate: 2,
  high: 3,
  critical: 4,
}

const SEVERITY_ORDER = ['low', 'moderate', 'high', 'critical']

/**
 * Resolves the lowest enabled severity in the config to a threshold.
 * Mirrors `audit-ci` semantics where `"high": true` means "fail on high and
 * above". Defaults to `high` when nothing is set.
 */
function resolveThreshold(config) {
  for (const severity of SEVERITY_ORDER) {
    if (config[severity] === true) {
      return severity
    }
  }
  return 'high'
}

function extractGhsa(url) {
  const match =
    /GHSA-[23456789cfghjmpqrvwx]{4}-[23456789cfghjmpqrvwx]{4}-[23456789cfghjmpqrvwx]{4}/i.exec(
      String(url ?? '')
    )
  return match ? match[0].toUpperCase() : null
}

/**
 * Parses the NDJSON-style output of `yarn npm audit --json` into a flat list of
 * advisories. Tolerates blank lines and non-advisory lines.
 */
function parseAuditOutput(stdout) {
  const advisories = []

  for (const line of String(stdout ?? '').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }

    let entry
    try {
      entry = JSON.parse(trimmed)
    } catch {
      continue
    }

    const children = entry?.children
    if (!children || !children.Severity) {
      continue
    }

    advisories.push({
      id: children.ID ?? null,
      module: entry.value ?? null,
      severity: String(children.Severity).toLowerCase(),
      ghsa: extractGhsa(children.URL),
      url: children.URL ?? null,
      title: children.Issue ?? null,
      dependents: children.Dependents ?? [],
    })
  }

  return advisories
}

function isAllowlisted(advisory, allowlist) {
  if (!allowlist || allowlist.length === 0) {
    return false
  }

  return allowlist.some((entry) => {
    if (typeof entry === 'number') {
      return advisory.id === entry
    }

    const value = String(entry)
    return (
      String(advisory.id) === value ||
      advisory.ghsa === value.toUpperCase() ||
      advisory.module === value
    )
  })
}

/**
 * Returns advisories at or above the threshold that are not allowlisted.
 */
function filterViolations(advisories, threshold, allowlist) {
  const minRank = SEVERITY_RANK[threshold] ?? SEVERITY_RANK.high

  return advisories.filter((advisory) => {
    const rank = SEVERITY_RANK[advisory.severity] ?? 0
    if (rank < minRank) {
      return false
    }
    return !isAllowlisted(advisory, allowlist)
  })
}

function loadConfig(configPath) {
  const raw = JSON.parse(readFileSync(configPath, 'utf8'))
  return {
    threshold: resolveThreshold(raw),
    productionOnly: raw['skip-dev'] === true,
    allowlist: Array.isArray(raw.allowlist) ? raw.allowlist : [],
  }
}

function runYarnAudit({ productionOnly, threshold }) {
  const args = [
    'npm',
    'audit',
    '--recursive',
    '--json',
    '--severity',
    threshold,
  ]
  if (productionOnly) {
    args.push('--environment', 'production')
  }

  const result = spawnSync('yarn', args, {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })

  if (result.error) {
    throw result.error
  }

  return result.stdout ?? ''
}

function formatReport(violations) {
  const lines = violations.map((advisory) => {
    const dependents = Array.isArray(advisory.dependents)
      ? advisory.dependents.join(', ')
      : ''
    return [
      `  - [${advisory.severity}] ${advisory.module} (${advisory.ghsa ?? advisory.id})`,
      advisory.title ? `      ${advisory.title}` : null,
      dependents ? `      via: ${dependents}` : null,
      advisory.url ? `      ${advisory.url}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  })

  return lines.join('\n')
}

function main(argv = process.argv.slice(2)) {
  const configFlagIndex = argv.indexOf('--config')
  const configPath = resolve(
    process.cwd(),
    configFlagIndex !== -1 ? argv[configFlagIndex + 1] : 'audit-ci.json'
  )

  const { threshold, productionOnly, allowlist } = loadConfig(configPath)

  const scope = productionOnly ? 'production' : 'all'
  console.log(
    `Auditing ${scope} dependencies for advisories at or above "${threshold}" severity.`
  )

  const stdout = runYarnAudit({ productionOnly, threshold })
  const advisories = parseAuditOutput(stdout)
  const violations = filterViolations(advisories, threshold, allowlist)

  if (violations.length > 0) {
    console.error(
      `\nFound ${violations.length} disallowed advisory(ies) at or above "${threshold}" severity:\n`
    )
    console.error(formatReport(violations))
    console.error(
      '\nFix the dependency, add a resolution, or add the advisory id to the' +
        ' "allowlist" in audit-ci.json if it is accepted.'
    )
    process.exit(1)
  }

  console.log('Passed dependency security audit.')
}

module.exports = {
  SEVERITY_RANK,
  resolveThreshold,
  extractGhsa,
  parseAuditOutput,
  isAllowlisted,
  filterViolations,
  loadConfig,
  formatReport,
  main,
}

if (require.main === module) {
  try {
    main()
  } catch (error) {
    console.error(`Audit gate failed to run: ${error.message}`)
    process.exit(1)
  }
}
