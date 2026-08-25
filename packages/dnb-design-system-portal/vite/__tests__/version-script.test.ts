import { describe, expect, it } from 'vitest'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { resolveReleaseVersion } = require('../../scripts/version')

describe('portal version script', () => {
  it('uses the latest package tag for a portal-only deployment', () => {
    expect(resolveReleaseVersion(null, 'v11.11.0')).toBe('11.11.0')
  })

  it('uses the upcoming package version for a regular release', () => {
    expect(resolveReleaseVersion('11.12.0', 'v11.11.0')).toBe('11.12.0')
  })

  it('reports when no package version can be resolved', () => {
    expect(resolveReleaseVersion(null, undefined)).toBe('Not released')
  })
})
