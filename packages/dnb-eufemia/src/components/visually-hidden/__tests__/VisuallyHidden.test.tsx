import React from 'react'
import { render } from '@testing-library/react'
import VisuallyHidden, { VisuallyHiddenAllProps } from '../VisuallyHidden'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('VisuallyHidden', () => {
  it('renders with props as an object', () => {
    const props: VisuallyHiddenAllProps = {}
    render(<VisuallyHidden {...props} />)

    expect(
      document.querySelector('.dnb-visually-hidden')
    ).toBeInTheDocument()
  })

  it('renders without properties', () => {
    render(<VisuallyHidden />)

    expect(
      document.querySelector('.dnb-visually-hidden')
    ).toBeInTheDocument()
  })

  it('renders the content by children prop', () => {
    render(<VisuallyHidden>children</VisuallyHidden>)

    expect(
      document.querySelector('.dnb-visually-hidden')
    ).toBeInTheDocument()
  })

  it('renders the default className', () => {
    const defaultClassName = 'dnb-visually-hidden dnb-sr-only'

    render(<VisuallyHidden>ClassName</VisuallyHidden>)
    expect(
      document.querySelector('.dnb-visually-hidden').className
    ).toMatch(defaultClassName)
  })

  it('renders with className if className is provided', () => {
    const customClassName = 'custom-class'

    render(
      <VisuallyHidden className={customClassName}>
        ClassName
      </VisuallyHidden>
    )
    expect(
      document.querySelector('.dnb-visually-hidden').className
    ).toMatch(customClassName)
  })

  it('renders with the correct attributes if focusable is true', () => {
    const focusableClassName = 'focusable'

    render(<VisuallyHidden focusable>focusable</VisuallyHidden>)
    expect(
      document.querySelector('.dnb-visually-hidden').className
    ).toMatch(focusableClassName)
  })

  it('renders with span as the default element', () => {
    render(<VisuallyHidden>I'm a span</VisuallyHidden>)
    expect(document.querySelector('span') instanceof HTMLElement).toBe(
      true
    )
  })

  it('supports inline styling', () => {
    render(<VisuallyHidden style={{ color: 'red' }} />)
    expect(
      document.querySelector('.dnb-visually-hidden').getAttribute('style')
    ).toBe('color: red;')
  })

  it('renders with custom HTML element', () => {
    render(<VisuallyHidden element="div">I'm a div</VisuallyHidden>)
    expect(document.querySelector('div') instanceof HTMLElement).toBe(true)
  })

  it('renders with provider', () => {
    render(
      <Provider locale="en-GB">
        <VisuallyHidden>Provider</VisuallyHidden>
      </Provider>
    )

    expect(
      document.querySelector('.dnb-visually-hidden')
    ).toBeInTheDocument()
  })

  describe('VisuallyHidden aria', () => {
    it('should validate', async () => {
      const Component = render(<VisuallyHidden>Aria</VisuallyHidden>)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('VisuallyHidden scss', () => {
    it('has to match style dependencies css', () => {
      const css = loadScss(require.resolve('../style/deps.scss'))
      expect(css).toMatchSnapshot()
    })
  })
})
