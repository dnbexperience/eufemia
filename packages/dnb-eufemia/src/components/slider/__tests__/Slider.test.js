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
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../Slider'

const props = fakeProps(require.resolve('../Slider'), {
  optional: true,
})
props.status = null
props.min = 0
props.max = 100
props.value = 70
props.step = 10
props.number_format = { currency: true, decimals: 0 }
props.label_direction = 'horizontal'
props.global_status_id = 'main'

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

  it('has events that return a correct value', () => {
    const on_init = jest.fn()
    const on_change = jest.fn()
    const Comp = mount(
      <Component {...props} on_init={on_init} on_change={on_change} />
    )

    Comp.find('[type="range"]').simulate('mousedown')
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(on_init).toBeCalledTimes(1)
    expect(on_change).toBeCalledTimes(1)

    const initObject = {
      value: 70,
      number: '70 kr',
    }
    expect(on_init).toBeCalledWith(initObject)

    const changeObject = {
      // We may use new MouseEvent('mousedown', in future
      event: {
        height: 10,
        pageX: 80,
        width: 100,
      },
      height: 10,
      pageX: 80,
      rawValue: 80,
      raw_value: 80,
      value: 80,
      number: '80 kr',
      width: 100,
    }
    expect(on_change).toBeCalledWith(changeObject)
  })

  it('return valid value if number_format was given', () => {
    const on_init = jest.fn()
    const on_change = jest.fn()
    const Comp = mount(
      <Component
        {...props}
        on_init={on_init}
        on_change={on_change}
        number_format={{ currency: true, decimals: 1 }}
      />
    )

    Comp.find('[type="range"]').simulate('mousedown')
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(on_init).toBeCalledTimes(1)
    expect(on_change).toBeCalledTimes(1)

    const initObject = {
      value: 70,
      number: '70,0 kr',
    }
    expect(on_init).toBeCalledWith(initObject)

    const changeObject = {
      // We may use new MouseEvent('mousedown', in future
      event: {
        height: 10,
        pageX: 80,
        width: 100,
      },
      height: 10,
      pageX: 80,
      rawValue: 80,
      raw_value: 80,
      value: 80,
      number: '80,0 kr',
      width: 100,
    }
    expect(on_change).toBeCalledWith(changeObject)

    expect(Comp.find('.dnb-sr-only').text()).toBe('80,0 norske kroner')
    expect(
      Comp.find('.dnb-slider__button-helper').props()['aria-labelledby']
    ).toContain(Comp.find('.dnb-sr-only').props().id)
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
    detail: props,
  })
  document.body.dispatchEvent(mouseMove)
}
