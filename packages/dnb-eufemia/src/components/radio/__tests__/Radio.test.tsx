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
import Component from '../Radio'

const props = fakeProps(require.resolve('../Radio'), {
  optional: true,
})
props.id = 'radio'
props.element = 'input'
props.group = null
props.status = null
props.size = null
props.readOnly = false
props.label_position = 'left'
props.direction = 'horizontal'
props.global_status_id = 'main'

describe('Radio component', () => {
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

  it('will disable a single button', () => {
    const Comp = mount(<Component disabled />)

    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      true
    )

    Comp.setProps({
      disabled: false,
    })

    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      false
    )
  })

  it('should validate with ARIA rules', async () => {
    expect(
      await axeComponent(Comp, {
        rules: {
          // NVDA fix
          // because of the role="radio", we have to allow this
          'aria-allowed-role': { enabled: false },
        },
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

  it('will disable a single button within a group', () => {
    const Comp = mount(
      <Component.Group>
        <Component disabled />
      </Component.Group>
    )

    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('will disable a single button, defined in the group', () => {
    const Comp = mount(
      <Component.Group disabled>
        <Component />
      </Component.Group>
    )

    expect(Comp.find('input').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('will overwrite "disable" state, defined in the group', () => {
    const Comp = mount(
      <Component.Group disabled>
        <Component disabled={false} />
        <Component disabled />
      </Component.Group>
    )

    expect(
      Comp.find('input').first().instance().hasAttribute('disabled')
    ).toBe(false)
    expect(
      Comp.find('input').last().instance().hasAttribute('disabled')
    ).toBe(true)
  })

  it('should support spacing props', () => {
    render(<Component top="2rem" />)

    const element = document.querySelector('.dnb-radio')

    expect(Array.from(element.classList)).toEqual([
      'dnb-radio',
      'dnb-space__top--large',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component label="Label" />
      </FormRow>
    )

    const element = document.querySelector('.dnb-radio')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-radio',
      'dnb-radio--label-position-right',
    ])
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
          'aria-allowed-role': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})

describe('Radio scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-radio-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
