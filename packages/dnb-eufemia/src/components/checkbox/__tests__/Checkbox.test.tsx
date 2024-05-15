/**
 * Checkbox Test
 *
 */

import React from 'react'
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('should return "checked" and "event" from onChange event', async () => {
    const onChange = jest.fn()
    render(<Checkbox onChange={onChange} value="foo" />)

    const checkbox = document.querySelector('input')
    await userEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        checked: true,
        event: expect.objectContaining({
          target: expect.objectContaining({ value: 'foo' }),
        }),
      })
    )
  })

  it('has "on_change" event which will trigger on a input change', () => {
    const myEvent = jest.fn()
    render(<Checkbox onChange={myEvent} checked={false} />)
    screen.getByRole('checkbox').click()

    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('checked')
    expect(myEvent.mock.calls[0][0].checked).toBe(true)
  })

  describe('controlled vs uncontrolled', () => {
    const ControlledVsUncontrolled = () => {
      const [checked, setChecked] = React.useState(true)
      const [random, setRandom] = React.useState(null)

      return (
        <>
          <Checkbox
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

    it('handles re-render + default state', () => {
      render(<ControlledVsUncontrolled />)

      fireEvent.click(document.querySelector('button#set-state'))
      expect(document.querySelector('input').checked).toBe(true)
      cleanup()
    })

    it('changes to false', () => {
      render(<ControlledVsUncontrolled />)

      fireEvent.click(document.querySelector('input'))
      expect(document.querySelector('input').checked).toBe(false)
      cleanup()
    })

    it('handles set it to true', () => {
      render(<ControlledVsUncontrolled />)

      fireEvent.click(document.querySelector('button#set-state'))
      expect(document.querySelector('input').checked).toBe(true)
      cleanup()
    })
    it('handles reset it with undefined to false', () => {
      render(<ControlledVsUncontrolled />)

      fireEvent.click(document.querySelector('button#reset-undefined'))

      expect(document.querySelector('input').checked).toBe(false)

      cleanup()
    })
    it('handles set to true + reset it with null to false', () => {
      render(<ControlledVsUncontrolled />)

      fireEvent.click(document.querySelector('button#set-state'))
      fireEvent.click(document.querySelector('button#reset-null'))

      expect(document.querySelector('input').checked).toBe(false)

      cleanup()
    })

    it('handles re-render + still false', async () => {
      render(<ControlledVsUncontrolled />)

      userEvent.click(document.querySelector('button#rerender'))

      waitFor(() => {
        expect(document.querySelector('input').checked).toBe(false)
      })

      cleanup()
    })
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
      return <Checkbox id="unique" innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.classList).toContain('dnb-checkbox__input')
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('gets valid element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLInputElement> = React.createRef()

    const refFn = (elem: HTMLInputElement) => {
      ref.current = elem
    }

    render(<Checkbox id="unique" innerRef={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.classList).toContain('dnb-checkbox__input')
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('should use span element if defined', () => {
    render(<Checkbox element="span" />)
    expect(document.querySelector('.dnb-checkbox__input').tagName).toBe(
      'SPAN'
    )
    expect(
      document.querySelector('.dnb-checkbox__input').getAttribute('type')
    ).toBe('checkbox')
  })
  describe('Indeterminate state', () => {
    it('renders indeterminate state', () => {
      render(<Checkbox indeterminate />)

      expect(
        document.querySelector('.dnb-checkbox__indeterminate')
      ).toBeInTheDocument()
    })

    it('changes to no longer indeterminate when clicking indeterminate state', () => {
      const mockOnChange = jest.fn()
      render(<Checkbox indeterminate onChange={mockOnChange} />)

      screen.getByRole('checkbox').click()

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.not.objectContaining({ indeterminate: true })
      )

      expect(screen.getByRole('checkbox')).not.toHaveClass(
        '.dnb-checkbox__indeterminate'
      )
    })

    it('sets the input indeterminate when setting indeterminate true', () => {
      render(<Checkbox indeterminate />)

      expect(
        (screen.getByRole('checkbox') as HTMLInputElement).indeterminate
      ).toBe(true)
    })

    it('sets the input indeterminate to false when clicking an indeterminate checkbox', () => {
      render(<Checkbox indeterminate />)

      screen.getByRole('checkbox').click()

      expect(
        (screen.getByRole('checkbox') as HTMLInputElement).indeterminate
      ).toBe(false)
    })
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
