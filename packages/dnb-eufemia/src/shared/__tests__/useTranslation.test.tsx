import React from 'react'
import { fireEvent, render, renderHook } from '@testing-library/react'
import Translation from '../Translation'
import useTranslation from '../useTranslation'
import { LOCALE as defaultLocale } from '../defaults'

import Context from '../Context'
import Provider from '../Provider'

import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'

describe('useTranslation without an ID', () => {
  it('should default to nb-NO if no locale is specified in context', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current).toEqual(
      Object.assign({}, nbNO[defaultLocale], {
        formatMessage: expect.any(Function),
      })
    )
  })

  it('should inherit locale from shared context', () => {
    const { result: resultGB } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider locale="en-GB">{children}</Provider>
      ),
    })

    expect(resultGB.current).toEqual(
      Object.assign({}, enGB['en-GB'], {
        formatMessage: expect.any(Function),
      })
    )

    const { result: resultNO } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    expect(resultNO.current).toEqual(
      Object.assign({}, nbNO['nb-NO'], {
        formatMessage: expect.any(Function),
      })
    )
  })

  it('should extend translation', () => {
    const extendedLocale = {
      DatePicker: {
        mask_placeholder: 'Custom placeholder',
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
    const extendedLocale = {
      'nb-NO': {
        DatePicker: {
          mask_placeholder: 'Custom placeholder',
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

  it('should return "formatMessage" function', () => {
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

    const result = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <Provider translations={customTranslation} locale="en-GB">
          {children}
        </Provider>
      ),
    })

    expect(result.result.current.formatMessage).toBeInstanceOf(Function)
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

describe('useTranslation with an ID', () => {
  const given_nbNO = '{foo} ({bar} av {max})'
  const given_enGB = '{foo} ({bar} of {max})'
  const given_nbNO_nested = '{foo} ({bar} av nestet {max})'
  const given_enGB_nested = '{foo} ({bar} of nested {max})'
  const expected_nbNO = 'foo (bar av max)'
  const expected_enGB = 'foo (bar of max)'
  const expected_nbNO_nested = 'foo (bar av nestet max)'
  const expected_enGB_nested = 'foo (bar of nested max)'

  describe('useTranslation', () => {
    const nbNO = {
      'Modal.close_title': 'Steng',
      'other.string': given_nbNO,
    }
    const enGB = {
      'Modal.close_title': 'Close',
      'other.string': given_enGB,
    }
    const nbNO_nested = {
      'other.string': given_nbNO_nested,
    }
    const enGB_nested = {
      'other.string': given_enGB_nested,
    }

    const defaultLocales = {
      'nb-NO': nbNO,
      'en-GB': enGB,
    }
    const nestedLocales = {
      'nb-NO': nbNO_nested,
      'en-GB': enGB_nested,
    }

    const RenderUseTranslation = () => {
      return useTranslation('other.string', {
        foo: 'foo',
        bar: 'bar',
        max: 'max',
      })
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
        expected_nbNO
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
        expected_nbNO
      )

      fireEvent.click(document.querySelector('button.en-GB'))

      expect(document.querySelector('output').textContent).toBe(
        expected_enGB
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
        expected_nbNO
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expected_nbNO_nested
      )

      fireEvent.click(document.querySelector('div.root button.en-GB'))

      expect(document.querySelector('span.root').textContent).toBe(
        expected_enGB
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expected_enGB_nested
      )

      fireEvent.click(document.querySelector('div.nested button.en-GB'))

      expect(document.querySelector('span.root').textContent).toBe(
        expected_enGB
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expected_enGB_nested
      )

      // if we change the nested locale ...
      fireEvent.click(document.querySelector('div.nested button.nb-NO'))

      // ... we also change the root
      expect(document.querySelector('span.root').textContent).toBe(
        expected_nbNO
      )
      expect(document.querySelector('span.nested').textContent).toBe(
        expected_nbNO_nested
      )
    })
  })
})
