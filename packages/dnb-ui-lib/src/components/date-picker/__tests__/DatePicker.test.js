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
import DatePickerInput from '../DatePickerInput'

// for the unit calc tests
// import { addDays, addMonths, getDaysInMonth } from 'date-fns'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import {
  toRange,
  dayOffset,
  getWeek,
  getMonth,
  getCalendar
} from '../DatePickerCalc'

describe('DatePicker component', () => {
  // for the integration tests
  const defaultProps = {
    id: 'date-picker-id',
    range: true,
    show_input: true,
    date: '1970-01-01T00:00:00.000Z',
    start_date: '2019-01-01T00:00:00.000Z',
    end_date: '2019-02-15T00:00:00.000Z',
    status: 'status',
    status_state: 'error',
    separatorRexExp: null
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
      Comp.find('input').first().instance().hasAttribute('disabled')
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
      Comp.find('.dnb-date-picker').instance().getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    expect(
      Comp.find('.dnb-date-picker').hasClass('dnb-date-picker--closed')
    ).toBe(false)
  })

  it('has to reset second input fields to blank during new date selection', () => {
    const Comp = mount(<Component {...defaultProps} />)
    Comp.find('button.dnb-input__submit-button__button').simulate('click')

    Comp.find('table tbody button.dnb-button--secondary')
      .at(10)
      .simulate('click')

    expect(
      Comp.find('input.dnb-date-picker__input--year').at(1).instance()
        .value
    ).toBe('åååå')
  })

  it('has to work with shortcuts', () => {
    const Comp = mount(
      <Component shortcuts={[{ title: 'Set date', date: '2020-05-23' }]} />
    )

    Comp.find('button.dnb-input__submit-button__button').simulate('click')
    Comp.find('span.dnb-toggle-button')
      .at(0)
      .find('button.dnb-button')
      .simulate('click')

    expect(Comp.find('label.dnb-date-picker__header__title').text()).toBe(
      'mai 2020'
    )
  })

  it('has two calendar views', () => {
    Comp.find('button.dnb-input__submit-button__button').simulate('click')
    expect(Comp.find('.dnb-date-picker__views').exists()).toBe(true)
    expect(Comp.find('.dnb-date-picker__calendar').length).toBe(2)
  })

  it('has a reacting start date input with valid value', () => {
    const elem = Comp.find('input.dnb-date-picker__input--day').at(0)

    // by default we have the start day
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

  it('has a warking month correction', () => {
    const Comp = mount(<Component show_input />)

    const dayElem = Comp.find('input.dnb-date-picker__input--day').at(0)
    const monthElem = Comp.find('input.dnb-date-picker__input--month').at(
      0
    )
    const yearElem = Comp.find('input.dnb-date-picker__input--year').at(0)

    // change the date
    const day = '01'
    const month = '01' // will have to make a correction internally
    const year = '2020'

    dayElem.simulate('change', {
      target: { value: day }
    })
    monthElem.simulate('change', {
      target: { value: month }
    })
    yearElem.simulate('change', {
      target: { value: year }
    })

    // then check the new input value
    expect(dayElem.instance().value).toBe(day)
    expect(monthElem.instance().value).toBe(month)
    expect(yearElem.instance().value).toBe(year)
  })

  it('has a working min and max date limitation', () => {
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...defaultProps}
        on_change={on_change}
        min_date="2019-01-02"
        max_date="2019-03-01"
      />
    )
    const elem = Comp.find('input.dnb-date-picker__input--day').at(0)

    // by default we have the start day
    expect(elem.instance().value).toBe('02')

    // change the date
    elem.simulate('change', {
      target: { value: '03' }
    })

    expect(on_change).toHaveBeenCalled()
    expect(on_change.mock.calls[0][0].is_valid_start_date).toBe(true)

    // change the date
    elem.simulate('change', {
      target: { value: '01' }
    })

    expect(on_change.mock.calls[1][0].is_valid_start_date).toBe(false)
  })

  it('will reset on setting value to null', () => {
    const Comp = mount(
      <Component
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )
    Comp.setProps({
      start_date: null
    })
    expect(Comp.find('input').first().instance().value).toBe('dd')
    expect(Comp.state().startDate).toBe(undefined)
    expect(Comp.state().endDate).not.toBe(undefined) // dirty check

    Comp.setProps({
      end_date: null
    })
    expect(Comp.find('input').last().instance().value).toBe('åååå')

    expect(Comp.state().endDate).toBe(undefined)
  })

  it('has a reacting end date input with valid value', () => {
    const Comp = mount(
      <Component
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )
    const elem = Comp.find('input.dnb-date-picker__input--day').at(1)

    // by default we have the start day
    expect(elem.instance().value).toBe('15')

    // listen to changes
    let changedStartDate = null
    Comp.setProps({
      on_change: ({ end_date }) => {
        changedStartDate = end_date
      }
    })

    // also, check the null situation
    Comp.setProps({
      start_date: null
    })
    expect(Comp.find('input').first().instance().value).toBe('dd')

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

  it('has to return all additional attributes the event return', () => {
    const my_event = jest.fn()
    const params = { 'data-attr': 'value' }
    const Comp = mount(<Component on_show={my_event} {...params} />)
    Comp.find('button').simulate('click')
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('is displaying correct month', () => {
    expect(
      Comp.find('.dnb-date-picker__header__title').first().text()
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

    expect(Comp.find('.dnb-date-picker__header__title').at(1).text()).toBe(
      'mars 2019'
    )
  })

  it('has to react on keydown events', async () => {
    const Comp = mount(
      <Component
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )

    const dayElem = Comp.find('input.dnb-date-picker__input--day').at(0)
    const monthElem = Comp.find('input.dnb-date-picker__input--month').at(
      0
    )
    const yearElem = Comp.find('input.dnb-date-picker__input--year').at(0)

    // set the curstor to the end of the input
    dayElem.instance().setSelectionRange(2, 2)

    // and simualte a right keydown
    dayElem.simulate('keydown', { key: 'Right', keyCode: 39 })

    // wait for the logic to complete
    await wait(1)

    // get the active focused element in the document
    let focusedElement = document.activeElement

    // and check the class of that element
    expect(focusedElement.getAttribute('class')).toContain(
      'dnb-date-picker__input--month'
    )

    // also test the key up to change the value on the month input
    expect(monthElem.instance().value).toBe('01')
    monthElem.simulate('keydown', { key: 'Up', keyCode: 38 })
    expect(monthElem.instance().value).toBe('02')

    // and simualte a left keydown
    monthElem.simulate('keydown', { key: 'Left', keyCode: 37 })

    // wait for the logic to complete
    await wait(1)

    // get the active focused element in the document
    focusedElement = document.activeElement

    // and check the class of that element
    expect(focusedElement.getAttribute('class')).toContain(
      'dnb-date-picker__input--day'
    )

    // also test the key up to change the value on the day input
    expect(dayElem.instance().value).toBe('01')
    dayElem.simulate('keydown', { key: 'Up', keyCode: 38 })
    expect(dayElem.instance().value).toBe('02')

    // also test the key up to change the value on the year input
    expect(yearElem.instance().value).toBe('2019')
    yearElem.simulate('keydown', { key: 'Up', keyCode: 38 })
    expect(yearElem.instance().value).toBe('2020')
    yearElem.simulate('keydown', { key: 'Down', keyCode: 40 })
    expect(yearElem.instance().value).toBe('2019')
  })

  it('should validate with ARIA rules as a tabs', async () => {
    const Comp = mount(
      <Component
        range="true"
        opened="true"
        disable_autofocus="true"
        start_date="2019-05-05"
        end_date="2019-06-05"
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('DatePicker input', () => {
  it('has correct working date check', () => {
    expect(DatePickerInput.isValidDate(1971)).toBe(true)
    expect(DatePickerInput.isValidDate(new Date(1971, 1, 1))).toBe(true)
    expect(DatePickerInput.isValidDate(new Date(1111, 1, 1))).toBe(false)
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

const wait = (t) => new Promise((r) => setTimeout(r, t))
