/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import { render, screen, act } from '@testing-library/react'
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
    render(<HelpButton>content</HelpButton>)
    const helpButtonNb = screen.getByLabelText(title_nb)
    expect(helpButtonNb.getAttribute('aria-label')).toBe(title_nb)
    expect(helpButtonNb.getAttribute('aria-roledescription')).toBe(
      'Hjelp-knapp'
    )

    render(<HelpButton lang="en-GB">content</HelpButton>)
    const helpButtonGb = screen.getByLabelText(title_gb)
    expect(helpButtonGb.getAttribute('aria-label')).toBe(title_gb)
    expect(helpButtonGb.getAttribute('aria-roledescription')).toBe(
      'Help button'
    )
  })

  it('translation (getTranslation) should react on new lang prop', () => {
    const { rerender } = render(<MagicContext />)
    expect(screen.queryByText(title_nb)).toBeInTheDocument()

    rerender(<MagicContext lang="en-GB" />)
    expect(screen.queryByText(title_gb)).toBeInTheDocument()
  })

  it('translation (getTranslation) should react on new locale', () => {
    render(<MagicContext />)
    expect(screen.getByText(title_nb)).toBeInTheDocument()

    act(() => {
      screen.getByRole('button', { name: 'en-GB' }).click()
    })
    expect(screen.getByText(title_gb)).toBeInTheDocument()

    act(() => {
      screen.getByRole('button', { name: 'en-US' }).click()
    })
    expect(screen.getByText(title_gb)).toBeInTheDocument()

    act(() => {
      screen.getByRole('button', { name: 'nb-NO' }).click()
    })
    expect(screen.getByText(title_nb)).toBeInTheDocument()
  })

  it('translation should react on locale change', () => {
    const { rerender } = render(<HelpButton>content</HelpButton>)
    expect(screen.queryByLabelText(title_nb)).toBeInTheDocument()

    rerender(<HelpButton lang="en-GB">content</HelpButton>)
    expect(screen.queryByLabelText(title_gb)).toBeInTheDocument()
  })
})
