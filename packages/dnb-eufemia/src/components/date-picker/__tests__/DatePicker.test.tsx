/**
 * DatePicker Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import userEvent from '@testing-library/user-event'
import DatePicker, { DatePickerProps } from '../DatePicker'

jest.setTimeout(30e3)

import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import isWeekend from 'date-fns/isWeekend'
import enLocale from 'date-fns/locale/en-GB'
import {
  toRange,
  dayOffset,
  getWeek,
  getMonth,
  getCalendar,
  makeDayObject,
} from '../DatePickerCalc'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from '../../../shared'

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('DatePicker component', () => {
  it('renders with props as an object', () => {
    const props: DatePickerProps = {}

    render(<DatePicker {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  // for the integration tests
  const defaultProps: DatePickerProps = {
    no_animation: true,
    range: true,
    show_input: true,
    date: '1970-01-01T00:00:00.000Z',
    start_date: '2019-01-01T00:00:00.000Z',
    end_date: '2019-02-15T00:00:00.000Z',
  }

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<DatePicker show_input />)
    rerender(<DatePicker show_input disabled={true} />)
    expect(document.querySelectorAll('input')[0]).toHaveAttribute(
      'disabled'
    )
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

    expect(
      document
        .querySelector('.dnb-date-picker')

        .getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    expect(
      document.querySelector('.dnb-date-picker').classList
    ).not.toContain('dnb-date-picker--closed')
  })

  it('will close the picker after selection', () => {
    const on_change = jest.fn()
    const { rerender } = render(
      <DatePicker {...defaultProps} on_change={on_change} />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).toContain('dnb-date-picker--opened')

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

    expect(on_change).not.toHaveBeenCalled()

    fireEvent.click(startButton)
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].start_date).toBe('2019-01-10')
    expect(on_change.mock.calls[0][0].end_date).toBe(null)

    fireEvent.click(endButton)
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].start_date).toBe('2019-01-10')
    expect(on_change.mock.calls[1][0].end_date).toBe('2019-02-15')

    expect(
      document.querySelector('.dnb-date-picker').classList
    ).not.toContain('dnb-date-picker--closed')

    rerender(
      <DatePicker {...defaultProps} on_change={on_change} range={false} />
    )

    expect(on_change).toHaveBeenCalledTimes(2)

    const singleTd = document.querySelectorAll(
      'td.dnb-date-picker__day'
    )[11]
    const singleButton = singleTd.querySelector('button')
    const singleLabel = singleButton.getAttribute('aria-label')

    expect(singleLabel).toBe('fredag 11. januar 2019')

    fireEvent.click(singleButton)

    expect(on_change).toHaveBeenCalledTimes(3)
    expect(on_change.mock.calls[2][0].date).toBe('2019-01-11')
    expect(on_change.mock.calls[2][0].start_date).toBe(undefined)
    expect(on_change.mock.calls[2][0].end_date).toBe(undefined)

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).not.toContain('dnb-date-picker--opened')
  })

  it('will close the picker on reset', () => {
    const on_reset = jest.fn()

    render(
      <DatePicker
        date="1981-01-15"
        show_reset_button
        show_input
        on_reset={on_reset}
      />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    const resetButton = document.querySelector(
      'button[data-testid="reset"]'
    )

    fireEvent.click(resetButton)

    expect(on_reset).toHaveBeenCalledTimes(1)
    expect(on_reset.mock.calls[0][0].date).toBe(null)

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).not.toContain('dnb-date-picker--opened')
  })

  it('will render the result of "on_days_render"', () => {
    const customClassName = 'dnb-date-picker__day--weekend'
    const on_days_render = jest.fn((days) => {
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
        on_days_render={on_days_render}
        range={false}
        end_date={null}
      />
    )

    fireEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    expect(on_days_render).toHaveBeenCalledTimes(1)
    expect(on_days_render.mock.calls[0][0].length).toBe(42)
    expect((on_days_render.mock as any).calls[0][1]).toBe(0)

    const singleTd = document.querySelectorAll(
      'td.dnb-date-picker__day'
    )[12]
    const singleButton = singleTd.querySelector('button')
    const singleLabel = singleButton.getAttribute('aria-label')

    expect(singleLabel).toBe('lørdag 12. januar 2019')
    expect(singleButton).toHaveAttribute('disabled')
    expect(singleTd.classList).toContain(customClassName)
  })

  it('has to work with shortcuts', () => {
    const on_change = jest.fn()
    render(
      <DatePicker
        no_animation
        on_change={on_change}
        shortcuts={[
          { title: 'Set date', date: '2020-05-23' },
          { title: 'Set date', close_on_select: true, date: '2020-04-23' },
        ]}
      />
    )

    fireEvent.click(document.querySelector('button.dnb-button'))

    fireEvent.click(
      document
        .querySelector('div.dnb-date-picker__addon')
        .querySelectorAll('.dnb-button--secondary')[0]
    )

    expect(
      document.querySelector('label.dnb-date-picker__header__title')
        .textContent
    ).toBe('mai 2020')
    expect(
      document.querySelector('.dnb-date-picker--opened')
    ).toBeInTheDocument()
    expect(on_change).toBeCalledTimes(1)

    // Now, test "close_on_select"
    fireEvent.click(
      document
        .querySelector('div.dnb-date-picker__addon')
        .querySelectorAll('.dnb-button--secondary')[1]
    )

    expect(
      document.querySelector('label.dnb-date-picker__header__title')
        .textContent
    ).toBe('april 2020')
    expect(
      document.querySelector('.dnb-date-picker--opened')
    ).not.toBeInTheDocument()
    expect(on_change).toBeCalledTimes(2)
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
        on_change={({ start_date }) => {
          changedStartDate = start_date
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
        on_change={({ start_date }) => {
          changedStartDate = start_date
        }}
        start_date="2019-01-03"
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
        on_change={({ start_date }) => {
          changedStartDate = start_date
        }}
        start_date={defaultProps.start_date}
      />
    )
  })

  it('will set highlight class on fields with a number value', async () => {
    render(<DatePicker show_input />)

    const [day, month, year] = Array.from(
      document.querySelectorAll('input')
    )

    const test = async (elem: HTMLInputElement) => {
      expect(elem.classList).not.toContain(
        'dnb-date-picker__input--highlight'
      )

      await userEvent.type(elem, '1')

      expect(elem.classList).toContain('dnb-date-picker__input--highlight')

      await userEvent.type(elem, '{Backspace>4}') // use 4 because of year

      expect(elem.classList).not.toContain(
        'dnb-date-picker__input--highlight'
      )
    }

    await test(day)
    await test(month)
    await test(year)
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

  it('footer buttons work properly', () => {
    const on_submit = jest.fn()
    const on_cancel = jest.fn()
    const on_reset = jest.fn()

    const date = '2020-10-20'

    render(
      <DatePicker
        date={date}
        opened
        no_animation
        show_reset_button
        show_cancel_button
        show_submit_button
        on_submit={on_submit}
        on_cancel={on_cancel}
        on_reset={on_reset}
      />
    )

    const resetElem = document.querySelector('button[data-testid="reset"]')
    expect(resetElem).toBeInTheDocument()
    expect(resetElem.textContent).toMatch('Tilbakestill')

    const cancelElem = document.querySelector(
      'button[data-testid="cancel"]'
    )
    expect(cancelElem).toBeInTheDocument()
    expect(cancelElem.textContent).toMatch('Avbryt')

    const submitElem = document.querySelector(
      'button[data-testid="submit"]'
    )
    expect(submitElem).toBeInTheDocument()
    expect(submitElem.textContent).toMatch('Ok')

    expect(
      (
        document.querySelector(
          'input.dnb-date-picker__input--year'
        ) as HTMLInputElement
      ).value
    ).toBe('2020')

    fireEvent.click(resetElem)

    expect(on_reset).toHaveBeenCalled()
    expect(on_reset.mock.calls[0][0].date).toBe(null)

    expect(
      (
        document.querySelector(
          'input.dnb-date-picker__input--year'
        ) as HTMLInputElement
      ).value
    ).toBe('åååå')

    fireEvent.click(cancelElem)

    expect(
      (
        document.querySelector(
          'input.dnb-date-picker__input--year'
        ) as HTMLInputElement
      ).value
    ).toBe('2020')

    expect(on_cancel).toHaveBeenCalled()
    expect(on_cancel.mock.calls[0][0].date).toBe(date)

    fireEvent.click(
      document
        .querySelector('span.dnb-input__submit-element')
        .querySelector('button.dnb-button')
    )
    fireEvent.click(submitElem)

    expect(
      (
        document.querySelector(
          'input.dnb-date-picker__input--year'
        ) as HTMLInputElement
      ).value
    ).toBe('2020')

    expect(on_submit).toHaveBeenCalled()
    expect(on_submit.mock.calls[0][0].date).toBe(date)
  })

  it('footers reset button text is set by prop reset_button_text', () => {
    const reset_button_text = 'custom reset button text'

    render(
      <DatePicker
        opened
        no_animation
        show_reset_button
        reset_button_text={reset_button_text}
      />
    )

    const resetElem = document.querySelector('button[data-testid="reset"]')
    expect(resetElem).toBeInTheDocument()
    expect(resetElem.textContent).toMatch(reset_button_text)
  })

  it('footer is rendered when show_reset_button is provided', () => {
    render(<DatePicker opened no_animation show_reset_button />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is rendered when show_cancel_button is provided', () => {
    render(<DatePicker opened no_animation show_cancel_button />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is rendered when show_submit_button is provided', () => {
    render(<DatePicker opened no_animation show_submit_button />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is rendered when range is provided', () => {
    render(<DatePicker opened no_animation range />)

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).toBeInTheDocument()
  })

  it('footer is not rendered', () => {
    render(
      <DatePicker
        opened
        no_animation
        show_reset_button={false}
        show_cancel_button={false}
        show_submit_button={false}
        range={false}
      />
    )

    const datePickerFooter = document.querySelector(
      '.dnb-date-picker__footer'
    )
    expect(datePickerFooter).not.toBeInTheDocument()
  })

  it('has a working month correction', () => {
    render(<DatePicker show_input />)

    const dayElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0]
    const monthElem = document.querySelectorAll(
      'input.dnb-date-picker__input--month'
    )[0]
    const yearElem = document.querySelectorAll(
      'input.dnb-date-picker__input--year'
    )[0]

    // change the date
    const day = '01'
    const month = '01' // will have to make a correction internally
    const year = '2020'

    fireEvent.change(dayElem, {
      target: { value: day },
    })
    fireEvent.change(monthElem, {
      target: { value: month },
    })
    fireEvent.change(yearElem, {
      target: { value: year },
    })

    // then check the new input value
    expect((dayElem as HTMLInputElement).value).toBe(day)
    expect((monthElem as HTMLInputElement).value).toBe(month)
    expect((yearElem as HTMLInputElement).value).toBe(year)
  })

  it('has to auto-correct invalid min/max dates', () => {
    const on_change = jest.fn()

    render(
      <DatePicker
        {...defaultProps}
        on_change={on_change}
        correct_invalid_date={true}
        min_date="2019-01-02"
        max_date="2019-03-01"
      />
    )
    const elem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0]

    // by default we have the corrected start day
    expect((elem as HTMLInputElement).value).toBe('02')

    // change the date to something invalid
    fireEvent.change(elem, {
      target: { value: '01' },
    })

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].is_valid_start_date).toBe(false)

    // change the date to a valid date
    fireEvent.change(elem, {
      target: { value: '03' },
    })

    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].is_valid_start_date).toBe(true)
  })

  it('has a working min and max date limitation', () => {
    const on_type = jest.fn()
    const on_change = jest.fn()

    const { rerender } = render(
      <DatePicker
        {...defaultProps}
        min_date="2019-01-02"
        max_date="2019-02-04"
        start_date="2019-01-02T00:00:00.000Z"
        on_change={on_change}
        on_type={on_type}
      />
    )
    const startElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0]
    const endElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[1]

    // by default we have the start day
    expect((startElem as HTMLInputElement).value).toBe('02')

    // change to invalid date
    fireEvent.change(startElem, {
      target: { value: '01' },
    })

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].is_valid_start_date).toBe(false)
    expect(on_type.mock.calls[0][0].is_valid_start_date).toBe(false)

    // change the date to a valid date
    fireEvent.change(startElem, {
      target: { value: '03' },
    })

    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].is_valid_start_date).toBe(true)
    expect(on_type.mock.calls[1][0].is_valid_start_date).toBe(true)

    // change the date to a valid date
    fireEvent.change(endElem, {
      target: { value: '05' },
    })

    expect(on_change.mock.calls[2][0].start_date).toBe('2019-01-03')
    expect(on_change.mock.calls[2][0].end_date).toBe('2019-02-05')
    expect(on_change.mock.calls[2][0].is_valid_start_date).toBe(true)
    expect(on_change.mock.calls[2][0].is_valid_end_date).toBe(false)

    expect(on_type.mock.calls[2][0].start_date).toBe('2019-01-03')
    expect(on_type.mock.calls[2][0].end_date).toBe('2019-02-05')
    expect(on_type.mock.calls[2][0].is_valid_start_date).toBe(true)
    expect(on_type.mock.calls[2][0].is_valid_end_date).toBe(false)

    fireEvent.click(document.querySelector('button'))

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

    expect(on_change.mock.calls[2][0].date).toBe(undefined)
    expect(on_change.mock.calls[2][0].is_valid).toBe(undefined)

    rerender(
      <DatePicker
        {...defaultProps}
        min_date="2019-01-02"
        max_date="2019-02-04"
        start_date="2019-01-02T00:00:00.000Z"
        on_change={on_change}
        on_type={on_type}
        range={false}
      />
    )

    // change the date to a valid date
    fireEvent.change(startElem, {
      target: { value: '01' },
    })

    expect(on_change.mock.calls[3][0].is_valid_start_date).toBe(undefined)
    expect(on_change.mock.calls[3][0].is_valid_end_date).toBe(undefined)
    expect(on_change.mock.calls[3][0].is_valid).toBe(false)

    fireEvent.change(startElem, {
      target: { value: '03' },
    })

    expect(on_change.mock.calls[4][0].date).toBe('2019-01-03')
    expect(on_change.mock.calls[4][0].is_valid).toBe(true)
  })

  it('has valid on_type and on_change event calls', () => {
    const on_type = jest.fn()
    const on_change = jest.fn()

    render(
      <DatePicker
        id="date-picker-id"
        no_animation={true}
        range={true}
        show_input={true}
        on_type={on_type}
        on_change={on_change}
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
      expect(dayElem.value).toBe('dd')
      expect(on_type).toHaveBeenCalledTimes(typeIndex)

      // change the day
      fireEvent.change(dayElem, {
        target: { value: '03' },
      })
      expect(dayElem.value).toBe('03')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 1)
      expect(on_type.mock.calls[typeIndex][0][`${type}_date`]).toBe(
        'yyyy-mm-03'
      )

      typeIndex++

      // change the month
      fireEvent.change(monthElem, {
        target: { value: '01' },
      })
      expect(monthElem.value).toBe('01')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 1)
      expect(
        on_type.mock.calls[typeIndex][0][`is_valid_${type}_date`]
      ).toBe(false)
      expect(on_type.mock.calls[typeIndex][0][`${type}_date`]).toBe(
        'yyyy-01-03'
      )
      expect(on_change).toHaveBeenCalledTimes(changeIndex)

      // change the year halfway
      fireEvent.change(yearElem, {
        target: { value: '202' },
      })
      expect(yearElem.value).toBe('202å')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 2)
      expect(on_change).toHaveBeenCalledTimes(changeIndex)

      // change the year
      fireEvent.change(yearElem, {
        target: { value: '2020' },
      })
      expect(yearElem.value).toBe('2020')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 3)
      expect(on_change).toHaveBeenCalledTimes(changeIndex + 1)
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
      <DatePicker
        id="date-picker-id"
        no_animation
        range
        opened
        show_input
      />
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

    // 6. We should have all TDs in between, marked as "pewview"
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
    const on_change = jest.fn(({ date }) => (outerState = date))
    const { rerender } = render(
      <DatePicker on_change={on_change} show_input date="2019-02-01" />
    )

    function changeState() {
      const elem = document.querySelectorAll('input.dnb-input__input')[0]
      expect((elem as HTMLInputElement).value).toBe('01')

      // 1. change the date with event
      fireEvent.change(elem, {
        target: { value: '16' },
      })
      // Siulate prop update, like a state update would do
      rerender(
        <DatePicker on_change={on_change} show_input date={outerState} />
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
        <DatePicker on_change={on_change} show_input date="2019-02-01" />
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
    expect(on_change).toBeCalledTimes(1)

    changeState()
    expect(on_change).toBeCalledTimes(2)
  })

  it('will reset on setting value to null', () => {
    const { rerender } = render(
      <DatePicker
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )

    rerender(
      <DatePicker
        show_input
        range
        start_date={null}
        end_date={defaultProps.end_date}
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
      <DatePicker show_input range start_date={null} end_date={null} />
    )
    expect(
      (
        document.querySelectorAll(
          'input.dnb-input__input'
        )[5] as HTMLInputElement
      ).value
    ).toBe('åååå')
  })

  it('has a reacting end date input with valid value', () => {
    const { rerender } = render(
      <DatePicker
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )
    const elem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[1]

    // by default we have the start day
    expect((elem as HTMLInputElement).value).toBe('15')

    // listen to changes
    let changedStartDate = null
    rerender(
      <DatePicker
        show_input
        range
        start_date={null}
        end_date={defaultProps.end_date}
        on_change={({ end_date }) => {
          changedStartDate = end_date
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
    expect((elem as HTMLInputElement).value).toBe(value)

    // and the event fired value
    expect(changedStartDate).toBe(`2019-02-${value}`)

    // test prop change to make sure getDerivedStateFromProps works
    rerender(
      <DatePicker
        show_input
        range
        start_date={null}
        end_date="2019-02-17"
        on_change={({ end_date }) => {
          changedStartDate = end_date
        }}
      />
    )
    expect((elem as HTMLInputElement).value).toBe('17')

    // reset the value
    fireEvent.change(elem, {
      target: { value: '15' },
    })

    rerender(
      <DatePicker
        show_input
        range
        start_date={defaultProps.start_date}
        end_date="2019-02-17"
        on_change={({ end_date }) => {
          changedStartDate = end_date
        }}
      />
    )
  })

  it('has to return all additional attributes the event return', () => {
    const my_event = jest.fn()
    const params = { 'data-attr': 'value' }
    render(<DatePicker on_show={my_event} {...params} />)
    fireEvent.click(document.querySelector('button'))
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('is displaying correct month', () => {
    render(
      <DatePicker
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )

    fireEvent.click(document.querySelector('button'))

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

  it('has to have a aria-describedby on first focus', () => {
    const label = 'Input Label'
    render(
      <DatePicker
        id="custom-id"
        label={label}
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )

    const legendElem = document.querySelector('fieldset > legend')
    expect(legendElem.textContent).toBe(label)
    expect(legendElem.classList).toContain('dnb-sr-only')
  })

  it('has to select all only on first focus', () => {
    render(
      <DatePicker
        id="custom-id"
        label="Input Label"
        range
        start_date={defaultProps.start_date}
      />
    )

    const inputElement = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement

    fireEvent.focus(inputElement)

    expect(inputElement.selectionStart).toBe(0)
    expect(inputElement.selectionEnd).toBe(2)

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
    expect(inputElement.selectionEnd).toBe(2)
  })

  it('has to focus on date picker on opening', () => {
    render(
      <DatePicker
        id="custom-id"
        label="Input Label"
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )

    const element = document.querySelector('.dnb-date-picker')
    const buttonElement = document.querySelector(
      'button.dnb-input__submit-button__button'
    )

    expect(document.activeElement).toBe(document.body)

    fireEvent.click(buttonElement)

    expect(element.classList).toContain('dnb-date-picker--opened')

    const tableElement = document.querySelector('table')

    expect(document.activeElement).toBe(tableElement)
  })

  it('should not set focus when disable_autofocus is set', () => {
    render(
      <DatePicker
        id="custom-id"
        label="Input Label"
        show_input
        disable_autofocus
        start_date={defaultProps.start_date}
      />
    )

    const element = document.querySelector('.dnb-date-picker')
    const buttonElement = document.querySelector(
      'button.dnb-input__submit-button__button'
    )

    expect(document.activeElement).toBe(document.body)

    fireEvent.click(buttonElement)

    expect(document.activeElement).toBe(document.body)
    expect(element.classList).toContain('dnb-date-picker--opened')
  })

  it('renders correct placeholder when setting locale', () => {
    const props: DatePickerProps = {}

    render(<DatePicker {...props} show_input={true} locale={enLocale} />)

    const dayElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0] as HTMLInputElement
    const monthElem = document.querySelectorAll(
      'input.dnb-date-picker__input--month'
    )[0] as HTMLInputElement
    const yearElem = document.querySelectorAll(
      'input.dnb-date-picker__input--year'
    )[0] as HTMLInputElement

    const seperator1 = document.querySelectorAll(
      '.dnb-date-picker--separator'
    )[0]
    const seperator2 = document.querySelectorAll(
      '.dnb-date-picker--separator'
    )[0]

    expect(dayElem.value).toBe('dd')
    expect(monthElem.value).toBe('mm')
    expect(yearElem.value).toBe('yyyy')
    expect(seperator1.textContent).toBe('/')
    expect(seperator2.textContent).toBe('/')
  })

  it('has to react on keydown events', async () => {
    render(
      <DatePicker
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
        id="unique-id"
      />
    )

    const dayElem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0] as HTMLInputElement
    const monthElem = document.querySelectorAll(
      'input.dnb-date-picker__input--month'
    )[0]
    const yearElem = document.querySelectorAll(
      'input.dnb-date-picker__input--year'
    )[0]

    // set the cursor to the end of the input
    dayElem.setSelectionRange(2, 2)

    // and simulate a right keydown
    fireEvent.keyDown(dayElem, { key: 'Right', keyCode: 39 })

    // wait for the logic to complete
    await wait(1)

    // and check the class of that element
    expect(document.activeElement.classList).toContain(
      'dnb-date-picker__input--month'
    )

    // also test the key up to change the value on the month input
    expect((monthElem as HTMLInputElement).value).toBe('01')
    fireEvent.keyDown(monthElem, { key: 'Up', keyCode: 38 })

    expect((monthElem as HTMLInputElement).value).toBe('02')

    // and simulate a left keydown
    fireEvent.keyDown(monthElem, { key: 'Left', keyCode: 37 })

    // wait for the logic to complete
    await wait(1)

    // and check the class of that element
    expect(document.activeElement.classList).toContain(
      'dnb-date-picker__input--day'
    )

    // also test the key up to change the value on the day input
    expect((dayElem as HTMLInputElement).value).toBe('01')
    fireEvent.keyDown(dayElem, { key: 'Up', keyCode: 38 })

    expect((dayElem as HTMLInputElement).value).toBe('02')

    // also test the key up to change the value on the year input
    expect((yearElem as HTMLInputElement).value).toBe('2019')
    fireEvent.keyDown(yearElem, { key: 'Up', keyCode: 38 })
    expect((yearElem as HTMLInputElement).value).toBe('2020')
    fireEvent.keyDown(yearElem, { key: 'Down', keyCode: 40 })

    expect((yearElem as HTMLInputElement).value).toBe('2019')
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
  })

  it('should display the correct date in calendar when date prop changes', async () => {
    const { rerender } = render(
      <DatePicker date="2023-01-01" show_input />
    )

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

    rerender(<DatePicker date="2024-05-17" show_input />)

    await userEvent.click(inputButton)

    const [secondTitle, secondDateButton] = getDateElements()

    expect(secondTitle.title).toBe('Valgt måned mai 2024')
    expect(secondTitle).toHaveTextContent('mai 2024')

    expect(secondDateButton.getAttribute('aria-label')).toBe(
      'fredag 17. mai 2024'
    )
    expect(secondDateButton.children[2]).toHaveTextContent('17')

    rerender(<DatePicker date="2035-12-24" show_input />)

    await userEvent.click(inputButton)

    const [thirdTitle, thirdDateButton] = getDateElements()

    expect(thirdTitle.title).toBe('Valgt måned desember 2035')
    expect(thirdTitle).toHaveTextContent('desember 2035')

    expect(thirdDateButton.getAttribute('aria-label')).toBe(
      'mandag 24. desember 2035'
    )
    expect(thirdDateButton.children[2]).toHaveTextContent('24')
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

  it('should support spacing props', () => {
    render(<DatePicker top="2rem" show_input />)

    const element = document.querySelector('.dnb-date-picker')

    expect(Array.from(element.classList)).toEqual([
      'dnb-date-picker',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-date-picker--hidden',
      'dnb-date-picker--show-input',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <DatePicker label="Label" show_input />
      </Provider>
    )

    const element = document.querySelector('.dnb-date-picker')
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
})

describe('DatePicker scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-date-picker-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

describe('Custom text for buttons', () => {
  it('should show custom text for submit button', () => {
    render(
      <DatePicker submit_button_text="Yes" show_submit_button opened />
    )

    expect(
      document.querySelector('[data-testid="submit"]  .dnb-button__text')
        .textContent
    ).toBe('Yes')
  })

  it('should show custom text for cancel button', () => {
    render(
      <DatePicker cancel_button_text="No" show_cancel_button opened />
    )

    expect(
      document.querySelector('[data-testid="cancel"]  .dnb-button__text')
        .textContent
    ).toBe('No')
  })

  it('should show custom text for reset button', () => {
    render(
      <DatePicker reset_button_text="Maybe" show_reset_button opened />
    )

    expect(
      document.querySelector('[data-testid="reset"]  .dnb-button__text')
        .textContent
    ).toBe('Maybe')
  })
})

describe('DatePicker ARIA', () => {
  it('should validate', async () => {
    const Comp = render(
      <DatePicker
        range={true}
        opened={true}
        disable_autofocus={true}
        start_date="2019-05-05"
        end_date="2019-06-05"
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with input', async () => {
    const Comp = render(
      <DatePicker
        range={true}
        opened={true}
        show_input={true}
        disable_autofocus={true}
        start_date="2019-05-05"
        end_date="2019-06-05"
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
