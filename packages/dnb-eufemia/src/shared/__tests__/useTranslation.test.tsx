/**
 * useTranslation Tests
 *
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import useTranslation, {
  getTranslation,
  Translation,
} from '../useTranslation'

import Context from '../Context'
import Provider from '../Provider'

import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'

const given_nbNO = '{foo} ({bar} av {max})'
const given_enGB = '{foo} ({bar} of {max})'
const given_nbNO_nested = '{foo} ({bar} av nestet {max})'
const given_enGB_nested = '{foo} ({bar} of nested {max})'
const expected_nbNO = 'foo (bar av max)'
const expected_enGB = 'foo (bar of max)'
const expected_nbNO_nested = 'foo (bar av nestet max)'
const expected_enGB_nested = 'foo (bar of nested max)'

describe('Translation', () => {
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

  const RenderGetTranslation = () => {
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

  it('"getTranslation" should return requested string inside render', () => {
    render(
      <Provider locales={defaultLocales}>
        <span className="getTranslation">
          {getTranslation('other.string', {
            foo: 'foo',
            bar: 'bar',
            max: 'max',
          })}
        </span>
      </Provider>
    )

    expect(document.querySelector('span.getTranslation').textContent).toBe(
      expected_nbNO
    )
  })

  it('"Translation" should return requested string inside render', () => {
    render(
      <Provider locales={defaultLocales}>
        <span className="Translation">
          <Translation id="other.string" foo="foo" bar="bar" max="max" />
        </span>

        <span className="TranslationIdAsChildren">
          <Translation foo="foo" bar="bar" max="max">
            other.string
          </Translation>
        </span>
      </Provider>
    )

    expect(document.querySelector('span.Translation').textContent).toBe(
      expected_nbNO
    )
    expect(
      document.querySelector('span.TranslationIdAsChildren').textContent
    ).toBe(expected_nbNO)
  })

  it('"useTranslation" should have valid strings inside render', () => {
    render(
      <Provider locales={defaultLocales}>
        <span className="useTranslation">
          <RenderGetTranslation />
        </span>
      </Provider>
    )

    expect(document.querySelector('span.useTranslation').textContent).toBe(
      expected_nbNO
    )
  })

  it('should change to requested locale', () => {
    render(
      <Provider locales={defaultLocales}>
        <span className="useTranslation">
          <RenderGetTranslation />
        </span>
        <ChangeLocale />
      </Provider>
    )

    expect(document.querySelector('span.useTranslation').textContent).toBe(
      expected_nbNO
    )

    fireEvent.click(document.querySelector('button.en-GB'))

    expect(document.querySelector('span.useTranslation').textContent).toBe(
      expected_enGB
    )
  })

  it('should have valid strings inside render', () => {
    render(
      <Provider locales={defaultLocales}>
        <span className="root">
          <Translation id="other.string" foo="foo" bar="bar" max="max" />
        </span>

        <Provider locales={nestedLocales}>
          <span className="nested">
            <RenderGetTranslation />
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

describe('Context.getTranslation', () => {
  nbNO['nb-NO'].HelpButton['other.string'] = given_nbNO
  enGB['en-GB'].HelpButton['other.string'] = given_enGB

  const MagicContext = (props) => {
    return (
      <Context.Consumer>
        {(context) => {
          // We may use that in future
          // if (props.translation) {
          //   context.setTranslation(props.translation)
          // }
          const title = context.getTranslation(props).HelpButton.title
          const otherString =
            context.getTranslation(props).HelpButton['other.string']
          return (
            <>
              <p className="locale">{context.locale}</p>
              <p className="title">{title}</p>
              {otherString && (
                <p className="other-string">{otherString}</p>
              )}
            </>
          )
        }}
      </Context.Consumer>
    )
  }

  it('should react on new lang prop', () => {
    const { rerender } = render(<MagicContext />)

    expect(document.querySelector('p.title').textContent).toBe(
      nbNO['nb-NO'].HelpButton.title
    )
    expect(document.querySelector('p.locale').textContent).toBe('nb-NO')

    rerender(<MagicContext lang="en-GB" />)

    expect(document.querySelector('p.title').textContent).toBe(
      enGB['en-GB'].HelpButton.title
    )

    // locale should not be changed
    expect(document.querySelector('p.locale').textContent).not.toBe(
      'en-GB'
    )
    expect(document.querySelector('p.locale').textContent).toBe('nb-NO')
  })

  it('should react on new lang prop and prepare other.string', () => {
    const { rerender } = render(<MagicContext />)

    expect(document.querySelector('p.other-string').textContent).toBe(
      given_nbNO
    )

    rerender(<MagicContext lang="en-GB" />)

    expect(document.querySelector('p.other-string').textContent).toBe(
      given_enGB
    )
  })
})
