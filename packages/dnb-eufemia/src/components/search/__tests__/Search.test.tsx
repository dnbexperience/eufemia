import { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from '../Search'
import Dropdown from '../../dropdown/Dropdown'
import Menu from '../../menu/Menu'
import type { SearchAutocompleteProps } from '../Search'
import { Provider } from '../../../shared'
import FieldBlock from '../../../extensions/forms/FieldBlock/FieldBlock'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'

describe.each([
  ['Input', Search.Input, { panelDescription: undefined }],
  ['Autocomplete', Search.Autocomplete, { panelDescription: undefined }],
  [
    'Panel',
    Search.Panel,
    {
      panelDescription: 'Search results. Use the arrow keys to navigate.',
    },
  ],
] as const)('Search.%s', (_, Component, requiredProps) => {
  let platformSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    platformSpy = vi
      .spyOn(navigator, 'platform', 'get')
      .mockReturnValue('MacIntel')
  })

  afterEach(() => {
    platformSpy.mockRestore()
  })

  it('is recognized as a form element when grouping fields', () => {
    render(
      <FieldBlock label="Search scopes">
        <Component {...requiredProps} />
        <Component {...requiredProps} />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).toHaveAccessibleName(
      'Search scopes'
    )
  })

  it('renders a translated accessible input with Eufemia defaults', () => {
    render(
      <Provider locale="en-GB">
        <Component {...requiredProps} id="search" top="small" />
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
    const { rerender } = render(<Component {...requiredProps} />)
    expect(document.querySelector('input')).toHaveAccessibleName('Søk')

    rerender(
      <Component
        {...requiredProps}
        label="Search products"
        labelSrOnly={false}
      />
    )
    expect(document.querySelector('input')).toHaveAccessibleName(
      'Search products'
    )
    expect(document.querySelector('label')).not.toHaveClass('dnb-sr-only')
  })

  it('supports Search context and explicit overrides', () => {
    const { rerender } = render(
      <Provider Search={{ variant: 'hero', label: 'Find content' }}>
        <Component {...requiredProps} />
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
        <Component
          {...requiredProps}
          variant="compact"
          label="Find products"
        />
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
        {...requiredProps}
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
        {...requiredProps}
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
    render(<Component {...requiredProps} onSubmit={onSubmit} />)
    const input = document.querySelector('input')
    fireEvent.change(input, { target: { value: 'Button' } })
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Button' })
    )
  })

  it.each([
    ['MacIntel', { metaKey: true }, { ctrlKey: true }, 'Meta+K'],
    ['Win32', { ctrlKey: true }, { metaKey: true }, 'Control+K'],
  ] as const)(
    'uses only the platform shortcut on %s',
    (platform, modifier, otherModifier, ariaShortcut) => {
      platformSpy.mockReturnValue(platform)
      render(<Component {...requiredProps} shortcut />)
      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-keyshortcuts', ariaShortcut)
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ...otherModifier,
        cancelable: true,
      })
      document.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
      expect(input).not.toHaveFocus()
      fireEvent.keyDown(document, { key: 'k', ...modifier })
      expect(input).toHaveFocus()
    }
  )

  it.each(['input', 'textarea'] as const)(
    'leaves shortcuts to another focused %s',
    (tagName) => {
      render(
        <>
          <Component {...requiredProps} shortcut />
          {tagName === 'input' ? <input id="editor" /> : null}
          {tagName === 'textarea' ? <textarea id="editor" /> : null}
        </>
      )
      const editor = document.querySelector<HTMLElement>('#editor')
      editor.focus()
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true,
        cancelable: true,
      })
      editor.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
      expect(editor).toHaveFocus()
    }
  )

  it.each([
    'checkbox',
    'radio',
    'range',
    'button',
    'select',
    'readonly',
  ] as const)('moves focus from a focused %s control', (type) => {
    render(
      <>
        <Component {...requiredProps} shortcut />
        {type === 'select' ? (
          <select id="control" />
        ) : type === 'readonly' ? (
          <input id="control" readOnly />
        ) : (
          <input id="control" type={type} />
        )}
      </>
    )
    const control = document.querySelector<HTMLElement>('#control')
    control.focus()
    fireEvent.keyDown(control, { key: 'k', metaKey: true })
    expect(document.querySelector('.dnb-search input')).toHaveFocus()
  })

  it('keeps the shortcut available in its Search input', () => {
    render(<Component {...requiredProps} shortcut />)
    const input = document.querySelector('input')
    input.focus()
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    })
    input.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    expect(input).toHaveFocus()
  })

  it('focuses one enabled visible instance and cleans up on unmount', () => {
    const { unmount } = render(
      <>
        <Component {...requiredProps} shortcut disabled />
        <div hidden>
          <Component {...requiredProps} shortcut />
        </div>
        <Component {...requiredProps} shortcut id="first" />
        <Component {...requiredProps} shortcut id="second" />
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
    render(<Component {...requiredProps} shortcut />)
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
        <Component {...requiredProps} shortcut id="background" />
        <div role="dialog" aria-modal="true" inert>
          <Component {...requiredProps} shortcut id="inactive-modal" />
        </div>
        <div role="dialog" aria-modal="true">
          <Component {...requiredProps} shortcut id="active-modal" />
        </div>
      </>
    )
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.querySelector('#active-modal')).toHaveFocus()
  })

  it('leaves modal focus alone when it has no shortcut-enabled search', () => {
    render(
      <>
        <Component {...requiredProps} shortcut />
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
    const { rerender } = render(<Component {...requiredProps} shortcut />)
    rerender(<Component {...requiredProps} shortcut={false} />)
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.querySelector('input')).not.toHaveFocus()
  })

  it.each([
    ['MacIntel', '⌘ K'],
    ['Win32', 'Ctrl K'],
  ])('shows the %s hint', (platform, hint) => {
    platformSpy.mockReturnValue(platform)
    render(<Component {...requiredProps} shortcut />)
    expect(document.querySelector('kbd')).toHaveTextContent(hint)
    expect(document.querySelector('kbd')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('renders stable server markup without a platform-specific hint', () => {
    expect(
      renderToString(<Component {...requiredProps} shortcut />)
    ).not.toContain('<kbd')
  })

  it('allows a custom submit element', () => {
    render(
      <Component
        {...requiredProps}
        shortcut
        submitElement={<span>Submit</span>}
      />
    )
    expect(document.querySelector('kbd')).toBeNull()
  })

  it('has accessible markup', async () => {
    const { container } = render(
      <Component {...requiredProps} shortcut variant="hero" />
    )
    expect(await axeComponent(container)).toHaveNoViolations()
  })
})

it('compiles shared search styles with only Input dependencies', () => {
  const css = loadScss(require.resolve('../style/deps.scss'))
  expect(css).toContain('.dnb-search--compact')
  expect(css).not.toMatch(/^\.dnb-drawer-list \{/m)
})

describe.each([
  ['Autocomplete', Search.Autocomplete, { panelDescription: undefined }],
  [
    'Panel',
    Search.Panel,
    {
      panelDescription: 'Search results. Use the arrow keys to navigate.',
    },
  ],
] as const)('Search.%s results', (_, Component, requiredProps) => {
  it('lets async searches clear their results and close when the query is cleared', async () => {
    render(
      <Component
        {...requiredProps}
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
        {...requiredProps}
        data={['Button', 'Input', 'Table']}
        noAnimation
        skipPortal
      />
    )
    const input = document.querySelector('input')
    const options = () => document.querySelectorAll('[role="option"]')

    await userEvent.type(input, 'But')
    expect(options()).toHaveLength(1)
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

describe.each([
  ['Autocomplete', Search.Autocomplete, { panelDescription: undefined }],
  ['Panel', Search.Panel, { panelDescription: 'Search results.' }],
] as const)('Search.%s results', (_, Component, requiredProps) => {
  const options = () =>
    Array.from(document.querySelectorAll('[role="option"]')).map(
      (option) => option.textContent
    )

  it('does not offer to show every item for a filtered query', async () => {
    render(
      <Component
        {...requiredProps}
        data={['Drawer', 'Dropdown', 'Table']}
      />
    )
    await userEvent.type(document.querySelector('input'), 'dr')

    await waitFor(() => expect(options()).toEqual(['Drawer', 'Dropdown']))
    expect(
      document.querySelector('.dnb-autocomplete__show-all')
    ).toBeNull()
  })

  it('shows every asynchronous result without filtering it again', async () => {
    let events: Parameters<SearchAutocompleteProps['onType']>[0]
    render(
      <Component
        {...requiredProps}
        mode="async"
        onType={(event) => {
          events = event
        }}
      />
    )
    await userEvent.type(document.querySelector('input'), 'b')
    act(() => {
      events.updateData(['Button', 'Table'])
    })

    await waitFor(() => expect(options()).toEqual(['Button', 'Table']))
    expect(
      document.querySelector('.dnb-autocomplete__show-all')
    ).toBeNull()
  })

  it('keeps other search options for asynchronous results', async () => {
    let events: Parameters<SearchAutocompleteProps['onType']>[0]
    render(
      <Component
        {...requiredProps}
        mode="async"
        search={{ highlight: false }}
        onType={(event) => {
          events = event
        }}
      />
    )
    await userEvent.type(document.querySelector('input'), 'b')
    act(() => {
      events.updateData(['Button', 'Table'])
    })

    await waitFor(() => expect(options()).toEqual(['Button', 'Table']))
    expect(
      document.querySelector('.dnb-drawer-list__option__item--highlight')
    ).toBeNull()
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

  it('submits a surrounding form on Enter unless onSubmit prevents it', async () => {
    const onFormSubmit = vi.fn((event: SubmitEvent) =>
      event.preventDefault()
    )
    const { rerender } = render(
      <form onSubmit={onFormSubmit as never}>
        <Search.Input />
      </form>
    )
    await userEvent.type(document.querySelector('input'), 'Button{Enter}')
    expect(onFormSubmit).toHaveBeenCalledTimes(1)

    rerender(
      <form onSubmit={onFormSubmit as never}>
        <Search.Input onSubmit={({ event }) => event.preventDefault()} />
      </form>
    )
    await userEvent.type(document.querySelector('input'), '{Enter}')
    expect(onFormSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('Search.Panel', () => {
  it('describes the available controls before opening and preserves existing descriptions', async () => {
    const panelDescription =
      'Results include category filters and sorting. Press Tab to reach these controls.'
    render(
      <>
        <p id="search-help">Search the component library.</p>
        <Search.Panel
          id="search"
          panelDescription={panelDescription}
          aria-describedby="search-help"
          status="Enter a component name."
          data={['Button', 'Input']}
          noAnimation
        />
      </>
    )
    const input = document.querySelector('input')
    const description =
      'Search the component library. ' +
      panelDescription +
      ' Enter a component name.'

    expect(input).toHaveAccessibleDescription(description)
    expect(document.querySelector('.dnb-search__panel')).toBeNull()
    expect(input).not.toHaveAttribute('panelDescription')

    await userEvent.click(input)
    expect(document.querySelector('.dnb-search__panel')).not.toBeNull()
    expect(input).toHaveAccessibleDescription(description)

    await userEvent.click(document.querySelector('.dnb-popover__close'))
    await waitFor(() =>
      expect(document.querySelector('.dnb-search__panel')).toBeNull()
    )
    expect(input).toHaveAccessibleDescription(description)
  })

  it('keeps descriptions distinct for multiple panels without explicit ids', () => {
    render(
      <>
        <Search.Panel panelDescription="Filter component results." />
        <Search.Panel panelDescription="Sort product results." />
      </>
    )
    const inputs = document.querySelectorAll('input')
    expect(inputs[0]).toHaveAccessibleDescription(
      'Filter component results.'
    )
    expect(inputs[1]).toHaveAccessibleDescription('Sort product results.')
    expect(inputs[0].getAttribute('aria-describedby')).not.toBe(
      inputs[1].getAttribute('aria-describedby')
    )
  })

  it('keeps an explicit results height limit on the panel surface', async () => {
    render(
      <Search.Panel
        panelDescription="Search results."
        maxHeight={10}
        data={['Button']}
      />
    )
    await userEvent.click(document.querySelector('input'))
    expect(
      document
        .querySelector<HTMLElement>('.dnb-search__panel')
        .style.getPropertyValue('--search-panel-max-height')
    ).toBe('10rem')
  })

  it.each([
    [undefined, '10rem'],
    [6, '6rem'],
    [0, '0rem'],
  ])(
    'supports a minimum results height of %s',
    async (minHeight, height) => {
      render(
        <Search.Panel
          panelDescription="Search results."
          minHeight={minHeight}
          data={['Button']}
        />
      )
      await userEvent.click(document.querySelector('input'))
      expect(
        document
          .querySelector<HTMLElement>('.dnb-search__panel')
          .style.getPropertyValue('--search-panel-min-height')
      ).toBe(height)
      expect(document.querySelector('input')).not.toHaveAttribute(
        'minHeight'
      )
    }
  )

  it('keeps an async panel closed until results arrive', async () => {
    const onType = vi.fn()
    render(
      <Search.Panel
        panelDescription="Search results with custom controls. Press Tab to reach them."
        mode="async"
        noAnimation
        onType={(event) => {
          event.showIndicator()
          onType(event)
        }}
      >
        {({ results }) => <div>Search controls{results}</div>}
      </Search.Panel>
    )
    const input = document.querySelector('input')
    const panel = () => document.querySelector('.dnb-search__panel')

    fireEvent.focus(input)
    expect(panel()).toBeNull()
    await userEvent.click(input)
    expect(panel()).toBeNull()
    expect(input).toHaveAttribute('aria-expanded', 'false')

    fireEvent.change(input, { target: { value: 'But' } })
    expect(panel()).toBeNull()
    expect(document.querySelector('.dnb-autocomplete')).toHaveClass(
      'dnb-autocomplete--show-indicator'
    )

    const { updateData, hideIndicator, setHidden } =
      onType.mock.calls[0][0]
    act(() => {
      updateData(['Button'])
      hideIndicator()
    })
    await waitFor(() => expect(panel()).not.toBeNull())
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(document.querySelector('[role="option"]')).toHaveTextContent(
      'Button'
    )
    await waitFor(() =>
      expect(
        document.querySelector(
          '.dnb-autocomplete > .dnb-aria-live:last-child'
        )
      ).toHaveTextContent('1 alternativer')
    )

    act(() => {
      updateData([])
      setHidden()
    })
    await waitFor(() => expect(panel()).toBeNull())
    await userEvent.click(input)
    expect(panel()).toBeNull()
  })

  it.each(['showIndicatorItem', 'showNoOptionsItem'] as const)(
    'opens an async panel for an explicit %s',
    async (method) => {
      render(
        <Search.Panel
          panelDescription="Search results. Use the arrow keys to navigate."
          mode="async"
          noAnimation
          onType={(event) => event[method]()}
        />
      )
      await userEvent.type(document.querySelector('input'), 'But')

      expect(document.querySelector('.dnb-search__panel')).not.toBeNull()
      expect(document.querySelector('input')).toHaveAttribute(
        'aria-expanded',
        'true'
      )
    }
  )

  it('renders results in the shared portal outside the input container', async () => {
    const { container } = render(
      <Search.Panel
        panelDescription="Search results. Use the arrow keys to navigate."
        data={['Button', 'Input']}
      />
    )
    await userEvent.click(document.querySelector('input'))

    const results = document.querySelector<HTMLElement>('[role="listbox"]')
    expect(results).not.toBeNull()
    expect(container).not.toContainElement(results)
    expect(results.closest('.dnb-popover__portal')).not.toBeNull()
  })

  it('keeps focus in the input when pressing empty space or text in the panel', async () => {
    render(
      <Search.Panel
        panelDescription="Search results and an action. Press Tab to reach the action."
        data={['Button', 'Input']}
      >
        {({ results }) => (
          <>
            <span id="text">Show results from</span>
            <button type="button" id="action">
              Action
            </button>
            {results}
          </>
        )}
      </Search.Panel>
    )
    const input = document.querySelector('input')
    await userEvent.click(input)
    await waitFor(() =>
      expect(document.querySelector('[role="listbox"]')).not.toBeNull()
    )

    await userEvent.click(document.querySelector('#text'))
    expect(input).toHaveFocus()

    await userEvent.click(
      document.querySelector('.dnb-search__panel-content')
    )
    expect(input).toHaveFocus()
    await userEvent.keyboard('in')
    expect(input).toHaveValue('in')

    await userEvent.click(document.querySelector('#action'))
    expect(document.querySelector('#action')).toHaveFocus()
  })

  it('closes with the built-in close button and returns focus to the input', async () => {
    render(
      <Search.Panel
        panelDescription="Search results. Use the arrow keys to navigate."
        data={['Button', 'Input']}
      />
    )
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

  it('lets Tab leave a panel without custom controls', async () => {
    render(
      <>
        <Search.Panel
          panelDescription="Search results. Use the arrow keys to navigate."
          data={['Button', 'Input']}
        />
        <button id="after">After</button>
      </>
    )
    const input = document.querySelector('input')
    await userEvent.click(input)
    await waitFor(() =>
      expect(document.querySelector('[role="listbox"]')).not.toBeNull()
    )

    await userEvent.tab()

    expect(document.querySelector('#after')).toHaveFocus()
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('stays open while using a control that renders its own popover', async () => {
    const onChange = vi.fn()
    render(
      <Search.Panel
        panelDescription="Search results with sorting. Press Tab to reach it."
        data={['Button', 'Input']}
      >
        {({ results }) => (
          <>
            <Dropdown
              id="sort"
              label="Sort"
              data={{ a: 'A-Z', z: 'Z-A' }}
              onChange={onChange}
            />
            {results}
          </>
        )}
      </Search.Panel>
    )
    const input = document.querySelector('input')
    await userEvent.click(input)
    await userEvent.click(document.querySelector('#sort'))
    const option = await waitFor(() => {
      const element = Array.from(
        document.querySelectorAll<HTMLElement>('#sort-ul [role="option"]')
      ).find((element) => element.textContent === 'Z-A')
      expect(element).toBeDefined()
      return element
    })
    expect(
      document.querySelector('.dnb-search__panel')
    ).not.toContainElement(option)

    await userEvent.click(option)

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'z' })
    )
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(document.querySelector('[role="listbox"]')).not.toBeNull()

    await userEvent.click(document.body)
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('closes from an action in a nested popover', async () => {
    render(
      <Search.Panel
        panelDescription="Search results with actions. Press Tab to reach them."
        data={['Button', 'Input']}
      >
        {({ results, close }) => (
          <>
            <Menu.Root>
              <Menu.Button id="actions" text="Actions" />
              <Menu.List>
                <Menu.Action
                  id="close-action"
                  text="Done"
                  onClick={close}
                />
              </Menu.List>
            </Menu.Root>
            {results}
          </>
        )}
      </Search.Panel>
    )
    const input = document.querySelector('input')
    await userEvent.click(input)
    await userEvent.click(document.querySelector('#actions'))
    const action = await waitFor(() => {
      const element = document.querySelector<HTMLElement>('#close-action')
      expect(element).not.toBeNull()
      return element
    })

    await userEvent.click(action)

    await waitFor(() =>
      expect(input).toHaveAttribute('aria-expanded', 'false')
    )
  })
  it.each([
    [
      'the close button',
      () => userEvent.click(document.querySelector('.dnb-popover__close')),
    ],
    [
      'Escape from a control',
      async () => {
        await userEvent.tab()
        await userEvent.keyboard('{Escape}')
      },
    ],
  ])(
    'opens the results when typing after closing with %s',
    async (_, closePanel) => {
      render(
        <Search.Panel
          panelDescription="Search results. Use the arrow keys to navigate."
          data={['Button', 'Input']}
        >
          {({ results }) => (
            <>
              <button type="button">Sort</button>
              {results}
            </>
          )}
        </Search.Panel>
      )
      const input = document.querySelector('input')
      await userEvent.click(input)

      await closePanel()

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'false')
        expect(input).toHaveFocus()
      })

      await userEvent.keyboard('B')

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'true')
      })
      expect(
        document.querySelector('.dnb-search__panel [role="option"]')
      ).toHaveTextContent('Button')
    }
  )

  it.each([false, true])(
    'keeps the input buttons in the Tab order before the controls (showSubmitButton: %s)',
    async (showSubmitButton) => {
      render(
        <>
          <Search.Panel
            panelDescription="Search results. Use the arrow keys to navigate."
            data={['Button', 'Input']}
            showSubmitButton={showSubmitButton}
          >
            {({ results }) => (
              <>
                <button type="button">Sort</button>
                {results}
              </>
            )}
          </Search.Panel>
          <button type="button">After</button>
        </>
      )
      const input = document.querySelector('input')
      await userEvent.click(input)
      await userEvent.keyboard('B')

      const fieldButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>('.dnb-search button')
      ).filter((button) => button.tabIndex >= 0)
      expect(fieldButtons).toHaveLength(showSubmitButton ? 2 : 1)

      for (const button of fieldButtons) {
        const event = new KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
          cancelable: true,
        })
        fireEvent(document.activeElement, event)
        expect(event.defaultPrevented).toBe(true)
        expect(button).toHaveFocus()
      }
      await userEvent.tab()
      expect(document.activeElement).toHaveTextContent('Sort')

      await userEvent.tab({ shift: true })
      expect(fieldButtons.at(-1)).toHaveFocus()
      for (const control of [
        input,
        ...fieldButtons.slice(0, -1),
      ].reverse()) {
        const event = new KeyboardEvent('keydown', {
          key: 'Tab',
          shiftKey: true,
          bubbles: true,
          cancelable: true,
        })
        fireEvent(document.activeElement, event)
        expect(event.defaultPrevented).toBe(true)
        expect(control).toHaveFocus()
      }
    }
  )

  it('forwards both supported input ref forms to the positioning target', () => {
    const ref = createRef<HTMLInputElement>()
    const { rerender } = render(
      <Search.Panel
        panelDescription="Search results. Use the arrow keys to navigate."
        inputRef={ref}
      />
    )
    const input = document.querySelector('input')
    expect(ref.current).toBe(input)

    const callback = vi.fn()
    rerender(
      <Search.Panel
        panelDescription="Search results. Use the arrow keys to navigate."
        inputRef={callback}
      />
    )
    expect(callback).toHaveBeenLastCalledWith(input)
  })

  it('uses one combobox and composes controls outside the inline listbox', async () => {
    render(
      <Search.Panel
        panelDescription="Search results and a close button. Press Tab to reach the button."
        id="search"
        data={['Button', 'Input']}
      >
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

  it('gives each radio group in the panel one Tab stop', async () => {
    const user = userEvent.setup()
    render(
      <Search.Panel
        panelDescription="Search results with a category filter. Press Tab to reach it."
        data={['Button', 'Input']}
      >
        {({ results }) => (
          <>
            <fieldset>
              <legend>Category</legend>
              <input
                type="radio"
                name="category"
                value="all"
                aria-label="All"
              />
              <input
                type="radio"
                name="category"
                value="components"
                aria-label="Components"
                defaultChecked
              />
              <input
                type="radio"
                name="category"
                value="guidance"
                aria-label="Guidance"
              />
            </fieldset>
            <button type="button">Apply</button>
            {results}
          </>
        )}
      </Search.Panel>
    )
    const input = document.querySelector('input')
    await user.click(input)
    await waitFor(() =>
      expect(document.querySelector('[role="listbox"]')).not.toBeNull()
    )
    const radios = document.querySelectorAll<HTMLInputElement>(
      '.dnb-search__panel input[type="radio"]'
    )
    const apply = document.querySelector('.dnb-search__panel button')

    await user.tab()
    expect(radios[1]).toHaveFocus()

    await user.tab()
    expect(apply).toHaveFocus()

    await user.tab({ shift: true })
    expect(radios[1]).toHaveFocus()

    await user.tab({ shift: true })
    expect(input).toHaveFocus()

    // A read-only group can move focus without changing the selection.
    radios[2].focus()
    await user.tab()
    expect(apply).toHaveFocus()
  })

  it('enters a radio group without a selection at the first or last radio', async () => {
    const user = userEvent.setup()
    render(
      <Search.Panel
        panelDescription="Search results with a category filter. Press Tab to reach it."
        data={['Button', 'Input']}
      >
        {({ results }) => (
          <>
            <input type="radio" name="category" aria-label="All" />
            <input type="radio" name="category" aria-label="Guidance" />
            <button type="button">Apply</button>
            {results}
          </>
        )}
      </Search.Panel>
    )
    await user.click(document.querySelector('input'))
    await waitFor(() =>
      expect(document.querySelector('[role="listbox"]')).not.toBeNull()
    )
    const radios = document.querySelectorAll<HTMLInputElement>(
      '.dnb-search__panel input[type="radio"]'
    )

    await user.tab()
    expect(radios[0]).toHaveFocus()

    await user.tab()
    expect(
      document.querySelector('.dnb-search__panel button')
    ).toHaveFocus()

    await user.tab({ shift: true })
    expect(radios[1]).toHaveFocus()
  })
})
