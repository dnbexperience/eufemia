import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../../FilterRoot'
import FilterSearch from '../../FilterSearch'
import { useFilter, useFilterContext } from '../useFilter'
import useReactRouter from '../useReactRouter'

describe('useReactRouter', () => {
  let currentParams: URLSearchParams
  let setSearchParamsSpy: ReturnType<
    typeof vi.fn<
      (params: URLSearchParams, options?: { replace?: boolean }) => void
    >
  >

  function createMockUseSearchParams(
    initial = ''
  ): () => [
    URLSearchParams,
    (params: URLSearchParams, options?: { replace?: boolean }) => void,
  ] {
    currentParams = new URLSearchParams(initial)
    setSearchParamsSpy =
      vi.fn<
        (params: URLSearchParams, options?: { replace?: boolean }) => void
      >()

    return () => [currentParams, setSearchParamsSpy]
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('writes search to URL', () => {
    const useSearchParams = createMockUseSearchParams('existing=foo')

    function Consumer() {
      useReactRouter('rr-search-test', { useSearchParams })
      return null
    }

    render(
      <>
        <FilterRoot id="rr-search-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(setSearchParamsSpy).toHaveBeenCalled()
    const lastArgs =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ]
    expect(lastArgs[0].get('rr-search-test-search')).toBe('hello')
    expect(lastArgs[0].get('existing')).toBe('foo')
    expect(lastArgs[1]).toEqual({ replace: true })
  })

  it('writes filters to URL', () => {
    const useSearchParams = createMockUseSearchParams()

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
      useReactRouter('rr-filters-test', { useSearchParams })
      return null
    }

    render(
      <>
        <FilterRoot id="rr-filters-test">
          <SetFilter />
          <Consumer />
        </FilterRoot>
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(setSearchParamsSpy).toHaveBeenCalled()
    const lastCall =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ][0]
    const filtersJson = lastCall.get('rr-filters-test-filters')
    expect(filtersJson).toBeTruthy()
    expect(JSON.parse(filtersJson)).toHaveProperty('/status/active')
  })

  it('restores search from URL on mount', () => {
    const useSearchParams = createMockUseSearchParams(
      'rr-restore-search-test-search=restored'
    )

    function Consumer() {
      useReactRouter('rr-restore-search-test', { useSearchParams })
      const { search } = useFilter('rr-restore-search-test')
      return <span data-testid="search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="rr-restore-search-test">
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
    const useSearchParams = createMockUseSearchParams(
      `rr-restore-filters-test-filters=${encodeURIComponent(filtersJson)}`
    )

    function Consumer() {
      useReactRouter('rr-restore-filters-test', { useSearchParams })
      const { filters } = useFilter('rr-restore-filters-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="rr-restore-filters-test">
          <Consumer />
        </FilterRoot>
      </>
    )

    expect(
      document.querySelector('[data-testid="filters"]').textContent
    ).toContain('/status/active')
  })

  it('preserves existing query parameters', () => {
    const useSearchParams = createMockUseSearchParams(
      'keep=this&also=that'
    )

    function Consumer() {
      useReactRouter('rr-preserve-test', { useSearchParams })
      return null
    }

    render(
      <>
        <FilterRoot id="rr-preserve-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'new' } })

    expect(setSearchParamsSpy).toHaveBeenCalled()
    const lastCall =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ][0]
    expect(lastCall.get('keep')).toBe('this')
    expect(lastCall.get('also')).toBe('that')
    expect(lastCall.get('rr-preserve-test-search')).toBe('new')
  })

  it('removes search param when cleared', () => {
    const useSearchParams = createMockUseSearchParams()

    function Consumer() {
      useReactRouter('rr-clear-test', { useSearchParams })
      return null
    }

    render(
      <>
        <FilterRoot id="rr-clear-test">
          <FilterSearch label="Search" />
          <Consumer />
        </FilterRoot>
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'temp' } })

    const firstCall =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ][0]
    expect(firstCall.get('rr-clear-test-search')).toBe('temp')

    fireEvent.change(input, { target: { value: '' } })

    const lastCall =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ][0]
    expect(lastCall.has('rr-clear-test-search')).toBe(false)
  })

  it('removes filters param when cleared', () => {
    const useSearchParams = createMockUseSearchParams()

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
      useReactRouter('rr-remove-filters-test', { useSearchParams })
      return null
    }

    render(
      <>
        <FilterRoot id="rr-remove-filters-test">
          <FilterControl />
          <Consumer />
        </FilterRoot>
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="add"]'))

    const afterAdd =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ][0]
    expect(afterAdd.has('rr-remove-filters-test-filters')).toBe(true)

    fireEvent.click(document.querySelector('[data-testid="clear"]'))

    const afterClear =
      setSearchParamsSpy.mock.calls[
        setSearchParamsSpy.mock.calls.length - 1
      ][0]
    expect(afterClear.has('rr-remove-filters-test-filters')).toBe(false)
  })

  it('ignores malformed JSON in URL', () => {
    const useSearchParams = createMockUseSearchParams(
      'rr-malformed-test-filters=not-valid-json'
    )

    function Consumer() {
      useReactRouter('rr-malformed-test', { useSearchParams })
      const { filters } = useFilter('rr-malformed-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="rr-malformed-test">
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
    const useSearchParams = createMockUseSearchParams(
      `rr-proto-test-filters=${encodeURIComponent(filtersJson)}`
    )

    function Consumer() {
      useReactRouter('rr-proto-test', { useSearchParams })
      const { filters } = useFilter('rr-proto-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="rr-proto-test">
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
    const useSearchParams = createMockUseSearchParams(
      `rr-invalid-test-filters=${encodeURIComponent(filtersJson)}`
    )

    function Consumer() {
      useReactRouter('rr-invalid-test', { useSearchParams })
      const { filters } = useFilter('rr-invalid-test')
      return <span data-testid="filters">{JSON.stringify(filters)}</span>
    }

    render(
      <>
        <FilterRoot id="rr-invalid-test">
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
