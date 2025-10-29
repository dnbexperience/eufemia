/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Typography, { TypographyProps } from '../Typography'
import P from '../P'
import { render } from '@testing-library/react'

const props: TypographyProps = {
  size: 'medium',
  element: 'p',
}

describe('Typography element', () => {
  it('has p element as default', () => {
    render(<Typography />)

    const element = document.querySelector('.dnb-p')
    expect(element.tagName).toBe('P')
  })

  it('can set className', () => {
    render(<Typography className="my-class" weight="regular" />)
    const element = document.querySelector('.dnb-p')

    expect(element.classList.contains('dnb-p')).toBe(true)
    expect(element.classList.contains('my-class')).toBe(true)
    expect(element.classList.contains('dnb-t__weight--regular')).toBe(true)
  })

  it('has correct size and line height when size is defined', () => {
    render(<Typography size="large" />)
    const element = document.querySelector('.dnb-t__size--large')

    expect(element.classList.contains('dnb-p')).toBe(true)
    expect(element.classList.contains('dnb-t__line-height--large')).toBe(
      true
    )
    expect(element.classList.contains('dnb-t__size--large')).toBe(true)
  })

  it('should validate with ARIA rules as a p element', async () => {
    const Comp = render(<Typography {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  describe('proseMaxWidth', () => {
    it('applies proseMaxWidth style when provided', () => {
      render(<Typography proseMaxWidth={80}>Test text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('80ch')
    })

    it('does not apply proseMaxWidth style when not provided', () => {
      render(<Typography>Test text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('')
    })

    it('merges proseMaxWidth with existing styles', () => {
      render(
        <Typography proseMaxWidth={60} style={{ color: 'green' }}>
          Test text
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
      expect(element.style.color).toBe('green')
    })

    it('works with different character widths', () => {
      render(<Typography proseMaxWidth={40}>Short text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('40ch')
    })

    it('works with size and proseMaxWidth together', () => {
      render(
        <Typography size="x-large" proseMaxWidth={120}>
          Large text with width limit
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.classList.contains('dnb-p')).toBe(true)
      expect(
        element.classList.contains('dnb-t__line-height--x-large')
      ).toBe(true)
      expect(element.classList.contains('dnb-t__size--x-large')).toBe(true)
      expect(element.style.maxWidth).toBe('120ch')
    })

    it('works with all typography props and proseMaxWidth', () => {
      render(
        <Typography
          size="small"
          weight="bold"
          align="right"
          family="heading"
          decoration="underline"
          slant="italic"
          proseMaxWidth={90}
        >
          Styled text with width limit
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.classList.contains('dnb-p')).toBe(true)
      expect(element.classList.contains('dnb-t__line-height--small')).toBe(
        true
      )
      expect(element.classList.contains('dnb-t__size--small')).toBe(true)
      expect(element.classList.contains('dnb-t__align--right')).toBe(true)
      expect(element.classList.contains('dnb-t__family--heading')).toBe(
        true
      )
      expect(element.classList.contains('dnb-t__weight--bold')).toBe(true)
      expect(
        element.classList.contains('dnb-t__decoration--underline')
      ).toBe(true)
      expect(element.classList.contains('dnb-t__slant--italic')).toBe(true)
      expect(element.style.maxWidth).toBe('90ch')
    })

    it('works with custom element and proseMaxWidth', () => {
      render(
        <Typography element="span" proseMaxWidth={50}>
          Span text with width limit
        </Typography>
      )
      const element = document.querySelector('.dnb-span') as HTMLElement

      expect(element.tagName).toBe('SPAN')
      expect(element.style.maxWidth).toBe('50ch')
    })
  })

  describe('Typography.Provider', () => {
    it('applies proseMaxWidth from Provider to Typography children', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography>Text with context width</Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('80ch')
    })

    it('uses prop value over Provider value when both are provided', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography proseMaxWidth={120}>
            Text with explicit width
          </Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('120ch')
    })

    it('applies to multiple Typography children', () => {
      render(
        <Typography.Provider proseMaxWidth={70}>
          <Typography>First paragraph</Typography>
          <Typography>Second paragraph</Typography>
        </Typography.Provider>
      )
      const elements = document.querySelectorAll(
        '.dnb-p'
      ) as NodeListOf<HTMLElement>

      expect(elements.length).toBe(2)
      elements.forEach((element) => {
        expect(element.style.maxWidth).toBe('70ch')
      })
    })

    it('supports nested Providers with different values', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography>Outer paragraph</Typography>
          <Typography.Provider proseMaxWidth={60}>
            <Typography>Inner paragraph</Typography>
          </Typography.Provider>
        </Typography.Provider>
      )

      const outerElement = document.querySelectorAll(
        '.dnb-p'
      )[0] as HTMLElement
      const innerElement = document.querySelectorAll(
        '.dnb-p'
      )[1] as HTMLElement

      expect(outerElement.style.maxWidth).toBe('80ch')
      expect(innerElement.style.maxWidth).toBe('60ch')
    })

    it('inner Provider overrides outer Provider', () => {
      render(
        <Typography.Provider proseMaxWidth={100}>
          <Typography>Outer paragraph</Typography>
          <Typography.Provider proseMaxWidth={50}>
            <Typography>Inner paragraph</Typography>
          </Typography.Provider>
        </Typography.Provider>
      )

      const outerElement = document.querySelectorAll(
        '.dnb-p'
      )[0] as HTMLElement
      const innerElement = document.querySelectorAll(
        '.dnb-p'
      )[1] as HTMLElement

      expect(outerElement.style.maxWidth).toBe('100ch')
      expect(innerElement.style.maxWidth).toBe('50ch')
    })

    it('works with mixed Typography and P components', () => {
      render(
        <Typography.Provider proseMaxWidth={75}>
          <Typography>Typography component</Typography>
          <P>Paragraph component</P>
        </Typography.Provider>
      )

      const typographyElement = document.querySelectorAll(
        '.dnb-p'
      )[0] as HTMLElement
      const pElement = document.querySelectorAll(
        '.dnb-p'
      )[1] as HTMLElement

      expect(typographyElement.style.maxWidth).toBe('75ch')
      expect(pElement.style.maxWidth).toBe('75ch')
    })

    it('does not apply maxWidth when Provider value is undefined', () => {
      render(
        <Typography.Provider>
          <Typography>No width limit</Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('')
    })
  })
})
