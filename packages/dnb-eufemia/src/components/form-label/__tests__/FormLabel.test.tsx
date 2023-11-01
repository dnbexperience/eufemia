/**
 * FormLabel Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import FormLabel from '../FormLabel'
import Input from '../../input/Input'
import { Provider } from '../../../shared'

describe('FormLabel component', () => {
  it('should forward unlisted attributes like "aria-hidden"', () => {
    render(<FormLabel forId="input" aria-hidden />)
    expect(
      document.querySelector('label[aria-hidden]')
    ).toBeInTheDocument()
    expect(document.querySelector('label[aria-hidden]')).toHaveAttribute(
      'aria-hidden'
    )
  })

  it('should support spacing props', () => {
    render(<FormLabel forId="input" top="large" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-space__top--large',
    ])
  })

  it('should set correct class when srOnly is set', () => {
    render(<FormLabel forId="input" srOnly />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-sr-only',
    ])
  })

  it('should set correct for id', () => {
    render(<FormLabel forId="unique-id" />)

    const element = document.querySelector('.dnb-form-label')

    expect(element.getAttribute('for')).toBe('unique-id')
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <FormLabel />
      </Provider>
    )

    const element = document.querySelector('.dnb-form-label')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-form-label--vertical',
    ])
  })

  it('should support heading size prop', () => {
    const { rerender } = render(
      <FormLabel size="medium">content</FormLabel>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--medium'
    )

    rerender(<FormLabel size="large">content</FormLabel>)

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--large'
    )
  })

  it('should use label element by default', () => {
    render(<FormLabel>content</FormLabel>)

    expect(document.querySelector('.dnb-form-label').tagName).toBe('LABEL')
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <FormLabel innerRef={ref}>content</FormLabel>
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLLabelElement).toBe(true)
    expect(ref.current.tagName).toBe('LABEL')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <FormLabel title="Title" text="Label" forId="input" />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a label with a input', async () => {
    const Comp = render(
      <>
        <FormLabel text="Text" forId="input" />
        <Input id="input" value="some value" />
      </>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormLabel scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-form-label-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
