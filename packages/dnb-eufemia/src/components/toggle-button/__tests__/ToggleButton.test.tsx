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
import Component from '../ToggleButton'

const props = fakeProps(require.resolve('../ToggleButton'), {
  optional: true,
})
props.id = 'toggle-button'
props.status = null
props.icon_position = 'left'
props.label_direction = 'horizontal'
props.variant = 'checkbox'
props.readOnly = false
props.global_status_id = 'main'

describe('ToggleButton component', () => {
  // mount compare the snapshot
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} />)

    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "click" trigger', () => {
    const Comp = mount(<Component {...props} />)

    // default checked value has to be false
    expect(
      Comp.find('.dnb-checkbox__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('false')

    Comp.find('button').simulate('click') // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(
      Comp.find('.dnb-checkbox__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('true')

    Comp.find('button').simulate('click')
    expect(
      Comp.find('.dnb-checkbox__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('false')

    // also check if getDerivedStateFromProps sets the state as expected
    Comp.setProps({ checked: true })
    expect(
      Comp.find('.dnb-checkbox__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('true')
  })

  it('has correct variant', () => {
    const Comp = mount(<Component variant="checkbox" checked={false} />)

    // default checked value has to be false
    expect(
      Comp.find('.dnb-checkbox__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('false')

    Comp.find('button').simulate('click') // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(
      Comp.find('.dnb-checkbox__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('true')
    expect(Comp.find('.dnb-checkbox__button').exists()).toBe(true)

    Comp.setProps({
      variant: 'radio',
    })

    expect(Comp.find('.dnb-radio__button').exists()).toBe(true)
    expect(
      Comp.find('.dnb-radio__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('true')

    Comp.find('button').simulate('click') // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(
      Comp.find('.dnb-radio__input')
        .instance()
        .getAttribute('data-checked')
    ).toBe('false')
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

  it('does handle controlled vs uncontrolled state properly', () => {
    const ControlledVsUncontrolled = () => {
      const [checked, setChecked] = React.useState(true)
      const [random, setRandom] = React.useState(null)

      return (
        <>
          <Component
            {...props}
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
      expect(
        Comp.find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('true')
      expect(
        Comp.find('button.dnb-toggle-button__button')
          .instance()
          .getAttribute('aria-pressed')
      ).toBe('true')

      // change it to false
      Comp.find('button.dnb-toggle-button__button').simulate('click')
      expect(
        Comp.find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('false')
      expect(
        Comp.find('button.dnb-toggle-button__button')
          .instance()
          .getAttribute('aria-pressed')
      ).toBe('false')

      // set it to true
      Comp.find('button#set-state').simulate('click')
      expect(
        Comp.find('button.dnb-toggle-button__button')
          .instance()
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(
        Comp.find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('true')

      // reset it with undefined to false
      Comp.find('button#reset-undefined').simulate('click')
      expect(
        Comp.find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('false')

      // set it to true + reset it with null to false
      Comp.find('button#set-state').simulate('click')
      Comp.find('button#reset-null').simulate('click')
      expect(
        Comp.find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('false')

      // re-render + still false
      Comp.find('button#rerender').simulate('click')
      expect(
        Comp.find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('false')
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
    expect(Comp.find('button').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should support spacing props', () => {
    render(<Component top="2rem" />)

    const element = document.querySelector('.dnb-toggle-button')

    expect(Array.from(element.classList)).toEqual([
      'dnb-toggle-button',
      'dnb-space__top--large',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component label="Label" />
      </FormRow>
    )

    const element = document.querySelector('.dnb-toggle-button')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-toggle-button',
      'dnb-toggle-button--vertical',
    ])
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ToggleButton group component', () => {
  // then test the state management
  const Comp = mount(
    <Component.Group label="Label" id="group">
      <Component
        id="toggle-button-1"
        text="ToggleButton 1"
        variant="radio"
      />
      <Component
        id="toggle-button-2"
        text="ToggleButton 2"
        variant="radio"
        checked
      />
    </Component.Group>
  )

  // mount compare the snapshot
  it('have to match group snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has to have variant="radio', () => {
    expect(Comp.find('.dnb-radio__button').exists()).toBe(true)
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
      prop: 'value-1',
    })

    Comp.find('button#toggle-button-2').simulate('click')
    expect(my_event.mock.calls[1][0].value).toBe('second')
    expect(my_event.mock.calls[1][0].event.target.dataset).toMatchObject({
      attr: 'value',
      prop: 'value-2',
    })
  })

  it('has multiselect "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const Comp = mount(
      <Component.Group
        id="group"
        on_change={my_event}
        values={['second']}
        multiselect={true}
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

  it('can be changed from props', () => {
    const GroupOf = () => {
      const [values, setValues] = React.useState(['second'])

      const selectAll = () => setValues(['first', 'second'])
      const deselectAll = () => setValues([])

      return (
        <>
          <button id="select-all" onClick={selectAll}>
            select
          </button>
          <button id="deselect-all" onClick={deselectAll}>
            deselect
          </button>
          <Component.Group id="group" multiselect values={values}>
            <Component
              variant="checkbox"
              id="toggle-button-1"
              text="ToggleButton 1"
              value="first"
            />
            <Component
              variant="checkbox"
              id="toggle-button-2"
              text="ToggleButton 2"
              value="second"
            />
          </Component.Group>
        </>
      )
    }

    const Comp = mount(<GroupOf />)

    const first = Comp.find('button#toggle-button-1')
    const second = Comp.find('button#toggle-button-2')

    expect(first.instance().getAttribute('aria-pressed')).toBe('false')
    expect(second.instance().getAttribute('aria-pressed')).toBe('true')

    Comp.find('button#select-all').simulate('click')

    expect(first.instance().getAttribute('aria-pressed')).toBe('true')
    expect(second.instance().getAttribute('aria-pressed')).toBe('true')

    Comp.find('button#deselect-all').simulate('click')

    expect(first.instance().getAttribute('aria-pressed')).toBe('false')
    expect(second.instance().getAttribute('aria-pressed')).toBe('false')
  })

  it('will let their items to be check/uncheck by its siblings', () => {
    const Comp = mount(
      <Component.Group id="group" multiselect={true}>
        <Component
          variant="checkbox"
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
        />
        <Component
          variant="checkbox"
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
        />
      </Component.Group>
    )

    expect(Comp.state().values).toEqual(undefined)

    const TestButton = (Comp, id) => {
      const sel = `button#${id}`

      expect(
        Comp.find(sel)
          .find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('false')

      Comp.find(sel).simulate('click')

      expect(
        Comp.find(sel)
          .find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('true')
      expect(Comp.find(sel).instance().getAttribute('aria-pressed')).toBe(
        'true'
      )

      Comp.find(sel).simulate('click')

      expect(Comp.find(sel).instance().getAttribute('aria-pressed')).toBe(
        'false'
      )
      expect(Comp.find('.dnb-toggle-button--checked').exists(sel)).toBe(
        false
      )
      expect(
        Comp.find(sel)
          .find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('false')

      Comp.find(sel).simulate('click')
      expect(
        Comp.find(sel)
          .find('.dnb-checkbox__input')
          .instance()
          .getAttribute('data-checked')
      ).toBe('true')
    }

    TestButton(Comp, 'toggle-button-1')
    expect(Comp.state().values).toEqual(['first'])

    TestButton(Comp, 'toggle-button-2')
    expect(Comp.state().values).toEqual(['first', 'second'])
  })

  it('should support spacing props', () => {
    render(
      <Component.Group id="group" top="2rem">
        <Component
          variant="checkbox"
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
        />
        <Component
          variant="checkbox"
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
        />
      </Component.Group>
    )

    const element = document.querySelector('.dnb-toggle-button-group')

    expect(Array.from(element.classList)).toEqual([
      'dnb-toggle-button-group',
      'dnb-toggle-button-group--row',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-toggle-button-group--no-label',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component.Group id="group" label="Label">
          <Component
            variant="checkbox"
            id="toggle-button-1"
            text="ToggleButton 1"
            value="first"
          />
          <Component
            variant="checkbox"
            id="toggle-button-2"
            text="ToggleButton 2"
            value="second"
          />
        </Component.Group>
      </FormRow>
    )

    const element = document.querySelector('.dnb-toggle-button-group')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-toggle-button-group',
      'dnb-toggle-button-group--row',
      'dnb-form-component',
      'dnb-form-row--vertical-label',
    ])
    expect(
      Array.from(
        document.querySelector('.dnb-toggle-button-group .dnb-form-row')
          .classList
      )
    ).toEqual([
      'dnb-section',
      'dnb-section--transparent',
      'dnb-form-row',
      'dnb-form-row--vertical',
      'dnb-form-row--vertical-label',
      'dnb-form-row--nested',
    ])
    expect(
      Array.from(document.querySelector('.dnb-form-row').classList)
    ).toEqual([
      'dnb-section',
      'dnb-section--transparent',
      'dnb-form-row',
      'dnb-form-row--vertical',
      'dnb-form-row--vertical-label',
    ])
  })
})

describe('ToggleButton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-toggle-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
