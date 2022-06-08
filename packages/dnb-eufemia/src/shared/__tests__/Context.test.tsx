/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import HelpButton from '../../components/help-button/HelpButton'
import ToggleButton from '../../components/toggle-button/ToggleButton'

import Context from '../Context'

import nbNO from '../locales/nb-NO'
import enGB from '../locales/en-GB'
import Provider from '../Provider'

describe('Context', () => {
  const title_nb = nbNO['nb-NO'].HelpButton.title
  const title_gb = enGB['en-GB'].HelpButton.title

  const ChangeLocale = () => {
    const { setLocale, update, setCurrentLocale, updateCurrent, locale } =
      React.useContext(Context)

    expect(typeof update).toBe('function')
    expect(typeof setLocale).toBe('function')
    expect(typeof setCurrentLocale).toBe('function')
    expect(typeof updateCurrent).toBe('function')

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

  const MagicContext = ({ children = null, ...props }) => {
    return (
      <Provider>
        <Context.Consumer>
          {(context) => {
            const title = context.getTranslation(props).HelpButton.title
            return (
              <>
                <p>{title}</p>
                <ChangeLocale />
                {children}
              </>
            )
          }}
        </Context.Consumer>
      </Provider>
    )
  }

  it('locales should translate component strings', () => {
    const Comp = mount(<HelpButton>content</HelpButton>)

    expect(
      Comp.find('button.dnb-help-button')
        .instance()
        .getAttribute('aria-label')
    ).toBe(title_nb)
    expect(
      Comp.find('button.dnb-help-button')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')

    Comp.setProps({
      lang: 'en-GB',
    })

    expect(
      Comp.find('button.dnb-help-button')
        .instance()
        .getAttribute('aria-label')
    ).toBe(title_gb)
    expect(
      Comp.find('button.dnb-help-button')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe('Help button')
  })

  it('translation (getTranslation) should react on new lang prop', () => {
    const Comp = mount(<MagicContext />)

    expect(Comp.find('p').text()).toBe(title_nb)

    Comp.setProps({
      lang: 'en-GB',
    })

    expect(Comp.find('p').text()).toBe(title_gb)
  })

  it('translation (getTranslation) should react on new locale', () => {
    const Comp = mount(<MagicContext />)

    expect(Comp.find('p').text()).toBe(title_nb)

    Comp.find('.en-GB').find('button').simulate('click')

    expect(Comp.find('p').text()).toBe(title_gb)

    Comp.find('.en-US').find('button').simulate('click')

    expect(Comp.find('p').text()).toBe(title_gb)

    Comp.find('.nb-NO').find('button').simulate('click')

    expect(Comp.find('p').text()).toBe(title_nb)
  })

  it('translation should react on locale change', () => {
    const Comp = mount(<HelpButton>content</HelpButton>)

    expect(
      Comp.find('HelpButtonInstance')
        .find('button')
        .instance()
        .getAttribute('aria-label')
    ).toBe(title_nb)

    Comp.setProps({
      lang: 'en-GB',
    })

    expect(
      Comp.find('HelpButtonInstance')
        .find('button')
        .instance()
        .getAttribute('aria-label')
    ).toBe(title_gb)
  })
})
