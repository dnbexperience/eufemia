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
import { question } from './test-files'

const props = fakeProps(require.resolve('../Icon'), {
  optional: true
})
props.icon = question
props.alt = 'question mark'
props.border = false

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

  it('should work with medium size', () => {
    const Comp = mount(<Component {...props} size="24" />)
    expect(Comp.find('span.dnb-icon').hasClass('dnb-icon--medium')).toBe(
      true
    )
    Comp.setProps({ size: 16 })
    expect(Comp.find('span.dnb-icon').hasClass('dnb-icon--default')).toBe(
      true
    )
  })

  it('should have border class', () => {
    const Comp = mount(<Component {...props} border="true" />)
    expect(Comp.find('span.dnb-icon').hasClass('dnb-icon--border')).toBe(
      true
    )
  })

  it('should work with custom size', () => {
    const Comp = mount(<Component {...props} size="100" />)
    expect(
      Comp.find('span.dnb-icon').hasClass('dnb-icon--custom-size')
    ).toBe(true)
    Comp.setProps({ size: 16 })
    expect(
      Comp.find('span.dnb-icon').hasClass('dnb-icon--custom-size')
    ).toBe(false)
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
