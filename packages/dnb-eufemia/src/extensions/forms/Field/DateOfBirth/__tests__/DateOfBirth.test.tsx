import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Validator } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'
import { AdditionalArgs } from '../DateOfBirth'

const nb = nbNO['nb-NO']

describe('Field.DateOfBirth', () => {
  it('should have correct label', () => {
    render(<Field.DateOfBirth />)
    expect(screen.queryByText(nb.DateOfBirth.label)).toBeInTheDocument()
  })

  it('should support labelDescription', () => {
    const labelDesc = 'This is a description'
    render(<Field.DateOfBirth labelDescription={labelDesc} />)
    expect(screen.queryByText(labelDesc)).toBeInTheDocument()
  })

  it('should add (optional) text to the label if required={false}', () => {
    render(
      <Form.Handler required>
        <Field.DateOfBirth required={false} />
      </Form.Handler>
    )

    const label = document.querySelector('legend')
    expect(label).toHaveTextContent(
      `${nb.DateOfBirth.label} ${nb.Field.optionalLabelSuffix}`
    )
  })

  describe('onChange', () => {
    it('should return correct value onChange event', async () => {
      const onChange = jest.fn()

      render(<Field.DateOfBirth onChange={onChange} />)

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        '2023-12-24',
        expect.objectContaining({
          year: '2023',
          month: '12',
          day: '24',
        })
      )
    })

    it('should return correct value onChange event in data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.DateOfBirth path="/dob" />
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        { dob: '2023-12-24' },
        expect.anything()
      )
    })

    it('should support transformIn', async () => {
      const transformIn = jest.fn((external: AdditionalArgs) => {
        if (external) {
          const { year, month, day } = external
          return `${year}-${month}-${day}`
        }
      })

      render(
        <Form.Handler
          defaultData={{
            myField: {
              year: '1990',
              month: '05',
              day: '15',
            },
          }}
        >
          <Field.DateOfBirth path="/myField" transformIn={transformIn} />
        </Form.Handler>
      )

      expect(transformIn).toHaveBeenCalledTimes(2)
      expect(transformIn).toHaveBeenLastCalledWith({
        year: '1990',
        month: '05',
        day: '15',
      })

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('15')
      expect(monthInput).toHaveValue('Mai')
      expect(yearInput.value).toBe('1990')

      expect(transformIn).toHaveBeenCalledTimes(2)
      expect(transformIn).toHaveBeenLastCalledWith({
        year: '1990',
        month: '05',
        day: '15',
      })
    })

    it('should support transformOut', async () => {
      const onChange = jest.fn()

      const transformOut = jest.fn(
        (internal, additionalArgs: AdditionalArgs) => {
          if (additionalArgs) {
            const { year, month, day } = additionalArgs
            return { year, month, day }
          }
        }
      )

      const transformIn = jest.fn((external: AdditionalArgs) => {
        if (external) {
          const { year, month, day } = external
          return `${year}-${month}-${day}`
        }
      })

      render(
        <Form.Handler onChange={onChange}>
          <Field.DateOfBirth
            path="/myField"
            transformOut={transformOut}
            transformIn={transformIn}
          />
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      // Check that transformOut was called with the correct values
      expect(transformOut).toHaveBeenCalledTimes(15)
      expect(transformOut).toHaveBeenLastCalledWith('2023-12-24', {
        year: '2023',
        month: '12',
        day: '24',
      })

      // Check that onChange was called with the transformed data
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myField: {
            year: '2023',
            month: '12',
            day: '24',
          },
        },
        expect.anything()
      )
    })

    it('should return year in additional args', async () => {
      const onChange = jest.fn()

      render(<Field.DateOfBirth onChange={onChange} />)

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // Fill all fields to trigger onChange
      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(4)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '2023-12-24',
        expect.objectContaining({
          year: '2023',
        })
      )
    })

    it('should return month in additional args', async () => {
      const onChange = jest.fn()

      render(<Field.DateOfBirth onChange={onChange} />)

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // Fill all fields to trigger onChange
      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(4)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '2023-12-24',
        expect.objectContaining({
          month: '12',
        })
      )
    })

    it('should return day in additional args', async () => {
      const onChange = jest.fn()

      render(<Field.DateOfBirth onChange={onChange} />)

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // Fill all fields to trigger onChange
      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(4)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '2023-12-24',
        expect.objectContaining({
          day: '24',
        })
      )
    })

    it('should return undefined onChange event when removing inputted data', async () => {
      const onChangeContext = jest.fn()
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChangeContext}>
          <Field.DateOfBirth path="/myField" onChange={onChange} />{' '}
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      await userEvent.type(dayInput, '24')
      await userEvent.type(monthInput, '12')
      await waitFor(() => {
        const option = document.querySelector('[role="option"]')
        expect(option).toBeInTheDocument()
      })
      await userEvent.click(document.querySelector('[role="option"]'))
      await userEvent.type(yearInput, '2023')

      await userEvent.type(yearInput, '{Backspace>4}')
      await userEvent.type(monthInput, '{Backspace>1}')
      await userEvent.type(dayInput, '{Backspace>2}')

      expect(dayInput.value).toBe('')
      expect(monthInput.value).toBe('')
      expect(yearInput.value).toBe('')

      expect(onChange).toHaveBeenLastCalledWith(undefined)
      expect(onChangeContext).toHaveBeenLastCalledWith(
        {
          myField: undefined,
        },
        expect.anything()
      )
    })
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

    it('should pad single-digit day on blur', async () => {
      const onDayChange = jest.fn()

      render(<Field.DateOfBirth onDayChange={onDayChange} />)

      const dayInput = document.querySelectorAll('input')[0]

      await userEvent.type(dayInput, '2')

      expect(onDayChange).toHaveBeenLastCalledWith('2')

      onDayChange.mockClear()

      fireEvent.blur(dayInput)

      await waitFor(() => {
        expect(dayInput.value).toBe('02')
        expect(onDayChange).toHaveBeenLastCalledWith('02')
      })
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
      const monthInput = inputs[1]

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

    it('should autofill day and month name when shifting focus after typing single digit', async () => {
      render(<Field.DateOfBirth />)

      const inputs = document.querySelectorAll('input')
      const dayInput = inputs[0]
      const monthInput = inputs[1]
      const yearInput = inputs[2]

      // Ensure day has a value
      await userEvent.type(dayInput, '2')

      // Type a single digit in month and focus on the next input with a clicktab
      await userEvent.click(monthInput)
      await waitFor(() => {
        expect(dayInput).toHaveValue('02')
      })

      // Type a single digit in month and focus on the next input with a clicktab
      await userEvent.type(monthInput, '2')
      await userEvent.click(yearInput)

      // Expect month to be changed to the corresponding month name
      await waitFor(() => {
        expect(monthInput).toHaveValue('Februar')
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

    it('should expand two-digit year on blur', async () => {
      const onYearChange = jest.fn()
      const currentYear = new Date().getFullYear()
      const computeExpectedYear = (value: string) => {
        const padded = value.padStart(2, '0')
        const currentCentury = Math.floor(currentYear / 100) * 100
        const candidate = currentCentury + parseInt(padded, 10)
        const normalized =
          candidate > currentYear ? candidate - 100 : candidate
        return String(normalized)
      }

      render(<Field.DateOfBirth onYearChange={onYearChange} />)

      const yearInput = document.querySelectorAll('input')[2]

      await userEvent.type(yearInput, '85')

      expect(onYearChange).toHaveBeenLastCalledWith('85')

      onYearChange.mockClear()

      fireEvent.blur(yearInput)

      const expectedYear = computeExpectedYear('85')

      await waitFor(() => {
        expect(yearInput.value).toBe(expectedYear)
        expect(onYearChange).toHaveBeenLastCalledWith(expectedYear)
      })
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

  describe('dateFormat', () => {
    it('should use default format yyyy-MM-dd when no dateFormat is provided', async () => {
      const onChange = jest.fn()

      render(<Field.DateOfBirth value="2023-12-25" onChange={onChange} />)

      // Check that the value is parsed correctly with default format
      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('2023')
    })

    it('should accept and return dates in yyyy/MM/dd format', async () => {
      const onChange = jest.fn()

      render(
        <Field.DateOfBirth
          value="2023/12/25"
          dateFormat="yyyy/MM/dd"
          onChange={onChange}
        />
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('2023')

      // Test that changes return the correct format
      await userEvent.clear(dayInput)
      await userEvent.type(dayInput, '1')
      await userEvent.clear(yearInput)
      await userEvent.type(yearInput, '2024')

      // Wait for the onChange to be called
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })

      // Check that the last call has the correct format
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(lastCall[0]).toMatch(/2024\/12\/01/)
    })

    it('should accept and return dates in dd/MM/yyyy format', async () => {
      const onChange = jest.fn()

      render(
        <Field.DateOfBirth
          value="25/12/2023"
          dateFormat="dd/MM/yyyy"
          onChange={onChange}
        />
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('2023')

      // Test that changes return the correct format
      await userEvent.clear(dayInput)
      await userEvent.type(dayInput, '1')
      await userEvent.clear(yearInput)
      await userEvent.type(yearInput, '2024')

      // Wait for the onChange to be called
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })

      // Check that the last call has the correct format
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(lastCall[0]).toMatch(/01\/12\/2024/)
    })

    it('should accept and return dates in MM/dd/yyyy format', async () => {
      const onChange = jest.fn()

      render(
        <Field.DateOfBirth
          value="12/25/2023"
          dateFormat="MM/dd/yyyy"
          onChange={onChange}
        />
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('2023')

      // Test that changes return the correct format
      await userEvent.clear(dayInput)
      await userEvent.type(dayInput, '1')
      await userEvent.clear(yearInput)
      await userEvent.type(yearInput, '2024')

      // Wait for the onChange to be called
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })

      // Check that the last call has the correct format
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(lastCall[0]).toMatch(/12\/01\/2024/)
    })

    it('should accept and return dates in dd-MM-yyyy format', async () => {
      const onChange = jest.fn()

      render(
        <Field.DateOfBirth
          value="25-12-2023"
          dateFormat="dd-MM-yyyy"
          onChange={onChange}
        />
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('2023')

      // Test that changes return the correct format
      await userEvent.clear(dayInput)
      await userEvent.type(dayInput, '1')
      await userEvent.clear(yearInput)
      await userEvent.type(yearInput, '2024')

      // Wait for the onChange to be called
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })

      // Check that the last call has the correct format
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(lastCall[0]).toMatch(/01-12-2024/)
    })

    it('should validate dates correctly with custom format', async () => {
      render(
        <Field.DateOfBirth
          value="25/12/2023"
          dateFormat="dd/MM/yyyy"
          validateInitially
        />
      )

      // Should not show error for valid date in custom format
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    it('should show validation error for invalid date in custom format', async () => {
      render(
        <Field.DateOfBirth
          value="32/12/2023"
          dateFormat="dd/MM/yyyy"
          validateInitially
        />
      )

      fireEvent.blur(document.querySelector('input'))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.DateOfBirth.errorDateOfBirth
        )
      })
    })

    it('should show validation error for future date in custom format', async () => {
      const futureYear = new Date().getFullYear() + 1
      render(
        <Field.DateOfBirth
          value={`25/12/${futureYear}`}
          dateFormat="dd/MM/yyyy"
          validateInitially
        />
      )

      fireEvent.blur(document.querySelector('input'))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.DateOfBirth.errorDateOfBirthFuture
        )
      })
    })

    it('should handle empty values with custom format', async () => {
      const onChange = jest.fn()

      render(
        <Field.DateOfBirth
          value=""
          dateFormat="dd/MM/yyyy"
          onChange={onChange}
        />
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('')
      expect(yearInput.value).toBe('')
      expect(monthInput).toHaveValue('')
    })

    it('should handle malformed input gracefully with custom format', async () => {
      const onChange = jest.fn()

      render(
        <Field.DateOfBirth
          value="invalid-date"
          dateFormat="dd/MM/yyyy"
          onChange={onChange}
        />
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // Should handle malformed input gracefully
      expect(dayInput.value).toBe('')
      expect(yearInput.value).toBe('')
      expect(monthInput).toHaveValue('')
    })
  })

  describe('path', () => {
    it('should set value from source data when using path', async () => {
      const sourceData = {
        personalInfo: {
          dateOfBirth: '1990-05-15',
        },
      }

      render(
        <Form.Handler defaultData={sourceData}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // The field should be populated with the source data
      expect(dayInput.value).toBe('15')
      expect(monthInput).toHaveValue('Mai')
      expect(yearInput.value).toBe('1990')
    })

    it('should update internal refs when source data changes', async () => {
      const sourceData = {
        personalInfo: {
          dateOfBirth: '1990-05-15',
        },
      }

      const { rerender } = render(
        <Form.Handler defaultData={sourceData}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // Initial values
      expect(dayInput.value).toBe('15')
      expect(monthInput).toHaveValue('Mai')
      expect(yearInput.value).toBe('1990')

      // Update source data
      const updatedSourceData = {
        personalInfo: {
          dateOfBirth: '1985-12-25',
        },
      }

      rerender(
        <Form.Handler data={updatedSourceData}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      // Values should update to reflect new source data
      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('1985')
    })

    it('should not show validation error when source data is valid', async () => {
      const sourceData = {
        personalInfo: {
          dateOfBirth: '1990-05-15',
        },
      }

      render(
        <Form.Handler defaultData={sourceData}>
          <Field.DateOfBirth
            path="/personalInfo/dateOfBirth"
            required
            validateInitially
          />
        </Form.Handler>
      )

      // Should not show validation error for valid date from source
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    it('should handle empty source data gracefully', async () => {
      const sourceData = {
        personalInfo: {
          dateOfBirth: '',
        },
      }

      render(
        <Form.Handler defaultData={sourceData}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      // Should handle empty source data gracefully
      expect(dayInput.value).toBe('')
      expect(monthInput).toHaveValue('')
      expect(yearInput.value).toBe('')
    })

    it('should update form data when user types in fields', async () => {
      const onChange = jest.fn()
      const sourceData = {
        personalInfo: {
          dateOfBirth: '1990-05-15',
        },
      }

      render(
        <Form.Handler defaultData={sourceData} onChange={onChange}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      const dayInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[2]

      // Clear the day input and type a new value
      await userEvent.clear(dayInput)
      await userEvent.type(dayInput, '25')

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          personalInfo: {
            dateOfBirth: expect.stringMatching(/1990-05-25/),
          },
        }),
        expect.any(Object)
      )

      // Clear the year input and type a new value
      await userEvent.clear(yearInput)
      await userEvent.type(yearInput, '1985')

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          personalInfo: {
            dateOfBirth: expect.stringMatching(/1985-05-25/),
          },
        }),
        expect.any(Object)
      )
    })

    it('should update form data when source data changes', async () => {
      const onChange = jest.fn()
      const sourceData = {
        personalInfo: {
          dateOfBirth: '1990-05-15',
        },
      }

      const { rerender } = render(
        <Form.Handler data={sourceData} onChange={onChange}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      // Verify initial state - the field should be populated with source data
      const dayInput = document.querySelectorAll('input')[0]
      const monthInput = document.querySelectorAll('input')[1]
      const yearInput = document.querySelectorAll('input')[2]

      expect(dayInput.value).toBe('15')
      expect(monthInput).toHaveValue('Mai')
      expect(yearInput.value).toBe('1990')

      // Update source data
      const updatedSourceData = {
        personalInfo: {
          dateOfBirth: '1985-12-25',
        },
      }

      rerender(
        <Form.Handler data={updatedSourceData} onChange={onChange}>
          <Field.DateOfBirth path="/personalInfo/dateOfBirth" />
        </Form.Handler>
      )

      // The field should now reflect the new source data
      expect(dayInput.value).toBe('25')
      expect(monthInput).toHaveValue('Desember')
      expect(yearInput.value).toBe('1985')
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

  it('should validate continuously when validateContinuously is enabled', async () => {
    render(<Field.DateOfBirth validateContinuously />)

    const inputs = document.querySelectorAll('input')
    const dayInput = inputs[0]
    const monthInput = inputs[1]
    const yearInput = inputs[2]

    // Type invalid date (invalid day) - error should appear during typing
    await userEvent.type(yearInput, '2000')
    await userEvent.type(monthInput, '12')
    await userEvent.type(dayInput, '32')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.DateOfBirth.errorDateOfBirth
      )
    })

    // Fix the day - error should disappear during typing
    await userEvent.clear(dayInput)
    await userEvent.type(dayInput, '31')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    // Type invalid date (future date) - error should appear again
    await userEvent.clear(yearInput)
    await userEvent.type(yearInput, '3000')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.DateOfBirth.errorDateOfBirthFuture
      )
    })
  })

  it('should call onStatusChange when validateContinuously reveals validation errors', async () => {
    const onStatusChange = jest.fn()

    render(
      <Field.DateOfBirth
        onStatusChange={onStatusChange}
        validateContinuously
        required
      />
    )

    const inputs = document.querySelectorAll('input')
    const dayInput = inputs[0]
    const monthInput = inputs[1]
    const yearInput = inputs[2]

    // Type invalid date
    await userEvent.type(yearInput, '2000')
    await userEvent.type(monthInput, '12')
    await userEvent.type(dayInput, '32')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: expect.anything(),
        })
      )
    })

    // Clear mock to track new calls
    onStatusChange.mockClear()

    // Type valid date
    await userEvent.clear(dayInput)
    await userEvent.type(dayInput, '31')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })

  it('should call onStatusChange when error prop changes without validateContinuously', async () => {
    const onStatusChange = jest.fn()
    const error1 = new Error('Error 1')
    const error2 = new Error('Error 2')

    const { rerender } = render(
      <Field.DateOfBirth
        onStatusChange={onStatusChange}
        error={undefined}
      />
    )

    // Initially no error should be called
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(0)
    })

    // Set error prop
    rerender(
      <Field.DateOfBirth onStatusChange={onStatusChange} error={error1} />
    )

    // Wait for onStatusChange to be called with error
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(1)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error1,
      })
    })

    // Change to different error
    rerender(
      <Field.DateOfBirth onStatusChange={onStatusChange} error={error2} />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(2)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error2,
      })
    })

    // Clear error
    rerender(
      <Field.DateOfBirth
        onStatusChange={onStatusChange}
        error={undefined}
      />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(3)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })

  it('should have constant of _supportsSpacingProps=false', () => {
    expect(Field.DateOfBirth._supportsSpacingProps).toBe(false)
  })
})
