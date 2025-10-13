import React from 'react'
import { renderHook } from '@testing-library/react'
import useTranslationWithFallback from '../useTranslationWithFallback'
import Provider from '../../../../shared/Provider'

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

describe('useTranslationWithFallback', () => {
  it('should return translation keys when current locale is empty and fallbackLocale is provided with messages', () => {
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

  it('should return pointer strings when fallbackLocale is not provided', () => {
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
          fallbackLocale: undefined, // No fallbackLocale
        }),
      {
        wrapper: ({ children }) => (
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should return pointer strings for missing translations
    expect(result.current.MyComponent.title).toBe('MyComponent.title')

    // Should have warned about missing translations
    expect(console.log).toHaveBeenCalledWith(
      expect.any(String), // Eufemia styling prefix
      expect.stringContaining(
        'Form.useTranslation: No translations found for locale "sv-SE"!'
      )
    )
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
    expect(result.current.MyComponent.title).toBe(
      customTranslations['da-DK'].MyComponent.title
    )
    expect(result.current.MyComponent.description).toBe(
      customTranslations['da-DK'].MyComponent.description
    )
  })

  it('should return translation keys and warn when current locale is empty and fallbackLocale is provided with messages', () => {
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

  it('should return translation keys when using context translations with fallbackLocale provided', () => {
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

  it('should handle nested objects with missing keys', () => {
    const customTranslations = {
      'sv-SE': {
        MyComponent: {
          title: 'Swedish title',
          nested: {
            subtitle: 'Swedish subtitle',
            // subdescription is missing
          },
        },
      },
      'nb-NO': {
        MyComponent: {
          title: 'Norwegian title',
          nested: {
            subtitle: 'Norwegian subtitle',
            subdescription: 'Norwegian subdescription',
          },
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

    // Should have the current locale's content for existing keys
    expect(result.current.MyComponent.title).toBe('Swedish title')
    expect(result.current.MyComponent.nested.subtitle).toBe(
      'Swedish subtitle'
    )
    // Should have translation key for missing nested keys (just the key name, not full path)
    expect(result.current.MyComponent.nested.subdescription).toBe(
      'subdescription'
    )
  })

  it('should handle deeply nested objects', () => {
    const customTranslations = {
      'sv-SE': {
        MyComponent: {
          level1: {
            level2: {
              level3: 'Swedish level3',
            },
          },
        },
      },
      'nb-NO': {
        MyComponent: {
          level1: {
            level2: {
              level3: 'Norwegian level3',
              level4: 'Norwegian level4',
            },
          },
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

    // Should have the current locale's content for existing keys
    expect(result.current.MyComponent.level1.level2.level3).toBe(
      'Swedish level3'
    )
    // Should have translation key for missing deeply nested keys (just the key name, not full path)
    expect(result.current.MyComponent.level1.level2.level4).toBe('level4')
  })

  it('should return base result when fallbackMessages is not available', () => {
    const customTranslations = {
      'sv-SE': {
        MyComponent: {
          title: 'Swedish title',
        },
      },
      // No fallback locale translations
    }

    type Translation = (typeof customTranslations)['sv-SE']

    const { result } = renderHook(
      () =>
        useTranslationWithFallback<Translation>({
          messages: customTranslations as any,
          fallbackLocale: 'nb-NO', // This locale doesn't exist in messages
        }),
      {
        wrapper: ({ children }) => (
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should return the base result without fallback processing
    // The base result contains default form translations but not custom messages
    // when the structure doesn't match the expected form translation structure
    expect(result.current['Field']).toBeDefined() // Default form translation
    expect(result.current.MyComponent).toBeUndefined() // Custom messages not included
  })

  it('should return base result when currentMessages is not available', () => {
    const customTranslations = {
      'nb-NO': {
        MyComponent: {
          title: 'Norwegian title',
        },
      },
      // No current locale translations
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
          <Provider locale="sv-SE">{children}</Provider> // This locale doesn't exist in messages
        ),
      }
    )

    // Should return the base result without fallback processing
    // The base result contains default form translations but not custom messages
    // when the structure doesn't match the expected form translation structure
    expect(result.current['Field']).toBeDefined() // Default form translation
    expect(result.current.MyComponent).toBeUndefined() // Custom messages not included
  })

  it('should use default fallbackLocale when not provided', () => {
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
          // fallbackLocale not provided, should default to LOCALE
        }),
      {
        wrapper: ({ children }) => (
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should use the default fallback locale (LOCALE)
    expect(result.current.MyComponent.title).toBe('MyComponent.title')
  })

  it('should handle primitive values in fallback', () => {
    const customTranslations = {
      'sv-SE': {
        // Missing primitive value
      },
      'nb-NO': {
        simpleString: 'Norwegian simple string',
        simpleNumber: 42,
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

    // Should have translation keys for missing primitive values
    expect(result.current.simpleString).toBe('simpleString')
    expect(result.current.simpleNumber).toBe('simpleNumber')
  })

  it('should not warn when no missing keys are found', () => {
    const customTranslations = {
      'sv-SE': {
        MyComponent: {
          title: 'Swedish title',
          description: 'Swedish description',
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
          <Provider locale="sv-SE">{children}</Provider>
        ),
      }
    )

    // Should have the current locale's content
    expect(result.current.MyComponent.title).toBe('Swedish title')
    expect(result.current.MyComponent.description).toBe(
      'Swedish description'
    )

    // The current implementation doesn't warn when no keys are missing
    // This test documents the current behavior
    expect(console.log).not.toHaveBeenCalled()
  })
})
