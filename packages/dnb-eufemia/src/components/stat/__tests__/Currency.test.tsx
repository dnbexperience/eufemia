import React from 'react'
import { render } from '@testing-library/react'
import {
  axeComponent,
  spyOnEufemiaWarn,
} from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Currency', () => {
  let log: ReturnType<typeof spyOnEufemiaWarn>

  beforeEach(() => {
    log = spyOnEufemiaWarn()
  })

  afterEach(() => {
    log.mockRestore()
  })
  it('renders currency by default', () => {
    render(<Stat.Currency value={12345.67} />)

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.textContent).toBe('12 346')
    expect(currency).toBeInTheDocument()
    expect(currency.textContent).toBe('kr')
  })

  it('supports sign tone colorization', () => {
    render(
      <Stat.Currency
        value={12345.67}
        signDisplay="always"
        colorizeBySign
      />
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('supports auxiliaryWeight', () => {
    render(<Stat.Currency value={12345.67} auxiliaryWeight="bold" />)

    const currency = document.querySelector('.dnb-stat__currency')

    expect(currency.classList).toContain('dnb-t__weight--bold')
  })

  it('supports fontSize and allows mainSize to override it', () => {
    const { rerender } = render(
      <Stat.Currency value={12345.67} fontSize="x-large" />
    )

    let amount = document.querySelector('.dnb-stat__amount')
    let currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--x-large')

    rerender(
      <Stat.Currency
        value={12345.67}
        fontSize="x-large"
        mainSize="xx-large"
      />
    )

    amount = document.querySelector('.dnb-stat__amount')
    currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--xx-large')
    expect(currency.classList).toContain('dnb-t__size--x-large')
  })

  it('uses basis size by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Currency value={12345.67} />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('uses basis size by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Currency value={12345.67} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('uses regular mainWeight by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Currency value={12345.67} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--regular')
    expect(amount.classList).not.toContain('dnb-t__weight--medium')
  })

  it('supports spacing props', () => {
    render(<Stat.Currency value={1234} top="large" />)

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-space__top--large')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Currency
        value={12345.67}
        signDisplay="always"
        srLabel="Revenue"
      />
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('renders currency with space after currency in en-GB locale', () => {
    const { container } = render(
      <Stat.Currency value={12345.67} currency="NOK" locale="en-GB" />
    )

    const content = container.querySelector('.dnb-stat__content')
    const amount = container.querySelector('.dnb-stat__amount')
    const currency = container.querySelector('.dnb-stat__currency')

    // Check individual parts
    expect(currency.textContent).toBe('NOK')
    expect(amount.textContent).toBe('12,346')

    // Check that currency is before amount
    expect(content.innerHTML.indexOf('dnb-stat__currency')).toBeLessThan(
      content.innerHTML.indexOf('dnb-stat__amount')
    )

    // Verify screen-reader text includes the currency and amount
    const srOnly = container.querySelector('.dnb-sr-only')
    expect(srOnly.getAttribute('data-text')).toContain('12,346')
    expect(srOnly.getAttribute('data-text')).toContain('kroner')
  })
})
