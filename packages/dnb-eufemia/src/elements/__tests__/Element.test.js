/**
 * Element Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent
} from '../../core/jest/jestSetup'
import Component from '../Element'

const props = fakeProps(require.resolve('../Element'), {
  optional: true
})
props.is = 'p'

describe('Element', () => {
  it('have to match default Element snapshot', () => {
    const Comp = mount(<Component {...props}>text</Component>)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('does not have inner_ref null inside default propes', () => {
    expect(props.inner_ref).toBe(undefined)
  })
  it('should validate with ARIA rules as a Element element', async () => {
    const Comp = mount(<Component {...props}>text</Component>)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
