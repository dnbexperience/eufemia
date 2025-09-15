import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Validator } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.DateOfBirth', () => {
  it('should have correct label', () => {
    render(<Field.DateOfBirth />)
    expect(screen.queryByText(nb.DateOfBirth.label)).toBeInTheDocument()
  })

  describe('Day', () => {
    it('should have autoComplete value bday-day', () => {
      render(<Field.DateOfBirth />)
      expect(
        document.querySelectorAll('input')[0].getAttribute('autocomplete')
      ).toBe('bday-day')
    })

    it('should have correct label description', () => {
      render(<Field.DateOfBirth />)
      expect(
        screen.queryByText(nb.DateOfBirth.dayLabel)
      ).toBeInTheDocument()
    })
  })

  describe('Month', () => {
    it('should have autoComplete value bday-month', () => {
      render(<Field.DateOfBirth />)
      expect(
        document.querySelectorAll('input')[1].getAttribute('autocomplete')
      ).toBe('bday-month')
    })

    it('should have correct label description', () => {
      render(<Field.DateOfBirth />)
      expect(
        screen.queryByText(nb.DateOfBirth.monthLabel)
      ).toBeInTheDocument()
    })

    it('should allow searching months by numbers', async () => {
      render(<Field.DateOfBirth />)

      const inputs = document.querySelectorAll('input')
      const monthInput = inputs[1] as HTMLInputElement

      await userEvent.click(monthInput)

      // Search by numeric month (uses search_content: [title, nr, value])
      await userEvent.type(monthInput, '12')

      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })

      // Non-existing month number should yield no results
      await userEvent.clear(monthInput)
      await userEvent.type(monthInput, '13')

      await waitFor(() => {
        const first = document.querySelector('li.dnb-drawer-list__option')
        expect(first?.textContent).toBe('Ingen alternativer')
      })
    })
  })

  describe('Year', () => {
    it('should have autoComplete value bday-year', () => {
      render(<Field.DateOfBirth />)
      expect(
        document.querySelectorAll('input')[2].getAttribute('autocomplete')
      ).toBe('bday-year')
    })

    it('should have correct label description', () => {
      render(<Field.DateOfBirth />)
      expect(
        screen.queryByText(nb.DateOfBirth.yearLabel)
      ).toBeInTheDocument()
    })
  })

  describe('Validation', () => {
    it('should validate given function as onChangeValidator', async () => {
      const customErrorMessage = 'Custom Error message'
      const onChangeValidator = jest.fn((value) => {
        if (value.substring(0, 4) !== '1990') {
          return new Error(customErrorMessage)
        }
      })

      render(
        <Field.DateOfBirth
          value="2000-05-17"
          required
          onChangeValidator={onChangeValidator}
          validateInitially
        />
      )

      await waitFor(() => {
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
      })

      const element = document.querySelector('.dnb-form-status')

      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe(customErrorMessage)
    })

    describe('should validate dates', () => {
      const validDates = ['1990-01-01', '1990-12-31', '2000-05-17']

      const invalidDates = ['1989-12-32', '2001-00-01', '2000-05-32']

      const invalidDatesInTheFuture = ['3000-05-17']

      it.each(validDates)('Valid date: %s', async (dateOfBirth) => {
        render(
          <Form.Handler>
            <Field.DateOfBirth value={dateOfBirth} validateInitially />
          </Form.Handler>
        )

        fireEvent.blur(document.querySelector('input'))

        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
      })

      it.each(invalidDates)('Invalid date: %s', async (dateOfBirth) => {
        render(<Field.DateOfBirth value={dateOfBirth} validateInitially />)

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.DateOfBirth.errorDateOfBirth
          )
        })
      })

      it.each(invalidDatesInTheFuture)(
        'Invalid date: %s',
        async (dateOfBirth) => {
          render(
            <Field.DateOfBirth value={dateOfBirth} validateInitially />
          )

          fireEvent.blur(document.querySelector('input'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.DateOfBirth.errorDateOfBirthFuture
            )
          })
        }
      )
    })

    describe('should extend validation using custom validator', () => {
      const validDatesIn1990 = ['1990-01-01', '1990-12-31']

      const validDatesNotIn1990 = [
        '1991-01-01',
        '1991-12-31',
        '2000-05-17',
      ]

      const coreInvalidDatesWithCustom = ['2000-05-32']

      const alsoNotIn1990 = ['1989-12-31', '2001-01-01']

      const invalidDatesInTheFuture = ['3000-07-17']

      const invalidDatesTooShort = ['1989-01', '01', '01-01', '1981']

      const customError = 'Has to be born in the year 1990!'

      const yearIs1990Validator = (value: string) => {
        if (value.substring(0, 4) !== '1990') {
          return new Error(customError)
        }
      }

      const customValidator: Validator<string> = (
        value,
        { validators }
      ) => {
        const { dateOfBirthValidator } = validators

        return [dateOfBirthValidator, yearIs1990Validator]
      }

      it.each(validDatesIn1990)(
        'Valid date of birth: %s',
        async (dateOfBirth) => {
          render(
            <Form.Handler>
              <Field.DateOfBirth
                value={dateOfBirth}
                validateInitially
                onBlurValidator={customValidator}
              />
            </Form.Handler>
          )

          fireEvent.blur(document.querySelector('input'))

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).toNeverResolve()
        }
      )

      it.each(validDatesNotIn1990)(
        'Invalid date of birth: %s',
        async (dateOfBirth) => {
          render(
            <Field.DateOfBirth
              value={dateOfBirth}
              validateInitially
              onBlurValidator={customValidator}
            />
          )

          fireEvent.blur(document.querySelector('input'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              customError
            )
          })
        }
      )

      it.each(alsoNotIn1990)(
        'Invalid (domain) date of birth: %s',
        async (dateOfBirth) => {
          render(
            <Field.DateOfBirth
              value={dateOfBirth}
              validateInitially
              onBlurValidator={customValidator}
            />
          )

          fireEvent.blur(document.querySelector('input'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              customError
            )
          })
        }
      )

      it.each(coreInvalidDatesWithCustom)(
        'Core invalid date of birth: %s',
        async (dateOfBirth) => {
          render(
            <Field.DateOfBirth
              value={dateOfBirth}
              validateInitially
              onBlurValidator={customValidator}
            />
          )

          fireEvent.blur(document.querySelector('input'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.DateOfBirth.errorDateOfBirth
            )
          })
        }
      )

      it.each(invalidDatesInTheFuture)(
        'Invalid date of birth: %s',
        async (dateOfBirth) => {
          render(
            <Field.DateOfBirth
              value={dateOfBirth}
              validateInitially
              onBlurValidator={customValidator}
            />
          )

          fireEvent.blur(document.querySelector('input'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.DateOfBirth.errorDateOfBirthFuture
            )
          })
        }
      )

      it.each(invalidDatesTooShort)(
        'Invalid date of birth: %s',
        async (dateOfBirth) => {
          render(
            <Field.DateOfBirth
              value={dateOfBirth}
              validateInitially
              onBlurValidator={customValidator}
            />
          )

          fireEvent.blur(document.querySelector('input'))

          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              customError
            )
          })
        }
      )
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.DateOfBirth required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.DateOfBirth required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.DateOfBirth required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
