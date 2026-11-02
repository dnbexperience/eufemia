/**
 * Check that every recently published release has its SBOM: the SBOM files on
 * the GitHub release, and a CycloneDX attestation from the release workflow
 * for the tarball npm serves. The release workflow keeps those steps
 * non-blocking, so this check is where a missing SBOM shows up.
 *
 * Usage: node ./scripts/tools/checkReleaseSbom.mjs
 * Needs GITHUB_REPOSITORY, and gh signed in (GH_TOKEN in CI).
 */

import { execFile } from 'node:child_process'
import { appendFileSync, mkdtempSync, realpathSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const exec = promisify(execFile)

const DAY = 24 * 60 * 60 * 1000

// Long enough to cover a re-run of the release run that published it.
const WINDOW_DAYS = 3

const SBOM_FILES = ['sbom.cdx.json', 'vulnerability-report.json']

/**
 * @typedef {{ tag_name: string, draft: boolean, published_at: string | null, assets: Array<{ name: string }> }} Release
 * @param {{ releases: Release[], now: number, verify: (version: string) => Promise<string | undefined> }} options
 * @returns {Promise<Array<{ version: string, problems: string[] }>>}
 */
export async function checkReleases({ releases, now, verify }) {
  const recent = releases.filter(
    (release) =>
      !release.draft &&
      release.published_at &&
      now - Date.parse(release.published_at) <= WINDOW_DAYS * DAY &&
      /^v\d/.test(release.tag_name)
  )

  const results = []
  for (const release of recent) {
    const version = release.tag_name.slice(1)
    const names = release.assets.map((asset) => asset.name)
    const problems = SBOM_FILES.filter(
      (name) => !names.includes(name)
    ).map((name) => `${name} is missing on the GitHub release`)
    const attestation = await verify(version)
    if (attestation) {
      problems.push(attestation)
    }
    results.push({ version, problems })
  }
  return results
}

export async function verifyAttestation(repository, version) {
  const directory = mkdtempSync(path.join(tmpdir(), 'eufemia-sbom-check-'))
  try {
    let tarball
    try {
      const { stdout } = await exec('npm', [
        'pack',
        `@dnb/eufemia@${version}`,
        '--ignore-scripts',
        // Without it, npm lists every packed file and overflows the buffer.
        '--loglevel=error',
        '--pack-destination',
        directory,
      ])
      tarball = path.join(directory, stdout.trim().split('\n').pop())
    } catch {
      return 'npm does not serve this version'
    }

    try {
      await exec('gh', [
        'attestation',
        'verify',
        tarball,
        '--repo',
        repository,
        '--predicate-type',
        'https://cyclonedx.org/bom',
        '--signer-workflow',
        `${repository}/.github/workflows/release.yml`,
      ])
    } catch {
      return 'the npm tarball has no SBOM attestation from the release workflow'
    }
    return undefined
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

async function main() {
  const repository = process.env.GITHUB_REPOSITORY ?? ''
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) {
    throw new Error('GITHUB_REPOSITORY must be set to owner/repository')
  }

  const { stdout } = await exec('gh', [
    'api',
    `repos/${repository}/releases?per_page=20`,
  ])
  const results = await checkReleases({
    releases: JSON.parse(stdout),
    now: Date.now(),
    verify: (version) => verifyAttestation(repository, version),
  })

  const summary =
    results.length === 0
      ? `No release was published in the last ${WINDOW_DAYS} days.`
      : results
          .map(({ version, problems }) =>
            problems.length === 0
              ? `PASS v${version}`
              : `FAIL v${version}: ${problems.join('; ')}`
          )
          .join('\n')
  console.log(summary)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
  }

  for (const { version, problems } of results) {
    if (problems.length > 0) {
      console.log(`::error::v${version}: ${problems.join('; ')}`)
      process.exitCode = 1
    }
  }
}

const invokedPath = process.argv[1]
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
