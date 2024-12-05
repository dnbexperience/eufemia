/**
 * DatePicker Test
 *
 */

import React, { useState } from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import userEvent from '@testing-library/user-event'
import DatePicker, { DatePickerAllProps } from '../DatePicker'

jest.setTimeout(30e3)

import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import isWeekend from 'date-fns/isWeekend'

import {
  toRange,
  dayOffset,
  getWeek,
  getMonth,
  getCalendar,
  makeDayObject,
} from '../DatePickerCalc'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Provider } from '../../../shared'

describe('DatePicker component', () => {
  it('renders with props as an object', () => {
    const props: DatePickerAllProps = {}

    render(<DatePicker {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  // for the integration tests
  const defaultProps: DatePickerAllProps = {
    noAnimation: true,
    range: true,
    showInput: true,
    date: '1970-01-01T00:00:00.000Z',
    startDate: '2019-01-01T00:00:00.000Z',
    endDate: '2019-02-15T00:00:00.000Z',
  }

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<DatePicker showInput />)
    rerender(<DatePicker showInput disabled={true} />)
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

    expect(
      document
        .querySelector('.dnb-date-picker')

        .getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    await userEvent.click(document.body)

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')
        .getAttribute('aria-expanded')
    ).toBe('false')

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).not.toContain('dnb-date-picker--opened')
  })

  it('will close the picker after selection', () => {
    const onChange = jest.fn()
    const { rerender } = render(
      <DatePicker {...defaultProps} onChange={onChange} />
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

    expect(onChange).not.toHaveBeenCalled()

    fireEvent.click(startButton)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].start_date).toBe('2019-01-10')
    expect(onChange.mock.calls[0][0].end_date).toBe(null)

    fireEvent.click(endButton)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0].start_date).toBe('2019-01-10')
    expect(onChange.mock.calls[1][0].end_date).toBe('2019-02-15')

    expect(
      document.querySelector('.dnb-date-picker').classList
    ).not.toContain('dnb-date-picker--closed')

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
    expect(onChange.mock.calls[2][0].start_date).toBe(undefined)
    expect(onChange.mock.calls[2][0].end_date).toBe(undefined)

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).not.toContain('dnb-date-picker--opened')
  })

  it('will close the picker on reset', () => {
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

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    const resetButton = document.querySelector(
      'button[data-testid="reset"]'
    )

    fireEvent.click(resetButton)

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(onReset.mock.calls[0][0].date).toBe(null)

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).not.toContain('dnb-date-picker--opened')
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

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('input.dnb-input__input')
    )

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('2024')

    await userEvent.click(year)
    await userEvent.keyboard('{ArrowRight>4}{Backspace}')

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('202å')

    await userEvent.keyboard('{Backspace}')

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('20åå')

    await userEvent.keyboard('{Backspace}')

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('2ååå')

    await userEvent.keyboard('{Backspace}')

    expect(day.value).toBe('17')
    expect(month.value).toBe('05')
    expect(year.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(day.value).toBe('17')
    expect(month.value).toBe('0m')
    expect(year.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(day.value).toBe('17')
    expect(month.value).toBe('mm')
    expect(year.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(day.value).toBe('1d')
    expect(month.value).toBe('mm')
    expect(year.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

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
          onChange={({ start_date, end_date }) => {
            setStartDate(start_date)
            setEndDate(end_date)
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

    await userEvent.click(endYear)
    await userEvent.keyboard('{ArrowRight>4}{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('06')
    expect(endYear.value).toBe('202å')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('06')
    expect(endYear.value).toBe('20åå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('06')
    expect(endYear.value).toBe('2ååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('06')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('0m')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('30')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('3d')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2024')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('202å')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('20åå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('2ååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('05')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('0m')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('01')
    expect(startMonth.value).toBe('mm')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace>2}')

    expect(startDay.value).toBe('0d')
    expect(startMonth.value).toBe('mm')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')

    await userEvent.keyboard('{Backspace}')

    expect(startDay.value).toBe('dd')
    expect(startMonth.value).toBe('mm')
    expect(startYear.value).toBe('åååå')
    expect(endDay.value).toBe('dd')
    expect(endMonth.value).toBe('mm')
    expect(endYear.value).toBe('åååå')
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

    expect(
      document.querySelector('.dnb-date-picker').getAttribute('class')
    ).toContain('dnb-date-picker--opened')

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

  it('has to work with shortcuts', () => {
    const onChange = jest.fn()
    render(
      <DatePicker
        noAnimation
        onChange={onChange}
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
    expect(onChange).toHaveBeenCalledTimes(1)

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
            start_date: new Date('2024-05-17'),
          },
          {
            title: 'week',
            start_date: new Date('2024-06-03'),
            end_date: new Date('2024-06-9'),
          },
          {
            title: 'month',
            start_date: new Date('2024-07-01'),
            end_date: new Date('2024-07-31'),
          },
        ]}
      />
    )

    await userEvent.click(document.querySelector('button.dnb-button'))

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

    await userEvent.click(document.querySelector('button.dnb-button'))

    const shortcut = document
      .querySelector('div.dnb-date-picker__addon')
      .querySelector('.dnb-button--secondary')

    await userEvent.click(shortcut)

    expect(onShortcutClick).toHaveBeenCalledTimes(1)
    expect(onShortcutClick).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: new Date('2024-05-17'),
        start_date: new Date('2024-05-17'),
        end_date: new Date('2024-05-31'),
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

    await userEvent.click(document.querySelector('button.dnb-button'))

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

    await userEvent.click(document.querySelector('button.dnb-button'))

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

    await userEvent.click(document.querySelector('button.dnb-button'))

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
  })

  it('should set correct month based date selected with keyboard navigation', async () => {
    render(<DatePicker range date="2024-10-01" />)

    await userEvent.click(document.querySelector('button.dnb-button'))

    const pickerTitle = document.querySelector(
      '.dnb-date-picker__calendar .dnb-date-picker__header__title'
    )

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

    await userEvent.click(document.querySelector('button.dnb-button'))

    const [leftPickerTitle, rightPickerTitle] = Array.from(
      document.querySelectorAll(
        '.dnb-date-picker__calendar .dnb-date-picker__header__title'
      )
    )

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
        onChange={({ start_date }) => {
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
        onChange={({ start_date }) => {
          changedStartDate = start_date
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
        onChange={({ start_date }) => {
          changedStartDate = start_date
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
    const onSubmit = jest.fn()
    const onCancel = jest.fn()
    const onReset = jest.fn()

    const date = '2020-10-20'

    render(
      <DatePicker
        date={date}
        opened
        noAnimation
        showResetButton
        showCancelButton
        showSubmitButton
        onSubmit={onSubmit}
        onCancel={onCancel}
        onReset={onReset}
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

    expect(onReset).toHaveBeenCalled()
    expect(onReset.mock.calls[0][0].date).toBe(null)

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

    expect(onCancel).toHaveBeenCalled()
    expect(onCancel.mock.calls[0][0].date).toBe(date)

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

    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit.mock.calls[0][0].date).toBe(date)
  })

  it('should have functioning cancel button with range pickers', async () => {
    render(
      <DatePicker
        showInput
        range
        startDate="2024-04-01"
        endDate="2024-05-17"
      />
    )

    await userEvent.click(document.querySelector('button.dnb-button'))

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

    expect(
      document.querySelector('.dnb-date-picker--opened')
    ).not.toBeInTheDocument()
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

  it('has a working month correction', () => {
    render(<DatePicker showInput />)

    const [dayElem, monthElem, yearElem] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    )

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
    expect(dayElem).toHaveValue(day)
    expect(monthElem).toHaveValue(month)
    expect(yearElem).toHaveValue(year)
  })

  it('has a working min and max date limitation', () => {
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
    fireEvent.change(startElem, {
      target: { value: '01' },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].is_valid_start_date).toBe(false)
    expect(onType.mock.calls[0][0].is_valid_start_date).toBe(false)

    // change the date to a valid date
    fireEvent.change(startElem, {
      target: { value: '03' },
    })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0].is_valid_start_date).toBe(true)
    expect(onType.mock.calls[1][0].is_valid_start_date).toBe(true)

    // change the date to a valid date
    fireEvent.change(endElem, {
      target: { value: '05' },
    })

    expect(onChange.mock.calls[2][0].start_date).toBe('2019-01-03')
    expect(onChange.mock.calls[2][0].end_date).toBe('2019-02-05')
    expect(onChange.mock.calls[2][0].is_valid_start_date).toBe(true)
    expect(onChange.mock.calls[2][0].is_valid_end_date).toBe(false)

    expect(onType.mock.calls[2][0].start_date).toBe('2019-01-03')
    expect(onType.mock.calls[2][0].end_date).toBe('2019-02-05')
    expect(onType.mock.calls[2][0].is_valid_start_date).toBe(true)
    expect(onType.mock.calls[2][0].is_valid_end_date).toBe(false)

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

    expect(onChange.mock.calls[2][0].date).toBe(undefined)
    expect(onChange.mock.calls[2][0].is_valid).toBe(undefined)

    rerender(
      <DatePicker
        {...defaultProps}
        minDate="2019-01-02"
        maxDate="2019-02-04"
        startDate="2019-01-02T00:00:00.000Z"
        onChange={onChange}
        onType={onType}
        range={false}
        correctInvalidDate={false}
        endDate={null}
      />
    )

    // change the date to a valid date
    fireEvent.change(startElem, {
      target: { value: '01' },
    })

    expect(onChange.mock.calls[3][0].is_valid_start_date).toBe(undefined)
    expect(onChange.mock.calls[3][0].is_valid_end_date).toBe(undefined)
    expect(onChange.mock.calls[3][0].is_valid).toBe(false)

    fireEvent.change(startElem, {
      target: { value: '03' },
    })

    expect(onChange.mock.calls[4][0].date).toBe('2019-01-03')
    expect(onChange.mock.calls[4][0].is_valid).toBe(true)
  })

  it('has to auto-correct invalid min/max dates', async () => {
    const onChange = jest.fn()

    render(
      <DatePicker
        {...defaultProps}
        onChange={onChange}
        correctInvalidDate={true}
        minDate="2019-01-02"
        maxDate="2019-03-01"
      />
    )
    const elem = document.querySelectorAll(
      'input.dnb-date-picker__input--day'
    )[0]

    // by default we have the corrected start day
    expect(elem).toHaveValue('02')

    // change the date to something invalid
    await userEvent.type(elem, '01')

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        is_valid_start_date: true,
        start_date: '2019-01-02',
      })
    )

    // change the date to a valid date
    await userEvent.type(elem, '{Backspace>2}03')

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        is_valid_start_date: true,
        start_date: '2019-01-03',
      })
    )
  })

  it('has to auto-correct invalid date based on min date', async () => {
    render(
      <DatePicker
        {...defaultProps}
        date="2022-01-01"
        correctInvalidDate
        minDate="2024-12-12"
      />
    )

    const [dayElem, monthElem, yearElem] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    )

    expect(dayElem).toHaveValue('12')
    expect(monthElem).toHaveValue('12')
    expect(yearElem).toHaveValue('2024')
  })

  it('has valid on_type and onChange event calls', () => {
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
      expect(onType.mock.calls[typeIndex][0][`${type}_date`]).toBe(
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
        onType.mock.calls[typeIndex][0][`is_valid_${type}_date`]
      ).toBe(false)
      expect(onType.mock.calls[typeIndex][0][`${type}_date`]).toBe(
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
      <DatePicker onChange={on_change} showInput date="2019-02-01" />
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
        <DatePicker onChange={on_change} showInput date={outerState} />
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
        <DatePicker onChange={on_change} showInput date="2019-02-01" />
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
    expect(on_change).toHaveBeenCalledTimes(1)

    changeState()
    expect(on_change).toHaveBeenCalledTimes(2)
  })

  it('will reset on setting value to null', () => {
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
        onChange={({ end_date }) => {
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
        onChange={({ end_date }) => {
          changedStartDate = end_date
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
        startDate={defaultProps.start_date}
        endDate="2019-02-17"
        onChange={({ end_date }) => {
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
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
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

  it('has to select all only on first focus', () => {
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
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
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

    const element = document.querySelector('.dnb-date-picker')
    const buttonElement = document.querySelector(
      'button.dnb-input__submit-button__button'
    )

    expect(document.activeElement).toBe(document.body)

    fireEvent.click(buttonElement)

    expect(document.activeElement).toBe(document.body)
    expect(element.classList).toContain('dnb-date-picker--opened')
  })

  it('has to react on keydown events', async () => {
    render(
      <DatePicker
        showInput
        range
        startDate={defaultProps.startDate}
        endDate={defaultProps.endDate}
        id="unique-id"
      />
    )

    const [dayElem, monthElem, yearElem] = Array.from(
      document.querySelectorAll('input.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

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
    expect(monthElem).toHaveValue('01')
    fireEvent.keyDown(monthElem, { key: 'Up', keyCode: 38 })

    expect(monthElem).toHaveValue('02')

    // and simulate a left keydown
    fireEvent.keyDown(monthElem, { key: 'Left', keyCode: 37 })

    // wait for the logic to complete
    await wait(1)

    // and check the class of that element
    expect(document.activeElement.classList).toContain(
      'dnb-date-picker__input--day'
    )

    // also test the key up to change the value on the day input
    expect(dayElem).toHaveValue('01')
    fireEvent.keyDown(dayElem, { key: 'Up', keyCode: 38 })

    expect(dayElem).toHaveValue('02')

    // also test the key up to change the value on the year input
    expect(yearElem).toHaveValue('2019')
    fireEvent.keyDown(yearElem, { key: 'Up', keyCode: 38 })
    expect(yearElem).toHaveValue('2020')
    fireEvent.keyDown(yearElem, { key: 'Down', keyCode: 40 })

    expect(yearElem).toHaveValue('2019')
  })

  it('should display correct start and end month on opening the date picker', async () => {
    render(
      <DatePicker startMonth="2024-01-01" endMonth="2024-12-31" range />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [startMonth, endMonth] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    expect(startMonth).toHaveTextContent('januar 2024')
    expect(endMonth).toHaveTextContent('desember 2024')
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

    const separator1 = document.querySelectorAll(
      '.dnb-date-picker--separator'
    )[0]
    const separator2 = document.querySelectorAll(
      '.dnb-date-picker--separator'
    )[0]

    expect(dayElem).toHaveValue('dd')
    expect(monthElem).toHaveValue('mm')
    expect(yearElem).toHaveValue('yyyy')
    expect(separator1.textContent).toBe('/')
    expect(separator2.textContent).toBe('/')
  })

  it('should fire fire event when input gets focus', async () => {
    const onFocus = jest.fn()
    render(<DatePicker showInput onFocus={onFocus} date="2024-01-05" />)

    const [firstInput, secondInput]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-input__input')
    )

    await userEvent.click(firstInput)

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(firstInput)

    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(firstInput)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledWith(
      expect.objectContaining({ target: firstInput, date: '2024-01-05' })
    )

    await userEvent.click(secondInput)

    expect(onFocus).toHaveBeenCalledTimes(2)
    expect(document.activeElement).toBe(secondInput)

    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(secondInput)
    expect(onFocus).toHaveBeenCalledTimes(2)
    expect(onFocus).toHaveBeenCalledWith(
      expect.objectContaining({ target: secondInput, date: '2024-01-05' })
    )
  })

  it('should fire blur event when input loses focus', async () => {
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
    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: firstInput,
        date: '2024-01-05',
      })
    )

    await userEvent.click(secondInput)

    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(secondInput)

    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(secondInput)
    expect(onBlur).toHaveBeenCalledTimes(2)
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({ target: secondInput, date: '2024-01-05' })
    )
  })

  it('should fire blur event with partially typed dates when input loses focus', async () => {
    const onBlur = jest.fn()
    render(<DatePicker showInput onBlur={onBlur} date="" />)

    const [firstInput, secondInput]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-input__input')
    )

    await userEvent.click(firstInput)
    fireEvent.change(firstInput, { target: { value: 12 } })
    expect(onBlur).toHaveBeenCalledTimes(0)

    expect(document.activeElement).toBe(firstInput)
    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(firstInput)

    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: firstInput,
        date: null,
        partialStartDate: 'yyyy-mm-12',
      })
    )
    await userEvent.click(secondInput)

    fireEvent.change(secondInput, { target: { value: 11 } })

    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(secondInput)

    await userEvent.click(document.body)

    expect(document.activeElement).not.toBe(secondInput)
    expect(onBlur).toHaveBeenCalledTimes(2)
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: secondInput,
        partialStartDate: 'yyyy-11-12',
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
    render(<DatePicker top="2rem" showInput />)

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
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <DatePicker label="Label" showInput />
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

    await userEvent.click(document.querySelector('button.dnb-button'))

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

  it('should support tabIndex for button and input', () => {
    render(<DatePicker tabIndex={-1} showInput />)

    const button = document.querySelector('button')
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

    const button = document.querySelector('button')

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
})

describe('DatePickerPortal', () => {
  it('should attach portal to document body on mount, and detach on unmount', async () => {
    render(<DatePicker />)

    const inputButton = screen.getByLabelText('åpne datovelger')

    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).not.toBeInTheDocument()

    await userEvent.click(inputButton)

    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).toBeInTheDocument()

    await userEvent.click(inputButton)

    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).not.toBeInTheDocument()
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
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
