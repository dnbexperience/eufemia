import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { Autocomplete } from '@dnb/eufemia/src/components'
import { formatSearchResultMarkdown } from '../SearchBarMarkdown'
import { SearchBarInput } from '../SearchBar'

vi.mock('algoliasearch/lite', () => ({
  default: () => ({
    initIndex: () => ({
      search: vi.fn().mockResolvedValue({ hits: [] }),
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

afterEach(cleanup)

describe('SearchBar', () => {
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

  it('keeps inline code highlighting inside linked search results', () => {
    const { container } = render(
      <Autocomplete
        data={[
          <a key="result" href="/components/card">
            {formatSearchResultMarkdown('Use `Card`')}
          </a>,
        ]}
        open
        inputValue="Ca"
        id="portal-search-link-test"
        search={{ filter: false }}
        noAnimation
        skipPortal
      />
    )

    const link = container.querySelector('a')
    const code = link?.querySelector('code')
    const highlight = code?.querySelector(
      '.dnb-drawer-list__option__item--highlight'
    )

    expect(link).not.toBeNull()
    expect(code?.textContent).toBe('Card')
    expect(highlight?.textContent).toBe('Ca')
  })
})

describe('SearchBarInput', () => {
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

  it('hides the keyboard shortcut hint when the input has a value', () => {
    render(<SearchBarInput />)

    expect(document.querySelector('kbd')).not.toBeNull()

    const input = document.querySelector(
      '#portal-search'
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'button' } })

    expect(document.querySelector('kbd')).toBeNull()
  })
})
