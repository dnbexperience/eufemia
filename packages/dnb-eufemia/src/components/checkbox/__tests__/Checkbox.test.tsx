/**
 * Checkbox Test
 *
 */

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Checkbox, { CheckboxProps } from '../Checkbox'
import { Provider } from '../../../shared'

const props: CheckboxProps = {
  label: 'checkbox',
}

describe('Checkbox component', () => {
  it('has correct state after "change" trigger', () => {
    const { rerender } = render(<Checkbox {...props} />)

    // default checked value has to be false
    expect(
      (screen.getByRole('checkbox') as HTMLInputElement).checked
    ).toBe(false)

    screen.getByRole('checkbox').click()
    expect(
      (screen.getByRole('checkbox') as HTMLInputElement).checked
    ).toBe(true)

    screen.getByRole('checkbox').click()
    expect(
      (screen.getByRole('checkbox') as HTMLInputElement).checked
    ).toBe(false)

    // also check if getDerivedStateFromProps sets the state as expected
    rerender(<Checkbox {...props} checked={true} />)
    expect(
      (screen.getByRole('checkbox') as HTMLInputElement).checked
    ).toBe(true)

    const value = 'new value'
    rerender(<Checkbox {...props} checked={true} value={value} />)
    expect((screen.getByRole('checkbox') as HTMLInputElement).value).toBe(
      value
    )
  })

  it('has "on_change" event which will trigger on a input change', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <Checkbox on_change={my_event} onChange={myEvent} checked={false} />
    )
    screen.getByRole('checkbox').click()
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
          <Checkbox
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
    render(<Checkbox disabled={true} />)

    expect(
      (screen.getByRole('checkbox') as HTMLInputElement).disabled
    ).toBe(true)
  })

  it('should support spacing props', () => {
    render(<Checkbox top="2rem" />)

    const element = document.querySelector('.dnb-checkbox')

    expect(Array.from(element.classList)).toEqual([
      'dnb-checkbox',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider
        formElement={{ label_direction: 'vertical', disabled: true }}
      >
        <Checkbox label="Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-checkbox')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )
    const inputElement = document.querySelector('.dnb-checkbox input')
    const inputAttributes = Array.from(inputElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(inputAttributes).toEqual([
      'id',
      'name',
      'type',
      'class',
      'disabled',
      'aria-disabled',
      'value',
    ])
    expect(Array.from(element.classList)).toEqual([
      'dnb-checkbox',
      'dnb-form-component',
      'dnb-checkbox--label-position-right',
    ])
    expect(Array.from(inputElement.classList)).toEqual([
      'dnb-checkbox__input',
    ])
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Checkbox {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <Checkbox {...props} innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.classList).toContain('dnb-checkbox__input')
  })
})

describe('Checkbox scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-checkbox-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
