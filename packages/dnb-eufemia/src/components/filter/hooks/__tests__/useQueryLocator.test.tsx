import { act } from 'react'
import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../../FilterRoot'
import FilterSearch from '../../FilterSearch'
import { useFilter, useFilterContext } from '../useFilter'
import useQueryLocator from '../useQueryLocator'

describe('useQueryLocator', () => {
  let replaceStateSpy: ReturnType<typeof vi.fn>
  let popstateListener: () => void

  const mockUrl = ({ search } = { search: 'existing=foo' }) => {
    window.history.replaceState({}, '', `http://localhost/?${search}`)

    const realReplaceState = window.history.replaceState.bind(
      window.history
    )
    replaceStateSpy = vi.fn(function (data, unused, url) {
      realReplaceState(data, unused, url)
    })
    window.history.replaceState =
      replaceStateSpy as typeof window.history.replaceState

    const realAddEventListener = window.addEventListener.bind(window)
    vi.spyOn(window, 'addEventListener').mockImplementation(
      (name, listener, ...args) => {
        if (name === 'popstate') {
          popstateListener = listener as () => void
        }
        realAddEventListener(name, listener, ...args)
      }
    )
  }

  afterEach(() => {
    vi.restoreAllMocks()
    window.history.replaceState({}, '', 'http://localhost/')
  })

  it('writes search to URL', () => {
    mockUrl()

    function Consumer() {
      useQueryLocator('url-search-test')
      return null
    }

    render(
      <>
        <FilterRoot id="url-search-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(window.location.search).toContain(
      'url-search-test-search=hello'
    )
    expect(window.location.search).toContain('existing=foo')
  })

  it('writes filters to URL', () => {
    mockUrl()

    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          data-testid="set"
          onClick={() =>
            ctx.setFilter('/status/active', {
              value: 'active',
              label: 'Active',
            })
          }
        >
          Set
        </button>
      )
    }

    function Consumer() {
      useQueryLocator('url-filters-test')
      return null
    }

    render(
      <>
        <FilterRoot id="url-filters-test">
          <SetFilter />
          <Consumer />
        </FilterRoot>
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(window.location.search).toContain('url-filters-test-filters=')
    expect(window.location.search).toContain('existing=foo')
  })

  it('restores search from URL on mount', () => {
    mockUrl({
      search: 'url-restore-search-test-search=restored',
    })

    function Consumer() {
      useQueryLocator('url-restore-search-test')
      const { search } = useFilter('url-restore-search-test')
      return <span data-testid="search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="url-restore-search-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('restored')
  })

  it('restores filters from URL on mount', () => {
    const filtersJson = JSON.stringify({
      '/status/active': {
        value: 'active',
        label: 'Active',
        categoryLabel: 'Status',
      },
    })
    mockUrl({
      search: `url-restore-filters-test-filters=${encodeURIComponent(filtersJson)}`,
    })

    function Consumer() {
      useQueryLocator('url-restore-filters-test')
      const { filters } = useFilter('url-restore-filters-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="url-restore-filters-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    expect(
      document.querySelector('[data-testid="filters"]').textContent
    ).toContain('/status/active')
  })

  it('restores state on popstate', () => {
    mockUrl({ search: '' })

    function Consumer() {
      useQueryLocator('url-popstate-test')
      const { search } = useFilter('url-popstate-test')
      return <span data-testid="search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="url-popstate-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    // Type something to push state
    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'typed' } })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('typed')

    // Simulate navigating to a URL with different search
    window.history.replaceState(
      {},
      '',
      'http://localhost/?url-popstate-test-search=from-url'
    )

    act(() => {
      popstateListener()
    })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('from-url')
  })

  it('cleans up popstate listener on unmount', () => {
    mockUrl()

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    function Consumer() {
      useQueryLocator('url-cleanup-test')
      return null
    }

    const { unmount } = render(
      <>
        <FilterRoot id="url-cleanup-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    )
  })

  it('preserves existing query parameters', () => {
    mockUrl({ search: 'keep=this&also=that' })

    function Consumer() {
      useQueryLocator('url-preserve-test')
      return null
    }

    render(
      <>
        <FilterRoot id="url-preserve-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'new' } })

    expect(window.location.search).toContain('keep=this')
    expect(window.location.search).toContain('also=that')
    expect(window.location.search).toContain(
      'url-preserve-test-search=new'
    )
  })

  it('removes search param when cleared', () => {
    mockUrl({ search: '' })

    function Consumer() {
      useQueryLocator('url-clear-test')
      return null
    }

    render(
      <>
        <FilterRoot id="url-clear-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'temp' } })

    expect(window.location.search).toContain('url-clear-test-search=temp')

    fireEvent.change(input, { target: { value: '' } })

    expect(window.location.search).not.toContain('url-clear-test-search')
  })

  it('does not write search to URL when excludeSearch is true', () => {
    mockUrl({ search: '' })

    function Consumer() {
      useQueryLocator('exclude-search-test', { excludeSearch: true })
      return null
    }

    render(
      <>
        <FilterRoot id="exclude-search-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(window.location.search).not.toContain(
      'exclude-search-test-search'
    )
  })

  it('does not restore search from URL when excludeSearch is true', () => {
    mockUrl({
      search: 'exclude-restore-test-search=ignored',
    })

    function Consumer() {
      useQueryLocator('exclude-restore-test', { excludeSearch: true })
      const { search } = useFilter('exclude-restore-test')
      return <span data-testid="search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="exclude-restore-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('')
  })

  it('strips prototype pollution keys from URL filters', () => {
    const filtersJson = JSON.stringify({
      __proto__: { polluted: true },
      '/status/active': { value: 'active', label: 'Active' },
    })
    mockUrl({
      search: `url-proto-test-filters=${encodeURIComponent(filtersJson)}`,
    })

    function Consumer() {
      useQueryLocator('url-proto-test')
      const { filters } = useFilter('url-proto-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="url-proto-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    const text = document.querySelector(
      '[data-testid="filters"]'
    ).textContent
    expect(text).toContain('/status/active')
    expect(text).not.toContain('polluted')
  })

  it('drops invalid filter entries from URL', () => {
    const filtersJson = JSON.stringify({
      invalid: 'not-an-object',
      '/status/active': { value: 'active', label: 'Active' },
    })
    mockUrl({
      search: `url-invalid-test-filters=${encodeURIComponent(filtersJson)}`,
    })

    function Consumer() {
      useQueryLocator('url-invalid-test')
      const { filters } = useFilter('url-invalid-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="url-invalid-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    const text = document.querySelector(
      '[data-testid="filters"]'
    ).textContent
    expect(text).toContain('/status/active')
    expect(text).not.toContain('invalid')
  })
})
