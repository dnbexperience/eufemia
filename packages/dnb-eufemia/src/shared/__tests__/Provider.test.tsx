/**
 * Provider/Context Tests
 *
 */

import React from 'react'
import HelpButton from '../../components/help-button/HelpButton'
import ToggleButton from '../../components/toggle-button/ToggleButton'

import Context from '../Context'
import Provider from '../Provider'
import { fireEvent, render } from '@testing-library/react'

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Provider', () => {
  const title_nb = 'Tekst'
  const title_gb = 'Text'

  const nbNO = {
    'HelpButton.title': title_nb,
  }
  const enGB = {
    'HelpButton.title': title_gb,
  }

  const LocalProvider = (props) => {
    return (
      <Provider
        locales={{
          'nb-NO': Object.freeze(nbNO),
          'en-GB': Object.freeze(enGB),
        }}
        {...props}
      />
    )
  }

  const ChangeLocale = () => {
    const { setLocale, locale } = React.useContext(Context)

    expect(typeof setLocale).toBe('function')

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

  const MagicProvider = ({ children = null, ...props }) => {
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
    const { rerender } = render(
      <LocalProvider>
        <HelpButton>content</HelpButton>
      </LocalProvider>
    )

    expect(
      document
        .querySelector('button.dnb-help-button')
        .getAttribute('aria-label')
    ).toBe(title_nb)
    expect(
      document
        .querySelector('button.dnb-help-button')
        .getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')

    rerender(
      <LocalProvider locale="en-GB">
        <HelpButton>content</HelpButton>
      </LocalProvider>
    )

    expect(
      document
        .querySelector('button.dnb-help-button')
        .getAttribute('aria-label')
    ).toBe(title_gb)
    expect(
      document
        .querySelector('button.dnb-help-button')
        .getAttribute('aria-roledescription')
    ).toBe('Help button')
  })

  it('locales should react on prop change', () => {
    const { rerender } = render(<MagicProvider />)

    expect(document.querySelector('p').textContent).toBe(title_nb)

    rerender(<MagicProvider locale="en-GB" />)

    expect(document.querySelector('p').textContent).toBe(title_gb)
  })

  it('locales should react on locale change', () => {
    render(<MagicProvider />)

    expect(document.querySelector('p').textContent).toBe(title_nb)

    fireEvent.click(document.querySelector('.en-GB button'))

    expect(document.querySelector('p').textContent).toBe(title_gb)

    fireEvent.click(document.querySelector('.en-US button'))

    expect(document.querySelector('p').textContent).toBe(title_gb)

    fireEvent.click(document.querySelector('.nb-NO button'))

    expect(document.querySelector('p').textContent).toBe(title_nb)
  })

  it('locales should support nested providers', () => {
    render(
      <MagicProvider locale="nb-NO">
        <MagicProvider locale="en-GB" />
      </MagicProvider>
    )

    const getRootElement = () => document.querySelectorAll('p')[0]
    const getNestedElement = () => document.querySelectorAll('p')[1]
    const switchRootTo = (locale: string) => {
      fireEvent.click(document.querySelectorAll(`.${locale} button`)[0])
    }
    const switchNestedTo = (locale: string) => {
      fireEvent.click(document.querySelectorAll(`.${locale} button`)[1])
    }

    expect(getRootElement().textContent).toBe(title_nb)
    expect(getNestedElement().textContent).toBe(title_gb)

    switchNestedTo('nb-NO')

    expect(getNestedElement().textContent).toBe(title_nb)
    expect(
      document
        .querySelectorAll('.nb-NO button')[1]
        .getAttribute('aria-pressed')
    ).toBe('true')

    // should not have changed
    expect(getRootElement().textContent).toBe(title_nb)

    switchRootTo('en-GB')

    expect(
      document
        .querySelectorAll('.en-GB button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getRootElement().textContent).toBe(title_gb)

    switchRootTo('en-US')

    expect(
      document
        .querySelectorAll('.en-US button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getRootElement().textContent).toBe(title_gb)

    // should not have changed
    expect(getNestedElement().textContent).toBe(title_nb)
  })

  it('locale should be inherited in nested providers', () => {
    const locale = 'nb-NO'
    let receivedLocale = null

    const Consumer = () => {
      receivedLocale = React.useContext(Context).locale
      return null
    }

    render(
      <MagicProvider locale="nb-NO">
        <MagicProvider>
          <Consumer />
        </MagicProvider>
      </MagicProvider>
    )

    expect(receivedLocale).toBe(locale)
    expect(document.querySelectorAll('p')[0].textContent).toBe(title_nb)
  })

  it('should support nested providers and update the root context', () => {
    render(
      <MagicProvider locale="en-GB">
        <MagicProvider locale="nb-NO" />
      </MagicProvider>
    )

    const getRootElement = () => document.querySelectorAll('p')[0]
    const getNestedElement = () => document.querySelectorAll('p')[1]
    const switchRootTo = (locale: string) => {
      fireEvent.click(document.querySelectorAll(`.${locale} button`)[0])
    }
    const switchNestedTo = (locale: string) => {
      fireEvent.click(document.querySelectorAll(`.${locale} button`)[1])
    }

    expect(getRootElement().textContent).toBe(title_gb)
    expect(
      document
        .querySelectorAll('.en-GB button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getNestedElement().textContent).toBe(title_nb)
    expect(
      document
        .querySelectorAll('.nb-NO button')[1]
        .getAttribute('aria-pressed')
    ).toBe('true')

    // First, let's change the inner
    switchNestedTo('nb-NO')

    expect(getRootElement().textContent).toBe(title_gb)
    expect(
      document
        .querySelectorAll('.en-GB button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getNestedElement().textContent).toBe(title_nb)
    expect(
      document
        .querySelectorAll('.nb-NO button')[1]
        .getAttribute('aria-pressed')
    ).toBe('true')

    switchNestedTo('en-GB')

    expect(getRootElement().textContent).toBe(title_gb)
    expect(
      document
        .querySelectorAll('.en-GB button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getNestedElement().textContent).toBe(title_gb)
    expect(
      document
        .querySelectorAll('.en-GB button')[1]
        .getAttribute('aria-pressed')
    ).toBe('true')

    switchNestedTo('nb-NO')

    expect(getRootElement().textContent).toBe(title_nb)
    expect(
      document
        .querySelectorAll('.nb-NO button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getNestedElement().textContent).toBe(title_nb)
    expect(
      document
        .querySelectorAll('.nb-NO button')[1]
        .getAttribute('aria-pressed')
    ).toBe('true')

    // Now, let's change the outer
    switchRootTo('en-GB')

    expect(getRootElement().textContent).toBe(title_gb)
    expect(
      document
        .querySelectorAll('.en-GB button')[0]
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(getNestedElement().textContent).toBe(title_nb)
    expect(
      document
        .querySelectorAll('.nb-NO button')[1]
        .getAttribute('aria-pressed')
    ).toBe('true')
  })
})
