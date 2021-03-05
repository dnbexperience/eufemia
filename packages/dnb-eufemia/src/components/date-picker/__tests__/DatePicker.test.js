/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  attachToBody, // in order to use document.activeElement properly
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../DatePicker'

// for the unit calc tests
// import { addDays, addMonths, getDaysInMonth } from 'date-fns'
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
  makeDayObject
} from '../DatePickerCalc'

describe('DatePicker component', () => {
  // for the integration tests
  const defaultProps = {
    id: 'date-picker-id',
    no_animation: true,
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

  it('will close the picker after selection', () => {
    const on_change = jest.fn()
    const Comp = mount(
      <Component {...defaultProps} on_change={on_change} />
    )

    Comp.find('button.dnb-input__submit-button__button').simulate('click')

    expect(
      Comp.find('.dnb-date-picker').instance().getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    const startTd = Comp.find('td.dnb-date-picker__day').at(10)
    const startButton = startTd.find('button')
    const startLabel = startButton.instance().getAttribute('aria-label')

    const endTd = Comp.find('td.dnb-date-picker__day').at(60)
    const endButton = endTd.find('button')
    const endLabel = endButton.instance().getAttribute('aria-label')

    expect(startLabel).toBe('torsdag 10. januar 2019')
    expect(endLabel).toBe('fredag 15. februar 2019')

    expect(on_change).not.toHaveBeenCalled()

    startButton.simulate('click')
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].start_date).toBe('2019-01-10')
    expect(on_change.mock.calls[0][0].end_date).toBe(null)

    endButton.simulate('click')
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].start_date).toBe('2019-01-10')
    expect(on_change.mock.calls[1][0].end_date).toBe('2019-02-15')

    expect(
      Comp.find('.dnb-date-picker').hasClass('dnb-date-picker--closed')
    ).toBe(false)

    Comp.setProps({
      range: false
    })

    expect(on_change).toHaveBeenCalledTimes(2)

    const singleTd = Comp.find('td.dnb-date-picker__day').at(11)
    const singleButton = singleTd.find('button')
    const singleLabel = singleButton.instance().getAttribute('aria-label')

    expect(singleLabel).toBe('fredag 11. januar 2019')

    singleButton.simulate('click')

    expect(on_change).toHaveBeenCalledTimes(3)
    expect(on_change.mock.calls[2][0].date).toBe('2019-01-11')
    expect(on_change.mock.calls[2][0].start_date).toBe(undefined)
    expect(on_change.mock.calls[2][0].end_date).toBe(undefined)

    expect(
      Comp.find('.dnb-date-picker').instance().getAttribute('class')
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

    const Comp = mount(
      <Component
        {...defaultProps}
        on_days_render={on_days_render}
        range={false}
      />
    )

    Comp.find('button.dnb-input__submit-button__button').simulate('click')

    expect(
      Comp.find('.dnb-date-picker').instance().getAttribute('class')
    ).toContain('dnb-date-picker--opened')

    expect(on_days_render).toHaveBeenCalledTimes(1)
    expect(on_days_render.mock.calls[0][0].length).toBe(42)
    expect(on_days_render.mock.calls[0][1]).toBe(0)

    const singleTd = Comp.find('td.dnb-date-picker__day').at(12)
    const singleButton = singleTd.find('button')
    const singleLabel = singleButton.instance().getAttribute('aria-label')

    expect(singleLabel).toBe('lørdag 12. januar 2019')
    expect(singleButton.instance().hasAttribute('disabled')).toBe(true)
    expect(singleTd.instance().classList).toContain(customClassName)
  })

  it('has to work with shortcuts', () => {
    const on_change = jest.fn()
    const Comp = mount(
      <Component
        no_animation
        on_change={on_change}
        shortcuts={[
          { title: 'Set date', date: '2020-05-23' },
          { title: 'Set date', close_on_select: true, date: '2020-04-23' }
        ]}
      />
    )

    Comp.find('button.dnb-button').simulate('click')
    Comp.find('span.dnb-toggle-button')
      .at(0)
      .find('button.dnb-button')
      .simulate('click')
    expect(Comp.find('label.dnb-date-picker__header__title').text()).toBe(
      'mai 2020'
    )
    expect(Comp.exists('.dnb-date-picker--opened')).toBe(true)
    expect(on_change).toBeCalledTimes(1)

    // Now, test "close_on_select"
    Comp.find('span.dnb-toggle-button')
      .at(1)
      .find('button.dnb-button')
      .simulate('click')
    expect(Comp.find('label.dnb-date-picker__header__title').text()).toBe(
      'april 2020'
    )
    expect(Comp.exists('.dnb-date-picker--opened')).toBe(false)
    expect(on_change).toBeCalledTimes(2)
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

  it('footer buttons work properly', () => {
    const on_submit = jest.fn()
    const on_cancel = jest.fn()
    const on_reset = jest.fn()

    const date = '2020-10-20'

    const Comp = mount(
      <Component
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

    const resetElem = Comp.find('button[data-visual-test="reset"]')
    expect(resetElem.exists()).toBe(true)

    const cancelElem = Comp.find('button[data-visual-test="cancel"]')
    expect(cancelElem.exists()).toBe(true)

    const submitElem = Comp.find('button[data-visual-test="submit"]')
    expect(submitElem.exists()).toBe(true)

    expect(
      Comp.find('input.dnb-date-picker__input--year').instance().value
    ).toBe('2020')

    resetElem.simulate('click')

    expect(on_reset).toHaveBeenCalled()
    expect(on_reset.mock.calls[0][0].date).toBe(null)

    expect(
      Comp.find('input.dnb-date-picker__input--year').instance().value
    ).toBe('åååå')

    cancelElem.simulate('click')

    expect(
      Comp.find('input.dnb-date-picker__input--year').instance().value
    ).toBe('2020')

    expect(on_cancel).toHaveBeenCalled()
    expect(on_cancel.mock.calls[0][0].date).toBe(date)

    Comp.find('span.dnb-input__submit-element').find('button.dnb-button').simulate('click')
    submitElem.simulate('click')

    expect(
      Comp.find('input.dnb-date-picker__input--year').instance().value
    ).toBe('2020')

    expect(on_submit).toHaveBeenCalled()
    expect(on_submit.mock.calls[0][0].date).toBe(date)
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

  it('has to auto-correct invalid min/max dates', () => {
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...defaultProps}
        on_change={on_change}
        correct_invalid_date={true}
        min_date="2019-01-02"
        max_date="2019-03-01"
      />
    )
    const elem = Comp.find('input.dnb-date-picker__input--day').at(0)

    // by default we have the corrected start day
    expect(elem.instance().value).toBe('02')

    // change the date to something invalid
    elem.simulate('change', {
      target: { value: '01' }
    })

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].is_valid_start_date).toBe(false)

    // change the date to a valid date
    elem.simulate('change', {
      target: { value: '03' }
    })

    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].is_valid_start_date).toBe(true)
  })

  it('has a working min and max date limitation', () => {
    const on_type = jest.fn()
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...defaultProps}
        min_date="2019-01-02"
        max_date="2019-02-04"
        on_change={on_change}
        on_type={on_type}
      />
    )
    const startElem = Comp.find('input.dnb-date-picker__input--day').at(0)
    const endElem = Comp.find('input.dnb-date-picker__input--day').at(1)

    // by default we have the start day
    expect(startElem.instance().value).toBe('01')

    // // change to invalid date
    startElem.simulate('change', {
      target: { value: '01' }
    })

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].is_valid_start_date).toBe(false)
    expect(on_type.mock.calls[0][0].is_valid_start_date).toBe(false)

    // change the date to a valid date
    startElem.simulate('change', {
      target: { value: '03' }
    })

    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].is_valid_start_date).toBe(true)
    expect(on_type.mock.calls[1][0].is_valid_start_date).toBe(true)

    // change the date to a valid date
    endElem.simulate('change', {
      target: { value: '05' }
    })

    expect(on_change.mock.calls[2][0].start_date).toBe('2019-01-03')
    expect(on_change.mock.calls[2][0].end_date).toBe('2019-02-05')
    expect(on_change.mock.calls[2][0].is_valid_start_date).toBe(true)
    expect(on_change.mock.calls[2][0].is_valid_end_date).toBe(false)

    expect(on_type.mock.calls[2][0].start_date).toBe('2019-01-03')
    expect(on_type.mock.calls[2][0].end_date).toBe('2019-02-05')
    expect(on_type.mock.calls[2][0].is_valid_start_date).toBe(true)
    expect(on_type.mock.calls[2][0].is_valid_end_date).toBe(false)

    Comp.find('button').simulate('click')

    const invalidDayElem = Comp.find('.dnb-date-picker__day button').at(1)
    expect(invalidDayElem.instance().getAttribute('aria-label')).toBe(
      'tirsdag 1. januar 2019'
    )
    expect(invalidDayElem.exists()).toBe(true)
    expect(invalidDayElem.instance().hasAttribute('disabled')).toBe(true)
    expect(
      Comp.find('.dnb-date-picker__day button')
        .at(2)
        .instance()
        .hasAttribute('disabled')
    ).toBe(false)

    expect(on_change.mock.calls[2][0].date).toBe(undefined)
    expect(on_change.mock.calls[2][0].is_valid).toBe(undefined)

    Comp.setProps({
      range: false
    })

    Comp.update()

    // change the date to a valid date
    startElem.simulate('change', {
      target: { value: '01' }
    })
    // endElem.simulate('change', {
    //   target: { value: '05' }
    // })

    expect(on_change.mock.calls[3][0].is_valid_start_date).toBe(undefined)
    expect(on_change.mock.calls[3][0].is_valid_end_date).toBe(undefined)
    expect(on_change.mock.calls[3][0].is_valid).toBe(false)

    startElem.simulate('change', {
      target: { value: '03' }
    })

    expect(on_change.mock.calls[4][0].date).toBe('2019-01-03')
    expect(on_change.mock.calls[4][0].is_valid).toBe(true)
  })

  it('has valid event calls', () => {
    const on_type = jest.fn()
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        id="date-picker-id"
        no_animation={true}
        range={true}
        show_input={true}
        on_type={on_type}
        on_change={on_change}
      />
    )

    const startDayElem = Comp.find('input.dnb-date-picker__input--day').at(
      0
    )
    const startMonthElem = Comp.find(
      'input.dnb-date-picker__input--month'
    ).at(0)
    const startYearElem = Comp.find(
      'input.dnb-date-picker__input--year'
    ).at(0)

    const endDayElem = Comp.find('input.dnb-date-picker__input--day').at(1)
    const endMonthElem = Comp.find(
      'input.dnb-date-picker__input--month'
    ).at(1)
    const endYearElem = Comp.find('input.dnb-date-picker__input--year').at(
      1
    )

    const testInteraction = ({
      typeIndex,
      changeIndex,
      dayElem,
      monthElem,
      yearElem,
      type
    }) => {
      // by default we have the start day
      expect(dayElem.instance().value).toBe('dd')
      expect(on_type).toHaveBeenCalledTimes(typeIndex)

      // change the day
      dayElem.simulate('change', {
        target: { value: '03' }
      })
      expect(dayElem.instance().value).toBe('03')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 1)
      expect(on_type.mock.calls[typeIndex][0][`${type}_date`]).toBe(
        'yyyy-mm-03'
      )

      typeIndex++

      // change the month
      monthElem.simulate('change', {
        target: { value: '01' }
      })
      expect(monthElem.instance().value).toBe('01')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 1)
      expect(
        on_type.mock.calls[typeIndex][0][`is_valid_${type}_date`]
      ).toBe(false)
      expect(on_type.mock.calls[typeIndex][0][`${type}_date`]).toBe(
        'yyyy-01-03'
      )
      expect(on_change).toHaveBeenCalledTimes(changeIndex)

      // change the year halfway
      yearElem.simulate('change', {
        target: { value: '202' }
      })
      expect(yearElem.instance().value).toBe('202å')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 2)

      expect(on_change).toHaveBeenCalledTimes(changeIndex + 1)
      expect(
        on_change.mock.calls[changeIndex][0][`is_valid_${type}_date`]
      ).toBe(true)

      changeIndex++

      // change the year
      yearElem.simulate('change', {
        target: { value: '2020' }
      })
      expect(yearElem.instance().value).toBe('2020')
      expect(on_type).toHaveBeenCalledTimes(typeIndex + 3)
      expect(on_change).toHaveBeenCalledTimes(changeIndex + 1)
    }

    testInteraction({
      type: 'start',
      typeIndex: 0,
      changeIndex: 0,
      dayElem: startDayElem,
      monthElem: startMonthElem,
      yearElem: startYearElem
    })

    testInteraction({
      type: 'end',
      typeIndex: 4,
      changeIndex: 2,
      dayElem: endDayElem,
      monthElem: endMonthElem,
      yearElem: endYearElem
    })
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
    expect(
      Comp.find('input.dnb-input__input').at(0).instance().value
    ).toBe('dd')
    expect(
      Comp.find('input.dnb-input__input').at(3).instance().value
    ).toBe('15')

    Comp.setProps({
      end_date: null
    })
    expect(
      Comp.find('input.dnb-input__input').at(5).instance().value
    ).toBe('åååå')
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
    const Comp = mount(
      <Component
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />
    )

    Comp.find('button').simulate('click')

    const elem = Comp.find('input.dnb-date-picker__input--day').at(1)
    elem.simulate('change', {
      target: { value: '15' }
    })

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

  it('has to have a aria-describedby on first focus', async () => {
    const label = 'Input Label'
    const Comp = mount(
      <Component
        id="custom-id"
        label={label}
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />,
      { attachTo: attachToBody() }
    )

    const legendElem = Comp.find('fieldset > legend')
    expect(legendElem.text()).toBe(label)
    expect(legendElem.instance().classList).toContain('dnb-sr-only')
  })

  it('has to react on keydown events', async () => {
    const Comp = mount(
      <Component
        show_input
        range
        start_date={defaultProps.start_date}
        end_date={defaultProps.end_date}
      />,
      { attachTo: attachToBody() }
    )

    const dayElem = Comp.find('input.dnb-date-picker__input--day').at(0)
    const monthElem = Comp.find('input.dnb-date-picker__input--month').at(
      0
    )
    const yearElem = Comp.find('input.dnb-date-picker__input--year').at(0)

    // set the cursor to the end of the input
    dayElem.instance().setSelectionRange(2, 2)

    // and simulate a right keydown
    dayElem.simulate('keydown', { key: 'Right', keyCode: 39 })

    // wait for the logic to complete
    await wait(1)

    // get the active focused element in the document
    let focusedElement = document.activeElement

    // and check the class of that element
    expect(
      focusedElement.classList.contains('dnb-date-picker__input--month')
    ).toBe(true)

    // also test the key up to change the value on the month input
    expect(monthElem.instance().value).toBe('01')
    monthElem.simulate('keydown', { key: 'Up', keyCode: 38 })
    expect(monthElem.instance().value).toBe('02')

    // and simulate a left keydown
    monthElem.simulate('keydown', { key: 'Left', keyCode: 37 })

    // wait for the logic to complete
    await wait(1)

    // get the active focused element in the document
    focusedElement = document.activeElement

    // and check the class of that element
    expect(focusedElement.classList).toContain(
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

  it('should validate with ARIA rules', async () => {
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
      month
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
        isInactive: false
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
