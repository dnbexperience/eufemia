import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { checkReleases, verifyAttestation } from '../checkReleaseSbom.mjs'

type Release = {
  tag_name: string
  draft: boolean
  published_at: string | null
  assets: Array<{ name: string }>
}

const now = Date.parse('2026-11-02T12:00:00Z')

function release(
  version: string,
  publishedAt: string | null,
  assets = [
    `dnb-eufemia-${version}.tgz`,
    'sbom.cdx.json',
    'vulnerability-report.json',
  ]
): Release {
  return {
    tag_name: `v${version}`,
    draft: false,
    published_at: publishedAt,
    assets: assets.map((name) => ({ name })),
  }
}

describe('checkReleases', () => {
  it('checks the releases published in the last three days', async () => {
    const verify = vi.fn(async () => undefined)

    const results = await checkReleases({
      releases: [
        release('11.17.0', '2026-11-02T10:00:00Z'),
        release('11.16.1', '2026-10-28T12:53:21Z'),
        { ...release('11.17.1', '2026-11-02T11:00:00Z'), draft: true },
        release('11.17.2', null),
        {
          ...release('1.0.0', '2026-11-02T11:00:00Z'),
          tag_name: 'tools-1',
        },
      ],
      now,
      verify,
    })

    expect(results).toEqual([{ version: '11.17.0', problems: [] }])
    expect(verify).toHaveBeenCalledTimes(1)
    expect(verify).toHaveBeenCalledWith('11.17.0')
  })

  it('reports missing SBOM files on the GitHub release', async () => {
    const results = await checkReleases({
      releases: [
        release('11.17.0', '2026-11-02T10:00:00Z', [
          'dnb-eufemia-11.17.0.tgz',
        ]),
      ],
      now,
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
      releases: [release('12.0.0-beta.1', '2026-11-01T10:00:00Z')],
      now,
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

describe('verifyAttestation', () => {
  let bin: string
  const originalPath = process.env.PATH

  beforeEach(() => {
    bin = mkdtempSync(path.join(tmpdir(), 'eufemia-sbom-check-test-'))
    // Like npm, it lists every packed file on stderr unless told to be quiet.
    writeFileSync(
      path.join(bin, 'npm'),
      [
        '#!/bin/sh',
        '[ -n "$NPM_FAIL" ] && exit 1',
        'case "$*" in *--loglevel=error*) ;; *) head -c 2000000 /dev/zero | tr "\\0" x >&2 ;; esac',
        'while [ $# -gt 0 ]; do [ "$1" = --pack-destination ] && dest="$2"; shift; done',
        ': > "$dest/dnb-eufemia-1.2.3.tgz"',
        'echo dnb-eufemia-1.2.3.tgz',
      ].join('\n'),
      { mode: 0o755 }
    )
    writeFileSync(
      path.join(bin, 'gh'),
      '#!/bin/sh\nprintf "%s\\n" "$*" > "$GH_ARGS"\n[ -z "$GH_FAIL" ]\n',
      { mode: 0o755 }
    )
    process.env.PATH = `${bin}${path.delimiter}${originalPath}`
    process.env.GH_ARGS = path.join(bin, 'args')
  })

  afterEach(() => {
    process.env.PATH = originalPath
    delete process.env.GH_ARGS
    delete process.env.GH_FAIL
    delete process.env.NPM_FAIL
    rmSync(bin, { recursive: true, force: true })
  })

  it('verifies the npm tarball against the release workflow', async () => {
    expect(await verifyAttestation('owner/repo', '1.2.3')).toBeUndefined()
    expect(readFileSync(process.env.GH_ARGS, 'utf8')).toMatch(
      /^attestation verify \S+\/dnb-eufemia-1\.2\.3\.tgz --repo owner\/repo --predicate-type https:\/\/cyclonedx\.org\/bom --signer-workflow owner\/repo\/\.github\/workflows\/release\.yml\n$/
    )
  })

  it('reports a tarball without an attestation', async () => {
    process.env.GH_FAIL = '1'

    expect(await verifyAttestation('owner/repo', '1.2.3')).toBe(
      'the npm tarball has no SBOM attestation from the release workflow'
    )
  })

  it('reports a version npm does not serve', async () => {
    process.env.NPM_FAIL = '1'

    expect(await verifyAttestation('owner/repo', '1.2.3')).toBe(
      'npm does not serve this version'
    )
  })
})
