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

describe('Translation', () => {
  const expected_nbNO = 'foo (bar av max)'
  const expected_enUS = 'foo (bar of max)'
  const expected_nbNO_nested = 'foo (bar av nestet max)'
  const expected_enUS_nested = 'foo (bar of nested max)'

  const nbNO = {
    'Modal.close_title': 'Steng',
    'other.string': '{foo} ({bar} av {max})'
  }
  const enUS = {
    'Modal.close_title': 'Close',
    'other.string': '{foo} ({bar} of {max})'
  }
  const nbNO_nested = {
    'other.string': '{foo} ({bar} av nestet {max})'
  }
  const enUS_nested = {
    'other.string': '{foo} ({bar} of nested {max})'
  }

  const defaultLocales = {
    'nb-NO': nbNO,
    'en-GB': enUS
  }
  const nestedLocales = {
    'nb-NO': nbNO_nested,
    'en-GB': enUS_nested
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

    expect(Comp.find('span.useTranslation').text()).toBe(expected_enUS)
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

    expect(Comp.find('span.Translation').text()).toBe(expected_enUS)
    expect(Comp.find('span.useTranslation').text()).toBe(
      expected_nbNO_nested
    )

    Comp.find('div.inner button.en-GB').simulate('click')

    expect(Comp.find('span.Translation').text()).toBe(expected_enUS)
    expect(Comp.find('span.useTranslation').text()).toBe(
      expected_enUS_nested
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
