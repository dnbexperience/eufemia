import { axeComponent } from '../../../../../core/test-utils/testSetup'
import { act, render, waitFor } from '@testing-library/react'
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
      const error = document.querySelector('.dnb-form-status--error')
      expect(error).toBeTruthy()
    })
  })

  it('should have correct CSS class', () => {
    render(<Field.Time />)

    const element = document.querySelector('.dnb-forms-field-time')
    expect(element).toBeTruthy()
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
      const error = document.querySelector('.dnb-form-status--error')
      expect(error).toBeTruthy()
    })
  })

  it('should validate invalid minutes', async () => {
    render(<Field.Time value="14:61" validateInitially />)

    await waitFor(() => {
      const error = document.querySelector('.dnb-form-status--error')
      expect(error).toBeTruthy()
    })
  })

  it('should validate incomplete time values', async () => {
    render(<Field.Time value="1:2" validateInitially />)

    await waitFor(() => {
      const error = document.querySelector('.dnb-form-status--error')
      expect(error).toBeTruthy()
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
        const error = document.querySelector('.dnb-form-status--error')
        expect(error).toBeTruthy()
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
})
