/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Span from '../Span'
import { render } from '@testing-library/react'

describe('Span element', () => {
  it('has correct size when size is defined', () => {
    render(<Span size="large" />)
    const element = document.querySelector('.dnb-t__size--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t__size--large',
      'dnb-span',
    ])
  })
  it('has correct style when size and a modifier is defined', () => {
    render(<Span size="medium" modifier="medium" />)
    const element = document.querySelector('.dnb-t__size--medium')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t--medium',
      'dnb-t__size--medium',
      'dnb-span',
    ])
  })
  it('has correct style when several modifiers are defined', () => {
    render(<Span modifier="medium small" />)
    const element = document.querySelector('.dnb-t__size--small')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t--medium',
      'dnb-t__size--small',
      'dnb-span',
    ])
  })
  it('has correct style when medium is set to true', () => {
    render(<Span medium />)
    const element = document.querySelector('.dnb-t--medium')
    expect(Array.from(element.classList)).toEqual([
      'dnb-t--medium',
      'dnb-span',
    ])
  })
  it('has correct style when bold is set to true', () => {
    render(<Span bold />)
    const element = document.querySelector('.dnb-t--bold')

    expect(Array.from(element.classList)).toEqual([
      'dnb-t--bold',
      'dnb-span',
    ])
  })
  it('should validate with ARIA rules as a span element', async () => {
    const Comp = render(<Span size="x-small" element="span" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
