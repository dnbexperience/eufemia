import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { Field, FormError, FieldBlock } from '../../..'

describe('Field.Date', () => {
  it('should render with props', () => {
    render(<Field.Date />)
  })

  it('should show required warning', async () => {
    render(<Field.Date value="2023-12-07" required />)

    const datepicker = document.querySelector('.dnb-date-picker')
    const [, , year]: Array<HTMLInputElement> = Array.from(
      datepicker.querySelectorAll('.dnb-date-picker__input')
    )

    expect(datepicker.classList).not.toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datepicker.querySelector('.dnb-form-status__text')
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
        jest.spyOn(console, 'log').mockImplementationOnce(jest.fn()) // because of the invalid date
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
      })
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
    render(<Field.Date error={new FormError('Error message')} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-date-picker')
    expect(input).toHaveClass('dnb-date-picker__status--error')
  })

  it('shows error style in FieldBlock', () => {
    render(
      <FieldBlock>
        <Field.Date error={new FormError('Error message')} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-date-picker')
    expect(input).toHaveClass('dnb-date-picker__status--error')
  })
})
