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

  it('scales progressive step heights dynamically for custom max', () => {
    render(<Stat.Rating variant="progressive" value={5} max={10} />)

    const steps = document.querySelectorAll(
      '.dnb-stat__rating-progressive-step--base'
    )

    expect(steps).toHaveLength(10)

    const firstHeight = (steps[0] as HTMLElement).style.getPropertyValue(
      '--dnb-stat-rating-step-height'
    )
    const lastHeight = (steps[9] as HTMLElement).style.getPropertyValue(
      '--dnb-stat-rating-step-height'
    )

    expect(firstHeight).toBe('0.25rem')
    expect(lastHeight).toBe('1rem')
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

  it('uses matching precision in aria-label and visual fill', () => {
    render(<Stat.Rating value={2.55} />)

    const rating = document.querySelector('.dnb-stat__rating')
    const stars = document.querySelectorAll('.dnb-stat__rating-star')

    expect(rating).toHaveAttribute('aria-label', '2.55 av 5')
    expect(stars[2].getAttribute('data-fill')).toBe('0.55')
  })

  it('strips trailing zeros from fractional aria-label', () => {
    render(<Stat.Rating value={3.5} />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating).toHaveAttribute('aria-label', '3.5 av 5')
  })

  it('warns and clamps when max exceeds the allowed limit', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Rating value={5} max={50} />)

    const stars = document.querySelectorAll('.dnb-stat__rating-star')

    expect(stars).toHaveLength(20)

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('exceeds the supported limit')
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('should validate with ARIA rules', async () => {
    const component = render(<Stat.Rating value={3.5} srLabel="Rating" />)

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('supports skeleton prop', () => {
    render(<Stat.Rating value={3.5} skeleton />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.classList).toContain('dnb-skeleton')
    expect(rating.classList).toContain('dnb-skeleton--shape')
    expect(rating).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton from Root to stars variant', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Rating</Stat.Label>
        <Stat.Content>
          <Stat.Rating value={3.5} />
        </Stat.Content>
      </Stat.Root>
    )

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.classList).toContain('dnb-skeleton')
    expect(rating.classList).toContain('dnb-skeleton--shape')
    expect(rating).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton from Root to progressive variant', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Rating</Stat.Label>
        <Stat.Content>
          <Stat.Rating variant="progressive" value={4} />
        </Stat.Content>
      </Stat.Root>
    )

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.classList).toContain('dnb-skeleton')
    expect(rating.classList).toContain('dnb-skeleton--shape')
    expect(rating).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton from Content to Rating', () => {
    render(
      <Stat.Root>
        <Stat.Label>Rating</Stat.Label>
        <Stat.Content skeleton>
          <Stat.Rating value={3} />
        </Stat.Content>
      </Stat.Root>
    )

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.classList).toContain('dnb-skeleton')
    expect(rating.classList).toContain('dnb-skeleton--shape')
  })

  it('supports spacing props', () => {
    render(<Stat.Rating value={3} top="large" />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.classList).toContain('dnb-space__top--large')
  })

  it('applies style prop to the element', () => {
    render(<Stat.Rating value={3} style={{ color: 'red' }} />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.getAttribute('style')).toContain('color: red')
  })

  it('supports id prop', () => {
    render(<Stat.Rating value={3} id="my-rating" />)

    const rating = document.querySelector('.dnb-stat__rating')

    expect(rating.getAttribute('id')).toBe('my-rating')
  })
})
