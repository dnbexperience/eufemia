import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Autocomplete } from '@dnb/eufemia/src/components'
import { formatSearchResultMarkdown } from '../SearchBarMarkdown'

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
})
