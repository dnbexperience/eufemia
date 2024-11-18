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
      'dnb-t__line--large',
      'dnb-t__size--large',
      'dnb-span',
    ])
  })
  it('sets only line-height when size is not defined', () => {
    render(<Span line="large" />)
    const element = document.querySelector('.dnb-t__line--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t__line--large',
      'dnb-span',
    ])
  })
  it('has correct style when several modifiers are defined', () => {
    render(
      <Span
        size="small"
        line="xx-large"
        align="center"
        family="monospace"
        weight="medium"
        decoration="underline"
      />
    )
    const element = document.querySelector('.dnb-t__size--small')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t__line--xx-large',
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
})
