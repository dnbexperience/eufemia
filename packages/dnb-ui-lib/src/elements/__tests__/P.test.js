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
    expect(Comp.find('.dnb-p--large').exists()).toBe(true)
  })
  it('should validate with ARIA rules as a p element', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
