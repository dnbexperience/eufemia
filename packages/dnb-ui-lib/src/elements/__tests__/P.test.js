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
import Component from '../P'

const props = fakeProps(require.resolve('../P'), {
  optional: true
})
props.size = 'x-small'
props.element = 'p'

describe('P element', () => {
  it('have to match default P element snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('has correct size when size is defined', () => {
    const Comp = mount(<Component size="large" />)
    expect(Comp.find('.dnb-p__size--large').exists()).toBe(true)
  })
  it('has correct style when size and a modifier is defined', () => {
    const Comp = mount(<Component size="medium" modifier="medium" />)
    expect(Comp.find('.dnb-p__size--medium').exists()).toBe(true)
    expect(Comp.find('.dnb-p--medium').exists()).toBe(true)
  })
  it('has correct style when several modifiers are defined', () => {
    const Comp = mount(<Component modifier="medium small" />)
    expect(Comp.find('.dnb-p__size--small').exists()).toBe(true)
    expect(Comp.find('.dnb-p--medium').exists()).toBe(true)
  })
  it('has correct style when medium is set to true', () => {
    const Comp = mount(<Component medium />)
    expect(Comp.find('.dnb-p--medium').exists()).toBe(true)
  })
  it('has correct style when bold is set to true', () => {
    const Comp = mount(<Component bold />)
    expect(Comp.find('.dnb-p--bold').exists()).toBe(true)
  })
  it('should validate with ARIA rules as a p element', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
