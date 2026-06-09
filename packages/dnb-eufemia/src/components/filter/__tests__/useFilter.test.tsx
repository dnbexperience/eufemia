import { render, renderHook, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterSearch from '../FilterSearch'
import { useFilter, useFilterContext } from '../hooks/useFilter'

describe('useFilter', () => {
  it('returns empty state when called with an unknown id', () => {
    const { result } = renderHook(() => useFilter('unknown-id'))

    expect(result.current.filters).toEqual({})
    expect(result.current.search).toBe('')
    expect(result.current.hasActiveFilters).toBe(false)
  })

  it('returns filter state synced with container', () => {
    function Consumer() {
      const { filters, hasActiveFilters } = useFilter('hook-test')
      return (
        <div>
          <span data-testid="active">{String(hasActiveFilters)}</span>
          <span data-testid="filters">{JSON.stringify(filters)}</span>
        </div>
      )
    }

    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() => ctx.setFilter('x', { value: 'y', label: 'Y' })}
        >
          Set
        </button>
      )
    }

    render(
      <>
        <FilterRoot id="hook-test">
          <SetFilter />
        </FilterRoot>
        <Consumer />
      </>
    )

    expect(
      document.querySelector('[data-testid="active"]').textContent
    ).toBe('false')

    fireEvent.click(document.querySelector('button'))

    expect(
      document.querySelector('[data-testid="active"]').textContent
    ).toBe('true')

    expect(
      document.querySelector('[data-testid="filters"]').textContent
    ).toContain('"x"')
  })

  it('can reset filters', () => {
    function Consumer() {
      const { filters, resetFilters } = useFilter('reset-test')
      return (
        <div>
          <span data-testid="count">{Object.keys(filters).length}</span>
          <button data-testid="reset" onClick={resetFilters}>
            Reset
          </button>
        </div>
      )
    }

    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          data-testid="set"
          onClick={() => ctx.setFilter('a', { value: '1', label: 'One' })}
        >
          Set
        </button>
      )
    }

    render(
      <>
        <FilterRoot id="reset-test">
          <SetFilter />
        </FilterRoot>
        <Consumer />
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')

    fireEvent.click(document.querySelector('[data-testid="reset"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')
  })
})

describe('useFilterContext', () => {
  it('throws when used outside Filter.Root', () => {
    function BadConsumer() {
      useFilterContext()
      return null
    }

    expect(() => render(<BadConsumer />)).toThrow(
      'Filter.useFilterContext() must be used inside a Filter.Root.'
    )
  })
})

describe('useFilter removeFilter', () => {
  it('can remove a specific filter by key', () => {
    function Consumer() {
      const { filters, removeFilter } = useFilter('remove-filter-test')
      return (
        <div>
          <span data-testid="count">{Object.keys(filters).length}</span>
          <button data-testid="remove" onClick={() => removeFilter('a')}>
            Remove
          </button>
        </div>
      )
    }

    function SetFilters() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="set-a"
            onClick={() => ctx.setFilter('a', { value: '1', label: 'A' })}
          >
            Set A
          </button>
          <button
            data-testid="set-b"
            onClick={() => ctx.setFilter('b', { value: '2', label: 'B' })}
          >
            Set B
          </button>
        </>
      )
    }

    render(
      <>
        <FilterRoot id="remove-filter-test">
          <SetFilters />
        </FilterRoot>
        <Consumer />
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="set-a"]'))
    fireEvent.click(document.querySelector('[data-testid="set-b"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('2')

    fireEvent.click(document.querySelector('[data-testid="remove"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')
  })
})

describe('useFilter hasActiveFilters', () => {
  it('returns true when search has a value', () => {
    function Consumer() {
      const { hasActiveFilters } = useFilter('search-active-test')
      return <span data-testid="active">{String(hasActiveFilters)}</span>
    }

    render(
      <>
        <FilterRoot id="search-active-test">
          <FilterSearch label="Search" />
        </FilterRoot>
        <Consumer />
      </>
    )

    expect(
      document.querySelector('[data-testid="active"]').textContent
    ).toBe('false')

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(
      document.querySelector('[data-testid="active"]').textContent
    ).toBe('true')
  })
})
