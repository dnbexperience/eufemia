/**
 * Checks the production dependencies of @dnb/eufemia against the security
 * advisories that packages publish in their own GitHub repository.
 * These are not always in the advisory database that `yarn npm audit` uses.
 */

import fs from 'fs'
import path from 'path'

type LockfileEntry = {
  name: string
  version: string
  dependencies: Record<string, string>
}

type RepositoryAdvisory = {
  ghsa_id: string
  summary: string
  severity: string
  html_url: string
  vulnerabilities?: Array<{
    package?: { ecosystem?: string; name?: string }
    vulnerable_version_range?: string | null
    patched_versions?: string | null
  }>
}

export type AdvisoryMatch = {
  name: string
  version: string
  ghsaId: string
  severity: string
  summary: string
  url: string
  /** Set when the affected versions are missing or cannot be read, so a person has to check them */
  unreadableRange?: string
}

type Version = {
  numbers: number[]
  prerelease: string[]
  partial: boolean
}

type Comparator = { operator: string; version: Version }

const repoRoot = path.resolve(__dirname, '../../../..')

export function parseLockfile(lockfile: string) {
  const entries = new Map<string, LockfileEntry>()
  let current: LockfileEntry | null = null
  let inDependencies = false

  for (const line of lockfile.split('\n')) {
    if (/^\S.*:$/.test(line) && !line.startsWith('__metadata')) {
      const descriptors = line.slice(0, -1).replace(/"/g, '').split(', ')
      const name = descriptors[0].slice(0, descriptors[0].lastIndexOf('@'))
      current = { name, version: '', dependencies: {} }
      descriptors.forEach((descriptor) => entries.set(descriptor, current))
      inDependencies = false
    } else if (!current || line.trim() === '') {
      continue
    } else if (line.startsWith('  version: ')) {
      current.version = line.slice('  version: '.length).trim()
    } else if (line === '  dependencies:') {
      inDependencies = true
    } else if (inDependencies && line.startsWith('    ')) {
      const match = /^\s+"?([^"]+?)"?: "?([^"]+?)"?$/.exec(line)
      if (match) {
        current.dependencies[match[1]] = match[2]
      }
    } else if (!line.startsWith('    ')) {
      inDependencies = false
    }
  }

  return entries
}

export function getProductionPackages(
  entries: Map<string, LockfileEntry>,
  dependencies: Record<string, string>
) {
  const packages = new Map<string, LockfileEntry>()
  const queue = Object.entries(dependencies)

  while (queue.length > 0) {
    const [name, range] = queue.shift()
    if (range.startsWith('workspace:')) {
      continue
    }

    const descriptor = `${name}@${range.includes(':') ? range : `npm:${range}`}`
    // Root resolutions rewrite descriptors, so fall back to every locked version
    const found = entries.get(descriptor)
      ? [entries.get(descriptor)]
      : Array.from(new Set(entries.values())).filter(
          (entry) => entry.name === name
        )

    for (const entry of found) {
      const key = `${entry.name}@${entry.version}`
      if (!packages.has(key)) {
        packages.set(key, entry)
        queue.push(...Object.entries(entry.dependencies))
      }
    }
  }

  return Array.from(packages.values())
}

export function toGitHubRepository(url: unknown) {
  const match = /github\.com[/:]([^/]+)\/([^/#?]+)/.exec(String(url ?? ''))
  return match ? `${match[1]}/${match[2].replace(/\.git$/, '')}` : null
}

function parseVersion(version: string): Version | null {
  const text = version.trim().replace(/^v/, '').split('+')[0]
  const dash = text.indexOf('-')
  const numbers = (dash === -1 ? text : text.slice(0, dash)).split('.')
  const prerelease = dash === -1 ? [] : text.slice(dash + 1).split('.')
  if (
    numbers.length > 3 ||
    !numbers.every((part) => /^\d+$/.test(part)) ||
    !prerelease.every((identifier) => /^[0-9A-Za-z-]+$/.test(identifier))
  ) {
    return null
  }
  return {
    numbers: [0, 1, 2].map((index) => parseInt(numbers[index] ?? '0', 10)),
    prerelease,
    partial: numbers.length < 3,
  }
}

function compareVersions(a: Version, b: Version) {
  for (let index = 0; index < 3; index += 1) {
    if (a.numbers[index] !== b.numbers[index]) {
      return a.numbers[index] < b.numbers[index] ? -1 : 1
    }
  }

  // A prerelease comes before its release
  if (a.prerelease.length === 0 || b.prerelease.length === 0) {
    return Math.sign(b.prerelease.length - a.prerelease.length)
  }

  const isNumber = (identifier: string) => /^\d+$/.test(identifier)
  const length = Math.max(a.prerelease.length, b.prerelease.length)
  for (let index = 0; index < length; index += 1) {
    const left = a.prerelease[index]
    const right = b.prerelease[index]
    if (left === right) {
      continue
    }
    if (left === undefined || right === undefined) {
      return left === undefined ? -1 : 1
    }
    if (isNumber(left) !== isNumber(right)) {
      return isNumber(left) ? -1 : 1
    }
    if (isNumber(left)) {
      return Number(left) < Number(right) ? -1 : 1
    }
    return left < right ? -1 : 1
  }
  return 0
}

/**
 * Reads a version in a range. "4.7.1+" and "7.0.0-7.4.0" are valid versions,
 * but likely mean a range, so they cannot be read.
 */
function parseBound(text: string) {
  const version = text.includes('+') ? null : parseVersion(text)
  const [first, second] = version?.prerelease ?? []
  return /^\d+$/.test(first) && /^\d+$/.test(second) ? null : version
}

function parseComparator(text: string): Comparator | null {
  const match = /^(>=|<=|>|<|=)?(\S+)$/.exec(text)
  const version = match && parseBound(match[2])
  if (!version) {
    return null
  }

  const operator = match[1] ?? '='

  // Only after >= and < does a partial version like "1.2" mean the same as "1.2.0"
  if (version.partial && operator !== '>=' && operator !== '<') {
    return null
  }
  return { operator, version }
}

/**
 * A set like ">=3.0.0 <2.0.0" matches no version, so it was likely meant as "or".
 */
function isSatisfiable(comparators: Comparator[]) {
  return comparators.every((lower) =>
    comparators.every((upper) => {
      if (!/^[>=]/.test(lower.operator) || !/^[<=]/.test(upper.operator)) {
        return true
      }
      const result = compareVersions(lower.version, upper.version)
      return (
        result < 0 ||
        (result === 0 && lower.operator !== '>' && upper.operator !== '<')
      )
    })
  )
}

function parseComparatorSet(text: string): Comparator[] | null {
  const trimmed = text.trim()
  if (trimmed === '*') {
    return []
  }

  const hyphen = /^(\S+)\s+-\s+(\S+)$/.exec(trimmed)
  if (hyphen) {
    const from = parseBound(hyphen[1])
    const to = parseBound(hyphen[2])
    if (!from || !to || from.partial || to.partial) {
      return null
    }

    const comparators = [
      { operator: '>=', version: from },
      { operator: '<=', version: to },
    ]
    return isSatisfiable(comparators) ? comparators : null
  }

  const tokens = trimmed.replace(/(>=|<=|>|<|=)\s+/g, '$1').split(/\s+/)

  // "4.0.0 < 4.1.2" would mean exactly 4.0.0 in npm syntax, which is rarely what was meant
  if (tokens.length > 1 && tokens.some((token) => !/^[<>=]/.test(token))) {
    return null
  }

  const comparators = tokens.map(parseComparator)
  return comparators.every(Boolean) && isSatisfiable(comparators)
    ? comparators
    : null
}

/**
 * Reads GitHub's range syntax, such as ">= 7.0.0, < 7.1.6", where commas mean "and".
 * Also reads npm syntax, such as "<7.26.10, 8.0.0-alpha.0 - 8.0.0-alpha.16", where commas, "||" and ";" mean "or".
 * Returns null when the range is missing or cannot be read.
 */
export function isVersionInRange(
  version: string,
  range: string | null | undefined
) {
  const current = parseVersion(version)
  const text = String(range ?? '')

  // A list of versions means any of them. A version alone may also mean "since", so a version above it cannot be read
  const exactVersions = text
    .split(/,|;|\|\|/)
    .map((part) =>
      /^[^\s<>=*]+$/.test(part.trim()) ? parseBound(part) : null
    )
  if (
    current &&
    !current.partial &&
    exactVersions.every((exact) => exact && !exact.partial)
  ) {
    if (
      exactVersions.some((exact) => compareVersions(current, exact) === 0)
    ) {
      return true
    }
    return exactVersions.length === 1 &&
      compareVersions(current, exactVersions[0]) > 0
      ? null
      : false
  }

  const sets = text
    .split(/\|\||;/)
    .flatMap((alternative) => {
      const parts = alternative.split(',')
      const isGitHubSyntax = parts.every((part) =>
        /^\s*(>=|<=|>|<|=)?\s*[^\s<>=]+\s*$/.test(part)
      )
      return isGitHubSyntax ? [parts.join(' ')] : parts
    })
    .map(parseComparatorSet)

  if (!current || current.partial || !sets.every(Boolean)) {
    return null
  }

  return sets.some((set) =>
    set.every(({ operator, version: bound }) => {
      const result = compareVersions(current, bound)
      switch (operator) {
        case '>=':
          return result >= 0
        case '<=':
          return result <= 0
        case '>':
          return result > 0
        case '<':
          return result < 0
        default:
          return result === 0
      }
    })
  )
}

/**
 * A version is fixed when it reaches the highest patched version of its own major
 * (not just any of them, as fixes are often listed per minor), or the newest patched version.
 */
export function isPatched(
  version: string,
  patchedVersions?: string | null
) {
  const current = parseVersion(version)
  const patched = String(patchedVersions ?? '')
    .split(/,|;|\|\|/)
    .map(parseVersion)
    .filter((patchedVersion) => patchedVersion && !patchedVersion.partial)
  if (!current || patched.length === 0) {
    return false
  }

  const sameMajor = patched.filter(
    (patchedVersion) => patchedVersion.numbers[0] === current.numbers[0]
  )
  return [patched, sameMajor].some(
    (versions) =>
      versions.length > 0 &&
      versions.every(
        (patchedVersion) => compareVersions(current, patchedVersion) >= 0
      )
  )
}

export function findAdvisoryMatches(
  entry: Pick<LockfileEntry, 'name' | 'version'>,
  advisories: RepositoryAdvisory[]
): AdvisoryMatch[] {
  return advisories.flatMap((advisory) =>
    (advisory.vulnerabilities ?? []).flatMap(
      ({ package: pkg, vulnerable_version_range, patched_versions }) => {
        if (
          pkg?.ecosystem !== 'npm' ||
          pkg?.name !== entry.name ||
          isPatched(entry.version, patched_versions)
        ) {
          return []
        }

        const affected = isVersionInRange(
          entry.version,
          vulnerable_version_range
        )
        if (affected === false) {
          return []
        }

        return [
          {
            name: entry.name,
            version: entry.version,
            ghsaId: advisory.ghsa_id,
            severity: advisory.severity,
            summary: advisory.summary,
            url: advisory.html_url,
            ...(affected === null && {
              unreadableRange: vulnerable_version_range ?? '',
            }),
          },
        ]
      }
    )
  )
}

async function fetchJson(
  url: string,
  headers: Record<string, string> = {},
  { allowNotFound = false } = {}
) {
  const response = await fetch(url, { headers })
  if (allowNotFound && response.status === 404) {
    console.log(`Skipped ${url}: not found`)
    return null
  }
  if (!response.ok) {
    throw new Error(`${url} responded with ${response.status}`)
  }
  return response.json()
}

export async function checkRepositoryAdvisories() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
  const githubHeaders: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const entries = parseLockfile(
    fs.readFileSync(path.join(repoRoot, 'yarn.lock'), 'utf-8')
  )
  const { dependencies } = JSON.parse(
    fs.readFileSync(
      path.join(repoRoot, 'packages/dnb-eufemia/package.json'),
      'utf-8'
    )
  )
  const packages = getProductionPackages(entries, dependencies)
  const advisoriesByRepository = new Map<string, RepositoryAdvisory[]>()
  const matches: AdvisoryMatch[] = []

  for (const entry of packages) {
    const metadata = await fetchJson(
      `https://registry.npmjs.org/${entry.name.replace(/\//g, '%2F')}/${entry.version}`
    )
    const repository = toGitHubRepository(
      metadata.repository?.url ?? metadata.repository
    )
    if (!repository) {
      continue
    }

    if (!advisoriesByRepository.has(repository)) {
      advisoriesByRepository.set(
        repository,
        (await fetchJson(
          `https://api.github.com/repos/${repository}/security-advisories?state=published&per_page=100`,
          githubHeaders,
          { allowNotFound: true }
        )) ?? []
      )
    }
    matches.push(
      ...findAdvisoryMatches(entry, advisoriesByRepository.get(repository))
    )
  }

  console.log(
    `Checked ${packages.length} production packages in ${advisoriesByRepository.size} GitHub repositories.`
  )
  for (const match of matches) {
    console.log(
      `${match.severity}: ${match.name}@${match.version} ${match.ghsaId} ${match.summary} (${match.url})`
    )
    if (match.unreadableRange !== undefined) {
      console.log(
        `  Could not read the affected versions ("${match.unreadableRange}"). Check by hand whether ${match.version} is affected.`
      )
    }
  }

  return matches
}

if (require.main === module) {
  checkRepositoryAdvisories().then(
    (matches) => {
      process.exitCode = matches.length > 0 ? 1 : 0
    },
    (error) => {
      console.error(error)
      process.exitCode = 1
    }
  )
}
