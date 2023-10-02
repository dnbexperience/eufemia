import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Field from '../'
import { wait } from '../../../../core/jest/jestSetup'

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

    it('renders error', () => {
      render(<Field.Number error={new Error('This is what went wrong')} />)
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
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

    it('formats with same decimal limit', () => {
      render(<Field.Number value={42.51} decimalLimit={2} />)
      expect(screen.getByDisplayValue('42,51')).toBeInTheDocument()
    })

    // it('formats with smaller decimal limit', () => {
    //   render(<Field.Number value={5876.789} decimalLimit={2} />)
    //   expect(screen.getByDisplayValue('5876,79')).toBeInTheDocument()
    // })

    it('formats with higher decimal limit', () => {
      render(<Field.Number value={123.456} decimalLimit={4} />)
      expect(screen.getByDisplayValue('123,456')).toBeInTheDocument()
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
})
