import React from 'react'
import { render } from '@testing-library/react'
import Spotlight from '../Spotlight'

describe('Spotlight.Percent', () => {
  it('renders percent with separate auxiliary percent sign', () => {
    render(<Spotlight.Percent value={0.1234} signDisplay="always" />)

    const content = document.querySelector('.dnb-spotlight__content')
    const amount = document.querySelector('.dnb-spotlight__amount')
    const percentSign = document.querySelector('.dnb-spotlight__percent')
    const currency = document.querySelector('.dnb-spotlight__currency')
    const sr = document.querySelector('.dnb-spotlight .dnb-sr-only')

    expect(amount.textContent).toBe('0')
    expect(percentSign).toBeInTheDocument()
    expect(percentSign.textContent).toBe('%')
    expect(percentSign.classList).toContain('dnb-t__size--x-small')
    expect(currency).not.toBeInTheDocument()
    expect(content.textContent).toBe('+0 %')
    expect(sr.getAttribute('data-text')).toContain('+0 %')
  })
})
