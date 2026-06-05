/**
 * Switch Test
 *
 */

import { cleanup, fireEvent, render } from '@testing-library/react'
import { StrictMode, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import type { SwitchProps } from '../Switch'
import Switch from '../Switch'
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

  it('has "onChange" event which will trigger on a input change', () => {
    const myEvent = vi.fn()

    render(<Switch onChange={myEvent} checked={false} />)

    fireEvent.click(document.querySelector('input'))

    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('checked')
    expect(myEvent.mock.calls[0][0].checked).toBe(true)
  })

  it('does handle controlled vs uncontrolled state properly', () => {
    const ControlledVsUncontrolled = () => {
      const [checked, setChecked] = useState(true)
      const [random, setRandom] = useState(null)

      return (
        <>
          <Switch
            checked={checked}
            onChange={({ checked }) => setChecked(checked)}
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
      <StrictMode>
        <ControlledVsUncontrolled />
      </StrictMode>
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

    expect(element).toHaveClass(
      'dnb-switch dnb-switch--label-position-right dnb-form-component dnb-space__top--large',
      { exact: true }
    )
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ labelDirection: 'vertical' }}>
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
      'role',
      'aria-checked',
      'class',
      'type',
      'value',
      'name',
    ])
    expect(element).toHaveClass(
      'dnb-switch dnb-switch--label-position-right dnb-form-component',
      { exact: true }
    )
    expect(inputElement).toHaveClass('dnb-switch__input', {
      exact: true,
    })
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Switch {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: RefObject<HTMLInputElement>

    function MockComponent() {
      ref = useRef<HTMLInputElement | null>(null)
      return <Switch {...props} ref={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.classList).toContain('dnb-switch__input')
  })

  it('gets valid element when ref is function', () => {
    const ref: RefObject<HTMLInputElement | null> = { current: null }

    const refFn = (elem: HTMLInputElement) => {
      ref.current = elem
    }

    render(<Switch id="unique" ref={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.classList).toContain('dnb-switch__input')
  })

  it('should not visually flip when preventDefault is called in onClick', () => {
    const onChange = vi.fn()

    const Controlled = () => {
      const [checked, setChecked] = useState(false)

      return (
        <Switch
          checked={checked}
          onChange={({ checked }) => {
            onChange(checked)
            setChecked(checked)
          }}
          onClick={({ preventDefault }) => {
            preventDefault()
          }}
        />
      )
    }

    render(<Controlled />)

    const input = document.querySelector('input')

    // Click should be prevented — state stays false
    fireEvent.click(input)
    expect(input.getAttribute('aria-checked')).toBe('false')
    expect(onChange).not.toHaveBeenCalled()

    // Click again — still prevented, still false
    fireEvent.click(input)
    expect(input.getAttribute('aria-checked')).toBe('false')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should allow normal toggling when preventDefault is not called in onClick', () => {
    const onChange = vi.fn()

    const Controlled = () => {
      const [checked, setChecked] = useState(false)

      return (
        <Switch
          checked={checked}
          onChange={({ checked }) => {
            onChange(checked)
            setChecked(checked)
          }}
          onClick={() => {
            // onClick present but not calling preventDefault
          }}
        />
      )
    }

    render(<Controlled />)

    const input = document.querySelector('input')

    fireEvent.click(input)
    expect(input.getAttribute('aria-checked')).toBe('true')
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('supports deprecated status message via status and statusState', () => {
    render(
      <Switch
        label="Switch"
        status="Legacy information message"
        statusState="information"
      />
    )

    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent('Legacy information message')
    expect(document.querySelector('.dnb-switch')).toHaveClass(
      'dnb-switch__status--information'
    )
  })
})

describe('Switch scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
