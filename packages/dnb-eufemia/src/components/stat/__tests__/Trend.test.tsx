import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'
import NumberFormat from '../../number-format/NumberFormat'

describe('Stat.Trend', () => {
  it('renders positive sign and screen reader text', () => {
    render(<Stat.Trend>{12.4}</Stat.Trend>)

    const trend = document.querySelector('.dnb-stat__trend')
    const sign = document.querySelector('.dnb-stat__trend-sign')
    const value = document.querySelector('.dnb-stat__trend-value')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(trend.classList).toContain('dnb-stat__trend--positive')
    expect(sign.textContent).toBe('+')
    expect(value.textContent).toBe('12.4')
    expect(sr.getAttribute('data-text')).toBe('+12.4')
  })

  it('renders negative sign and red state class', () => {
    render(<Stat.Trend srLabel="Change:">-2.1%</Stat.Trend>)

    const trend = document.querySelector('.dnb-stat__trend')
    const sign = document.querySelector('.dnb-stat__trend-sign')
    const value = document.querySelector('.dnb-stat__trend-value')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(trend.classList).toContain('dnb-stat__trend--negative')
    expect(sign.textContent).toBe('-')
    expect(value.textContent).toBe('2.1%')
    expect(sr.getAttribute('data-text')).toContain('Change:')
    expect(sr.getAttribute('data-text')).toContain('-2.1%')
  })

  it('renders neutral tone for zero without sign', () => {
    render(<Stat.Trend>0</Stat.Trend>)

    const trend = document.querySelector('.dnb-stat__trend')
    const sign = document.querySelector('.dnb-stat__trend-sign')
    const value = document.querySelector('.dnb-stat__trend-value')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(trend.classList).toContain('dnb-stat__trend--neutral')
    expect(trend.classList).not.toContain('dnb-stat__trend--positive')
    expect(trend.classList).not.toContain('dnb-stat__trend--negative')
    expect(sign).not.toBeInTheDocument()
    expect(value.textContent).toBe('0')
    expect(sr.getAttribute('data-text')).toBe('0')
  })

  it('supports NumberFormat as children without duplicating sign', () => {
    render(
      <Stat.Trend>
        <NumberFormat value={46692} currency signDisplay="always" />
      </Stat.Trend>
    )

    const trend = document.querySelector('.dnb-stat__trend')
    const trendSign = document.querySelector('.dnb-stat__trend-sign')
    const value = document.querySelector('.dnb-stat__trend-value')
    const numberFormat = value.querySelector('.dnb-number-format')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(trend.classList).toContain('dnb-stat__trend--positive')
    expect(trendSign).not.toBeInTheDocument()
    expect(numberFormat).toBeInTheDocument()
    expect(sr.getAttribute('data-text')).toContain('+46')
    expect(sr.getAttribute('data-text')).toContain('kroner')
  })

  it('supports tone prop override', () => {
    render(<Stat.Trend tone="negative">12.4</Stat.Trend>)

    const trend = document.querySelector('.dnb-stat__trend')

    expect(trend.classList).toContain('dnb-stat__trend--negative')
    expect(trend.classList).not.toContain('dnb-stat__trend--positive')
  })

  it('supports skeleton prop', () => {
    render(<Stat.Trend skeleton>12.4</Stat.Trend>)

    const trend = document.querySelector('.dnb-stat__trend')

    expect(trend.classList).toContain('dnb-skeleton')
    expect(trend.classList).toContain('dnb-skeleton--font')
    expect(trend).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders NaN as em dash with neutral tone', () => {
    render(<Stat.Trend value={NaN} />)

    const trend = document.querySelector('.dnb-stat__trend')
    const value = document.querySelector('.dnb-stat__trend-value')
    const sign = document.querySelector('.dnb-stat__trend-sign')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(trend.classList).toContain('dnb-stat__trend--neutral')
    expect(value.textContent).toBe('\u2013')
    expect(sign).not.toBeInTheDocument()
    expect(sr.getAttribute('data-text')).toBe('\u2013')
  })

  it('renders Infinity as em dash with neutral tone', () => {
    render(<Stat.Trend value={Infinity} />)

    const trend = document.querySelector('.dnb-stat__trend')
    const value = document.querySelector('.dnb-stat__trend-value')

    expect(trend.classList).toContain('dnb-stat__trend--neutral')
    expect(value.textContent).toBe('\u2013')
  })

  it('supports spacing props', () => {
    render(<Stat.Trend top="large">12.4</Stat.Trend>)

    const trend = document.querySelector('.dnb-stat__trend')

    expect(trend.classList).toContain('dnb-space__top--large')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Trend srLabel="Change:">{12.4}</Stat.Trend>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
