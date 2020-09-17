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
import Component from '../Accordion'

const props = fakeProps(require.resolve('../Accordion'), {
  optional: true
})
props.id = 'accordion'
props.variant = 'default'
props.no_animation = true
props.remember_state = false
props.expanded_ssr = false
props.heading = null
props.element = null

describe('Accordion component', () => {
  // then test the state management
  const Comp = mount(<Component {...props} />)

  // mount compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "click" trigger', () => {
    // default expanded value has to be false
    expect(Comp.state().expanded).toBe(false)
    Comp.find('.dnb-accordion__header').simulate('click') // we could send inn the event data structure like this: , { target: { expanded: true } }
    expect(Comp.state().expanded).toBe(true)
    // Comp.find('.dnb-accordion__header').simulate('click')
    // expect(Comp.state().expanded).toBe(false)
    Comp.setProps({ expanded: false })
    expect(Comp.state().expanded).toBe(false)
  })

  it('has "on_change" event which will trigger on click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const Comp = mount(
      <Component
        on_change={my_event}
        onChange={myEvent}
        expanded={false}
      />
    )
    // first click
    Comp.find('.dnb-accordion__header').simulate('click')
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].expanded).toBe(true)
    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('expanded')
    expect(myEvent.mock.calls[0][0].expanded).toBe(true)
    // second click
    Comp.find('.dnb-accordion__header').simulate('click')
    expect(my_event.mock.calls[1][0].expanded).toBe(false)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('.dnb-accordion__header')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Accordion group component', () => {
  const Comp = mount(
    <Component.Group label="Label" expanded id="group">
      <Component id="accordion-1" title="Accordion 1">
        Accordion 1
      </Component>
      <Component id="accordion-2" title="Accordion 2" expanded={false}>
        Accordion 2
      </Component>
    </Component.Group>
  )
  it('has to have correct aria-pressed', () => {
    expect(
      Comp.find('#accordion-1').exists('.dnb-accordion__content--hidden')
    ).toBe(false)
    expect(
      Comp.find('#accordion-2').exists('.dnb-accordion__content--hidden')
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
          id="accordion-1"
          text="Accordion 1"
          value="first"
          data-prop="value-1"
          attributes={{ 'data-attr': 'value' }}
        />
        <Component
          id="accordion-2"
          text="Accordion 2"
          value="second"
          data-prop="value-2"
          attributes={{ 'data-attr': 'value' }}
        />
      </Component.Group>
    )

    Comp.find('#accordion-1')
      .find('.dnb-accordion__header')
      .simulate('click')
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].id).toBe('accordion-1')
    expect(my_event.mock.calls[0][0].expanded).toBe(true)
    expect(myEvent.mock.calls.length).toBe(1)

    Comp.find('#accordion-2')
      .find('.dnb-accordion__header')
      .at(0)
      .simulate('click')
    expect(my_event.mock.calls[1][0].id).toBe('accordion-2')
    expect(my_event.mock.calls[1][0].expanded).toBe(true)

    Comp.find('#accordion-1')
      .find('.dnb-accordion__header')
      .at(0)
      .simulate('click')
    expect(my_event.mock.calls[2][0].expanded).toBe(true)

    // expect(Comp.state().expanded).toBe(false)
  })
})

describe('Accordion scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-accordion.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-accordion-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
