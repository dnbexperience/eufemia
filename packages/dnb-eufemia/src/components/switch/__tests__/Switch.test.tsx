/**
 * Component Test
 *
 */

import { render } from '@testing-library/react'
import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import FormRow from '../../form-row/FormRow'
import Component from '../Switch'

const props = fakeProps(require.resolve('../Switch'), {
  optional: true,
})
props.status = null
props.size = 'default'
props.label_position = 'left'
props.readOnly = false
props.label_direction = 'horizontal'
props.global_status_id = 'main'

describe('Switch component', () => {
  // then test the state management
  const Comp = mount(<Component {...props} />)

  // mount compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "change" trigger', () => {
    // default checked value has to be false
    expect(Comp.find('input').instance().checked).toBe(false)

    Comp.find('input').simulate('change') // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(Comp.find('input').instance().checked).toBe(true)

    Comp.find('input').simulate('change')
    expect(Comp.find('input').instance().checked).toBe(false)

    // also check if getDerivedStateFromProps sets the state as expected
    Comp.setProps({ checked: true })
    expect(Comp.find('input').instance().checked).toBe(true)

    const value = 'new value'
    Comp.setProps({ value })
    expect(Comp.find('input').props().value).toBe(value)
  })

  it('has "on_change" event which will trigger on a input change', () => {
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

  it('does handle controlled vs uncontrolled state properly', () => {
    const ControlledVsUncontrolled = () => {
      const [checked, setChecked] = React.useState(true)
      const [random, setRandom] = React.useState(null)

      return (
        <>
          <Component
            checked={checked}
            on_change={({ checked }) => setChecked(checked)}
          />
          <button id="set-state" onClick={() => setChecked(true)} />
          <button
            id="reset-undefined"
            onClick={() => setChecked(undefined)}
          />
          <button id="reset-null" onClick={() => setChecked(null)} />
          <button id="rerender" onClick={() => setRandom(Math.random())} />
          <code>{JSON.stringify({ checked, random })}</code>
        </>
      )
    }

    const TestStates = (Comp) => {
      // re-render + default state is true
      Comp.find('button#rerender').simulate('click')
      expect(Comp.find('input').instance().checked).toBe(true)

      // change it to false
      Comp.find('input').simulate('change')
      expect(Comp.find('input').instance().checked).toBe(false)

      // set it to true
      Comp.find('button#set-state').simulate('click')
      expect(Comp.find('input').instance().checked).toBe(true)

      // reset it with undefined to false
      Comp.find('button#reset-undefined').simulate('click')
      expect(Comp.find('input').instance().checked).toBe(false)

      // set it to true + reset it with null to false
      Comp.find('button#set-state').simulate('click')
      Comp.find('button#reset-null').simulate('click')
      expect(Comp.find('input').instance().checked).toBe(false)

      // re-render + still false
      Comp.find('button#rerender').simulate('click')
      expect(Comp.find('input').instance().checked).toBe(false)
    }

    TestStates(mount(<ControlledVsUncontrolled />))
    TestStates(
      mount(
        <React.StrictMode>
          <ControlledVsUncontrolled />
        </React.StrictMode>
      )
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true,
    })
    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should support spacing props', () => {
    render(<Component top="2rem" />)

    const element = document.querySelector('.dnb-switch')

    expect(Array.from(element.classList)).toEqual([
      'dnb-switch',
      'dnb-switch--label-position-right',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component label="Label" />
      </FormRow>
    )

    const element = document.querySelector('.dnb-switch')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-switch',
      'dnb-switch--label-position-right',
      'dnb-form-component',
    ])
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Switch scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-switch-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
