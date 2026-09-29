import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { findStaleResolutions } from '../findStaleResolutions.mjs'

const lockfile = `
"@actions/http-client@npm:^4.0.0":
  version: 4.0.1
  resolution: "@actions/http-client@npm:4.0.1"
  dependencies:
    undici: "npm:^6.23.0"
  languageName: node
  linkType: hard

"miniflare@npm:4.20260617.0":
  version: 4.20260617.0
  resolution: "miniflare@npm:4.20260617.0"
  dependencies:
    undici: "npm:7.28.0"
    "@scope/pkg": "npm:^1.0.0"
  languageName: node
  linkType: hard

"undici@npm:^6.23.0":
  version: 6.29.0
  resolution: "undici@npm:6.29.0"
  languageName: node
  linkType: hard

"undici@npm:7.30.0":
  version: 7.30.0
  resolution: "undici@npm:7.30.0"
  languageName: node
  linkType: hard

"@scope/pkg@npm:1.2.0":
  version: 1.2.0
  resolution: "@scope/pkg@npm:1.2.0"
  languageName: node
  linkType: hard
`

describe('findStaleResolutions', () => {
  it('keeps range-scoped keys that a dependent still requests', () => {
    expect(
      findStaleResolutions({
        resolutions: {
          'undici@npm:7.28.0': '7.30.0',
          '@scope/pkg@npm:^1.0.0': '1.2.0',
        },
        lockfile,
      })
    ).toEqual([])
  })

  it('reports range-scoped keys that no dependent requests', () => {
    expect(
      findStaleResolutions({
        resolutions: {
          'undici@npm:^6.23.0': '6.29.0',
          'undici@npm:^7.25.0': '7.29.0',
          'undici@npm:7.18.2': '7.29.0',
        },
        lockfile,
      })
    ).toEqual(['undici@npm:^7.25.0', 'undici@npm:7.18.2'])
  })

  it('does not treat the resolved lockfile key as a request', () => {
    expect(
      findStaleResolutions({
        resolutions: { 'undici@npm:7.30.0': '7.30.0' },
        lockfile,
      })
    ).toEqual(['undici@npm:7.30.0'])
  })

  it('checks unscoped keys against installed packages', () => {
    expect(
      findStaleResolutions({
        resolutions: {
          undici: '7.30.0',
          '@scope/pkg': '1.2.0',
          '@tootallnate/once': '2.0.1',
        },
        lockfile,
      })
    ).toEqual(['@tootallnate/once'])
  })

  it('passes for the repository resolutions', () => {
    const script = path.resolve(__dirname, '../findStaleResolutions.mjs')
    const result = spawnSync(process.execPath, [script], {
      encoding: 'utf8',
    })

    expect(result.stderr).toBe('')
    expect(result.status).toBe(0)
  })
})
