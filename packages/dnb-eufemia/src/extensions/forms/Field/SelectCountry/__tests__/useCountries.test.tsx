import { renderHook, waitFor } from '@testing-library/react'
import useCountries from '../useCountries'
import listOfCountries from '../../../constants/countries'
import Provider from '../../../../../shared/Provider'
import { mergeTranslations } from '../../../../../shared'
import svSE_forms_countries from '../../../constants/locales/countries/sv-SE'
import daDK_forms_countries from '../../../constants/locales/countries/da-DK'

const getOneCountry = (countries, country: string) => {
  return countries.find((c) => c.iso === country)
}

describe('useCountries', () => {
  it('should return the correct countries once the full list has loaded', async () => {
    const { result } = renderHook(useCountries)

    await waitFor(() => {
      expect(result.current.countries).toStrictEqual(listOfCountries)
    })
  })

  it('should provide the prioritized countries synchronously', () => {
    const { result } = renderHook(useCountries)

    // The prioritized (Nordic) countries — including Norway (+47) — are
    // available immediately, without waiting for the full list to load.
    expect(result.current.countries.map((country) => country.iso)).toEqual(
      expect.arrayContaining(['NO', 'SE', 'DK', 'FI'])
    )
  })

  it('should extend the list of countries with the provided swedish translations', async () => {
    const translations = mergeTranslations(svSE_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    await waitFor(() => {
      expect(getOneCountry(result.current.countries, 'CX').i18n['sv']).toBe(
        'Julön'
      )
    })
  })

  it('should extend the list of countries with the provided danish translations', async () => {
    const translations = mergeTranslations(daDK_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="da-DK">
          {children}
        </Provider>
      ),
    })

    await waitFor(() => {
      expect(getOneCountry(result.current.countries, 'CX').i18n['da']).toBe(
        'Juleøen'
      )
    })
  })

  it('should translate all locales, regardless of the current locale', async () => {
    const translations = mergeTranslations(svSE_forms_countries)

    const { result } = renderHook(useCountries, {
      initialProps: {
        translateAllLocales: true,
      },
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="nb-NO">
          {children}
        </Provider>
      ),
    })

    await waitFor(() => {
      expect(getOneCountry(result.current.countries, 'CX').i18n['sv']).toBe(
        'Julön'
      )
    })
  })

  it('should not mutate the original list of countries', async () => {
    const translations = mergeTranslations(svSE_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    await waitFor(() => {
      expect(result.current.countries).not.toStrictEqual(listOfCountries)
    })
    expect(getOneCountry(listOfCountries, 'CX').i18n['sv']).toBeUndefined()
  })

  it('should warn about missing translations', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Remove some countries from the translations to simulate missing translations
    const partialTranslations = { ...svSE_forms_countries['sv-SE'] }
      .countries
    delete partialTranslations['BQ']
    delete partialTranslations['FK']
    delete partialTranslations['XK']
    delete partialTranslations['GS']
    delete partialTranslations['TK']
    const translations = mergeTranslations({
      'sv-SE': { countries: partialTranslations },
    })

    renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    await waitFor(() => {
      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Missing country translation:',
        ['BQ', 'FK', 'XK', 'GS', 'TK']
      )
    })

    log.mockRestore()
  })

  it('should fall back using the default translations when a translations is missing', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Remove some countries from the translations to simulate missing translations
    const partialTranslations = { ...svSE_forms_countries['sv-SE'] }
      .countries
    delete partialTranslations['CX']
    const translations = mergeTranslations({
      'sv-SE': { countries: partialTranslations },
    })

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    await waitFor(() => {
      expect(getOneCountry(result.current.countries, 'CX').i18n['sv']).toBe(
        'Juleøya'
      )
    })

    log.mockRestore()
  })
})
