/**
 * useTranslation Tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import useTranslation, {
  getTranslation,
  Translation
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
    'other.string': given_nbNO
  }
  const enGB = {
    'Modal.close_title': 'Close',
    'other.string': given_enGB
  }
  const nbNO_nested = {
    'other.string': given_nbNO_nested
  }
  const enGB_nested = {
    'other.string': given_enGB_nested
  }

  const defaultLocales = {
    'nb-NO': nbNO,
    'en-GB': enGB
  }
  const nestedLocales = {
    'nb-NO': nbNO_nested,
    'en-GB': enGB_nested
  }

  const RenderGetTranslation = () => {
    return useTranslation('other.string', {
      foo: 'foo',
      bar: 'bar',
      max: 'max'
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
    const Comp = mount(
      <Provider locales={defaultLocales}>
        <span className="getTranslation">
          {getTranslation('other.string', {
            foo: 'foo',
            bar: 'bar',
            max: 'max'
          })}
        </span>
      </Provider>
    )

    expect(Comp.find('span.getTranslation').text()).toBe(expected_nbNO)
  })

  it('"Translation" should return requested string inside render', () => {
    const Comp = mount(
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

    expect(Comp.find('span.Translation').text()).toBe(expected_nbNO)
    expect(Comp.find('span.TranslationIdAsChildren').text()).toBe(
      expected_nbNO
    )
  })

  it('"useTranslation" should have valid strings inside render', () => {
    const Comp = mount(
      <Provider locales={defaultLocales}>
        <span className="useTranslation">
          <RenderGetTranslation />
        </span>
      </Provider>
    )

    expect(Comp.find('span.useTranslation').text()).toBe(expected_nbNO)
  })

  it('should change to requested locale', () => {
    const Comp = mount(
      <Provider locales={defaultLocales}>
        <span className="useTranslation">
          <RenderGetTranslation />
        </span>
        <ChangeLocale />
      </Provider>
    )

    expect(Comp.find('span.useTranslation').text()).toBe(expected_nbNO)

    Comp.find('button.en-GB').simulate('click')

    expect(Comp.find('span.useTranslation').text()).toBe(expected_enGB)
  })

  it('should have valid strings inside render', () => {
    const Comp = mount(
      <Provider locales={defaultLocales}>
        <span className="Translation">
          <Translation id="other.string" foo="foo" bar="bar" max="max" />
        </span>

        <Provider locales={nestedLocales}>
          <span className="useTranslation">
            <RenderGetTranslation />
          </span>

          <ChangeLocale className="inner" />
        </Provider>

        <ChangeLocale className="outer" />
      </Provider>
    )

    expect(Comp.find('span.Translation').text()).toBe(expected_nbNO)
    expect(Comp.find('span.useTranslation').text()).toBe(
      expected_nbNO_nested
    )

    Comp.find('div.outer button.en-GB').simulate('click')

    expect(Comp.find('span.Translation').text()).toBe(expected_enGB)
    expect(Comp.find('span.useTranslation').text()).toBe(
      expected_nbNO_nested
    )

    Comp.find('div.inner button.en-GB').simulate('click')

    expect(Comp.find('span.Translation').text()).toBe(expected_enGB)
    expect(Comp.find('span.useTranslation').text()).toBe(
      expected_enGB_nested
    )

    // if we change the inner locale ...
    Comp.find('div.inner button.nb-NO').simulate('click')

    // ... we also change the outer
    expect(Comp.find('span.Translation').text()).toBe(expected_nbNO)
    expect(Comp.find('span.useTranslation').text()).toBe(
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
          const otherString = context.getTranslation(props).HelpButton[
            'other.string'
          ]
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
    const Comp = mount(<MagicContext />)

    expect(Comp.find('p.title').text()).toBe(
      nbNO['nb-NO'].HelpButton.title
    )
    expect(Comp.find('p.locale').text()).toBe('nb-NO')

    Comp.setProps({
      lang: 'en-GB'
    })

    expect(Comp.find('p.title').text()).toBe(
      enGB['en-GB'].HelpButton.title
    )

    // locale should not be changed
    expect(Comp.find('p.locale').text()).not.toBe('en-GB')
    expect(Comp.find('p.locale').text()).toBe('nb-NO')
  })

  it('should react on new lang prop and prepare other.string', () => {
    const Comp = mount(<MagicContext />)

    expect(Comp.find('p.other-string').text()).toBe(given_nbNO)

    Comp.setProps({
      lang: 'en-GB'
    })

    expect(Comp.find('p.other-string').text()).toBe(given_enGB)
  })

  // We may use that in future
  // it('translation should be mutable, but not locale', () => {
  //   const Comp = mount(
  //     <MagicContext
  //       translation={{
  //         HelpButton: { title: 'ny-tittle' }
  //       }}
  //     />
  //   )

  //   expect(Comp.find('p.title').text()).toBe('ny-tittle')
  //   expect(Comp.find('p.locale').text()).toBe('nb-NO')

  //   Comp.setProps({
  //     translation: {
  //       HelpButton: { title: 'new-title' }
  //     }
  //   })

  //   expect(Comp.find('p.title').text()).toBe('new-title')
  //   expect(Comp.find('p.locale').text()).toBe('nb-NO')

  //   Comp.setProps({
  //     lang: 'en-GB',
  //     translation: {
  //       HelpButton: { title: 'new-title-update' }
  //     }
  //   })

  //   expect(Comp.find('p.title').text()).not.toBe('new-title-update')
  // })
})
