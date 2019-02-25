/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Dropdown'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-dropdown.scss'
import '../style/themes/dnb-dropdown-theme-ui.scss'

const props = fakeProps(require.resolve('../Dropdown'), {
  optional: true
})
props.id = 'dropdown-id'
props.status = 'status'
props.status_state = 'error'
props.selected_item = 2

const mockData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    outside_value: '1234.56.78901',
    content: ['1234.56.78901', 'Brukskonto - Kari Nordmann']
  },
  {
    selected_value: 'Sparekonto - Ole Nordmann',
    outside_value: '1234.56.78902',
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    outside_value: '1134.56.78962',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    outside_value: '1534.96.48901',
    content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
  }
]

describe('Dropdown component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  // shallow compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(false)
    expect(Comp.state().hidden).toBe(true)
  })

  it('has correct state after "focus" trigger', () => {
    Comp.find('input').simulate('focus')
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().hidden).toBe(false)
  })

  it('has correct state after "blur" trigger', () => {
    Comp.find('input').simulate('blur')
    expect(Comp.state().opened).toBe(false)
  })

  it('has correct css class after calling onFocusHandler', () => {
    Comp.instance().onFocusHandler()

    expect(Comp.state().opened).toBe(true)

    const elem = Comp.find('span.dnb-dropdown')

    expect(
      elem
        .find('button')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-dropdown--opened'
    )

    expect(elem.hasClass('dnb-dropdown--closed')).toBe(false)
  })

  it('has correct length of li elements', () => {
    expect(Comp.find('li.dnb-dropdown__option').length).toBe(
      mockData.length
    )
  })

  it('has correct selected value', () => {
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.selected_item].selected_value
    )
  })

  it('has correct outside value', () => {
    expect(Comp.find('.dnb-dropdown__outside-value').text()).toBe(
      mockData[props.selected_item].outside_value
    )
  })

  it('has correct selected value', () => {
    Comp.find('li.dnb-dropdown__option')
      .find('.dnb-dropdown__option__inner')
      .at(props.selected_item + 1)
      .simulate('mousedown')
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.selected_item + 1].selected_value
    )
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Dropdown scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-dropdown.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-dropdown-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
