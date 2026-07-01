import listOfCountries from '../countries'
import prioritizedCountriesData, {
  prioritizedCountries,
} from '../countries-prioritized'

describe('countries-prioritized', () => {
  it('should list the prioritized country names', () => {
    expect(prioritizedCountries).toEqual([
      'Norway',
      'Sweden',
      'Denmark',
      'Finland',
    ])
  })

  it('should match the corresponding entries in the full country list (guards against drift)', () => {
    expect(prioritizedCountriesData).toHaveLength(4)

    prioritizedCountriesData.forEach((country) => {
      const fullEntry = listOfCountries.find(
        ({ iso }) => iso === country.iso
      )
      expect(fullEntry).toBeDefined()
      expect(country).toStrictEqual(fullEntry)
    })
  })

  it('should include Norway so the PhoneNumber default (+47) is available synchronously', () => {
    const norway = prioritizedCountriesData.find(({ iso }) => iso === 'NO')
    expect(norway).toBeDefined()
    expect(norway.cdc).toBe('47')
  })
})
