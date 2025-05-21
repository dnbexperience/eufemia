import React from 'react'
import { renderHook } from '@testing-library/react'
import useCountries from '../useCountries'
import listOfCountries from '../../../constants/countries'
import Provider from '../../../../../shared/Provider'
import { mergeTranslations } from '../../../../../shared'
import svSE_forms_countries from '../../../constants/locales/countries/sv-SE'

const getOneCountry = (countries, country: string) => {
  return countries.find((c) => c.iso === country)
}

describe('useCountries', () => {
  it('should return the correct countries', () => {
    const { result } = renderHook(useCountries)
    expect(result.current.countries).toStrictEqual(listOfCountries)
  })

  it('should extend the list of countries with the provided translations', () => {
    const translations = mergeTranslations(svSE_forms_countries)

    const { result } = renderHook(useCountries, {
      wrapper: ({ children }) => (
        <Provider translations={translations} locale="sv-SE">
          {children}
        </Provider>
      ),
    })

    expect(getOneCountry(result.current.countries, 'WF').i18n['sv']).toBe(
      'Wallis och Futuna'
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
    expect(getOneCountry(listOfCountries, 'WF').i18n['sv']).toBeUndefined()
  })
})
