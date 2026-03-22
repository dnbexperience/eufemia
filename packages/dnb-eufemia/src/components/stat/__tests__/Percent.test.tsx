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

  it('colorizes positive value without signDisplay', () => {
    render(<Stat.Percent value={12.3} colorizeBySign />)

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('does not colorize zero value', () => {
    render(<Stat.Percent value={0} colorizeBySign />)

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).not.toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('supports auxiliaryWeight', () => {
    render(<Stat.Percent value={12.3} auxiliaryWeight="bold" />)

    const percentSign = document.querySelector('.dnb-stat__percent')

    expect(percentSign.classList).toContain('dnb-t__weight--bold')
  })

  it('supports fontSize and allows auxiliarySize to override it', () => {
    const { rerender } = render(
      <Stat.Percent value={12.3} fontSize="x-large" />
    )

    let amount = document.querySelector('.dnb-stat__amount')
    let percentSign = document.querySelector('.dnb-stat__percent')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(percentSign.classList).toContain('dnb-t__size--x-large')

    rerender(
      <Stat.Percent
        value={12.3}
        fontSize="x-large"
        auxiliarySize="basis"
      />
    )

    amount = document.querySelector('.dnb-stat__amount')
    percentSign = document.querySelector('.dnb-stat__percent')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(percentSign.classList).toContain('dnb-t__size--basis')
  })

  it('uses basis size by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Percent value={12.3} />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const percentSign = document.querySelector('.dnb-stat__percent')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(percentSign.classList).toContain('dnb-t__size--basis')
  })

  it('uses basis size by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Percent value={12.3} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const percentSign = document.querySelector('.dnb-stat__percent')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(percentSign.classList).toContain('dnb-t__size--basis')
  })

  it('uses regular mainWeight by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Percent value={12.3} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--regular')
    expect(amount.classList).not.toContain('dnb-t__weight--medium')
  })

  it('supports spacing props', () => {
    render(<Stat.Percent value={12.3} top="large" />)

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-space__top--large')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Percent value={0.1234} signDisplay="always" srLabel="Change" />
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
