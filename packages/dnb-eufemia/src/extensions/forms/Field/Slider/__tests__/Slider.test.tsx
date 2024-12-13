import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { DataContext, Field, Form } from '../../..'
import userEvent from '@testing-library/user-event'

import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.Slider', () => {
  it('should show error when required and value is empty', () => {
    render(
      <Form.Handler>
        <Field.Slider required />
      </Form.Handler>
    )

    fireEvent.submit(document.querySelector('form'))

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )
  })

  describe('single thumb', () => {
    it('with "value"', () => {
      const value = 70

      render(<Field.Slider value={value} />)

      expect(parseFloat(getButtonHelper().value)).toBe(value)

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(parseFloat(getButtonHelper().value)).toBe(value + 10)
    })

    it('with "defaultValue"', () => {
      const value = 70

      render(
        <Form.Handler>
          <Field.Slider defaultValue={value} />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(parseFloat(getButtonHelper().value)).toBe(value)
    })

    it('with "path"', () => {
      render(
        <Form.Handler data={{ myValue: 30 }}>
          <Field.Number path="/myValue" />
          <Field.Slider path="/myValue" />
        </Form.Handler>
      )

      const input = document.querySelector('.dnb-input input')

      expect(input).toHaveValue('30')

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(input).toHaveValue('80')
    })

    it('should use min and max value from path', () => {
      render(
        <Form.Handler
          data={{ myValue: 400, minValue: 100, maxValue: 1000 }}
        >
          <Field.Number path="/myValue" />
          <Field.Slider path="/myValue" min="/minValue" max="/maxValue" />
        </Form.Handler>
      )

      const input = document.querySelector('.dnb-input input')

      expect(input).toHaveValue('400')

      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(input).toHaveValue('820')
    })

    it('should store "displayValue" in data context', async () => {
      let dataContext = null

      render(
        <Form.Handler
          data={{ myValue: 400, minValue: 100, maxValue: 1000 }}
        >
          <Field.Slider
            path="/myValue"
            min="/minValue"
            max="/maxValue"
            numberFormat={{ currency: 'EUR' }}
          />
          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/myValue': '400,00 €',
      })

      await userEvent.keyboard('{Tab>3}')
      await userEvent.type(document.activeElement, '{ArrowRight}')

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/myValue': '401,00 €',
      })
    })

    it('should use step value from path', () => {
      render(
        <Form.Handler
          data={{ myValue: 400, minValue: 100, maxValue: 1000, step: 10 }}
        >
          <Field.Number path="/myValue" />
          <Field.Slider
            path="/myValue"
            min="/minValue"
            max="/maxValue"
            step="/step"
          />
        </Form.Handler>
      )

      const input = document.querySelector('.dnb-input input')

      expect(input).toHaveValue('400')

      const addElem = document.querySelector('.dnb-slider__button--add')
      fireEvent.click(addElem)

      expect(input).toHaveValue('410')
    })
  })

  describe('multi thumb', () => {
    it('with "value"', () => {
      const onChange = jest.fn()
      const value = [30, 40]

      render(<Field.Slider value={value} onChange={onChange} />)

      const [firstThumb, secondThumb] = Array.from(
        document.querySelectorAll('.dnb-slider__button-helper')
      )

      fireEvent.focus(firstThumb)
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith([40, 80])

      resetMouseSimulation()

      fireEvent.focus(secondThumb)
      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith([20, 40])
    })

    it('with "paths"', () => {
      render(
        <Form.Handler data={{ first: 30, second: 50 }}>
          <Field.Number path="/first" />
          <Field.Number path="/second" />
          <Field.Slider paths={['/first', '/second']} />
        </Form.Handler>
      )

      const [firstThumb, secondThumb] = Array.from(
        document.querySelectorAll('.dnb-slider__button-helper')
      )
      const [firstInput, secondInput] = Array.from(
        document.querySelectorAll('.dnb-input input')
      )

      fireEvent.focus(firstThumb)
      simulateMouseMove({ pageX: 80, width: 100, height: 10 })

      expect(firstInput).toHaveValue('80')
      expect(secondInput).toHaveValue('50')

      resetMouseSimulation()

      fireEvent.focus(secondThumb)
      simulateMouseMove({ pageX: 20, width: 100, height: 10 })

      expect(firstInput).toHaveValue('50')
      expect(secondInput).toHaveValue('20')
    })

    it('should react on "paths" value change', async () => {
      render(
        <Form.Handler data={{ first: 30, second: 50 }}>
          <Field.Number path="/first" />
          <Field.Number path="/second" />
          <Field.Slider paths={['/first', '/second']} />
        </Form.Handler>
      )

      const [firstThumb, secondThumb] = Array.from(
        document.querySelectorAll('.dnb-slider__thumb')
      )
      const [firstInput, secondInput] = Array.from(
        document.querySelectorAll('.dnb-input input')
      )

      await userEvent.type(firstInput, '{Backspace>8}80')

      expect(firstThumb).toHaveStyle('left: 80%')
      expect(secondThumb).toHaveStyle('left: 50%')

      await userEvent.type(secondInput, '{Backspace>2}20')

      expect(firstThumb).toHaveStyle('left: 80%')
      expect(secondThumb).toHaveStyle('left: 20%')
    })
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
