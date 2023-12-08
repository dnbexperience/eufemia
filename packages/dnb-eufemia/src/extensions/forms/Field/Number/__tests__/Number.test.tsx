import React from 'react'
import { axeComponent, wait } from '../../../../../core/jest/jestSetup'
import { screen, render, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Field from '../../'

describe('Field.Number', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<Field.Number value={42} />)
      expect(screen.getByDisplayValue('42')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(<Field.Number placeholder="Enter some number" />)
      expect(
        // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
        screen.getByText('Enter some number')
      ).toBeInTheDocument()
    })

    it('renders label', () => {
      render(<Field.Number label="Number label" />)
      expect(screen.getByLabelText('Number label')).toBeInTheDocument()
    })

    it('should support disabled prop', () => {
      const { rerender } = render(
        <Field.Number label="Disabled label" disabled />
      )

      const labelElement = () => document.querySelector('label')

      expect(labelElement()).toHaveAttribute('disabled')

      rerender(<Field.Number label="Disabled label" />)

      expect(labelElement()).not.toHaveAttribute('disabled')
    })

    it('renders autoComplete', () => {
      const { rerender } = render(
        <Field.Number autoComplete="postalCode" />
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('postalCode')

      rerender(<Field.Number path="/postalCode" autoComplete="tel" />)
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'postalCode'
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('tel')
    })

    it('renders name based on path', () => {
      render(<Field.Number path="/postalCode" />)
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'postalCode'
      )
    })

    it('renders error', () => {
      render(<Field.Number error={new Error('This is what went wrong')} />)
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('shows error border', () => {
      render(<Field.Number error={new Error('This is what went wrong')} />)
      const element = document.querySelector('.dnb-input')
      expect(element.className).toContain('dnb-input__status--error')
    })

    it('formats with given thousandSeparator', () => {
      const { rerender } = render(
        <Field.Number value={12345} thousandSeparator=" " />
      )
      expect(screen.getByDisplayValue('12 345')).toBeInTheDocument()
      rerender(<Field.Number value={12345} thousandSeparator="x" />)
      expect(screen.getByDisplayValue('12x345')).toBeInTheDocument()
    })

    it('formats with given decimalSymbol', () => {
      render(<Field.Number value={97531.2468} decimalSymbol=":" />)
      expect(screen.getByDisplayValue('97531:2468')).toBeInTheDocument()
    })

    it('formats with percent', () => {
      render(<Field.Number value={12345} percent />)
      expect(document.querySelector('input')).toHaveValue('12 345 %')
    })

    it('formats with same decimal limit', () => {
      render(<Field.Number value={42.51} decimalLimit={2} />)
      expect(screen.getByDisplayValue('42,51')).toBeInTheDocument()
    })

    it('formats with smaller decimal limit', () => {
      render(<Field.Number value={5876.789} decimalLimit={2} />)
      expect(document.querySelector('input')).toHaveValue('5876,78')
    })

    it('formats with higher decimal limit', () => {
      render(<Field.Number value={123.456} decimalLimit={4} />)
      expect(screen.getByDisplayValue('123,456')).toBeInTheDocument()
    })

    it('should align input correctly', () => {
      render(
        <>
          <Field.Number value={123} align="left" />
          <Field.Number value={123} align="center" />
          <Field.Number value={123} align="right" />
        </>
      )

      const inputs = document.querySelectorAll('.dnb-input')
      expect(inputs[0]).toHaveClass('dnb-input__align--left')
      expect(inputs[1]).toHaveClass('dnb-input__align--center')
      expect(inputs[2]).toHaveClass('dnb-input__align--right')
    })

    it('should have decimal input mode', () => {
      render(<Field.Number />)

      const input = document.querySelector('.dnb-input__input')

      expect(input).toHaveAttribute('inputmode', 'decimal')
    })
  })

  describe('event handlers', () => {
    it('calls onChange for every change of an integer input value', async () => {
      const onChange = jest.fn()
      render(<Field.Number value={23} onChange={onChange} />)
      const input = document.querySelector('input')
      await userEvent.type(input, '579012')

      expect(onChange.mock.calls).toHaveLength(6)
      expect(onChange.mock.calls[0][0]).toEqual(235)
      expect(onChange.mock.calls[1][0]).toEqual(2357)
      expect(onChange.mock.calls[2][0]).toEqual(23579)
      expect(onChange.mock.calls[3][0]).toEqual(235790)
      expect(onChange.mock.calls[4][0]).toEqual(2357901)
      expect(onChange.mock.calls[5][0]).toEqual(23579012)
    })

    it('calls onChange for every change of a float input value', async () => {
      const onChange = jest.fn()
      render(<Field.Number value={24.5} onChange={onChange} />)
      const input = document.querySelector('input')
      await userEvent.type(input, '7621')

      expect(onChange.mock.calls).toHaveLength(4)
      expect(onChange.mock.calls[0][0]).toEqual(24.57)
      expect(onChange.mock.calls[1][0]).toEqual(24.576)
      expect(onChange.mock.calls[2][0]).toEqual(24.5762)
      expect(onChange.mock.calls[3][0]).toEqual(24.57621)
    })
  })

  describe('error handling', () => {
    it('should not show error initially', () => {
      render(<Field.Number required />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should show error initially when validateInitially', () => {
      render(<Field.Number required validateInitially />)
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    describe('validation based on required-prop', () => {
      it('should show error for empty value', async () => {
        render(<Field.Number value={1} required />)
        const input = document.querySelector('input')
        await userEvent.type(input, '{backspace}')
        input.blur()
        await wait(0)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error when value is not empty', async () => {
        render(<Field.Number value={1} required />)
        const input = document.querySelector('input')
        await userEvent.type(input, '2')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on minimum-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.Number value={50} minimum={2000} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '1')
        input.blur()
        await wait(0)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', async () => {
        render(<Field.Number value={65} minimum={40} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '5')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on maximum-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.Number value={50} maximum={100} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '0')
        input.blur()
        await wait(0)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', async () => {
        render(<Field.Number value={20} maximum={500} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '1')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })

  describe('with step controls', () => {
    it('renders with control buttons', () => {
      render(<Field.Number showStepControls />)
      const buttons = document.querySelectorAll('.dnb-button')
      expect(buttons.length).toBe(2)
    })

    it('controls input value correctly using control buttons', () => {
      render(<Field.Number showStepControls value={0} step={10} />)
      const input = document.querySelector('input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('10')

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('0')
    })

    it('controls input value correctly using arrow keys', async () => {
      render(<Field.Number showStepControls value={0} step={10} />)

      const input = document.querySelector('input')

      act(() => {
        input.focus()
      })

      await userEvent.keyboard('{ArrowUp}')

      expect(input).toHaveValue('10')

      await userEvent.keyboard('{ArrowDown}')

      expect(input).toHaveValue('0')
    })

    it('respects input max/min props', () => {
      render(
        <Field.Number
          showStepControls
          value={1}
          maximum={2}
          minimum={0}
          step={3}
        />
      )

      const input = document.querySelector('input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      expect(increaseButton).not.toBeDisabled()
      expect(decreaseButton).not.toBeDisabled()

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('2')
      expect(increaseButton).toBeDisabled()

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('2')

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('0')
      expect(increaseButton).not.toBeDisabled()
      expect(decreaseButton).toBeDisabled()

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('0')
    })

    it('has correct accessibility props', () => {
      const settings = {
        showStepControls: true,
        value: 10,
        maximum: 20,
        minimum: 0,
        step: 5,
      }
      render(<Field.Number {...settings} />)

      const input = document.querySelector('.dnb-input__input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      expect(input).toHaveAttribute('role', 'spinbutton')
      expect(input).toHaveAttribute(
        'aria-valuemin',
        String(settings.minimum)
      )
      expect(input).toHaveAttribute(
        'aria-valuemax',
        String(settings.maximum)
      )
      expect(input).toHaveAttribute(
        'aria-valuenow',
        String(settings.value)
      )
      expect(input).toHaveAttribute(
        'aria-valuetext',
        String(settings.value)
      )

      expect(decreaseButton).toHaveAttribute('aria-hidden', 'true')
      expect(increaseButton).toHaveAttribute('aria-hidden', 'true')
    })

    it('should validate with ARIA rules', async () => {
      const element = render(
        <Field.Number
          label="Label"
          showStepControls
          value={5}
          maximum={20}
          minimum={10}
          step={5}
          required
          validateInitially
        />
      )

      expect(await axeComponent(element)).toHaveNoViolations()
    })
  })

  it('should validate with ARIA rules', async () => {
    const element = render(
      <Field.Number label="Label" required validateInitially />
    )

    expect(await axeComponent(element)).toHaveNoViolations()
  })
})
