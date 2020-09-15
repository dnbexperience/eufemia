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
import Component from '../Radio'

const props = fakeProps(require.resolve('../Radio'), {
  optional: true
})
props.id = 'radio'
props.group = null
props.status = null
props.readOnly = false
props.label_position = 'left'
props.direction = 'horizontal'

describe('Radio component', () => {
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

  it('has "on_change" event which will trigger on a input change', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const Comp = mount(
      <Component
        on_change={my_event}
        onChange={myEvent}
        checked={false}
        group={null}
      />
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
    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should validate with ARIA rules', async () => {
    expect(
      await axeComponent(Comp, {
        rules: {
          // NVDA fix
          // because of the role="radio", we have to allow this
          'aria-allowed-role': { enabled: false }
        }
      })
    ).toHaveNoViolations()
  })
})

describe('Radio group component', () => {
  const my_event = jest.fn()

  // then test the state management
  const Comp = mount(
    <Component.Group
      label="Label"
      name="group"
      id="group"
      no_fieldset
      on_change={my_event}
    >
      <Component id="radio-1" label="Radio 1" value="first" />
      <Component id="radio-2" label="Radio 2" value="second" checked />
    </Component.Group>
  )

  it('has to set correct value using keys', () => {
    Comp.find('input').at(0).simulate('change')
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].value).toBe('first')

    Comp.find('input').at(1).simulate('change')
    expect(my_event.mock.calls.length).toBe(2)
    expect(my_event.mock.calls[1][0].value).toBe('second')
  })

  // mount compare the snapshot
  it('have to match group snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(
      await axeComponent(Comp, {
        rules: {
          // NVDA fix
          // because of the role="radio", we have to allow this
          'aria-allowed-role': { enabled: false }
        }
      })
    ).toHaveNoViolations()
  })
})

describe('Radio scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-radio.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-radio-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
