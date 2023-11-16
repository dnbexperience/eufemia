/**
 * Radio Test
 *
 */

import { fireEvent, render, cleanup } from '@testing-library/react'
import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Radio, { RadioProps } from '../Radio'
import { Provider } from '../../../shared'

const props: RadioProps = {
  label: 'label',
}

describe('Radio component', () => {
  it('has correct state after "change" trigger', () => {
    const { rerender } = render(<Radio {...props} />)
    // default checked value has to be false
    expect(document.querySelector('input').checked).toBe(false)

    fireEvent.click(document.querySelector('input'))
    expect(document.querySelector('input').checked).toBe(true)

    fireEvent.click(document.querySelector('input'))
    expect(document.querySelector('input').checked).toBe(false)

    // also check if getDerivedStateFromProps sets the state as expected
    rerender(<Radio {...props} checked />)
    expect(document.querySelector('input').checked).toBe(true)

    const value = 'new value'
    rerender(<Radio {...props} checked value={value} />)
    expect(document.querySelector('input').getAttribute('value')).toBe(
      value
    )
  })

  it('has "on_change" event which will trigger on a input change', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <Radio
        on_change={my_event}
        onChange={myEvent}
        checked={false}
        group={null}
      />
    )
    fireEvent.click(document.querySelector('input'))
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
          <Radio
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
      fireEvent.click(document.querySelector('button#set-state'))
      expect(document.querySelector('input').checked).toBe(true)

      // change it to false
      fireEvent.click(document.querySelector('input'))
      expect(document.querySelector('input').checked).toBe(false)

      // set it to true
      fireEvent.click(document.querySelector('button#set-state'))
      expect(document.querySelector('input').checked).toBe(true)

      // reset it with undefined to false
      fireEvent.click(document.querySelector('button#reset-undefined'))
      expect(document.querySelector('input').checked).toBe(false)

      // set it to true + reset it with null to false
      fireEvent.click(document.querySelector('button#set-state'))
      fireEvent.click(document.querySelector('button#reset-null'))
      expect(document.querySelector('input').checked).toBe(false)

      // re-render + still false
      fireEvent.click(document.querySelector('button#rerender'))
      expect(document.querySelector('input').checked).toBe(false)

      cleanup()
    }

    TestStates(<ControlledVsUncontrolled />)
    TestStates(
      <React.StrictMode>
        <ControlledVsUncontrolled />
      </React.StrictMode>
    )
  })

  it('will disable a single button', () => {
    const { rerender } = render(<Radio disabled />)

    expect(document.querySelector('input[disabled]')).toBeInTheDocument()

    rerender(<Radio disabled={false} />)

    expect(
      document.querySelector('input[disabled]')
    ).not.toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(<Radio top="2rem" />)

    const element = document.querySelector('.dnb-radio')

    expect(Array.from(element.classList)).toEqual([
      'dnb-radio',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ vertical: true, disabled: true }}>
        <Radio label="Label" aria-label="Aria Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-radio')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )
    const inputElement = document.querySelector('.dnb-radio input')
    const inputAttributes = Array.from(inputElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(inputAttributes).toEqual([
      'type',
      'id',
      'class',
      'aria-checked',
      'disabled',
      'role',
      'aria-label',
      'value',
    ])
    expect(Array.from(element.classList)).toEqual([
      'dnb-radio',
      'dnb-radio--label-position-right',
    ])
  })
})

describe('Radio group component', () => {
  it('has to set correct value using keys', () => {
    const my_event = jest.fn()
    render(
      <Radio.Group
        label="Label"
        name="group"
        id="group"
        on_change={my_event}
      >
        <Radio id="radio-1" label="Radio 1" value="first" />
        <Radio id="radio-2" label="Radio 2" value="second" checked />
      </Radio.Group>
    )
    fireEvent.click(document.querySelectorAll('input')[0])
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].value).toBe('first')

    fireEvent.click(document.querySelectorAll('input')[1])
    expect(my_event.mock.calls.length).toBe(2)
    expect(my_event.mock.calls[1][0].value).toBe('second')
  })

  it('will disable a single button within a group', () => {
    render(
      <Radio.Group>
        <Radio disabled />
      </Radio.Group>
    )

    expect(document.querySelector('input[disabled]')).toBeInTheDocument()
  })

  it('will disable a single button, defined in the group', () => {
    render(
      <Radio.Group disabled>
        <Radio />
      </Radio.Group>
    )

    expect(document.querySelector('input[disabled]')).toBeInTheDocument()
  })

  it('will overwrite "disable" state, defined in the group', () => {
    render(
      <Radio.Group disabled>
        <Radio disabled={false} />
        <Radio disabled />
      </Radio.Group>
    )

    expect(document.querySelectorAll('input')[0]).not.toHaveAttribute(
      'disabled'
    )
    expect(document.querySelectorAll('input')[1]).toHaveAttribute(
      'disabled'
    )
  })

  it('should support spacing props', () => {
    render(
      <Radio.Group top="2rem">
        <Radio id="radio-1" label="Radio 1" value="first" />
        <Radio id="radio-2" label="Radio 2" value="second" checked />
      </Radio.Group>
    )

    const element = document.querySelector('.dnb-radio-group')

    expect(Array.from(element.classList)).toEqual([
      'dnb-radio-group',
      'dnb-radio-group--row',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Radio.Group label="Label" name="group" id="group">
          <Radio id="radio-1" label="Radio 1" value="first" />
          <Radio id="radio-2" label="Radio 2" value="second" checked />
        </Radio.Group>
      </Provider>
    )

    const element = document.querySelector('.dnb-radio-group')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-radio-group',
      'dnb-radio-group--row',
      'dnb-form-component',
    ])
    expect(
      Array.from(
        document.querySelector('.dnb-radio-group .dnb-flex-container')
          .classList
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

  it('should support vertical label', () => {
    const { rerender } = render(
      <Radio.Group label="Label" vertical>
        <Radio />
      </Radio.Group>
    )

    const element = document.querySelector('.dnb-radio-group')
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
      <Radio.Group label="Label" label_direction="vertical">
        <Radio />
      </Radio.Group>
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
})

describe('Radio ARIA', () => {
  it('should validate with ARIA rules for Radio', async () => {
    const Comp = render(<Radio {...props} />)
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

  it('should validate with ARIA rules for Radio.Group', async () => {
    const Comp = render(
      <Radio.Group
        label="Label"
        name="group"
        id="group"
        on_change={jest.fn()}
      >
        <Radio id="radio-1" label="Radio 1" value="first" />
        <Radio id="radio-2" label="Radio 2" value="second" checked />
      </Radio.Group>
    )
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

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <Radio {...props} innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.classList).toContain('dnb-radio__input')
  })
})

describe('Radio scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-radio-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
