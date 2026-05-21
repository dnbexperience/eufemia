import { axeComponent } from '../../../../../core/test-utils/testSetup'
import { act, render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'

const no = nbNO['nb-NO'].Time

const getTimeInputs = () =>
  Array.from(
    document.querySelectorAll('.dnb-segmented-field__section')
  ) as Array<HTMLInputElement>

const getHoursInput = () => getTimeInputs()[0]

const getMinutesInput = () => getTimeInputs()[1]

const getSecondsInput = () => getTimeInputs()[2]

describe('Field.Time', () => {
  it('should set value as a string', () => {
    render(<Field.Time value="14:30" />)

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput.value).toBe('14')
    expect(minutesInput.value).toBe('30')
  })

  it('should handle value as undefined', () => {
    render(<Field.Time value={undefined} />)

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput.value).toBe('tt')
    expect(minutesInput.value).toBe('mm')
  })

  it('should format the value with colon delimiter', () => {
    render(<Field.Time value="14:30" />)

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput.value).toBe('14')
    expect(minutesInput.value).toBe('30')
  })

  it('should render with the correct label', () => {
    render(<Field.Time />)

    const label = document.querySelector('label')
    expect(label.textContent).toBe(no.label)
  })

  it('should render with a custom label', () => {
    render(<Field.Time label="Custom time" />)

    const label = document.querySelector('label')
    expect(label.textContent).toBe('Custom time')
  })

  it('should render with disabled state', () => {
    render(<Field.Time disabled />)

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput).toHaveAttribute('aria-disabled', 'true')
    expect(minutesInput).toHaveAttribute('aria-disabled', 'true')
  })

  it('should show error for required field when empty', async () => {
    render(<Field.Time required validateInitially />)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })
  })

  it('should have correct CSS class', () => {
    render(<Field.Time />)

    const element = document.querySelector('.dnb-forms-field-time')
    expect(element).toBeInTheDocument()
  })

  it('should use colon as delimiter', () => {
    render(<Field.Time value="14:30" />)

    const delimiter = document.querySelector(
      '.dnb-segmented-field__delimiter'
    )
    expect(delimiter.textContent).toBe(':')
  })

  it('should validate invalid hours', async () => {
    render(<Field.Time value="25:00" validateInitially />)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })
  })

  it('should validate invalid minutes', async () => {
    render(<Field.Time value="14:61" validateInitially />)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })
  })

  it('should validate incomplete time values', async () => {
    render(<Field.Time value="1:2" validateInitially />)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })
  })

  it('should accept valid time values', () => {
    render(<Field.Time value="00:00" />)

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput.value).toBe('00')
    expect(minutesInput.value).toBe('00')
  })

  it('should work with Form.Handler', () => {
    render(
      <Form.Handler defaultData={{ time: '09:15' }}>
        <Field.Time path="/time" />
      </Form.Handler>
    )

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput.value).toBe('09')
    expect(minutesInput.value).toBe('15')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<Field.Time value="14:30" />)
    expect(await axeComponent(container)).toHaveNoViolations()
  })

  describe('showSeconds', () => {
    it('should render seconds input when showSeconds is true', () => {
      render(<Field.Time value="14:30:45" showSeconds />)

      const hoursInput = getHoursInput()
      const minutesInput = getMinutesInput()
      const secondsInput = getSecondsInput()

      expect(hoursInput.value).toBe('14')
      expect(minutesInput.value).toBe('30')
      expect(secondsInput.value).toBe('45')
    })

    it('should not render seconds input by default', () => {
      render(<Field.Time value="14:30" />)

      const inputs = getTimeInputs()
      expect(inputs).toHaveLength(2)
    })

    it('should render three inputs when showSeconds is true', () => {
      render(<Field.Time showSeconds />)

      const inputs = getTimeInputs()
      expect(inputs).toHaveLength(3)
    })

    it('should validate invalid seconds', async () => {
      render(<Field.Time value="14:30:61" showSeconds validateInitially />)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
      })
    })

    it('should accept valid time with seconds', () => {
      render(<Field.Time value="00:00:00" showSeconds />)

      const hoursInput = getHoursInput()
      const minutesInput = getMinutesInput()
      const secondsInput = getSecondsInput()

      expect(hoursInput.value).toBe('00')
      expect(minutesInput.value).toBe('00')
      expect(secondsInput.value).toBe('00')
    })

    it('should work with Form.Handler and seconds', () => {
      render(
        <Form.Handler defaultData={{ time: '09:15:30' }}>
          <Field.Time path="/time" showSeconds />
        </Form.Handler>
      )

      const hoursInput = getHoursInput()
      const minutesInput = getMinutesInput()
      const secondsInput = getSecondsInput()

      expect(hoursInput.value).toBe('09')
      expect(minutesInput.value).toBe('15')
      expect(secondsInput.value).toBe('30')
    })

    it('should render two colon delimiters with seconds', () => {
      render(<Field.Time value="14:30:45" showSeconds />)

      const delimiters = document.querySelectorAll(
        '.dnb-segmented-field__delimiter'
      )
      expect(delimiters).toHaveLength(2)
    })

    it('should not clear other inputs when clearing one segment with backspace', async () => {
      render(<Field.Time value="12:30:40" showSeconds />)

      const secondsInput = getSecondsInput()

      act(() => {
        secondsInput.focus()
      })

      await userEvent.keyboard('{Backspace>2}')

      expect(getHoursInput().value).toBe('12')
      expect(getMinutesInput().value).toBe('30')
      expect(secondsInput.value).toBe('ss')
    })

    it('should have no accessibility violations with seconds', async () => {
      const { container } = render(
        <Field.Time value="14:30:45" showSeconds />
      )
      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })

  it('should call onChange with the correct value after user interaction', async () => {
    const onChange = vi.fn()

    render(<Field.Time onChange={onChange} />)

    const hoursInput = getHoursInput()

    await userEvent.click(hoursInput)
    await userEvent.keyboard('1430')

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith('14:30', {
        hours: '14',
        minutes: '30',
      })
    })
  })

  it('should show validation error on blur for invalid time', async () => {
    render(<Field.Time />)

    const hoursInput = getHoursInput()

    await userEvent.click(hoursInput)
    await userEvent.keyboard('25')

    fireEvent.blur(hoursInput)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })
  })

  it('should support transformIn and transformOut', async () => {
    const onSubmit = vi.fn()

    const transformOut = (_internal: unknown, additionalArgs: unknown) => {
      const { hours, minutes } = additionalArgs as {
        hours: string
        minutes: string
      }
      return { hours, minutes }
    }

    const transformIn = (external: unknown) => {
      if (
        external &&
        typeof external === 'object' &&
        'hours' in external &&
        'minutes' in external
      ) {
        const { hours, minutes } = external as {
          hours: string
          minutes: string
        }
        return { hours, minutes }
      }
      return undefined
    }

    render(
      <Form.Handler
        defaultData={{
          myField: {
            hours: '14',
            minutes: '30',
          },
        }}
        onSubmit={onSubmit}
      >
        <Field.Time
          path="/myField"
          transformOut={transformOut}
          transformIn={transformIn}
        />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const hoursInput = getHoursInput()
    const minutesInput = getMinutesInput()

    expect(hoursInput.value).toBe('14')
    expect(minutesInput.value).toBe('30')

    await userEvent.click(hoursInput)
    await userEvent.keyboard('{Backspace>2}09')
    await userEvent.click(minutesInput)
    await userEvent.keyboard('{Backspace>2}45')

    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { myField: { hours: '09', minutes: '45' } },
        expect.anything()
      )
    })
  })

  it('should normalize externally provided values on rerender', () => {
    const { rerender } = render(<Field.Time value="09:05" />)

    expect(getHoursInput().value).toBe('09')
    expect(getMinutesInput().value).toBe('05')

    rerender(<Field.Time value="23:59" />)

    expect(getHoursInput().value).toBe('23')
    expect(getMinutesInput().value).toBe('59')
  })

  it('should show validation error when only hours are filled', async () => {
    render(<Field.Time />)

    const hoursInput = getHoursInput()

    await userEvent.click(hoursInput)
    await userEvent.keyboard('14')

    fireEvent.blur(hoursInput)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })
  })

  it('should not show error for required field with a valid value', async () => {
    render(<Field.Time value="14:30" required validateInitially />)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })
  })

  it('should validate continuously when validateContinuously is enabled', async () => {
    render(<Field.Time validateContinuously />)

    const hoursInput = getHoursInput()

    await userEvent.click(hoursInput)
    await userEvent.keyboard('25')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })

    await userEvent.click(hoursInput)
    await userEvent.keyboard('{Backspace>2}1430')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })
  })

  it('should accept 24:00 as a valid time', () => {
    render(<Field.Time value="24:00" validateInitially />)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()
  })

  it('should accept 24:00:00 with showSeconds', () => {
    render(<Field.Time value="24:00:00" showSeconds validateInitially />)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()
  })

  it('should reject 24:01 as invalid', () => {
    render(<Field.Time value="24:01" validateInitially />)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()
  })

  it('should reject 24:00:01 as invalid with showSeconds', () => {
    render(<Field.Time value="24:00:01" showSeconds validateInitially />)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()
  })
})
