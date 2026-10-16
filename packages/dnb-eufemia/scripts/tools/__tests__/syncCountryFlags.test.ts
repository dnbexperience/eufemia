import fs from 'fs'
import path from 'path'
import countries from '../../../src/shared/constants/countries'
import {
  flagsDir,
  getFlagIconsSource,
  makeFlagStyles,
  stylesFile,
} from '../syncCountryFlags'

describe('syncCountryFlags', () => {
  const { version, squareDir, flags } = getFlagIconsSource()

  it('has committed styles matching the flag-icons package', () => {
    expect(fs.readFileSync(stylesFile, 'utf-8')).toBe(
      makeFlagStyles(version, flags)
    )
  })

  it('has committed flags matching the flag-icons package', () => {
    const committedFlags = fs.readdirSync(path.join(flagsDir, '1x1'))

    expect(committedFlags.sort()).toEqual(
      flags.map((flag) => `${flag}.svg`).sort()
    )

    for (const flag of flags) {
      expect(
        fs.readFileSync(path.join(flagsDir, '1x1', `${flag}.svg`), 'utf-8')
      ).toBe(fs.readFileSync(path.join(squareDir, `${flag}.svg`), 'utf-8'))
    }
  })

  it('has a flag for every country', () => {
    const missing = countries
      .map(({ iso }) => iso.toLowerCase())
      .filter((iso) => !flags.includes(iso))

    expect(missing).toEqual([])
  })

  it('keeps the fallback flag first', () => {
    expect(flags[0]).toBe('xx')
    expect(makeFlagStyles(version, flags)).toContain(`Version: ${version}`)
  })
})
