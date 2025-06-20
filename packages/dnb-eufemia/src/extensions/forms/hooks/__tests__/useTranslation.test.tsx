/**
 * Form.useTranslation Tests
 *
 */

import React from 'react'
import { render, renderHook } from '@testing-library/react'
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
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    const nb = {}
    extendDeep(nb, forms_nbNO['nb-NO'], global_nbNO['nb-NO'])
    nb['formatMessage'] = expect.any(Function)
    nb['renderMessage'] = expect.any(Function)

    expect(result.current).toEqual(nb)
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    const gb = {}
    extendDeep(gb, forms_enGB['en-GB'], global_enGB['en-GB'])
    gb['formatMessage'] = expect.any(Function)
    gb['renderMessage'] = expect.any(Function)

    expect(resultGB.current).toEqual(gb)

    const { result: resultNO } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    const nb = {}
    extendDeep(nb, forms_nbNO['nb-NO'], global_nbNO['nb-NO'])
    nb['formatMessage'] = expect.any(Function)
    nb['renderMessage'] = expect.any(Function)

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

  describe('formatMessage', () => {
    const myTranslations = {
      'nb-NO': {
        Custom: {
          translation: 'My translation with a {myKey}',
        },
      },
      'en-GB': {
        Custom: {
          translation: 'My translation with a {myKey}',
        },
      },
    }
    type Translation = (typeof myTranslations)[keyof typeof myTranslations]

    it('should return translation', () => {
      const { result } = renderHook(useTranslation)

      expect(result.current.formatMessage('Field.errorRequired')).toBe(
        forms_nbNO['nb-NO'].Field.errorRequired
      )
    })

    it('should return translation for given locale', () => {
      const { result } = renderHook(useTranslation, {
        wrapper: ({ children }) => (
          <Provider locale="en-GB">{children}</Provider>
        ),
      })

      expect(result.current.formatMessage('Field.errorRequired')).toBe(
        forms_enGB['en-GB'].Field.errorRequired
      )
    })

    it('should return translation when switching locale', () => {
      const MockComponent = () => {
        const { formatMessage } = useTranslation()
        return <>{formatMessage('Field.errorRequired')}</>
      }

      const { rerender } = render(
        <Provider locale="nb-NO">
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        forms_nbNO['nb-NO'].Field.errorRequired
      )

      rerender(
        <Provider locale="en-GB">
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        forms_enGB['en-GB'].Field.errorRequired
      )
    })

    it('should support custom translation when switching locale', () => {
      const MockComponent = () => {
        const { formatMessage } = useTranslation<Translation>()
        return (
          <>
            {formatMessage('Custom.translation', {
              myKey: 'value!',
            })}
          </>
        )
      }

      const { rerender } = render(
        <Provider locale="nb-NO" translations={myTranslations}>
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        myTranslations['nb-NO'].Custom.translation.replace(
          '{myKey}',
          'value!'
        )
      )

      rerender(
        <Provider locale="en-GB" translations={myTranslations}>
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        myTranslations['en-GB'].Custom.translation.replace(
          '{myKey}',
          'value!'
        )
      )
    })

    it('should support custom translation object when switching locale', () => {
      const MockComponent = () => {
        const { formatMessage, Custom } = useTranslation<Translation>()
        return (
          <>
            {formatMessage(Custom.translation, {
              myKey: 'value!',
            })}
          </>
        )
      }

      const { rerender } = render(
        <Provider locale="nb-NO" translations={myTranslations}>
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        myTranslations['nb-NO'].Custom.translation.replace(
          '{myKey}',
          'value!'
        )
      )

      rerender(
        <Provider locale="en-GB" translations={myTranslations}>
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        myTranslations['en-GB'].Custom.translation.replace(
          '{myKey}',
          'value!'
        )
      )
    })
  })

  it('should support typing for flat translations', () => {
    const translations = {
      'nb-NO': {
        'my.string': 'Min streng',
      },
      'en-GB': {
        'my.string': 'My string',
      },
    }

    type Translation = (typeof translations)[keyof typeof translations]

    const { result } = renderHook(
      () => {
        return useTranslation<Translation>()
      },
      {
        wrapper: (props) => (
          <Provider {...props} translations={translations} />
        ),
      }
    )

    expect(result.current.my.string).toBe('Min streng')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(result.current.my.foo).toBeUndefined()
  })

  it('should not support an identifier', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { result } = renderHook(() => useTranslation('Email.label'))

    const nb = {}
    extendDeep(nb, forms_nbNO['nb-NO'], global_nbNO['nb-NO'])
    nb['formatMessage'] = expect.any(Function)
    nb['renderMessage'] = expect.any(Function)

    expect(result.current).toEqual(expect.objectContaining(nb))
  })
})
