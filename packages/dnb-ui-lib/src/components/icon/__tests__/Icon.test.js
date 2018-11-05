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
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Icon'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-icon.scss'
import { question } from './test-files'

const props = fakeProps(require.resolve('../Icon'), {
  optional: true
})
props.icon = question

describe('Icon component', () => {
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

describe('Icon scss', () => {
  const scss = loadScss(require.resolve('../style/dnb-icon.scss'))
  it('have to match snapshot', () => {
    expect(scss).toMatchSnapshot()
  })
})
