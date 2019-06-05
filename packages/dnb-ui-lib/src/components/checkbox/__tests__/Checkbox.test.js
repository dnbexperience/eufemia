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
import Component from '../Checkbox'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _checkbox from '../style/_checkbox.scss' // eslint-disable-line
import dnb_checkbox from '../style/dnb-checkbox.scss' // eslint-disable-line
import dnb_checkbox_theme_ui from '../style/themes/dnb-checkbox-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../Checkbox'), {
  optional: true
})
props.status = null
props.readOnly = false

describe('Checkbox component', () => {
  // then test the state management
  const Comp = mount(<Component {...props} />)

  // mount compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "change" trigger', () => {
    // default checked value has to be false
    expect(Comp.state().checked).toBe(false)

    Comp.find('input').simulate('change') // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(Comp.state().checked).toBe(true)

    Comp.find('input').simulate('change')
    expect(Comp.state().checked).toBe(false)

    // also check if getDerivedStateFromProps sets the state as expected
    Comp.setProps({ checked: true })
    expect(Comp.state().checked).toBe(true)

    const value = 'new value'
    Comp.setProps({ value })
    expect(Comp.find('input').props().value).toBe(value)
  })

  it('has "on_change" event witch will trigger on a input change', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const Comp = mount(
      <Component on_change={my_event} onChange={myEvent} checked={false} />
    )
    Comp.find('input').simulate('change')
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('checked')
    expect(myEvent.mock.calls[0][0].checked).toBe(true)
    expect(my_event.mock.calls[0][0].checked).toBe(true)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('input')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Checkbox scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-checkbox.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-checkbox-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
