/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Slider'

const props = fakeProps(require.resolve('../Slider'), {
  optional: true
})
props.status = null
props.min = 0
props.max = 100
props.value = 70
props.step = 10
props.label_direction = 'horizontal'

describe('Slider component', () => {
  const Comp = mount(<Component {...props} />)

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct value after mouse move', () => {
    expect(Comp.state().value).toBe(props.value)

    // Comp.find('[role="slider"]').simulate('mousedown')
    Comp.find('[type="range"]').simulate('mousedown')
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(Comp.state().value).toBe(props.value + 10)
  })

  it('has correct value after mouse move in vertical mode', () => {
    const Comp = mount(<Component {...props} vertical />)

    expect(Comp.state().value).toBe(props.value)

    // Comp.find('[role="slider"]').simulate('mousedown')
    Comp.find('[type="range"]').simulate('mousedown')
    simulateMouseMove({ pageX: 80, pageY: 80, width: 10, height: 100 })

    // sice we use reverse in vertical mode
    expect(Comp.state().value).toBe(20)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Slider scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-slider.scss'))
    expect(scss).toMatchSnapshot()
  })
})

const simulateMouseMove = (props) => {
  const mouseMove = new CustomEvent('mousemove', {
    detail: props
  })
  document.body.dispatchEvent(mouseMove)
}
