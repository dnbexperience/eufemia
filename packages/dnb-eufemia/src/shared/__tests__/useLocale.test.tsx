/**
 * useTranslation Tests
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import { useLocale } from '../useLocale'
import Provider from '../Provider'

// Translations
import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'
import enUS from '../locales/en-US'

const wrapper = ({ children }) => (
  <React.StrictMode>{children}</React.StrictMode>
)

const wrapperWithContext = ({ children, locale }) => (
  <React.StrictMode>
    <Provider locale={locale}>{children}</Provider>
  </React.StrictMode>
)

describe('Translation', () => {
  it('should retrieve translations based on given locale', () => {
    const { result: resultGB } = renderHook(() => useLocale('en-GB'), {
      wrapper,
    })

    expect(resultGB.current).toEqual(enGB['en-GB'])

    const { result: resultNO } = renderHook(() => useLocale('nb-NO'), {
      wrapper,
    })

    expect(resultNO.current).toEqual(nbNO['nb-NO'])

    const { result: resultUS } = renderHook(() => useLocale('en-US'), {
      wrapper,
    })

    expect(resultUS.current).toEqual(enUS['en-US'])
  })

  it('should default to norwegian locale if no locale is specified', () => {
    const { result } = renderHook(() => useLocale(), { wrapper })

    expect(result.current).toEqual(nbNO['nb-NO'])
  })

  it('should inherit locale from shared context if no locale is specified', () => {
    const { result: resultGB } = renderHook(() => useLocale(), {
      wrapper: ({ children }) =>
        wrapperWithContext({ children, locale: 'en-GB' }),
    })

    expect(resultGB.current).toEqual(enGB['en-GB'])

    const { result: resultNO } = renderHook(() => useLocale(), {
      wrapper: ({ children }) =>
        wrapperWithContext({ children, locale: 'nb-NO' }),
    })

    expect(resultNO.current).toEqual(nbNO['nb-NO'])

    const { result: resultUS } = renderHook(() => useLocale(), {
      wrapper: ({ children }) =>
        wrapperWithContext({ children, locale: 'en-US' }),
    })

    expect(resultUS.current).toEqual(enUS['en-US'])
  })

  it('should override shared context locale if locale is specified', () => {
    const { result } = renderHook(() => useLocale('en-US'), {
      wrapper: ({ children }) =>
        wrapperWithContext({ children, locale: 'en-GB' }),
    })

    expect(result.current).toEqual(enUS['en-US'])
  })
})
