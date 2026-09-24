import { getFontBasePath } from '../config'

describe('font URL rewrite config', () => {
  it('uses an immutable CDN path for a release version', () => {
    expect(getFontBasePath('11.14.1')).toBe(
      'https://assets.eufemia.dnb.no/v11.14.1/fonts/'
    )
  })

  it('supports prerelease versions', () => {
    expect(getFontBasePath('11.15.0-beta.2')).toBe(
      'https://assets.eufemia.dnb.no/v11.15.0-beta.2/fonts/'
    )
  })

  it('uses the stable alias outside release builds', () => {
    expect(getFontBasePath('release')).toBe(
      'https://assets.eufemia.dnb.no/fonts/'
    )
  })
})
