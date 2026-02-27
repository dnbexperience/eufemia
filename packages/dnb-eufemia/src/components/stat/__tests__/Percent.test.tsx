import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Percent', () => {
  it('renders percent with separate auxiliary percent sign', () => {
    render(<Stat.Percent value={0.1234} signDisplay="always" />)

    const content = document.querySelector('.dnb-stat__content')
    const amount = document.querySelector('.dnb-stat__amount')
    const percentSign = document.querySelector('.dnb-stat__percent')
    const currency = document.querySelector('.dnb-stat__currency')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(amount.textContent).toBe('0')
    expect(percentSign).toBeInTheDocument()
    expect(percentSign.textContent).toBe('%')
    expect(percentSign.classList).toContain('dnb-t__size--large')
    expect(currency).not.toBeInTheDocument()
    expect(content.textContent).toBe('+0 %')
    expect(sr.getAttribute('data-text')).toContain('+0 %')
  })

  it('supports sign tone colorization', () => {
    render(<Stat.Percent value={-12.3} colorizeBySign />)

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-negative')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
  })

  it('supports auxWeight', () => {
    render(<Stat.Percent value={12.3} auxWeight="bold" />)

    const percentSign = document.querySelector('.dnb-stat__percent')

    expect(percentSign.classList).toContain('dnb-t__weight--bold')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Percent value={0.1234} signDisplay="always" srLabel="Change" />
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
