/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
} from '../../../core/jest/jestSetup'
import Component from '../IconPrimary'

const props = fakeProps(require.resolve('../IconPrimary'), {
  optional: true,
})
props.icon = 'question'

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
    expect(elem.props().viewBox).toBe('0 0 16 16')
  })

  it('has valid medium size as enum', () => {
    // here we explicit set size="medium" as well, cause we then test that the loadSVG makes a good job
    const Comp = mount(
      <Component {...props} icon="question_medium" size="medium" />
    )
    const svg = Comp.find('svg')
    const path = svg.find('path')
    expect(svg.exists()).toBe(true)
    expect(path.exists()).toBe(true)
    expect(svg.props().viewBox).toBe('0 0 24 24')
  })

  it('has valid medium size as int', () => {
    // here we explicit set size="medium" as well, cause we then test that the loadSVG makes a good job
    const Comp = mount(
      <Component {...props} icon="question_medium" size="24" />
    )
    const svg = Comp.find('svg')
    const path = svg.find('path')
    expect(svg.exists()).toBe(true)
    expect(path.exists()).toBe(true)
    expect(svg.props().viewBox).toBe('0 0 24 24')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
