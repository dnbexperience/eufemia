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
    vulnerable_version_range?: string
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
}

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

function parseVersion(version: string) {
  const [major = 0, minor = 0, patch = 0] = version
    .replace(/^v/, '')
    .split('-')[0]
    .split('.')
    .map((part) => parseInt(part, 10) || 0)
  return [major, minor, patch]
}

function compareVersions(a: string, b: string) {
  const left = parseVersion(a)
  const right = parseVersion(b)
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] < right[index] ? -1 : 1
    }
  }
  return 0
}

/**
 * Supports the GitHub advisory range format, such as ">= 7.0.0, < 7.1.6".
 */
export function isVersionInRange(version: string, range: string) {
  return range.split(',').every((comparator) => {
    const match = /^\s*(>=|<=|>|<|=)?\s*(\S+)\s*$/.exec(comparator)
    if (!match) {
      return false
    }
    const result = compareVersions(version, match[2])
    switch (match[1]) {
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
}

/**
 * A version is fixed when it reaches a patched version of its own major, or the newest patched version.
 */
export function isPatched(
  version: string,
  patchedVersions?: string | null
) {
  const patched = String(patchedVersions ?? '')
    .split(',')
    .map((patchedVersion) => patchedVersion.trim())
    .filter(Boolean)
  if (patched.length === 0) {
    return false
  }

  const newest = patched.reduce((a, b) =>
    compareVersions(a, b) >= 0 ? a : b
  )
  return (
    compareVersions(version, newest) >= 0 ||
    patched.some(
      (patchedVersion) =>
        parseVersion(patchedVersion)[0] === parseVersion(version)[0] &&
        compareVersions(version, patchedVersion) >= 0
    )
  )
}

export function findAdvisoryMatches(
  entry: Pick<LockfileEntry, 'name' | 'version'>,
  advisories: RepositoryAdvisory[]
): AdvisoryMatch[] {
  return advisories.flatMap((advisory) =>
    (advisory.vulnerabilities ?? [])
      .filter(
        ({ package: pkg, vulnerable_version_range, patched_versions }) =>
          pkg?.ecosystem === 'npm' &&
          pkg?.name === entry.name &&
          Boolean(vulnerable_version_range) &&
          isVersionInRange(entry.version, vulnerable_version_range) &&
          !isPatched(entry.version, patched_versions)
      )
      .map(() => ({
        name: entry.name,
        version: entry.version,
        ghsaId: advisory.ghsa_id,
        severity: advisory.severity,
        summary: advisory.summary,
        url: advisory.html_url,
      }))
  )
}

async function fetchJson(
  url: string,
  headers: Record<string, string> = {}
) {
  const response = await fetch(url, { headers })
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
      `https://registry.npmjs.org/${entry.name.replace('/', '%2F')}/${entry.version}`
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
        await fetchJson(
          `https://api.github.com/repos/${repository}/security-advisories?state=published&per_page=100`,
          githubHeaders
        )
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
