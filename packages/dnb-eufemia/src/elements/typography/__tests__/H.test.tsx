/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import H, { SharedHProps } from '../H'
import { render } from '@testing-library/react'

const props: SharedHProps = {
  size: 'large',
}

describe('H element', () => {
  it('has H1 as default', () => {
    render(<H>Test heading</H>)

    const element = document.querySelector('h1')
    expect(element.tagName).toBe('H1')
  })

  it('can set className', () => {
    render(
      <H className="my-class" size="medium">
        Test heading
      </H>
    )
    const element = document.querySelector('.dnb-h--medium')

    expect(element.classList.contains('dnb-h--medium')).toBe(true)
    expect(element.classList.contains('my-class')).toBe(true)
  })

  it('can set h2', () => {
    render(
      <H as="h2" size="medium">
        Test heading
      </H>
    )
    const element = document.querySelector('.dnb-h--medium')

    expect(element.tagName).toBe('H2')
  })

  it('has correct size when size is defined', () => {
    render(<H size="large">Test heading</H>)
    const element = document.querySelector('.dnb-h--large')

    expect(element.classList.contains('dnb-h--large')).toBe(true)
  })

  it('should validate with ARIA rules as a h2 element', async () => {
    const Comp = render(<H {...props}>Test heading</H>)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  describe('proseMaxWidth', () => {
    it('applies proseMaxWidth style when provided', () => {
      render(<H proseMaxWidth={80}>Test heading</H>)
      const element = document.querySelector(
        '.dnb-h--xx-large'
      ) as HTMLElement

      expect(element.style.maxWidth).toBe('80ch')
    })

    it('does not apply proseMaxWidth style when not provided', () => {
      render(<H>Test heading</H>)
      const element = document.querySelector(
        '.dnb-h--xx-large'
      ) as HTMLElement

      expect(element.style.maxWidth).toBe('')
    })

    it('merges proseMaxWidth with existing styles', () => {
      render(
        <H proseMaxWidth={60} style={{ color: 'red' }}>
          Test heading
        </H>
      )
      const element = document.querySelector(
        '.dnb-h--xx-large'
      ) as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
      expect(element.style.color).toBe('red')
    })

    it('works with different character widths', () => {
      render(<H proseMaxWidth={40}>Short heading</H>)
      const element = document.querySelector(
        '.dnb-h--xx-large'
      ) as HTMLElement

      expect(element.style.maxWidth).toBe('40ch')
    })

    it('works with size and proseMaxWidth together', () => {
      render(
        <H size="x-large" proseMaxWidth={100}>
          Large heading with width limit
        </H>
      )
      const element = document.querySelector(
        '.dnb-h--x-large'
      ) as HTMLElement

      expect(element.classList.contains('dnb-h--x-large')).toBe(true)
      expect(element.style.maxWidth).toBe('100ch')
    })

    it('applies proseMaxWidth as 60ch when true', () => {
      render(<H proseMaxWidth>Test heading</H>)
      const element = document.querySelector(
        '.dnb-h--xx-large'
      ) as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
    })
  })
})
