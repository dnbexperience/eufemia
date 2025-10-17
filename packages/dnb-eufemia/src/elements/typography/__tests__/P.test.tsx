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

  it('can set className', () => {
    render(<P className="my-class" weight="regular" />)
    const element = document.querySelector('.dnb-p')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'my-class',
      'dnb-t__weight--regular',
    ])
  })

  it('has correct size and line height when size is defined', () => {
    render(<P size="large" />)
    const element = document.querySelector('.dnb-t__size--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-t__line-height--large',
      'dnb-t__size--large',
    ])
  })

  it('has correct style when bold is set to true', () => {
    render(<P weight="bold" />)
    const element = document.querySelector('.dnb-t__weight--bold')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-t__weight--bold',
    ])
  })

  it('has correct style when several modifiers are defined', () => {
    render(
      <P
        size="small"
        lineHeight="xx-large"
        align="center"
        family="monospace"
        weight="medium"
        decoration="underline"
      />
    )
    const element = document.querySelector('.dnb-p')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-t__line-height--xx-large',
      'dnb-t__size--small',
      'dnb-t__align--center',
      'dnb-t__family--monospace',
      'dnb-t__weight--medium',
      'dnb-t__decoration--underline',
    ])
  })

  it('should validate with ARIA rules as a p element', async () => {
    const Comp = render(<P {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
