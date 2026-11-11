import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { Autocomplete } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import { formatSearchResultMarkdown } from '../SearchBarMarkdown'
import { SearchBarInput } from '../SearchBar'

const { search, navigate } = vi.hoisted(() => ({
  search: vi.fn().mockResolvedValue({ hits: [] }),
  navigate: vi.fn(),
}))

vi.mock('portal-query', async (importOriginal) => ({
  ...(await importOriginal<typeof import('portal-query')>()),
  navigate,
}))

vi.mock('algoliasearch/lite', () => ({
  default: () => ({
    initIndex: () => ({
      search,
    }),
  }),
}))

type CustomResizeTo = (opts: { width?: number; height?: number }) => void

beforeAll(() => {
  ;(window as unknown as { resizeTo: CustomResizeTo }).resizeTo =
    function resizeTo({
      width = window.innerWidth,
      height = window.innerHeight,
    }) {
      Object.assign(window, {
        innerWidth: width,
        innerHeight: height,
      })

      vi.spyOn(
        document.documentElement,
        'clientWidth',
        'get'
      ).mockImplementation(() => width)
      vi.spyOn(
        document.documentElement,
        'clientHeight',
        'get'
      ).mockImplementation(() => height)
    }
  ;(window.resizeTo as unknown as CustomResizeTo)({
    height: window.innerHeight,
  })
})

afterEach(() => {
  cleanup()
  search.mockReset().mockResolvedValue({ hits: [] })
  navigate.mockReset()
})

const getOptions = () =>
  Array.from(document.querySelectorAll('[role="option"]'))

const getOption = (text: string) =>
  getOptions().find((option) => option.textContent.includes(text))

const searchFor = (value: string) => {
  const input = document.querySelector('#portal-search')
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value } })
}

describe('SearchBar', () => {
  it.each([false, true, 42, {}, null, undefined])(
    'ignores non-string search metadata: %s',
    (value) => {
      expect(formatSearchResultMarkdown(value)).toBeNull()
    }
  )

  it('formats inline markdown code in search results', () => {
    const { container } = render(
      <>{formatSearchResultMarkdown('Use `--z-index-dropdown`')}</>
    )

    const code = container.querySelector('code')

    expect(container.textContent).toBe('Use --z-index-dropdown')
    expect(code).not.toBeNull()
    expect(code?.textContent).toBe('--z-index-dropdown')
  })

  it('formats inline markdown code wrapped in double backticks', () => {
    const { container } = render(
      <>{formatSearchResultMarkdown('Use ``--z-index-dropdown``')}</>
    )

    const code = container.querySelector('code')

    expect(container.textContent).toBe('Use --z-index-dropdown')
    expect(code).not.toBeNull()
    expect(code?.textContent).toBe('--z-index-dropdown')
  })

  it('keeps unmatched backticks as plain text', () => {
    const { container } = render(
      <>{formatSearchResultMarkdown('Use `--z-index-dropdown')}</>
    )

    expect(container.textContent).toBe('Use `--z-index-dropdown')
    expect(container.querySelector('code')).toBeNull()
  })

  it('keeps Autocomplete highlighting inside inline code', () => {
    const { container } = render(
      <Autocomplete
        data={[formatSearchResultMarkdown('Use `--z-index-dropdown`')]}
        open
        inputValue="--z-index"
        id="portal-search-test"
        search={{ filter: false }}
        noAnimation
        skipPortal
      />
    )

    const code = container.querySelector('code')
    const highlight = code?.querySelector(
      '.dnb-drawer-list__option__item--highlight'
    )

    expect(code).not.toBeNull()
    expect(highlight).not.toBeNull()
    expect(highlight?.textContent).toBe('--z-index')
  })
})

describe('SearchBarInput', () => {
  it('renders search results in the portal', async () => {
    search.mockResolvedValueOnce({
      hits: [{ slug: 'web/components/button', title: 'Button' }],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )
    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'button' } })

    await waitFor(() =>
      expect(
        document.querySelector('#eufemia-portal-root [role="option"]')
          ?.textContent
      ).toContain('Button')
    )
  })

  it('renders results as options without links inside', async () => {
    search.mockResolvedValueOnce({
      hits: [
        {
          slug: 'web/components/button',
          title: 'Button',
          description: 'Use buttons for actions',
          headings: [
            { value: 'Button sizes', slug: 'button-sizes' },
            { value: 'Icons', slug: 'icons' },
          ],
        },
      ],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )
    searchFor('button')

    await waitFor(() => expect(getOption('Button sizes')).toBeDefined())
    expect(
      document.querySelector(
        '[role="option"] :is(a, button, input, [tabindex])'
      )
    ).toBeNull()
  })

  it('lists up to five headings that match the query as their own options', async () => {
    search.mockResolvedValueOnce({
      hits: [
        {
          slug: 'web/components/button',
          title: 'Button',
          headings: [
            { value: 'Button', slug: 'button' },
            { value: 'Primary button', slug: 'primary-button' },
            { value: 'Icons', slug: 'icons' },
            { value: 'Secondary button', slug: 'secondary-button' },
            { value: 'Tertiary button', slug: 'tertiary-button' },
            { value: 'Button sizes', slug: 'button-sizes' },
            { value: 'Button `size`', slug: 'button-size' },
            { value: 'Disabled button', slug: 'disabled-button' },
          ],
        },
      ],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )
    searchFor('BUTTON')

    await waitFor(() => expect(getOptions()).toHaveLength(6))
    expect(getOptions().map((option) => option.textContent)).toEqual([
      'Button',
      'Primary buttonButton',
      'Secondary buttonButton',
      'Tertiary buttonButton',
      'Button sizesButton',
      'Button sizeButton',
    ])
  })

  it('navigates to the page or heading of the chosen option', async () => {
    search.mockResolvedValue({
      hits: [
        {
          slug: 'web/components/button',
          title: 'Button',
          headings: [{ value: 'Button sizes', slug: 'button-sizes' }],
        },
      ],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )

    searchFor('button')
    await waitFor(() => expect(getOption('Button sizes')).toBeDefined())
    fireEvent.click(getOption('Button sizes'))
    expect(navigate).toHaveBeenLastCalledWith(
      '/web/components/button/#button-sizes'
    )

    searchFor('buttons')
    await waitFor(() => expect(getOptions()).toHaveLength(1))
    fireEvent.click(getOptions()[0])
    expect(navigate).toHaveBeenLastCalledWith('/web/components/button/')
  })

  it('opens a result in a new tab on a modified or middle click', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    search.mockResolvedValueOnce({
      hits: [
        {
          slug: 'web/components/button',
          title: 'Button',
          headings: [{ value: 'Button sizes', slug: 'button-sizes' }],
        },
      ],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )
    searchFor('button')
    await waitFor(() => expect(getOption('Button sizes')).toBeDefined())

    fireEvent.click(getOption('Button sizes'), { metaKey: true })
    fireEvent(
      getOptions()[0],
      new MouseEvent('auxclick', { bubbles: true, button: 1 })
    )
    fireEvent(
      getOptions()[0],
      new MouseEvent('auxclick', { bubbles: true, button: 2 })
    )

    expect(open.mock.calls).toEqual([
      ['/web/components/button/#button-sizes', '_blank', 'noopener'],
      ['/web/components/button/', '_blank', 'noopener'],
    ])
    expect(navigate).not.toHaveBeenCalled()
    expect(getOption('Button sizes')).toBeDefined()
    open.mockRestore()
  })

  it('keeps searching when the query callback returns a value', async () => {
    search.mockResolvedValueOnce({
      hits: [
        { slug: 'web/layout-and-typography/layout/space', title: 'Space' },
      ],
    })
    const onQuery = vi.fn(() => true)
    render(
      <MemoryRouter>
        <SearchBarInput onQuery={onQuery} />
      </MemoryRouter>
    )
    const input = document.querySelector(
      '#portal-search'
    ) as HTMLInputElement
    input.focus()
    fireEvent.change(input, { target: { value: 'space' } })
    expect(onQuery).toHaveBeenCalledWith('space')
    await waitFor(() => expect(getOption('Space')).toBeDefined())
  })

  it('updates results after successive queries instead of retaining the first revision', async () => {
    search.mockResolvedValue({
      hits: [{ slug: 'web/components/button', title: 'Button' }],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )
    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'bu' } })
    await waitFor(() => expect(getOption('Button')).toBeDefined())
    search.mockResolvedValue({
      hits: [{ slug: 'web/components/card', title: 'Card' }],
    })
    fireEvent.change(input, { target: { value: 'card' } })
    await waitFor(() => expect(getOption('Card')).toBeDefined())
    expect(
      document.querySelector('.dnb-autocomplete--show-indicator')
    ).toBeNull()
    search.mockResolvedValue({ hits: [] })
  })

  it('shows results after the search query changes', async () => {
    search.mockResolvedValueOnce({
      hits: [{ slug: 'web/components/button', title: 'Button' }],
    })
    render(
      <MemoryRouter>
        <SearchBarInput onQuery={(value) => value === 'dance'} />
      </MemoryRouter>
    )
    const input = document.querySelector(
      '#portal-search'
    ) as HTMLInputElement
    input.focus()
    fireEvent.change(input, { target: { value: 'dance' } })
    fireEvent.change(input, { target: { value: 'button' } })
    await waitFor(() => expect(getOption('Button')).toBeDefined())
    expect(
      document.querySelector(
        '.dnb-autocomplete__root.dnb-drawer-list--hidden'
      )
    ).toBeNull()
  })

  it('stops loading when cleared and ignores the pending response', async () => {
    const calls = search.mock.calls.length
    let resolveSearch: (value: { hits: unknown[] }) => void
    search.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveSearch = resolve
      })
    )
    render(<SearchBarInput />)
    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'button' } })
    await waitFor(() => expect(search.mock.calls.length).toBe(calls + 1))
    fireEvent.change(input, { target: { value: '' } })
    await waitFor(() =>
      expect(
        document.querySelector('.dnb-autocomplete--show-indicator')
      ).toBeNull()
    )
    resolveSearch({ hits: [] })
    await waitFor(() => expect((input as HTMLInputElement).value).toBe(''))
    expect(document.body.textContent).not.toContain('No options')
  })

  it('shows List results without pages marked search: false', async () => {
    search.mockResolvedValueOnce({
      hits: [
        { slug: 'uilib/components/list', title: 'List' },
        {
          slug: 'uilib/components/list/visual-tests/custom-cells',
          title: 'List visual test',
          search: false,
        },
      ],
    })
    render(
      <MemoryRouter>
        <SearchBarInput />
      </MemoryRouter>
    )

    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'list' } })

    await waitFor(() => {
      expect(getOption('List')).toBeDefined()
    })
    expect(document.body.textContent).not.toContain('List visual test')
    expect(document.body.textContent).not.toContain(
      'includes is not a function'
    )
  })

  it('shows no options when every result is marked search: false', async () => {
    search.mockResolvedValueOnce({
      hits: [
        {
          slug: 'uilib/components/list/visual-tests/custom-cells',
          title: 'List visual test',
          search: false,
        },
      ],
    })
    render(
      <Provider locale="en-GB">
        <SearchBarInput />
      </Provider>
    )

    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'list' } })

    await waitFor(() => {
      expect(document.body.textContent).toContain('No options')
    })
    expect(document.body.textContent).not.toContain('List visual test')
  })

  it('renders the search input', () => {
    render(<SearchBarInput />)

    const input = document.querySelector('#portal-search')
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe('INPUT')
  })

  it('exposes the keyboard shortcut on the search input', () => {
    render(<SearchBarInput />)

    const input = document.querySelector('#portal-search')
    expect(input?.getAttribute('aria-keyshortcuts')).toBe(
      'Meta+K Control+K'
    )
  })

  it('focuses the search input when pressing command+k', () => {
    render(<SearchBarInput />)

    const input = document.querySelector('#portal-search')
    expect(document.activeElement).not.toBe(input)

    fireEvent.keyDown(document, { key: 'k', metaKey: true })

    expect(document.activeElement).toBe(input)
  })

  it('focuses the search input when pressing ctrl+k', () => {
    render(<SearchBarInput />)

    const input = document.querySelector('#portal-search')
    expect(document.activeElement).not.toBe(input)

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })

    expect(document.activeElement).toBe(input)
  })

  it('does not render a platform-specific hint on the server', () => {
    const html = renderToString(<SearchBarInput />)

    expect(html).not.toContain('<kbd')
  })

  it.each([
    ['MacIntel', '⌘ K'],
    ['Win32', 'Ctrl K'],
  ])('shows the %s keyboard shortcut hint', (platform, shortcut) => {
    const platformSpy = vi
      .spyOn(navigator, 'platform', 'get')
      .mockReturnValue(platform)

    render(<SearchBarInput />)

    const hint = document.querySelector('kbd')
    expect(hint).not.toBeNull()
    expect(hint?.textContent).toBe(shortcut)

    platformSpy.mockRestore()
  })

  it('replaces the keyboard shortcut with the clear button when typing', () => {
    render(<SearchBarInput />)

    expect(document.querySelector('kbd')).not.toBeNull()

    const input = document.querySelector(
      '#portal-search'
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'button' } })

    expect(document.querySelector('kbd')).toBeNull()

    fireEvent.click(document.querySelector('#portal-search-clear-button'))
    expect(input.value).toBe('')
    expect(document.querySelector('kbd')).not.toBeNull()
  })
})
