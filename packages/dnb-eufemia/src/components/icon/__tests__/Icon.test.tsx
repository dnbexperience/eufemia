/**
 * Icon Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Icon, { IconProps } from '../Icon'
import { question } from './test-files'

const props: IconProps = {
  icon: question,
  alt: 'question mark',
  'aria-hidden': null,
}

describe('Icon component', () => {
  it('renders with props as an object', () => {
    const props: IconProps = { icon: question }

    render(<Icon {...props} />)
    expect(document.querySelector('.dnb-icon')).toBeInTheDocument()
  })

  it('has valid width and height prop', () => {
    const width = '200'
    const height = '100'
    render(<Icon {...props} width={width} height={height} />)
    const elem = document.querySelector('svg')
    expect(elem).toBeInTheDocument()
    expect(elem.getAttribute('width')).toBe(width)
    expect(elem.getAttribute('height')).toBe(height)
  })

  it('should work with medium size', () => {
    const { rerender } = render(<Icon {...props} size="24" />)
    expect(document.querySelector('span.dnb-icon').classList).toContain(
      'dnb-icon--medium'
    )
    rerender(<Icon {...props} size={16} />)
    expect(document.querySelector('span.dnb-icon').classList).toContain(
      'dnb-icon--default'
    )
  })

  it('should return null if icon was given as null', () => {
    const { asFragment: asFragment1 } = render(<Icon icon={null} />)
    expect(asFragment1()).toMatchInlineSnapshot(`<DocumentFragment />`)

    const { asFragment: asFragment2 } = render(<Icon icon={undefined} />)
    expect(asFragment2()).toMatchInlineSnapshot(`<DocumentFragment />`)

    const { asFragment: asFragment3 } = render(<Icon icon={false} />)
    expect(asFragment3()).toMatchInlineSnapshot(`<DocumentFragment />`)

    const { asFragment: asFragment4 } = render(<Icon icon={''} />)
    expect(asFragment4()).toMatchInlineSnapshot(`<DocumentFragment />`)
  })

  it('should have border class', () => {
    render(<Icon {...props} border={true} />)
    expect(document.querySelector('span.dnb-icon').classList).toContain(
      'dnb-icon--border'
    )
  })

  it('should inherit color and vice versa when inherit_color is false', () => {
    const { rerender } = render(<Icon icon={question} />)
    expect(document.querySelector('span.dnb-icon').classList).toContain(
      'dnb-icon--inherit-color'
    )

    rerender(<Icon icon={question} inherit_color={true} />)

    expect(document.querySelector('span.dnb-icon').classList).toContain(
      'dnb-icon--inherit-color'
    )

    rerender(<Icon icon={question} inherit_color={false} />)

    expect(
      document.querySelector('span.dnb-icon').classList
    ).not.toContain('dnb-icon--inherit-color')
  })

  it('should not be hidden, given aria-hidden={false}', () => {
    render(<Icon {...props} aria-hidden={false} />)
    expect(
      document.querySelector('span.dnb-icon').getAttribute('aria-hidden')
    ).toBe('false')
  })

  it('should work with custom size', () => {
    const { rerender } = render(<Icon {...props} size="100" />)
    expect(document.querySelector('span.dnb-icon').classList).toContain(
      'dnb-icon--custom-size'
    )
    rerender(<Icon {...props} size={16} />)
    expect(
      document.querySelector('span.dnb-icon').classList
    ).not.toContain('dnb-icon--custom-size')
  })

  it('should set data-testid property based on the aria-label', () => {
    render(<Icon icon={question} aria-label="question icon" />)
    expect(
      document.querySelector('span.dnb-icon').getAttribute('data-testid')
    ).toBe('question icon')
  })

  it('should set data-testid when provided', () => {
    render(
      <Icon
        icon={question}
        aria-label="question icon"
        data-testid="custom-data-testid-value"
      />
    )
    expect(
      document.querySelector('span.dnb-icon').getAttribute('data-testid')
    ).toBe('custom-data-testid-value')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Icon {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Icon scss', () => {
  const css = loadScss(require.resolve('../style/deps.scss'))
  it('has to match style dependencies css', () => {
    expect(css).toMatchSnapshot()
  })
})
