/**
 * FormLabel Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
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

  it('should have default spacing', () => {
    const { rerender } = render(<FormLabel forId="input" text="Label" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toContain(
      'dnb-space__right--small'
    )

    rerender(<FormLabel forId="input" text="Label" />)

    expect(Array.from(element.classList)).not.toContain('dnb-space__right')
  })

  it('should support spacing props', () => {
    render(<FormLabel forId="input" top="large" text="Label" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toContain(
      'dnb-space__top--large'
    )
  })

  it('should remove spacing props when no label was given', () => {
    render(<FormLabel forId="input" top="large" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).not.toContain('dnb-space')
  })

  it('should set correct class when srOnly is set', () => {
    render(<FormLabel forId="input" srOnly />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toContain('dnb-sr-only')
    expect(Array.from(element.classList)).not.toContain(
      'dnb-form-label--interactive'
    )
  })

  it('should not have "--interactive" class when disabled', () => {
    render(<FormLabel forId="input" disabled />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).not.toContain(
      'dnb-form-label--interactive'
    )
  })

  it('should have "--interactive" when forId or onClick was given', () => {
    const { rerender } = render(<FormLabel forId="input" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toContain(
      'dnb-form-label--interactive'
    )

    rerender(<FormLabel onClick={() => null} />)

    expect(Array.from(element.classList)).toContain(
      'dnb-form-label--interactive'
    )
  })

  it('should set correct for id', () => {
    render(<FormLabel forId="unique-id" />)

    const element = document.querySelector('.dnb-form-label')

    expect(element.getAttribute('for')).toBe('unique-id')
  })

  /** @deprecated can be removed in v11 */
  it('should inherit formElement label_direction', () => {
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

  it('should inherit formElement labelDirection', () => {
    render(
      <Provider formElement={{ labelDirection: 'vertical' }}>
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

  it('should support vertical class', () => {
    render(<FormLabel vertical />)

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

  describe('nested', () => {
    it('gets valid ref element', () => {
      let refA: React.RefObject<HTMLInputElement>
      let refB: React.RefObject<HTMLInputElement>

      function MockComponent() {
        refA = React.useRef()
        refB = React.useRef()
        return (
          <FormLabel
            innerRef={refA}
            text={
              <FormLabel element="legend" innerRef={refB}>
                content
              </FormLabel>
            }
          />
        )
      }

      render(<MockComponent />)

      expect(refA.current).toBeUndefined()
      expect(refB.current instanceof HTMLLegendElement).toBe(true)
      expect(refB.current.tagName).toBe('LEGEND')
    })

    it('should use correct element', () => {
      render(
        <FormLabel
          className="original"
          text={
            <FormLabel element="legend" className="nested">
              content
            </FormLabel>
          }
        />
      )

      const elements = document.querySelectorAll('.dnb-form-label')
      expect(elements).toHaveLength(1)

      const element = elements[0]
      expect(element.tagName).toBe('LEGEND')
    })

    it('should contain correct content', () => {
      render(
        <FormLabel
          text={<FormLabel text="nested">use "text" instead</FormLabel>}
        />
      )

      const elements = document.querySelectorAll('.dnb-form-label')
      expect(elements).toHaveLength(1)

      const element = elements[0]
      expect(element).toHaveTextContent('nested')
    })

    it('should contain correct className', () => {
      render(
        <FormLabel
          className="original"
          text={<FormLabel className="nested">content</FormLabel>}
        />
      )

      const elements = document.querySelectorAll('.dnb-form-label')
      expect(elements).toHaveLength(1)

      const element = elements[0]
      expect(element).toHaveClass(
        'dnb-form-label dnb-space__right--small nested'
      )
    })

    it('should update label content', () => {
      const { rerender } = render(<FormLabel text="My awesome label" />)

      const label = () => document.querySelector('.dnb-form-label')

      expect(label()).toHaveTextContent('My awesome label')

      rerender(<FormLabel text="New label" />)

      expect(label()).toHaveTextContent('New label')
    })

    it('should update legend', () => {
      const { rerender } = render(<FormLabel element="legend" />)

      const label = () => document.querySelector('.dnb-form-label')

      expect(label().tagName).toBe('LEGEND')

      rerender(<FormLabel />)

      expect(label().tagName).toBe('LABEL')
    })
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

  describe('hover handling', () => {
    it('should set hover class when hovered', () => {
      render(
        <>
          <FormLabel forId="input" />
          <input type="text" id="input" className="dnb-input__border" />
        </>
      )

      const label = document.querySelector('label')
      const input = document.querySelector('input')
      expect(input).not.toHaveClass('hover')

      fireEvent.mouseEnter(label)
      expect(input).toHaveClass('hover')

      fireEvent.mouseLeave(label)
      expect(input).not.toHaveClass('hover')
    })

    it('should not set hover class when "dnb-input__border" is not present', () => {
      render(
        <>
          <FormLabel forId="input" />
          <input type="text" id="input" />
        </>
      )

      const label = document.querySelector('label')
      const input = document.querySelector('input')
      expect(input).not.toHaveClass('hover')

      fireEvent.mouseEnter(label)
      expect(input).not.toHaveClass('hover')
    })

    it('should remove hover class when hovering on a button inside the label', () => {
      render(
        <>
          <FormLabel forId="input">
            <button>Button</button>
          </FormLabel>
          <input type="text" id="input" className="dnb-input__border" />
        </>
      )

      const label = document.querySelector('label')
      const input = document.querySelector('input')
      const button = document.querySelector('button')
      expect(input).not.toHaveClass('hover')

      fireEvent.mouseEnter(label)
      expect(input).toHaveClass('hover')

      fireEvent.mouseEnter(button)
      expect(input).not.toHaveClass('hover')

      fireEvent.mouseLeave(button)
      expect(input).toHaveClass('hover')

      fireEvent.mouseLeave(label)
      expect(input).not.toHaveClass('hover')
    })

    it('should remove events from label and button when unmounting', () => {
      const { unmount } = render(
        <>
          <FormLabel forId="input">
            <button>Button</button>
          </FormLabel>
          <input type="text" id="input" className="dnb-input__border" />
        </>
      )

      const label = document.querySelector('label')
      const input = document.querySelector('input')
      const button = document.querySelector('button')
      expect(input).not.toHaveClass('hover')

      fireEvent.mouseEnter(label)
      expect(input).toHaveClass('hover')

      fireEvent.mouseEnter(button)
      expect(input).not.toHaveClass('hover')

      unmount()

      // When emitting these events, "hover" would normally be set.
      fireEvent.mouseEnter(label)
      expect(input).not.toHaveClass('hover')
      fireEvent.mouseLeave(button)
      expect(input).not.toHaveClass('hover')
    })
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
