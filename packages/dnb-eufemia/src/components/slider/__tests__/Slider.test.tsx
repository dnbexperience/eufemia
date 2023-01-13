/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Slider from '../Slider'

import type { SliderAllProps, onChangeEventProps } from '../Slider'
import { format } from '../../number-format/NumberUtils'
import { wait } from '@testing-library/user-event/dist/utils'

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

    expect(props.on_change).toBeCalledTimes(1)

    expect(
      Array.from(document.querySelector('.dnb-form-label').classList)
    ).toEqual(expect.arrayContaining(['dnb-form-label--vertical']))

    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-valuetext')
    ).toBe('80 norske kroner')
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

    expect(parseFloat(getButtonHelper().value)).toBe(20) // sice we use reverse in vertical mode
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
    expect(addElem.getAttribute('aria-label')).toBe(
      'Øk (80,0 norske kroner)'
    )

    fireEvent.click(subtractElem)
    expect(parseFloat(getButtonHelper().value)).toBe(70)
    expect(subtractElem.getAttribute('aria-label')).toBe(
      'Reduser (70,0 norske kroner)'
    )
  })

  describe('Tooltip', () => {
    const IS_TEST = globalThis.IS_TEST
    beforeEach(() => {
      document.body.innerHTML = ''
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
      const getTooltipElem = () => document.querySelector('.dnb-tooltip')

      expect(getTooltipElem().textContent).toBe('70,00 €')
      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.mouseEnter(thumbElem)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await wait(100)

      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      expect(getTooltipElem().textContent).toBe('80,00 €')

      fireEvent.mouseLeave(thumbElem)

      await wait(300)

      expect(Array.from(getTooltipElem().classList)).toEqual([
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
      const getTooltipElem = () => document.querySelector('.dnb-tooltip')

      expect(getTooltipElem().textContent).toBe('70')
      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.focus(thumbElem)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      await wait(100)

      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      expect(getTooltipElem().textContent).toBe('80')

      fireEvent.blur(thumbElem)

      await wait(300)

      expect(Array.from(getTooltipElem().classList)).toEqual([
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
      const getTooltipElem = () => document.querySelector('.dnb-tooltip')

      expect(getTooltipElem().textContent).toBe('70 %')
      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.mouseEnter(thumbElem)

      simulateMouseMove({ pageX: 80.5, width: 100, height: 10 })

      await wait(100)

      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      expect(getTooltipElem().textContent).toBe('80,5 %')

      fireEvent.mouseLeave(thumbElem)

      await wait(300)

      expect(Array.from(getTooltipElem().classList)).toEqual([
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
      const getTooltipElem = () => document.querySelector('.dnb-tooltip')

      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
      ])

      fireEvent.mouseEnter(thumbElem)

      await wait(100)

      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      fireEvent.mouseLeave(thumbElem)

      // Enter Tooltip, and with that, prevent it from hiding/disappearing
      fireEvent.mouseEnter(getTooltipElem())

      await wait(300)

      expect(Array.from(getTooltipElem().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])
    })
  })

  it('has events that return a correct value', () => {
    const onChange = jest.fn()

    render(<Slider {...props} onChange={onChange} />)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toBeCalledTimes(1)

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
    expect(onChange).toBeCalledWith(changeObject)
  })

  it('return valid value if numberFormat was given', () => {
    const onChange = jest.fn()

    render(
      <Slider
        {...props}
        onChange={onChange}
        numberFormat={{ currency: true, decimals: 1 }}
      />
    )

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toBeCalledTimes(1)

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
    expect(onChange).toBeCalledWith(changeObject)

    expect(
      document
        .querySelector('.dnb-slider__button-helper')
        .getAttribute('aria-valuetext')
    ).toBe('80,0 norske kroner')
  })

  it('will not emit onChange with same value twice', () => {
    const onChange = jest.fn()

    render(<Slider {...props} onChange={onChange} />)

    simulateMouseMove({ pageX: 80, width: 100, height: 10 })
    simulateMouseMove({ pageX: 80, width: 100, height: 10 })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange.mock.calls[0][0].value).toBe(80)
  })

  it('should not have type=button', () => {
    render(<Slider {...props} />)
    expect(
      document
        .querySelector('.dnb-slider__thumb .dnb-button')
        .hasAttribute('type')
    ).toBe(false)
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

    const getThumbElements = (index: number) =>
      document.querySelectorAll('.dnb-slider__thumb')[index] as HTMLElement

    const getRangeElement = (index: number) =>
      document.querySelectorAll('[type="range"]')[
        index
      ] as HTMLInputElement

    it('will not emit onChange with same value twice', () => {
      const onChange = jest.fn()

      props.value = [20, 30, 90]
      render(<SliderWithStateUpdate {...props} onChange={onChange} />)

      fireEvent.mouseDown(getRangeElement(1))
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(onChange).toBeCalledTimes(1)
      expect(onChange.mock.calls[0][0].value).toEqual([20, 30, 80])

      resetMouseSimulation()
    })

    it('will net need on external prop changes', () => {
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

      expect(onChange).toBeCalledWith({
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

      expect(onChange).toBeCalledWith({
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

      const getThumbElements = (index: number) =>
        document.querySelectorAll('.dnb-slider__thumb')[
          index
        ] as HTMLElement

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

      const getThumbElements = (index: number) =>
        document.querySelectorAll('.dnb-slider__thumb')[
          index
        ] as HTMLElement

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

const resetMouseSimulation = () => {
  const elem = document.querySelector('.dnb-slider__track')
  if (elem) {
    fireEvent.mouseUp(elem)
  }
}

const simulateMouseMove = (props) => {
  fireEvent.mouseUp(document.querySelector('.dnb-slider__track'))
  fireEvent.mouseDown(document.querySelector('.dnb-slider__track'))
  const mouseMove = new CustomEvent('mousemove', {
    detail: props,
  })
  document.body.dispatchEvent(mouseMove)
}
