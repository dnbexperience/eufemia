/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import HelpButton from '../../components/help-button/HelpButton'

import Context from '../Context'
import Provider from '../Provider'

describe('Provider', () => {
  const title_nb = 'Tekst'
  const title_us = 'Text'

  const nbNO = {
    'HelpButton.title': title_nb
  }
  const enUS = {
    'HelpButton.title': title_us
  }

  const LocalProvider = (props) => {
    return (
      <Provider
        locales={{
          'nb-NO': Object.freeze(nbNO),
          'en-US': Object.freeze(enUS)
        }}
        {...props}
      />
    )
  }

  const ChangeLocale = () => {
    const { setLocale } = React.useContext(Context)

    return (
      <>
        <button
          className="nb-NO"
          onClick={() => {
            setLocale('nb-NO')
          }}
        >
          nb-NO
        </button>
        <button
          className="en-US"
          onClick={() => {
            setLocale('en-US')
          }}
        >
          en-US
        </button>
      </>
    )
  }

  const MagicProvider = ({ children, ...props }) => (
    <LocalProvider {...props}>
      <Context.Consumer>
        {(context) => {
          const title = context.translation.HelpButton.title
          return (
            <>
              <p>{title}</p>
              <ChangeLocale />
              {children}
            </>
          )
        }}
      </Context.Consumer>
    </LocalProvider>
  )

  it('locales should translate component strings', () => {
    const Comp = mount(
      <LocalProvider>
        <HelpButton>content</HelpButton>
      </LocalProvider>
    )

    expect(
      Comp.find('button.dnb-help-button').instance().getAttribute('title')
    ).toBe(title_nb)
    expect(
      Comp.find('button.dnb-help-button')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')

    Comp.setProps({
      locale: 'en-US'
    })

    expect(
      Comp.find('button.dnb-help-button').instance().getAttribute('title')
    ).toBe(title_us)
    expect(
      Comp.find('button.dnb-help-button')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe('Help button')
  })

  it('locales should react on locale change', () => {
    const Comp = mount(<MagicProvider />)

    expect(Comp.find('p').text()).toBe(title_nb)

    Comp.setProps({
      locale: 'en-US'
    })

    expect(Comp.find('p').text()).toBe(title_us)
  })

  it('locales should react on locale change', () => {
    const Comp = mount(<MagicProvider />)

    expect(Comp.find('p').text()).toBe(title_nb)

    Comp.find('button.en-US').simulate('click')

    expect(Comp.find('p').text()).toBe(title_us)

    Comp.find('button.nb-NO').simulate('click')

    expect(Comp.find('p').text()).toBe(title_nb)
  })

  it('locales should support nested providers', () => {
    const Comp = mount(
      <MagicProvider>
        <MagicProvider locale="en-US" />
      </MagicProvider>
    )

    expect(Comp.find('p').at(0).text()).toBe(title_nb)
    expect(Comp.find('p').at(1).text()).toBe(title_us)

    Comp.find('button.nb-NO').at(1).simulate('click')
    expect(Comp.find('p').at(1).text()).toBe(title_nb)

    // should not have changed
    expect(Comp.find('p').at(0).text()).toBe(title_nb)

    Comp.find('button.en-US').at(0).simulate('click')
    expect(Comp.find('p').at(0).text()).toBe(title_us)

    // should not have changed
    expect(Comp.find('p').at(1).text()).toBe(title_nb)
  })
})
