/**
 * DatePicker Test
 *
 */

import React, { StrictMode, useState } from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import {
  addDays,
  addMonths,
  getDaysInMonth,
  isWeekend,
  isSameDay,
} from 'date-fns'
import DatePicker, { DatePickerAllProps } from '../DatePicker'
import {
  toRange,
  dayOffset,
  getWeek,
  getMonth,
  getCalendar,
  makeDayObject,
} from '../DatePickerCalc'
import { Dialog } from '../../'
import Input from '../../Input'
import Button from '../../Button'
import { Provider } from '../../../shared'
import svSE from '../../../shared/locales/sv-SE'
import daDK from '../../../shared/locales/da-DK'
import * as helpers from '../../../shared/helpers'
import { getOsloDate } from '../../date-format/DateFormatUtils'

jest.setTimeout(30e3)

const defaultProps: DatePickerAllProps = {
  noAnimation: true,
  range: true,
  showInput: true,
  date: '1970-01-01T00:00:00.000Z',
  startDate: '2019-01-01T00:00:00.000Z',
  endDate: '2019-02-15T00:00:00.000Z',
}

const waitForMaskFrame = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      setTimeout(resolve, 0)
    }, 0)
  })

const originalKeyboard = userEvent.keyboard
const wrapKeyboard =
  (fn: typeof userEvent.keyboard) =>
  async (
    ...args: Parameters<typeof userEvent.keyboard>
  ): Promise<ReturnType<typeof userEvent.keyboard>> => {
    const result = await fn(...args)
    await waitForMaskFrame()
    return result
  }

beforeEach(() => {
  userEvent.keyboard = wrapKeyboard(originalKeyboard)
})

afterEach(() => {
  userEvent.keyboard = originalKeyboard
})

async function focusInput(input: HTMLInputElement) {
  await userEvent.click(input)
  await waitForMaskFrame()
}

const getDatePickerRoot = () =>
  document
    .querySelector('.dnb-date-picker__inner')
    ?.closest('.dnb-date-picker')

const getDatePickerTriggerButton = () =>
  getDatePickerRoot().querySelector(
    'button.dnb-input__submit-button__button, button.dnb-button'
  ) as HTMLButtonElement

const getAnnouncementElement = () =>
  document.querySelector('p.dnb-sr-only[aria-live="assertive"]')

describe('DatePicker component', () => {
  const getSplitInputs = () => {
    const day = document.querySelector(
      'input.dnb-date-picker__input--day'
    ) as HTMLInputElement
    const month = document.querySelector(
      'input.dnb-date-picker__input--month'
    ) as HTMLInputElement
    const year = document.querySelector(
      'input.dnb-date-picker__input--year'
    ) as HTMLInputElement
    return { day, month, year }
  }
  it('renders with props as an object', () => {
    const props: DatePickerAllProps = {}

    render(<DatePicker {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<DatePicker showInput />)
    rerender(<DatePicker showInput disabled={true} />)
    const { day, month, year } = getSplitInputs()
    expect(day).toHaveAttribute('disabled')
    expect(month).toHaveAttribute('disabled')
    expect(year).toHaveAttribute('disabled')
    expect(
      document.querySelector('button.dnb-input__submit-button__button')
    ).toHaveAttribute('disabled')
  })

  it('has correct state after "click" trigger', () => {
    render(<DatePicker {...defaultProps} />)

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')

        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )

    expect(getDatePickerRoot().classList).not.toContain(
      'dnb-date-picker--closed'
    )
  })

  it('will close the picker on click outside', async () => {
    render(<DatePicker {...defaultProps} />)

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )

    await userEvent.click(document.body)

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')
        .getAttribute('aria-expanded')
    ).toBe('false')

    expect(getDatePickerRoot().getAttribute('class')).not.toContain(
      'dnb-date-picker--opened'
    )
  })

  it('stays open when clicking outside if preventClose is true', async () => {
    render(<DatePicker {...defaultProps} preventClose />)

    await userEvent.click(getDatePickerTriggerButton())

    expect(
      getDatePickerTriggerButton().getAttribute('aria-expanded')
    ).toBe('true')

    await userEvent.click(document.body)

    expect(
      getDatePickerTriggerButton().getAttribute('aria-expanded')
    ).toBe('true')

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )
  })

  it('keeps open when Escape is pressed if preventClose is true', async () => {
    render(<DatePicker {...defaultProps} preventClose />)

    await userEvent.click(getDatePickerTriggerButton())

    expect(
      getDatePickerTriggerButton().getAttribute('aria-expanded')
    ).toBe('true')

    await userEvent.keyboard('{Escape}')

    expect(
      getDatePickerTriggerButton().getAttribute('aria-expanded')
    ).toBe('true')

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )
  })

  it('closes when Escape is pressed', async () => {
    render(<DatePicker {...defaultProps} />)

    await userEvent.click(getDatePickerTriggerButton())

    expect(
      getDatePickerTriggerButton().getAttribute('aria-expanded')
    ).toBe('true')

    await userEvent.keyboard('{Escape}')

    expect(
      getDatePickerTriggerButton().getAttribute('aria-expanded')
    ).toBe('false')

    expect(getDatePickerRoot().getAttribute('class')).not.toContain(
      'dnb-date-picker--opened'
    )
  })

  it('lets the dialog close on the second Escape press', async () => {
    render(
      <Dialog noAnimation openState title="Dialog">
        <DatePicker {...defaultProps} />
      </Dialog>
    )

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute(
        'data-dnb-modal-active'
      )
    )

    const trigger = getDatePickerTriggerButton()
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    )

    await userEvent.keyboard('{Escape}')

    await waitFor(() =>
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    )

    expect(document.documentElement).toHaveAttribute(
      'data-dnb-modal-active'
    )

    await userEvent.keyboard('{Escape}')

    await waitFor(() =>
      expect(document.documentElement).not.toHaveAttribute(
        'data-dnb-modal-active'
      )
    )
  })

  it('will close the picker on click outside when `onShow` callback sets a state', async () => {
    const onShow = jest.fn()

    const Component = () => {
      const [opened, setOpened] = useState(true)
      return (
        <DatePicker
          date="2025-02-21"
          showInput
          showSubmitButton
          onShow={() => {
            onShow()
            setOpened(!opened)
          }}
        />
      )
    }

    render(<Component />)

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))
    expect(onShow).toHaveBeenCalledTimes(1)

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')

        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )

    await userEvent.click(screen.getByLabelText('lørdag 22. februar 2025'))
    await userEvent.click(document.body)
    expect(onShow).toHaveBeenCalledTimes(1)

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')
        .getAttribute('aria-expanded')
    ).toBe('false')

    expect(getDatePickerRoot().getAttribute('class')).not.toContain(
      'dnb-date-picker--opened'
    )
  })

  it('will close the picker after selection', () => {
    const onChange = jest.fn()
    const { rerender } = render(
      <DatePicker {...defaultProps} onChange={onChange} />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )

    const startTd = document.querySelectorAll(
      'td.dnb-date-picker__day'
    )[10]
    const startButton = startTd.querySelector('button')
    const startLabel = startButton.getAttribute('aria-label')

    const endTd = document.querySelectorAll('td.dnb-date-picker__day')[60]
    const endButton = endTd.querySelector('button')
    const endLabel = endButton.getAttribute('aria-label')

    expect(startLabel).toBe('torsdag 10. januar 2019')
    expect(endLabel).toBe('fredag 15. februar 2019')

    expect(onChange).not.toHaveBeenCalled()

    fireEvent.click(startButton)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].startDate).toBe('2019-01-10')
    expect(onChange.mock.calls[0][0].endDate).toBe(null)

    fireEvent.click(endButton)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0].startDate).toBe('2019-01-10')
    expect(onChange.mock.calls[1][0].endDate).toBe('2019-02-15')

    expect(getDatePickerRoot().classList).not.toContain(
      'dnb-date-picker--closed'
    )

    rerender(
      <DatePicker
        {...defaultProps}
        onChange={onChange}
        range={false}
        endDate={null}
      />
    )

    expect(onChange).toHaveBeenCalledTimes(2)

    const singleTd = document.querySelectorAll(
      'td.dnb-date-picker__day'
    )[11]
    const singleButton = singleTd.querySelector('button')
    const singleLabel = singleButton.getAttribute('aria-label')

    expect(singleLabel).toBe('fredag 11. januar 2019')

    fireEvent.click(singleButton)

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange.mock.calls[2][0].date).toBe('2019-01-11')
    expect(onChange.mock.calls[2][0].startDate).toBe(undefined)
    expect(onChange.mock.calls[2][0].endDate).toBe(undefined)

    expect(getDatePickerRoot().getAttribute('class')).not.toContain(
      'dnb-date-picker--opened'
    )
  })

  it('will close the picker on reset', async () => {
    const onReset = jest.fn()

    render(
      <DatePicker
        date="1981-01-15"
        showResetButton
        showInput
        onReset={onReset}
      />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(getDatePickerRoot()).toHaveClass('dnb-date-picker--opened')

    const resetButton = document.querySelector(
      'button[data-testid="reset"]'
    )

    await userEvent.click(resetButton)

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalledWith(
      expect.objectContaining({ date: '1981-01-15' })
    )

    expect(getDatePickerRoot()).not.toHaveClass('dnb-date-picker--opened')
  })

  it('should delete input content one number at a time when `date` is "prop controlled"', async () => {
    const Component = () => {
      const [date, setDate] = useState('2024-05-17')

      return (
        <DatePicker
          showInput
          date={date}
          onChange={({ date }) => setDate(date)}
        />
      )
    }

    render(<Component />)

    const [day, month, year]: Array<HTMLInputElement> = [
      document.querySelector(
        'input.dnb-date-picker__input--day'
      ) as HTMLInputElement,
      document.querySelector(
        'input.dnb-date-picker__input--month'
      ) as HTMLInputElement,
      document.querySelector(
        'input.dnb-date-picker__input--year'
      ) as HTMLInputElement,
    ]

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('2024')

    await focusInput(year)
    await userEvent.keyboard('{ArrowRight>4}{Backspace>4}')
    expect(year.value).toBe('åååå')
    expect(day.value).toBe('17')
    expect(month.value).toBe('05')

    await userEvent.keyboard('{Backspace>2}')
    expect(month.value).toBe('mm')
    expect(day.value).toBe('17')

    await userEvent.keyboard('{Backspace>2}')
    expect(day.value).toBe('dd')
    expect(month.value).toBe('mm')
    expect(year.value).toBe('åååå')
  })

  it('should delete input content one number at a time when `startDate` and `endDate` is "prop controlled" and in ranged mode', async () => {
    const Component = () => {
      const [startDate, setStartDate] = useState('2024-05-01')
      const [endDate, setEndDate] = useState('2025-06-30')

      return (
        <DatePicker
          showInput
          range
          startDate={startDate}
          endDate={endDate}
          onChange={({ startDate, endDate }) => {
            setStartDate(startDate)
            setEndDate(endDate)
          }}
        />
      )
    }

    render(<Component />)

    const [
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
    ]: Array<HTMLInputElement> = [
      document.querySelector('input.dnb-date-picker__input--day'),
      document.querySelector('input.dnb-date-picker__input--month'),
      document.querySelector('input.dnb-date-picker__input--year'),
      ...Array.from(
        document.querySelectorAll('input.dnb-date-picker__input--day')
      ).slice(1),
      ...Array.from(
        document.querySelectorAll('input.dnb-date-picker__input--month')
      ).slice(1),
      ...Array.from(
        document.querySelectorAll('input.dnb-date-picker__input--year')
      ).slice(1),
    ] as Array<HTMLInputElement>

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    // Depending on timing, month may have partially cleared already
    expect(['06', '0m']).toContain(endMonth.value)
    expect(endYear.value).toBe('2025')

    await focusInput(endYear)
    await userEvent.keyboard('{ArrowRight>4}{Backspace>4}')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')
    expect(endMonth.value).toBe('mm')

    await userEvent.keyboard('{Backspace>2}')
    expect(endDay.value).toBe('dd')

    await userEvent.keyboard('{Backspace>4}')
    expect(startDay.value).toBe('dd')
    expect(startMonth.value).toBe('mm')
    expect(startYear.value).toBe('åååå')
  })

  it('should set the cursor to the beginning of the input during focus', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'not-test'

    render(<DatePicker showInput />)

    const [day]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input.dnb-input__input')
    )

    expect(day.selectionStart).toBe(2)
    expect(day.selectionEnd).toBe(2)

    fireEvent.focus(day)

    expect(day.selectionStart).toBe(0)
    expect(day.selectionEnd).toBe(0)

    process.env.NODE_ENV = originalEnv
  })

  it('should set focus on previous input when pressing backspace and cursor is at the beginning of the input', async () => {
    const Component = () => {
      const [date, setDate] = useState('2024-05-17')

      return (
        <DatePicker
          showInput
          date={date}
          onChange={({ date }) => setDate(date)}
        />
      )
    }

    render(<Component />)

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input.dnb-input__input')
    )

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('2024')

    await focusInput(month)
    await userEvent.keyboard('{Backspace}')

    expect(month.selectionStart).toBe(1)
    expect(month.selectionEnd).toBe(1)

    await userEvent.keyboard('{Backspace}')

    expect(day.value).toBe('17')
    expect(day.selectionStart).toBe(2)
    expect(day.selectionEnd).toBe(2)

    await userEvent.keyboard('{Backspace}')

    expect(day.selectionStart).toBe(1)
    expect(day.selectionEnd).toBe(1)
  })

  describe('Android', () => {
    beforeEach(() => {
      Object.defineProperty(helpers, 'IS_ANDROID', {
        value: true,
      })
    })
    afterEach(() => {
      Object.defineProperty(helpers, 'IS_ANDROID', {
        value: false,
      })
    })

    it('should set focus on previous input on controlled component when pressing backspace and cursor is at the beginning of the input', async () => {
      const Component = () => {
        const [date, setDate] = useState('2024-05-17')

        return (
          <DatePicker
            showInput
            date={date}
            onChange={({ date }) => setDate(date)}
          />
        )
      }

      render(<Component />)

      const [day, month, year]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('input.dnb-input__input')
      )

      expect(day.value).toBe('17')
      expect(month.value).toBe('05')
      expect(year.value).toBe('2024')

      await focusInput(month)
      await userEvent.keyboard('{Backspace}')

      expect(month.selectionStart).toBe(1)
      expect(month.selectionEnd).toBe(1)

      // Clear the month value to make it empty (required for focus change)
      await userEvent.keyboard('{Backspace}')
      expect(month.value).toBe('mm')

      // Set cursor to beginning and simulate Android backspace behavior
      // by dispatching an InputEvent with inputType: 'deleteContentBackward'
      month.setSelectionRange(0, 0)
      fireEvent.input(month, {
        bubbles: true,
        cancelable: true,
        nativeEvent: {
          inputType: 'deleteContentBackward',
        },
      })

      await waitFor(() => {
        expect(document.activeElement).toBe(day)
        expect(day.selectionStart).toBe(2)
        expect(day.selectionEnd).toBe(2)
      })
    })
  })

  it('should insert number in next field when cursor is at the end and the component controlled', async () => {
    const Component = () => {
      const [startDate, setStartDate] = useState('2024-05-01')
      const [endDate, setEndDate] = useState('2025-06-30')

      return (
        <DatePicker
          showInput
          range
          startDate={startDate}
          endDate={endDate}
          onChange={({ startDate, endDate }) => {
            setStartDate(startDate)
            setEndDate(endDate)
          }}
        />
      )
    }

    render(<Component />)

    const [
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
    ]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input.dnb-input__input')
    )

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('06')
    expect(endYear.value).toBe('2025')

    await focusInput(endYear)
    await userEvent.keyboard('{Backspace>16}')

    expect(startDay.value).toBe('dd')
    expect(startMonth.value).toBe('mm')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('01052024')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
  })

  it('moves focus to end day at range boundary (dd.mm.yyyy|-dd.mm.yyyy) when pressing ArrowRight from end of start year', async () => {
    render(<DatePicker showInput range />)

    const [startDay, startYear, endDay]: Array<HTMLInputElement> =
      Array.from(document.querySelectorAll('input.dnb-input__input'))

    // Fill start date to yyyy
    await focusInput(startDay)
    await userEvent.keyboard('12112024')

    // Ensure caret at end of startYear
    await focusInput(startYear)
    startYear.setSelectionRange(4, 4)
    expect(startYear.selectionStart).toBe(4)

    // ArrowRight should move to start of end day
    await userEvent.keyboard('{ArrowRight}')

    // Allow deferred focus change to settle
    await new Promise((r) => setTimeout(r, 0))

    expect(document.activeElement).toBe(endDay)
    expect(endDay.selectionStart).toBe(0)
    expect(endDay.selectionEnd).toBe(0)
  })

  it('typing fills day and month and auto-advances between fields', async () => {
    render(<DatePicker showInput />)

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input.dnb-input__input')
    )

    // Type day -> 2 digits should auto-advance to month
    await userEvent.click(day)
    await userEvent.keyboard('01')
    await new Promise((r) => setTimeout(r, 0))
    expect(document.activeElement).toBe(month)
    expect(month.selectionStart).toBe(month.value.length)

    // Type month -> 2 digits should auto-advance to year
    await userEvent.keyboard('12')
    await new Promise((r) => setTimeout(r, 0))
    expect(document.activeElement).toBe(year)
    expect(year.selectionStart).toBe(year.value.length)
  })

  it('will render the result of "onDaysRender"', () => {
    const customClassName = 'dnb-date-picker__day--weekend'
    const onDaysRender = jest.fn((days) => {
      return days.map((dateObject) => {
        if (isWeekend(dateObject.date)) {
          dateObject.isInactive = true
          dateObject.className = customClassName
        }
        return dateObject
      })
    })

    render(
      <DatePicker
        {...defaultProps}
        onDaysRender={onDaysRender}
        range={false}
        endDate={null}
      />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(getDatePickerRoot().getAttribute('class')).toContain(
      'dnb-date-picker--opened'
    )

    expect(onDaysRender).toHaveBeenCalledTimes(1)
    expect(onDaysRender.mock.calls[0][0].length).toBe(42)
    expect((onDaysRender.mock as any).calls[0][1]).toBe(0)

    const singleTd = document.querySelectorAll(
      'td.dnb-date-picker__day'
    )[12]
    const singleButton = singleTd.querySelector('button')
    const singleLabel = singleButton.getAttribute('aria-label')

    expect(singleLabel).toBe('lørdag 12. januar 2019')
    expect(singleButton).toHaveAttribute('disabled')
    expect(singleTd.classList).toContain(customClassName)
  })

  it('will render the result of "onDaysRender" using getOsloDate', () => {
    const osloDate = getOsloDate()

    const onDaysRender = jest.fn((days) => {
      return days.map((dayObject) => {
        dayObject.isToday = isSameDay(dayObject.date, osloDate)
        return dayObject
      })
    })

    render(
      <DatePicker
        noAnimation
        showInput
        date={osloDate}
        onDaysRender={onDaysRender}
      />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    expect(onDaysRender).toHaveBeenCalledTimes(1)

    const tds = document.querySelectorAll('td.dnb-date-picker__day--today')
    expect(tds).toHaveLength(1)

    const todayTd = Array.from(tds).at(0)
    expect(todayTd).toBeTruthy()
    expect(todayTd.classList).toContain('dnb-date-picker__day--today')

    const todayButton = todayTd.querySelector('button')
    expect(todayButton.textContent).toBe(String(osloDate.getDate()))
  })

  it('should work with shortcuts', () => {
    const onChange = jest.fn()
    render(
      <DatePicker
        noAnimation
        onChange={onChange}
        shortcuts={[
          { title: 'Set date', date: '2020-05-23' },
          { title: 'Set date', closeOnSelect: true, date: '2020-04-23' },
        ]}
      />
    )

    fireEvent.click(getDatePickerTriggerButton())

    fireEvent.click(
      document
        .querySelector('div.dnb-date-picker__addon')
        .querySelectorAll('.dnb-button--secondary')[0]
    )

    expect(
      document.querySelector('label.dnb-date-picker__header__title')
        .textContent
    ).toBe('mai 2020')
    expect(getDatePickerRoot().classList).toContain(
      'dnb-date-picker--opened'
    )
    expect(onChange).toHaveBeenCalledTimes(1)

    // Now, test "closeOnSelect"
    fireEvent.click(
      document
        .querySelector('div.dnb-date-picker__addon')
        .querySelectorAll('.dnb-button--secondary')[1]
    )

    expect(
      document.querySelector('label.dnb-date-picker__header__title')
        .textContent
    ).toBe('april 2020')
    expect(getDatePickerRoot().classList).not.toContain(
      'dnb-date-picker--opened'
    )
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('must have functioning shortcuts for range pickers where dates are defined with a Date object', async () => {
    render(
      <DatePicker
        noAnimation
        range
        shortcuts={[
          {
            title: 'day',
            startDate: new Date('2024-05-17'),
          },
          {
            title: 'week',
            startDate: new Date('2024-06-03'),
            endDate: new Date('2024-06-9'),
          },
          {
            title: 'month',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-31'),
          },
        ]}
      />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const [starDay, startMonth, startYear, endDay, endMonth, endYear] =
      Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      ) as Array<HTMLInputElement>

    const [day, week, month] = Array.from(
      document
        .querySelector('div.dnb-date-picker__addon')
        .querySelectorAll('.dnb-button--secondary')
    )

    expect(starDay.value).toBe('dd')
    expect(startMonth.value).toBe('mm')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.click(day)

    const [leftPickerTitle, rightPickerTitle] = Array.from(
      document.querySelectorAll('label.dnb-date-picker__header__title')
    )

    expect(leftPickerTitle).toHaveTextContent('mai 2024')
    expect(rightPickerTitle).toHaveTextContent('mai 2024')

    expect(starDay.value).toBe('17')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('17')
    expect(endMonth.value).toBe('05')
    expect(endYear.value).toBe('2024')

    await userEvent.click(week)

    expect(leftPickerTitle).toHaveTextContent('juni 2024')
    expect(rightPickerTitle).toHaveTextContent('juni 2024')

    expect(starDay.value).toBe('03')
    expect(startMonth.value).toBe('06')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('09')
    expect(endMonth.value).toBe('06')
    expect(endYear.value).toBe('2024')

    await userEvent.click(month)

    expect(leftPickerTitle).toHaveTextContent('juli 2024')
    expect(rightPickerTitle).toHaveTextContent('juli 2024')

    expect(starDay.value).toBe('01')
    expect(startMonth.value).toBe('07')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('31')
    expect(endMonth.value).toBe('07')
    expect(endYear.value).toBe('2024')
  })

  it('should receive all dates in the shortcut callback', async () => {
    const onShortcutClick = jest.fn()

    render(
      <DatePicker
        noAnimation
        range
        startDate={new Date('2024-05-17')}
        endDate={new Date('2024-05-31')}
        shortcuts={[
          {
            title: 'day',
            date: onShortcutClick,
          },
        ]}
      />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const shortcut = document
      .querySelector('div.dnb-date-picker__addon')
      .querySelector('.dnb-button--secondary')

    await userEvent.click(shortcut)

    expect(onShortcutClick).toHaveBeenCalledTimes(1)
    expect(onShortcutClick).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: new Date('2024-05-17'),
        startDate: new Date('2024-05-17'),
        endDate: new Date('2024-05-31'),
      })
    )
  })

  it('has two calendar views', () => {
    render(<DatePicker {...defaultProps} />)

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )
    expect(
      document.querySelector('.dnb-date-picker__views')
    ).toBeInTheDocument()
    expect(
      document.querySelectorAll('.dnb-date-picker__calendar').length
    ).toBe(2)
  })

  it('has correctly synced calendar views based on user navigation and date selection', async () => {
    render(
      <DatePicker range startDate="2024-10-01" endDate="2024-10-24" />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const [leftPicker, rightPicker] = Array.from(
      document.querySelectorAll('.dnb-date-picker__calendar')
    )

    const leftPrev = leftPicker.querySelector('.dnb-date-picker__prev')
    const rightPrev = rightPicker.querySelector('.dnb-date-picker__prev')

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    // TODO: Fix this after conversion merge
    // The right picker should be november here, but this is a bug that exists in master/original version of DatePicker
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('juli 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.hover(screen.getByLabelText('torsdag 11. juli 2024'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('juli 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.click(rightPrev)
    await userEvent.click(rightPrev)

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('juli 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('august 2024')

    await userEvent.hover(screen.getByLabelText('tirsdag 20. august 2024'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('juli 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('august 2024')

    await userEvent.click(screen.getByLabelText('tirsdag 20. august 2024'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('juli 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('august 2024')
  })

  it('should not set the month pickers to same month when `startDate` and `endDate` are set to same day in range mode', async () => {
    render(
      <DatePicker range startDate="2024-10-24" endDate="2024-11-24" />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const [leftPicker, rightPicker] = Array.from(
      document.querySelectorAll('.dnb-date-picker__calendar')
    )

    const leftPrev = leftPicker.querySelector('.dnb-date-picker__prev')
    const rightNext = rightPicker.querySelector('.dnb-date-picker__next')

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(screen.getByLabelText('mandag 14. oktober 2024'))
    await userEvent.click(screen.getByLabelText('mandag 14. oktober 2024'))
    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(
      screen.getByLabelText('lørdag 16. november 2024')
    )
    await userEvent.click(
      screen.getByLabelText('lørdag 16. november 2024')
    )
    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(rightNext)
    await userEvent.click(rightNext)

    await userEvent.click(screen.getByLabelText('onsdag 1. januar 2025'))
    await userEvent.click(screen.getByLabelText('onsdag 1. januar 2025'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('januar 2025')

    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)

    await userEvent.click(screen.getByLabelText('torsdag 18. juli 2024'))
    await userEvent.click(screen.getByLabelText('onsdag 1. januar 2025'))
  })

  it('should not set the month pickers to same month when `startDate` and `endDate` are set to same month in range mode', async () => {
    render(
      <DatePicker range startDate="2024-10-24" endDate="2024-11-24" />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const [leftPicker, rightPicker] = Array.from(
      document.querySelectorAll('.dnb-date-picker__calendar')
    )

    const leftPrev = leftPicker.querySelector('.dnb-date-picker__prev')
    const rightNext = rightPicker.querySelector('.dnb-date-picker__next')

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(screen.getByLabelText('mandag 14. oktober 2024'))
    await userEvent.click(screen.getByLabelText('onsdag 16. oktober 2024'))
    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(
      screen.getByLabelText('lørdag 16. november 2024')
    )
    await userEvent.click(
      screen.getByLabelText('lørdag 16. november 2024')
    )

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(rightNext)
    await userEvent.click(rightNext)

    await userEvent.click(screen.getByLabelText('onsdag 1. januar 2025'))
    await userEvent.click(screen.getByLabelText('søndag 13. oktober 2024'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('januar 2025')

    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)

    await userEvent.click(screen.getByLabelText('torsdag 18. juli 2024'))
    await userEvent.click(screen.getByLabelText('onsdag 1. januar 2025'))

    await userEvent.click(leftPrev)
    await userEvent.click(screen.getByLabelText('tirsdag 4. juni 2024'))
    await userEvent.click(screen.getByLabelText('tirsdag 11. juni 2024'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('juni 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('januar 2025')

    await userEvent.click(leftPrev)
    await userEvent.click(screen.getByLabelText('fredag 10. mai 2024'))
    await userEvent.click(screen.getByLabelText('fredag 17. mai 2024'))

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('mai 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('januar 2025')
  })

  it('should set correct month based date selected with keyboard navigation', async () => {
    render(<DatePicker range date="2024-10-01" />)

    await userEvent.click(getDatePickerTriggerButton())

    const pickerTitle = document.querySelector(
      '.dnb-date-picker__calendar .dnb-date-picker__header__title'
    )

    const firstDayButton = document.querySelector(
      '.dnb-date-picker__calendar .dnb-date-picker__day button'
    ) as HTMLButtonElement
    await userEvent.click(firstDayButton)

    expect(pickerTitle).toHaveTextContent('oktober 2024')

    await userEvent.keyboard('{ArrowLeft}')

    expect(pickerTitle).toHaveTextContent('september 2024')

    await userEvent.keyboard('{ArrowRight>32}')

    expect(pickerTitle).toHaveTextContent('november 2024')
  })

  it('should set correct month based date selected with keyboard navigation in range mode', async () => {
    render(
      <DatePicker range startDate="2024-10-01" endDate="2024-10-02" />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const [leftPickerTitle, rightPickerTitle] = Array.from(
      document.querySelectorAll(
        '.dnb-date-picker__calendar .dnb-date-picker__header__title'
      )
    )

    const firstRangeDayButton = document.querySelector(
      '.dnb-date-picker__calendar .dnb-date-picker__day button'
    ) as HTMLButtonElement
    await userEvent.click(firstRangeDayButton)

    expect(leftPickerTitle).toHaveTextContent('oktober 2024')
    expect(rightPickerTitle).toHaveTextContent('oktober 2024')

    await userEvent.keyboard('{ArrowLeft}')

    expect(leftPickerTitle).toHaveTextContent('september 2024')
    expect(rightPickerTitle).toHaveTextContent('oktober 2024')

    await userEvent.keyboard('{ArrowRight>32}')

    expect(leftPickerTitle).toHaveTextContent('november 2024')
    expect(rightPickerTitle).toHaveTextContent('oktober 2024')

    // Tab to right picker and navigate to december
    await userEvent.keyboard('{Tab>3}{ArrowRight>62}')

    expect(leftPickerTitle).toHaveTextContent('november 2024')
    expect(rightPickerTitle).toHaveTextContent('desember 2024')

    await userEvent.keyboard('{ArrowLeft>70}')

    expect(leftPickerTitle).toHaveTextContent('november 2024')
    expect(rightPickerTitle).toHaveTextContent('september 2024')
  })

  it('has a reacting start date input with valid value', () => {
    const { rerender } = render(<DatePicker {...defaultProps} />)
    const elem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0] as HTMLInputElement

    // by default we have the start day
    expect(elem.value).toBe('01')

    // listen to changes
    let changedStartDate = null
    rerender(
      <DatePicker
        {...defaultProps}
        onChange={({ startDate }) => {
          changedStartDate = startDate
        }}
      />
    )

    // change the date
    const value = '02'
    fireEvent.change(elem, {
      target: { value },
    })

    // then check the new input value
    expect(elem.value).toBe(value)

    // and the event fired value
    expect(changedStartDate).toBe(`2019-01-${value}`)

    // test prop change to make sure getDerivedStateFromProps works
    rerender(
      <DatePicker
        {...defaultProps}
        onChange={({ startDate }) => {
          changedStartDate = startDate
        }}
        startDate="2019-01-03"
      />
    )
    expect(elem.value).toBe('03')

    // reset the value
    fireEvent.change(elem, {
      target: { value: '01' },
    })

    rerender(
      <DatePicker
        {...defaultProps}
        onChange={({ startDate }) => {
          changedStartDate = startDate
        }}
        startDate={defaultProps.startDate}
      />
    )
  })

  it('will set highlight class on fields with a number value', async () => {
    render(<DatePicker showInput />)

    const [day, month, year] = Array.from(
      document.querySelectorAll('input')
    )

    const test = async (elem: HTMLInputElement) => {
      expect(elem.classList).not.toContain(
        'dnb-multi-input-mask__input--highlight'
      )

      await focusInput(elem)
      await userEvent.keyboard('1')

      await waitFor(() =>
        expect(elem.classList).toContain(
          'dnb-multi-input-mask__input--highlight'
        )
      )

      await userEvent.keyboard('{Backspace>4}') // use 4 because of year

      await waitFor(() =>
        expect(elem.classList).not.toContain(
          'dnb-multi-input-mask__input--highlight'
        )
      )
    }

    await test(day)
    await test(month)
    await test(year)
  })

  it('forces replace overwrite mode for inline inputs', () => {
    const optionsEnhancer = jest.fn((options) => options)
    render(<DatePicker showInput {...({ optionsEnhancer } as any)} />)

    expect(optionsEnhancer).toHaveBeenCalled()
    expect(
      optionsEnhancer.mock.calls.every(
        ([options]) => options?.overwriteMode === 'replace'
      )
    ).toBe(true)
  })

  it('omits input shell class when omitInputShellClass is true', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error - Testing deprecated omitInputShellClass prop
    render(<DatePicker showInput omitInputShellClass />)

    const wrapper = document.querySelector('.dnb-input')
    expect(
      wrapper.querySelector('.dnb-input__shell')
    ).not.toBeInTheDocument()
    expect(
      wrapper.querySelector('.dnb-input__border')
    ).not.toBeInTheDocument()
  })

  it('should reset second input fields to blank during new date selection', () => {
    render(<DatePicker {...defaultProps} />)
    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    fireEvent.click(
      document.querySelectorAll(
        'table tbody button.dnb-button--secondary'
      )[10]
    )

    expect(
      (
        document.querySelectorAll(
          'input.dnb-date-picker__input--year'
        )[1] as HTMLInputElement
      ).value
    ).toBe('åååå')
  })

  it('has to reset second input fields to blank during new date selection', () => {
    render(<DatePicker {...defaultProps} />)
    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    fireEvent.click(
      document.querySelectorAll(
        'table tbody button.dnb-button--secondary'
      )[10]
    )

    expect(
      (
        document.querySelectorAll(
          'input.dnb-date-picker__input--year'
        )[1] as HTMLInputElement
      ).value
    ).toBe('åååå')
  })

  it('footer buttons work properly', async () => {
    const onSubmit = jest.fn()
    const onCancel = jest.fn()
    const onReset = jest.fn()

    const date = '2020-10-20'

    render(
      <DatePicker
        date={date}
        opened
        noAnimation
        preventClose
        showResetButton
        showCancelButton
        showSubmitButton
        onSubmit={onSubmit}
        onCancel={onCancel}
        onReset={onReset}
      />
    )

    const [day, month, year] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    )

    const resetButton = document.querySelector(
      'button[data-testid="reset"]'
    )
    const cancelButton = document.querySelector(
      'button[data-testid="cancel"]'
    )
    const submitButton = document.querySelector(
      'button[data-testid="submit"]'
    )

    // Check labels
    expect(resetButton).toBeInTheDocument()
    expect(resetButton).toHaveTextContent('Nullstill')

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toHaveTextContent('Avbryt')

    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveTextContent('Ok')

    // Validate initial values
    expect(day).toHaveValue('20')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2020')

    // Test reset button
    await userEvent.click(screen.getByLabelText('fredag 9. oktober 2020'))
    await userEvent.click(resetButton)

    expect(onReset).toHaveBeenCalled()
    expect(onReset).toHaveBeenCalledWith(expect.objectContaining({ date }))

    expect(day).toHaveValue('20')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2020')

    // Test submit button
    await userEvent.click(screen.getByLabelText('torsdag 8. oktober 2020'))
    await userEvent.click(submitButton)

    expect(day).toHaveValue('08')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2020')

    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ date: '2020-10-08' })
    )

    // Test cancel button
    await userEvent.click(screen.getByLabelText('fredag 9. oktober 2020'))
    await userEvent.click(submitButton)
    await userEvent.click(screen.getByLabelText('torsdag 8. oktober 2020'))
    await userEvent.click(screen.getByLabelText('mandag 5. oktober 2020'))
    await userEvent.click(cancelButton)
    expect(onCancel).toHaveBeenCalled()

    expect(day).toHaveValue('09')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2020')

    expect(onCancel).toHaveBeenCalledWith(
      expect.objectContaining({ date: '2020-10-09' })
    )
  })

  it('should empty the input fields when clicking the reset button when `date` is `undefined`', async () => {
    const onReset = jest.fn()

    render(
      <DatePicker
        date={undefined}
        onReset={onReset}
        showResetButton
        showInput
      />
    )

    const [day, month, year] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    // Verify that the date is undefined.
    expect(day.value).toBe('dd')
    expect(month.value).toBe('mm')
    expect(year.value).toBe('åååå')

    // Enter date in the input fields to make sure the test always runs with the same month every time.
    await focusInput(day)
    await userEvent.keyboard('01')
    await focusInput(month)
    await userEvent.keyboard('08')
    await focusInput(year)
    await userEvent.keyboard('2025')

    expect(day.value).toBe('01')
    expect(month.value).toBe('08')
    expect(year.value).toBe('2025')

    // Open the date picker and select a date.
    await userEvent.click(screen.getByLabelText('Åpne datovelger'))
    await userEvent.click(screen.getByLabelText('torsdag 14. august 2025'))

    // Verify that the date is correct
    expect(day.value).toBe('14')
    expect(month.value).toBe('08')
    expect(year.value).toBe('2025')

    // Clear the date based on the undefined date prop and verify.
    await userEvent.click(
      document.querySelector('button[data-testid="reset"]')
    )

    expect(day.value).toBe('dd')
    expect(month.value).toBe('mm')
    expect(year.value).toBe('åååå')
  })

  it('should have functioning reset button with range pickers', async () => {
    render(
      <DatePicker
        startDate="2024-04-01"
        endDate="2024-05-17"
        showInput
        range
      />
    )

    await userEvent.click(getDatePickerTriggerButton())

    const [startDay, startMonth, startYear, endDay, endMonth, endYear] =
      Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      ) as Array<HTMLInputElement>

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('04')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('17')
    expect(endMonth.value).toBe('05')
    expect(endYear.value).toBe('2024')

    await userEvent.click(screen.getByText('Avbryt'))

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('04')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('17')
    expect(endMonth.value).toBe('05')
    expect(endYear.value).toBe('2024')

    expect(getDatePickerRoot().classList).not.toContain(
      'dnb-date-picker--opened'
    )
  })

  it('footers reset button text is set by prop resetButtonText', () => {
    const resetButtonText = 'custom reset button text'

    render(
      <DatePicker
        opened
        noAnimation
        showResetButton
        resetButtonText={resetButtonText}
      />
    )

    const resetElem = document.querySelector('button[data-testid="reset"]')
    expect(resetElem).toBeInTheDocument()
    expect(resetElem.textContent).toMatch(resetButtonText)
  })

  it('footer is rendered when showResetButton is provided', () => {
    render(<DatePicker opened noAnimation showResetButton />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is rendered when showCancelButton is provided', () => {
    render(<DatePicker opened noAnimation showCancelButton />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is rendered when showSubmitButton is provided', () => {
    render(<DatePicker opened noAnimation showSubmitButton />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is rendered when range is provided', () => {
    render(<DatePicker opened noAnimation range />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is not rendered', () => {
    render(
      <DatePicker
        opened
        noAnimation
        showResetButton={false}
        showCancelButton={false}
        showSubmitButton={false}
        range={false}
        endDate={null}
      />
    )

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).not.toBeInTheDocument()
  })

  it('has a working month correction', async () => {
    render(<DatePicker showInput />)

    const [dayElem, monthElem, yearElem] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    )

    // change the date
    const day = '01'
    const month = '01' // will have to make a correction internally
    const year = '2020'

    await focusInput(dayElem)
    await userEvent.keyboard(day)
    await focusInput(monthElem)
    await userEvent.keyboard(month)
    await focusInput(yearElem)
    await userEvent.keyboard(year)

    // then check the new input value
    expect(dayElem).toHaveValue(day)
    expect(monthElem).toHaveValue(month)
    expect(yearElem).toHaveValue(year)
  })

  it('has a working min and max date limitation', async () => {
    const onType = jest.fn()
    const onChange = jest.fn()

    const { rerender } = render(
      <DatePicker
        {...defaultProps}
        minDate="2019-01-02"
        maxDate="2019-02-04"
        startDate="2019-01-02T00:00:00.000Z"
        onChange={onChange}
        onType={onType}
      />
    )
    const startElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0]
    const endElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[1]

    // by default we have the start day
    expect(startElem).toHaveValue('02')

    // change to invalid date
    await focusInput(startElem as HTMLInputElement)
    await userEvent.keyboard('{Backspace>2}01')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    expect(onChange.mock.calls[0][0].isValidStartDate).toBe(false)
    expect(onType.mock.calls[0][0].isValidStartDate).toBe(false)

    await focusInput(startElem as HTMLInputElement)
    await userEvent.keyboard('{Backspace>2}03')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(2))
    expect(onChange.mock.calls[1][0].isValidStartDate).toBe(true)
    expect(onType.mock.calls[1][0].isValidStartDate).toBe(true)

    await focusInput(endElem as HTMLInputElement)
    await userEvent.keyboard('{Backspace>2}05')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(3))
    expect(onChange.mock.calls[2][0].endDate).toBe('2019-02-05')
    expect(onChange.mock.calls[2][0].isValidEndDate).toBe(false)
    expect(onType.mock.calls[2][0].isValidEndDate).toBe(false)

    fireEvent.click(getDatePickerTriggerButton())

    const invalidDayElem = document.querySelectorAll(
      '.dnb-date-picker__day button'
    )[1]
    expect(invalidDayElem.getAttribute('aria-label')).toBe(
      'tirsdag 1. januar 2019'
    )
    expect(invalidDayElem).toBeInTheDocument()
    expect(invalidDayElem).toHaveAttribute('disabled')
    expect(
      document.querySelectorAll('.dnb-date-picker__day button')[2]
    ).not.toHaveAttribute('disabled')

    expect(onChange.mock.calls[2][0].date).toBe(undefined)
    expect(onChange.mock.calls[2][0].isValid).toBe(undefined)

    rerender(
      <DatePicker
        {...defaultProps}
        minDate="2019-01-02"
        maxDate="2019-02-04"
        startDate="2019-01-02T00:00:00.000Z"
        onChange={onChange}
        onType={onType}
        range={false}
        endDate={null}
      />
    )

    // change the date to a valid date
    fireEvent.change(startElem, {
      target: { value: '01' },
    })

    expect(onChange.mock.calls[3][0].isValidStartDate).toBe(undefined)
    expect(onChange.mock.calls[3][0].isValidEndDate).toBe(undefined)
    expect(onChange.mock.calls[3][0].isValid).toBe(false)

    await focusInput(startElem as HTMLInputElement)
    await userEvent.keyboard('{Backspace>2}03')
    await waitFor(() =>
      expect(onChange.mock.calls[4][0].date).toBe('2019-01-03')
    )
    expect(onChange.mock.calls[4][0].isValid).toBe(true)
  })

  it('has valid onType and onChange event calls', () => {
    function capitalizeFirstLetter(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1)
    }

    const onType = jest.fn()
    const onChange = jest.fn()

    render(
      <DatePicker
        id="date-picker-id"
        noAnimation={true}
        range={true}
        showInput={true}
        onType={onType}
        onChange={onChange}
      />
    )

    const startDayElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0]
    const startMonthElem = document.querySelectorAll(
      'input.dnb-date-picker__input--month'
    )[0]
    const startYearElem = document.querySelectorAll(
      'input.dnb-date-picker__input--year'
    )[0]

    const endDayElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[1]
    const endMonthElem = document.querySelectorAll(
      'input.dnb-date-picker__input--month'
    )[1]
    const endYearElem = document.querySelectorAll(
      'input.dnb-date-picker__input--year'
    )[1]

    const testInteraction = ({
      typeIndex,
      changeIndex,
      dayElem,
      monthElem,
      yearElem,
      type,
    }) => {
      // by default we have the start day
      expect(dayElem).toHaveValue('dd')
      expect(onType).toHaveBeenCalledTimes(typeIndex)

      // change the day
      fireEvent.change(dayElem, {
        target: { value: '03' },
      })
      expect(dayElem).toHaveValue('03')
      expect(onType).toHaveBeenCalledTimes(typeIndex + 1)
      expect(onType.mock.calls[typeIndex][0][`${type}Date`]).toBe(
        'yyyy-mm-03'
      )

      typeIndex++

      // change the month
      fireEvent.change(monthElem, {
        target: { value: '01' },
      })
      expect(monthElem).toHaveValue('01')
      expect(onType).toHaveBeenCalledTimes(typeIndex + 1)

      expect(
        onType.mock.calls[typeIndex][0][
          `isValid${capitalizeFirstLetter(type)}Date`
        ]
      ).toBe(false)
      expect(onType.mock.calls[typeIndex][0][`${type}Date`]).toBe(
        'yyyy-01-03'
      )
      expect(onChange).toHaveBeenCalledTimes(changeIndex)

      // change the year halfway
      fireEvent.change(yearElem, {
        target: { value: '202' },
      })
      expect(yearElem).toHaveValue('202å')
      expect(onType).toHaveBeenCalledTimes(typeIndex + 2)
      expect(onChange).toHaveBeenCalledTimes(changeIndex)

      // change the year
      fireEvent.change(yearElem, {
        target: { value: '2020' },
      })
      expect(yearElem).toHaveValue('2020')
      expect(onType).toHaveBeenCalledTimes(typeIndex + 3)
      expect(onChange).toHaveBeenCalledTimes(changeIndex + 1)
    }

    testInteraction({
      type: 'start',
      typeIndex: 0,
      changeIndex: 0,
      dayElem: startDayElem,
      monthElem: startMonthElem,
      yearElem: startYearElem,
    })

    testInteraction({
      type: 'end',
      typeIndex: 4,
      changeIndex: 2, // because we do not count the first one
      dayElem: endDayElem,
      monthElem: endMonthElem,
      yearElem: endYearElem,
    })
  })

  it('has correct css classes on range selection', () => {
    render(
      <DatePicker id="date-picker-id" noAnimation range opened showInput />
    )

    const FirstCalendar = document.querySelectorAll(
      '.dnb-date-picker__calendar'
    )[0]
    const SecondCalendar = document.querySelectorAll(
      '.dnb-date-picker__calendar'
    )[1]
    const firstDayElem = FirstCalendar.querySelectorAll(
      'td.dnb-date-picker__day--selectable'
    )[0]
    const lastDayElem = SecondCalendar.querySelectorAll(
      'td.dnb-date-picker__day--selectable'
    )[
      SecondCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      ).length - 1
    ]

    // 1. Get ready. No selection made

    expect(
      FirstCalendar.querySelector('.dnb-date-picker__day--preview')
    ).not.toBeInTheDocument()
    expect(
      FirstCalendar.querySelector(
        '.dnb-date-picker__day--within-selection'
      )
    ).not.toBeInTheDocument()
    expect(firstDayElem.classList).not.toContain(
      'dnb-date-picker__day--start-date'
    )
    expect(firstDayElem.classList).not.toContain(
      'dnb-date-picker__day--end-date'
    )

    // 2. Click on start date

    fireEvent.click(firstDayElem.querySelector('button'))

    // 3. Should be marked with start and end date

    expect(firstDayElem.classList).toContain(
      'dnb-date-picker__day--start-date'
    )
    expect(firstDayElem.classList).toContain(
      'dnb-date-picker__day--end-date'
    )

    // 4. But still no "selection"

    expect(
      FirstCalendar.querySelector('.dnb-date-picker__day--preview')
    ).not.toBeInTheDocument()
    expect(
      FirstCalendar.querySelector(
        '.dnb-date-picker__day--within-selection'
      )
    ).not.toBeInTheDocument()

    // 5. Hover on last day

    fireEvent.mouseOver(lastDayElem.querySelector('button'))

    // 6. We should have all TDs in between, marked as "preview"
    // - and we should have marked it as the end-date

    expect(lastDayElem.classList).toContain(
      'dnb-date-picker__day--end-date'
    )
    expect(
      FirstCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      )[1].classList
    ).toContain('dnb-date-picker__day--preview')
    expect(
      SecondCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      )[
        SecondCalendar.querySelectorAll(
          'td.dnb-date-picker__day--selectable'
        ).length - 2
      ].classList
    ).toContain('dnb-date-picker__day--preview')

    // 7. simulate mouse leave the calendar

    fireEvent.mouseLeave(FirstCalendar.querySelectorAll('table')[0])

    // 8. remove the selection when mouse leaves the calendar

    expect(lastDayElem.classList).not.toContain(
      'dnb-date-picker__day--end-date'
    )
    expect(
      FirstCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      )[1].classList
    ).not.toContain('dnb-date-picker__day--preview')
    expect(
      SecondCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      )[
        SecondCalendar.querySelectorAll(
          'td.dnb-date-picker__day--selectable'
        ).length - 2
      ].classList
    ).not.toContain('dnb-date-picker__day--preview')

    // 9. Now, click on the last day as well

    fireEvent.click(lastDayElem.querySelector('button'))

    // 10. We should have all TDs in between, marked as "within-selection"

    expect(
      FirstCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      )[1].classList
    ).toContain('dnb-date-picker__day--within-selection')
    expect(
      SecondCalendar.querySelectorAll(
        'td.dnb-date-picker__day--selectable'
      )[
        SecondCalendar.querySelectorAll(
          'td.dnb-date-picker__day--selectable'
        ).length - 2
      ].classList
    ).toContain('dnb-date-picker__day--within-selection')
  })

  it('resets date correctly between interactions', () => {
    let outerState
    const onChange = jest.fn(({ date }) => (outerState = date))
    const { rerender } = render(
      <DatePicker onChange={onChange} showInput date="2019-02-01" />
    )

    function changeState() {
      const elem = document.querySelectorAll('input.dnb-input__input')[0]
      expect(elem).toHaveValue('01')

      // 1. change the date with event
      fireEvent.change(elem, {
        target: { value: '16' },
      })
      // Siulate prop update, like a state update would do
      rerender(
        <DatePicker onChange={onChange} showInput date={outerState} />
      )

      expect(
        (
          document.querySelectorAll(
            'input.dnb-input__input'
          )[0] as HTMLInputElement
        ).value
      ).toBe('16')

      // 2. change the date by prop
      rerender(
        <DatePicker onChange={onChange} showInput date="2019-02-01" />
      )

      expect(
        (
          document.querySelectorAll(
            'input.dnb-input__input'
          )[0] as HTMLInputElement
        ).value
      ).toBe('01')
    }

    changeState()
    expect(onChange).toHaveBeenCalledTimes(1)

    changeState()
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('should reset on setting value to null', () => {
    const { rerender } = render(
      <DatePicker
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
      />
    )

    rerender(
      <DatePicker
        showInput
        range
        startDate={null}
        endDate={defaultProps.endDate}
      />
    )
    expect(
      (
        document.querySelectorAll(
          'input.dnb-input__input'
        )[0] as HTMLInputElement
      ).value
    ).toBe('dd')
    expect(
      (
        document.querySelectorAll(
          'input.dnb-input__input'
        )[3] as HTMLInputElement
      ).value
    ).toBe('15')

    rerender(
      <DatePicker showInput range startDate={null} endDate={null} />
    )
    expect(
      (
        document.querySelectorAll(
          'input.dnb-input__input'
        )[5] as HTMLInputElement
      ).value
    ).toBe('åååå')
  })

  it('should clear internal date when null is passed', async () => {
    const onChange = jest.fn()

    const { rerender } = render(
      <DatePicker onChange={onChange} showInput />
    )

    const dayInput = document.querySelector('.dnb-date-picker__input--day')
    const monthInput = document.querySelector(
      '.dnb-date-picker__input--month'
    )
    const yearInput = document.querySelector(
      '.dnb-date-picker__input--year'
    )

    // Typing a valid end date
    fireEvent.focus(dayInput)
    await userEvent.keyboard('29112025')

    expect(dayInput).toHaveValue('29')
    expect(monthInput).toHaveValue('11')
    expect(yearInput).toHaveValue('2025')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: '2025-11-29',
      })
    )

    rerender(<DatePicker onChange={onChange} showInput date={null} />)

    expect(dayInput).toHaveValue('dd')
    expect(monthInput).toHaveValue('mm')
    expect(yearInput).toHaveValue('åååå')

    // Typing a valid end date
    fireEvent.focus(dayInput)
    await userEvent.keyboard('29')

    expect(dayInput).toHaveValue('29')
    expect(monthInput).toHaveValue('mm')
    expect(yearInput).toHaveValue('åååå')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('has a reacting end date input with valid value', () => {
    const { rerender } = render(
      <DatePicker
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
      />
    )
    const elem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[1]

    // by default we have the start day
    expect(elem).toHaveValue('15')

    // listen to changes
    let changedStartDate = null
    rerender(
      <DatePicker
        showInput
        range
        startDate={null}
        endDate={defaultProps.endDate}
        onChange={({ endDate }) => {
          changedStartDate = endDate
        }}
      />
    )

    expect(document.querySelectorAll('input')[0].value).toBe('dd')

    // change the date
    const value = '16'
    fireEvent.change(elem, {
      target: { value },
    })

    // then check the new input value
    expect(elem).toHaveValue(value)

    // and the event fired value
    expect(changedStartDate).toBe(`2019-02-${value}`)

    // test prop change to make sure getDerivedStateFromProps works
    rerender(
      <DatePicker
        showInput
        range
        startDate={null}
        endDate="2019-02-17"
        onChange={({ endDate }) => {
          changedStartDate = endDate
        }}
      />
    )
    expect(elem).toHaveValue('17')

    // reset the value
    fireEvent.change(elem, {
      target: { value: '15' },
    })

    rerender(
      <DatePicker
        showInput
        range
        startDate={defaultProps.startDate}
        endDate="2019-02-17"
        onChange={({ endDate }) => {
          changedStartDate = endDate
        }}
      />
    )
  })

  it('should return all additional attributes the event return', () => {
    const my_event = jest.fn()
    const params = { 'data-attr': 'value' }
    render(<DatePicker onShow={my_event} {...params} />)
    fireEvent.click(getDatePickerTriggerButton())
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('is displaying correct month', () => {
    render(
      <DatePicker
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
      />
    )

    fireEvent.click(getDatePickerTriggerButton())

    const elem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[1]
    fireEvent.change(elem, {
      target: { value: '15' },
    })

    expect(
      document.querySelectorAll('.dnb-date-picker__header__title')[0]
        .textContent
    ).toBe('januar 2019')

    expect(
      document.querySelector(
        'td.dnb-date-picker__day--start-date .dnb-button__text'
      ).textContent
    ).toBe('1')

    expect(
      document.querySelector(
        'td.dnb-date-picker__day--end-date .dnb-button__text'
      ).textContent
    ).toBe('15')

    // from now on, check the second calendar
    fireEvent.click(
      document
        .querySelectorAll('.dnb-date-picker__calendar')[1]
        .querySelector('button.dnb-date-picker__next')
    )

    expect(
      document.querySelectorAll('.dnb-date-picker__header__title')[1]
        .textContent
    ).toBe('mars 2019')
  })

  it('should have a aria-describedby on first focus', () => {
    const label = 'Input Label'
    render(
      <DatePicker
        id="custom-id"
        label={label}
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
      />
    )

    const legendElem = document.querySelector('fieldset > legend')
    expect(legendElem.textContent).toBe(label)
    expect(legendElem.classList).toContain('dnb-sr-only')
  })

  it('should select first caret position on first focus', () => {
    render(
      <DatePicker
        id="custom-id"
        label="Input Label"
        range
        startDate={defaultProps.startDate}
      />
    )

    const inputElement = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement

    fireEvent.focus(inputElement)
    inputElement.setSelectionRange(0, 0)

    expect(inputElement.selectionStart).toBe(0)
    expect(inputElement.selectionEnd).toBe(0)

    fireEvent.keyDown(inputElement, {
      key: 'A',
    })

    expect(inputElement.selectionStart).toBe(0)
    expect(inputElement.selectionEnd).toBe(0)

    fireEvent.mouseUp(inputElement)

    expect(inputElement.selectionStart).toBe(0)
    expect(inputElement.selectionEnd).toBe(0)

    fireEvent.focus(inputElement)

    expect(inputElement.selectionStart).toBe(0)
    expect(inputElement.selectionEnd).toBe(0)
  })

  it('should focus on date picker on opening', async () => {
    render(
      <DatePicker
        id="custom-id"
        label="Input Label"
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
      />
    )

    const element = getDatePickerRoot()
    const buttonElement = document.querySelector(
      'button.dnb-input__submit-button__button'
    )

    fireEvent.click(buttonElement)

    expect(element.classList).toContain('dnb-date-picker--opened')

    const tableElement = document.querySelector('table')

    await waitFor(() => {
      expect(document.activeElement).toBe(tableElement)
    })
  })

  it('should not set focus when disableAutofocus is set', () => {
    render(
      <DatePicker
        id="custom-id"
        label="Input Label"
        showInput
        disableAutofocus
        startDate={defaultProps.startDate}
      />
    )

    const element = getDatePickerRoot()
    const buttonElement = document.querySelector(
      'button.dnb-input__submit-button__button'
    )

    expect(document.activeElement).toBe(document.body)

    fireEvent.click(buttonElement)

    expect(document.activeElement).toBe(document.body)
    expect(element.classList).toContain('dnb-date-picker--opened')
  })

  it('should react on keydown events', async () => {
    render(
      <DatePicker
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
        id="unique-id"
      />
    )

    const [dayElem, monthElem] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    // set the cursor to the end of the input
    dayElem.setSelectionRange(2, 2)

    // and simulate a right keydown
    fireEvent.keyDown(dayElem, { key: 'Right', keyCode: 39 })

    // and check the class of that element
    await waitFor(() => {
      expect(document.activeElement.classList).toContain(
        'dnb-date-picker__input--month'
      )
    })

    // and simulate a left keydown
    fireEvent.keyDown(monthElem, { key: 'Left', keyCode: 37 })

    // and check the class of that element
    await waitFor(() => {
      expect(document.activeElement.classList).toContain(
        'dnb-date-picker__input--day'
      )
    })
  })

  it('should display correct start and end month on opening the date picker', async () => {
    render(
      <DatePicker startMonth="2024-01-01" endMonth="2024-12-31" range />
    )

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const [startMonth, endMonth] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    expect(startMonth).toHaveTextContent('januar 2024')
    expect(endMonth).toHaveTextContent('desember 2024')
  })

  it('should display month based on input value when opening picker', async () => {
    render(<DatePicker showInput />)

    const dayInput = document.querySelector('.dnb-date-picker__input--day')

    await userEvent.click(dayInput)
    await userEvent.keyboard('10022001')
    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const startMonth = document.querySelector(
      '.dnb-date-picker__header__title'
    )
    const selectedMonth = document.querySelector('[aria-current="date"]')

    expect(startMonth).toHaveTextContent('februar 2001')
    expect(selectedMonth).toHaveAttribute(
      'aria-label',
      'lørdag 10. februar 2001'
    )
  })

  it('should display correct months in calendar view based on input value when opening the picker in range mode', async () => {
    render(
      <DatePicker startMonth="2024-01-01" endMonth="2024-12-31" range />
    )

    const dayInput = document.querySelector('.dnb-date-picker__input--day')

    await userEvent.click(dayInput)
    await userEvent.keyboard('0103200106042003')
    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const [startMonth, endMonth] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    const [selectedStartMonth, selectedEndMonth] = Array.from(
      document.querySelectorAll('[aria-current="date"]')
    )

    expect(startMonth).toHaveTextContent('mars 2001')
    expect(endMonth).toHaveTextContent('april 2003')
    expect(selectedStartMonth).toHaveAttribute(
      'aria-label',
      'torsdag 1. mars 2001'
    )
    expect(selectedEndMonth).toHaveAttribute(
      'aria-label',
      'søndag 6. april 2003'
    )
  })

  describe('size', () => {
    it('has correct small size', () => {
      render(<DatePicker {...defaultProps} size="small" />)
      expect(
        document.querySelector('.dnb-date-picker--small')
      ).toBeInTheDocument()
    })
    it('has correct medium size', () => {
      render(<DatePicker {...defaultProps} size="medium" />)
      expect(
        document.querySelector('.dnb-date-picker--medium')
      ).toBeInTheDocument()
    })
    it('has correct large size', () => {
      render(<DatePicker {...defaultProps} size="large" />)
      expect(
        document.querySelector('.dnb-date-picker--large')
      ).toBeInTheDocument()
    })

    it('should apply size classes to wrapped Input component when size is small', () => {
      render(<DatePicker {...defaultProps} showInput size="small" />)

      const inputWrapper = document.querySelector('.dnb-input')
      expect(inputWrapper).toHaveClass('dnb-input--small')
      expect(inputWrapper).not.toHaveClass('dnb-input--medium')
      expect(inputWrapper).not.toHaveClass('dnb-input--large')
    })

    it('should apply size classes to wrapped Input component when size is medium', () => {
      render(<DatePicker {...defaultProps} showInput size="medium" />)

      const inputWrapper = document.querySelector('.dnb-input')
      expect(inputWrapper).toHaveClass('dnb-input--medium')
      expect(inputWrapper).not.toHaveClass('dnb-input--small')
      expect(inputWrapper).not.toHaveClass('dnb-input--large')
    })

    it('should apply size classes to wrapped Input component when size is large', () => {
      render(<DatePicker {...defaultProps} showInput size="large" />)

      const inputWrapper = document.querySelector('.dnb-input')
      expect(inputWrapper).toHaveClass('dnb-input--large')
      expect(inputWrapper).not.toHaveClass('dnb-input--small')
      expect(inputWrapper).not.toHaveClass('dnb-input--medium')
    })
  })

  it('should display the correct date in calendar when date prop changes', async () => {
    const { rerender } = render(<DatePicker date="2023-01-01" showInput />)

    function getDateElements() {
      const title: HTMLLabelElement = document.querySelector(
        '.dnb-date-picker__header__title'
      )
      const button: HTMLButtonElement = document.querySelector(
        'button[aria-current="date"]'
      )

      return [title, button] as const
    }

    const inputButton = document.querySelector(
      '.dnb-input__submit-button__button'
    )

    await userEvent.click(inputButton)

    const [firstTitle, firstDateButton] = getDateElements()

    expect(firstTitle.title).toBe('Valgt måned januar 2023')
    expect(firstTitle).toHaveTextContent('januar 2023')

    expect(firstDateButton.getAttribute('aria-label')).toBe(
      'søndag 1. januar 2023'
    )
    expect(firstDateButton.children[2]).toHaveTextContent('1')

    rerender(<DatePicker date="2024-05-17" showInput />)

    await userEvent.click(inputButton)

    const [secondTitle, secondDateButton] = getDateElements()

    expect(secondTitle.title).toBe('Valgt måned mai 2024')
    expect(secondTitle).toHaveTextContent('mai 2024')

    expect(secondDateButton.getAttribute('aria-label')).toBe(
      'fredag 17. mai 2024'
    )
    expect(secondDateButton.children[2]).toHaveTextContent('17')

    rerender(<DatePicker date="2035-12-24" showInput />)

    await userEvent.click(inputButton)

    const [thirdTitle, thirdDateButton] = getDateElements()

    expect(thirdTitle.title).toBe('Valgt måned desember 2035')
    expect(thirdTitle).toHaveTextContent('desember 2035')

    expect(thirdDateButton.getAttribute('aria-label')).toBe(
      'mandag 24. desember 2035'
    )
    expect(thirdDateButton.children[2]).toHaveTextContent('24')
  })

  it('renders correct placeholder when setting locale', () => {
    const props: DatePickerAllProps = {}

    render(
      <Provider locale="en-GB">
        <DatePicker {...props} showInput={true} />
      </Provider>
    )

    const [dayElem, monthElem, yearElem] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    )

    const delimiters = document.querySelectorAll(
      '.dnb-multi-input-mask__delimiter'
    )

    expect(dayElem).toHaveValue('dd')
    expect(monthElem).toHaveValue('mm')
    expect(yearElem).toHaveValue('yyyy')
    // Should have 2 delimiters (between day-month and month-year)
    expect(delimiters.length).toBe(2)
    delimiters.forEach((delimiter) => {
      expect(delimiter.textContent).toBe('/')
    })
  })

  it('should use dot delimiter for Norwegian locale (nb-NO)', () => {
    render(
      <Provider locale="nb-NO">
        <DatePicker showInput />
      </Provider>
    )

    const delimiters = document.querySelectorAll(
      '.dnb-multi-input-mask__delimiter'
    )

    // Norwegian locale uses dots in maskPlaceholder (dd.mm.åååå)
    // Should have 2 delimiters (between day-month and month-year)
    expect(delimiters.length).toBe(2)
    delimiters.forEach((delimiter) => {
      expect(delimiter.textContent).toBe('.')
    })
  })

  it('should use slash delimiter for English locale (en-GB)', () => {
    render(
      <Provider locale="en-GB">
        <DatePicker showInput />
      </Provider>
    )

    const delimiters = document.querySelectorAll(
      '.dnb-multi-input-mask__delimiter'
    )

    // English locale uses slashes in maskPlaceholder (dd/mm/yyyy)
    // Should have 2 delimiters (between day-month and month-year)
    expect(delimiters.length).toBe(2)
    delimiters.forEach((delimiter) => {
      expect(delimiter.textContent).toBe('/')
    })
  })

  it('should extract delimiter from custom maskPlaceholder', () => {
    render(
      <DatePicker
        showInput
        maskPlaceholder="dd-mm-yyyy"
        maskOrder="dd/mm/yyyy"
      />
    )

    const delimiters = document.querySelectorAll(
      '.dnb-multi-input-mask__delimiter'
    )

    // Should use delimiter from maskPlaceholder (dash), not maskOrder (slash)
    // Should have 2 delimiters (between day-month and month-year)
    expect(delimiters.length).toBe(2)
    delimiters.forEach((delimiter) => {
      expect(delimiter.textContent).toBe('-')
    })
  })

  it('renders should support `sv-SE` locale', () => {
    render(
      <Provider locale="sv-SE" translations={svSE}>
        <DatePicker
          showCancelButton
          showResetButton
          showSubmitButton
          showInput
          opened
        />
      </Provider>
    )

    const dayLabels = Array.from(
      document.querySelectorAll('.dnb-date-picker__labels__day')
    )

    expect(dayLabels.at(0)).toHaveAttribute('aria-label', 'måndag')
    expect(dayLabels.at(1)).toHaveAttribute('aria-label', 'tisdag')
    expect(dayLabels.at(2)).toHaveAttribute('aria-label', 'onsdag')
    expect(dayLabels.at(3)).toHaveAttribute('aria-label', 'torsdag')
    expect(dayLabels.at(4)).toHaveAttribute('aria-label', 'fredag')
    expect(dayLabels.at(5)).toHaveAttribute('aria-label', 'lördag')
    expect(dayLabels.at(6)).toHaveAttribute('aria-label', 'söndag')

    expect(
      document.querySelector('[data-testid="cancel"]  .dnb-button__text')
        .textContent
    ).toBe('Stäng')

    expect(
      document.querySelector('[data-testid="reset"]  .dnb-button__text')
        .textContent
    ).toBe('Återställ')

    expect(
      document.querySelector('[data-testid="submit"]  .dnb-button__text')
        .textContent
    ).toBe('Okej')
  })

  it('renders should support `da-DK` locale', () => {
    render(
      <Provider locale="da-DK" translations={daDK}>
        <DatePicker
          showCancelButton
          showResetButton
          showSubmitButton
          showInput
          opened
        />
      </Provider>
    )

    const dayLabels = Array.from(
      document.querySelectorAll('.dnb-date-picker__labels__day')
    )

    expect(dayLabels.at(0)).toHaveAttribute('aria-label', 'mandag')
    expect(dayLabels.at(1)).toHaveAttribute('aria-label', 'tirsdag')
    expect(dayLabels.at(2)).toHaveAttribute('aria-label', 'onsdag')
    expect(dayLabels.at(3)).toHaveAttribute('aria-label', 'torsdag')
    expect(dayLabels.at(4)).toHaveAttribute('aria-label', 'fredag')
    expect(dayLabels.at(5)).toHaveAttribute('aria-label', 'lørdag')
    expect(dayLabels.at(6)).toHaveAttribute('aria-label', 'søndag')

    expect(
      document.querySelector('[data-testid="cancel"]  .dnb-button__text')
        .textContent
    ).toBe('Annuller')

    expect(
      document.querySelector('[data-testid="reset"]  .dnb-button__text')
        .textContent
    ).toBe('Nulstil')

    expect(
      document.querySelector('[data-testid="submit"]  .dnb-button__text')
        .textContent
    ).toBe('Ok')
  })

  it('should fire blur event when input loses focus with existing date', async () => {
    const onBlur = jest.fn()
    render(<DatePicker showInput onBlur={onBlur} date="2024-01-05" />)

    const [firstInput, secondInput]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-input__input')
    )

    await userEvent.click(firstInput)

    expect(onBlur).toHaveBeenCalledTimes(0)
    expect(document.activeElement).toBe(firstInput)

    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(firstInput)
    // Wait for deferred blur handler (requestAnimationFrame/setTimeout)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: '2024-01-05',
      })
    )

    await userEvent.click(secondInput)

    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(secondInput)

    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(secondInput)
    // Wait for deferred blur handler (requestAnimationFrame/setTimeout)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(2)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-01-05' })
    )
  })

  it('should fire blur event with `date`', async () => {
    const onBlur = jest.fn()
    render(<DatePicker showInput onBlur={onBlur} />)

    const dayInput = document.querySelector('.dnb-date-picker__input--day')
    const yearInput = document.querySelector(
      '.dnb-date-picker__input--year'
    ) as HTMLInputElement

    // Type day
    await userEvent.click(dayInput)
    await userEvent.keyboard('12')
    // Blur doesn't fire during typing, only when focus leaves
    expect(onBlur).toHaveBeenCalledTimes(0)

    // Type month
    await userEvent.keyboard('11')
    expect(onBlur).toHaveBeenCalledTimes(0)

    // Type year
    await userEvent.keyboard('202')
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: null,
      })
    )

    await userEvent.click(yearInput)
    yearInput.setSelectionRange(0, 0)
    await userEvent.keyboard('2025')
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(2)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: '2025-11-12',
      })
    )

    // Remove part of year to make date partial again
    await userEvent.click(yearInput)
    await userEvent.keyboard('{ArrowRight>4}{Backspace}')
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(3)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: null,
      })
    )
  })

  it('should fire focus event with `date`', async () => {
    const onFocus = jest.fn()
    render(<DatePicker showInput onFocus={onFocus} />)

    const dayInput = document.querySelector('.dnb-date-picker__input--day')
    const monthInput = document.querySelector(
      '.dnb-date-picker__input--month'
    )
    const yearInput = document.querySelector(
      '.dnb-date-picker__input--year'
    ) as HTMLInputElement

    // Focus day
    await userEvent.click(dayInput)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: null,
        isValid: false,
      })
    )

    // Type day
    await userEvent.keyboard('12')
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Type month
    await userEvent.keyboard('11')
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Type year
    await userEvent.keyboard('202')
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Focus month
    await userEvent.click(monthInput)
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Focus year
    await userEvent.click(yearInput)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: null,
        isValid: false,
      })
    )

    // Complete year
    await userEvent.keyboard('5')
    expect(onFocus).toHaveBeenCalledTimes(1)

    await userEvent.click(document.body)

    // Focus day again
    await userEvent.click(dayInput)
    expect(onFocus).toHaveBeenCalledTimes(2)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: '2025-11-12',
        isValid: true,
      })
    )
  })

  it('should fire focus event with `startDate` and `endDate`', async () => {
    const onFocus = jest.fn()
    render(<DatePicker showInput range onFocus={onFocus} />)

    const startDayInput = document.querySelector(
      '.dnb-date-picker__input--day'
    )
    const startMonthInput = document.querySelector(
      '.dnb-date-picker__input--month'
    )
    const [startYearInput, endYearInput] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input--year')
    ) as Array<HTMLInputElement>
    const endDayInput = Array.from(
      document.querySelectorAll('.dnb-date-picker__input--day')
    )[1]

    // Focus start day
    await userEvent.click(startDayInput)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: null,
        endDate: null,
        isValidStartDate: false,
        isValidEndDate: false,
      })
    )

    // Type day
    await userEvent.keyboard('12')
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Type month
    await userEvent.keyboard('12')
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Type year - when year is complete, focus moves to end day, triggering another focus event
    await userEvent.keyboard('1212')
    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(2)
    })
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: null,
        isValidStartDate: true,
        isValidEndDate: false,
      })
    )

    // Focus start month - clicking a different input within the same MultiInputMask triggers focus
    await userEvent.click(startMonthInput)
    expect(onFocus).toHaveBeenCalledTimes(3)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: null,
        isValidStartDate: true,
        isValidEndDate: false,
      })
    )

    // Focus end day - clicking a different MultiInputMask triggers focus
    await userEvent.click(endDayInput)
    expect(onFocus).toHaveBeenCalledTimes(4)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: null,
        isValidStartDate: true,
        isValidEndDate: false,
      })
    )

    // Type day
    await userEvent.keyboard('12')
    expect(onFocus).toHaveBeenCalledTimes(4)

    // Type month
    await userEvent.keyboard('12')
    expect(onFocus).toHaveBeenCalledTimes(4)

    // Type year - when year is complete, focus moves but focus event may not fire immediately
    await userEvent.keyboard('1212')
    // Focus event may not fire when focus automatically moves after completing end year
    expect(onFocus).toHaveBeenCalledTimes(4)

    // Focus end year - clicking a different input within the same MultiInputMask may not trigger focus
    // if focus is already on that MultiInputMask
    await userEvent.click(endYearInput)
    expect(onFocus).toHaveBeenCalledTimes(4)

    // Remove part of end year
    await userEvent.keyboard('{ArrowRight>4}{Backspace}')
    expect(onFocus).toHaveBeenCalledTimes(4)

    // Focus start year - clicking a different MultiInputMask triggers focus
    await userEvent.click(startYearInput)
    expect(onFocus).toHaveBeenCalledTimes(5)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: null,
        isValidStartDate: true,
        isValidEndDate: false,
      })
    )

    // Remove part of start year - this may trigger focus events as the date becomes invalid
    await userEvent.keyboard('{ArrowRight>4}{Backspace>6}')
    // The focus event count may increase when the date becomes invalid
    expect(onFocus).toHaveBeenCalledTimes(6)

    await userEvent.click(document.body)

    // Focus start day again
    await userEvent.click(startDayInput)
    expect(onFocus).toHaveBeenCalledTimes(7)
    expect(onFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: null,
        endDate: null,
        isValidStartDate: false,
        isValidEndDate: false,
      })
    )
  })

  it('should fire blur event with `startDate` and `endDate`', async () => {
    const onBlur = jest.fn()
    render(<DatePicker showInput range onBlur={onBlur} />)

    const startDayInput = document.querySelector(
      '.dnb-date-picker__input--day'
    )
    const endYearInput = document.querySelectorAll(
      '.dnb-date-picker__input--year'
    )[1]

    // Type day
    await userEvent.click(startDayInput)
    await userEvent.keyboard('12')
    // Blur doesn't fire during typing, only when focus leaves
    expect(onBlur).toHaveBeenCalledTimes(0)

    // Type month
    await userEvent.keyboard('12')
    expect(onBlur).toHaveBeenCalledTimes(0)

    // Type year
    await userEvent.keyboard('1212')
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: null,
        isValidStartDate: true,
        isValidEndDate: false,
      })
    )

    // Type day
    await userEvent.keyboard('12')
    expect(onBlur).toHaveBeenCalledTimes(1)

    // Type month
    await userEvent.keyboard('12')
    expect(onBlur).toHaveBeenCalledTimes(1)

    // Type year
    await userEvent.keyboard('1212')
    // Clicking body triggers blur
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(2)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: '1212-12-12',
        isValidStartDate: true,
        isValidEndDate: true,
      })
    )

    // Remove the whole end , month and day
    await userEvent.click(endYearInput)
    await userEvent.keyboard('{ArrowRight>4}{Backspace>8}')
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(3)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: '1212-12-12',
        endDate: null,
        isValidStartDate: true,
        isValidEndDate: false,
      })
    )

    // Remove part of start year
    await userEvent.keyboard('{Backspace}')
    // Clicking body triggers blur
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(4)
    })
    expect(onBlur).toHaveBeenLastCalledWith(
      expect.objectContaining({
        startDate: null,
        endDate: null,
        isValidStartDate: false,
        isValidEndDate: false,
      })
    )
  })

  it('should have todays date enabled in calendar if minDate is today', async () => {
    const minDate = new Date()

    render(<DatePicker minDate={minDate} />)

    const button = document.querySelector(
      '.dnb-input__submit-element > button'
    )

    await userEvent.click(button)

    const todayButton = document.querySelector(
      '.dnb-date-picker__day--today > button'
    )

    expect(todayButton).not.toBeDisabled()
  })

  it('should update calendar when changing minDate', async () => {
    const DatePickerComponent = () => {
      const today = new Date()
      const [minDate, setMinDate] = React.useState(today)

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return (
        <>
          <Button
            onClick={() => {
              setMinDate(tomorrow)
            }}
          >
            Click me
          </Button>
          <DatePicker minDate={minDate} />
        </>
      )
    }

    render(<DatePickerComponent />)

    const button = document.querySelector(
      '.dnb-input__submit-element > button'
    )

    await userEvent.click(button)

    const todayButton = document.querySelector(
      '.dnb-date-picker__day--today > button'
    )

    expect(todayButton).not.toBeDisabled()

    await userEvent.click(screen.getByText('Click me'))

    expect(todayButton).toBeDisabled()
  })

  it('should tab to next element after closing date picker', async () => {
    render(
      <>
        <DatePicker
          noAnimation={true}
          showInput
          date={new Date('2025-02-12')}
        />
        <Input id="my-input" />
      </>
    )

    const focusTrigger = async () => {
      const trigger = getDatePickerTriggerButton()
      for (let i = 0; i < 10 && document.activeElement !== trigger; i++) {
        await userEvent.tab()
      }
      await waitFor(() => {
        expect(trigger).toHaveFocus()
      })
    }

    await focusTrigger()

    await userEvent.keyboard('{Enter}')

    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(getDatePickerTriggerButton()).toHaveFocus()
    })

    await userEvent.tab()
    await waitFor(() => {
      expect(document.querySelector('#my-input')).toHaveFocus()
    })
  })

  it('should trigger `onChange` with `invalidDate` when input is fully filled out with an invalid date', async () => {
    const onChange = jest.fn()
    render(<DatePicker onChange={onChange} showInput />)

    const dayInput = document.querySelector(
      '.dnb-date-picker__input--day'
    ) as HTMLInputElement

    await focusInput(dayInput)
    await userEvent.keyboard('3919')
    await userEvent.keyboard('1111')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ invalidDate: '1111-19-39' })
    )

    // Typing a valid date
    await focusInput(dayInput)
    await userEvent.keyboard('{Backspace>8}20112025')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(6))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ invalidDate: null })
    )
  })

  it('should trigger `onChange` with `invalidStartDate` and `invalidEndDate` when input is fully filled out with an invalid dates in `range` mode', async () => {
    const onChange = jest.fn()
    render(<DatePicker onChange={onChange} range showInput />)

    const dayInput = document.querySelector(
      '.dnb-date-picker__input--day'
    ) as HTMLInputElement

    // Fill out startDay
    await focusInput(dayInput)
    await userEvent.keyboard('99')
    await userEvent.keyboard('99')
    await userEvent.keyboard('9999')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ invalidStartDate: '9999-99-99' })
    )

    // Fill out endDay
    await userEvent.keyboard('88')
    await userEvent.keyboard('88')
    await userEvent.keyboard('8888')
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(2))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        invalidStartDate: '9999-99-99',
        invalidEndDate: '8888-88-88',
        startDate: null,
        endDate: null,
      })
    )

    // Typing a valid start date
    await userEvent.click(dayInput)
    dayInput.setSelectionRange(0, 0)
    await userEvent.keyboard('20112025')
    expect(onChange).toHaveBeenCalledTimes(7)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        invalidStartDate: null,
        invalidEndDate: '8888-88-88',
        startDate: '2025-11-20',
        endDate: null,
      })
    )

    // Typing a valid end date
    await userEvent.keyboard('29112025')
    expect(onChange).toHaveBeenCalledTimes(12)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        invalidStartDate: null,
        invalidEndDate: null,
        startDate: '2025-11-20',
        endDate: '2025-11-29',
      })
    )
  })

  it('should set cursor on beginning of input when clicking on input', async () => {
    render(<DatePicker showInput={true} />)

    const input = document.querySelector(
      '.dnb-date-picker__input--day'
    ) as HTMLInputElement

    expect(input.selectionStart).toBe(input.value.length)
    expect(input.selectionEnd).toBe(input.value.length)

    await userEvent.click(input)

    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(0)
  })

  it('should set cursor on end of input when clicking on input when existing value is given', async () => {
    render(<DatePicker showInput={true} date="2023-10-01" />)

    const input = document.querySelector(
      '.dnb-date-picker__input--day'
    ) as HTMLInputElement

    expect(input.selectionStart).toBe(input.value.length)
    expect(input.selectionEnd).toBe(input.value.length)

    await userEvent.click(input)

    expect(input.selectionStart).toBe(2)
    expect(input.selectionEnd).toBe(2)
  })

  it('should use inputMode="numeric" on all inputs', async () => {
    render(<DatePicker range={true} showInput={true} />)

    const inputs = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    expect(inputs.every((input) => input.inputMode === 'numeric')).toBe(
      true
    )
  })

  it('should support spacing props', () => {
    render(<DatePicker top="2rem" showInput />)

    const element = getDatePickerRoot()

    expect(Array.from(element.classList)).toEqual([
      'dnb-date-picker',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-date-picker--hidden',
      'dnb-date-picker--show-input',
    ])
  })

  it('should align popover to right when stretch prop is true', async () => {
    let capturedAlignOnTarget: string | undefined

    const PopoverModule = await import('../../popover/Popover')

    jest.spyOn(PopoverModule, 'default').mockImplementation((props) => {
      capturedAlignOnTarget = props.alignOnTarget
      // Return a simple div to avoid infinite loops
      return React.createElement('div', {
        className: 'dnb-popover--active',
        'data-testid': 'popover-mock',
      })
    })

    render(<DatePicker stretch showInput date="2023-01-16" />)

    const trigger = getDatePickerTriggerButton()
    await userEvent.click(trigger)

    await waitFor(() => {
      const popover = document.querySelector(
        '[data-testid="popover-mock"]'
      )
      expect(popover).toBeInTheDocument()
    })

    // Verify alignOnTarget is 'right' when stretch is true
    // When the change is present: alignPicker === 'right' || stretch ? 'right' : 'left'
    // When reverted: alignPicker === 'right' ? 'right' : 'left'
    expect(capturedAlignOnTarget).toBe('right')

    jest.restoreAllMocks()
  })

  it('should align popover to left when stretch prop is false', async () => {
    let capturedAlignOnTarget: string | undefined

    const PopoverModule = await import('../../popover/Popover')

    jest.spyOn(PopoverModule, 'default').mockImplementation((props) => {
      capturedAlignOnTarget = props.alignOnTarget
      // Return a simple div to avoid infinite loops
      return React.createElement('div', {
        className: 'dnb-popover--active',
        'data-testid': 'popover-mock',
      })
    })

    render(<DatePicker showInput date="2023-01-16" />)

    const trigger = getDatePickerTriggerButton()
    await userEvent.click(trigger)

    await waitFor(() => {
      const popover = document.querySelector(
        '[data-testid="popover-mock"]'
      )
      expect(popover).toBeInTheDocument()
    })

    // Verify alignOnTarget is 'left' when stretch is false
    expect(capturedAlignOnTarget).toBe('left')

    jest.restoreAllMocks()
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <DatePicker label="Label" showInput />
      </Provider>
    )

    const element = getDatePickerRoot()
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'lang'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-date-picker',
      'dnb-form-component',
      'dnb-date-picker--vertical',
      'dnb-date-picker--hidden',
      'dnb-date-picker--show-input',
    ])
  })

  it('should display a month ahead in right picker when range is linked', async () => {
    render(
      <DatePicker startDate="2024-10-10" endDate="2024-11-21" range link />
    )

    const [startDay, startMonth, startYear, endDay, endMonth, endYear] =
      Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      ) as Array<HTMLInputElement>

    expect(startDay.value).toBe('10')
    expect(startMonth.value).toBe('10')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('21')
    expect(endMonth.value).toBe('11')
    expect(endYear.value).toBe('2024')

    await userEvent.click(getDatePickerTriggerButton())

    const [leftPicker, rightPicker] = Array.from(
      document.querySelectorAll('.dnb-date-picker__calendar')
    )

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(
      screen.getByLabelText('torsdag 14. november 2024')
    )

    expect(startDay.value).toBe('14')
    expect(startMonth.value).toBe('11')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')

    await userEvent.click(screen.getByLabelText('onsdag 2. oktober 2024'))

    expect(startDay.value).toBe('02')
    expect(startMonth.value).toBe('10')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('14')
    expect(endMonth.value).toBe('11')
    expect(endYear.value).toBe('2024')

    expect(
      leftPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      rightPicker.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')
  })

  it('should use correct dates based on props updated through useLayoutEffect', async () => {
    const Component = () => {
      const [date, setDate] = React.useState(new Date('2025-04-12'))
      const [minDate, setMinDate] = React.useState(new Date('2025-04-10'))
      const [maxDate, setMaxDate] = React.useState(new Date('2025-04-20'))

      React.useLayoutEffect(() => {
        setDate(new Date('2025-04-15'))
        setMinDate(new Date('2025-04-05'))
        setMaxDate(new Date('2025-04-25'))
      }, [])

      return <DatePicker date={date} minDate={minDate} maxDate={maxDate} />
    }

    render(<Component />)

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    // Check date
    expect(
      screen.getByLabelText('lørdag 12. april 2025')
    ).not.toHaveAttribute('aria-current', 'date')
    expect(
      screen.getByLabelText('tirsdag 15. april 2025')
    ).toHaveAttribute('aria-current', 'date')

    // Check minDate
    expect(
      screen.getByLabelText('onsdag 9. april 2025')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('fredag 4. april 2025')).toBeDisabled()

    // Check maxDate
    expect(
      screen.getByLabelText('mandag 21. april 2025')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('lørdag 26. april 2025')).toBeDisabled()
  })

  it('should use correct dates based on props updated through useLayoutEffect in StrictMode', async () => {
    const Component = () => {
      const [date, setDate] = React.useState(new Date('2025-04-12'))
      const [minDate, setMinDate] = React.useState(new Date('2025-04-10'))
      const [maxDate, setMaxDate] = React.useState(new Date('2025-04-20'))

      React.useLayoutEffect(() => {
        setDate(new Date('2025-04-15'))
        setMinDate(new Date('2025-04-05'))
        setMaxDate(new Date('2025-04-25'))
      }, [])

      return <DatePicker date={date} minDate={minDate} maxDate={maxDate} />
    }

    render(
      <StrictMode>
        <Component />
      </StrictMode>
    )

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    // Check date
    expect(
      screen.getByLabelText('lørdag 12. april 2025')
    ).not.toHaveAttribute('aria-current', 'date')
    expect(
      screen.getByLabelText('tirsdag 15. april 2025')
    ).toHaveAttribute('aria-current', 'date')

    // Check minDate
    expect(
      screen.getByLabelText('onsdag 9. april 2025')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('fredag 4. april 2025')).toBeDisabled()

    // Check maxDate
    expect(
      screen.getByLabelText('mandag 21. april 2025')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('lørdag 26. april 2025')).toBeDisabled()
  })

  it('should not select invalid dates when navigating the calendar using the arrow keys', async () => {
    render(
      <DatePicker
        date="2025-04-25"
        showInput
        onDaysRender={(days) => {
          return days.map((dayObject) => {
            if (isWeekend(dayObject.date)) {
              dayObject.isInactive = true
              dayObject.className = 'dnb-date-picker__day--weekend' // custom css
            }

            return dayObject
          })
        }}
      />
    )

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const [day, month, year] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    await userEvent.keyboard('{ArrowRight}')

    expect(screen.getByLabelText('mandag 28. april 2025')).toHaveAttribute(
      'aria-current',
      'date'
    )

    expect(day.value).toBe('28')
    expect(month.value).toBe('04')
    expect(year.value).toBe('2025')

    expect(
      screen.getByLabelText('lørdag 26. april 2025')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('søndag 27. april 2025')
    ).toBeInTheDocument()

    await userEvent.keyboard('{ArrowLeft}')

    expect(screen.getByLabelText('fredag 25. april 2025')).toHaveAttribute(
      'aria-current',
      'date'
    )

    expect(day.value).toBe('25')
    expect(month.value).toBe('04')
    expect(year.value).toBe('2025')

    expect(
      screen.getByLabelText('lørdag 26. april 2025')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('søndag 27. april 2025')
    ).toBeInTheDocument()
  })

  it('should enable navigation by year in the calendar when `yearNavigation` is set to `true`', async () => {
    const onChange = jest.fn()

    render(
      <DatePicker
        date="2025-04-16"
        yearNavigation
        showInput
        onChange={onChange}
      />
    )

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const [monthTitle, yearTitle] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    const [prevMonthButton, prevYearButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__prev')
    )
    const [nextMonthButton, nextYearButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__next')
    )

    const [day, month, year] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    expect(prevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(nextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(prevYearButton).toHaveAttribute('aria-label', 'Forrige år 2024')
    expect(nextYearButton).toHaveAttribute('aria-label', 'Neste år 2026')

    await userEvent.click(prevYearButton)
    // Verify year
    expect(yearTitle).toHaveTextContent('2024')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2024')
    expect(prevYearButton).toHaveAttribute('aria-label', 'Forrige år 2023')
    expect(nextYearButton).toHaveAttribute('aria-label', 'Neste år 2025')

    // Verify month
    expect(prevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(nextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(monthTitle).toHaveTextContent('april')
    expect(monthTitle).toHaveAttribute('title', 'Valgt måned april')

    await userEvent.click(nextYearButton)
    await userEvent.click(nextYearButton)

    // Verify year
    expect(yearTitle).toHaveTextContent('2026')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2026')
    expect(prevYearButton).toHaveAttribute('aria-label', 'Forrige år 2025')
    expect(nextYearButton).toHaveAttribute('aria-label', 'Neste år 2027')

    // Verify month
    expect(prevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(nextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(monthTitle).toHaveTextContent('april')
    expect(monthTitle).toHaveAttribute('title', 'Valgt måned april')

    // Pick a new date
    await userEvent.click(screen.getByLabelText('onsdag 1. april 2026'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        date: '2026-04-01',
      })
    )
    expect(day).toHaveValue('01')
    expect(month).toHaveValue('04')
    expect(year).toHaveValue('2026')
    expect(screen.getByLabelText('onsdag 1. april 2026')).toHaveAttribute(
      'aria-current',
      'date'
    )
  })

  it('should enable navigation by year in the calendar when `yearNavigation` is set to `true` and in range mode', async () => {
    const onChange = jest.fn()

    render(
      <DatePicker
        startDate="2025-04-16"
        endDate="2026-05-17"
        onChange={onChange}
        yearNavigation
        showInput
        range
      />
    )

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const [
      leftMonthTitle,
      leftYearTitle,
      rightMonthTitle,
      rightYearTitle,
    ] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    const [
      leftPrevMonthButton,
      leftPrevYearButton,
      rightPrevMonthButton,
      rightPrevYearButton,
    ] = Array.from(document.querySelectorAll('.dnb-date-picker__prev'))

    const [
      leftNextMonthButton,
      leftNextYearButton,
      rightNextMonthButton,
      rightNextYearButton,
    ] = Array.from(document.querySelectorAll('.dnb-date-picker__next'))

    const [startDay, startMonth, startYear, endDay, endMonth, endYear] =
      Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      ) as Array<HTMLInputElement>

    // Verify initial label values
    // Left
    expect(leftPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(leftNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(leftPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2024'
    )
    expect(leftNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2026'
    )

    // Right
    expect(rightPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned april'
    )
    expect(rightNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned juni'
    )
    expect(rightPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2025'
    )
    expect(rightNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2027'
    )

    await userEvent.click(leftPrevYearButton)
    await userEvent.click(rightPrevYearButton)

    // Verify years
    // Left
    expect(leftYearTitle).toHaveTextContent('2024')
    expect(leftYearTitle).toHaveAttribute('title', 'Valgt år 2024')
    expect(leftPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2023'
    )
    expect(leftNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2025'
    )

    // Right
    expect(rightYearTitle).toHaveTextContent('2025')
    expect(rightYearTitle).toHaveAttribute('title', 'Valgt år 2025')
    expect(rightPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2024'
    )
    expect(rightNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2026'
    )

    // Verify months
    // Left
    expect(leftPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(leftNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(leftMonthTitle).toHaveTextContent('april')
    expect(leftMonthTitle).toHaveAttribute('title', 'Valgt måned april')

    // Right
    expect(rightMonthTitle).toHaveTextContent('mai')
    expect(rightMonthTitle).toHaveAttribute('title', 'Valgt måned mai')
    expect(rightPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned april'
    )
    expect(rightNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned juni'
    )

    await userEvent.click(leftNextYearButton)
    await userEvent.click(leftNextYearButton)
    await userEvent.click(rightNextYearButton)
    await userEvent.click(rightNextYearButton)

    // Verify years
    // Left
    expect(leftYearTitle).toHaveTextContent('2026')
    expect(leftYearTitle).toHaveAttribute('title', 'Valgt år 2026')
    expect(leftPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2025'
    )
    expect(leftNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2027'
    )

    // Right
    expect(rightYearTitle).toHaveTextContent('2027')
    expect(rightYearTitle).toHaveAttribute('title', 'Valgt år 2027')
    expect(rightPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2026'
    )
    expect(rightNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2028'
    )

    // Verify months
    // Left
    expect(leftPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(leftNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(leftMonthTitle).toHaveTextContent('april')
    expect(leftMonthTitle).toHaveAttribute('title', 'Valgt måned april')

    // Right
    expect(rightMonthTitle).toHaveTextContent('mai')
    expect(rightMonthTitle).toHaveAttribute('title', 'Valgt måned mai')
    expect(rightPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned april'
    )
    expect(rightNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned juni'
    )

    // Pick new dates
    await userEvent.click(screen.getByLabelText('onsdag 1. april 2026'))
    await userEvent.click(screen.getByLabelText('lørdag 1. mai 2027'))

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: '2026-04-01',
        endDate: '2027-05-01',
      })
    )
    // Start date
    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('04')
    expect(startYear).toHaveValue('2026')
    expect(screen.getByLabelText('onsdag 1. april 2026')).toHaveAttribute(
      'aria-current',
      'date'
    )

    // End date
    expect(endDay).toHaveValue('01')
    expect(endMonth).toHaveValue('05')
    expect(endYear).toHaveValue('2027')
    expect(screen.getByLabelText('lørdag 1. mai 2027')).toHaveAttribute(
      'aria-current',
      'date'
    )
  })

  it('should respect `minDate` and `maxDate` when `yearNavigation` is set to `true`', async () => {
    render(
      <DatePicker
        date="2025-04-16"
        minDate="2024-04-01"
        maxDate="2026-04-30"
        yearNavigation
      />
    )

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const [, yearTitle] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    const [prevMonthButton, prevYearButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__prev')
    )
    const [nextMonthButton, nextYearButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__next')
    )

    expect(yearTitle).toHaveTextContent('2025')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2025')

    await userEvent.click(prevYearButton)
    // Verify year
    expect(yearTitle).toHaveTextContent('2024')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2024')
    expect(prevYearButton).toHaveClass('disabled')
    expect(prevMonthButton).toHaveClass('disabled')

    await userEvent.click(nextYearButton)
    await userEvent.click(nextYearButton)

    // Verify year
    expect(yearTitle).toHaveTextContent('2026')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2026')
    expect(nextYearButton).toHaveClass('disabled')
    expect(nextMonthButton).toHaveClass('disabled')
  })

  it('should allow for right aligned label', () => {
    const { rerender } = render(
      <DatePicker label="label" labelAlignment="right" />
    )

    const datePicker = getDatePickerRoot()

    expect(datePicker).toHaveClass(
      'dnb-date-picker__input--label-alignment-right'
    )

    rerender(<DatePicker label="label" labelAlignment="left" />)

    expect(datePicker).not.toHaveClass(
      'dnb-date-picker__input--label-alignment-right'
    )
  })

  it('should be able to only show the month in calendar', async () => {
    render(<DatePicker onlyMonth />)

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const calendar = document.querySelector('.dnb-date-picker__calendar')

    expect(
      calendar.querySelector('.dnb-date-picker__header--only-month-label')
    ).toBeInTheDocument()

    expect(
      calendar.querySelector('.dnb-date-picker__labels')
    ).not.toBeInTheDocument()
  })
})

// for the unit calc tests
describe('DatePicker calc', () => {
  // for the unit calc tests
  const testDate = new Date(2000, 0) // use an arbitrary date
  const nOfMonths = 12 * 4 // test methods for this many months
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ]

  describe('toRange', () => {
    const startDate = new Date()
    const endDate = addDays(new Date(), 2)
    it('returns a date range object', () => {
      expect(toRange(startDate, endDate)).toEqual({ startDate, endDate })
    })
    it('automatically swaps start and end date if needed', () => {
      expect(toRange(endDate, startDate)).toEqual({ startDate, endDate })
    })
  })

  describe('dayOffset', () => {
    it('returns the correct offset', () => {
      for (let i = 0; i < daysOfWeek.length - 1; i++) {
        expect(dayOffset(daysOfWeek[i])).toBe(i)
      }
    })
  })

  describe('getWeek', () => {
    it('returns an array of length 7', () => {
      expect(getWeek()).toHaveLength(7)
    })
  })

  describe('getMonth', () => {
    it('returns an array with length of days in a given month', () => {
      for (let i = 0; i < nOfMonths; i++) {
        const date = addMonths(testDate, i)
        expect(getMonth(date)).toHaveLength(getDaysInMonth(date))
      }
    })

    it('skips x days from the start and limits to a set maximum number of days', () => {
      for (let i = 0; i < nOfMonths; i++) {
        const date = addMonths(testDate, i)
        const daysInMonth = getDaysInMonth(date)
        const skip = i % daysInMonth
        const limit = (i % 30) + 1
        expect(getMonth(date, skip)).toHaveLength(daysInMonth - skip)
        expect(getMonth(date, 0, limit)).toHaveLength(limit)
        expect(getMonth(date, skip, limit)).toHaveLength(
          Math.min(limit, daysInMonth - skip)
        )
      }
    })
  })

  describe('makeDayObject', () => {
    const date = new Date('2020-02-20')

    const startDate = new Date('2020-02-01')
    const endDate = new Date('2020-03-31')
    const hoverDate = null
    const minDate = date
    const maxDate = new Date('2020-04-20')
    const month = date

    const result = makeDayObject(date, {
      startDate,
      endDate,
      hoverDate,
      minDate,
      maxDate,
      month,
    })

    it('has given properties', () => {
      expect(result).toStrictEqual({
        date,
        isToday: false,
        isLastMonth: false,
        isNextMonth: false,
        isStartDate: false,
        isEndDate: false,
        isWithinSelection: true,
        isPreview: false,
        isDisabled: false,
        isSelectable: true,
        isInactive: false,
      })
    })
  })

  describe('getCalendar', () => {
    it('always returns an array of length 42', () => {
      for (let i = 0; i < nOfMonths; i++) {
        const date = addMonths(testDate, i)
        const dayOffset = i % 7
        expect(getCalendar(date)).toHaveLength(42)
        expect(getCalendar(date, dayOffset)).toHaveLength(42)
      }
    })
  })

  describe('isDisabledCalc', () => {
    it('should correctly determine `date` is before `minDate`', async () => {
      const date = new Date('2025-02-12')
      const onChange = jest.fn()

      render(
        <DatePicker
          date={date}
          minDate={date}
          onChange={onChange}
          shortcuts={[
            {
              title: 'Correct',
              startDate: new Date('2025-02-12'),
              endDate: new Date('2025-02-28'),
            },
            {
              title: 'Wrong',
              startDate: new Date('2025-02-11'),
              endDate: new Date('2025-02-28'),
            },
          ]}
          range
        />
      )

      await userEvent.click(screen.getByLabelText('Åpne datovelger'))
      await userEvent.click(screen.getByText('Correct'))

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ isValidStartDate: true })
      )

      await userEvent.click(screen.getByText('Wrong'))

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ isValidStartDate: false })
      )
    })

    it('should correctly determine `date` is after `maxDate`', async () => {
      const date = new Date('2025-02-12')
      const onChange = jest.fn()

      render(
        <DatePicker
          date={date}
          maxDate={date}
          onChange={onChange}
          shortcuts={[
            {
              title: 'Correct',
              startDate: new Date('2025-02-01'),
              endDate: new Date('2025-02-12'),
            },
            {
              title: 'Wrong',
              startDate: new Date('2025-02-01'),
              endDate: new Date('2025-02-13'),
            },
          ]}
          range
        />
      )

      await userEvent.click(screen.getByLabelText('Åpne datovelger'))
      await userEvent.click(screen.getByText('Correct'))

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ isValidEndDate: true })
      )

      await userEvent.click(screen.getByText('Wrong'))

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ isValidEndDate: false })
      )
    })
  })
})

describe('DatePicker scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('should match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-date-picker-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

describe('Custom text for buttons', () => {
  it('should show custom text for submit button', () => {
    render(<DatePicker submitButtonText="Yes" showSubmitButton opened />)

    expect(
      document.querySelector('[data-testid="submit"]  .dnb-button__text')
        .textContent
    ).toBe('Yes')
  })

  it('should show custom text for cancel button', () => {
    render(<DatePicker cancelButtonText="No" showCancelButton opened />)

    expect(
      document.querySelector('[data-testid="cancel"]  .dnb-button__text')
        .textContent
    ).toBe('No')
  })

  it('should show custom text for reset button', () => {
    render(<DatePicker resetButtonText="Maybe" showResetButton opened />)

    expect(
      document.querySelector('[data-testid="reset"]  .dnb-button__text')
        .textContent
    ).toBe('Maybe')
  })

  it('should pass tabIndex to submit button and MultiInputMask inputs', () => {
    render(<DatePicker tabIndex={-1} showInput />)

    const button = getDatePickerTriggerButton()
    const [day, month, year] = Array.from(
      document.querySelectorAll('input')
    )

    expect(button).toHaveAttribute('tabindex', '-1')
    expect(day).toHaveAttribute('tabindex', '-1')
    expect(month).toHaveAttribute('tabindex', '-1')
    expect(year).toHaveAttribute('tabindex', '-1')
  })

  it('should support tooltip for button', async () => {
    render(<DatePicker tooltip="Tooltip content" />)

    const button = getDatePickerTriggerButton()

    expect(
      document.querySelector('.dnb-tooltip--active')
    ).not.toBeInTheDocument()

    await userEvent.hover(button)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toBeInTheDocument()
    })
  })

  describe('copy & paste', () => {
    it('should copy the whole date when copied from input field', async () => {
      const { rerender } = render(
        <DatePicker showInput date="2025-04-01" />
      )

      const [day, month, year]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('input.dnb-input__input')
      )

      const setData = jest.fn()
      const clipboardData = { setData }

      day.focus()
      day.select()
      fireEvent.copy(day, {
        clipboardData,
      })
      expect(setData).toHaveBeenLastCalledWith('text/plain', '01.04.2025')

      rerender(<DatePicker showInput date="2025-04-02" />)
      month.focus()
      month.select()
      fireEvent.copy(month, {
        clipboardData,
      })
      expect(setData).toHaveBeenLastCalledWith('text/plain', '02.04.2025')

      rerender(<DatePicker showInput date="2025-04-03" />)
      year.focus()
      year.select()
      fireEvent.copy(year, {
        clipboardData,
      })
      expect(setData).toHaveBeenLastCalledWith('text/plain', '03.04.2025')
    })

    it('should paste the whole date as the value of the input field', async () => {
      render(<DatePicker showInput />)

      const [day, month, year]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('input.dnb-input__input')
      )

      let date = null

      const getData = jest.fn(() => date)
      const clipboardData = { getData }

      date = '01.04.2025'
      day.focus()
      day.select()
      fireEvent.paste(day, { clipboardData })
      expect(getData).toHaveBeenCalledWith('text/plain')
      expect(day).toHaveValue('01')
      expect(month).toHaveValue('04')
      expect(year).toHaveValue('2025')

      date = '02.05.2025'
      month.focus()
      month.select()
      fireEvent.paste(month, { clipboardData })
      expect(getData).toHaveBeenCalledWith('text/plain')
      expect(day).toHaveValue('02')
      expect(month).toHaveValue('05')
      expect(year).toHaveValue('2025')

      date = '03.05.2026'
      year.focus()
      year.select()
      fireEvent.paste(year, { clipboardData })
      expect(getData).toHaveBeenCalledWith('text/plain')
      expect(day).toHaveValue('03')
      expect(month).toHaveValue('05')
      expect(year).toHaveValue('2026')
    })
  })
})

describe('DatePickerPortal', () => {
  it('should attach portal to document body on mount, and detach on unmount', async () => {
    render(<DatePicker />)

    const inputButton = screen.getByLabelText('Åpne datovelger')

    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).not.toBeInTheDocument()

    await userEvent.click(inputButton)

    await waitFor(() =>
      expect(
        document.body.querySelector('.dnb-date-picker__portal')
      ).toBeInTheDocument()
    )

    await userEvent.click(inputButton)

    await waitFor(() =>
      expect(
        document.body.querySelector('.dnb-date-picker__portal')
      ).not.toBeInTheDocument()
    )
  })

  it('should contain calendar views when mounted', async () => {
    render(<DatePicker />)

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    const portal = document.body.querySelector('.dnb-date-picker__portal')

    expect(
      portal.querySelector('.dnb-date-picker__views')
    ).toBeInTheDocument()
    expect(
      portal.querySelector('.dnb-date-picker__calendar')
    ).toBeInTheDocument()
  })

  it('should skip portal when "skipPortal" is true', async () => {
    render(<DatePicker skipPortal />)

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))

    // dnb-date-picker__container is within dnb-date-picker__shell when portal is skipped (wrapped by Popover span)
    expect(
      document.querySelector(
        '.dnb-date-picker__shell .dnb-date-picker__container'
      )
    ).toBeInTheDocument()
    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).not.toBeInTheDocument()
  })

  it('should unmount portal when `onShow` and `onHide` callbacks are setting a state', async () => {
    const onHide = jest.fn()
    const onShow = jest.fn()

    const DatePickerComponent = () => {
      const [, setShow] = React.useState(false)

      return (
        <DatePicker
          date="2025-02-19"
          onShow={() => {
            onShow()
            setShow(true)
          }}
          onHide={() => {
            onHide()
            setShow(false)
          }}
        />
      )
    }

    render(<DatePickerComponent />)

    await userEvent.click(screen.getByLabelText('Åpne datovelger'))
    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledTimes(0)
    expect(
      document.querySelector('.dnb-date-picker__portal')
    ).toBeInTheDocument()

    await userEvent.click(screen.getByLabelText('fredag 14. februar 2025'))
    await waitFor(() =>
      expect(
        document.querySelector('.dnb-date-picker__portal')
      ).not.toBeInTheDocument()
    )
    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledTimes(1)
  })
})

describe('DatePicker ARIA', () => {
  it('should validate', async () => {
    const Comp = render(
      <DatePicker
        range={true}
        opened={true}
        disableAutofocus={true}
        startDate="2019-05-05"
        endDate="2019-06-05"
        skipPortal
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with input', async () => {
    const Comp = render(
      <DatePicker
        range={true}
        opened={true}
        showInput={true}
        disableAutofocus={true}
        startDate="2019-05-05"
        endDate="2019-06-05"
        skipPortal
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should announce selected date', async () => {
    render(<DatePicker date="2025-04-01" />)

    const openButton = document.querySelector(
      '.dnb-button'
    ) as HTMLButtonElement

    await userEvent.click(openButton)
    await userEvent.click(screen.getByLabelText('fredag 25. april 2025'))

    expect(getAnnouncementElement()).toHaveTextContent(
      'Valgt dato: fredag 25. april 2025'
    )
    expect(openButton).toHaveAttribute(
      'aria-label',
      'Valgt dato: fredag 25. april 2025, Åpne datovelger'
    )
  })

  it('should announce selected date based on locale', async () => {
    // en-GB
    const { rerender } = render(
      <Provider locale="en-GB">
        <DatePicker date="2025-04-01" />
      </Provider>
    )

    const openButton = document.querySelector(
      '.dnb-button'
    ) as HTMLButtonElement

    expect(openButton).toHaveAttribute('aria-label', 'Open date picker')

    await userEvent.click(openButton)
    await userEvent.click(screen.getByLabelText('Friday, 25 April 2025'))

    expect(getAnnouncementElement()).toHaveTextContent(
      'Selected date: Friday, 25 April 2025'
    )
    expect(openButton).toHaveAttribute(
      'aria-label',
      'Selected date: Friday, 25 April 2025, Open date picker'
    )

    // en-US
    rerender(
      <Provider locale="en-US">
        <DatePicker date="2025-04-01" />
      </Provider>
    )

    await userEvent.click(openButton)
    await userEvent.click(screen.getByLabelText('Monday, April 14, 2025'))

    expect(getAnnouncementElement()).toHaveTextContent(
      'Selected date: Monday, April 14, 2025'
    )
    expect(openButton).toHaveAttribute(
      'aria-label',
      'Selected date: Monday, April 14, 2025, Open date picker'
    )

    // sv-SE
    rerender(
      <Provider locale="sv-SE" translations={svSE}>
        <DatePicker date="2025-04-01" />
      </Provider>
    )

    await userEvent.click(openButton)
    await userEvent.click(screen.getByLabelText('tisdag 22 april 2025'))

    expect(getAnnouncementElement()).toHaveTextContent(
      'Valt datum: tisdag 22 april 2025'
    )
    expect(openButton).toHaveAttribute(
      'aria-label',
      'Valt datum: tisdag 22 april 2025, Öppna datumväljaren'
    )

    // da-DK
    rerender(
      <Provider locale="da-DK" translations={daDK}>
        <DatePicker date="2025-04-01" />
      </Provider>
    )

    await userEvent.click(openButton)
    await userEvent.click(
      screen.getByLabelText('fredag den 4. april 2025')
    )

    expect(getAnnouncementElement()).toHaveTextContent(
      'Valgt dato: fredag den 4. april 2025'
    )
    expect(openButton).toHaveAttribute(
      'aria-label',
      'Valgt dato: fredag den 4. april 2025, Åbn datovælger'
    )
  })

  it('should announce selected date range', async () => {
    render(
      <DatePicker
        startDate="2025-04-01"
        endDate="2025-05-31"
        range
        preventClose
      />
    )

    const openButton = getDatePickerTriggerButton()

    await userEvent.click(openButton)
    await userEvent.click(screen.getByLabelText(/onsdag 2\.? april 2025/i))
    await userEvent.click(
      screen.getByLabelText(/lørdag 19\.? april 2025/i)
    )

    expect(getAnnouncementElement()).toHaveTextContent(
      'Valgte datoer: onsdag 2.–lørdag 19. april 2025'
    )
    expect(openButton).toHaveAttribute(
      'aria-label',
      'Valgte datoer: onsdag 2.–lørdag 19. april 2025, Åpne datovelger'
    )
  })

  it('should announce selected date range based on locale', async () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <DatePicker
          startDate="2025-04-01"
          endDate="2025-05-31"
          range
          preventClose
        />
      </Provider>
    )

    const getOpenButton = () => getDatePickerTriggerButton()

    expect(getOpenButton()).toHaveAttribute(
      'aria-label',
      'Open date picker'
    )

    await userEvent.click(getOpenButton())
    await userEvent.click(screen.getByLabelText('Wednesday, 2 April 2025'))
    await userEvent.click(screen.getByLabelText('Saturday, 19 April 2025'))

    expect(getAnnouncementElement()).toHaveTextContent(
      'Selected dates: Wednesday 2 April – Saturday 19 April 2025'
    )
    expect(getOpenButton()).toHaveAttribute(
      'aria-label',
      'Selected dates: Wednesday 2 April – Saturday 19 April 2025, Open date picker'
    )

    rerender(
      <Provider locale="en-US">
        <DatePicker
          startDate="2025-04-01"
          endDate="2025-05-31"
          range
          preventClose
        />
      </Provider>
    )

    await userEvent.click(getOpenButton())
    await userEvent.click(
      screen.getByLabelText('Wednesday, April 2, 2025')
    )
    await userEvent.click(
      screen.getByLabelText('Saturday, April 19, 2025')
    )

    expect(getAnnouncementElement()).toHaveTextContent(
      'Selected dates: Wednesday, April 2 – Saturday, April 19, 2025'
    )
    expect(getOpenButton()).toHaveAttribute(
      'aria-label',
      'Selected dates: Wednesday, April 2 – Saturday, April 19, 2025, Open date picker'
    )

    rerender(
      <Provider locale="sv-SE" translations={svSE}>
        <DatePicker
          startDate="2025-04-01"
          endDate="2025-05-31"
          range
          preventClose
        />
      </Provider>
    )

    await userEvent.click(getOpenButton())
    // console.log('sv-SE labels', Array.from(document.querySelectorAll('[aria-label$="2025"]')).map((btn) => btn.getAttribute('aria-label')))
    await userEvent.click(screen.getByLabelText(/onsdag 2\.? april 2025/i))
    await userEvent.click(
      screen.getByLabelText(/lördag 19\.? april 2025/i)
    )

    expect(getAnnouncementElement()).toHaveTextContent(
      'Valda datum: onsdag 02 april–lördag 19 april 2025'
    )
    expect(getOpenButton()).toHaveAttribute(
      'aria-label',
      'Valda datum: onsdag 02 april–lördag 19 april 2025, Öppna datumväljaren'
    )

    rerender(
      <Provider locale="da-DK" translations={daDK}>
        <DatePicker
          startDate="2025-04-01"
          endDate="2025-05-31"
          range
          preventClose
        />
      </Provider>
    )

    await userEvent.click(getOpenButton())
    await userEvent.click(
      screen.getByLabelText('fredag den 4. april 2025')
    )
    await userEvent.click(
      screen.getByLabelText('lørdag den 19. april 2025')
    )

    expect(getAnnouncementElement()).toHaveTextContent(
      'Valgte datoer: fredag 4.–lørdag 19. april 2025'
    )
    expect(getOpenButton()).toHaveAttribute(
      'aria-label',
      'Valgte datoer: fredag 4.–lørdag 19. april 2025, Åbn datovælger'
    )
  })

  describe('inline', () => {
    it('renders calendar inline without button or input when inline is true', () => {
      render(<DatePicker inline />)

      // Should not render input or button
      expect(
        document.querySelector('button.dnb-input__submit-button__button')
      ).not.toBeInTheDocument()
      expect(document.querySelector('input')).not.toBeInTheDocument()

      // Should render calendar directly
      const calendar = document.querySelector(
        '.dnb-date-picker__container'
      )
      expect(calendar).toBeInTheDocument()
      expect(calendar).toHaveClass('dnb-date-picker__container--opened')

      // Should have inline class
      expect(getDatePickerRoot()).toHaveClass('dnb-date-picker--inline')
    })

    it('calendar is always visible when inline is true', () => {
      render(<DatePicker inline />)

      const calendar = document.querySelector(
        '.dnb-date-picker__container'
      )
      expect(calendar).toBeInTheDocument()
      expect(calendar).not.toHaveClass(
        'dnb-date-picker__container--hidden'
      )
      expect(calendar).toHaveClass('dnb-date-picker__container--opened')
    })

    it('does not render Popover when inline is true', () => {
      render(<DatePicker inline />)

      // Popover should not be rendered
      expect(
        document.querySelector('.dnb-popover')
      ).not.toBeInTheDocument()

      // Calendar should be directly in the DOM
      const calendar = document.querySelector(
        '.dnb-date-picker__container'
      )
      expect(calendar).toBeInTheDocument()
      expect(calendar?.parentElement).not.toHaveClass('dnb-popover')
    })

    it('works with range prop when inline is true', () => {
      render(<DatePicker inline range />)

      const calendar = document.querySelector(
        '.dnb-date-picker__container'
      )
      expect(calendar).toBeInTheDocument()

      // Should render range calendar
      const calendars = document.querySelectorAll(
        '.dnb-date-picker__calendar'
      )
      expect(calendars.length).toBeGreaterThan(0)
    })

    it('does not show buttons by default in range mode when inline is true', () => {
      render(<DatePicker inline range />)

      // Buttons should not be shown by default
      expect(
        document.querySelector('[data-testid="submit"]')
      ).not.toBeInTheDocument()
      expect(
        document.querySelector('[data-testid="cancel"]')
      ).not.toBeInTheDocument()
      expect(
        document.querySelector('[data-testid="reset"]')
      ).not.toBeInTheDocument()
    })

    it('shows buttons when explicitly requested in inline range mode', () => {
      render(
        <DatePicker
          inline
          range
          showSubmitButton
          showCancelButton
          showResetButton
        />
      )

      // Buttons should be shown when explicitly requested
      expect(
        document.querySelector('[data-testid="submit"]')
      ).toBeInTheDocument()
      expect(
        document.querySelector('[data-testid="cancel"]')
      ).toBeInTheDocument()
      expect(
        document.querySelector('[data-testid="reset"]')
      ).toBeInTheDocument()
    })

    it('toggles popover open/close when submit button is clicked', async () => {
      const onSubmit = jest.fn()
      render(<DatePicker showSubmitButton onSubmit={onSubmit} opened />)

      // Popover should be open initially
      expect(
        document.querySelector('.dnb-date-picker__container--opened')
      ).toBeInTheDocument()

      const submitButton = document.querySelector(
        '[data-testid="submit"]'
      ) as HTMLButtonElement
      expect(submitButton).toBeInTheDocument()

      // First click: should close the popover and call onSubmit
      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-date-picker__container--opened')
        ).not.toBeInTheDocument()
      })
      expect(onSubmit).toHaveBeenCalledTimes(1)

      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('opens popover when submit button is clicked and popover is closed', async () => {
      const onSubmit = jest.fn()
      render(<DatePicker showSubmitButton onSubmit={onSubmit} />)

      // Initially popover should be closed
      expect(
        document.querySelector('.dnb-date-picker__container--opened')
      ).not.toBeInTheDocument()

      // Open popover by clicking the input button first
      const inputButton = document.querySelector(
        'button.dnb-input__submit-button__button, button.dnb-button'
      ) as HTMLButtonElement
      expect(inputButton).toBeInTheDocument()

      fireEvent.click(inputButton)
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-date-picker__container--opened')
        ).toBeInTheDocument()
      })

      // Now click the submit button in the footer - should close and call onSubmit
      const submitButton = document.querySelector(
        '[data-testid="submit"]'
      ) as HTMLButtonElement
      expect(submitButton).toBeInTheDocument()

      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-date-picker__container--opened')
        ).not.toBeInTheDocument()
      })
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
