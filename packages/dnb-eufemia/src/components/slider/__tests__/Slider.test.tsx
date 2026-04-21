/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render, act } from '@testing-library/react'
import Slider, { SliderMarker } from '../Slider'
import * as PopoverModule from '../../popover/Popover'

import type { SliderAllProps, SliderOnChangeParams } from '../Slider'
import { formatPercent } from '../../number-format/NumberUtils'
import { Provider } from '../../../shared'

const props: SliderAllProps = {
  id: 'slider',
  label: 'Label',
  min: 0,
  max: 100,
  value: 70,
  step: 10,
  numberFormat: null,
  labelDirection: 'vertical',
}

describe('Slider component', () => {
  afterEach(async () => {
    await resetMouseSimulation()
  })

  const getThumbElements = (index: number) =>
    document.querySelectorAll('.dnb-slider__thumb')[index] as HTMLElement

  const getTooltipElements = (index: number) =>
    document.querySelectorAll('.dnb-tooltip')[index] as HTMLElement

  const getRangeElement = (index: number) =>
    document.querySelectorAll('[type="range"]')[index] as HTMLInputElement

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

  it('has correct value on mouse move', async () => {
    render(<Slider {...props} />)
    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    const value = props.value as number
    expect(parseFloat(getButtonHelper().value)).toBe(value + 10)
  })

  it('has correct value on mouse move in vertical mode', async () => {
    render(<Slider {...props} vertical />)

    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    await simulateMouseMove({
      pageX: 80,
      pageY: 80,
      width: 10,
      height: 100,
    })

    expect(parseFloat(getButtonHelper().value)).toBe(20) // since we use reverse in vertical mode
  })

  it('has correct value with reverse', async () => {
    render(<Slider {...props} vertical reverse />)

    expect(parseFloat(getButtonHelper().value)).toBe(props.value)

    await simulateMouseMove({
      pageX: 80,
      pageY: 80,
      width: 10,
      height: 100,
    })

    expect(parseFloat(getButtonHelper().value)).toBe(80)
  })

  it('buttons add/subtract have correct labels', async () => {
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

    await act(async () => {
      fireEvent.click(addElem)
    })
    expect(parseFloat(getButtonHelper().value)).toBe(80)
    expect(addElem.getAttribute('aria-label')).toBe('Øk (80,0 kroner)')

    await act(async () => {
      fireEvent.click(subtractElem)
    })
    expect(parseFloat(getButtonHelper().value)).toBe(70)
    expect(subtractElem.getAttribute('aria-label')).toBe(
      'Reduser (70,0 kroner)'
    )
  })

  describe('min', () => {
    it('should respect min value', async () => {
      const onChange = jest.fn()

      render(<Slider min={50} value={60} onChange={onChange} />)

      await simulateMouseMove({ pageX: 60, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 80 })
      )

      await simulateMouseMove({ pageX: -10, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 50 })
      )
    })

    it('should respect min value with too large "step"', async () => {
      const onChange = jest.fn()

      render(<Slider min={5} step={10} value={50} onChange={onChange} />)

      await simulateMouseMove({ pageX: 0, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 5 })
      )
    })
  })

  describe('max', () => {
    it('should respect max value value', async () => {
      const onChange = jest.fn()

      render(<Slider max={200} onChange={onChange} />)

      await simulateMouseMove({ pageX: 210, width: 100 })

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: 200 })
      )
    })

    it('should respect "step" that do not divide with max', async () => {
      const onChange = jest.fn()

      render(<Slider step={3} max={100} onChange={onChange} />)

      await simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 100 })
      )
    })

    it('should respect max value with too large "step"', async () => {
      const onChange = jest.fn()

      render(<Slider max={105} step={10} value={50} onChange={onChange} />)

      await simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 105 })
      )
    })

    it('should respect max value with too large "step" and large number', async () => {
      const onChange = jest.fn()

      render(
        <Slider max={2040} step={100} value={1000} onChange={onChange} />
      )

      await simulateMouseMove({ pageX: 100, width: 100 })

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

      // Slider uses omitDescribedBy, so sr-description should not exist
      const srDescription = document.querySelector(
        '.dnb-tooltip__sr-description'
      )
      expect(srDescription).toBeNull()

      await act(async () => {
        fireEvent.mouseEnter(thumbElem)
      })

      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await act(async () => {
        await await wait(100)
      })

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--active')
      expect(tooltipElement.textContent).toBe('80,00 €')

      await act(async () => {
        fireEvent.mouseLeave(thumbElem)
      })

      await act(async () => {
        await await wait(300)
      })

      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--hide')
    })

    it('shows Tooltip on focus', async () => {
      render(<Slider {...props} id="unique-tooltip" tooltip />)

      const mainElem = document.querySelector('.dnb-slider')
      const inputElem = mainElem.querySelector('[type="range"]')

      // Slider uses omitDescribedBy, so sr-description should not exist
      const srDescription = document.querySelector(
        '.dnb-tooltip__sr-description'
      )
      expect(srDescription).toBeNull()

      await act(async () => {
        fireEvent.focus(inputElem)
      })

      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await act(async () => {
        await await wait(100)
      })

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--active')
      expect(tooltipElement.textContent).toBe('80')

      await act(async () => {
        fireEvent.blur(inputElem)
      })

      await act(async () => {
        await await wait(300)
      })

      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--hide')
    })

    it('shows Tooltip on hover with custom formatting', async () => {
      render(
        <Slider
          {...props}
          id="unique-tooltip"
          numberFormat={(value) => formatPercent(value)}
          tooltip
          step={null}
        />
      )

      const mainElem = document.querySelector('.dnb-slider')
      const thumbElem = mainElem.querySelector(
        '.dnb-slider__thumb .dnb-button'
      )

      // Slider uses omitDescribedBy, so sr-description should not exist
      const srDescription = document.querySelector(
        '.dnb-tooltip__sr-description'
      )
      expect(srDescription).toBeNull()

      await act(async () => {
        fireEvent.mouseEnter(thumbElem)
      })

      await simulateMouseMove({ pageX: 80.5, width: 100, height: 10 })

      await act(async () => {
        await await wait(100)
      })

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--active')

      expect(tooltipElement.textContent).toBe('80,5 %')

      await act(async () => {
        fireEvent.mouseLeave(thumbElem)
      })

      await act(async () => {
        await await wait(300)
      })

      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--hide')
    })

    it('text can be selected without disappearing', async () => {
      render(<Slider {...props} id="unique-tooltip" tooltip />)

      const mainElem = document.querySelector('.dnb-slider')
      const thumbElem = mainElem.querySelector(
        '.dnb-slider__thumb .dnb-button'
      )

      // Slider uses omitDescribedBy, so sr-description should not exist
      const srDescription = document.querySelector(
        '.dnb-tooltip__sr-description'
      )
      expect(srDescription).toBeNull()

      await act(async () => {
        fireEvent.mouseEnter(thumbElem)
      })

      await act(async () => {
        await await wait(100)
      })

      await act(async () => {
        fireEvent.mouseLeave(thumbElem)
      })

      // Enter Tooltip, and with that, prevent it from hiding/disappearing
      const tooltipElement = getTooltipElements(0)
      await act(async () => {
        fireEvent.mouseEnter(tooltipElement)
      })

      await act(async () => {
        await await wait(300)
      })

      // Tooltip should still be in the DOM (not removed) when hovering over it
      expect(tooltipElement).toBeInTheDocument()
      expect(tooltipElement.classList).toContain('dnb-tooltip')
    })

    it('updates Tooltip targetRefreshKey when the thumb value changes', async () => {
      const popoverSpy = jest.spyOn(PopoverModule, 'default')
      render(<Slider {...props} id="tooltip-key" tooltip />)

      const findTooltipPopoverCall = () =>
        [...popoverSpy.mock.calls]
          .map(([callProps]) => callProps)
          .reverse()
          .find(
            (callProps) =>
              callProps && Object.hasOwn(callProps, 'targetRefreshKey')
          )

      const initialCall = findTooltipPopoverCall()
      expect(initialCall).toBeDefined()
      expect(initialCall.targetRefreshKey).toBe(props.value)

      popoverSpy.mockClear()
      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      const updatedCall = findTooltipPopoverCall()
      expect(updatedCall).toBeDefined()
      expect(updatedCall.targetRefreshKey).toBe(80)

      popoverSpy.mockRestore()
    })
  })

  describe('Slider with marker', () => {
    it('should render marker in horizontal direction', async () => {
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

      await act(async () => {
        rerender(<Slider />)
      })

      expect(sliderElement.innerHTML).not.toContain('dnb-slider__marker')
    })

    it('should render marker in vertical direction', async () => {
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

      await act(async () => {
        rerender(<Slider />)
      })

      expect(sliderElement.innerHTML).not.toContain('dnb-slider__marker')
    })

    it('should have html attributes to make it accessible', async () => {
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

      await act(async () => {
        rerender(
          <Slider
            extensions={{ marker: { instance: SliderMarker, value: 120 } }}
          />
        )
      })

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

      await act(async () => {
        fireEvent.mouseEnter(markerElement)
      })

      await act(async () => {
        await await wait(300)
      })

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

      await act(async () => {
        fireEvent.mouseEnter(markerElement)
      })

      await act(async () => {
        await await wait(300)
      })

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement).toHaveTextContent(marker.text)
    })
  })

  it('has events that return a correct value', async () => {
    const onChange = jest.fn()

    render(<Slider onChange={onChange} />)

    await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

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

  it('return valid value if numberFormat was given', async () => {
    const onChange = jest.fn()

    render(
      <Slider
        onChange={onChange}
        numberFormat={{ currency: true, decimals: 1 }}
      />
    )

    await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

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

  it('will not emit onChange with same value twice', async () => {
    const onChange = jest.fn()

    render(<Slider onChange={onChange} />)

    await simulateMouseMove({ pageX: 80, width: 100, height: 10 })
    await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

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
      const onChangeHandler = (event: SliderOnChangeParams) => {
        setValue(event.value)
        if (props.onChange) {
          props.onChange(event)
        }
      }
      return <Slider {...props} value={value} onChange={onChangeHandler} />
    }

    it('will not emit onChange with same value twice', async () => {
      const onChange = jest.fn()

      props.value = [20, 30, 90]
      render(<SliderWithStateUpdate {...props} onChange={onChange} />)

      await act(async () => {
        fireEvent.mouseDown(getRangeElement(1))
      })
      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][0].value).toEqual([20, 30, 80])

      await resetMouseSimulation()
    })

    it('will not need on external prop changes', async () => {
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

      await simulateMouseMove({ pageX: 20, width: 100, height: 10 })
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 20%;'
      )

      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 4; left: 80%;'
      )

      await resetMouseSimulation()
    })

    it('tracks mousemove on track', async () => {
      const onChange = jest.fn()

      props.value = [20, 30, 90]
      render(
        <SliderWithStateUpdate
          {...props}
          numberFormat={{ currency: true, decimals: 1 }}
          onChange={onChange}
        />
      )

      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

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

      await simulateMouseMove({ pageX: 10, width: 100, height: 10 })

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

      await act(async () => {
        fireEvent.mouseDown(getRangeElement(1))
      })

      await simulateMouseMove({ pageX: 40, width: 100, height: 10 })

      expect(onChange.mock.calls[2][0].value).toEqual([10, 40, 80])
    })

    it('updates thumb index and returns correct event value', async () => {
      const onChange = jest.fn()

      props.value = [10, 30, 40]
      render(<SliderWithStateUpdate {...props} onChange={onChange} />)

      const secondThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[1]
      const thirdThumb = document.querySelectorAll(
        '.dnb-slider__button-helper'
      )[2]

      await act(async () => {
        fireEvent.focus(secondThumb)
      })
      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(onChange.mock.calls[0][0].value).toEqual([10, 40, 80])

      await resetMouseSimulation()

      await act(async () => {
        fireEvent.focus(thirdThumb)
      })
      await simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(onChange.mock.calls[1][0].value).toEqual([10, 20, 40])
    })

    it('will not swap thumb positions when multiThumbBehavior="omit"', async () => {
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

      await act(async () => {
        fireEvent.focus(secondThumb)
      })
      await simulateMouseMove({ pageX: 50, width: 100, height: 10 })

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

      await resetMouseSimulation()

      await act(async () => {
        fireEvent.focus(thirdThumb)
      })
      await simulateMouseMove({ pageX: 20, width: 100, height: 10 })

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

    it('will push thumb positions when multiThumbBehavior="push"', async () => {
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

      await act(async () => {
        fireEvent.focus(secondThumb)
      })
      await simulateMouseMove({ pageX: 50, width: 100, height: 10 })

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

      await resetMouseSimulation()

      await act(async () => {
        fireEvent.focus(thirdThumb)
      })
      await simulateMouseMove({ pageX: 20, width: 100, height: 10 })

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

    it('sets correct inline styles', async () => {
      props.value = [20, 30, 90]
      render(
        <SliderWithStateUpdate
          {...props}
          numberFormat={{ currency: true, decimals: 1 }}
        />
      )

      await simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 4; left: 80%;'
      )

      await simulateMouseMove({ pageX: 10, width: 100, height: 10 })
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 10%;'
      )
      expect(getThumbElements(2).getAttribute('style')).toBe(
        'z-index: 3; left: 80%;'
      )

      await simulateMouseMove({ pageX: 50, width: 100, height: 10 })
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

    it('should allow negative values', async () => {
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

      await simulateMouseMove({ pageX: 10, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-26,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 10%;'
      )

      await simulateMouseMove({ pageX: 0, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 0%;'
      )

      await simulateMouseMove({ pageX: -10, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 0%;'
      )

      await simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('-12,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 20%;'
      )

      await resetMouseSimulation()
    })

    it('should inherit formElement vertical label', () => {
      render(
        <Provider formElement={{ labelDirection: 'vertical' }}>
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

const resetMouseSimulation = async () => {
  const elem = document.querySelector('.dnb-slider__track')
  if (elem) {
    await act(async () => {
      fireEvent.mouseUp(elem)
    })
  }
}

const simulateMouseMove = async (props) => {
  await act(async () => {
    fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
    fireEvent.mouseDown(document.querySelector('.dnb-slider__track'))
    const mouseMove = new CustomEvent('mousemove', {
      detail: props,
    })
    document.body.dispatchEvent(mouseMove)
  })
}
