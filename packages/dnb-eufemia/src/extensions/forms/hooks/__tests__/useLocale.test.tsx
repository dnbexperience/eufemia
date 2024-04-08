/**
 * Form.useLocale Tests
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import useLocale from '../useLocale'
import Provider from '../../../../shared/Provider'
import { LOCALE as defaultLocale } from '../../../../shared/defaults'

// Translations
import nbNO from '../../constants/locales/nb-NO'
import enGB from '../../constants/locales/en-GB'

describe('Form.useLocale', () => {
  it('should default to nb-NO if no locale is specified in context', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current).toEqual(
      Object.assign(nbNO[defaultLocale], {
        formatMessage: expect.any(Function),
      })
    )
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    expect(resultGB.current).toEqual(
      Object.assign(enGB['en-GB'], { formatMessage: expect.any(Function) })
    )

    const { result: resultNO } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    expect(resultNO.current).toEqual(
      Object.assign(nbNO['nb-NO'], { formatMessage: expect.any(Function) })
    )
  })

  it('should extend translation', () => {
    const extendedLocale = {
      Email: {
        label: 'Custom label',
      },
    }

    const { result } = renderHook(() => useLocale(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.Email).toMatchObject(extendedLocale.Email)
  })

  it('should extend translation inside locale key', () => {
    const extendedLocale = {
      'nb-NO': {
        Email: {
          label: 'Custom label',
        },
      },
    }

    const { result } = renderHook(() => useLocale(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.Email).toMatchObject(
      extendedLocale['nb-NO'].Email
    )

    const { result: resultGB } = renderHook(
      () => useLocale(extendedLocale),
      {
        wrapper: ({ children }) => (
          <Provider locale="en-GB">{children}</Provider>
        ),
      }
    )

    expect(resultGB.current.Email).not.toMatchObject(
      extendedLocale['nb-NO'].Email
    )
  })
})
