/**
 * Component Test
 *
 */

import { fireEvent, render, cleanup } from '@testing-library/react'
import React from 'react'
import {
  fakeProps,
  axeComponent,
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
props.globalStatus = { id: 'main' }

describe('ToggleButton component', () => {
  it('has correct state after "click" trigger', () => {
    const { rerender } = render(<Component {...props} />)

    // default checked value has to be false
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('false')

    fireEvent.click(document.querySelector('button')) // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('true')

    fireEvent.click(document.querySelector('button'))
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('false')

    // also check if getDerivedStateFromProps sets the state as expected
    rerender(<Component {...props} checked={true} />)
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('true')
  })

  it('has correct variant', () => {
    const { rerender } = render(
      <Component variant="checkbox" checked={false} />
    )

    // default checked value has to be false
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('false')

    fireEvent.click(document.querySelector('button')) // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('true')
    expect(document.querySelector('.dnb-checkbox__button')).toBeTruthy()

    rerender(<Component variant="radio" checked={false} />)

    expect(document.querySelector('.dnb-radio__button')).toBeTruthy()
    expect(
      document
        .querySelector('.dnb-radio__input')
        .getAttribute('data-checked')
    ).toBe('true')

    fireEvent.click(document.querySelector('button')) // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(
      document
        .querySelector('.dnb-radio__input')
        .getAttribute('data-checked')
    ).toBe('false')
  })

  it('has "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <Component on_change={my_event} onChange={myEvent} checked={false} />
    )

    // first click
    fireEvent.click(document.querySelector('button'))
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].checked).toBe(true)

    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('checked')
    expect(myEvent.mock.calls[0][0].checked).toBe(true)

    // second click
    fireEvent.click(document.querySelector('button'))
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
      render(Comp)
      // re-render + default state is true
      fireEvent.click(document.querySelector('button#rerender'))
      expect(
        document
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('true')
      expect(
        document
          .querySelector('button.dnb-toggle-button__button')
          .getAttribute('aria-pressed')
      ).toBe('true')

      // change it to false
      fireEvent.click(
        document.querySelector('button.dnb-toggle-button__button')
      )
      expect(
        document
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('false')
      expect(
        document
          .querySelector('button.dnb-toggle-button__button')
          .getAttribute('aria-pressed')
      ).toBe('false')

      // set it to true
      fireEvent.click(document.querySelector('button#set-state'))
      expect(
        document
          .querySelector('button.dnb-toggle-button__button')
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(
        document
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('true')

      // reset it with undefined to false
      fireEvent.click(document.querySelector('button#reset-undefined'))
      expect(
        document
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('false')

      // set it to true + reset it with null to false
      fireEvent.click(document.querySelector('button#set-state'))
      fireEvent.click(document.querySelector('button#reset-null'))
      expect(
        document
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('false')

      // re-render + still false
      fireEvent.click(document.querySelector('button#rerender'))
      expect(
        document
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('false')

      cleanup()
    }

    TestStates(<ControlledVsUncontrolled />)
    TestStates(
      <React.StrictMode>
        <ControlledVsUncontrolled />
      </React.StrictMode>
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Component />)
    rerender(<Component disabled={true} />)
    expect(document.querySelector('button[disabled]')).toBeTruthy()
  })

  it('should support enter key', () => {
    const onChange = jest.fn()
    render(<Component on_change={onChange} />)

    const element = document.querySelector('button')

    fireEvent.keyDown(element, { keyCode: 13 }) // enter
    expect(onChange).toHaveBeenCalledTimes(1)

    fireEvent.keyUp(element, { keyCode: 13 }) // enter
    expect(onChange).toHaveBeenCalledTimes(2)
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
    const Comp = render(<Component {...props} />)

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ToggleButton group component', () => {
  it('has to have variant="radio', () => {
    render(
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
    expect(document.querySelector('.dnb-radio__button')).toBeTruthy()
  })

  it('has to have correct aria-pressed', () => {
    render(
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
    expect(
      document
        .querySelector('button#toggle-button-2')
        .hasAttribute('aria-pressed')
    ).toBe(true)
  })

  it('has "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
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
    fireEvent.click(document.querySelector('button#toggle-button-1'))
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

    fireEvent.click(document.querySelector('button#toggle-button-2'))
    expect(my_event.mock.calls[1][0].value).toBe('second')
    expect(my_event.mock.calls[1][0].event.target.dataset).toMatchObject({
      attr: 'value',
      prop: 'value-2',
    })
  })

  it('has multiselect "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    render(
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
    fireEvent.click(document.querySelector('button#toggle-button-1'))

    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0]).toHaveProperty('values')
    expect(my_event.mock.calls[0][0].values).toEqual(['second', 'first'])
    expect(
      document
        .querySelector('#toggle-button-1')
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(
      document
        .querySelector('#toggle-button-2')
        .getAttribute('aria-pressed')
    ).toBe('true')

    // second click
    fireEvent.click(document.querySelector('button#toggle-button-1'))
    expect(my_event.mock.calls[1][0].values).toEqual(['second'])
    expect(
      document
        .querySelector('#toggle-button-1')
        .getAttribute('aria-pressed')
    ).toBe('false')
    expect(
      document
        .querySelector('#toggle-button-2')
        .getAttribute('aria-pressed')
    ).toBe('true')

    // third click
    fireEvent.click(document.querySelector('button#toggle-button-2'))
    expect(my_event.mock.calls[2][0].values).toEqual([])
    expect(
      document
        .querySelector('#toggle-button-1')
        .getAttribute('aria-pressed')
    ).toBe('false')
    expect(
      document
        .querySelector('#toggle-button-2')
        .getAttribute('aria-pressed')
    ).toBe('false')
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

    render(<GroupOf />)

    const first = document.querySelector('button#toggle-button-1')
    const second = document.querySelector('button#toggle-button-2')

    expect(first.getAttribute('aria-pressed')).toBe('false')
    expect(second.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(document.querySelector('button#select-all'))

    expect(first.getAttribute('aria-pressed')).toBe('true')
    expect(second.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(document.querySelector('button#deselect-all'))

    expect(first.getAttribute('aria-pressed')).toBe('false')
    expect(second.getAttribute('aria-pressed')).toBe('false')
  })

  it('will let their items to be check/uncheck by its siblings', () => {
    const TestComp = () => {
      return (
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
    }

    const TestButton = (Comp, id) => {
      render(Comp)

      const sel = `button#${id}`

      expect(
        document
          .querySelector(sel)
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('false')

      fireEvent.click(document.querySelector(sel))
      expect(
        document
          .querySelector(sel)
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('true')
      expect(
        document.querySelector(sel).getAttribute('aria-pressed')
      ).toBe('true')

      fireEvent.click(document.querySelector(sel))
      expect(
        document.querySelector(sel).getAttribute('aria-pressed')
      ).toBe('false')
      expect(
        document.querySelector('.dnb-toggle-button--checked')
      ).toBeFalsy()
      expect(
        document
          .querySelector(sel)
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('false')

      fireEvent.click(document.querySelector(sel))
      expect(
        document
          .querySelector(sel)
          .querySelector('.dnb-checkbox__input')
          .getAttribute('data-checked')
      ).toBe('true')

      cleanup()
    }

    TestButton(<TestComp />, 'toggle-button-1')

    TestButton(<TestComp />, 'toggle-button-2')
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

  it('should validate with ARIA rules', async () => {
    const Comp = render(
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
    expect(await axeComponent(Comp)).toHaveNoViolations()
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
