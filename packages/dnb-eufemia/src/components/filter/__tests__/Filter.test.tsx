import { render, fireEvent, waitFor } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterContainer from '../FilterContainer'
import FilterSearch from '../FilterSearch'
import FilterActiveFilters from '../FilterActiveFilters'
import FilterSelection from '../FilterSelection'
import FilterMore from '../FilterMore'
import FilterIndicator from '../FilterIndicator'
import FilterItem from '../FilterItem'
import FilterDate from '../FilterDate'
import FilterNoResults from '../FilterNoResults'
import FilterResultsContainer from '../FilterResultsContainer'
import List from '../../list/List'
import { useFilter, useFilterAsync, useFilterContext } from '../useFilter'

describe('Filter.Container', () => {
  it('renders with dnb-filter class', () => {
    render(
      <FilterContainer id="test-filter">
        <p>Content</p>
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element).toBeInTheDocument()
  })

  it('renders with role="search"', () => {
    render(
      <FilterContainer id="test-filter">
        <p>Content</p>
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element).toHaveAttribute('role', 'search')
  })

  it('merges custom className', () => {
    render(
      <FilterContainer id="test-filter" className="my-custom">
        <p>Content</p>
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element.classList).toContain('dnb-filter')
    expect(element.classList).toContain('my-custom')
  })

  it('renders children', () => {
    render(
      <FilterContainer id="test-filter">
        <p>Hello</p>
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element.textContent).toContain('Hello')
  })

  it('calls onChange when state changes', () => {
    const onChange = vi.fn()

    function TestInner() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('status', { value: 'paid', label: 'Paid' })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterContainer id="on-change-test" onChange={onChange}>
        <TestInner />
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: { status: { value: 'paid', label: 'Paid' } },
      })
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <FilterContainer id="a11y-test">
        <p>Accessible</p>
      </FilterContainer>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})

describe('Filter.Search', () => {
  it('renders a search input', () => {
    render(
      <FilterContainer id="search-test">
        <FilterSearch label="Søk" placeholder="Søk..." />
      </FilterContainer>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toBeInTheDocument()
  })

  it('updates search state on input', () => {
    function SearchValue() {
      const ctx = useFilterContext()
      return <span data-testid="value">{ctx.search}</span>
    }

    render(
      <FilterContainer id="search-input-test">
        <FilterSearch label="Søk" />
        <SearchValue />
      </FilterContainer>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })

    const value = document.querySelector('[data-testid="value"]')

    expect(value.textContent).toBe('hello')
  })

  it('shows progress indicator when typing and resultLoading is true', () => {
    render(
      <FilterContainer id="search-loading-test" resultLoading>
        <FilterSearch label="Søk" />
      </FilterContainer>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'test' } })

    const indicator = document.querySelector(
      '.dnb-filter__search .dnb-progress-indicator'
    )

    expect(indicator).toBeInTheDocument()
  })

  it('does not show progress indicator when resultLoading is true but not typing', () => {
    render(
      <FilterContainer id="search-no-typing-test" resultLoading>
        <FilterSearch label="Søk" />
      </FilterContainer>
    )

    const indicator = document.querySelector(
      '.dnb-filter__search .dnb-progress-indicator'
    )

    expect(indicator).not.toBeInTheDocument()
  })

  it('does not show progress indicator when resultLoading is false', () => {
    render(
      <FilterContainer id="search-no-loading-test">
        <FilterSearch label="Søk" />
      </FilterContainer>
    )

    const indicator = document.querySelector(
      '.dnb-filter__search .dnb-progress-indicator'
    )

    expect(indicator).not.toBeInTheDocument()
  })
})

describe('Filter.Indicator', () => {
  it('renders a progress indicator when resultLoading is true', () => {
    render(
      <FilterContainer id="indicator-loading" resultLoading>
        <FilterIndicator />
      </FilterContainer>
    )

    const indicator = document.querySelector(
      '.dnb-filter__indicator .dnb-progress-indicator'
    )

    expect(indicator).toBeInTheDocument()
  })

  it('wraps content in HeightAnimation', () => {
    render(
      <FilterContainer id="indicator-idle">
        <FilterIndicator />
      </FilterContainer>
    )

    const animation = document.querySelector('.dnb-height-animation')
    const indicator = animation?.querySelector('.dnb-filter__indicator')

    expect(animation).toBeInTheDocument()
    expect(indicator).toBeInTheDocument()
  })

  it('renders children alongside the spinner', () => {
    render(
      <FilterContainer id="indicator-children" resultLoading>
        <FilterIndicator>Loading…</FilterIndicator>
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter__indicator')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Loading…')
  })
})

describe('Filter.ActiveFilters', () => {
  it('renders nothing when no filters are active', () => {
    render(
      <FilterContainer id="empty-active">
        <FilterActiveFilters />
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter__active-filters')

    expect(element).not.toBeInTheDocument()
  })

  it('renders active filter tags', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', {
              value: 'incoming',
              label: 'Innkommende',
            })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterContainer id="active-tags-test">
        <SetFilter />
        <FilterActiveFilters />
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('button'))

    const tag = document.querySelector('.dnb-tag')

    expect(tag).toBeInTheDocument()
    expect(tag.textContent).toContain('Innkommende')
  })

  it('shows filter label in tag when showFilterLabel is true', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', {
              value: 'incoming',
              label: 'Innkommende',
              filterLabel: 'Betalingstype',
            })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterContainer id="show-filter-label-test">
        <SetFilter />
        <FilterActiveFilters showFilterLabel />
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('button'))

    const tag = document.querySelector('.dnb-tag')

    expect(tag.textContent).toContain('Betalingstype: Innkommende')
  })

  it('hides filter label in tag by default', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', {
              value: 'incoming',
              label: 'Innkommende',
              filterLabel: 'Betalingstype',
            })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterContainer id="hide-filter-label-test">
        <SetFilter />
        <FilterActiveFilters />
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('button'))

    const tag = document.querySelector('.dnb-tag')

    expect(tag.textContent).toContain('Innkommende')
    expect(tag.textContent).not.toContain('Betalingstype')
  })

  it('removes filter when tag is clicked', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          data-testid="set"
          onClick={() => ctx.setFilter('type', { value: 'a', label: 'A' })}
        >
          Set
        </button>
      )
    }

    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="count">{Object.keys(ctx.filters).length}</span>
      )
    }

    render(
      <FilterContainer id="remove-tag-test">
        <SetFilter />
        <FilterActiveFilters />
        <FilterState />
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')

    const removeButton = document.querySelector(
      '.dnb-tag.dnb-tag--removable'
    )
    fireEvent.click(removeButton)

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')
  })
})

describe('Filter.Item', () => {
  it('renders accordion closed by default', () => {
    render(
      <FilterContainer id="item-default">
        <FilterItem label="Test" filterKey="/test">
          <span data-testid="content">Content</span>
        </FilterItem>
      </FilterContainer>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders accordion open when defaultOpen is true', () => {
    render(
      <FilterContainer id="item-open">
        <FilterItem label="Test" filterKey="/test" defaultOpen>
          <span data-testid="content">Content</span>
        </FilterItem>
      </FilterContainer>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header).toHaveAttribute('aria-expanded', 'true')
  })

  it('remembers accordion state across remounts', () => {
    const { unmount } = render(
      <FilterContainer id="item-persist">
        <FilterItem label="Test" filterKey="/test">
          <p>Content</p>
        </FilterItem>
      </FilterContainer>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    // Open the accordion
    fireEvent.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'true')

    // Unmount and remount children (simulates dialog close/reopen)
    unmount()

    render(
      <FilterContainer id="item-persist">
        <FilterItem label="Test" filterKey="/test">
          <p>Content</p>
        </FilterItem>
      </FilterContainer>
    )

    const newHeader = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(newHeader).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Filter.Selection', () => {
  const options = [
    { value: 'incoming', label: 'Innkommende' },
    { value: 'outgoing', label: 'Utgående' },
  ]

  it('renders checkboxes for each option', () => {
    render(
      <FilterContainer id="selection-test">
        <FilterSelection label="Type" filterKey="type" options={options} />
      </FilterContainer>
    )

    // Open the accordion to reveal the checkboxes
    const accordionHeader = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    fireEvent.click(accordionHeader)

    const checkboxes = document.querySelectorAll('.dnb-checkbox')

    expect(checkboxes).toHaveLength(2)
  })

  it('sets filter when checkbox is checked', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="filters">{JSON.stringify(ctx.filters)}</span>
      )
    }

    render(
      <FilterContainer id="selection-check-test">
        <FilterSelection label="Type" filterKey="type" options={options} />
        <FilterState />
      </FilterContainer>
    )

    // Open the accordion to reveal the checkboxes
    const accordionHeader = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    fireEvent.click(accordionHeader)

    const firstCheckbox = document.querySelector('.dnb-checkbox input')
    fireEvent.click(firstCheckbox)

    const filtersText = document.querySelector(
      '[data-testid="filters"]'
    ).textContent

    expect(filtersText).toContain('incoming')
  })
  it('renders accordion open when defaultOpen is true', () => {
    render(
      <FilterContainer id="selection-open-test">
        <FilterSelection
          label="Type"
          filterKey="type"
          options={options}
          defaultOpen
        />
      </FilterContainer>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Filter.Date', () => {
  it('renders accordion open when defaultOpen is true', () => {
    render(
      <FilterContainer id="date-open-test">
        <List.Container separated>
          <FilterDate label="Dato" defaultOpen />
        </List.Container>
      </FilterContainer>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('useFilter', () => {
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
        <FilterContainer id="hook-test">
          <SetFilter />
        </FilterContainer>
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
        <FilterContainer id="reset-test">
          <SetFilter />
        </FilterContainer>
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
  it('throws when used outside Filter.Container', () => {
    function BadConsumer() {
      useFilterContext()
      return null
    }

    expect(() => render(<BadConsumer />)).toThrow(
      'Filter.useFilterContext() must be used inside a Filter.Container.'
    )
  })
})

describe('useFilterAsync', () => {
  it('calls fetcher and returns data', async () => {
    const fetcher = vi.fn().mockResolvedValue([1, 2, 3])

    function Consumer() {
      const { data } = useFilterAsync('async-test', fetcher)
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <>
        <FilterContainer id="async-test" />
        <Consumer />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="data"]').textContent
      ).toBe('[1,2,3]')
    })
  })

  it('returns initialData before fetch completes', () => {
    const fetcher = vi.fn().mockReturnValue(new Promise(() => {}))

    function Consumer() {
      const { data } = useFilterAsync('async-initial-test', fetcher, {
        initialData: ['initial'],
      })
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <>
        <FilterContainer id="async-initial-test" />
        <Consumer />
      </>
    )

    expect(
      document.querySelector('[data-testid="data"]').textContent
    ).toBe('["initial"]')
  })

  it('sets resultLoading on shared state', async () => {
    let resolveFetch: (value: unknown[]) => void
    const fetcher = vi.fn().mockReturnValue(
      new Promise<unknown[]>((resolve) => {
        resolveFetch = resolve
      })
    )

    function Consumer() {
      const { loading } = useFilterAsync('async-loading-test', fetcher)
      return (
        <span data-testid="loading">{loading ? 'true' : 'false'}</span>
      )
    }

    render(
      <>
        <FilterContainer id="async-loading-test" />
        <Consumer />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="loading"]').textContent
      ).toBe('true')
    })

    resolveFetch([1, 2])

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="loading"]').textContent
      ).toBe('false')
    })
  })

  it('syncs resultCount so NoResults reads it', async () => {
    const fetcher = vi.fn().mockResolvedValue([])

    function Consumer() {
      useFilterAsync('async-no-results-test', fetcher)
      return null
    }

    render(
      <>
        <FilterContainer id="async-no-results-test" />
        <Consumer />
        <FilterNoResults connectedTo="async-no-results-test" />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-filter__no-results')
      ).toBeInTheDocument()
    })
  })

  it('ignores stale responses when a newer request is pending', async () => {
    const resolvers: Array<(value: string[]) => void> = []
    const fetcher = vi.fn().mockImplementation(
      () =>
        new Promise<string[]>((resolve) => {
          resolvers.push(resolve)
        })
    )

    function Consumer() {
      const { data } = useFilterAsync('async-race-test', fetcher)
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <>
        <FilterContainer id="async-race-test">
          <FilterSearch label="Søk" />
        </FilterContainer>
        <Consumer />
      </>
    )

    // Wait for first fetch call
    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(1)
    })

    // Trigger a second fetch by updating the search value
    fireEvent.change(document.querySelector('.dnb-filter__search input'), {
      target: { value: 'new' },
    })

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(2)
    })

    // Resolve the first (stale) request
    resolvers[0](['stale'])

    // Resolve the second (current) request
    resolvers[1](['current'])

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="data"]').textContent
      ).toBe('["current"]')
    })
  })

  it('passes filters and search to the fetcher', async () => {
    const fetcher = vi.fn().mockResolvedValue([])

    function Consumer() {
      useFilterAsync('async-params-test', fetcher)
      return null
    }

    render(
      <FilterContainer id="async-params-test">
        <FilterSearch label="Søk" />
        <Consumer />
      </FilterContainer>
    )

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith({
        filters: {},
        search: '',
      })
    })

    fireEvent.change(document.querySelector('.dnb-filter__search input'), {
      target: { value: 'hello' },
    })

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'hello' })
      )
    })
  })
})

describe('Filter.More', () => {
  beforeEach(() => {
    window['IS_TEST'] = true
    document.getElementById('dnb-modal-root')?.remove()
    window.__modalStack = undefined
  })

  afterEach(() => {
    delete window['IS_TEST']
  })

  it('renders trigger button with label', () => {
    render(
      <FilterContainer id="more-label-test">
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    const button = document.querySelector('.dnb-filter__more-trigger')

    expect(button).toBeInTheDocument()
    expect(button.textContent).toContain('Flere filtre')
  })

  it('opens a dialog when trigger is clicked', async () => {
    render(
      <FilterContainer id="more-open-test">
        <FilterMore>
          <p>Inside dialog</p>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      const dialog = document.querySelector('.dnb-dialog')

      expect(dialog).toBeInTheDocument()
    })
  })

  it('renders children inside the dialog', async () => {
    render(
      <FilterContainer id="more-children-test">
        <FilterMore>
          <span data-testid="child">Inside</span>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      const child = document.querySelector('[data-testid="child"]')

      expect(child).toBeInTheDocument()
    })
  })

  it('shows result count button when resultCount is set', async () => {
    render(
      <FilterContainer id="more-results-test" resultCount={5}>
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      const resultButton = document.querySelector(
        '.dnb-dialog .dnb-button--primary'
      )

      expect(resultButton).toBeInTheDocument()
      expect(resultButton.textContent).toContain('5')
    })
  })

  it('closes dialog when result button is clicked', async () => {
    render(
      <FilterContainer id="more-close-test" resultCount={3}>
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-dialog .dnb-button--primary')
      ).toBeInTheDocument()
    })

    fireEvent.click(
      document.querySelector('.dnb-dialog .dnb-button--primary')
    )

    await waitFor(() => {
      const dialog = document.querySelector('.dnb-dialog')

      expect(dialog).not.toBeInTheDocument()
    })
  })

  it('throws when used outside Filter.Container', () => {
    expect(() => render(<FilterMore label="Test" />)).toThrow(
      'Filter.More must be used inside a Filter.Container.'
    )
  })

  it('shows indicator on result button when resultLoading is true', async () => {
    render(
      <FilterContainer
        id="more-loading-test"
        resultCount={5}
        resultLoading
      >
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      const resultButton = document.querySelector(
        '.dnb-filter__more-result .dnb-button'
      )

      expect(resultButton).toBeInTheDocument()
      expect(
        document.querySelector(
          '.dnb-filter__more-result .dnb-filter__indicator'
        )
      ).toBeInTheDocument()
    })
  })

  it('shows result button when resultLoading is true even without resultCount', async () => {
    render(
      <FilterContainer id="more-loading-no-count-test" resultLoading>
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      const resultButton = document.querySelector(
        '.dnb-filter__more-result .dnb-button'
      )

      expect(resultButton).toBeInTheDocument()
      expect(
        document.querySelector(
          '.dnb-filter__more-result .dnb-filter__indicator'
        )
      ).toBeInTheDocument()
    })
  })

  it('removes indicator when resultLoading changes to false', async () => {
    const { rerender } = render(
      <FilterContainer
        id="more-loading-toggle-test"
        resultCount={5}
        resultLoading
      >
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    fireEvent.click(document.querySelector('.dnb-filter__more-trigger'))

    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-filter__more-result .dnb-filter__indicator'
        )
      ).toBeInTheDocument()
    })

    rerender(
      <FilterContainer
        id="more-loading-toggle-test"
        resultCount={12}
        resultLoading={false}
      >
        <FilterMore>
          <p>Content</p>
        </FilterMore>
      </FilterContainer>
    )

    await waitFor(() => {
      const resultButton = document.querySelector(
        '.dnb-filter__more-result .dnb-button'
      )

      expect(
        document.querySelector(
          '.dnb-filter__more-result .dnb-filter__indicator .dnb-progress-indicator'
        )
      ).not.toBeInTheDocument()
      expect(resultButton.textContent).toContain('12')
    })
  })
})

describe('Filter.ResultsContainer', () => {
  it('renders children', () => {
    render(
      <FilterContainer id="results-render-test">
        <FilterResultsContainer connectedTo="results-render-test">
          <p>Result content</p>
        </FilterResultsContainer>
      </FilterContainer>
    )

    expect(
      document.querySelector('.dnb-filter__results-container')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-filter__results-container p')
    ).toBeInTheDocument()
  })

  it('shows skeleton when resultLoading is true', () => {
    render(
      <FilterContainer id="results-skeleton-test" resultLoading>
        <FilterResultsContainer connectedTo="results-skeleton-test">
          <p>Loading content</p>
        </FilterResultsContainer>
      </FilterContainer>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__results-container.dnb-skeleton'
    )

    expect(skeleton).toBeInTheDocument()
  })

  it('does not show skeleton when resultLoading is false', () => {
    render(
      <FilterContainer id="results-no-skeleton-test" resultLoading={false}>
        <FilterResultsContainer connectedTo="results-no-skeleton-test">
          <p>Normal content</p>
        </FilterResultsContainer>
      </FilterContainer>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__results-container.dnb-skeleton'
    )

    expect(skeleton).not.toBeInTheDocument()
  })

  it('reads resultLoading via connectedTo from shared state', () => {
    render(
      <>
        <FilterContainer id="results-shared-test" resultLoading />
        <FilterResultsContainer connectedTo="results-shared-test">
          <p>Shared content</p>
        </FilterResultsContainer>
      </>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__results-container.dnb-skeleton'
    )

    expect(skeleton).toBeInTheDocument()
  })
})

describe('Filter.NoResults', () => {
  it('shows message when resultCount is 0', () => {
    render(
      <FilterContainer id="no-results-zero-test" resultCount={0}>
        <FilterNoResults />
      </FilterContainer>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).toBeInTheDocument()
  })

  it('returns nothing when resultCount is greater than 0', () => {
    render(
      <FilterContainer id="no-results-positive-test" resultCount={5}>
        <FilterNoResults />
      </FilterContainer>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).not.toBeInTheDocument()
  })

  it('reads resultCount via connectedTo from shared state', () => {
    render(
      <>
        <FilterContainer id="no-results-shared-test" resultCount={0} />
        <FilterNoResults connectedTo="no-results-shared-test" />
      </>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).toBeInTheDocument()
  })

  it('shows custom children text', () => {
    render(
      <FilterContainer id="no-results-custom-test" resultCount={0}>
        <FilterNoResults>Custom no results text</FilterNoResults>
      </FilterContainer>
    )

    const element = document.querySelector('.dnb-filter__no-results')

    expect(element.textContent).toContain('Custom no results text')
  })
})
