/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Span from '../Span'
import { render } from '@testing-library/react'

describe('Span element', () => {
  it('size also sets line-height when not defined', () => {
    render(<Span size="large" />)
    const element = document.querySelector('.dnb-t__size--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t__line-height--large',
      'dnb-t__size--large',
      'dnb-span',
    ])
  })
  it('sets only line-height when size is not defined', () => {
    render(<Span lineHeight="large" />)
    const element = document.querySelector('.dnb-t__line-height--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t__line-height--large',
      'dnb-span',
    ])
  })
  it('has correct style when several modifiers are defined', () => {
    render(
      <Span
        size="small"
        lineHeight="xx-large"
        align="center"
        family="monospace"
        weight="medium"
        decoration="underline"
      />
    )
    const element = document.querySelector('.dnb-t__size--small')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t__line-height--xx-large',
      'dnb-t__size--small',
      'dnb-t__align--center',
      'dnb-t__family--monospace',
      'dnb-t__weight--medium',
      'dnb-t__decoration--underline',
      'dnb-span',
    ])
  })
  it('has correct style when medium is set to true', () => {
    render(<Span weight="bold" />)
    const element = document.querySelector('.dnb-t__weight--bold')
    expect(Array.from(element.classList)).toEqual([
      'dnb-t__weight--bold',
      'dnb-span',
    ])
  })
  it('should validate with ARIA rules as a span element', async () => {
    const Comp = render(<Span size="x-small" element="span" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLSpanElement>

    function MockComponent() {
      ref = React.useRef<HTMLSpanElement | null>(null)
      return <Span ref={ref}>content</Span>
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLSpanElement).toBe(true)
    expect(ref.current.tagName).toBe('SPAN')
    expect(ref.current.classList).toContain('dnb-span')
  })

  it('gets valid element when ref is function', () => {
    let refElement: HTMLSpanElement

    function refFn(elem: HTMLSpanElement) {
      refElement = elem
    }

    render(<Span ref={refFn}>content</Span>)

    expect(refElement instanceof HTMLSpanElement).toBe(true)
    expect(refElement.tagName).toBe('SPAN')
    expect(refElement.classList).toContain('dnb-span')
  })
})
