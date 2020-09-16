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
import Component from '../ToggleButton'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _toggle_button from '../style/_toggle-button.scss' // eslint-disable-line
import dnb_toggle_button from '../style/dnb-toggle-button.scss' // eslint-disable-line
import dnb_toggle_button_theme_ui from '../style/themes/dnb-toggle-button-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../ToggleButton'), {
  optional: true
})
props.id = 'toggle-button'
props.status = null
props.icon_position = 'left'
props.label_direction = 'horizontal'
props.variant = 'checkbox'
props.readOnly = false

describe('ToggleButton component', () => {
  // then test the state management
  const Comp = mount(<Component {...props} />)

  // mount compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "click" trigger', () => {
    // default checked value has to be false
    expect(Comp.state().checked).toBe(false)

    Comp.find('button').simulate('click') // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(Comp.state().checked).toBe(true)

    Comp.find('button').simulate('click')
    expect(Comp.state().checked).toBe(false)

    // also check if getDerivedStateFromProps sets the state as expected
    Comp.setProps({ checked: true })
    expect(Comp.state().checked).toBe(true)
  })

  it('has "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const Comp = mount(
      <Component on_change={my_event} onChange={myEvent} checked={false} />
    )

    // first click
    Comp.find('button').simulate('click')
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].checked).toBe(true)

    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('checked')
    expect(myEvent.mock.calls[0][0].checked).toBe(true)

    // second click
    Comp.find('button').simulate('click')
    expect(my_event.mock.calls[1][0].checked).toBe(false)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true
    })
    expect(Comp.find('button').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ToggleButton group component', () => {
  // then test the state management
  const Comp = mount(
    <Component.Group label="Label" id="group">
      <Component id="toggle-button-1" text="ToggleButton 1" />
      <Component id="toggle-button-2" text="ToggleButton 2" checked />
    </Component.Group>
  )

  // mount compare the snapshot
  it('have to match group snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has to have correct aria-pressed', () => {
    expect(
      Comp.find('button#toggle-button-2')
        .instance()
        .hasAttribute('aria-pressed')
    ).toBe(true)
  })

  it('has "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const Comp = mount(
      <Component.Group
        id="group"
        on_change={my_event}
        onChange={myEvent}
        value="second"
        data-prop="group-value"
      >
        <Component
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
          data-prop="value-1"
          attributes={{ 'data-attr': 'value' }}
        />
        <Component
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
          data-prop="value-2"
          attributes={{ 'data-attr': 'value' }}
        />
      </Component.Group>
    )

    // first click
    Comp.find('button#toggle-button-1').simulate('click')
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].value).toBe('first')

    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('value')
    expect(myEvent.mock.calls[0][0].value).toBe('first')
    expect(myEvent.mock.calls[0][0].event).toBeType('object')
    expect(myEvent.mock.calls[0][0].event.target.dataset).toMatchObject({
      attr: 'value',
      prop: 'value-1'
    })

    Comp.find('button#toggle-button-2').simulate('click')
    expect(my_event.mock.calls[1][0].value).toBe('second')
    expect(my_event.mock.calls[1][0].event.target.dataset).toMatchObject({
      attr: 'value',
      prop: 'value-2'
    })
  })

  it('has multiselect "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const Comp = mount(
      <Component.Group
        id="group"
        on_change={my_event}
        values={['second']}
        multiselect="true"
      >
        <Component
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
        />
        <Component
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
        />
      </Component.Group>
    )

    // first click
    Comp.find('button#toggle-button-1').simulate('click')

    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0]).toHaveProperty('values')
    expect(my_event.mock.calls[0][0].values).toEqual(['second', 'first'])
    expect(Comp.state().values).toEqual(['second', 'first'])

    // second click
    Comp.find('button#toggle-button-1').simulate('click')
    expect(my_event.mock.calls[1][0].values).toEqual(['second'])
    expect(Comp.state().values).toEqual(['second'])

    // third click
    Comp.find('button#toggle-button-2').simulate('click')
    expect(my_event.mock.calls[2][0].values).toEqual([])
  })

  it('will let their items to be check/uncheck by external state', () => {
    const Items = ({
      fist = { checked: false },
      second = { checked: false }
    }) => (
      <>
        <Component
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
          {...fist}
        />
        <Component
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
          {...second}
        />
      </>
    )

    const Comp = mount(
      <Component.Group id="group" multiselect="true">
        <Items />
      </Component.Group>
    )

    expect(Comp.state().values).toEqual(undefined)

    expect(
      Comp.find('button#toggle-button-2')
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('false')

    Comp.find('button#toggle-button-2').simulate('click')

    expect(
      Comp.find('button#toggle-button-2')
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(
      Comp.find('.dnb-toggle-button--checked').exists(
        'button#toggle-button-2'
      )
    ).toBe(true)

    expect(Comp.state().values).toEqual(['second'])

    Comp.setProps({
      children: <Items second={{ checked: false }} />
    })

    expect(
      Comp.find('button#toggle-button-2')
        .instance()
        .getAttribute('aria-pressed')
    ).toBe('false')
  })
})

describe('ToggleButton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-toggle-button.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-toggle-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
