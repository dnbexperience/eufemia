import React from 'react'
import { render } from '@testing-library/react'
import Translation, { mergeTranslations } from '../Translation'

import Context from '../Context'
import Provider from '../Provider'

import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'

const given_nbNO = '{foo} ({bar} av {max})'
const given_enGB = '{foo} ({bar} of {max})'
const expected_nbNO = 'foo (bar av max)'

describe('flatten translations', () => {
  const nbNO = {
    'Modal.close_title': 'Steng',
    'other.string': given_nbNO,
  }
  const enGB = {
    'Modal.close_title': 'Close',
    'other.string': given_enGB,
  }
  const translations = {
    'nb-NO': nbNO,
    'en-GB': enGB,
  }

  it('should return requested string inside render', () => {
    render(
      <Provider translations={translations}>
        <output className="Translation">
          <Translation id="other.string" foo="foo" bar="bar" max="max" />
        </output>

        <output className="TranslationIdAsChildren">
          <Translation foo="foo" bar="bar" max="max">
            other.string
          </Translation>
        </output>
      </Provider>
    )

    expect(document.querySelector('.Translation').textContent).toBe(
      expected_nbNO
    )
    expect(
      document.querySelector('.TranslationIdAsChildren').textContent
    ).toBe(expected_nbNO)
  })

  it('should return given id if nothing found', () => {
    const id = 'invalid.id'
    render(
      <Provider translations={translations}>
        <output className="invalid">
          <Translation id={id} />
        </output>
      </Provider>
    )

    expect(document.querySelector('.invalid').textContent).toBe(id)
  })
})

describe('context.getTranslation', () => {
  const MagicContext = (props) => {
    return (
      <Context.Consumer>
        {(context) => {
          const title = context.getTranslation(props).HelpButton.title
          const otherString =
            context.getTranslation(props).HelpButton?.['other']?.string
          return (
            <>
              <p className="locale">{context.locale}</p>
              <p className="title">{title}</p>
              <p className="other-string">{otherString}</p>
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

  it('should react on new lang prop and return other.string', () => {
    const nbNO = {
      'Modal.close_title': 'Steng',
      'HelpButton.other.string': given_nbNO,
    }
    const enGB = {
      'Modal.close_title': 'Close',
      'HelpButton.other.string': given_enGB,
    }
    const translations = {
      'nb-NO': nbNO,
      'en-GB': enGB,
    }

    const { rerender } = render(
      <Provider translations={translations}>
        <MagicContext />
      </Provider>
    )

    expect(document.querySelector('p.other-string').textContent).toBe(
      given_nbNO
    )

    rerender(
      <Provider translations={translations}>
        <MagicContext lang="en-GB" />
      </Provider>
    )

    expect(document.querySelector('p.other-string').textContent).toBe(
      given_enGB
    )
  })
})

describe('Translation', () => {
  it('should support translations as a function', () => {
    const translations = {
      'nb-NO': { my: { string: 'streng {foo}' } },
      'en-GB': { my: { string: 'string {foo}' } },
    }
    type TranslationType = (typeof translations)[keyof typeof translations]

    const { rerender } = render(
      <Provider translations={translations}>
        <Translation<TranslationType> id={(t) => t.my.string} foo="bar" />
      </Provider>
    )

    expect(document.body.textContent).toBe('streng bar')

    rerender(
      <Provider locale="en-GB" translations={translations}>
        <Translation<TranslationType>
          id={(t) => t.my.string}
          foo={() => 'baz'}
        />
      </Provider>
    )

    expect(document.body.textContent).toBe('string baz')
  })

  it('should support withTypes factory to keep types', () => {
    const translations = {
      'nb-NO': { my: { string: 'streng {foo}' } },
      'en-GB': { my: { string: 'string {foo}' } },
    }
    type T = (typeof translations)[keyof typeof translations]
    const TComp = Translation.withTypes<T>()

    const { rerender } = render(
      <Provider translations={translations}>
        <TComp id={(t) => t.my.string} foo="bar" />
      </Provider>
    )

    expect(document.body.textContent).toBe('streng bar')

    rerender(
      <Provider locale="en-GB" translations={translations}>
        <TComp id={(t) => t.my.string} foo={() => 'baz'} />
      </Provider>
    )

    expect(document.body.textContent).toBe('string baz')
  })

  it('should render with formatting (br, strong, em, code, link)', () => {
    const translations = {
      'nb-NO': {
        my: {
          msg: '**Bold** and _Italic_ with `code`, link to [Site](https://example.com){br}next line',
        },
      },
    }

    type TranslationType = (typeof translations)[keyof typeof translations]

    const { container } = render(
      <Provider translations={translations}>
        <output>
          <Translation<TranslationType> id={(t) => t.my.msg} />
        </output>
      </Provider>
    )

    expect(container.querySelector('output')).toMatchInlineSnapshot(`
      <output>
        <strong>
          Bold
        </strong>
         and 
        <em>
          Italic
        </em>
         with 
        <code
          class="dnb-code"
        >
          code
        </code>
        , link to 
        <a
          class="dnb-anchor dnb-anchor--was-node dnb-a"
          href="https://example.com"
          rel="noopener noreferrer"
        >
          Site
        </a>
        <br />
        next line
      </output>
    `)
  })
})

describe('mergeTranslations', () => {
  it('should merge translations given as objects', () => {
    const nbNO = {
      'nb-NO': { my: { string: 'streng {foo}' } },
    }
    const enGB = {
      'en-GB': { my: { string: 'string {foo}' } },
    }
    const enGB_expected = {
      'en-GB': {
        my: { string: 'use this string here {foo}' },
        foo: 'bar',
      },
    }

    const translations = mergeTranslations(nbNO, enGB, enGB_expected)

    expect(translations).toEqual({
      'en-GB': {
        foo: 'bar',
        my: {
          string: 'use this string here {foo}',
        },
      },
      'nb-NO': {
        my: {
          string: 'streng {foo}',
        },
      },
    })
  })

  it('should merge translations given as objects with same keys', () => {
    const enGB = {
      'en-GB': {
        my: {
          keepme: 'use this string here',
          subkey: { string: 'string {foo}' },
        },
        foo: 'foo',
      },
    }
    const enGB_expected = {
      'en-GB': {
        my: { subkey: { string: 'use this string here {foo}' } },
        bar: 'bar',
      },
    }

    const translations = mergeTranslations(enGB, enGB_expected)

    expect(translations).toEqual({
      'en-GB': {
        foo: 'foo',
        bar: 'bar',
        my: {
          keepme: 'use this string here',
          subkey: { string: 'use this string here {foo}' },
        },
      },
    })
  })

  it('should merge translations given flatten translations', () => {
    const nbNO = {
      'nb-NO': {
        'Modal.close_title': 'Steng',
        'HelpButton.other.string': given_nbNO,
      },
    }
    const enGB = {
      'en-GB': {
        'Modal.close_title': 'Close',
        'HelpButton.other.string': given_enGB,
      },
    }
    const enGB_expected = {
      'en-GB': {
        foo: 'bar',
        'Modal.close_title': 'Close',
        'HelpButton.other.string': 'use this string here {foo}',
      },
    }

    const translations = mergeTranslations(nbNO, enGB, enGB_expected)

    expect(translations).toEqual({
      'en-GB': {
        foo: 'bar',
        'HelpButton.other.string': 'use this string here {foo}',
        'Modal.close_title': 'Close',
      },
      'nb-NO': {
        'HelpButton.other.string': '{foo} ({bar} av {max})',
        'Modal.close_title': 'Steng',
      },
    })
  })
})
