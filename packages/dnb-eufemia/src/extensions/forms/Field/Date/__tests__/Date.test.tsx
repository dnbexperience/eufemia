import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { DataContext, Field, FieldBlock, Form } from '../../..'

describe('Field.Date', () => {
  it('should render without props', () => {
    render(<Field.Date />)
    expect(screen.getByLabelText('Dato')).toBeInTheDocument()
  })

  it('should show required warning', async () => {
    render(<Field.Date value="2023-12-07" required />)

    const datePicker = document.querySelector('.dnb-date-picker')
    const [, , year]: Array<HTMLInputElement> = Array.from(
      datePicker.querySelectorAll('.dnb-date-picker__input')
    )

    expect(datePicker.classList).not.toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datePicker.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    fireEvent.focus(year)
    await userEvent.type(year, '{Backspace>2}')
    fireEvent.blur(year)

    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.keyboard('20231207')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await userEvent.click(
      document.querySelector('.dnb-input__submit-button__button')
    )

    await userEvent.click(
      document
        .querySelector('.dnb-date-picker__footer')
        .querySelectorAll('.dnb-button--tertiary ')[0]
    )

    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should support date range', () => {
    const { rerender } = render(
      <Field.Date range value="2024-09-01|2024-09-30" />
    )

    const fields = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(fields).toHaveLength(6)

    const [startDay, startMonth, startYear, endDay, endMonth, endYear] =
      fields

    // Start date
    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('09')
    expect(startYear).toHaveValue('2024')

    // End date
    expect(endDay).toHaveValue('30')
    expect(endMonth).toHaveValue('09')
    expect(endYear).toHaveValue('2024')

    // Should handle undfined or null end date
    rerender(<Field.Date range value="2024-09-01|undefined" />)

    // Start date
    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('09')
    expect(startYear).toHaveValue('2024')

    // End date
    expect(endDay).toHaveValue('dd')
    expect(endMonth).toHaveValue('mm')
    expect(endYear).toHaveValue('åååå')

    // Should handle undfined or null start and end dates
    rerender(<Field.Date range value="null|undefined" />)

    // Start date
    expect(startDay).toHaveValue('dd')
    expect(startMonth).toHaveValue('mm')
    expect(startYear).toHaveValue('åååå')

    // End date
    expect(endDay).toHaveValue('dd')
    expect(endMonth).toHaveValue('mm')
    expect(endYear).toHaveValue('åååå')

    // Should handle undfined or null start date
    rerender(<Field.Date range value="null|2024-04-01" />)

    // Start date
    expect(startDay).toHaveValue('dd')
    expect(startMonth).toHaveValue('mm')
    expect(startYear).toHaveValue('åååå')

    // End date
    expect(endDay).toHaveValue('01')
    expect(endMonth).toHaveValue('04')
    expect(endYear).toHaveValue('2024')
  })

  describe('error handling', () => {
    describe('with validateInitially', () => {
      it('should show error message initially', async () => {
        render(<Field.Date required validateInitially />)
        await waitFor(() => {
          expect(screen.getByRole('alert')).toBeInTheDocument()
        })
      })
    })

    describe('with validateUnchanged', () => {
      it('should show error message when blurring without any changes', async () => {
        // Because of the invalid date
        const log = jest.spyOn(console, 'log').mockImplementation()

        render(
          <Field.Date
            value="2023-12-0"
            schema={{ type: 'string', minLength: 10 }}
            validateUnchanged
          />
        )

        const input = document.querySelector('input')

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        input.focus()
        fireEvent.blur(input)

        await waitFor(() => {
          expect(screen.getByRole('alert')).toBeInTheDocument()
        })

        log.mockRestore()
      })
    })
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.Date defaultValue="2023-10-01" path="/myValue" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const [day, , year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': '01.10.2023',
    })

    fireEvent.focus(day)
    await userEvent.keyboard('0211')
    await userEvent.type(year, '2024')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': '02.11.2024',
    })
  })

  it('should store "displayValue" in en-US locale', async () => {
    let dataContext = null

    render(
      <Form.Handler locale="en-US">
        <Field.Date defaultValue="2023-10-01" path="/myValue" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const [day, , year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': '10/01/2023',
    })

    fireEvent.focus(day)
    await userEvent.keyboard('0211')
    await userEvent.type(year, '2024')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': '11/02/2024',
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Date label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Date required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Date required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('renders error', () => {
    render(<Field.Date error={new Error('Error message')} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-date-picker')
    expect(input).toHaveClass('dnb-date-picker__status--error')
  })

  it('shows error style in FieldBlock', () => {
    render(
      <FieldBlock>
        <Field.Date error={new Error('Error message')} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-date-picker')
    expect(input).toHaveClass('dnb-date-picker__status--error')
  })
})
