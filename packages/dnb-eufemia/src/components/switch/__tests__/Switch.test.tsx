/**
 * Switch Test
 *
 */

import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Switch, { SwitchProps } from '../Switch'
import { Provider } from '../../../shared'

const props: SwitchProps = {
  title: 'title',
  label: 'label',
}

describe('Switch component', () => {
  it('has correct state after "change" trigger', () => {
    const { rerender } = render(<Switch {...props} />)
    // default checked value has to be false
    expect(document.querySelector('input').checked).toBe(false)

    fireEvent.click(document.querySelector('input')) // we could send inn the event data structure like this: , { target: { checked: true } }
    expect(document.querySelector('input').checked).toBe(true)

    fireEvent.click(document.querySelector('input'))
    expect(document.querySelector('input').checked).toBe(false)

    // also check if getDerivedStateFromProps sets the state as expected
    rerender(<Switch {...props} checked={true} />)
    fireEvent.click(document.querySelector('input'))
    expect(document.querySelector('input').checked).toBe(false)

    const value = 'new value'
    rerender(<Switch {...props} checked={false} value={value} />)
    fireEvent.click(document.querySelector('input'))
    expect(document.querySelector('input').value).toBe(value)
  })

  it('has "on_change" event which will trigger on a input change', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <Switch on_change={my_event} onChange={myEvent} checked={false} />
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
          <Switch
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

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Switch />)
    rerender(<Switch disabled={true} />)
    expect(document.querySelector('input[disabled]')).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(<Switch top="2rem" />)

    const element = document.querySelector('.dnb-switch')

    expect(Array.from(element.classList)).toEqual([
      'dnb-switch',
      'dnb-switch--label-position-right',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Switch label="Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-switch')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )
    const inputElement = document.querySelector('.dnb-switch input')
    const inputAttributes = Array.from(inputElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(inputAttributes).toEqual([
      'id',
      'name',
      'type',
      'role',
      'aria-checked',
      'class',
      'value',
    ])
    expect(Array.from(element.classList)).toEqual([
      'dnb-switch',
      'dnb-switch--label-position-right',
      'dnb-form-component',
    ])
    expect(Array.from(inputElement.classList)).toEqual([
      'dnb-switch__input',
    ])
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Switch {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <Switch {...props} innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.classList).toContain('dnb-switch__input')
  })

  it('gets valid element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLInputElement> = React.createRef()

    const refFn = (elem: HTMLInputElement) => {
      ref.current = elem
    }

    render(<Switch id="unique" innerRef={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.classList).toContain('dnb-switch__input')
  })
})

describe('Switch scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-switch-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
