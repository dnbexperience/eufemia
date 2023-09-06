/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Element, { defaultProps, ElementAllProps } from '../Element'
import { Provider } from '../../shared'

const props: ElementAllProps = {
  as: 'p',
  skeletonMethod: 'font',
  skeleton: true,
}

describe('Element', () => {
  it('have to merge className', () => {
    const { container } = render(
      <Element {...props} className="extra">
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'extra dnb-skeleton dnb-skeleton--font dnb-p'
    )
  })

  it('should support spacing props', () => {
    render(
      <Element as="p" top="medium">
        text
      </Element>
    )

    const element = document.querySelector('.dnb-p')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space__top--medium',
      'dnb-p',
    ])

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
  })

  it('should render children', () => {
    render(
      <Element as="p" top="medium">
        text
      </Element>
    )

    const element = document.querySelector('.dnb-p')

    expect(element.textContent).toBe('text')
  })

  it('have to support skeleton', () => {
    const { container, rerender } = render(
      <Element as="p" skeleton>
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'dnb-skeleton dnb-skeleton--font dnb-p'
    )

    rerender(
      <Element as="p" skeleton skeletonMethod="shape">
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'dnb-skeleton dnb-skeleton--shape dnb-p'
    )
  })

  it('have inherit skeleton prop from shared Provider', () => {
    const { container } = render(
      <Provider skeleton>
        <Element as="p" className="my-p">
          text
        </Element>
      </Provider>
    )

    const element = container.querySelector('.my-p')

    expect(element.getAttribute('class')).toBe(
      'my-p dnb-skeleton dnb-skeleton--font dnb-p'
    )

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'disabled', // because its a skeleton
      'aria-disabled', // because its a skeleton
      'aria-label', // because its a skeleton
    ])
  })

  it('does not have inner_ref null inside default props', () => {
    expect(defaultProps['inner_ref']).toBe(undefined)
  })

  it('should validate with ARIA rules as a Element element', async () => {
    const Component = render(<Element {...props}>text</Element>)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
