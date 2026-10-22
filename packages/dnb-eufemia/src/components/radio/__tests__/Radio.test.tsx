/**
 * Radio Test
 *
 */

import { act, fireEvent, render } from '@testing-library/react'
import { StrictMode, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import type { RadioProps } from '../Radio'
import Radio from '../Radio'
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
    expect(document.querySelector('input').value).toBe(value)
  })

  it('has "onChange" event which will trigger on an input change', () => {
    const myEvent = vi.fn()
    render(<Radio onChange={myEvent} checked={false} group={null} />)
    fireEvent.click(document.querySelector('input'))
    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0].checked).toBe(true)
  })

  it('can uncheck a single radio again', () => {
    const onChange = vi.fn()
    render(<Radio onChange={onChange} />)

    const input = document.querySelector('input')
    fireEvent.click(input)
    fireEvent.click(input)

    expect(input.checked).toBe(false)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0].checked).toBe(false)
  })

  it('can uncheck a checked single radio with Space', () => {
    render(<Radio checked />)

    const input = document.querySelector('input')
    fireEvent.keyDown(input, { key: ' ' })

    expect(input.checked).toBe(false)
  })

  describe('arrow keys on a single radio', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it.each(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])(
      'gives a single radio its own name only while the browser runs %s',
      async (key) => {
        const onChange = vi.fn()
        const onKeyDown = vi.fn()
        render(
          <Radio
            id="single"
            checked
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        )

        // Browsers treat all radios without a name as one group, so an arrow
        // key would move to and check another radio. jsdom does not move
        // between radios, so we check the name the browser sees when it runs
        // the key: after all listeners and microtasks, and before React
        // renders. A key that is not prevented can still scroll the page.
        const input = document.querySelector('input')
        act(() => {
          const event = new KeyboardEvent('keydown', {
            key,
            bubbles: true,
            cancelable: true,
          })
          expect(input.dispatchEvent(event)).toBe(true)
          expect(input).toHaveAttribute('name', 'single')
        })

        await Promise.resolve()
        expect(input).toHaveAttribute('name', 'single')

        act(() => {
          vi.runOnlyPendingTimers()
          expect(input).not.toHaveAttribute('name')
        })
        expect(input).not.toHaveAttribute('name')
        expect(onKeyDown).toHaveBeenCalledTimes(1)
        expect(onChange).not.toHaveBeenCalled()
      }
    )
  })

  it('keeps the name of a single radio when it renders during an arrow key', () => {
    function Page() {
      const [count, setCount] = useState(0)
      return (
        <Radio
          id="single"
          label={`Rendered ${count}`}
          onKeyDown={() => setCount((count) => count + 1)}
        />
      )
    }
    render(<Page />)

    // React removes a name it did not render when it renders the input
    const input = document.querySelector('input')
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(document.querySelector('label')).toHaveTextContent('Rendered 1')
    expect(input).toHaveAttribute('name', 'single')
  })

  it('does not give a single radio a name when the arrow key is prevented', () => {
    render(
      <div onKeyDownCapture={(event) => event.preventDefault()}>
        <Radio id="single" />
      </div>
    )

    const input = document.querySelector('input')
    expect(fireEvent.keyDown(input, { key: 'ArrowDown' })).toBe(false)
    expect(input).not.toHaveAttribute('name')
  })

  it('does not give a single radio a name, so it is not sent with a native form', () => {
    render(
      <form>
        <Radio checked label="A" />
        <Radio checked label="B" value="b" />
      </form>
    )

    // A permanent name would also stop the arrow keys from moving between
    // single radios, but it would add these radios to the form data.
    const form = document.querySelector('form')
    expect(Array.from(new FormData(form).entries())).toEqual([])
  })

  it('keeps the native arrow keys and names for radios with a name or in a group', () => {
    render(
      <>
        <Radio label="Named" name="named" />
        <Radio group="plain-group" label="Plain group" />
        <Radio.Group label="Group" name="group">
          <Radio value="a" label="A" />
        </Radio.Group>
      </>
    )

    const inputs = Array.from(document.querySelectorAll('input'))
    expect(inputs).toHaveLength(3)
    for (const input of inputs) {
      expect(fireEvent.keyDown(input, { key: 'ArrowDown' })).toBe(true)
    }
    expect(inputs.map((input) => input.getAttribute('name'))).toEqual([
      'named',
      'plain-group',
      'group',
    ])
  })

  it.each(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])(
    'preserves the Provider group while handling %s',
    (key) => {
      vi.useFakeTimers()
      try {
        render(
          <Provider Radio={{ group: 'inherited-group' }}>
            <Radio label="A" value="a" />
            <Radio label="B" value="b" />
          </Provider>
        )
        const input = document.querySelector('input')
        expect(input).toHaveAttribute('name', 'inherited-group')
        fireEvent.keyDown(input, { key })
        expect(input).toHaveAttribute('name', 'inherited-group')
        act(() => vi.runOnlyPendingTimers())
        expect(input).toHaveAttribute('name', 'inherited-group')
      } finally {
        vi.useRealTimers()
      }
    }
  )

  it('keeps a newly assigned group when the temporary arrow name expires', () => {
    vi.useFakeTimers()
    try {
      const { rerender } = render(<Radio id="single" />)
      const input = document.querySelector('input')
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      rerender(<Radio id="single" group="new-group" />)
      expect(input).toHaveAttribute('name', 'new-group')
      act(() => vi.runOnlyPendingTimers())
      expect(input).toHaveAttribute('name', 'new-group')
    } finally {
      vi.useRealTimers()
    }
  })

  it('keeps a radio in a group checked when clicked again', () => {
    render(
      <Radio.Group label="Group">
        <Radio value="a" label="A" />
      </Radio.Group>
    )

    const input = document.querySelector('input')
    fireEvent.click(input)
    fireEvent.click(input)

    expect(input.checked).toBe(true)
  })

  it('does handle controlled vs uncontrolled state properly', () => {
    const ControlledVsUncontrolled = () => {
      const [checked, setChecked] = useState(true)
      const [random, setRandom] = useState(null)

      return (
        <>
          <Radio
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
    }

    TestStates(<ControlledVsUncontrolled />)
    TestStates(
      <StrictMode>
        <ControlledVsUncontrolled />
      </StrictMode>
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

  it('uses dark surface styling from Theme context', () => {
    render(
      <Provider theme={{ surface: 'dark' }}>
        <Radio disabled />
      </Provider>
    )

    expect(document.querySelector('.dnb-radio')).toHaveClass(
      'dnb-radio--surface-dark'
    )
  })

  it('should support spacing props', () => {
    render(<Radio top="2rem" />)

    const element = document.querySelector('.dnb-radio')

    expect(element).toHaveClass('dnb-radio dnb-space__top--large', {
      exact: true,
    })
  })

  it('should support inline styling', () => {
    render(<Radio style={{ color: 'red' }} />)

    expect(document.querySelector('input').getAttribute('style')).toBe(
      'color: red;'
    )
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
      'id',
      'class',
      'aria-checked',
      'disabled',
      'aria-label',
      'type',
      'value',
    ])
    expect(element).toHaveClass(
      'dnb-radio dnb-radio--label-position-right',
      { exact: true }
    )
  })
})

describe('Radio ARIA', () => {
  it('should render a single radio as a native radio', () => {
    render(<Radio {...props} />)

    const input = document.querySelector('input')
    expect(input.getAttribute('type')).toBe('radio')
    expect(input.hasAttribute('role')).toBe(false)
  })

  it('should validate with ARIA rules for Radio', async () => {
    const Comp = render(<Radio {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: RefObject<HTMLInputElement>

    function MockComponent() {
      ref = useRef(null)
      return <Radio {...props} ref={ref} />
    }

    render(<MockComponent />)

    // ref should be the DOM element, not a class instance
    const input = document.querySelector('.dnb-radio__input')
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(input)
  })

  it('gets valid element when ref is function', () => {
    const refFn = vi.fn()

    render(<Radio id="unique" ref={refFn} />)

    // ref callback receives the DOM element
    expect(refFn).toHaveBeenCalledTimes(1)
    const input = document.querySelector('#unique')
    expect(refFn).toHaveBeenCalledWith(input)
    expect(input.classList).toContain('dnb-radio__input')
  })
})

describe('Radio scss', () => {
  it('uses the subtle stroke for disabled radio buttons', () => {
    const css = loadScss(require.resolve('../style/dnb-radio.scss'))

    expect(css).toMatch(
      /--radio-color-border--disabled: var\(\s*--token-color-stroke-neutral-subtle\s*\)/
    )
    expect(css).toMatch(
      /--radio-color-border--disabled: color-mix\(\s*in srgb,\s*var\(--token-color-stroke-neutral-ondark\) 50%,\s*transparent\s*\)/
    )
  })

  it('shows the ring and the selected dot in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/dnb-radio.scss'))

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-radio__button \{\s*outline: var\(--radio-border-width, var\(--radio-border-width--default\)\) solid transparent;/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-radio__input:checked ~ \.dnb-radio__dot,\s*\.dnb-radio__input\[data-checked=['"]?true['"]?\] ~ \.dnb-radio__dot \{\s*background-color: CanvasText;/
    )
  })

  it('shows disabled radio buttons with the disabled text color in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/dnb-radio.scss'))

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-radio__input\[disabled\] ~ \.dnb-radio__button \{\s*outline-color: GrayText;/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-radio__input\[disabled\] ~ \.dnb-radio__dot \{\s*background-color: GrayText;/
    )
  })

  it('shows the focus ring in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/dnb-radio.scss'))

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{[^{]*\.dnb-radio__input:focus ~ \.dnb-radio__button \{\s*outline: var\(--focus-ring-width\) solid transparent;/
    )
  })

  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
