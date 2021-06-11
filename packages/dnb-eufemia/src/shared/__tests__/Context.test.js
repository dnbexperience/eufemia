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

describe('Context', () => {
  const title_nb = nbNO['nb-NO'].HelpButton.title
  const title_gb = enGB['en-GB'].HelpButton.title

  const ChangeLocale = () => {
    const { setLocaleByProps, locale } = React.useContext(Context)

    return (
      <ToggleButton.Group
        value={locale}
        on_change={({ value }) => {
          setLocaleByProps({ locale: value })
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

  const MagicContext = ({ children, ...props }) => {
    return (
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
