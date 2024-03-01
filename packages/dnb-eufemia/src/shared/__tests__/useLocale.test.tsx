/**
 * useLocale Tests
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import { useLocale } from '../useLocale'
import Provider from '../Provider'

// Translations
import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'
import { LOCALE as defaultLocale } from '../defaults'

describe('useLocale', () => {
  it('should default to nb-NO if no locale is specified in context', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current).toEqual(nbNO[defaultLocale])
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    expect(resultGB.current).toEqual(enGB['en-GB'])

    const { result: resultNO } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    expect(resultNO.current).toEqual(nbNO['nb-NO'])
  })

  it('should extend translation', () => {
    const extendedLocale = {
      DatePicker: {
        mask_placeholder: 'Custom placeholder',
      },
    }

    const { result } = renderHook(() => useLocale(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.DatePicker).toMatchObject(
      extendedLocale.DatePicker
    )
  })

  it('should extend translation inside locale key', () => {
    const extendedLocale = {
      'nb-NO': {
        DatePicker: {
          mask_placeholder: 'Custom placeholder',
        },
      },
    }

    const { result } = renderHook(() => useLocale(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.DatePicker).toMatchObject(
      extendedLocale['nb-NO'].DatePicker
    )

    const { result: resultGB } = renderHook(
      () => useLocale(extendedLocale),
      {
        wrapper: ({ children }) => (
          <Provider locale="en-GB">{children}</Provider>
        ),
      }
    )

    expect(resultGB.current.DatePicker).not.toMatchObject(
      extendedLocale['nb-NO'].DatePicker
    )
  })
})
