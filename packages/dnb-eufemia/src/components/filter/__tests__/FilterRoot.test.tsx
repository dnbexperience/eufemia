import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterSearch from '../FilterSearch'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import FilterActiveFilters from '../FilterActiveFilters'
import FilterSelection from '../FilterSelection'
import FilterMultiSelection from '../FilterMultiSelection'
import FilterDate from '../FilterDate'
import { useFilter, useFilterContext } from '../hooks/useFilter'
import type { FilterState } from '../FilterContext'
import { useSharedState } from '../../../shared/helpers/useSharedState'

describe('Filter.Root', () => {
  it('renders with dnb-filter class', () => {
    render(
      <FilterRoot id="test-filter">
        <p>Content</p>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element).toBeInTheDocument()
  })

  it('renders with role="search"', () => {
    render(
      <FilterRoot id="test-filter">
        <p>Content</p>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element).toHaveAttribute('role', 'search')
  })

  it('merges custom className', () => {
    render(
      <FilterRoot id="test-filter" className="my-custom">
        <p>Content</p>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element.classList).toContain('dnb-filter')
    expect(element.classList).toContain('my-custom')
  })

  it('renders children', () => {
    render(
      <FilterRoot id="test-filter">
        <p>Hello</p>
      </FilterRoot>
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
      <FilterRoot id="on-change-test" onChange={onChange}>
        <TestInner />
      </FilterRoot>
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
      <FilterRoot id="a11y-test">
        <p>Accessible</p>
      </FilterRoot>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('supports spacing props', () => {
    render(
      <FilterRoot id="container-spacing-test" top="large">
        <p>Content</p>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter')

    expect(element.className).toContain('dnb-space__top--large')
  })
})

describe('throws outside Filter.Root', () => {
  it('Filter.Search throws', () => {
    expect(() => render(<FilterSearch label="Søk" />)).toThrow(
      'Filter.Search must be used inside a Filter.Root.'
    )
  })

  it('Filter.ActiveFilters throws', () => {
    expect(() => render(<FilterActiveFilters />)).toThrow(
      'Filter.ActiveFilters must be used inside a Filter.Root.'
    )
  })

  it('Filter.Selection throws', () => {
    expect(() =>
      render(
        <FilterSelection
          label="Type"
          filterKey="/type"
          data={[{ value: 'a', label: 'A' }]}
        />
      )
    ).toThrow('Filter.Selection must be used inside a Filter.Root.')
  })

  it('Filter.MultiSelection throws', () => {
    expect(() =>
      render(
        <FilterMultiSelection
          label="Client"
          filterKey="/client"
          data={[{ value: 'a', title: 'A' }]}
        />
      )
    ).toThrow('Filter.MultiSelection must be used inside a Filter.Root.')
  })

  it('Filter.Date throws', () => {
    expect(() => render(<FilterDate label="Date" />)).toThrow(
      'Filter.Date must be used inside a Filter.Root.'
    )
  })
})

describe('defaultFilters', () => {
  it('initializes filters from defaultFilters', () => {
    function StateReader() {
      const ctx = useFilterContext()
      return (
        <span data-testid="count">{Object.keys(ctx.filters).length}</span>
      )
    }

    render(
      <FilterRoot
        id="default-filters-test"
        defaultFilters={{
          '/status': { value: 'active', label: 'Active' },
        }}
      >
        <StateReader />
      </FilterRoot>
    )

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')
  })

  it('shows defaultFilters in active filters', () => {
    render(
      <FilterRoot
        id="default-filters-active-test"
        defaultFilters={{
          '/status': { value: 'active', label: 'Active' },
        }}
      >
        <FilterActiveFilters />
      </FilterRoot>
    )

    const tag = document.querySelector('.dnb-tag')

    expect(tag.textContent).toContain('Active')
  })

  it('opens the panel by default', () => {
    render(
      <FilterRoot
        id="default-filters-panel-test"
        defaultFilters={{
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
        }}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Panel content</p>
        </FilterPanel>
      </FilterRoot>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).toBeInTheDocument()
    expect(panel.textContent).toContain('Panel content')
  })

  it('opens the relevant filter accordion', () => {
    render(
      <FilterRoot
        id="default-filters-accordion-test"
        defaultFilters={{
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
        }}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Payment type"
            filterKey="/type"
            data={[
              { value: 'card', label: 'Card' },
              { value: 'transfer', label: 'Transfer' },
            ]}
          />
          <FilterSelection
            label="Status"
            filterKey="/status"
            data={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    const accordions = document.querySelectorAll('.dnb-accordion')
    const typeAccordion = accordions[0]
    const statusAccordion = accordions[1]

    expect(typeAccordion).toHaveClass('dnb-accordion--expanded')
    expect(statusAccordion).not.toHaveClass('dnb-accordion--expanded')
  })

  it('does not open the panel when defaultFilters is not set', () => {
    render(
      <FilterRoot id="no-default-filters-panel-test">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Panel content</p>
        </FilterPanel>
      </FilterRoot>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).not.toBeInTheDocument()
  })

  it('checks the matching checkboxes in FilterSelection', () => {
    render(
      <FilterRoot
        id="default-filters-checked-test"
        defaultFilters={{
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
        }}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Payment type"
            filterKey="/type"
            data={[
              { value: 'card', label: 'Card' },
              { value: 'transfer', label: 'Transfer' },
            ]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-checkbox input[type="checkbox"]'
    )

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  })

  it('provides defaultFilters to useFilter consumers', () => {
    function FilterConsumer() {
      const { filters } = useFilter('default-filters-hook-test')
      const keys = Object.keys(filters)
      return (
        <ul>
          {keys.map((key) => (
            <li key={key} data-testid="filter-key">
              {filters[key].label}
            </li>
          ))}
        </ul>
      )
    }

    render(
      <>
        <FilterRoot
          id="default-filters-hook-test"
          defaultFilters={{
            '/type/card': {
              value: 'card',
              label: 'Card',
              categoryLabel: 'Payment type',
            },
          }}
        >
          <FilterPanel>
            <FilterSelection
              label="Payment type"
              filterKey="/type"
              data={[
                { value: 'card', label: 'Card' },
                { value: 'transfer', label: 'Transfer' },
              ]}
            />
          </FilterPanel>
        </FilterRoot>

        <FilterConsumer />
      </>
    )

    const items = document.querySelectorAll('[data-testid="filter-key"]')

    expect(items).toHaveLength(1)
    expect(items[0].textContent).toBe('Card')
  })

  it('calls onChange with defaultFilters when a filter changes', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        id="default-filters-onchange-test"
        onChange={onChange}
        defaultFilters={{
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
        }}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Payment type"
            filterKey="/type"
            data={[
              { value: 'card', label: 'Card' },
              { value: 'transfer', label: 'Transfer' },
            ]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-checkbox input[type="checkbox"]'
    )

    fireEvent.click(checkboxes[1])

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: expect.objectContaining({
          '/type/card': expect.objectContaining({ value: 'card' }),
          '/type/transfer': expect.objectContaining({ value: 'transfer' }),
        }),
      })
    )
  })

  it('applies defaultFilters even when useFilter initializes first', () => {
    function Example() {
      const { filters } = useFilter('default-filters-race-test')

      const selectedTypes = Object.keys(filters)
        .filter((key) => key.startsWith('/type/'))
        .map((key) => key.replace('/type/', ''))

      const transactions = [
        { id: 1, name: 'Rema 1000', type: 'card' },
        { id: 2, name: 'DNB Salary', type: 'transfer' },
        { id: 3, name: 'Elkjøp', type: 'card' },
      ]

      const filtered = transactions.filter((tx) => {
        if (selectedTypes.length > 0 && !selectedTypes.includes(tx.type)) {
          return false
        }
        return true
      })

      return (
        <>
          <FilterRoot
            id="default-filters-race-test"
            defaultFilters={{
              '/type/card': {
                value: 'card',
                label: 'Card',
                categoryLabel: 'Payment type',
              },
            }}
          >
            <FilterPanelButton>Filters</FilterPanelButton>
            <FilterPanel>
              <FilterSelection
                label="Payment type"
                filterKey="/type"
                data={[
                  { value: 'card', label: 'Card' },
                  { value: 'transfer', label: 'Transfer' },
                ]}
              />
            </FilterPanel>
          </FilterRoot>

          <ul data-testid="results">
            {filtered.map((tx) => (
              <li key={tx.id}>{tx.name}</li>
            ))}
          </ul>
        </>
      )
    }

    render(<Example />)

    const items = document.querySelectorAll('[data-testid="results"] li')

    expect(items).toHaveLength(2)
    expect(items[0].textContent).toBe('Rema 1000')
    expect(items[1].textContent).toBe('Elkjøp')
  })
})

describe('URL-restored filters', () => {
  // Simulates useQueryLocator pre-setting shared state before FilterRoot mounts
  function PresetFilters({
    id,
    children,
  }: {
    id: string
    children: React.ReactNode
  }) {
    const { extend } = useSharedState<FilterState>(id, {
      search: '',
      filters: {},
    })

    const initialized = React.useRef(false)
    if (!initialized.current) {
      initialized.current = true
      extend({
        filters: {
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
        },
      })
    }

    return <>{children}</>
  }

  it('opens the panel when filters are pre-set in shared state', () => {
    render(
      <PresetFilters id="url-panel-test">
        <FilterRoot id="url-panel-test">
          <FilterPanelButton>Filters</FilterPanelButton>
          <FilterPanel>
            <p>Panel content</p>
          </FilterPanel>
        </FilterRoot>
      </PresetFilters>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).toBeInTheDocument()
    expect(panel.textContent).toContain('Panel content')
  })

  it('opens the relevant accordion when filters are pre-set', () => {
    render(
      <PresetFilters id="url-accordion-test">
        <FilterRoot id="url-accordion-test">
          <FilterPanelButton>Filters</FilterPanelButton>
          <FilterPanel>
            <FilterSelection
              label="Payment type"
              filterKey="/type"
              data={[
                { value: 'card', label: 'Card' },
                { value: 'transfer', label: 'Transfer' },
              ]}
            />
            <FilterSelection
              label="Status"
              filterKey="/status"
              data={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </FilterPanel>
        </FilterRoot>
      </PresetFilters>
    )

    const accordions = document.querySelectorAll('.dnb-accordion')
    const typeAccordion = accordions[0]
    const statusAccordion = accordions[1]

    expect(typeAccordion).toHaveClass('dnb-accordion--expanded')
    expect(statusAccordion).not.toHaveClass('dnb-accordion--expanded')
  })

  it('shows pre-set filters in active filters', () => {
    render(
      <PresetFilters id="url-active-test">
        <FilterRoot id="url-active-test">
          <FilterActiveFilters />
        </FilterRoot>
      </PresetFilters>
    )

    const tag = document.querySelector('.dnb-tag')

    expect(tag).toBeInTheDocument()
    expect(tag.textContent).toContain('Card')
  })

  it('does not open the panel when defaultPanelOpen is false', () => {
    render(
      <PresetFilters id="url-panel-closed">
        <FilterRoot id="url-panel-closed" defaultPanelOpen={false}>
          <FilterPanelButton>Filters</FilterPanelButton>
          <FilterPanel>
            <p>Panel content</p>
          </FilterPanel>
        </FilterRoot>
      </PresetFilters>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).not.toBeInTheDocument()
  })
})

describe('defaultPanelOpen', () => {
  it('opens the panel initially when set to true', () => {
    render(
      <FilterRoot id="default-open-true" defaultPanelOpen>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Panel content</p>
        </FilterPanel>
      </FilterRoot>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).toBeInTheDocument()
    expect(panel.textContent).toContain('Panel content')
  })

  it('keeps the panel closed when set to false with defaultFilters', () => {
    render(
      <FilterRoot
        id="default-open-false-filters"
        defaultPanelOpen={false}
        defaultFilters={{
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
        }}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Panel content</p>
        </FilterPanel>
      </FilterRoot>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).not.toBeInTheDocument()
  })
})
