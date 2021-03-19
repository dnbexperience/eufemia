/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import HelpButton from '../../components/help-button/HelpButton'
import ToggleButton from '../../components/toggle-button/ToggleButton'

import Context from '../Context'
import Provider from '../Provider'

describe('Provider', () => {
  const title_nb = 'Tekst'
  const title_gb = 'Text'

  const nbNO = {
    'HelpButton.title': title_nb
  }
  const enGB = {
    'HelpButton.title': title_gb
  }

  const LocalProvider = (props) => {
    return (
      <Provider
        locales={{
          'nb-NO': Object.freeze(nbNO),
          'en-GB': Object.freeze(enGB)
        }}
        {...props}
      />
    )
  }

  const ChangeLocale = () => {
    const { setLocale, locale } = React.useContext(Context)

    return (
      <ToggleButton.Group
        value={locale}
        on_change={({ value }) => {
          setLocale(value)
        }}
      >
        <ToggleButton value="nb-NO" className="nb-NO">
          nb-NO
        </ToggleButton>
        <ToggleButton value="en-GB" className="en-GB">
          en-GB
        </ToggleButton>
        <ToggleButton value="en-US" className="en-US">
          en-US
        </ToggleButton>
      </ToggleButton.Group>
    )
  }

  const MagicProvider = ({ children, ...props }) => {
    return (
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
  }

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
      locale: 'en-GB'
    })

    expect(
      Comp.find('button.dnb-help-button').instance().getAttribute('title')
    ).toBe(title_gb)
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
      locale: 'en-GB'
    })

    expect(Comp.find('p').text()).toBe(title_gb)
  })

  it('locales should react on locale change', () => {
    const Comp = mount(<MagicProvider />)

    expect(Comp.find('p').text()).toBe(title_nb)

    Comp.find('.en-GB button').simulate('click')

    expect(Comp.find('p').text()).toBe(title_gb)

    Comp.find('.en-US button').simulate('click')

    expect(Comp.find('p').text()).toBe(title_gb)

    Comp.find('.nb-NO button').simulate('click')

    expect(Comp.find('p').text()).toBe(title_nb)
  })

  it('locales should support nested providers', () => {
    const Comp = mount(
      <MagicProvider locale="nb-NO">
        <MagicProvider locale="en-GB" />
      </MagicProvider>
    )

    expect(Comp.find('p').at(0).text()).toBe(title_nb)
    expect(Comp.find('p').at(1).text()).toBe(title_gb)

    Comp.find('.nb-NO button').at(1).simulate('click')

    expect(Comp.find('p').at(1).text()).toBe(title_nb)
    expect(
      Comp.find('.nb-NO button')
        .at(1)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')

    // should not have changed
    expect(Comp.find('p').at(0).text()).toBe(title_nb)

    Comp.find('.en-GB button').at(0).simulate('click')
    expect(
      Comp.find('.en-GB button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(0).text()).toBe(title_gb)

    Comp.find('.en-US button').at(0).simulate('click')
    expect(
      Comp.find('.en-US button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(0).text()).toBe(title_gb)

    // should not have changed
    expect(Comp.find('p').at(1).text()).toBe(title_nb)
  })

  it('locale should be inherited in nested providers', () => {
    const locale = 'nb-NO'
    let receivedLocale = 'nb-NO'

    const Consumer = () => {
      receivedLocale = React.useContext(Context).locale
      return null
    }
    const Comp = mount(
      <MagicProvider locale="nb-NO">
        <MagicProvider>
          <Consumer />
        </MagicProvider>
      </MagicProvider>
    )

    expect(receivedLocale).toBe(locale)
    expect(Comp.find('p').at(0).text()).toBe(title_nb)
  })

  it('should support nested providers and update the root context', () => {
    const Comp = mount(
      <MagicProvider locale="en-GB">
        <MagicProvider locale="nb-NO" />
      </MagicProvider>
    )

    expect(Comp.find('p').at(0).text()).toBe(title_gb)
    expect(
      Comp.find('.en-GB button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(1).text()).toBe(title_nb)
    expect(
      Comp.find('.nb-NO button')
        .at(1)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')

    // First, let's change the inner
    Comp.find('.nb-NO button').at(1).simulate('click')

    expect(Comp.find('p').at(0).text()).toBe(title_gb)
    expect(
      Comp.find('.en-GB button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(1).text()).toBe(title_nb)
    expect(
      Comp.find('.nb-NO button')
        .at(1)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')

    Comp.find('.en-GB button').at(1).simulate('click')

    expect(Comp.find('p').at(0).text()).toBe(title_gb)
    expect(
      Comp.find('.en-GB button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(1).text()).toBe(title_gb)
    expect(
      Comp.find('.en-GB button')
        .at(1)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')

    Comp.find('.nb-NO button').at(1).simulate('click')

    expect(Comp.find('p').at(0).text()).toBe(title_nb)
    expect(
      Comp.find('.nb-NO button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(1).text()).toBe(title_nb)
    expect(
      Comp.find('.nb-NO button')
        .at(1)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')

    // Now, let's change the outer
    Comp.find('.en-GB button').at(0).simulate('click')

    expect(Comp.find('p').at(0).text()).toBe(title_gb)
    expect(
      Comp.find('.en-GB button')
        .at(0)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(Comp.find('p').at(1).text()).toBe(title_nb)
    expect(
      Comp.find('.nb-NO button')
        .at(1)
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
  })
})
