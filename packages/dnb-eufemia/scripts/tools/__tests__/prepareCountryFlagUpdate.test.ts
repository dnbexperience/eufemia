import { makeCountryFlagUpdate } from '../prepareCountryFlagUpdate'

describe('makeCountryFlagUpdate', () => {
  it('links the pinned upstream release and groups added, updated, and removed flags', () => {
    const update = makeCountryFlagUpdate(
      '7.5.0',
      '7.6.0',
      [
        'M\tpackages/dnb-eufemia/assets/flags/1x1/no.svg',
        'D\tpackages/dnb-eufemia/assets/flags/1x1/xx.svg',
        'A\tpackages/dnb-eufemia/assets/flags/1x1/se.svg',
        'A\tpackages/dnb-eufemia/assets/flags/1x1/dk.svg',
      ].join('\n')
    )

    expect(update.title).toBe(
      'feat(CountryFlag)!: update flags to flag-icons v7.6.0'
    )
    expect(update.body).toContain(
      'https://github.com/lipis/flag-icons/releases/tag/v7.6.0'
    )
    expect(update.summary).toContain('flag-icons: 7.5.0 → 7.6.0')
    expect(update.summary).toContain('- Added: dk, se')
    expect(update.summary).toContain('- Updated: no')
    expect(update.summary).toContain('- Removed: xx')
  })

  it('supports a version update without SVG changes', () => {
    const { summary } = makeCountryFlagUpdate('7.5.0', '7.6.0', '')

    expect(summary).toContain('- Added: None')
    expect(summary).toContain('- Updated: None')
    expect(summary).toContain('- Removed: None')
  })

  it.each([
    ['A', 'feat(CountryFlag)'],
    ['M', 'fix(CountryFlag)'],
    ['D', 'feat(CountryFlag)!'],
    ['', 'chore(CountryFlag)'],
  ])('uses the release type for %s flag changes', (status, type) => {
    const changes = status
      ? status + '\tpackages/dnb-eufemia/assets/flags/1x1/no.svg'
      : ''

    expect(makeCountryFlagUpdate('7.5.0', '7.6.0', changes).title).toBe(
      type + ': update flags to flag-icons v7.6.0'
    )
  })

  it.each(['7.4.9', '6.99.99'])('rejects a downgrade to %s', (version) => {
    expect(() => makeCountryFlagUpdate('7.5.0', version, '')).toThrow(
      'downgrade'
    )
  })

  it.each(['latest', '^7.6.0', '7.6.0-beta.1'])(
    'rejects an unpinned or prerelease version: %s',
    (version) => {
      expect(() => makeCountryFlagUpdate('7.5.0', version, '')).toThrow(
        'stable, pinned'
      )
    }
  )

  it.each(['7.5.0', '7.10.0', '8.0.0'])(
    'accepts a stable version: %s',
    (version) => {
      expect(makeCountryFlagUpdate('7.5.0', version, '').body).toContain(
        version
      )
    }
  )
})
