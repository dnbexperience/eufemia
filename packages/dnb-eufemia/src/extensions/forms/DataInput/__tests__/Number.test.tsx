import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataInput from '..'

describe('DataInput.Number', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<DataInput.Number value={42} />)
      expect(screen.getByDisplayValue('42')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(<DataInput.Number placeholder="Enter some number" />)
      expect(
        // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
        screen.getByText('Enter some number')
      ).toBeInTheDocument()
    })
    it('renders label', () => {
      render(<DataInput.Number label="Number label" />)
      expect(screen.getByLabelText('Number label')).toBeInTheDocument()
    })

    it('renders error', () => {
      render(
        <DataInput.Number error={new Error('This is what went wrong')} />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('formats with given thousandSeparator', () => {
      const { rerender } = render(
        <DataInput.Number value={12345} thousandSeparator=" " />
      )
      expect(screen.getByDisplayValue('12 345')).toBeInTheDocument()
      rerender(<DataInput.Number value={12345} thousandSeparator="x" />)
      expect(screen.getByDisplayValue('12x345')).toBeInTheDocument()
    })

    it('formats with given decimalSymbol', () => {
      render(<DataInput.Number value={97531.2468} decimalSymbol=":" />)
      expect(screen.getByDisplayValue('97531:2468')).toBeInTheDocument()
    })

    it('formats with same number of decimals', () => {
      render(<DataInput.Number value={42.51} decimals={2} />)
      expect(screen.getByDisplayValue('42,51')).toBeInTheDocument()
    })

    it('formats with smaller number of decimals', () => {
      render(<DataInput.Number value={5876.789} decimals={2} />)
      expect(screen.getByDisplayValue('5876,79')).toBeInTheDocument()
    })

    it('formats with higher number of decimals', () => {
      render(<DataInput.Number value={123.456} decimals={4} />)
      expect(screen.getByDisplayValue('123,456')).toBeInTheDocument()
    })

    it('formats with fixed decimals, same as value', () => {
      render(<DataInput.Number value={13.579} fixedDecimals={3} />)
      expect(screen.getByDisplayValue('13,579')).toBeInTheDocument()
    })

    it('formats with fixed decimals, smaller than value', () => {
      render(<DataInput.Number value={13.579} fixedDecimals={2} />)
      expect(screen.getByDisplayValue('13,58')).toBeInTheDocument()
    })

    it('formats with fixed decimals, higher than value', () => {
      render(<DataInput.Number value={13.579} fixedDecimals={5} />)
      expect(screen.getByDisplayValue('13,57900')).toBeInTheDocument()
    })
  })
  describe('event handlers', () => {
    it('calls onChange for every change of an integer input value', () => {
      const onChange = jest.fn()
      render(<DataInput.Number value={23} onChange={onChange} />)
      const input = screen.getByTestId('data-input-number')
      userEvent.type(input, '579012')

      expect(onChange.mock.calls).toHaveLength(6)
      expect(onChange.mock.calls[0][0]).toEqual(235)
      expect(onChange.mock.calls[1][0]).toEqual(2357)
      expect(onChange.mock.calls[2][0]).toEqual(23579)
      expect(onChange.mock.calls[3][0]).toEqual(235790)
      expect(onChange.mock.calls[4][0]).toEqual(2357901)
      expect(onChange.mock.calls[5][0]).toEqual(23579012)
    })

    it('calls onChange for every change of a float input value', () => {
      const onChange = jest.fn()
      render(<DataInput.Number value={24.5} onChange={onChange} />)
      const input = screen.getByTestId('data-input-number')
      userEvent.type(input, '7621')

      expect(onChange.mock.calls).toHaveLength(4)
      expect(onChange.mock.calls[0][0]).toEqual(24.57)
      expect(onChange.mock.calls[1][0]).toEqual(24.576)
      expect(onChange.mock.calls[2][0]).toEqual(24.5762)
      expect(onChange.mock.calls[3][0]).toEqual(24.57621)
    })
  })

  describe('error handling', () => {
    it('should not show error initially', () => {
      render(<DataInput.Number required />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should show error initially when validateInitially', () => {
      render(<DataInput.Number required validateInitially />)
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    describe('validation based on required-prop', () => {
      it('should show error for empty value', () => {
        render(<DataInput.Number value={1} required />)
        const input = screen.getByTestId('data-input-number')
        input.focus()
        userEvent.type(input, '{backspace}')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error when value is not empty', () => {
        render(<DataInput.Number value={1} required />)
        const input = screen.getByTestId('data-input-number')
        input.focus()
        userEvent.type(input, '2')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on minimum-prop', () => {
      it('should show error for invalid value', () => {
        render(<DataInput.Number value={50} minimum={2000} />)
        const input = screen.getByTestId('data-input-number')
        input.focus()
        userEvent.type(input, '1')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', () => {
        render(<DataInput.Number value={65} minimum={40} />)
        const input = screen.getByTestId('data-input-number')
        input.focus()
        userEvent.type(input, '5')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on maximum-prop', () => {
      it('should show error for invalid value', () => {
        render(<DataInput.Number value={50} maximum={100} />)
        const input = screen.getByTestId('data-input-number')
        input.focus()
        userEvent.type(input, '0')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', () => {
        render(<DataInput.Number value={20} maximum={500} />)
        const input = screen.getByTestId('data-input-number')
        input.focus()
        userEvent.type(input, '1')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })
})
