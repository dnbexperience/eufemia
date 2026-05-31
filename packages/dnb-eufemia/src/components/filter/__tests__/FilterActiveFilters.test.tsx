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

    const wrapper = document.querySelector(
      '.dnb-height-animation--is-in-dom'
    )

    expect(wrapper).not.toBeInTheDocument()
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
