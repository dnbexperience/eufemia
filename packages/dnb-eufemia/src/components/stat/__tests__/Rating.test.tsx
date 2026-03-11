import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Provider from '../../../shared/Provider'
import Stat from '../Stat'

describe('Stat.Rating', () => {
  it('renders 5 stars by default', () => {
    render(<Stat.Rating />)

    const stars = document.querySelectorAll('.dnb-stat__rating-star')

    expect(stars).toHaveLength(5)
  })

  it('colorizes stars based on value', () => {
    render(<Stat.Rating value={2.5} />)

    const stars = document.querySelectorAll('.dnb-stat__rating-star')

    expect(stars[0].getAttribute('data-fill')).toBe('1.00')
    expect(stars[1].getAttribute('data-fill')).toBe('1.00')
    expect(stars[2].getAttribute('data-fill')).toBe('0.50')
    expect(stars[3].getAttribute('data-fill')).toBe('0.00')
    expect(stars[4].getAttribute('data-fill')).toBe('0.00')
  })

  it('supports max stars', () => {
    render(<Stat.Rating value={3} max={7} />)

    const stars = document.querySelectorAll('.dnb-stat__rating-star')

    expect(stars).toHaveLength(7)
  })

  it('supports progressive variant with default max 7', () => {
    render(<Stat.Rating variant="progressive" value={4.5} />)

    const rating = document.querySelector('.dnb-stat__rating')
    const progressive = document.querySelector(
      '.dnb-stat__rating-progressive'
    )
    const steps = document.querySelectorAll(
      '.dnb-stat__rating-progressive-step--base'
    )

    expect(rating.classList).toContain('dnb-stat__rating--progressive')
    expect(progressive).toBeInTheDocument()
    expect(steps).toHaveLength(7)
    expect(steps[0].getAttribute('data-fill')).toBe('1.00')
    expect(steps[4].getAttribute('data-fill')).toBe('0.50')
    expect(steps[5].getAttribute('data-fill')).toBe('0.00')
  })

  it('provides accessible label', () => {
    render(<Stat.Rating value={2} />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating).toHaveAttribute('role', 'img')
    expect(rating).toHaveAttribute('aria-label', '2 av 5')
  })

  it('supports translated accessible label in en-GB locale', () => {
    render(
      <Provider locale="en-GB">
        <Stat.Rating value={2} />
      </Provider>
    )

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating).toHaveAttribute('aria-label', '2 of 5')
  })

  it('supports srLabel for accessible context', () => {
    render(<Stat.Rating value={4} srLabel="Morningstar" />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating).toHaveAttribute('aria-label', 'Morningstar 4 av 5')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(<Stat.Rating value={3.5} srLabel="Rating" />)

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
