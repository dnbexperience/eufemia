import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { load } from 'js-yaml'
import {
  checkReleases,
  getReleaseAssets,
  verifyAttestation,
} from '../checkReleaseSbom.mjs'

const now = Date.parse('2026-11-02T12:00:00Z')
const time = {
  created: '2018-01-01T00:00:00Z',
  modified: '2026-11-02T10:00:00Z',
  '11.16.1': '2026-10-28T12:53:21Z',
  '11.17.0': '2026-11-02T10:00:00Z',
  '12.0.0-beta.1': '2026-11-01T10:00:00Z',
  // Unpublished: npm keeps its time but not the version.
  '12.0.0': '2026-11-01T00:00:00Z',
}
const allAssets = async (version: string) => [
  `dnb-eufemia-${version}.tgz`,
  'sbom.cdx.json',
  'vulnerability-report.json',
]

describe('checkReleases', () => {
  it('checks the versions npm published in the last three days', async () => {
    const getAssets = vi.fn(allAssets)
    const verify = vi.fn(async () => undefined)

    const results = await checkReleases({
      versions: ['11.16.1', '11.17.0'],
      time,
      now,
      getAssets,
      verify,
    })

    expect(results).toEqual([{ version: '11.17.0', problems: [] }])
    expect(getAssets).toHaveBeenCalledTimes(1)
    expect(getAssets).toHaveBeenCalledWith('11.17.0')
    expect(verify).toHaveBeenCalledTimes(1)
    expect(verify).toHaveBeenCalledWith('11.17.0')
  })

  it('reports a version without a GitHub release', async () => {
    const results = await checkReleases({
      versions: ['11.17.0'],
      time,
      now,
      getAssets: async () => undefined,
      verify: async () => undefined,
    })

    expect(results).toEqual([
      { version: '11.17.0', problems: ['there is no GitHub release'] },
    ])
  })

  it('reports missing SBOM files on the GitHub release', async () => {
    const results = await checkReleases({
      versions: ['11.17.0'],
      time,
      now,
      getAssets: async () => ['dnb-eufemia-11.17.0.tgz'],
      verify: async () => undefined,
    })

    expect(results).toEqual([
      {
        version: '11.17.0',
        problems: [
          'sbom.cdx.json is missing on the GitHub release',
          'vulnerability-report.json is missing on the GitHub release',
        ],
      },
    ])
  })

  it('reports an attestation that cannot be verified', async () => {
    const results = await checkReleases({
      versions: ['12.0.0-beta.1'],
      time,
      now,
      getAssets: allAssets,
      verify: async (version) => `no attestation for ${version}`,
    })

    expect(results).toEqual([
      {
        version: '12.0.0-beta.1',
        problems: ['no attestation for 12.0.0-beta.1'],
      },
    ])
  })
})

describe('gh and npm commands', () => {
  let bin: string
  const originalPath = process.env.PATH

  beforeEach(() => {
    bin = mkdtempSync(path.join(tmpdir(), 'eufemia-sbom-check-test-'))
    // Like npm, it lists every packed file on stderr unless told to be quiet.
    writeFileSync(
      path.join(bin, 'npm'),
      [
        '#!/bin/sh',
        '[ -n "$NPM_FAIL" ] && { echo "npm error code E404" >&2; exit 1; }',
        'case "$*" in *--loglevel=error*) ;; *) head -c 2000000 /dev/zero | tr "\\0" x >&2 ;; esac',
        'while [ $# -gt 0 ]; do [ "$1" = --pack-destination ] && dest="$2"; shift; done',
        ': > "$dest/dnb-eufemia-1.2.3.tgz"',
        'echo dnb-eufemia-1.2.3.tgz',
      ].join('\n'),
      { mode: 0o755 }
    )
    writeFileSync(
      path.join(bin, 'gh'),
      [
        '#!/bin/sh',
        'printf "%s\\n" "$*" > "$GH_ARGS"',
        'if [ "$1" = api ]; then',
        '  case "$GH_RELEASE" in',
        '    missing) echo "gh: Not Found (HTTP 404)" >&2; exit 1 ;;',
        '    error) echo "gh: Bad Gateway (HTTP 502)" >&2; exit 1 ;;',
        '  esac',
        '  echo \'["sbom.cdx.json"]\'',
        '  exit 0',
        'fi',
        '[ -n "$GH_FAIL" ] && { echo "no attestations found" >&2; exit 1; }',
        'exit 0',
      ].join('\n'),
      { mode: 0o755 }
    )
    process.env.PATH = `${bin}${path.delimiter}${originalPath}`
    process.env.GH_ARGS = path.join(bin, 'args')
  })

  afterEach(() => {
    process.env.PATH = originalPath
    delete process.env.GH_ARGS
    delete process.env.GH_FAIL
    delete process.env.GH_RELEASE
    delete process.env.NPM_FAIL
    rmSync(bin, { recursive: true, force: true })
  })

  it('reads the asset names of the GitHub release', async () => {
    expect(await getReleaseAssets('owner/repo', '1.2.3')).toEqual([
      'sbom.cdx.json',
    ])
    expect(readFileSync(process.env.GH_ARGS, 'utf8')).toMatch(
      /^api repos\/owner\/repo\/releases\/tags\/v1\.2\.3 /
    )
  })

  it('reads no assets when the GitHub release does not exist', async () => {
    process.env.GH_RELEASE = 'missing'

    expect(await getReleaseAssets('owner/repo', '1.2.3')).toBeUndefined()
  })

  it('fails on other GitHub API errors', async () => {
    process.env.GH_RELEASE = 'error'

    await expect(getReleaseAssets('owner/repo', '1.2.3')).rejects.toThrow()
  })

  it('verifies the npm tarball against the release workflow', async () => {
    expect(await verifyAttestation('owner/repo', '1.2.3')).toBeUndefined()
    expect(readFileSync(process.env.GH_ARGS, 'utf8')).toMatch(
      /^attestation verify \S+\/dnb-eufemia-1\.2\.3\.tgz --repo owner\/repo --predicate-type https:\/\/cyclonedx\.org\/bom --signer-workflow owner\/repo\/\.github\/workflows\/release\.yml\n$/
    )
  })

  it('reports a tarball without an attestation', async () => {
    process.env.GH_FAIL = '1'
    const log = vi.spyOn(process.stderr, 'write').mockReturnValue(true)

    try {
      expect(await verifyAttestation('owner/repo', '1.2.3')).toBe(
        'the npm tarball has no SBOM attestation from the release workflow'
      )
      expect(log).toHaveBeenCalledWith('no attestations found\n')
    } finally {
      log.mockRestore()
    }
  })

  it('reports a version npm does not serve', async () => {
    process.env.NPM_FAIL = '1'
    const log = vi.spyOn(process.stderr, 'write').mockReturnValue(true)

    try {
      expect(await verifyAttestation('owner/repo', '1.2.3')).toBe(
        'npm does not serve this version'
      )
      expect(log).toHaveBeenCalledWith('npm error code E404\n')
    } finally {
      log.mockRestore()
    }
  })
})

describe('Release SBOM check workflow', () => {
  it('also runs daily, for versions npm lists after the release run', () => {
    const workflow = load(
      readFileSync(
        path.resolve(
          __dirname,
          '../../../../../.github/workflows/release-sbom-check.yml'
        ),
        'utf8'
      )
    ) as {
      on: { schedule?: Array<{ cron: string }> }
      jobs: { check: { if: string } }
    }

    expect(workflow.on.schedule).toEqual([
      { cron: expect.stringMatching(/^\d+ \d+ \* \* \*$/) },
    ])
    expect(workflow.jobs.check.if).toContain(
      "github.event_name == 'schedule'"
    )
  })
})
