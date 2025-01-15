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

  describe('size', () => {
    it('should support small size', () => {
      render(<ToggleButton icon="question" size="small" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      expect(button.classList).toContain('dnb-button--size-small')
      expect(button.classList).not.toContain('dnb-button--icon-size-small')
      expect(icon.classList).toContain('dnb-icon--default')
    })

    it('should support medium size', () => {
      render(<ToggleButton icon="question" size="medium" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      expect(button.classList).toContain('dnb-button--size-medium')
      expect(button.classList).not.toContain(
        'dnb-button--icon-size-medium'
      )
      expect(icon.classList).toContain('dnb-icon--default')
    })

    it('has size set to medium when button size is default', () => {
      render(<ToggleButton icon="question" size="default" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      expect(button.classList).toContain('dnb-button--icon-size-medium')
      expect(icon.classList).toContain('dnb-icon--medium')
    })

    it('has medium icon if button size is large', () => {
      render(<ToggleButton text="Button" size="large" icon="question" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      // size "large
      expect(button.classList).toContain('dnb-button--size-large')
      expect(icon.classList).toContain('dnb-icon--default')
    })
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<ToggleButton {...props} />)

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
