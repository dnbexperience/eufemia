/**
 * Form.useTranslation Tests
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import useTranslation from '../useTranslation'
import Provider from '../../../../shared/Provider'
import { LOCALE as defaultLocale } from '../../../../shared/defaults'

// Translations
import forms_nbNO from '../../constants/locales/nb-NO'
import forms_enGB from '../../constants/locales/en-GB'
import global_nbNO from '../../../../shared/locales/nb-NO'
import global_enGB from '../../../../shared/locales/en-GB'

describe('Form.useTranslation', () => {
  it('should default to nb-NO if no locale is specified in context', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current).toEqual(
      Object.assign(
        forms_nbNO[defaultLocale],
        global_nbNO[defaultLocale],
        {
          formatMessage: expect.any(Function),
        }
      )
    )
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    expect(resultGB.current).toEqual(
      Object.assign(forms_enGB['en-GB'], global_enGB['en-GB'], {
        formatMessage: expect.any(Function),
      })
    )

    const { result: resultNO } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    expect(resultNO.current).toEqual(
      Object.assign(forms_nbNO['nb-NO'], {
        formatMessage: expect.any(Function),
      })
    )
  })

  it('should extend translation', () => {
    const extendedLocale = {
      Email: {
        label: 'Custom label',
      },
    }

    const { result } = renderHook(() => useTranslation(extendedLocale), {
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

    const { result } = renderHook(() => useTranslation(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.Email).toMatchObject(
      extendedLocale['nb-NO'].Email
    )

    const { result: resultGB } = renderHook(
      () => useTranslation(extendedLocale),
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
