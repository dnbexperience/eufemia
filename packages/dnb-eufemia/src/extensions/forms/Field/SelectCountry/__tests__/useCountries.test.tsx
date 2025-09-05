import React from 'react'
import { renderHook } from '@testing-library/react'
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
  it('should return the correct countries', () => {
    const { result } = renderHook(useCountries)
    expect(result.current.countries).toStrictEqual(listOfCountries)
  })

  it('should extend the list of countries with the provided swedish translations', () => {
    const translations = mergeTranslations(svSE_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    expect(getOneCountry(result.current.countries, 'CX').i18n['sv']).toBe(
      'Julön'
    )
  })

  it('should extend the list of countries with the provided danish translations', () => {
    const translations = mergeTranslations(daDK_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="da-DK">
          {children}
        </Provider>
      ),
    })

    expect(getOneCountry(result.current.countries, 'CX').i18n['da']).toBe(
      'Juleøen'
    )
  })

  it('should translate all locales, regardless of the current locale', () => {
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

    expect(getOneCountry(result.current.countries, 'CX').i18n['sv']).toBe(
      'Julön'
    )
  })

  it('should not mutate the original list of countries', () => {
    const translations = mergeTranslations(svSE_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    expect(result.current.countries).not.toStrictEqual(listOfCountries)
    expect(getOneCountry(listOfCountries, 'CX').i18n['sv']).toBeUndefined()
  })

  it('should warn about missing translations', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

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

    expect(log).toHaveBeenCalledWith(
      expect.any(String),
      'Missing country translation:',
      ['BQ', 'FK', 'XK', 'GS', 'TK']
    )

    log.mockRestore()
  })

  it('should fall back using the default translations when a translations is missing', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

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

    expect(getOneCountry(result.current.countries, 'CX').i18n['sv']).toBe(
      'Juleøya'
    )

    log.mockRestore()
  })
})
