/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  // fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../DatePicker'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _DatePicker from '../style/_date-picker.scss' // eslint-disable-line
import dnb_DatePicker from '../style/dnb-date-picker.scss' // eslint-disable-line
import dnb_DatePicker_theme_ui from '../style/themes/dnb-date-picker-theme-ui.scss' // eslint-disable-line

// const props = fakeProps(require.resolve('../DatePicker'), {
//   optional: true
// })
const props = {}
props.id = 'date-picker-id'
props.range = true
props.show_input = true
props.date = '2019-01-01'
props.start_date = '2019-01-01'
props.end_date = '2019-02-15'
// props.direction = 'auto'
props.status = 'status'
props.status_state = 'error'

describe('DatePicker component', () => {
  const Comp = mount(<Component {...props} />)

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(false)
    expect(Comp.state().hidden).toBe(true)
  })

  it('has correct state after "click" trigger', () => {
    Comp.find('button[type="submit"]').simulate('click')
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().hidden).toBe(false)

    expect(
      Comp.find('button[type="submit"]')
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
    Comp.find('button[type="submit"]').simulate('click')
    expect(Comp.find('.dnb-date-picker__views').exists()).toBe(true)
    expect(Comp.find('.dnb-date-picker__calendar').length).toBe(2)
  })

  it('is displaying correct month', () => {
    expect(
      Comp.find('.dnb-date-picker__header__title')
        .first()
        .text()
    ).toBe('januar 2019')

    expect(
      Comp.find(
        'li.dnb-date-picker__day--start-date .dnb-button__text'
      ).text()
    ).toBe('1')

    expect(
      Comp.find(
        'li.dnb-date-picker__day--end-date .dnb-button__text'
      ).text()
    ).toBe('15')

    // check the second calendar

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
