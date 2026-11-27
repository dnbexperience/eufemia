import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest'
import {
  cleanup,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router'
import { useNavigateSetup } from 'portal-query'
import { Autocomplete } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import { formatSearchResultMarkdown } from '../SearchBarMarkdown'
import { SearchBarInput } from '../SearchBar'

const { search } = vi.hoisted(() => ({
  search: vi.fn().mockResolvedValue({ hits: [] }),
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
})

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
  it('defaults to Web and searches the current query again when the platform changes, including with no results', async () => {
    const onQuery = vi.fn()
    render(
      <Provider locale="en-GB">
        <SearchBarInput onQuery={onQuery} />
      </Provider>
    )
    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'button' } })
    await waitFor(() =>
      expect(search).toHaveBeenLastCalledWith('button', {
        filters: 'platform:web',
      })
    )
    await waitFor(() =>
      expect(document.body.textContent).toContain('No options')
    )
    expect(search).toHaveBeenLastCalledWith('button', {
      filters: 'platform:web',
    })
    expect(
      document.querySelector<HTMLInputElement>('input[value="web"]')
        ?.checked
    ).toBe(true)
    for (const platform of ['ios', 'android', 'web']) {
      fireEvent.click(document.querySelector(`input[value="${platform}"]`))
      await waitFor(() =>
        expect(search).toHaveBeenLastCalledWith('button', {
          filters: `platform:${platform}`,
        })
      )
      await waitFor(() =>
        expect(document.body.textContent).toContain('No options')
      )
      expect(
        document.querySelector<HTMLInputElement>(
          `input[value="${platform}"]`
        ).checked
      ).toBe(true)
    }
    expect(onQuery).toHaveBeenCalledTimes(1)
  })

  it('ignores a pending response from the previous platform', async () => {
    let resolveIos: (value: { hits: unknown[] }) => void
    search.mockResolvedValueOnce({
      hits: [{ slug: 'web/button', title: 'Web Button' }],
    })
    render(<SearchBarInput />)
    const input = document.querySelector('#portal-search')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'button' } })
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'Web Button'
      )
    )
    search.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveIos = resolve
      })
    )
    fireEvent.click(document.querySelector('input[value="ios"]'))
    await waitFor(() =>
      expect(search).toHaveBeenLastCalledWith('button', {
        filters: 'platform:ios',
      })
    )
    expect(document.body.textContent).not.toContain('Web Button')
    search.mockResolvedValueOnce({
      hits: [{ slug: 'android/button', title: 'Android Button' }],
    })
    fireEvent.click(document.querySelector('input[value="android"]'))
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'Android Button'
      )
    )
    await act(async () =>
      resolveIos({ hits: [{ slug: 'ios/button', title: 'iOS Button' }] })
    )
    expect(document.querySelector('[role="option"]')?.textContent).toBe(
      'Android Button'
    )
  })

  it('offers each section once without nested links and opens the selected heading with Enter', async () => {
    const hit = {
      slug: 'web/components/search',
      pageTitle: 'Search → Overview',
      title: 'Keyboard shortcut',
      hash: 'keyboard-shortcut',
      headings: ['Overview', 'Behavior'],
      _snippetResult: {
        content: {
          value: 'Use <em>Cmd+K</em> to focus the `<button>` search.',
        },
      },
    }
    search.mockResolvedValueOnce({ hits: [hit, hit] })
    function Location() {
      useNavigateSetup()
      const location = useLocation()
      return <output>{location.pathname + location.hash}</output>
    }
    render(
      <MemoryRouter>
        <SearchBarInput />
        <Location />
      </MemoryRouter>
    )
    const input =
      document.querySelector<HTMLInputElement>('#portal-search')
    act(() => input.focus())
    fireEvent.change(input, { target: { value: 'shortcut' } })

    await waitFor(() =>
      expect(
        document.querySelector('[role="option"]')?.textContent
      ).toContain('Keyboard shortcut')
    )
    expect(document.querySelectorAll('[role="option"]')).toHaveLength(1)
    expect(
      document.querySelector('[role="option"]')?.textContent
    ).toContain('Search → Overview → Behavior')
    expect(
      document.querySelector('[role="option"]')?.textContent
    ).toContain('Use Cmd+K to focus the <button> search.')
    expect(document.querySelector('[role="option"] em')).toBeNull()
    expect(
      document.querySelector('[role="option"] code')?.textContent
    ).toBe('<button>')
    expect(
      document.querySelector('[role="option"] a, [role="option"] button')
    ).toBeNull()
    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 })
    await waitFor(() =>
      expect(input.getAttribute('aria-activedescendant')).toBe(
        'option-portal-search-0'
      )
    )
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })
    await waitFor(() =>
      expect(document.querySelector('output')?.textContent).toBe(
        '/web/components/search/#keyboard-shortcut'
      )
    )
  })

  it('keeps legacy headings independently selectable while the index migrates', async () => {
    search.mockResolvedValueOnce({
      hits: [
        {
          slug: 'web/components/button',
          title: 'Button',
          headings: [null, { value: 'Keyboard', slug: 'keyboard' }],
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
    fireEvent.change(input, { target: { value: 'button' } })
    await waitFor(() =>
      expect(document.querySelectorAll('[role="option"]')).toHaveLength(2)
    )
    expect(
      document.querySelectorAll('[role="option"]')[1].textContent
    ).toContain('Keyboard')
    expect(document.querySelector('[role="option"] a')).toBeNull()
  })

  it.each(['compact', 'hero'] as const)(
    'renders %s search results in a portaled panel',
    async (variant) => {
      search.mockResolvedValueOnce({
        hits: [{ slug: 'web/components/button', title: 'Button' }],
      })
      render(
        <MemoryRouter>
          <SearchBarInput variant={variant} />
        </MemoryRouter>
      )
      const input = document.querySelector('#portal-search')
      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: 'button' } })

      await waitFor(() =>
        expect(
          document.querySelector('#eufemia-portal-root [role="option"]')
        ).not.toBeNull()
      )
      expect(
        document
          .querySelector('#eufemia-portal-root .dnb-search__panel')
          .classList.contains('dnb-popover--fixed')
      ).toBe(variant === 'compact')
    }
  )

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
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'Space'
      )
    )
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
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'Button'
      )
    )
    search.mockResolvedValue({
      hits: [{ slug: 'web/components/card', title: 'Card' }],
    })
    fireEvent.change(input, { target: { value: 'card' } })
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'Card'
      )
    )
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
    await waitFor(() =>
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'Button'
      )
    )
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
      expect(document.querySelector('[role="option"]')?.textContent).toBe(
        'List'
      )
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

  it.each(['hero', 'compact'] as const)(
    'uses the %s Search variant',
    (variant) => {
      const platformSpy = vi
        .spyOn(navigator, 'platform', 'get')
        .mockReturnValue('Win32')
      render(<SearchBarInput variant={variant} />)

      expect(
        document
          .querySelector('.portal-search')
          ?.classList.contains(`dnb-search--${variant}`)
      ).toBe(true)
      expect(
        document
          .querySelector('#portal-search')
          ?.getAttribute('aria-keyshortcuts')
      ).toBe('Control+K')
      platformSpy.mockRestore()
    }
  )
})
