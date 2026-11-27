/**
 * Component Test
 *
 */

import { act, useState } from 'react'
import type { ReactNode } from 'react'
import {
  axeComponent,
  loadScss,
  wait,
} from '../../../core/test-utils/testSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Slider, { SliderMarker } from '../Slider'
import * as PopoverModule from '../../popover/Popover'

import type { SliderAllProps, SliderOnChangeParams } from '../Slider'
import { formatPercent } from '../../number-format/NumberUtils'
import { Provider } from '../../../shared'
import {
  mockDOMRect,
  resetMouseSimulation,
  simulateMouseMove,
} from './simulateSlider'

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
  afterEach(() => {
    resetMouseSimulation()
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

    expect(element).toHaveClass('dnb-space__top--large')
  })

  it('should call onKeyDown and onKeyUp when the range input has focus', () => {
    const onKeyDown = vi.fn()
    const onKeyUp = vi.fn()

    render(<Slider {...props} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />)

    fireEvent.keyDown(getRangeElement(0), { key: 'ArrowUp' })
    fireEvent.keyUp(getRangeElement(0), { key: 'ArrowUp' })

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onKeyUp).toHaveBeenCalledTimes(1)
  })

  it('should call onFocus and keep showing the active state', () => {
    const onFocus = vi.fn()

    render(<Slider {...props} tooltip onFocus={onFocus} />)

    fireEvent.focus(getRangeElement(0))

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
  })

  it('should keep pointer event handlers on the thumb', () => {
    const onMouseEnter = vi.fn()

    render(<Slider {...props} onMouseEnter={onMouseEnter} />)

    fireEvent.mouseEnter(getRangeElement(0))
    expect(onMouseEnter).toHaveBeenCalledTimes(0)

    fireEvent.mouseEnter(
      document.querySelector('.dnb-slider__thumb .dnb-button')
    )
    expect(onMouseEnter).toHaveBeenCalledTimes(1)
  })

  it('should set aria-label on the range input', () => {
    render(<Slider {...props} label={undefined} aria-label="Amount" />)

    expect(getRangeElement(0)).toHaveAttribute('aria-label', 'Amount')
    expect(
      document.querySelector('.dnb-slider__thumb .dnb-button')
    ).not.toHaveAttribute('aria-label')
  })

  it('should name the range inputs with thumbTitle', async () => {
    const { container, getAllByRole } = render(
      <Slider
        {...props}
        label={undefined}
        value={[20, 60]}
        thumbTitle="Interest rate"
        hideButtons
      />
    )

    expect(getAllByRole('slider', { name: 'Interest rate' })).toHaveLength(
      2
    )
    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('should prefer aria-label and label over thumbTitle', () => {
    const { rerender, getByRole } = render(
      <Slider
        {...props}
        label={undefined}
        aria-label="Amount"
        thumbTitle="Interest rate"
      />
    )

    expect(getByRole('slider', { name: 'Amount' })).toBe(
      getRangeElement(0)
    )

    rerender(<Slider {...props} thumbTitle="Interest rate" />)

    expect(getByRole('slider', { name: 'Label' })).toBe(getRangeElement(0))
  })

  it('should set aria-invalid and aria-required on the range input', () => {
    render(<Slider {...props} aria-invalid="true" aria-required="true" />)

    expect(getRangeElement(0)).toHaveAttribute('aria-invalid', 'true')
    expect(getRangeElement(0)).toHaveAttribute('aria-required', 'true')
  })

  it('should combine aria-describedby with the internal one', () => {
    render(<Slider {...props} suffix="kr" aria-describedby="custom-id" />)

    expect(getRangeElement(0).getAttribute('aria-describedby')).toBe(
      'custom-id slider-suffix'
    )
  })

  it('should include className', () => {
    render(<Slider {...props} className="custom-class" />)

    const element = document.querySelector('.dnb-slider')

    expect(element).toHaveClass('custom-class')
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

    expect(element).toHaveClass('dnb-slider--stretch')
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
      const onChange = vi.fn()

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
      const onChange = vi.fn()

      render(<Slider min={5} step={10} value={50} onChange={onChange} />)

      simulateMouseMove({ pageX: 0, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 5 })
      )
    })
  })

  describe('max', () => {
    it('should respect max value', () => {
      const onChange = vi.fn()

      render(<Slider max={200} onChange={onChange} />)

      simulateMouseMove({ pageX: 210, width: 100 })

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: 200 })
      )
    })

    it('should respect "step" that do not divide with max', () => {
      const onChange = vi.fn()

      render(<Slider step={3} max={100} onChange={onChange} />)

      simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 100 })
      )
    })

    it('should respect max value with too large "step"', () => {
      const onChange = vi.fn()

      render(<Slider max={105} step={10} value={50} onChange={onChange} />)

      simulateMouseMove({ pageX: 100, width: 100 })

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 105 })
      )
    })

    it('should respect max value with too large "step" and large number', () => {
      const onChange = vi.fn()

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
      expect(tooltipElem).toHaveClass('dnb-tooltip', 'dnb-tooltip--active')
    })

    it('hides the Tooltip from screen readers, since the input gives the value', () => {
      render(
        <Slider
          {...props}
          numberFormat={{ currency: 'EUR' }}
          tooltip
          alwaysShowTooltip
        />
      )

      expect(document.querySelector('.dnb-tooltip')).toHaveAttribute(
        'aria-hidden',
        'true'
      )
      expect(document.querySelector('.dnb-aria-live')).toBeNull()
      expect(
        document.querySelector('.dnb-slider__button-helper')
      ).toHaveAttribute('aria-valuetext', '70,00 euro')
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

      fireEvent.mouseEnter(thumbElem)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await wait(100)

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--active')
      expect(tooltipElement.textContent).toBe('80,00 €')

      fireEvent.mouseLeave(thumbElem)

      await waitFor(() => {
        expect(tooltipElement.classList).toContain('dnb-tooltip')
        expect(tooltipElement.classList).toContain('dnb-tooltip--hide')
      })
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

      fireEvent.focus(inputElem)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await wait(100)

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--active')
      expect(tooltipElement.textContent).toBe('80')

      fireEvent.blur(inputElem)

      await waitFor(() => {
        expect(tooltipElement.classList).toContain('dnb-tooltip')
        expect(tooltipElement.classList).toContain('dnb-tooltip--hide')
      })
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

      fireEvent.mouseEnter(thumbElem)

      simulateMouseMove({ pageX: 80.5, width: 100, height: 10 })

      await wait(100)

      const tooltipElement = getTooltipElements(0)
      expect(tooltipElement.classList).toContain('dnb-tooltip')
      expect(tooltipElement.classList).toContain('dnb-tooltip--active')

      expect(tooltipElement.textContent).toBe('80,5 %')

      fireEvent.mouseLeave(thumbElem)

      await waitFor(() => {
        expect(tooltipElement.classList).toContain('dnb-tooltip')
        expect(tooltipElement.classList).toContain('dnb-tooltip--hide')
      })
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

      fireEvent.mouseEnter(thumbElem)

      await wait(100)

      fireEvent.mouseLeave(thumbElem)

      // Enter Tooltip, and with that, prevent it from hiding/disappearing
      const tooltipElement = getTooltipElements(0)
      fireEvent.mouseEnter(tooltipElement)

      await wait(300)

      // Tooltip should still be in the DOM (not removed) when hovering over it
      expect(tooltipElement).toBeInTheDocument()
      expect(tooltipElement.classList).toContain('dnb-tooltip')
    })

    it('updates Tooltip targetRefreshKey when the thumb value changes', () => {
      const popoverSpy = vi.spyOn(PopoverModule, 'default')
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
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      const updatedCall = findTooltipPopoverCall()
      expect(updatedCall).toBeDefined()
      expect(updatedCall.targetRefreshKey).toBe(80)

      popoverSpy.mockRestore()
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

    it('should have html attributes to make it accessible', async () => {
      const { rerender, container } = render(
        <Slider
          label="Label"
          extensions={{ marker: { instance: SliderMarker, value: 30 } }}
        />
      )

      const sliderElement = document.querySelector('.dnb-slider')
      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )
      expect(markerElement).toHaveAttribute('style', 'left: 30%;')
      expect(markerElement).not.toHaveAttribute('aria-label')
      expect(
        markerElement.querySelector('.dnb-sr-only')
      ).toHaveTextContent('30')
      expect(markerElement).toHaveAttribute('tabIndex', '0')
      expect(await axeComponent(container)).toHaveNoViolations()

      rerender(
        <Slider
          label="Label"
          extensions={{ marker: { instance: SliderMarker, value: 120 } }}
        />
      )

      expect(markerElement).toHaveAttribute('style', 'left: 100%;')
      expect(
        markerElement.querySelector('.dnb-sr-only')
      ).toHaveTextContent('120')
    })

    it('shows Tooltip with info', async () => {
      const marker = { instance: SliderMarker, value: 30 }
      render(<Slider extensions={{ marker }} />)

      const sliderElement = document.querySelector('.dnb-slider')
      const markerElement = sliderElement.querySelector(
        '.dnb-slider__marker'
      )

      fireEvent.mouseEnter(markerElement)

      await waitFor(() => {
        const tooltipElement = getTooltipElements(0)
        expect(tooltipElement).toHaveClass('dnb-tooltip--active')
        expect(tooltipElement).toHaveTextContent('30')
      })
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

      await waitFor(() => {
        const tooltipElement = getTooltipElements(0)
        expect(tooltipElement).toHaveTextContent(marker.text)
      })
    })
  })

  describe('in skeleton mode', () => {
    const marker = { instance: SliderMarker, value: 30 }

    it.each([
      ['set', (slider: ReactNode) => slider, true],
      [
        'inherited from the Provider',
        (slider: ReactNode) => <Provider skeleton>{slider}</Provider>,
        undefined,
      ],
    ])(
      'should not be interactive when skeleton is %s',
      async (_, wrap, skeleton) => {
        const onChange = vi.fn()

        render(
          wrap(
            <Slider
              {...props}
              skeleton={skeleton}
              tooltip
              alwaysShowTooltip
              extensions={{ marker }}
              onChange={onChange}
            />
          )
        )

        const rangeElement = getRangeElement(0)
        const markerElement = document.querySelector('.dnb-slider__marker')

        expect(rangeElement).toBeDisabled()
        expect(markerElement).toHaveAttribute('tabindex', '-1')

        fireEvent.change(rangeElement, { target: { value: '80' } })
        simulateMouseMove({ pageX: 80, width: 100, height: 10 })
        fireEvent.mouseEnter(markerElement)
        fireEvent.focus(markerElement)
        await wait(10)

        expect(onChange).not.toHaveBeenCalled()
        expect(document.querySelector('.dnb-tooltip')).toBeNull()
      }
    )

    it('should stay interactive when skeleton is false', () => {
      render(
        <Provider skeleton>
          <Slider {...props} skeleton={false} extensions={{ marker }} />
        </Provider>
      )

      expect(getRangeElement(0)).not.toBeDisabled()
      expect(
        document.querySelector('.dnb-slider__marker')
      ).toHaveAttribute('tabindex', '0')
    })
  })

  it('has events that return a correct value', () => {
    const onChange = vi.fn()

    render(<Slider onChange={onChange} />)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toHaveBeenCalledTimes(1)

    const changeEvent = onChange.mock.calls[0][0]
    expect(changeEvent.rawValue).toBe(80)
    expect(changeEvent.value).toBe(80)
    expect(changeEvent.number).toBeNull()
    expect(changeEvent.event).toBeInstanceOf(MouseEvent)
    expect(changeEvent.event.pageX).toBe(80)
    expect(changeEvent.event.pageY).toBe(0)
  })

  it('return valid value if numberFormat was given', () => {
    const onChange = vi.fn()

    render(
      <Slider
        onChange={onChange}
        numberFormat={{ currency: true, decimals: 1 }}
      />
    )

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toHaveBeenCalledTimes(1)

    const changeEvent = onChange.mock.calls[0][0]
    expect(changeEvent.rawValue).toBe(80)
    expect(changeEvent.value).toBe(80)
    expect(changeEvent.number).toBe('80,0 kr')
    expect(changeEvent.event).toBeInstanceOf(MouseEvent)
    expect(changeEvent.event.pageX).toBe(80)

    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-valuetext')
    ).toBe('80,0 kroner')
  })

  it('will not emit onChange with same value twice', () => {
    const onChange = vi.fn()

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
      const [value, setValue] = useState(props.value)
      const onChangeHandler = (event: SliderOnChangeParams) => {
        setValue(event.value)
        if (props.onChange) {
          props.onChange(event)
        }
      }
      return <Slider {...props} value={value} onChange={onChangeHandler} />
    }

    it('will not emit onChange with same value twice', () => {
      const onChange = vi.fn()

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
        const [, setMinVal] = useState(0)
        const [, setMaxVal] = useState(200)

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
      const onChange = vi.fn()

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

      const firstCall = onChange.mock.calls[0][0]
      expect(firstCall.rawValue).toBe(80)
      expect(firstCall.value).toEqual([20, 30, 80])
      expect(firstCall.number).toBe('80,0 kr')
      expect(firstCall.event).toBeInstanceOf(MouseEvent)
      expect(firstCall.event.pageX).toBe(80)

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })

      const secondCall = onChange.mock.calls[1][0]
      expect(secondCall.rawValue).toBe(10)
      expect(secondCall.value).toEqual([10, 30, 80])
      expect(secondCall.number).toBe('10,0 kr')
      expect(secondCall.event).toBeInstanceOf(MouseEvent)
      expect(secondCall.event.pageX).toBe(10)

      fireEvent.mouseDown(getRangeElement(1))

      simulateMouseMove({ pageX: 40, width: 100, height: 10 })

      expect(onChange.mock.calls[2][0].value).toEqual([10, 40, 80])
    })

    it('updates thumb index and returns correct event value', () => {
      const onChange = vi.fn()

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
      const onChange = vi.fn()

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
      const onChange = vi.fn()

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
      const onChange = vi.fn()

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

      expect(getTooltipElements(0).textContent).toBe('−40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 3; left: 0%;'
      )

      expect(getTooltipElements(1).textContent).toBe('80,0 kr')
      expect(getThumbElements(1).getAttribute('style')).toBe(
        'z-index: 3; left: 85.71428571428571%;'
      )

      simulateMouseMove({ pageX: 10, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('−26,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 10%;'
      )

      simulateMouseMove({ pageX: 0, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('−40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 0%;'
      )

      simulateMouseMove({ pageX: -10, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('−40,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 0%;'
      )

      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(getTooltipElements(0).textContent).toBe('−12,0 kr')
      expect(getThumbElements(0).getAttribute('style')).toBe(
        'z-index: 4; left: 20%;'
      )

      resetMouseSimulation()
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
      expect(element).toHaveClass(
        'dnb-slider dnb-form-component dnb-slider__label--vertical',
        { exact: true }
      )
    })
  })

  describe('drag lifecycle', () => {
    const getTrack = () =>
      document.querySelector('.dnb-slider__track') as HTMLElement
    const getThumbButton = (index = 0) =>
      document.querySelectorAll('.dnb-slider__thumb .dnb-button')[
        index
      ] as HTMLElement

    const dispatch = <E extends Event>(target: EventTarget, event: E) => {
      act(() => {
        target.dispatchEvent(event)
      })

      return event
    }

    const mouse = (target: EventTarget, type: string, pageX?: number) => {
      const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
      })
      if (typeof pageX === 'number') {
        Object.defineProperty(event, 'pageX', { value: pageX })
      }

      return dispatch(target, event)
    }

    const touch = (target: EventTarget, type: string, pageX?: number) => {
      const event = new TouchEvent(type, {
        bubbles: true,
        cancelable: true,
      })
      if (typeof pageX === 'number') {
        Object.defineProperty(event, 'changedTouches', {
          value: [{ pageX, pageY: 0 }],
        })
      }

      return dispatch(target, event)
    }

    // Browsers send pointerdown before touchstart and mousedown
    const pointerDown = (target: Element, pointerType: string) => {
      act(() => {
        fireEvent.pointerDown(target, { pointerType })
      })
    }

    const renderSlider = (
      sliderProps: Partial<SliderAllProps> = {}
    ): {
      onChange: ReturnType<typeof vi.fn>
      onDragStart: ReturnType<typeof vi.fn>
      onDragEnd: ReturnType<typeof vi.fn>
      rerender: (sliderProps: Partial<SliderAllProps>) => void
      unmount: () => void
    } => {
      const onChange = vi.fn()
      const onDragStart = vi.fn()
      const onDragEnd = vi.fn()
      const element = (props: Partial<SliderAllProps>) => (
        <Slider
          id="drag"
          min={0}
          max={100}
          value={70}
          onChange={onChange}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          {...sliderProps}
          {...props}
        />
      )
      const { rerender, unmount } = render(element({}))
      getTrack().getBoundingClientRect = () => mockDOMRect(100, 10)

      return {
        onChange,
        onDragStart,
        onDragEnd,
        rerender: (props) => rerender(element(props)),
        unmount,
      }
    }

    it.each([
      ['single', 70, 0, 90],
      ['range', [20, 70], 1, [20, 90]],
    ])(
      'should end a %s drag when the mouse is released outside the body',
      (_, value, thumb, draggedValue) => {
        const { onChange, onDragStart, onDragEnd } = renderSlider({
          value: value as SliderAllProps['value'],
        })

        pointerDown(getThumbButton(thumb), 'mouse')
        mouse(getThumbButton(thumb), 'mousedown', 70)
        mouse(document.body, 'mousemove', 90)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][0].value).toEqual(draggedValue)

        // Below a short body, the mouseup target is <html>
        const mouseUp = mouse(document.documentElement, 'mouseup', 90)
        expect(onDragStart).toHaveBeenCalledTimes(1)
        expect(onDragEnd).toHaveBeenCalledTimes(1)
        expect(onDragEnd.mock.calls[0][0].event).toBe(mouseUp)

        // A hover without a pressed button must not move the thumb, or
        // block other controls by preventing the default
        const hover = mouse(document.body, 'mousemove', 10)
        expect(hover.defaultPrevented).toBe(false)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(getRangeElement(thumb).value).toBe('90')

        mouse(document.body, 'mouseup', 10)
        expect(onDragEnd).toHaveBeenCalledTimes(1)
      }
    )

    it.each([
      ['single', 70, 0],
      ['range', [20, 70], 1],
    ])('should end a %s touch drag on touchcancel', (_, value, thumb) => {
      const { onChange, onDragStart, onDragEnd } = renderSlider({
        value: value as SliderAllProps['value'],
      })

      pointerDown(getThumbButton(thumb), 'touch')
      const touchStart = touch(getThumbButton(thumb), 'touchstart', 70)
      const touchMove = touch(document.body, 'touchmove', 80)
      expect(onDragStart).toHaveBeenCalledTimes(1)
      expect(onDragStart.mock.calls[0][0].event.nativeEvent).toBe(
        touchStart
      )
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][0].event).toBe(touchMove)

      const touchCancel = touch(getThumbButton(thumb), 'touchcancel')
      expect(onDragEnd).toHaveBeenCalledTimes(1)
      expect(onDragEnd.mock.calls[0][0].event).toBe(touchCancel)

      // A new finger or a hovering mouse elsewhere must not move the thumb
      const paragraph = document.createElement('p')
      document.body.appendChild(paragraph)
      touch(paragraph, 'touchstart', 10)
      touch(paragraph, 'touchmove', 0)
      touch(paragraph, 'touchend', 0)
      mouse(paragraph, 'mousemove', 0)
      paragraph.remove()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(getRangeElement(thumb).value).toBe('80')
      expect(onDragEnd).toHaveBeenCalledTimes(1)
    })

    it('should fire the drag callbacks once for a tap', () => {
      const { onChange, onDragStart, onDragEnd } = renderSlider()

      pointerDown(getTrack(), 'touch')
      const touchStart = touch(getTrack(), 'touchstart', 30)
      const touchEnd = touch(getTrack(), 'touchend', 30)

      // The browser follows a tap with compatibility mouse events
      mouse(getTrack(), 'mousedown', 30)
      mouse(getTrack(), 'mouseup', 30)

      expect(onDragStart).toHaveBeenCalledTimes(1)
      expect(onDragStart.mock.calls[0][0].event.nativeEvent).toBe(
        touchStart
      )
      expect(onDragEnd).toHaveBeenCalledTimes(1)
      expect(onDragEnd.mock.calls[0][0].event).toBe(touchEnd)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][0].value).toBe(30)
    })

    it('should start a mouse drag after a touch drag', () => {
      const { onChange, onDragStart, onDragEnd } = renderSlider()

      // A touch drag has no compatibility mouse events
      pointerDown(getThumbButton(), 'touch')
      touch(getThumbButton(), 'touchstart', 70)
      touch(document.body, 'touchmove', 60)
      touch(document.body, 'touchend', 60)

      pointerDown(getThumbButton(), 'mouse')
      const mouseDown = mouse(getThumbButton(), 'mousedown', 60)
      const mouseMove = mouse(document.body, 'mousemove', 20)
      mouse(document.body, 'mouseup', 20)

      expect(onDragStart).toHaveBeenCalledTimes(2)
      expect(onDragStart.mock.calls[1][0].event.nativeEvent).toBe(
        mouseDown
      )
      expect(onDragEnd).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange.mock.calls[1][0].event).toBe(mouseMove)
      expect(getRangeElement(0).value).toBe('20')
    })

    it('should start a mouse drag after a touch without pointer events', () => {
      const { onChange, onDragStart } = renderSlider()

      touch(getThumbButton(), 'touchstart', 70)
      touch(document.body, 'touchend', 70)

      // Without pointerdown, the first mousedown counts as a compatibility event
      mouse(getThumbButton(), 'mousedown', 70)
      mouse(document.body, 'mouseup', 70)
      mouse(getThumbButton(), 'mousedown', 70)
      mouse(document.body, 'mousemove', 20)

      expect(onDragStart).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(getRangeElement(0).value).toBe('20')
    })

    it.each([
      ['disabled', { disabled: true }],
      ['skeleton', { skeleton: true }],
    ])(
      'should not start a drag when %s',
      (_, sliderProps: Partial<SliderAllProps>) => {
        const { onChange, onDragStart, onDragEnd } =
          renderSlider(sliderProps)

        pointerDown(getThumbButton(), 'mouse')
        mouse(getThumbButton(), 'mousedown', 70)
        const mouseMove = mouse(document.body, 'mousemove', 20)
        mouse(document.body, 'mouseup', 20)

        pointerDown(getTrack(), 'touch')
        touch(getTrack(), 'touchstart', 30)
        touch(getTrack(), 'touchend', 30)
        mouse(getTrack(), 'mousedown', 30)
        mouse(getTrack(), 'mouseup', 30)

        expect(onDragStart).not.toHaveBeenCalled()
        expect(onDragEnd).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        expect(mouseMove.defaultPrevented).toBe(false)
      }
    )

    it('should stop changing the value when disabled during a drag', () => {
      const { onChange, onDragStart, onDragEnd, rerender } = renderSlider()

      pointerDown(getThumbButton(), 'mouse')
      mouse(getThumbButton(), 'mousedown', 70)
      mouse(document.body, 'mousemove', 80)
      expect(onChange).toHaveBeenCalledTimes(1)

      rerender({ disabled: true })
      mouse(document.body, 'mousemove', 20)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(getRangeElement(0).value).toBe('80')

      // The drag still ends once, with the real release
      const mouseUp = mouse(document.body, 'mouseup', 20)
      mouse(document.body, 'mouseup', 20)
      expect(onDragStart).toHaveBeenCalledTimes(1)
      expect(onDragEnd).toHaveBeenCalledTimes(1)
      expect(onDragEnd.mock.calls[0][0].event).toBe(mouseUp)
    })

    it('should remove the drag listeners when unmounted during a drag', () => {
      const { onChange, onDragEnd, unmount } = renderSlider()

      // Re-render before the drag, so its handlers come from a later render
      pointerDown(getThumbButton(), 'mouse')
      mouse(getThumbButton(), 'mousedown', 70)
      mouse(document.body, 'mousemove', 60)
      mouse(document.body, 'mouseup', 60)

      pointerDown(getThumbButton(), 'mouse')
      mouse(getThumbButton(), 'mousedown', 60)
      mouse(document.body, 'mousemove', 50)
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onDragEnd).toHaveBeenCalledTimes(1)

      unmount()

      const mouseMove = mouse(document.body, 'mousemove', 20)
      mouse(document.body, 'mouseup', 20)
      expect(mouseMove.defaultPrevented).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onDragEnd).toHaveBeenCalledTimes(1)
    })

    it('should start one drag for a press on the range input', () => {
      const { onDragStart, onDragEnd } = renderSlider()

      // The press bubbles from the range input to the track
      mouse(getRangeElement(0), 'mousedown', 70)
      mouse(document.body, 'mouseup', 70)
      const mouseMove = mouse(document.body, 'mousemove', 20)

      expect(onDragStart).toHaveBeenCalledTimes(1)
      expect(onDragEnd).toHaveBeenCalledTimes(1)
      expect(mouseMove.defaultPrevented).toBe(false)
    })

    it('should end a drag once when released on the body', () => {
      const { onChange, onDragStart, onDragEnd } = renderSlider()

      pointerDown(getThumbButton(), 'mouse')
      const mouseDown = mouse(getThumbButton(), 'mousedown', 70)
      mouse(document.body, 'mousemove', 90)
      const mouseUp = mouse(document.body, 'mouseup', 90)
      mouse(document.documentElement, 'mouseup', 90)

      expect(onDragStart).toHaveBeenCalledTimes(1)
      expect(onDragStart.mock.calls[0][0].event.nativeEvent).toBe(
        mouseDown
      )
      expect(onDragEnd).toHaveBeenCalledTimes(1)
      expect(onDragEnd.mock.calls[0][0].event).toBe(mouseUp)
      expect(onChange).toHaveBeenCalledTimes(1)

      // The keyboard still changes the value after the drag
      fireEvent.change(getRangeElement(0), { target: { value: '40' } })
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange.mock.calls[1][0].value).toBe(40)
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

  it('shows the track and markers in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/dnb-slider.scss'))

    // No forced-color-adjust: none on the track and the marker. System
    // colors are kept without it, and on the marker it would replace the
    // system focus ring with the brand-colored box-shadow.
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-slider__line \{\s*background-color: Highlight;\s*\}/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-slider__line__after \{\s*background-color: Canvas;\s*outline: 1px solid CanvasText;/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-slider__state--disabled \.dnb-slider__line \{\s*background-color: GrayText;/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-slider__state--disabled \.dnb-slider__line__after \{\s*background-color: Canvas;\s*outline-color: GrayText;/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-slider__marker \{\s*background-color: CanvasText;\s*\}/
    )
  })
})

const getButtonHelper = (): HTMLInputElement => {
  return document.querySelector('.dnb-slider__button-helper')
}
