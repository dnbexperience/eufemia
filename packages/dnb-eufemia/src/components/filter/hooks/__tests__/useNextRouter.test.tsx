import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../../FilterRoot'
import FilterSearch from '../../FilterSearch'
import { useFilter, useFilterContext } from '../useFilter'
import useNextRouter from '../useNextRouter'

describe('useNextRouter', () => {
  let replaceSpy: ReturnType<typeof vi.fn<(url: string) => void>>
  let currentPathname: string
  let currentParams: URLSearchParams

  function createMockNextHooks(initial = '', pathname = '/page') {
    currentPathname = pathname
    currentParams = new URLSearchParams(initial)
    replaceSpy = vi.fn<(url: string) => void>()

    const useRouter = () => ({ replace: replaceSpy })
    const usePathname = () => currentPathname
    const useSearchParams = () => currentParams

    return { useRouter, usePathname, useSearchParams }
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('writes search to URL', () => {
    const hooks = createMockNextHooks('existing=foo')

    function Consumer() {
      useNextRouter('next-search-test', hooks)
      return null
    }

    render(
      <>
        <FilterRoot id="next-search-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(replaceSpy).toHaveBeenCalled()
    const lastUrl =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(lastUrl).toContain('next-search-test-search=hello')
    expect(lastUrl).toContain('existing=foo')
    expect(lastUrl.startsWith('/page?')).toBe(true)
  })

  it('writes filters to URL', () => {
    const hooks = createMockNextHooks()

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
      useNextRouter('next-filters-test', hooks)
      return null
    }

    render(
      <>
        <FilterRoot id="next-filters-test">
          <SetFilter />
          <Consumer />
        </FilterRoot>
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(replaceSpy).toHaveBeenCalled()
    const lastUrl =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(lastUrl).toContain('next-filters-test-filters=')

    const url = new URL(lastUrl, 'http://localhost')
    const filtersJson = url.searchParams.get('next-filters-test-filters')
    expect(JSON.parse(filtersJson)).toHaveProperty('/status/active')
  })

  it('restores search from URL on mount', () => {
    const hooks = createMockNextHooks(
      'next-restore-search-test-search=restored'
    )

    function Consumer() {
      useNextRouter('next-restore-search-test', hooks)
      const { search } = useFilter('next-restore-search-test')
      return <span data-testid="search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="next-restore-search-test">
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
    const hooks = createMockNextHooks(
      `next-restore-filters-test-filters=${encodeURIComponent(filtersJson)}`
    )

    function Consumer() {
      useNextRouter('next-restore-filters-test', hooks)
      const { filters } = useFilter('next-restore-filters-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="next-restore-filters-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    expect(
      document.querySelector('[data-testid="filters"]').textContent
    ).toContain('/status/active')
  })

  it('uses the correct pathname', () => {
    const hooks = createMockNextHooks('', '/dashboard/overview')

    function Consumer() {
      useNextRouter('next-pathname-test', hooks)
      return null
    }

    render(
      <>
        <FilterRoot id="next-pathname-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(replaceSpy).toHaveBeenCalled()
    const lastUrl =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(lastUrl.startsWith('/dashboard/overview?')).toBe(true)
  })

  it('preserves existing query parameters', () => {
    const hooks = createMockNextHooks('keep=this&also=that')

    function Consumer() {
      useNextRouter('next-preserve-test', hooks)
      return null
    }

    render(
      <>
        <FilterRoot id="next-preserve-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'new' } })

    expect(replaceSpy).toHaveBeenCalled()
    const lastUrl =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(lastUrl).toContain('keep=this')
    expect(lastUrl).toContain('also=that')
    expect(lastUrl).toContain('next-preserve-test-search=new')
  })

  it('removes search param when cleared', () => {
    const hooks = createMockNextHooks()

    function Consumer() {
      useNextRouter('next-clear-test', hooks)
      return null
    }

    render(
      <>
        <FilterRoot id="next-clear-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'temp' } })

    const firstUrl =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(firstUrl).toContain('next-clear-test-search=temp')

    fireEvent.change(input, { target: { value: '' } })

    const lastUrl =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(lastUrl).not.toContain('next-clear-test-search')
  })

  it('removes filters param when cleared', () => {
    const hooks = createMockNextHooks()

    function FilterControl() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="add"
            onClick={() =>
              ctx.setFilter('/type/card', {
                value: 'card',
                label: 'Card',
              })
            }
          >
            Add
          </button>
          <button data-testid="clear" onClick={() => ctx.resetFilters()}>
            Clear
          </button>
        </>
      )
    }

    function Consumer() {
      useNextRouter('next-remove-filters-test', hooks)
      return null
    }

    render(
      <>
        <FilterRoot id="next-remove-filters-test">
          <FilterControl />
          <Consumer />
        </FilterRoot>
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="add"]'))

    const afterAdd =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(afterAdd).toContain('next-remove-filters-test-filters=')

    fireEvent.click(document.querySelector('[data-testid="clear"]'))

    const afterClear =
      replaceSpy.mock.calls[replaceSpy.mock.calls.length - 1][0]
    expect(afterClear).not.toContain('next-remove-filters-test-filters')
  })

  it('ignores malformed JSON in URL', () => {
    const hooks = createMockNextHooks(
      'next-malformed-test-filters=not-valid-json'
    )

    function Consumer() {
      useNextRouter('next-malformed-test', hooks)
      const { filters } = useFilter('next-malformed-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="next-malformed-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    expect(
      document.querySelector('[data-testid="filters"]').textContent
    ).toBe('{}')
  })

  it('strips prototype pollution keys from URL filters', () => {
    const filtersJson = JSON.stringify({
      __proto__: { polluted: true },
      '/status/active': { value: 'active', label: 'Active' },
    })
    const hooks = createMockNextHooks(
      `next-proto-test-filters=${encodeURIComponent(filtersJson)}`
    )

    function Consumer() {
      useNextRouter('next-proto-test', hooks)
      const { filters } = useFilter('next-proto-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="next-proto-test">
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
    const hooks = createMockNextHooks(
      `next-invalid-test-filters=${encodeURIComponent(filtersJson)}`
    )

    function Consumer() {
      useNextRouter('next-invalid-test', hooks)
      const { filters } = useFilter('next-invalid-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="next-invalid-test">
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
