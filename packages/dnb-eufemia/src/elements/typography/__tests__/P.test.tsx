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

  describe('deprecated behavior', () => {
    it('can set className and modifier', () => {
      render(<P className="my-class" modifier="my-modifier" />)
      const element = document.querySelector('.dnb-p')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-p--my-modifier',
        'my-class',
      ])
    })
    it('has correct style when size and a modifier is defined', () => {
      render(<P size="medium" modifier="medium" />)
      const element = document.querySelector('.dnb-t__size--medium')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--medium',
        'dnb-t__size--medium',
        'dnb-t__weight--medium',
      ])
    })
    it('has correct style when several modifiers are defined', () => {
      render(<P modifier="medium small" />)
      const element = document.querySelector('.dnb-t__size--small')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--small',
        'dnb-t__size--small',
        'dnb-t__weight--medium',
      ])
    })
    it('has correct style when several modifiers conflict', () => {
      render(<P modifier="medium bold x-small small" />)
      const element = document.querySelector('.dnb-t__size--x-small')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--x-small',
        'dnb-t__size--x-small',
        'dnb-t__weight--bold',
      ])
    })
    it('has correct style when medium is set to true', () => {
      render(<P medium />)
      const element = document.querySelector('.dnb-t__weight--medium')
      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__weight--medium',
      ])
    })

    it('has correct style when bold is set to true', () => {
      render(<P bold />)
      const element = document.querySelector('.dnb-t__weight--bold')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__weight--bold',
      ])
    })
  })
})
