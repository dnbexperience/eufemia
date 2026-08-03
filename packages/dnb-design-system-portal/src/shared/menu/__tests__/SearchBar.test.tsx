import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
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
        disableFilter
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
        disableFilter
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
  beforeAll(() => {
    ;(window as unknown as { IS_TEST: boolean }).IS_TEST = true
  })

  afterEach(cleanup)

  it('renders a search trigger button in the header', () => {
    render(<SearchBarInput />)

    const trigger = document.querySelector('#portal-search')
    expect(trigger).not.toBeNull()
    expect(trigger?.tagName).toBe('BUTTON')
    expect(document.querySelector('.dnb-dialog')).toBeNull()
  })

  it('opens the dialog when clicking the trigger button', async () => {
    render(<SearchBarInput />)

    expect(document.querySelector('.dnb-dialog')).toBeNull()

    fireEvent.click(document.querySelector('#portal-search'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-dialog')).not.toBeNull()
    })
  })

  it('opens the dialog when pressing command+k', async () => {
    render(<SearchBarInput />)

    expect(document.querySelector('.dnb-dialog')).toBeNull()

    fireEvent.keyDown(document, { key: 'k', metaKey: true })

    await waitFor(() => {
      expect(document.querySelector('.dnb-dialog')).not.toBeNull()
    })
  })

  it('opens the dialog when pressing ctrl+k', async () => {
    render(<SearchBarInput />)

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })

    await waitFor(() => {
      expect(document.querySelector('.dnb-dialog')).not.toBeNull()
    })
  })

  it('renders the dialog top aligned so it can expand', async () => {
    render(<SearchBarInput />)

    fireEvent.keyDown(document, { key: 'k', metaKey: true })

    await waitFor(() => {
      const content = document.querySelector('.dnb-modal__content')
      expect(content).not.toBeNull()
      expect(
        content.classList.contains('dnb-modal__vertical-alignment--top')
      ).toBe(true)
    })
  })

  it('renders the search field with results inline in the dialog', async () => {
    render(<SearchBarInput />)

    fireEvent.keyDown(document, { key: 'k', metaKey: true })

    await waitFor(() => {
      const content = document.querySelector('.dnb-modal__content')
      expect(content).not.toBeNull()
      expect(content.querySelector('#portal-search-dialog')).not.toBeNull()
      expect(content.querySelector('.dnb-input__input')).not.toBeNull()
    })
  })
})
