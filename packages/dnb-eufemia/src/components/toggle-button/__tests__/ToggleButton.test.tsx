/**
 * ToggleButton Test
 *
 */

import { fireEvent, render, cleanup } from '@testing-library/react'
import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import ToggleButton, { ToggleButtonProps } from '../ToggleButton'
import { Provider } from '../../../shared'

const props: ToggleButtonProps = {
  variant: 'checkbox',
  title: 'title',
  label: 'label',
}

describe('ToggleButton component', () => {
  it('has correct state after "click" trigger', () => {
    const { rerender } = render(<ToggleButton {...props} />)

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
    rerender(<ToggleButton {...props} checked={true} />)
    expect(
      document
        .querySelector('.dnb-checkbox__input')
        .getAttribute('data-checked')
    ).toBe('true')
  })

  it('has correct variant', () => {
    const { rerender } = render(
      <ToggleButton variant="checkbox" checked={false} />
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
    expect(
      document.querySelector('.dnb-checkbox__button')
    ).toBeInTheDocument()

    rerender(<ToggleButton variant="radio" checked={false} />)

    expect(
      document.querySelector('.dnb-radio__button')
    ).toBeInTheDocument()
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
      <ToggleButton
        on_change={my_event}
        onChange={myEvent}
        checked={false}
      />
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
          <ToggleButton
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
    const { rerender } = render(<ToggleButton />)
    rerender(<ToggleButton disabled={true} />)
    expect(document.querySelector('button[disabled]')).toBeInTheDocument()
  })

  it('should support enter key', () => {
    const onChange = jest.fn()
    render(<ToggleButton on_change={onChange} />)

    const element = document.querySelector('button')

    fireEvent.keyDown(element, { keyCode: 13 }) // enter
    expect(onChange).toHaveBeenCalledTimes(1)

    fireEvent.keyUp(element, { keyCode: 13 }) // enter
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('should support spacing props', () => {
    render(<ToggleButton top="2rem" />)

    const element = document.querySelector('.dnb-toggle-button')

    expect(Array.from(element.classList)).toEqual([
      'dnb-toggle-button',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <ToggleButton label="Label" />
      </Provider>
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
    const Comp = render(<ToggleButton {...props} />)

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ToggleButton group component', () => {
  it('should support vertical label', () => {
    const { rerender } = render(
      <ToggleButton.Group label="Label" vertical>
        <ToggleButton />
      </ToggleButton.Group>
    )

    const element = document.querySelector('.dnb-toggle-button-group')
    const flexElement = element.querySelector('.dnb-flex-container')

    expect(Array.from(flexElement.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-baseline',
      'dnb-flex-container--spacing-x-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])

    rerender(
      <ToggleButton.Group label="Label" label_direction="vertical">
        <ToggleButton />
      </ToggleButton.Group>
    )

    expect(Array.from(flexElement.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-baseline',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('has to have variant="radio', () => {
    render(
      <ToggleButton.Group label="Label" id="group">
        <ToggleButton
          id="toggle-button-1"
          text="ToggleButton 1"
          variant="radio"
        />
        <ToggleButton
          id="toggle-button-2"
          text="ToggleButton 2"
          variant="radio"
          checked
        />
      </ToggleButton.Group>
    )
    expect(
      document.querySelector('.dnb-radio__button')
    ).toBeInTheDocument()
  })

  it('has to have correct aria-pressed', () => {
    render(
      <ToggleButton.Group label="Label" id="group">
        <ToggleButton
          id="toggle-button-1"
          text="ToggleButton 1"
          variant="radio"
        />
        <ToggleButton
          id="toggle-button-2"
          text="ToggleButton 2"
          variant="radio"
          checked
        />
      </ToggleButton.Group>
    )
    expect(
      document.querySelector('button#toggle-button-2')
    ).toHaveAttribute('aria-pressed')
  })

  it('has "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <ToggleButton.Group
        id="group"
        on_change={my_event}
        onChange={myEvent}
        value="second"
        data-prop="group-value"
      >
        <ToggleButton
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
          data-prop="value-1"
          attributes={{ 'data-attr': 'value' }}
        />
        <ToggleButton
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
          data-prop="value-2"
          attributes={{ 'data-attr': 'value' }}
        />
      </ToggleButton.Group>
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
      <ToggleButton.Group
        id="group"
        on_change={my_event}
        values={['second']}
        multiselect={true}
      >
        <ToggleButton
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
        />
        <ToggleButton
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
        />
      </ToggleButton.Group>
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
          <ToggleButton.Group id="group" multiselect values={values}>
            <ToggleButton
              variant="checkbox"
              id="toggle-button-1"
              text="ToggleButton 1"
              value="first"
            />
            <ToggleButton
              variant="checkbox"
              id="toggle-button-2"
              text="ToggleButton 2"
              value="second"
            />
          </ToggleButton.Group>
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
        <ToggleButton.Group id="group" multiselect={true}>
          <ToggleButton
            variant="checkbox"
            id="toggle-button-1"
            text="ToggleButton 1"
            value="first"
          />
          <ToggleButton
            variant="checkbox"
            id="toggle-button-2"
            text="ToggleButton 2"
            value="second"
          />
        </ToggleButton.Group>
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
      ).not.toBeInTheDocument()
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
      <ToggleButton.Group id="group" top="2rem">
        <ToggleButton
          variant="checkbox"
          id="toggle-button-1"
          text="ToggleButton 1"
          value="first"
        />
        <ToggleButton
          variant="checkbox"
          id="toggle-button-2"
          text="ToggleButton 2"
          value="second"
        />
      </ToggleButton.Group>
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

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <ToggleButton.Group id="group" label="Label">
          <ToggleButton
            variant="checkbox"
            id="toggle-button-1"
            text="ToggleButton 1"
            value="first"
          />
          <ToggleButton
            variant="checkbox"
            id="toggle-button-2"
            text="ToggleButton 2"
            value="second"
          />
        </ToggleButton.Group>
      </Provider>
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
    ])
    expect(
      Array.from(
        document.querySelector(
          '.dnb-toggle-button-group .dnb-flex-container'
        ).classList
      )
    ).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-baseline',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
    expect(
      Array.from(document.querySelector('.dnb-flex-container').classList)
    ).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-baseline',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <ToggleButton.Group label="Label" id="group">
        <ToggleButton
          id="toggle-button-1"
          text="ToggleButton 1"
          variant="radio"
        />
        <ToggleButton
          id="toggle-button-2"
          text="ToggleButton 2"
          variant="radio"
          checked
        />
      </ToggleButton.Group>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ToggleButton scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-toggle-button-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
