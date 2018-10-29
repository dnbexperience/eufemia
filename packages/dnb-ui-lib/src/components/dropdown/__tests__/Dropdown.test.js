/**
 * Component Test
 *
 */

import React from 'react'
import {
  shallow,
  mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Dropdown'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-dropdown.scss'

const props = fakeProps(require.resolve('../Dropdown'), {
  optional: true
})
let Comp
const selected_item = 1

beforeAll(() => {
  // then test the state management
  Comp = mount(
    <Component {...props} data={mockData} selected_item={selected_item} />
  )
})

describe('Dropdown component', () => {
  // shallow compare the snapshot
  it('have to match snapshot', () => {
    const ComponentWrap = shallow(
      <Component
        {...props}
        data={mockData}
        selected_item={selected_item}
      />
    )
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(false)
    expect(Comp.state().visible).toBe(false)
  })

  it('has correct state after "focus" trigger', () => {
    Comp.find('input').simulate('focus')
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().visible).toBe(true)
  })

  it('has correct state after "blur" trigger', async () => {
    Comp.find('input').simulate('blur')
    expect(Comp.state().opened).toBe(false)
    await delay(Component.blurDelay + 10)
    expect(Comp.state().visible).toBe(false)
  })

  it('has correct css class after calling onFocusHandler', () => {
    Comp.instance().onFocusHandler()
    expect(
      Comp.find('span')
        .first()
        .hasClass('dnb-dropdown--visible')
    ).toBe(true)
    expect(
      Comp.find('span')
        .first()
        .hasClass('dnb-dropdown--hidden')
    ).toBe(false)
  })

  it('has correct length of li elements', () => {
    expect(Comp.find('li.dnb-dropdown__option').length).toBe(
      mockData.length
    )
  })

  it('has correct selected value', () => {
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[selected_item].selected_value
    )
  })

  it('has correct outside value', () => {
    expect(Comp.find('.dnb-dropdown__outside-value').text()).toBe(
      mockData[selected_item].outside_value
    )
  })

  it('has correct selected value', async () => {
    Comp.find('li.dnb-dropdown__option')
      .find('.dnb-dropdown__option__inner')
      .at(selected_item + 1)
      .simulate('mousedown')
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[selected_item + 1].selected_value
    )
  })
})

describe('Dropdown scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-dropdown.scss'))
    expect(scss).toMatchSnapshot()
  })
})

const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

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
