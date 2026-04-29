import React from 'react'
import { fireEvent, render, renderHook } from '@testing-library/react'
import Translation from '../Translation'
import useTranslation from '../useTranslation'
import { LOCALE as defaultLocale } from '../defaults'
import { icu } from '../icuFormatMessage'

import Context from '../Context'
import Provider from '../Provider'

import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'

describe('useTranslation without an ID', () => {
  it('should default to nb-NO if no locale is specified in context', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current).toEqual(
      Object.assign({}, nbNO[defaultLocale], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    expect(resultGB.current).toEqual(
      Object.assign({}, enGB['en-GB'], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )

    const { result: resultNO } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    expect(resultNO.current).toEqual(
      Object.assign({}, nbNO['nb-NO'], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )
  })

  it('should default to nb-NO if a non-existing locale is specified in context', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="non-EXISTING">{children}</Provider>
      ),
    })

    expect(result.current).toEqual(
      Object.assign({}, nbNO['nb-NO'], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )
  })

  it('should extend translation', () => {
    const extendedLocale = {
      DatePicker: {
        my_key: 'Custom placeholder',
      },
    }

    const { result } = renderHook(() => useTranslation(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.DatePicker).toMatchObject(
      extendedLocale.DatePicker
    )
  })

  it('should extend translation inside locale key', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    const extendedLocale = {
      'nb-NO': {
        DatePicker: {
          my_key: 'Custom placeholder',
        },
      },
    }

    const { result } = renderHook(() => useTranslation(extendedLocale), {
      wrapper: Provider,
    })

    expect(result.current.DatePicker).toMatchObject(
      extendedLocale['nb-NO'].DatePicker
    )

    const { result: resultGB } = renderHook(
      () => useTranslation(extendedLocale),
      {
        wrapper: ({ children }) => (
          <Provider locale="en-GB">{children}</Provider>
        ),
      }
    )

    expect(resultGB.current.DatePicker).not.toMatchObject(
      extendedLocale['nb-NO'].DatePicker
    )

    expect(console.log).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining(
        'useTranslation: No translations found for locale "en-GB"!'
      )
    )

    spy.mockRestore()
  })

  it('should support custom translation strings', () => {
    const customTranslation = {
      'en-GB': {
        myString: 'Custom string',
        myGroup: {
          subString: 'Second string',
        },
      },
      'nb-NO': {
        myString: 'Tilpasset streng',
        myGroup: {
          subString: 'Ny streng',
        },
      },
    }

    type CustomLocales = keyof typeof customTranslation
    type CustomTranslation = (typeof customTranslation)[CustomLocales]

    function MyComponent() {
      const { myString, myGroup } = useTranslation<CustomTranslation>()
      return (
        <p>
          {myString} {myGroup.subString}
        </p>
      )
    }

    const { rerender } = render(
      <Provider translations={customTranslation} locale="en-GB">
        <MyComponent />
      </Provider>
    )

    expect(document.querySelector('p')).toHaveTextContent(
      'Custom string Second string'
    )

    rerender(
      <Provider translations={customTranslation} locale="nb-NO">
        <MyComponent />
      </Provider>
    )

    expect(document.querySelector('p')).toHaveTextContent(
      'Tilpasset streng Ny streng'
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

    it('should have the same instance after rerendering', () => {
      const { result, rerender } = renderHook(useTranslation, {
        wrapper: ({ children }) => <Provider>{children}</Provider>,
      })

      const firstInstance = result.current.formatMessage
      rerender()
      expect(result.current.formatMessage).toBe(firstInstance)
    })

    it('should return translation', () => {
      const { result } = renderHook(useTranslation)

      expect(result.current.formatMessage).toBeInstanceOf(Function)
      expect(result.current.formatMessage('Modal.closeTitle')).toBe(
        nbNO['nb-NO'].Modal.closeTitle
      )
    })

    it('should return translation for given locale', () => {
      const { result } = renderHook(useTranslation, {
        wrapper: ({ children }) => (
          <Provider locale="en-GB">{children}</Provider>
        ),
      })

      expect(result.current.formatMessage('Modal.closeTitle')).toBe(
        enGB['en-GB'].Modal.closeTitle
      )
    })

    it('should return translation when switching locale', () => {
      const MockComponent = () => {
        const { formatMessage } = useTranslation()
        return <>{formatMessage('Modal.closeTitle')}</>
      }

      const { rerender } = render(
        <Provider locale="nb-NO">
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        nbNO['nb-NO'].Modal.closeTitle
      )

      rerender(
        <Provider locale="en-GB">
          <MockComponent />
        </Provider>
      )
      expect(document.body.textContent).toBe(
        enGB['en-GB'].Modal.closeTitle
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

    it('should support nested translations', () => {
      const customTranslation = {
        'en-GB': {
          myString: 'Custom string',
          myGroup: {
            subString: 'Second string',
            stringWithArg: 'Second string {arg}',
          },
        },
        'nb-NO': {
          myString: 'Tilpasset streng',
          myGroup: {
            subString: 'Ny streng',
            stringWithArg: 'Ny streng {arg}',
          },
        },
      }

      type Translation =
        (typeof customTranslation)[keyof typeof customTranslation]
      const result = renderHook(
        () => {
          return useTranslation<Translation>()
        },
        {
          wrapper: ({ children }) => (
            <Provider translations={customTranslation} locale="en-GB">
              {children}
            </Provider>
          ),
        }
      )

      expect(result.result.current.myGroup.stringWithArg).toBe(
        'Second string {arg}'
      )
      expect(
        result.result.current.formatMessage('myGroup.stringWithArg', {
          arg: 'dynamic-value',
        })
      ).toBe('Second string dynamic-value')
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

    // @ts-expect-error - Testing that non-existent key returns undefined
    expect(result.current.my.foo).toBeUndefined()
  })
})

describe('useTranslation with an ID', () => {
  const givenNbNO = '{foo} ({bar} av {max})'
  const givenEnGB = '{foo} ({bar} of {max})'
  const givenNbNONested = '{foo} ({bar} av nestet {max})'
  const givenEnGBNested = '{foo} ({bar} of nested {max})'
  const expectedNbNO = 'foo (bar av max)'
  const expectedEnGB = 'foo (bar of max)'
  const expectedNbNONested = 'foo (bar av nestet max)'
  const expectedEnGBNested = 'foo (bar of nested max)'

  describe('useTranslation', () => {
    const nbNO = {
      'Modal.closeTitle': 'Steng',
      'other.string': givenNbNO,
    }
    const enGB = {
      'Modal.closeTitle': 'Close',
      'other.string': givenEnGB,
    }
    const nbNONested = {
      'other.string': givenNbNONested,
    }
    const enGBNested = {
      'other.string': givenEnGBNested,
    }

    const defaultLocales = {
      'nb-NO': nbNO,
      'en-GB': enGB,
    }
    const nestedLocales = {
      'nb-NO': nbNONested,
      'en-GB': enGBNested,
    }

    const RenderUseTranslation = () => {
      const str = useTranslation('other.string', {
        foo: 'foo',
        bar: 'bar',
        max: 'max',
      })
      return <>{str}</>
    }

    const ChangeLocale = (props) => {
      const { setLocale } = React.useContext(Context)

      return (
        <div {...props}>
          <button
            className="nb-NO"
            onClick={() => {
              setLocale('nb-NO')
            }}
          >
            nb-NO
          </button>
          <button
            className="en-GB"
            onClick={() => {
              setLocale('en-GB')
            }}
          >
            en-GB
          </button>
        </div>
      )
    }

    it('"useTranslation" should have valid strings inside render', () => {
      render(
        <Provider translations={defaultLocales}>
          <output>
            <RenderUseTranslation />
          </output>
        </Provider>
      )

      expect(document.querySelector('output').textContent).toBe(
        expectedNbNO
      )
    })

    it('should change to requested locale', () => {
      render(
        <Provider translations={defaultLocales}>
          <output>
            <RenderUseTranslation />
          </output>
          <ChangeLocale />
        </Provider>
      )

      expect(document.querySelector('output').textContent).toBe(
        expectedNbNO
      )

      fireEvent.click(document.querySelector('button.en-GB'))

      expect(document.querySelector('output').textContent).toBe(
        expectedEnGB
      )
    })

    it('should have valid strings inside render', () => {
      render(
        <Provider translations={defaultLocales}>
          <span className="root">
            <Translation id="other.string" foo="foo" bar="bar" max="max" />
          </span>

          <Provider translations={nestedLocales}>
            <span className="nested">
              <RenderUseTranslation />
            </span>

            <ChangeLocale className="nested" />
          </Provider>

          <ChangeLocale className="root" />
        </Provider>
      )

      expect(document.querySelector('span.root').textContent).toBe(
        expectedNbNO
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expectedNbNONested
      )

      fireEvent.click(document.querySelector('div.root button.en-GB'))

      expect(document.querySelector('span.root').textContent).toBe(
        expectedEnGB
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expectedEnGBNested
      )

      fireEvent.click(document.querySelector('div.nested button.en-GB'))

      expect(document.querySelector('span.root').textContent).toBe(
        expectedEnGB
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expectedEnGBNested
      )

      // if we change the nested locale ...
      fireEvent.click(document.querySelector('div.nested button.nb-NO'))

      // ... we also change the root
      expect(document.querySelector('span.root').textContent).toBe(
        expectedNbNO
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expectedNbNONested
      )
    })
  })

  describe('renderMessage', () => {
    it('should have the same instance after rerendering', () => {
      const { result, rerender } = renderHook(useTranslation, {
        wrapper: ({ children }) => <Provider>{children}</Provider>,
      })

      const firstInstance = result.current.renderMessage
      rerender()
      expect(result.current.renderMessage).toBe(firstInstance)
    })

    it('should render with JSX line-breaks', () => {
      const { result } = renderHook(useTranslation)

      expect(result.current.renderMessage('Hello{br}World')).toEqual([
        <React.Fragment key="0">
          Hello
          <br />
        </React.Fragment>,
        <React.Fragment key="1">
          World
          <br />
        </React.Fragment>,
      ])
    })

    it('should support multiple line-breaks', () => {
      const { result } = renderHook(useTranslation)

      expect(result.current.renderMessage('A{br}B{br}C')).toEqual([
        <React.Fragment key="0">
          A
          <br />
        </React.Fragment>,
        <React.Fragment key="1">
          B
          <br />
        </React.Fragment>,
        <React.Fragment key="2">
          C
          <br />
        </React.Fragment>,
      ])
    })
  })

  describe('fallback functionality', () => {
    let consoleSpy: jest.SpyInstance
    beforeAll(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => {
      consoleSpy.mockClear()
    })
    afterAll(() => {
      consoleSpy.mockRestore()
    })

    it('should support fallback with new object format', () => {
      const customTranslations = {
        'sv-SE': {}, // Empty locale
        'en-GB': {
          MyComponent: {
            title: 'English title',
            description: 'English description',
          },
        },
      }

      type Translation = (typeof customTranslations)['en-GB']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            messages: customTranslations,
            fallbackLocale: 'en-GB',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE">{children}</Provider>
          ),
        }
      )

      expect(result.current.MyComponent.title).toBe('MyComponent.title')
      expect(result.current.MyComponent.description).toBe(
        'MyComponent.description'
      )

      expect(console.log).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(
          'useTranslation: No translations found for locale "sv-SE"!'
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
        'en-GB': {
          MyComponent: {
            title: 'English title',
            description: 'English description',
          },
        },
      }

      type Translation = (typeof customTranslations)['en-GB']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            messages: customTranslations,
            fallbackLocale: 'en-GB',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE">{children}</Provider>
          ),
        }
      )

      expect(result.current.MyComponent.title).toBe('Swedish title')
      expect(result.current.MyComponent.description).toBe('description')

      expect(console.log).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(
          'useTranslation: No translations found for locale "sv-SE"!'
        )
      )
    })

    it('should not apply fallback when current locale has complete content', () => {
      const customTranslations = {
        'sv-SE': {
          MyComponent: {
            title: 'Swedish title',
            description: 'Swedish description',
          },
        },
        'en-GB': {
          MyComponent: {
            title: 'English title',
            description: 'English description',
          },
        },
      }

      type Translation = (typeof customTranslations)['en-GB']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            messages: customTranslations,
            fallbackLocale: 'en-GB',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE">{children}</Provider>
          ),
        }
      )

      expect(result.current.MyComponent.title).toBe('Swedish title')
      expect(result.current.MyComponent.description).toBe(
        'Swedish description'
      )

      expect(console.log).not.toHaveBeenCalled()
    })

    it('should work with context translations and fallback', () => {
      const contextTranslations = {
        'sv-SE': {},
        'en-GB': {
          MyComponent: {
            title: 'English title',
            description: 'English description',
          },
        },
      }

      type Translation = (typeof contextTranslations)['en-GB']

      const { result } = renderHook(
        () =>
          useTranslation<Translation>({
            fallbackLocale: 'en-GB',
          }),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE" translations={contextTranslations}>
              {children}
            </Provider>
          ),
        }
      )

      expect(result.current.MyComponent.title).toBe('MyComponent.title')
      expect(result.current.MyComponent.description).toBe(
        'MyComponent.description'
      )

      expect(console.log).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(
          'useTranslation: No translations found for locale "sv-SE"!'
        )
      )
    })

    it('should support fallback with default signature (messages only)', () => {
      const customTranslations = {
        'sv-SE': {}, // Empty locale
        'nb-NO': {
          MyComponent: {
            title: 'Norwegian title',
            description: 'Norwegian description',
          },
        },
      }

      // @ts-expect-error - Testing type inference with custom translation object
      type Translation = (typeof customTranslations)['en-GB']

      const { result } = renderHook(
        () => useTranslation<Translation>(customTranslations),
        {
          wrapper: ({ children }) => (
            <Provider locale="sv-SE">{children}</Provider>
          ),
        }
      )

      expect(result.current.MyComponent.title).toBe('MyComponent.title')
      expect(result.current.MyComponent.description).toBe(
        'MyComponent.description'
      )

      expect(console.log).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(
          'useTranslation: No translations found for locale "sv-SE"!'
        )
      )
    })
  })

  it('should return translation with an identifier', () => {
    const { result } = renderHook(
      () => useTranslation('Modal.closeTitle'),
      {
        wrapper: ({ children }) => <Provider>{children}</Provider>,
      }
    )

    expect(result.current).toEqual(nbNO['nb-NO'].Modal.closeTitle)
  })

  it('should fallback to en-GB when en-US is requested but not available', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-US">{children}</Provider>
      ),
    })

    expect(result.current).toEqual(
      Object.assign({}, enGB['en-GB'], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )
  })

  it('should fallback to en-GB when en-CA is requested but not available', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-CA">{children}</Provider>
      ),
    })

    expect(result.current).toEqual(
      Object.assign({}, enGB['en-GB'], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )
  })

  it('should not fallback when en-GB is explicitly requested', () => {
    const { result } = renderHook(useTranslation, {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    expect(result.current).toEqual(
      Object.assign({}, enGB['en-GB'], {
        formatMessage: expect.any(Function),
        renderMessage: expect.any(Function),
      })
    )
  })
})

describe('ICU MessageFormat support', () => {
  describe('formatMessage with ICU syntax', () => {
    it('should format plural messages', () => {
      const translations = {
        'en-GB': {
          Custom: {
            items:
              'You have {count, plural, one {# item} other {# items}}.',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <>
            <span data-testid="one">
              {formatMessage('Custom.items', { count: 1 })}
            </span>
            <span data-testid="many">
              {formatMessage('Custom.items', { count: 5 })}
            </span>
          </>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(
        document.querySelector('[data-testid="one"]').textContent
      ).toBe('You have 1 item.')
      expect(
        document.querySelector('[data-testid="many"]').textContent
      ).toBe('You have 5 items.')
    })

    it('should format select messages', () => {
      const translations = {
        'en-GB': {
          Custom: {
            greeting:
              '{gender, select, male {He} female {She} other {They}} liked this.',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <>
            <span data-testid="male">
              {formatMessage('Custom.greeting', { gender: 'male' })}
            </span>
            <span data-testid="other">
              {formatMessage('Custom.greeting', { gender: 'unknown' })}
            </span>
          </>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(
        document.querySelector('[data-testid="male"]').textContent
      ).toBe('He liked this.')
      expect(
        document.querySelector('[data-testid="other"]').textContent
      ).toBe('They liked this.')
    })

    it('should use locale-specific plural rules when switching locale', () => {
      const translations = {
        'en-GB': {
          Custom: {
            items: '{count, plural, one {# item} other {# items}}',
          },
        },
        'nb-NO': {
          Custom: {
            items: '{count, plural, one {# element} other {# elementer}}',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span data-testid="result">
            {formatMessage('Custom.items', { count: 1 })}
          </span>
        )
      }

      const { rerender } = render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(
        document.querySelector('[data-testid="result"]').textContent
      ).toBe('1 item')

      rerender(
        <Provider icu={icu} locale="nb-NO" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(
        document.querySelector('[data-testid="result"]').textContent
      ).toBe('1 element')
    })

    it('should still support simple {placeholder} syntax', () => {
      const translations = {
        'en-GB': {
          Custom: {
            greeting: 'Hello {name}, welcome to {place}!',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.greeting', {
              name: 'Alice',
              place: 'Eufemia',
            })}
          </span>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.body.textContent).toBe(
        'Hello Alice, welcome to Eufemia!'
      )
    })

    it('should format plural with =0 exact match', () => {
      const translations = {
        'en-GB': {
          Custom: {
            items:
              '{count, plural, =0 {No items} one {# item} other {# items}}',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return <span>{formatMessage('Custom.items', { count: 0 })}</span>
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.body.textContent).toBe('No items')
    })
  })

  describe('Translation component with ICU syntax', () => {
    it('should render plural messages via Translation component', () => {
      const translations = {
        'en-GB': {
          Custom: {
            items:
              'You have {count, plural, one {# item} other {# items}}.',
          },
        },
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <Translation id="Custom.items" count={3} />
        </Provider>
      )

      expect(document.body.textContent).toBe('You have 3 items.')
    })

    it('should render select messages via Translation component', () => {
      const translations = {
        'en-GB': {
          Custom: {
            pronoun:
              '{gender, select, male {He} female {She} other {They}}',
          },
        },
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <Translation id="Custom.pronoun" gender="female" />
        </Provider>
      )

      expect(document.body.textContent).toBe('She')
    })
  })

  describe('number formatting with ICU', () => {
    it('should format currency via number skeleton', () => {
      const translations = {
        'en-GB': {
          Custom: {
            balance: 'Balance: {amount, number, ::currency/NOK}',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>{formatMessage('Custom.balance', { amount: 1234 })}</span>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      const text = document.body.textContent
      expect(text).toMatch(/NOK|kr/)
      expect(text).toContain('1,234')
    })

    it('should format compact numbers', () => {
      const translations = {
        'en-GB': {
          Custom: {
            followers: '{count, number, ::compact-short} followers',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>{formatMessage('Custom.followers', { count: 1500 })}</span>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.body.textContent).toMatch(/1\.?5K followers/i)
    })
  })

  describe('date and time formatting with ICU', () => {
    it('should format date with style', () => {
      const translations = {
        'en-GB': {
          Custom: {
            created: 'Created: {d, date, long}',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.created', {
              d: new Date(2025, 0, 15),
            })}
          </span>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      const text = document.body.textContent
      expect(text).toContain('January')
      expect(text).toContain('2025')
    })

    it('should format time with style', () => {
      const translations = {
        'en-GB': {
          Custom: {
            event: 'Starts at {t, time, short}',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.event', {
              t: new Date(2025, 0, 15, 14, 30),
            })}
          </span>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      const text = document.body.textContent
      expect(text).toContain('14')
      expect(text).toContain('30')
    })
  })
})

describe('Rich text tag rendering', () => {
  describe('formatMessage with XML-like tags', () => {
    it('should render a tag with a function handler', () => {
      const translations = {
        'nb-NO': {
          Custom: {
            info: 'Les mer i <link>dokumentasjonen</link>.',
          },
        },
      }
      type T = (typeof translations)['nb-NO']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.info', {
              link: (chunks) => <a href="/docs">{chunks}</a>,
            })}
          </span>
        )
      }

      render(
        <Provider translations={translations}>
          <MockComponent />
        </Provider>
      )

      const anchor = document.querySelector('a')
      expect(anchor).toBeTruthy()
      expect(anchor.textContent).toBe('dokumentasjonen')
      expect(anchor.getAttribute('href')).toBe('/docs')
      expect(document.body.textContent).toBe('Les mer i dokumentasjonen.')
    })

    it('should render multiple tags', () => {
      const translations = {
        'nb-NO': {
          Custom: {
            info: '<bold>Viktig:</bold> Se <link>lenken</link> for detaljer.',
          },
        },
      }
      type T = (typeof translations)['nb-NO']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.info', {
              bold: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => <a href="/link">{chunks}</a>,
            })}
          </span>
        )
      }

      render(
        <Provider translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.querySelector('strong').textContent).toBe('Viktig:')
      expect(document.querySelector('a').textContent).toBe('lenken')
      expect(document.body.textContent).toBe(
        'Viktig: Se lenken for detaljer.'
      )
    })

    it('should combine simple placeholders with tag handlers', () => {
      const translations = {
        'nb-NO': {
          Custom: {
            info: 'Hei {name}, les mer i <link>dokumentasjonen</link>.',
          },
        },
      }
      type T = (typeof translations)['nb-NO']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.info', {
              name: 'Ola',
              link: (chunks) => <a href="/docs">{chunks}</a>,
            })}
          </span>
        )
      }

      render(
        <Provider translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.body.textContent).toBe(
        'Hei Ola, les mer i dokumentasjonen.'
      )
      expect(document.querySelector('a').textContent).toBe(
        'dokumentasjonen'
      )
    })

    it('should return plain string when no tags match', () => {
      const translations = {
        'nb-NO': {
          Custom: {
            info: 'Ingen tagger her.',
          },
        },
      }
      type T = (typeof translations)['nb-NO']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.info', {
              link: (chunks) => <a>{chunks}</a>,
            })}
          </span>
        )
      }

      render(
        <Provider translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.body.textContent).toBe('Ingen tagger her.')
      expect(document.querySelector('a')).toBeNull()
    })
  })

  describe('Translation component with XML-like tags', () => {
    it('should render tags via the Translation component', () => {
      const translations = {
        'nb-NO': {
          Custom: {
            info: 'Du kan lese mer i <link>dokumentasjonen</link>.',
          },
        },
      }

      render(
        <Provider translations={translations}>
          <Translation
            id="Custom.info"
            link={(chunks) => <a href="/docs">{chunks}</a>}
          />
        </Provider>
      )

      const anchor = document.querySelector('a')
      expect(anchor).toBeTruthy()
      expect(anchor.textContent).toBe('dokumentasjonen')
      expect(document.body.textContent).toBe(
        'Du kan lese mer i dokumentasjonen.'
      )
    })
  })

  describe('ICU with XML-like tags', () => {
    it('should handle tags in ICU messages', () => {
      const translations = {
        'en-GB': {
          Custom: {
            items:
              'You have {count, plural, one {# item} other {# items}}. <link>View cart</link>',
          },
        },
      }
      type T = (typeof translations)['en-GB']

      const MockComponent = () => {
        const { formatMessage } = useTranslation<T>()
        return (
          <span>
            {formatMessage('Custom.items', {
              count: 3,
              link: (chunks) => <a href="/cart">{chunks}</a>,
            })}
          </span>
        )
      }

      render(
        <Provider icu={icu} locale="en-GB" translations={translations}>
          <MockComponent />
        </Provider>
      )

      expect(document.body.textContent).toBe('You have 3 items. View cart')
      expect(document.querySelector('a').textContent).toBe('View cart')
      expect(document.querySelector('a').getAttribute('href')).toBe(
        '/cart'
      )
    })
  })
})
