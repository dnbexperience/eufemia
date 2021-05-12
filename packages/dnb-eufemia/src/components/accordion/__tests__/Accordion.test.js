/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../Accordion'

const props = {}
props.id = 'accordion'
props.variant = 'default'
props.no_animation = true
props.title = 'title'

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
    expect(
      Comp.find('.dnb-accordion__header')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('false')
    Comp.find('.dnb-accordion__header').simulate('click') // we could send inn the event data structure like this: , { target: { expanded: true } }
    expect(Comp.state().expanded).toBe(true)
    expect(
      Comp.find('.dnb-accordion__header')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')
    // Comp.find('.dnb-accordion__header').simulate('click')
    // expect(Comp.state().expanded).toBe(false)
    Comp.setProps({ expanded: false })
    expect(
      Comp.find('.dnb-accordion__header')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('false')
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
      disabled: true,
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

describe('Accordion store API', () => {
  it('will save and read the states for a single accordion', () => {
    const inst = Component.Store('accordion-id')

    inst.saveState(true)
    expect(inst.getState()).toBe(true)
    expect(inst.getData()).toMatchObject({ expanded: true })

    inst.saveState(false)
    expect(inst.getState()).toBe(false)
    expect(inst.getData()).toMatchObject({ expanded: false })

    inst.flush()
    expect(inst.getState()).toBe(null)
    expect(inst.getData()).toBe(null)
  })

  it('will save and read the states for an accordion group', () => {
    const inst = Component.Group.Store('group-id')

    inst.saveState(true, 'remembered-state-2')
    expect(inst.getState('remembered-state-2')).toBe(true)
    expect(inst.getData()).toMatchObject({ id: 'remembered-state-2' })

    inst.saveState(false, 'remembered-state-2', { force: true })
    expect(inst.getState('remembered-state-2')).toBe(false)
    expect(inst.getData()).toMatchObject({ id: null })

    inst.flush('remembered-state-2')
    expect(inst.getState('remembered-state-2')).toBe(null)
    expect(inst.getData()).toBe(null)
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
  })
})

describe('Accordion container component', () => {
  class DidRender extends React.PureComponent {
    state = { mounted: false }
    componentDidMount() {
      this.setState({ mounted: true })
    }
    render() {
      return <div id={this.props.id}>{String(this.state.mounted)}</div>
    }
  }

  const Increment = () => {
    const [count, setCount] = React.useState(1)
    return (
      <button id="increment" onClick={() => setCount((s) => s + 1)}>
        {count}
      </button>
    )
  }

  const Comp = mount(
    <>
      <Increment />
      <Component.Group
        label="Label"
        id="container"
        single_container
        prevent_rerender
        remember_state
      >
        <Component id="accordion-1" title="Accordion 1">
          Accordion 1
          <DidRender id="mounted-1" />
        </Component>
        <Component id="accordion-2" title="Accordion 2" expanded={true}>
          Accordion 2
          <DidRender id="mounted-2" />
        </Component>
        <Component id="accordion-3" title="Accordion 3">
          Accordion 3
          <DidRender id="mounted-3" />
        </Component>
      </Component.Group>
    </>
  )

  it('has only to render the expanded accordion content', () => {
    expect(Comp.find('button#increment').text()).toBe('1')
    Comp.find('button#increment').simulate('click')
    expect(Comp.find('button#increment').text()).toBe('2')

    expect(Comp.find('div#mounted-1').exists()).toBe(false)
    expect(Comp.find('div#mounted-2').text()).toBe('true')
    expect(Comp.find('div#mounted-3').exists()).toBe(false)
    expect(
      Comp.find('#accordion-2')
        .find('.dnb-accordion__header')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')

    Comp.find('#accordion-1')
      .find('.dnb-accordion__header')
      .simulate('click')

    Comp.find('button#increment').simulate('click')
    expect(Comp.find('button#increment').text()).toBe('3')

    expect(Comp.find('div#mounted-1').text()).toBe('true')
    expect(Comp.find('div#mounted-2').text()).toBe('true')
    expect(Comp.find('div#mounted-3').exists()).toBe(false)

    Comp.find('#accordion-2')
      .find('.dnb-accordion__header')
      .simulate('click')

    Comp.find('button#increment').simulate('click')
    expect(Comp.find('button#increment').text()).toBe('4')

    expect(Comp.find('div#mounted-3').exists()).toBe(false)

    Comp.find('#accordion-3')
      .find('.dnb-accordion__header')
      .simulate('click')

    Comp.find('button#increment').simulate('click')
    expect(Comp.find('button#increment').text()).toBe('5')

    expect(Comp.find('div#mounted-3').text()).toBe('true')
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
