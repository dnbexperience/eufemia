import React from 'react'
import { render } from '@testing-library/react'
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
})
