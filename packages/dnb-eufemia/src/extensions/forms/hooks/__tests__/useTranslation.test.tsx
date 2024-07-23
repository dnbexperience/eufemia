/**
 * Form.useTranslation Tests
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import useTranslation from '../useTranslation'
import Provider from '../../../../shared/Provider'

// Translations
import forms_nbNO from '../../constants/locales/nb-NO'
import forms_enGB from '../../constants/locales/en-GB'
import global_nbNO from '../../../../shared/locales/nb-NO'
import global_enGB from '../../../../shared/locales/en-GB'
import { extendDeep } from '../../../../shared/component-helper'

describe('Form.useTranslation', () => {
  it('should default to nb-NO if no locale is specified in context', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    const nb = {}
    extendDeep(nb, forms_nbNO['nb-NO'], global_nbNO['nb-NO'])
    nb['formatMessage'] = expect.any(Function)

    expect(result.current).toEqual(nb)
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    const gb = {}
    extendDeep(gb, forms_enGB['en-GB'], global_enGB['en-GB'])
    gb['formatMessage'] = expect.any(Function)

    expect(resultGB.current).toEqual(gb)

    const { result: resultNO } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    const nb = {}
    extendDeep(nb, forms_nbNO['nb-NO'], global_nbNO['nb-NO'])
    nb['formatMessage'] = expect.any(Function)

    expect(resultNO.current).toEqual(nb)
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
