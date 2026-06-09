import { render, waitFor } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterResultCount from '../FilterResultCount'
import FilterContent from '../FilterContent'
import { useFilterAsync } from '../hooks/useFilter'

const defaultFilters = {
  '/type/card': {
    value: 'card',
    label: 'Card',
  },
}

describe('Filter.ResultCount', () => {
  it('renders the result count when filters are active', () => {
    render(
      <FilterRoot
        id="count-render-test"
        resultCount={5}
        defaultFilters={defaultFilters}
      >
        <FilterResultCount />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('5')
  })

  it('returns null when resultCount is undefined', () => {
    render(
      <FilterRoot
        id="count-undefined-test"
        defaultFilters={defaultFilters}
      >
        <FilterResultCount />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).not.toBeInTheDocument()
  })

  it('hides when no filters are active', () => {
    render(
      <FilterRoot id="count-no-active-test" resultCount={5}>
        <FilterResultCount />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).not.toBeInTheDocument()
  })

  it('shows without active filters when alwaysVisible is true', () => {
    render(
      <FilterRoot id="count-always-test" resultCount={5}>
        <FilterResultCount alwaysVisible />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('5')
  })

  it('shows 0 results when resultCount is 0 and filters are active', () => {
    render(
      <FilterRoot
        id="count-zero-test"
        resultCount={0}
        defaultFilters={defaultFilters}
      >
        <FilterResultCount />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('0')
  })

  it('uses the resultCount prop to override context', () => {
    render(
      <FilterRoot
        id="count-override-test"
        resultCount={10}
        defaultFilters={defaultFilters}
      >
        <FilterResultCount resultCount={42} />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element.textContent).toContain('42')
    expect(element.textContent).not.toContain('10')
  })

  it('renders custom children instead of the default message', () => {
    render(
      <FilterRoot
        id="count-children-test"
        resultCount={3}
        defaultFilters={defaultFilters}
      >
        <FilterResultCount>Showing 3 items</FilterResultCount>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element.textContent).toBe('Showing 3 items')
  })

  it('reads resultCount via connectedTo from shared state', () => {
    render(
      <>
        <FilterRoot
          id="count-connected-test"
          resultCount={7}
          defaultFilters={defaultFilters}
        />
        <FilterResultCount connectedTo="count-connected-test" />
      </>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('7')
  })

  it('inherits connectedTo from FilterContent context', () => {
    render(
      <>
        <FilterRoot
          id="count-inherited-test"
          resultCount={12}
          defaultFilters={defaultFilters}
        />
        <FilterContent connectedTo="count-inherited-test">
          <FilterResultCount />
        </FilterContent>
      </>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('12')
  })

  it('supports spacing props', () => {
    render(
      <FilterRoot
        id="count-spacing-test"
        resultCount={1}
        defaultFilters={defaultFilters}
      >
        <FilterResultCount top="large" />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element.className).toContain('dnb-space__top--large')
  })

  it('supports custom className', () => {
    render(
      <FilterRoot
        id="count-classname-test"
        resultCount={2}
        defaultFilters={defaultFilters}
      >
        <FilterResultCount className="my-custom-class" />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__result-count')

    expect(element.className).toContain('my-custom-class')
  })

  it('shows skeleton while async result is loading', async () => {
    let resolveFetch: (value: string[]) => void
    const fetcher = vi.fn().mockReturnValue(
      new Promise<string[]>((resolve) => {
        resolveFetch = resolve
      })
    )

    function Consumer() {
      useFilterAsync('count-skeleton-test', fetcher)
      return null
    }

    render(
      <>
        <FilterRoot id="count-skeleton-test">
          <Consumer />
        </FilterRoot>
        <FilterResultCount
          connectedTo="count-skeleton-test"
          alwaysVisible
        />
      </>
    )

    await waitFor(() => {
      const skeleton = document.querySelector(
        '.dnb-filter__result-count-wrapper .dnb-skeleton'
      )
      expect(skeleton).toBeInTheDocument()
    })

    resolveFetch(['a', 'b', 'c'])

    await waitFor(() => {
      const skeleton = document.querySelector(
        '.dnb-filter__result-count-wrapper .dnb-skeleton'
      )
      expect(skeleton).not.toBeInTheDocument()
    })
  })
})
