/**
 * Element Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
} from '../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Element, { defaultProps } from '../Element'

const props = fakeProps(require.resolve('../Element'), {
  optional: true,
})
props.as = 'p'
props.inner_ref = null
props.internalClass = null
props.skeleton_method = 'font'

describe('Element', () => {
  it('have to match default Element snapshot', () => {
    const Comp = mount(<Element {...props}>text</Element>)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to merge className', () => {
    const { container } = render(
      <Element {...props} className="extra">
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'extra class css dnb-skeleton dnb-skeleton--font dnb-p'
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
      <Element as="p" skeleton skeleton_method="shape">
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'dnb-skeleton dnb-skeleton--shape dnb-p'
    )
  })

  it('supports deprecated "is"', () => {
    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Element is="p">text</Element>
    )

    expect(container.querySelector('p')).toBeTruthy()
  })

  it('does not have inner_ref null inside default propes', () => {
    expect(defaultProps['inner_ref']).toBe(undefined)
  })

  it('should validate with ARIA rules as a Element element', async () => {
    const Component = render(<Element {...props}>text</Element>)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
