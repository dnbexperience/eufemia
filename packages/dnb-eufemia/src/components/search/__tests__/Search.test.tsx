import { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from '../Search'
import { Provider } from '../../../shared'
import FieldBlock from '../../../extensions/forms/FieldBlock/FieldBlock'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'

describe.each([
  ['Input', Search.Input],
  ['Autocomplete', Search.Autocomplete],
  ['Panel', Search.Panel],
] as const)('Search.%s', (_, Component) => {
  it('is recognized as a form element when grouping fields', () => {
    render(
      <FieldBlock label="Search scopes">
        <Component />
        <Component />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).toHaveAccessibleName(
      'Search scopes'
    )
  })

  it('renders a translated accessible input with Eufemia defaults', () => {
    render(
      <Provider locale="en-GB">
        <Component id="search" top="small" />
      </Provider>
    )

    expect(document.querySelector('input')).toHaveAccessibleName('Search')
    expect(document.querySelector('label')).toHaveClass('dnb-sr-only')
    expect(document.querySelector('.dnb-search')).toHaveClass(
      'dnb-search--default',
      'dnb-space__top--small'
    )
    expect(document.querySelector('input')).not.toHaveAttribute(
      'aria-keyshortcuts'
    )
    expect(document.querySelector('kbd')).toBeNull()
  })

  it('supports Norwegian and custom labels', () => {
    const { rerender } = render(<Component />)
    expect(document.querySelector('input')).toHaveAccessibleName('Søk')

    rerender(<Component label="Search products" labelSrOnly={false} />)
    expect(document.querySelector('input')).toHaveAccessibleName(
      'Search products'
    )
    expect(document.querySelector('label')).not.toHaveClass('dnb-sr-only')
  })

  it('uses the normal hero shape unless pill is enabled', () => {
    const { rerender } = render(<Component variant="hero" />)
    expect(document.querySelector('.dnb-search')).not.toHaveClass(
      'dnb-search--pill'
    )

    rerender(<Component variant="hero" pill />)
    expect(document.querySelector('.dnb-search')).toHaveClass(
      'dnb-search--pill'
    )
    expect(document.querySelector('input')).not.toHaveAttribute('pill')

    rerender(<Component variant="compact" pill />)
    expect(document.querySelector('.dnb-search')).toHaveClass(
      'dnb-search--pill'
    )
  })

  it('supports Search context and explicit overrides', () => {
    const { rerender } = render(
      <Provider Search={{ variant: 'hero', label: 'Find content' }}>
        <Component />
      </Provider>
    )
    expect(document.querySelector('.dnb-search')).toHaveClass(
      'dnb-search--hero'
    )
    expect(document.querySelector('input')).toHaveAccessibleName(
      'Find content'
    )

    rerender(
      <Provider Search={{ variant: 'hero', label: 'Find content' }}>
        <Component variant="compact" label="Find products" />
      </Provider>
    )
    expect(document.querySelector('.dnb-search')).toHaveClass(
      'dnb-search--compact'
    )
    expect(document.querySelector('input')).toHaveAccessibleName(
      'Find products'
    )
  })

  it('supports query updates and clearing', async () => {
    const onClear = vi.fn()
    const { rerender } = render(
      <Component
        id="search"
        {...{
          [Component === Search.Input ? 'value' : 'inputValue']: 'Button',
        }}
        onClear={onClear}
      />
    )
    const input = document.querySelector('input')
    expect(input).toHaveValue('Button')
    fireEvent.click(document.querySelector('#search-clear-button'))
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('')

    rerender(
      <Component
        id="search"
        {...{
          [Component === Search.Input ? 'value' : 'inputValue']: 'Table',
        }}
      />
    )
    await waitFor(() => expect(input).toHaveValue('Table'))
  })

  it('submits a query without requiring a selected result', () => {
    const onSubmit = vi.fn()
    render(<Component onSubmit={onSubmit} />)
    const input = document.querySelector('input')
    fireEvent.change(input, { target: { value: 'Button' } })
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Button' })
    )
  })

  it.each([{ metaKey: true }, { ctrlKey: true }])(
    'focuses with the shortcut %s',
    (modifier) => {
      render(<Component shortcut />)
      const input = document.querySelector('input')
      expect(input).toHaveAttribute(
        'aria-keyshortcuts',
        'Meta+K Control+K'
      )
      fireEvent.keyDown(document, { key: 'k', ...modifier })
      expect(input).toHaveFocus()
    }
  )

  it('focuses one enabled visible instance and cleans up on unmount', () => {
    const { unmount } = render(
      <>
        <Component shortcut disabled />
        <div hidden>
          <Component shortcut />
        </div>
        <Component shortcut id="first" />
        <Component shortcut id="second" />
      </>
    )
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.querySelector('#first')).toHaveFocus()
    unmount()

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      cancelable: true,
    })
    document.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('does not consume unrelated or already handled shortcuts', () => {
    render(<Component shortcut />)
    fireEvent.keyDown(document, { key: 'k' })
    fireEvent.keyDown(document, { key: 'k', metaKey: true, altKey: true })
    fireEvent.keyDown(document, {
      key: 'k',
      metaKey: true,
      isComposing: true,
    })
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      cancelable: true,
    })
    event.preventDefault()
    document.dispatchEvent(event)
    expect(document.querySelector('input')).not.toHaveFocus()
  })

  it('keeps shortcut focus inside the active modal', () => {
    render(
      <>
        <Component shortcut id="background" />
        <div role="dialog" aria-modal="true" inert>
          <Component shortcut id="inactive-modal" />
        </div>
        <div role="dialog" aria-modal="true">
          <Component shortcut id="active-modal" />
        </div>
      </>
    )
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.querySelector('#active-modal')).toHaveFocus()
  })

  it('leaves modal focus alone when it has no shortcut-enabled search', () => {
    render(
      <>
        <Component shortcut />
        <div role="dialog" aria-modal="true">
          <button id="close">Close</button>
        </div>
      </>
    )
    const button = document.querySelector<HTMLButtonElement>('#close')
    button.focus()
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(button).toHaveFocus()
  })

  it('allows disabling the shortcut after mount', () => {
    const { rerender } = render(<Component shortcut />)
    rerender(<Component shortcut={false} />)
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    expect(document.querySelector('input')).not.toHaveFocus()
  })

  it.each([
    ['MacIntel', '⌘ K'],
    ['Win32', 'Ctrl K'],
  ])('shows the %s hint', (platform, hint) => {
    const spy = vi
      .spyOn(navigator, 'platform', 'get')
      .mockReturnValue(platform)
    render(<Component shortcut />)
    expect(document.querySelector('kbd')).toHaveTextContent(hint)
    expect(document.querySelector('kbd')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    spy.mockRestore()
  })

  it('renders stable server markup without a platform-specific hint', () => {
    expect(renderToString(<Component shortcut />)).not.toContain('<kbd')
  })

  it('allows a custom submit element', () => {
    render(<Component shortcut submitElement={<span>Submit</span>} />)
    expect(document.querySelector('kbd')).toBeNull()
  })

  it('has accessible markup', async () => {
    const { container } = render(<Component shortcut variant="hero" />)
    expect(await axeComponent(container)).toHaveNoViolations()
  })
})

it('compiles shared search styles with only Input dependencies', () => {
  const css = loadScss(require.resolve('../style/deps.scss'))
  expect(css).toContain('.dnb-search--compact')
  expect(css).not.toMatch(/^\.dnb-drawer-list \{/m)
})

describe.each([
  ['Autocomplete', Search.Autocomplete],
  ['Panel', Search.Panel],
] as const)('Search.%s results', (_, Component) => {
  it('lets async searches clear their results and close when the query is cleared', async () => {
    render(
      <Component
        mode="async"
        search={{ filter: false }}
        onType={({ value, updateData, setHidden }) => {
          updateData(value ? ['Button'] : [])
          if (!value) {
            setHidden()
          }
        }}
      />
    )
    const input = document.querySelector('input')
    await userEvent.type(input, 'But')
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')).toHaveTextContent(
        'Button'
      )
    )
    await userEvent.click(
      document.querySelector('.dnb-input__clear-button')
    )

    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.querySelector('[role="option"]')).toBeNull()
  })

  it('restores all results when clearing a filtered query', async () => {
    render(
      <Component
        data={['Button', 'Input', 'Table']}
        noAnimation
        skipPortal
      />
    )
    const input = document.querySelector('input')
    const options = () => document.querySelectorAll('[role="option"]')

    await userEvent.type(input, 'But')
    expect(options()).toHaveLength(2)
    expect(options()[0]).toHaveTextContent('Button')

    await userEvent.click(
      document.querySelector('.dnb-input__clear-button')
    )

    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
    expect(options()).toHaveLength(3)
    expect(Array.from(options(), (option) => option.textContent)).toEqual([
      'Button',
      'Input',
      'Table',
    ])
  })
})

describe('Search.Autocomplete', () => {
  it('forwards the input ref and event methods and keeps the query on blur', async () => {
    const inputRef = createRef<HTMLInputElement>()
    const onType = vi.fn()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(
      <Search.Autocomplete
        inputRef={inputRef}
        onType={onType}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
    const input = document.querySelector('input')
    expect(inputRef.current).toBe(input)
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'Button' } })
    fireEvent.blur(input)

    expect(onType).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 'Button',
        updateData: expect.any(Function),
        showIndicator: expect.any(Function),
      })
    )
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(input).toHaveValue('Button'))
  })

  it('supports selecting results without replacing the query', async () => {
    const onChange = vi.fn()
    render(
      <Search.Autocomplete
        data={['Button', 'Input']}
        onChange={onChange}
      />
    )
    const input = document.querySelector('input')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'But' } })
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')).not.toBeNull()
    )
    fireEvent.click(document.querySelector('[role="option"]'))

    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(input).toHaveValue('But')
  })
})

describe('Search.Input', () => {
  it('exposes an ordinary search input and forwards its ref and changes', () => {
    const ref = createRef<HTMLInputElement>()
    const onChange = vi.fn()
    render(<Search.Input ref={ref} onChange={onChange} />)
    const input = document.querySelector('input')
    expect(ref.current).toBe(input)
    expect(input).toHaveAttribute('type', 'search')
    expect(input).not.toHaveAttribute('aria-expanded')
    fireEvent.change(input, { target: { value: 'Button' } })
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Button' })
    )
    fireEvent.blur(input)
    expect(input).toHaveValue('Button')
    expect(document.querySelector('[role="listbox"]')).toBeNull()
  })
})

describe('Search.Panel', () => {
  it('renders results in the shared portal outside the input container', async () => {
    const { container } = render(
      <Search.Panel data={['Button', 'Input']} />
    )
    await userEvent.click(document.querySelector('input'))

    const results = document.querySelector<HTMLElement>('[role="listbox"]')
    expect(results).not.toBeNull()
    expect(container).not.toContainElement(results)
    expect(results.closest('.dnb-popover__portal')).not.toBeNull()
  })

  it('closes with the built-in close button and returns focus to the input', async () => {
    render(<Search.Panel data={['Button', 'Input']} />)
    const input = document.querySelector('input')
    await userEvent.click(input)

    const closeButton = document.querySelector('.dnb-popover__close')
    expect(closeButton).toHaveAccessibleName('Lukk')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'false')
      expect(input).toHaveFocus()
    })
  })

  it('forwards both supported input ref forms to the positioning target', () => {
    const ref = createRef<HTMLInputElement>()
    const { rerender } = render(<Search.Panel inputRef={ref} />)
    const input = document.querySelector('input')
    expect(ref.current).toBe(input)

    const callback = vi.fn()
    rerender(<Search.Panel inputRef={callback} />)
    expect(callback).toHaveBeenLastCalledWith(input)
  })

  it('uses one combobox and composes controls outside the inline listbox', async () => {
    render(
      <Search.Panel id="search" data={['Button', 'Input']}>
        {({ results, close }) => (
          <>
            <button type="button" onClick={close}>
              Close results
            </button>
            {results}
          </>
        )}
      </Search.Panel>
    )
    fireEvent.focus(document.querySelector('input'))
    await waitFor(() =>
      expect(document.querySelector('[role="listbox"]')).not.toBeNull()
    )
    expect(document.querySelectorAll('input')).toHaveLength(1)
    expect(document.querySelector('input')).toHaveAttribute(
      'aria-controls',
      'search-ul'
    )
    expect(document.querySelector('[role="listbox"] button')).toBeNull()
    expect(document.querySelector('.dnb-drawer-list')).toHaveClass(
      'dnb-drawer-list--inline'
    )
    fireEvent.click(document.querySelector('.dnb-search__panel button'))
    await waitFor(() =>
      expect(document.querySelector('input')).toHaveAttribute(
        'aria-expanded',
        'false'
      )
    )
  })
})
