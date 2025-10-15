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

  it('should default to nb-NO if a non-existing locale is specified in context', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="non-EXISTING">{children}</Provider>
      ),
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

  it('should fallback to en-GB when en-US is requested but not available', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-US">{children}</Provider>
      ),
    })

    const gb = {}
    extendDeep(gb, forms_enGB['en-GB'], global_enGB['en-GB'])
    gb['formatMessage'] = expect.any(Function)
    gb['renderMessage'] = expect.any(Function)

    expect(result.current).toEqual(gb)
  })

  it('should fallback to en-GB when en-CA is requested but not available', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-CA">{children}</Provider>
      ),
    })

    const gb = {}
    extendDeep(gb, forms_enGB['en-GB'], global_enGB['en-GB'])
    gb['formatMessage'] = expect.any(Function)
    gb['renderMessage'] = expect.any(Function)

    expect(result.current).toEqual(gb)
  })

  it('should not fallback when en-GB is explicitly requested', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    const gb = {}
    extendDeep(gb, forms_enGB['en-GB'], global_enGB['en-GB'])
    gb['formatMessage'] = expect.any(Function)
    gb['renderMessage'] = expect.any(Function)

    expect(result.current).toEqual(gb)
  })

  describe('fallback functionality', () => {
    // Mock console.log globally to suppress warning messages during tests
    const originalConsoleLog = console.log
    beforeAll(() => {
      console.log = jest.fn()
    })

    afterEach(() => {
      // Reset the mock after each test to avoid interference between tests
      jest.clearAllMocks()
    })

    afterAll(() => {
      console.log = originalConsoleLog
    })

    it('should support fallback with new object format', () => {
      const customTranslations = {
        'sv-SE': {}, // Empty locale
        'nb-NO': {
          MyComponent: {
            title: 'Norwegian title',
            description: 'Norwegian description',
          },
        },
      }

      type Translation = (typeof customTranslations)['nb-NO']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            messages: customTranslations as any,
            fallbackLocale: 'nb-NO',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE">{children}</Provider>
          ),
        }
      )

      // Should have the fallback translations as translation keys
      expect(result.current.MyComponent.title).toBe('MyComponent.title')
      expect(result.current.MyComponent.description).toBe(
        'MyComponent.description'
      )

      // Should have warned about missing translations
      expect(console.log).toHaveBeenCalledWith(
        expect.any(String), // Eufemia styling prefix
        expect.stringContaining(
          'Form.useTranslation: No translations found for locale "sv-SE"!'
        )
      )
    })

    it('should merge missing keys from fallback when current locale has partial content', () => {
      const customTranslations = {
        'sv-SE': {
          MyComponent: {
            title: 'Swedish title',
            // description is missing
          },
        },
        'nb-NO': {
          MyComponent: {
            title: 'Norwegian title',
            description: 'Norwegian description',
          },
        },
      }

      type Translation = (typeof customTranslations)['nb-NO']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            messages: customTranslations as any,
            fallbackLocale: 'nb-NO',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE">{children}</Provider>
          ),
        }
      )

      // Should have the current locale's content for existing keys
      expect(result.current.MyComponent.title).toBe('Swedish title')
      // Should have translation key for missing keys (just the key name, not full path)
      expect(result.current.MyComponent.description).toBe('description')

      // Should have warned about missing translations
      expect(console.log).toHaveBeenCalledWith(
        expect.any(String), // Eufemia styling prefix
        expect.stringContaining(
          'Form.useTranslation: No translations found for locale "sv-SE"!'
        )
      )
    })

    it('should not apply fallback when current locale has complete content', () => {
      const customTranslations = {
        'da-DK': {
          MyComponent: {
            title: 'Danish title',
            description: 'Danish description',
          },
        },
        'nb-NO': {
          MyComponent: {
            title: 'Norwegian title',
            description: 'Norwegian description',
          },
        },
      }

      type Translation = (typeof customTranslations)['nb-NO']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            messages: customTranslations as any,
            fallbackLocale: 'nb-NO',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="da-DK">{children}</Provider>
          ),
        }
      )

      // Should only have the current locale's content, no fallback
      expect(result.current.MyComponent.title).toBe(
        customTranslations['da-DK'].MyComponent.title
      )
      expect(result.current.MyComponent.description).toBe(
        customTranslations['da-DK'].MyComponent.description
      )

      // Should not have warned about missing translations
      expect(console.log).not.toHaveBeenCalled()
    })

    it('should work with context translations and fallback', () => {
      const contextTranslations = {
        'sv-SE': {}, // Empty locale in context
        'nb-NO': {
          MyComponent: {
            title: 'Context Norwegian title',
            description: 'Context Norwegian description',
          },
        },
      }

      type Translation = (typeof contextTranslations)['nb-NO']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            fallbackLocale: 'nb-NO',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE" translations={contextTranslations}>
              {children}
            </Provider>
          ),
        }
      )

      // Should have the fallback translations from context
      expect(result.current.MyComponent.title).toBe('MyComponent.title')
      expect(result.current.MyComponent.description).toBe(
        'MyComponent.description'
      )

      // Should have warned about empty locale
      expect(console.log).toHaveBeenCalledWith(
        expect.any(String), // Eufemia styling prefix
        expect.stringContaining(
          'Form.useTranslation: No translations found for locale "sv-SE"!'
        )
      )
    })

    it('should maintain backward compatibility with old format', () => {
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
  })
})
