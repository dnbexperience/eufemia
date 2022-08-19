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
  label: 'Label',
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
  it('has correct value on mouse move', () => {
    render(<Slider {...props} />)
    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    fireEvent.mouseDown(document.querySelector('[type="range"]'))
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    const value = props.value as number
    expect(parseFloat(getButtonHelper().value)).toBe(value + 10)
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

  it('buttons add/subtract have correct labels', () => {
    render(
      <Slider
        {...props}
        hide_buttons={false}
        number_format={{ currency: true, decimals: 1 }}
      />
    )

    const addElem = document.querySelector('.dnb-slider__button--add')
    const subtractElem = document.querySelector(
      '.dnb-slider__button--subtract'
    )

    fireEvent.click(addElem)
    expect(parseFloat(getButtonHelper().value)).toBe(80)
    expect(addElem.getAttribute('aria-label')).toBe(
      'Øk (80,0 norske kroner)'
    )

    fireEvent.click(subtractElem)
    expect(parseFloat(getButtonHelper().value)).toBe(70)
    expect(subtractElem.getAttribute('aria-label')).toBe(
      'Reduser (70,0 norske kroner)'
    )
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

    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-valuetext')
    ).toBe('80,0 norske kroner')
  })

  describe('multi thumb', () => {
    const resetMouseSimulation = () => {
      fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
    }

    it('supports array value', () => {
      const on_change = jest.fn()

      props.value = [20, 30, 90]
      render(
        <Slider
          {...props}
          number_format={{ currency: true, decimals: 1 }}
          on_change={on_change}
        />
      )

      const getRangeElements = (index: number) =>
        document.querySelectorAll('[type="range"]')[
          index
        ] as HTMLInputElement

      fireEvent.mouseDown(document.querySelector('.dnb-slider__track'))

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(parseFloat(getRangeElements(2).value)).toBe(80)

      expect(on_change).toBeCalledWith({
        event: {
          height: 10,
          pageX: 80,
          width: 100,
        },
        height: 10,
        pageX: 80,
        rawValue: 80,
        raw_value: 80,
        value: [20, 30, 80],
        number: '80,0 kr',
        width: 100,
      })

      fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
      fireEvent.mouseDown(document.querySelector('.dnb-slider__track'))

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })

      expect(on_change).toBeCalledWith({
        event: {
          height: 10,
          pageX: 10,
          width: 100,
        },
        height: 10,
        pageX: 10,
        rawValue: 10,
        raw_value: 10,
        value: [10, 30, 80],
        number: '10,0 kr',
        width: 100,
      })

      fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
      fireEvent.mouseDown(getRangeElements(1))

      simulateMouseMove({ pageX: 40, width: 100, height: 10 })

      expect(on_change.mock.calls[2][0].value).toEqual([10, 40, 80])

      resetMouseSimulation()
    })

    it('sets correct inline styles', () => {
      props.value = [20, 30, 90]
      render(
        <Slider
          {...props}
          number_format={{ currency: true, decimals: 1 }}
        />
      )

      const getThumbElements = (index: number) =>
        document.querySelectorAll('.dnb-slider__thumb')[
          index
        ] as HTMLElement

      const activateMouse = () => {
        fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
        fireEvent.mouseDown(document.querySelector('.dnb-slider__track'))
      }

      activateMouse()

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 4; left: 80%;'
      )

      activateMouse()

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 10%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 3; left: 80%;'
      )

      activateMouse()

      simulateMouseMove({ pageX: 50, width: 100, height: 10 })
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 4; left: 50%;'
      )
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 10%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 3; left: 80%;'
      )

      resetMouseSimulation()
    })
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
