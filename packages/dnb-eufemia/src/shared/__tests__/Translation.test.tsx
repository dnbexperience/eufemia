import React from 'react'
import { render } from '@testing-library/react'
import Translation, { getTranslation } from '../Translation'

import Context from '../Context'
import Provider from '../Provider'

import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'

const given_nbNO = '{foo} ({bar} av {max})'
const given_enGB = '{foo} ({bar} of {max})'
const expected_nbNO = 'foo (bar av max)'

describe('Translation', () => {
  const nbNO = {
    'Modal.close_title': 'Steng',
    'other.string': given_nbNO,
  }
  const enGB = {
    'Modal.close_title': 'Close',
    'other.string': given_enGB,
  }

  const defaultLocales = {
    'nb-NO': nbNO,
    'en-GB': enGB,
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
