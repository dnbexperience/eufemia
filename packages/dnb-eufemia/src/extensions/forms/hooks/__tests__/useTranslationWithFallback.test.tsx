import React from 'react'
import { renderHook } from '@testing-library/react'
import useTranslationWithFallback from '../useTranslationWithFallback'
import Provider from '../../../../shared/Provider'

describe('useTranslationWithFallback', () => {
  it('should fallback to nb-NO when current locale is empty and fallbackLocale is provided', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

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
        useTranslationWithFallback<Translation>({
          messages: customTranslations as any,
          fallbackLocale: 'nb-NO',
        }),
      {
        wrapper: ({ children }) => (
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should have the fallback translations
    expect(result.current.MyComponent.title).toBe('Norwegian title')
    expect(result.current.MyComponent.description).toBe(
      'Norwegian description'
    )

    // Should have warned about missing translations
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.any(String), // Eufemia styling prefix
      expect.stringContaining(
        'Form.useTranslation: No translations found for locale "sv-SE"!'
      )
    )

    consoleSpy.mockRestore()
  })

  it('should not apply fallback when fallbackLocale is not provided', () => {
    const customTranslations = {
      'sv-SE': {}, // Empty locale
      'nb-NO': {
        MyComponent: {
          title: 'Norwegian title',
        },
      },
    }

    type Translation = (typeof customTranslations)['nb-NO']

    const { result } = renderHook(
      () =>
        useTranslationWithFallback<Translation>({
          messages: customTranslations as any,
          fallbackLocale: null, // No fallbackLocale
        }),
      {
        wrapper: ({ children }) => (
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should not have the fallback translations
    expect(result.current.MyComponent).toBeUndefined()
  })

  it('should not apply fallback when current locale has content', () => {
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
        useTranslationWithFallback<Translation>({
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
    expect(result.current.MyComponent.title).toBe('Danish title')
    expect(result.current.MyComponent.description).toBe(
      'Danish description'
    )
  })

  it('should warn when fallback translations are used', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

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
        useTranslationWithFallback<Translation>({
          messages: customTranslations as any,
          fallbackLocale: 'nb-NO',
        }),
      {
        wrapper: ({ children }) => (
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should have the fallback translations
    expect(result.current.MyComponent.title).toBe('Norwegian title')
    expect(result.current.MyComponent.description).toBe(
      'Norwegian description'
    )

    // Should have warned about missing translations
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.any(String), // Eufemia styling prefix
      expect.stringContaining(
        'Form.useTranslation: No translations found for locale "sv-SE"!'
      )
    )

    consoleSpy.mockRestore()
  })

  it('should use context translations when messages is null and fallbackLocale is provided', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

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
        useTranslationWithFallback<Translation>({
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
    expect(result.current.MyComponent.title).toBe(
      'Context Norwegian title'
    )
    expect(result.current.MyComponent.description).toBe(
      'Context Norwegian description'
    )

    // Should have warned about empty locale
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.any(String), // Eufemia styling prefix
      expect.stringContaining(
        'Form.useTranslation: No translations found for locale "sv-SE"!'
      )
    )

    consoleSpy.mockRestore()
  })
})
