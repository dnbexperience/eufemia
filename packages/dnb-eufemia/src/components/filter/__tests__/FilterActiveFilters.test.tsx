import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterActiveFilters from '../FilterActiveFilters'
import FilterSelection from '../FilterSelection'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import { useFilterContext } from '../hooks/useFilter'

describe('Filter.ActiveFilters', () => {
  it('is hidden when no filters are active', () => {
    render(
      <FilterRoot id="empty-active">
        <FilterActiveFilters />
      </FilterRoot>
    )

    const content = document.querySelector('.dnb-filter__active-filters')

    expect(content).not.toBeInTheDocument()
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
      <FilterRoot id="active-tags-test">
        <SetFilter />
        <FilterActiveFilters />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('button'))

    const tag = document.querySelector('.dnb-tag')

    expect(tag).toBeInTheDocument()
    expect(tag.textContent).toContain('Innkommende')
  })

  it('shows category label in tag when showCategoryLabel is true', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', {
              value: 'incoming',
              label: 'Innkommende',
              categoryLabel: 'Betalingstype',
            })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterRoot id="show-filter-label-test">
        <SetFilter />
        <FilterActiveFilters showCategoryLabel />
      </FilterRoot>
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
              categoryLabel: 'Betalingstype',
            })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterRoot id="hide-filter-label-test">
        <SetFilter />
        <FilterActiveFilters />
      </FilterRoot>
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
      <FilterRoot id="remove-tag-test">
        <SetFilter />
        <FilterActiveFilters />
        <FilterState />
      </FilterRoot>
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

  it('shows tags when FilterSelection checkbox is checked', () => {
    render(
      <FilterRoot id="active-via-selection">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Type"
            filterKey="/type"
            defaultOpen
            data={[
              { value: 'card', label: 'Card' },
              { value: 'transfer', label: 'Transfer' },
            ]}
          />
        </FilterPanel>
        <FilterActiveFilters />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const checkbox = document.querySelector('.dnb-checkbox__input')
    fireEvent.click(checkbox)

    const tag = document.querySelector('.dnb-tag')

    expect(tag).toBeInTheDocument()
    expect(tag.textContent).toContain('Card')
  })
})

describe('Filter.ActiveFilters events', () => {
  it('calls onRemove when a filter tag is removed', () => {
    const onRemove = vi.fn()

    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', { value: 'a', label: 'Type A' })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterRoot id="on-remove-test">
        <SetFilter />
        <FilterActiveFilters onRemove={onRemove} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('button'))

    const removeButton = document.querySelector(
      '.dnb-tag.dnb-tag--removable'
    )
    fireEvent.click(removeButton)

    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledWith('type')
  })
})

describe('Filter.ActiveFilters accessibility', () => {
  it('hides the visual label from screen readers', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', {
              value: 'a',
              label: 'A',
            })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterRoot id="a11y-label-test">
        <SetFilter />
        <FilterActiveFilters />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('button'))

    const label = document.querySelector(
      '.dnb-filter__active-filters__label'
    )

    expect(label).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no axe violations', async () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          onClick={() =>
            ctx.setFilter('type', {
              value: 'a',
              label: 'A',
            })
          }
        >
          Set
        </button>
      )
    }

    const { container } = render(
      <FilterRoot id="a11y-active-test">
        <SetFilter />
        <FilterActiveFilters />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('button'))

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})

describe('Filter.ActiveFilters collapsible', () => {
  function SetManyFilters({ count }: { count: number }) {
    const ctx = useFilterContext()
    return (
      <button
        data-testid="set-many"
        onClick={() => {
          for (let i = 0; i < count; i++) {
            ctx.setFilter(`/type/${i}`, {
              value: String(i),
              label: `Filter ${i}`,
            })
          }
        }}
      >
        Set
      </button>
    )
  }

  it('does not show collapsible when below threshold', () => {
    render(
      <FilterRoot id="collapse-below-test">
        <SetManyFilters count={3} />
        <FilterActiveFilters collapsibleThreshold={5} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    expect(
      document.querySelector('.dnb-filter__active-filters__label')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-accordion')
    ).not.toBeInTheDocument()
  })

  it('shows collapsible accordion when above threshold', () => {
    render(
      <FilterRoot id="collapse-above-test">
        <SetManyFilters count={6} />
        <FilterActiveFilters collapsibleThreshold={5} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    expect(document.querySelector('.dnb-accordion')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-filter__active-filters__label')
    ).not.toBeInTheDocument()
  })

  it('shows filter count in the accordion title', () => {
    render(
      <FilterRoot id="collapse-count-test">
        <SetManyFilters count={6} />
        <FilterActiveFilters collapsibleThreshold={5} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    const accordion = document.querySelector('.dnb-accordion')

    expect(accordion.textContent).toContain('6')
  })

  it('shows a clear all button', () => {
    render(
      <FilterRoot id="collapse-clear-test">
        <SetManyFilters count={6} />
        <FilterActiveFilters collapsibleThreshold={5} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    const buttons = document.querySelectorAll(
      '.dnb-filter__active-filters .dnb-button--tertiary'
    )
    const clearButton = Array.from(buttons).find((btn) =>
      btn.textContent.includes('Fjern alle')
    )

    expect(clearButton).toBeInTheDocument()
  })

  it('clears all filters when clear all is clicked', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="count">{Object.keys(ctx.filters).length}</span>
      )
    }

    render(
      <FilterRoot id="collapse-clear-action-test">
        <SetManyFilters count={6} />
        <FilterActiveFilters collapsibleThreshold={5} />
        <FilterState />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('6')

    const buttons = document.querySelectorAll(
      '.dnb-filter__active-filters .dnb-button--tertiary'
    )
    const clearButton = Array.from(buttons).find((btn) =>
      btn.textContent.includes('Fjern alle')
    )
    fireEvent.click(clearButton)

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')
  })

  it('wraps tags in a scroll view when accordion is expanded', () => {
    render(
      <FilterRoot id="collapse-scroll-test">
        <SetManyFilters count={6} />
        <FilterActiveFilters collapsibleThreshold={5} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    // Expand the accordion
    const accordionButton = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    fireEvent.click(accordionButton)

    expect(
      document.querySelector('.dnb-filter__active-filters__scroll')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-scroll-view')).toBeInTheDocument()
  })

  it('renders tags inside the accordion content when expanded', () => {
    render(
      <FilterRoot id="collapse-tags-test">
        <SetManyFilters count={6} />
        <FilterActiveFilters collapsibleThreshold={5} />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set-many"]'))

    // Expand the accordion
    const accordionButton = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    fireEvent.click(accordionButton)

    const tags = document.querySelectorAll('.dnb-tag')

    expect(tags.length).toBe(6)
  })
})
