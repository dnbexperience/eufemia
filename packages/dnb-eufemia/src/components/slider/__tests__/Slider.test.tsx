/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render, act } from '@testing-library/react'
import Slider, { SliderMarker } from '../Slider'

import type { SliderAllProps, onChangeEventProps } from '../Slider'
import { format } from '../../number-format/NumberUtils'
import { Provider } from '../../../shared'

const props: SliderAllProps = {
  id: 'slider',
  label: 'Label',
  min: 0,
  max: 100,
  value: 70,
  step: 10,
  numberFormat: null,
  labelDirection: 'horizontal',
}

describe('Slider component', () => {
  afterEach(() => {
    resetMouseSimulation()
  })

  const getThumbElements = (index: number) =>
    document.querySelectorAll('.dnb-slider__thumb')[index] as HTMLElement

  const getTooltipElements = (index: number) =>
    document.querySelectorAll('.dnb-tooltip')[index] as HTMLElement

  const getRangeElement = (index: number) =>
    document.querySelectorAll('[type="range"]')[index] as HTMLInputElement

  it('supports snake_case props', () => {
    const props: SliderAllProps = {
      id: 'slider',
      label: 'Label',
      label_direction: 'vertical',
      value: 70,
      number_format: { currency: true, decimals: 0 },
      on_change: jest.fn(),
    }

    render(<Slider {...props} />)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    const value = props.value as number
    expect(parseFloat(getButtonHelper().value)).toBe(value + 10)

    expect(props.on_change).toHaveBeenCalledTimes(1)

    expect(
      Array.from(document.querySelector('.dnb-form-label').classList)
    ).toEqual(expect.arrayContaining(['dnb-form-label--vertical']))

    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-valuetext')
    ).toBe('80 kroner')
  })

  it('should support spacing props', () => {
    render(<Slider {...props} top="2rem" />)

    const element = document.querySelector('.dnb-slider')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining(['dnb-space__top--large'])
    )
  })

  it('should include className', () => {
    render(<Slider {...props} className="custom-class" />)

    const element = document.querySelector('.dnb-slider')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining(['custom-class'])
    )
  })

  it('should apply custom attributes to thumb button', () => {
    render(<Slider {...props} data-extra="property-value" />)

    const element = document.querySelector(
      '.dnb-slider__thumb .dnb-button'
    )

    expect(element.getAttribute('data-extra')).toBe('property-value')
  })

  it('should support stretch', () => {
    render(<Slider {...props} stretch />)

    const element = document.querySelector('.dnb-slider')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining(['dnb-slider--stretch'])
    )
  })

  it('has correct value on mouse move', () => {
    render(<Slider {...props} />)
    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    const value = props.value as number
    expect(parseFloat(getButtonHelper().value)).toBe(value + 10)
  })

  it('has correct value on mouse move in vertical mode', () => {
    render(<Slider {...props} vertical />)

    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    simulateMouseMove({ pageX: 80, pageY: 80, width: 10, height: 100 })

    expect(parseFloat(getButtonHelper().value)).toBe(20) // since we use reverse in vertical mode
  })

  it('has correct value with reverse', () => {
    render(<Slider {...props} vertical reverse />)

    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    simulateMouseMove({ pageX: 80, pageY: 80, width: 10, height: 100 })

    expect(parseFloat(getButtonHelper().value)).toBe(80)
  })

  it('buttons add/subtract have correct labels', () => {
    render(
      <Slider
        {...props}
        hideButtons={false}
        numberFormat={{ currency: true, decimals: 1 }}
      />
    )

    const addElem = document.querySelector('.dnb-slider__button--add')
    const subtractElem = document.querySelector(
      '.dnb-slider__button--subtract'
    )

    fireEvent.click(addElem)
    expect(parseFloat(getButtonHelper().value)).toBe(80)
    expect(addElem.getAttribute('aria-label')).toBe('Øk (80,0 kroner)')

    fireEvent.click(subtractElem)
    expect(parseFloat(getButtonHelper().value)).toBe(70)
    expect(subtractElem.getAttribute('aria-label')).toBe(
      'Reduser (70,0 kroner)'
    )
  })

  describe('min', () => {
    it('should respect min value', () => {
      const onChange = jest.fn()

      render(<Slider min={50} value={60} onChange={onChange} />)

      simulateMouseMove({ pageX: 60, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 80 })
      )

      simulateMouseMove({ pageX: -10, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 50 })
      )
    })

    it('should respect min value with too large "step"', () => {
      const onChange = jest.fn()

      render(<Slider min={5} step={10} value={50} onChange={onChange} />)

      simulateMouseMove({ pageX: 0, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 5 })
      )
    })
  })

  describe('max', () => {
    it('should respect max value value', () => {
      const onChange = jest.fn()

      render(<Slider max={200} onChange={onChange} />)

      simulateMouseMove({ pageX: 210, width: 100 })

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: 200 })
      )
    })

    it('should respect "step" that do not divide with max', () => {
      const onChange = jest.fn()

      render(<Slider step={3} max={100} onChange={onChange} />)

      simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 100 })
      )
    })

    it('should respect max value with too large "step"', () => {
      const onChange = jest.fn()

      render(<Slider max={105} step={10} value={50} onChange={onChange} />)

      simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 105 })
      )
    })

    it('should respect max value with too large "step" and large number', () => {
      const onChange = jest.fn()

      render(
        <Slider max={2040} step={100} value={1000} onChange={onChange} />
      )

      simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 2040 })
      )
    })
  })

  describe('Tooltip', () => {
    const IS_TEST = globalThis.IS_TEST
    beforeEach(() => {
      globalThis.IS_TEST = false
    })
    afterEach(() => {
      globalThis.IS_TEST = IS_TEST
    })

    it('shows always a Tooltip when alwaysShowTooltip is true', () => {
      render(
        <Slider {...props} id="unique-tooltip" tooltip alwaysShowTooltip />
      )

      const tooltipElem = document.querySelector('.dnb-tooltip')

      expect(tooltipElem.textContent).toBe('70')
      expect(Array.from(tooltipElem.classList)).toEqual(
        expect.arrayContaining(['dnb-tooltip', 'dnb-tooltip--active'])
      )
    })

    it('shows Tooltip on hover with numberFormat', async () => {
      render(
        <Slider
          {...props}
          id="unique-tooltip"
          numberFormat={{ currency: 'EUR' }}
          tooltip
        />
      )

      const mainElem = document.querySelector('.dnb-slider')
      const thumbElem = mainElem.querySelector(
        '.dnb-slider__thumb .dnb-button'
      )

      expect(getTooltipElements(0).textContent).toBe('70,00 €')
      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.mouseEnter(thumbElem)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await wait(100)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      expect(getTooltipElements(0).textContent).toBe('80,00 €')

      fireEvent.mouseLeave(thumbElem)

      await wait(300)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--hide',
      ])
    })

    it('shows Tooltip on focus', async () => {
      render(<Slider {...props} id="unique-tooltip" tooltip />)

      const mainElem = document.querySelector('.dnb-slider')
      const thumbElem = mainElem.querySelector(
        '.dnb-slider__thumb .dnb-button'
      )

      expect(getTooltipElements(0).textContent).toBe('70')
      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.focus(thumbElem)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await wait(100)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      expect(getTooltipElements(0).textContent).toBe('80')

      fireEvent.blur(thumbElem)

      await wait(300)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--hide',
      ])
    })

    it('shows Tooltip on hover with custom formatting', async () => {
      render(
        <Slider
          {...props}
          id="unique-tooltip"
          numberFormat={(value) => format(value, { percent: true })}
          tooltip
          step={null}
        />
      )

      const mainElem = document.querySelector('.dnb-slider')
      const thumbElem = mainElem.querySelector(
        '.dnb-slider__thumb .dnb-button'
      )

      expect(getTooltipElements(0).textContent).toBe('70 %')
      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.mouseEnter(thumbElem)

      simulateMouseMove({ pageX: 80.5, width: 100, height: 10 })

      await wait(100)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      expect(getTooltipElements(0).textContent).toBe('80,5 %')

      fireEvent.mouseLeave(thumbElem)

      await wait(300)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--hide',
      ])
    })

    it('text can be selected without disappearing', async () => {
      render(<Slider {...props} id="unique-tooltip" tooltip />)

      const mainElem = document.querySelector('.dnb-slider')
      const thumbElem = mainElem.querySelector(
        '.dnb-slider__thumb .dnb-button'
      )

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.mouseEnter(thumbElem)

      await wait(100)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      fireEvent.mouseLeave(thumbElem)

      // Enter Tooltip, and with that, prevent it from hiding/disappearing
      fireEvent.mouseEnter(getTooltipElements(0))

      await wait(300)

      expect(Array.from(getTooltipElements(0).classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])
    })
  })

  describe('Slider with marker', () => {
    it('should render marker in horizontal direction', () => {
      const { rerender } = render(
        <Slider
          extensions={{ marker: { instance: SliderMarker, value: 30 } }}
        />
      )

      const sliderElement = document.querySelector('.dnb-slider')
      expect(sliderElement.innerHTML).toContain('dnb-slider__marker')

      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )
      expect(markerElement).toHaveAttribute('style', 'left: 30%;')

      rerender(<Slider />)

      expect(sliderElement.innerHTML).not.toContain('dnb-slider__marker')
    })

    it('should render marker in vertical direction', () => {
      const { rerender } = render(
        <Slider
          extensions={{ marker: { instance: SliderMarker, value: 30 } }}
          vertical
        />
      )

      const sliderElement = document.querySelector('.dnb-slider')
      expect(sliderElement.innerHTML).toContain('dnb-slider__marker')

      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )
      expect(markerElement).toHaveAttribute('style', 'top: 70%;')

      rerender(<Slider />)

      expect(sliderElement.innerHTML).not.toContain('dnb-slider__marker')
    })

    it('should have html attributes to make it accessible', () => {
      const { rerender } = render(
        <Slider
          extensions={{ marker: { instance: SliderMarker, value: 30 } }}
        />
      )

      const sliderElement = document.querySelector('.dnb-slider')
      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )
      expect(markerElement).toHaveAttribute('style', 'left: 30%;')
      expect(markerElement).toHaveAttribute('aria-label', '30')
      expect(markerElement).toHaveAttribute('tabIndex', '0')

      rerender(
        <Slider
          extensions={{ marker: { instance: SliderMarker, value: 120 } }}
        />
      )

      expect(markerElement).toHaveAttribute('style', 'left: 100%;')
      expect(markerElement).toHaveAttribute('aria-label', '120')
    })

    it('shows Tooltip with info', async () => {
      const marker = { instance: SliderMarker, value: 30 }
      render(<Slider extensions={{ marker }} />)

      const sliderElement = document.querySelector('.dnb-slider')
      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )

      fireEvent.mouseEnter(markerElement)

      await wait(300)

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement).toHaveClass('dnb-tooltip--active')
      expect(tooltipElement).toHaveTextContent('30')
    })

    it('shows Tooltip with  text', async () => {
      const marker = {
        instance: SliderMarker,
        value: 30,
        text: 'Here is the text',
      }
      render(<Slider extensions={{ marker }} />)

      const sliderElement = document.querySelector('.dnb-slider')
      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )

      fireEvent.mouseEnter(markerElement)

      await wait(300)

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement).toHaveTextContent(marker.text)
    })
  })

  it('has events that return a correct value', () => {
    const onChange = jest.fn()

    render(<Slider onChange={onChange} />)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toHaveBeenCalledTimes(1)

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
      value: 80,
      number: null,
      width: 100,
    }
    expect(onChange).toHaveBeenCalledWith(changeObject)
  })

  it('return valid value if numberFormat was given', () => {
    const onChange = jest.fn()

    render(
      <Slider
        onChange={onChange}
        numberFormat={{ currency: true, decimals: 1 }}
      />
    )

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toHaveBeenCalledTimes(1)

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
      value: 80,
      number: '80,0 kr',
      width: 100,
    }
    expect(onChange).toHaveBeenCalledWith(changeObject)

    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-valuetext')
    ).toBe('80,0 kroner')
  })

  it('will not emit onChange with same value twice', () => {
    const onChange = jest.fn()

    render(<Slider onChange={onChange} />)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].value).toBe(80)
  })

  it('should not have type=button', () => {
    render(<Slider />)
    expect(
      document.querySelector('.dnb-slider__thumb .dnb-button')
    ).not.toHaveAttribute('type')
  })

  describe('multi thumb', () => {
    const SliderWithStateUpdate = (props: SliderAllProps) => {
      const [value, setValue] = React.useState(props.value)
      const onChangehandler = (event: onChangeEventProps) => {
        setValue(event.value)
        if (props.onChange) {
          props.onChange(event)
        }
      }
      return <Slider {...props} value={value} onChange={onChangehandler} />
    }

    it('will not emit onChange with same value twice', () => {
      const onChange = jest.fn()

      props.value = [20, 30, 90]
      render(<SliderWithStateUpdate {...props} onChange={onChange} />)

      fireEvent.mouseDown(getRangeElement(1))
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][0].value).toEqual([20, 30, 80])

      resetMouseSimulation()
    })

    it('will not need on external prop changes', () => {
      const WrongUsage = () => {
        const [min, setMinVal] = React.useState(0) //eslint-disable-line
        const [max, setMaxVal] = React.useState(200) //eslint-disable-line

        return (
          <Slider
            max={200}
            value={[0, 200]} // <-- Here we do not update the value
            onChange={({ value }) => {
              setMinVal(value[0])
              setMaxVal(value[1])
            }}
          />
        )
      }

      render(<WrongUsage />)

      simulateMouseMove({ pageX: 20, width: 100, height: 10 })
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 20%;'
      )

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 4; left: 80%;'
      )

      resetMouseSimulation()
    })

    it('tracks mousemove on track', () => {
      const onChange = jest.fn()

      props.value = [20, 30, 90]
      render(
        <SliderWithStateUpdate
          {...props}
          numberFormat={{ currency: true, decimals: 1 }}
          onChange={onChange}
        />
      )

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(parseFloat(getRangeElement(2).value)).toBe(80)

      expect(onChange).toHaveBeenCalledWith({
        event: {
          height: 10,
          pageX: 80,
          width: 100,
        },
        height: 10,
        pageX: 80,
        rawValue: 80,
        value: [20, 30, 80],
        number: '80,0 kr',
        width: 100,
      })

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })

      expect(onChange).toHaveBeenCalledWith({
        event: {
          height: 10,
          pageX: 10,
          width: 100,
        },
        height: 10,
        pageX: 10,
        rawValue: 10,
        value: [10, 30, 80],
        number: '10,0 kr',
        width: 100,
      })

      fireEvent.mouseDown(getRangeElement(1))

      simulateMouseMove({ pageX: 40, width: 100, height: 10 })

      expect(onChange.mock.calls[2][0].value).toEqual([10, 40, 80])
    })

    it('updates thumb index and returns correct event value', () => {
      const onChange = jest.fn()

      props.value = [10, 30, 40]
      render(<SliderWithStateUpdate {...props} onChange={onChange} />)

      const secondThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[1]
      const thirdThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[2]

      fireEvent.focus(secondThumb)
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(onChange.mock.calls[0][0].value).toEqual([10, 40, 80])

      resetMouseSimulation()

      fireEvent.focus(thirdThumb)
      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(onChange.mock.calls[1][0].value).toEqual([10, 20, 40])
    })

    it('will not swap thumb positions when multiThumbBehavior="omit"', () => {
      const onChange = jest.fn()

      props.value = [10, 30, 60]

      render(
        <SliderWithStateUpdate
          {...props}
          step={1}
          multiThumbBehavior="omit"
          onChange={onChange}
        />
      )

      const secondThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[1]
      const thirdThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[2]

      fireEvent.focus(secondThumb)
      simulateMouseMove({ pageX: 50, width: 100, height: 10 })

      expect(onChange.mock.calls[0][0].value).toEqual([10, 50, 60])
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 10%;'
      )
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 4; left: 50%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 3; left: 60%;'
      )

      resetMouseSimulation()

      fireEvent.focus(thirdThumb)
      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(onChange.mock.calls[1][0].value).toEqual([10, 50, 50])
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 10%;'
      )
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 3; left: 50%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 4; left: 50%;'
      )
    })

    it('will push thumb positions when multiThumbBehavior="push"', () => {
      const onChange = jest.fn()

      props.value = [10, 30, 60]

      render(
        <SliderWithStateUpdate
          {...props}
          step={1}
          onChange={onChange}
          multiThumbBehavior="push"
        />
      )

      const secondThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[1]
      const thirdThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[2]

      fireEvent.focus(secondThumb)
      simulateMouseMove({ pageX: 50, width: 100, height: 10 })

      expect(onChange.mock.calls[0][0].value).toEqual([10, 50, 60])
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 10%;'
      )
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 4; left: 50%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 3; left: 60%;'
      )

      resetMouseSimulation()

      fireEvent.focus(thirdThumb)
      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(onChange.mock.calls[1][0].value).toEqual([10, 20, 20])
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 10%;'
      )
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 3; left: 20%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 4; left: 20%;'
      )
    })

    it('sets correct inline styles', () => {
      props.value = [20, 30, 90]
      render(
        <SliderWithStateUpdate
          {...props}
          numberFormat={{ currency: true, decimals: 1 }}
        />
      )

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 4; left: 80%;'
      )

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 10%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 3; left: 80%;'
      )

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
    })

    it('should allow negative values', () => {
      const onChange = jest.fn()

      render(
        <Slider
          min={-40}
          max={100}
          value={[-40, 80]}
          numberFormat={{ currency: true, decimals: 1 }}
          tooltip
          alwaysShowTooltip
          onChange={onChange}
        />
      )

      expect(getTooltipElements(0).textContent).toBe('-40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 0%;'
      )

      expect(getTooltipElements(1).textContent).toBe('80,0 kr')
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 3; left: 85.71428571428571%;'
      )

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-26,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 10%;'
      )

      simulateMouseMove({ pageX: 0, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 0%;'
      )

      simulateMouseMove({ pageX: -10, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 0%;'
      )

      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-12,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 20%;'
      )

      resetMouseSimulation()
    })

    it('should inherit formElement vertical label', () => {
      render(
        <Provider formElement={{ label_direction: 'vertical' }}>
          <SliderWithStateUpdate label="Label" />
        </Provider>
      )

      const element = document.querySelector('.dnb-slider')
      const attributes = Array.from(element.attributes).map(
        (attr) => attr.name
      )

      expect(attributes).toEqual(['class'])
      expect(Array.from(element.classList)).toEqual([
        'dnb-slider',
        'dnb-form-component',
        'dnb-slider__label--vertical',
      ])
    })
  })

  it('should validate with ARIA rules', async () => {
    const Component = render(<Slider {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Slider scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})

const getButtonHelper = (): HTMLInputElement => {
  return document.querySelector('.dnb-slider__button-helper')
}

const resetMouseSimulation = () => {
  const elem = document.querySelector('.dnb-slider__track')
  if (elem) {
    fireEvent.mouseUp(elem)
  }
}

const simulateMouseMove = (props) => {
  act(() => {
    fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
    fireEvent.mouseDown(document.querySelector('.dnb-slider__track'))
    const mouseMove = new CustomEvent('mousemove', {
      detail: props,
    })
    document.body.dispatchEvent(mouseMove)
  })
}
