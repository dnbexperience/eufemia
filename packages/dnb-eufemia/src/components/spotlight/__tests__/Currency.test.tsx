import React from 'react'
import { render } from '@testing-library/react'
import Spotlight from '../Spotlight'

describe('Spotlight.Currency', () => {
  it('renders currency by default', () => {
    render(<Spotlight.Currency value={12345.67} />)

    const amount = document.querySelector('.dnb-spotlight__amount')
    const currency = document.querySelector('.dnb-spotlight__currency')

    expect(amount.textContent).toBe('12 346')
    expect(currency).toBeInTheDocument()
    expect(currency.textContent).toBe('kr')
  })
})
