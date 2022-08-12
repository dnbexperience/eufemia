/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Slider from '../Slider'

import type { SliderProps } from '../Slider'

const props: SliderProps = {
  id: 'slider',
  status: null,
  min: 0,
  max: 100,
  value: 70,
  step: 10,
  number_format: { currency: true, decimals: 0 },
  label_direction: 'horizontal',
  global_status_id: 'main',
}

describe('Slider component', () => {
  it('have to match snapshot', () => {
    const { container } = render(<Slider {...props} />)
    expect(container.innerHTML).toMatchSnapshot()
  })

  it('has correct value on mouse move', () => {
    render(<Slider {...props} />)
    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    fireEvent.mouseDown(document.querySelector('[type="range"]'))
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(parseFloat(getButtonHelper().value)).toBe(props.value + 10)
  })

  it('has correct value on mouse move in vertical mode', () => {
    render(<Slider {...props} vertical />)

    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    fireEvent.mouseDown(document.querySelector('[type="range"]'))
    simulateMouseMove({ pageX: 80, pageY: 80, width: 10, height: 100 })

    expect(parseFloat(getButtonHelper().value)).toBe(20) // sice we use reverse in vertical mode
  })

  it('has correct value with reverse', () => {
    render(<Slider {...props} vertical reverse />)

    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    fireEvent.mouseDown(document.querySelector('[type="range"]'))
    simulateMouseMove({ pageX: 80, pageY: 80, width: 10, height: 100 })

    expect(parseFloat(getButtonHelper().value)).toBe(80)
  })

  it('has events that return a correct value', () => {
    const on_init = jest.fn()
    const on_change = jest.fn()

    render(<Slider {...props} on_init={on_init} on_change={on_change} />)

    fireEvent.mouseDown(document.querySelector('[type="range"]'))
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

    render(
      <Slider
        {...props}
        on_init={on_init}
        on_change={on_change}
        number_format={{ currency: true, decimals: 1 }}
      />
    )

    fireEvent.mouseDown(document.querySelector('[type="range"]'))
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

    expect(document.querySelector('.dnb-sr-only').textContent).toBe(
      '80,0 norske kroner'
    )
    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-labelledby')
    ).toContain(document.querySelector('.dnb-sr-only').getAttribute('id'))
  })

  it('should validate with ARIA rules', async () => {
    const Component = render(<Slider {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Slider scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-slider.scss'))
    expect(scss).toMatchSnapshot()
  })
})

const getButtonHelper = (): HTMLInputElement => {
  return document.querySelector('.dnb-slider__button-helper')
}

const simulateMouseMove = (props) => {
  const mouseMove = new CustomEvent('mousemove', {
    detail: props,
  })
  document.body.dispatchEvent(mouseMove)
}
