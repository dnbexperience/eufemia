import React from 'react'
import { render, screen } from '@testing-library/react'
import VisuallyHidden from '../VisuallyHidden'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('VisuallyHidden', () => {
  it('renders without properties', () => {
    render(<VisuallyHidden />)

    expect(screen.queryByTestId('visually-hidden')).not.toBeNull()
  })

  it('renders the content by children prop', () => {
    render(<VisuallyHidden>children</VisuallyHidden>)

    expect(screen.queryByTestId('visually-hidden')).not.toBeNull()
  })

  it('renders the default className', () => {
    const defaultClassName = 'default'

    render(<VisuallyHidden>ClassName</VisuallyHidden>)
    expect(screen.queryByTestId('visually-hidden').className).toMatch(
      defaultClassName
    )
  })

  it('renders with className if className is provided', () => {
    const customClassName = 'custom-class'

    render(
      <VisuallyHidden className={customClassName}>
        ClassName
      </VisuallyHidden>
    )
    expect(screen.queryByTestId('visually-hidden').className).toMatch(
      customClassName
    )
  })

  it('renders with the correct attributes if focusable is true', () => {
    const focusableClassName = 'focusable'

    render(<VisuallyHidden focusable>focusable</VisuallyHidden>)
    expect(screen.queryByTestId('visually-hidden').className).toMatch(
      focusableClassName
    )
  })

  it('renders with custom HTML element', () => {
    render(<VisuallyHidden element="span">Span</VisuallyHidden>)
    expect(document.querySelector('span') instanceof HTMLElement).toBe(
      true
    )
  })

  it('renders with provider', () => {
    render(
      <Provider locale="en-GB">
        <VisuallyHidden>Provider</VisuallyHidden>
      </Provider>
    )

    expect(screen.queryByTestId('visually-hidden')).not.toBeNull()
  })

  describe('VisuallyHidden aria', () => {
    it('should validate', async () => {
      const Component = render(<VisuallyHidden>Aria</VisuallyHidden>)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('VisuallyHidden scss', () => {
    it('have to match snapshot', () => {
      const scss = loadScss(
        require.resolve('../style/dnb-visually-hidden.scss')
      )
      expect(scss).toMatchSnapshot()
    })
  })
})
