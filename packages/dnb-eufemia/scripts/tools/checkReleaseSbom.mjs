/**
 * Check that every version npm published recently has its SBOM: a GitHub
 * release with the SBOM files, and a CycloneDX attestation from the release
 * workflow for the tarball npm serves. The release workflow keeps those steps
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
 * Starts from npm, because a version can be published there without a
 * GitHub release: semantic-release creates the release after `npm publish`.
 *
 * @param {{ versions: string[], time: Record<string, string>, now: number, getAssets: (version: string) => Promise<string[] | undefined>, verify: (version: string) => Promise<string | undefined> }} options
 * @returns {Promise<Array<{ version: string, problems: string[] }>>}
 */
export async function checkReleases({
  versions,
  time,
  now,
  getAssets,
  verify,
}) {
  // `versions`, not the keys of `time`, which also lists unpublished versions.
  const recent = versions.filter(
    (version) =>
      time[version] && now - Date.parse(time[version]) <= WINDOW_DAYS * DAY
  )

  const results = []
  for (const version of recent) {
    const assets = await getAssets(version)
    const problems = assets
      ? SBOM_FILES.filter((name) => !assets.includes(name)).map(
          (name) => `${name} is missing on the GitHub release`
        )
      : ['there is no GitHub release']
    const attestation = await verify(version)
    if (attestation) {
      problems.push(attestation)
    }
    results.push({ version, problems })
  }
  return results
}

export async function getReleaseAssets(repository, version) {
  try {
    const { stdout } = await exec('gh', [
      'api',
      `repos/${repository}/releases/tags/v${version}`,
      '--jq',
      '[.assets[].name]',
    ])
    return JSON.parse(stdout)
  } catch (error) {
    if (/HTTP 404/.test(error.stderr)) {
      return undefined
    }
    throw error
  }
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
    } catch (error) {
      process.stderr.write(error.stderr ?? '')
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
    } catch (error) {
      process.stderr.write(error.stderr ?? '')
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

  const { stdout } = await exec('npm', [
    'view',
    '@dnb/eufemia',
    'versions',
    'time',
    '--json',
  ])
  const { versions, time } = JSON.parse(stdout)
  const results = await checkReleases({
    versions,
    time,
    now: Date.now(),
    getAssets: (version) => getReleaseAssets(repository, version),
    verify: (version) => verifyAttestation(repository, version),
  })

  const summary =
    results.length === 0
      ? `npm published no version in the last ${WINDOW_DAYS} days.`
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
