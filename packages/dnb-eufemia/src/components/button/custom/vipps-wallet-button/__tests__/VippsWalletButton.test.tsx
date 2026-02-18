/**
 * VippsWalletButton Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import VippsWalletButton from '../VippsWalletButton'
import { Provider } from '../../../../../shared'

describe('VippsWalletButton', () => {
  it('renders as a primary button by default', () => {
    render(<VippsWalletButton />)

    const element = document.querySelector('button')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('dnb-button--primary')
    expect(element.classList).toContain('dnb-vipps-wallet-button')
  })

  it('renders norwegian text by default', () => {
    render(<VippsWalletButton />)

    const element = document.querySelector('.dnb-button')

    expect(element.textContent).toContain('Legg til i')
    expect(element.querySelector('svg')).toBeInTheDocument()
  })

  it('has aria-label on the Vipps logo', () => {
    render(<VippsWalletButton />)

    const logo = document.querySelector('.dnb-button svg')

    expect(logo).toHaveAttribute('aria-label', 'Vipps')
  })

  it('renders translated text from locale', () => {
    render(
      <Provider locale="en-GB">
        <VippsWalletButton />
      </Provider>
    )

    const element = document.querySelector('.dnb-button')

    expect(element.textContent).toContain('Add to')
  })

  it('renders english translation for en-US locale fallback', () => {
    render(
      <Provider locale="en-US">
        <VippsWalletButton />
      </Provider>
    )

    const element = document.querySelector('.dnb-button')

    expect(element.textContent).toContain('Add to')
  })

  it('falls back to nb-NO translation for no locale', () => {
    render(
      <Provider locale="no">
        <VippsWalletButton />
      </Provider>
    )

    const element = document.querySelector('.dnb-button')

    expect(element.textContent).toContain('Legg til i')
  })

  it('supports passing button props', () => {
    render(<VippsWalletButton disabled title="Vipps wallet button" />)

    const element = document.querySelector('button')

    expect(element).toHaveAttribute('disabled')
    expect(element).toHaveAttribute('title', 'Vipps wallet button')
  })
})
