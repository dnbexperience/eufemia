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
import Component from '../P'
import { render } from '@testing-library/react'

const props = fakeProps(require.resolve('../P'), {
  optional: true,
})
props.size = 'x-small'
props.element = 'p'

describe('P element', () => {
  it('have to match default P element snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('has correct size when size is defined', () => {
    const { container } = render(<Component size="large" />)

    expect(
      container.firstChild.classList.contains('dnb-p__size--large')
    ).toBe(true)
  })
  it('has correct style when size and a modifier is defined', () => {
    const { container } = render(
      <Component size="medium" modifier="medium" />
    )
    expect(
      container.firstChild.classList.contains('dnb-p__size--medium')
    ).toBe(true)
    expect(container.firstChild.classList.contains('dnb-p--medium')).toBe(
      true
    )
  })
  it('has correct style when several modifiers are defined', () => {
    render(<Component modifier="medium small" />)
    const { container } = render(<Component modifier="medium small" />)
    expect(
      container.firstChild.classList.contains('dnb-p__size--small')
    ).toBe(true)
    expect(container.firstChild.classList.contains('dnb-p--medium')).toBe(
      true
    )
  })
  it('has correct style when medium is set to true', () => {
    const { container } = render(<Component medium />)
    expect(container.firstChild.classList.contains('dnb-p--medium')).toBe(
      true
    )
  })
  it('has correct style when bold is set to true', () => {
    const { container } = render(<Component bold />)
    expect(container.firstChild.classList.contains('dnb-p--bold')).toBe(
      true
    )
  })
  it('should validate with ARIA rules as a p element', async () => {
    const Comp = render(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
