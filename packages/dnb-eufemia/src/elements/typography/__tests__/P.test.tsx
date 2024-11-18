/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import P, { PProps } from '../P'
import { render } from '@testing-library/react'

const props: PProps = {
  size: 'x-small',
  element: 'p',
}

describe('P element', () => {
  it('has p element as default', () => {
    render(<P />)

    const element = document.querySelector('.dnb-p')
    expect(element.tagName).toBe('P')
  })

  it('has span element when nested', () => {
    render(
      <P>
        <P />
      </P>
    )

    const element = document.querySelector('.dnb-p > .dnb-p')
    expect(element.tagName).toBe('SPAN')
  })

  it('uses the given element when nested and defined', () => {
    const MockComponent = (props) => <strong {...props}>Mock</strong>

    render(
      <P>
        <P element={MockComponent} />
      </P>
    )

    const element = document.querySelector('.dnb-p > .dnb-p')
    expect(element.tagName).toBe('STRONG')
  })

  it('has correct size when size is defined', () => {
    render(<P size="large" />)
    const element = document.querySelector('.dnb-p__size--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-p__size--large',
    ])
  })

  it('has correct style when size and a modifier is defined', () => {
    render(<P size="medium" modifier="medium" />)
    const element = document.querySelector('.dnb-p__size--medium')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-p--medium',
      'dnb-p__size--medium',
    ])
  })

  it('has correct style when several modifiers are defined', () => {
    render(<P modifier="medium small" />)
    const element = document.querySelector('.dnb-p__size--small')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-p--medium',
      'dnb-p__size--small',
    ])
  })

  it('has correct style when medium is set to true', () => {
    render(<P medium />)
    const element = document.querySelector('.dnb-p--medium')
    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-p--medium',
    ])
  })

  it('has correct style when bold is set to true', () => {
    render(<P bold />)
    const element = document.querySelector('.dnb-p--bold')

    expect(Array.from(element.classList)).toEqual(['dnb-p', 'dnb-p--bold'])
  })

  it('should validate with ARIA rules as a p element', async () => {
    const Comp = render(<P {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
