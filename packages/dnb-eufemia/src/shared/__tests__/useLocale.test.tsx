/**
 * useLocale Tests
 *
 */

import React, { StrictMode } from 'react'
import { renderHook } from '@testing-library/react'
import { useLocale } from '../useLocale'
import Provider from '../Provider'

// Translations
import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'
import enUS from '../locales/en-US'
import { LOCALE as defaultLocale } from '../defaults'

describe('Translation', () => {
  it(`should default to ${defaultLocale} if no locale is specified in context`, () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <StrictMode>
          <Provider>{children}</Provider>
        </StrictMode>
      ),
    })

    expect(result.current).toEqual(nbNO[defaultLocale])
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <StrictMode>
          <Provider locale="en-GB">{children}</Provider>
        </StrictMode>
      ),
    })

    expect(resultGB.current).toEqual(enGB['en-GB'])

    const { result: resultNO } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <StrictMode>
          <Provider locale="nb-NO">{children}</Provider>
        </StrictMode>
      ),
    })

    expect(resultNO.current).toEqual(nbNO['nb-NO'])

    const { result: resultUS } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <StrictMode>
          <Provider locale="en-US">{children}</Provider>
        </StrictMode>
      ),
    })

    expect(resultUS.current).toEqual(enUS['en-US'])
  })
})
