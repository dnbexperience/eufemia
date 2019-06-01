/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../DatePicker'

// for the unit calc tests
import { addDays, addMonths, getDaysInMonth } from 'date-fns'
import {
  toRange,
  dayOffset,
  getWeek,
  getMonth,
  getCalendar
} from '../DatePickerCalc'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _DatePicker from '../style/_date-picker.scss' // eslint-disable-line
import dnb_DatePicker from '../style/dnb-date-picker.scss' // eslint-disable-line
import dnb_DatePicker_theme_ui from '../style/themes/dnb-date-picker-theme-ui.scss' // eslint-disable-line

describe('DatePicker component', () => {
  // for the integration tests
  const defaultProps = {
    id: 'date-picker-id',
    range: true,
    show_input: true,
    date: '2019-01-01T00:00:00.000Z',
    start_date: '2019-01-01T00:00:00.000Z',
    end_date: '2019-02-15T00:00:00.000Z',
    status: 'status',
    status_state: 'error'
  }

  const Comp = mount(<Component {...defaultProps} />)

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(false)
    expect(Comp.state().hidden).toBe(true)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component show_input />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('input')
        .first()
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('has correct state after "click" trigger', () => {
    Comp.find('button.dnb-input__submit-button__button').simulate('click')
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().hidden).toBe(false)

    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(
      Comp.find('.dnb-date-picker')
        .instance()
        .getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    expect(
      Comp.find('.dnb-date-picker').hasClass('dnb-date-picker--closed')
    ).toBe(false)
  })

  it('has two calendar views', () => {
    Comp.find('button.dnb-input__submit-button__button').simulate('click')
    expect(Comp.find('.dnb-date-picker__views').exists()).toBe(true)
    expect(Comp.find('.dnb-date-picker__calendar').length).toBe(2)
  })

  it('has a reacting start date input with valid value', () => {
    const elem = Comp.find('input.dnb-date-picker__input--day').at(0)

    // by defualt we have the start day
    expect(elem.instance().value).toBe('01')

    // listen to changes
    let changedStartDate = null
    Comp.setProps({
      on_change: ({ start_date }) => {
        changedStartDate = start_date
      }
    })

    // change the date
    const value = '02'
    elem.simulate('change', {
      target: { value }
    })

    // then check the new input value
    expect(elem.instance().value).toBe(value)

    // and the event fired value
    expect(changedStartDate).toBe(`2019-01-${value}`)

    // test prop change to make sure getDerivedStateFromProps works
    Comp.setProps({
      start_date: '2019-01-03'
    })
    expect(elem.instance().value).toBe('03')

    // reset the value
    elem.simulate('change', {
      target: { value: '01' }
    })
    Comp.setProps({
      start_date: defaultProps.start_date
    })
  })

  it('has a reacting end date input with valid value', () => {
    const elem = Comp.find('input.dnb-date-picker__input--day').at(1)

    // by defualt we have the start day
    expect(elem.instance().value).toBe('15')

    // listen to changes
    let changedStartDate = null
    Comp.setProps({
      on_change: ({ end_date }) => {
        changedStartDate = end_date
      }
    })

    // change the date
    const value = '16'
    elem.simulate('change', {
      target: { value }
    })

    // then check the new input value
    expect(elem.instance().value).toBe(value)

    // and the event fired value
    expect(changedStartDate).toBe(`2019-02-${value}`)

    // test prop change to make sure getDerivedStateFromProps works
    Comp.setProps({
      end_date: '2019-02-17'
    })
    expect(elem.instance().value).toBe('17')

    // reset the value
    elem.simulate('change', {
      target: { value: '15' }
    })
    Comp.setProps({
      start_date: defaultProps.start_date
    })
  })

  it('is displaying correct month', () => {
    expect(
      Comp.find('.dnb-date-picker__header__title')
        .first()
        .text()
    ).toBe('januar 2019')

    expect(
      Comp.find(
        'td.dnb-date-picker__day--start-date .dnb-button__text'
      ).text()
    ).toBe('1')

    expect(
      Comp.find(
        'td.dnb-date-picker__day--end-date .dnb-button__text'
      ).text()
    ).toBe('15')

    // from now on, check the second calendar

    Comp.find('.dnb-date-picker__calendar')
      .at(1)
      .find('.dnb-date-picker__next button')
      .simulate('click')

    expect(
      Comp.find('.dnb-date-picker__header__title')
        .at(1)
        .text()
    ).toBe('mars 2019')
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
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
    'friday'
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
})

describe('DatePicker scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-date-picker.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-date-picker-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
