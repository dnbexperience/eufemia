import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Currency', () => {
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

  it('supports auxWeight', () => {
    render(<Stat.Currency value={12345.67} auxWeight="bold" />)

    const currency = document.querySelector('.dnb-stat__currency')

    expect(currency.classList).toContain('dnb-t__weight--bold')
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
})
