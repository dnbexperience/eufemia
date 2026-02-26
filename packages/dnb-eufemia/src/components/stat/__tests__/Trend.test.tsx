import React from 'react'
import { render } from '@testing-library/react'
import Stat from '../Stat'
import NumberFormat from '../../number-format/NumberFormat'

describe('Stat.Trend', () => {
  it('renders positive sign and screen reader text', () => {
    render(<Stat.Trend value={12.4} />)

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
    render(<Stat.Trend value="-2.1%" srLabel="Change:" />)

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
    render(<Stat.Trend value={0} />)

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
    render(<Stat.Trend value={12.4} tone="negative" />)

    const trend = document.querySelector('.dnb-stat__trend')

    expect(trend.classList).toContain('dnb-stat__trend--negative')
    expect(trend.classList).not.toContain('dnb-stat__trend--positive')
  })
})
