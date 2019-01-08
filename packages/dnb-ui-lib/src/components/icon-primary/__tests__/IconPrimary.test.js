/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent
} from '../../../core/jest/jestSetup'
import Component from '../IconPrimary'

const props = fakeProps(require.resolve('../../icon/IconPrimary'), {
  optional: true
})
props.icon = 'question'
props.size = null

describe('IconPrimary component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has valid width and height prop', () => {
    const width = 200
    const height = 100
    const Comp = mount(
      <Component {...props} width={width} height={height} />
    )
    const elem = Comp.find('svg')
    expect(elem.exists()).toBe(true)
    expect(elem.props().width).toBe(width)
    expect(elem.props().height).toBe(height)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
