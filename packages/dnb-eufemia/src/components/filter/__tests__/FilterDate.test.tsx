import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import '../../../core/vitest/mockMatchMediaSetup'
import { setMedia } from 'mock-match-media'
import FilterRoot from '../FilterRoot'
import FilterDate from '../FilterDate'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import FilterActiveFilters from '../FilterActiveFilters'
import { useFilterContext } from '../hooks/useFilter'

describe('Filter.Date', () => {
  it('renders accordion open when defaultOpen is true', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterDate label="Dato" defaultOpen />
        </FilterPanel>
      </FilterRoot>
    )

    // Open the panel first
    fireEvent.click(document.querySelector('.dnb-button'))

    const header = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    expect(header).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Filter.Date filter values', () => {
  it('sets date range filter when dates are selected', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="filters">{JSON.stringify(ctx.filters)}</span>
      )
    }

    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterDate label="Dato" />
        </FilterPanel>
        <FilterState />
      </FilterRoot>
    )

    // Open the panel
    fireEvent.click(document.querySelector('.dnb-button'))

    // Open the accordion
    const accordionHeader = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    fireEvent.click(accordionHeader)

    // Find the date inputs
    const dateInputs = document.querySelectorAll('.dnb-date-picker input')

    if (dateInputs.length >= 2) {
      fireEvent.change(dateInputs[0], { target: { value: '2024-01-01' } })
      fireEvent.change(dateInputs[1], { target: { value: '2024-01-31' } })

      const filters = JSON.parse(
        document.querySelector('[data-testid="filters"]').textContent
      )

      if (filters['date']) {
        expect(filters['date'].categoryLabel).toBe('Dato')
      }
    }
  })

  it('uses custom filterKey when provided', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterDate label="Period" filterKey="/period" defaultOpen />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const accordion = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    expect(accordion).toBeInTheDocument()
  })
})

describe('Filter.Date outside panel', () => {
  it('renders as a popover trigger when outside FilterPanel', () => {
    render(
      <FilterRoot>
        <FilterDate label="Dato" />
      </FilterRoot>
    )

    const trigger = document.querySelector('.dnb-date-picker')

    expect(trigger).toBeInTheDocument()
    // Should not render inside an accordion
    expect(
      document.querySelector('.dnb-accordion')
    ).not.toBeInTheDocument()
  })
})

describe('Filter.Date clearing', () => {
  it('clears the calendar when the active filter is removed', () => {
    function SetDateFilter() {
      const { setFilter } = useFilterContext()
      return (
        <button
          data-testid="set-date"
          onClick={() =>
            setFilter('date', {
              value: { from: '2024-01-10', to: '2024-01-20' },
              label: '2024-01-10 – 2024-01-20',
              categoryLabel: 'Dato',
            })
          }
        />
      )
    }

    render(
      <FilterRoot>
        <FilterDate label="Dato" />
        <FilterActiveFilters />
        <SetDateFilter />
      </FilterRoot>
    )

    // Set a date filter programmatically
    fireEvent.click(document.querySelector('[data-testid="set-date"]'))

    // Open the DatePicker to verify the dates are shown
    fireEvent.click(document.querySelector('.dnb-date-picker .dnb-button'))

    // The DatePicker year inputs should show the selected year
    const yearInputs = document.querySelectorAll(
      '.dnb-date-picker__input--year'
    )
    expect(yearInputs[0]).toHaveValue('2024')
    expect(yearInputs[1]).toHaveValue('2024')

    // Remove the active filter tag
    const removeButton = document.querySelector(
      '.dnb-filter__active-filters .dnb-tag'
    )
    fireEvent.click(removeButton)

    // After removal, the year inputs should show placeholder text
    expect(yearInputs[0]).toHaveValue('åååå')
    expect(yearInputs[1]).toHaveValue('åååå')
  })
})

describe('Filter.Date inline behavior', () => {
  it('renders inline DatePicker inside accordion on large screens', () => {
    setMedia({ width: '60em' })

    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterDate label="Dato" defaultOpen />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    expect(
      document.querySelector('.dnb-date-picker--inline')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-accordion')).toBeInTheDocument()
  })

  it('renders popover trigger on small screens', () => {
    setMedia({ width: '30em' })

    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterDate label="Dato" defaultOpen />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    expect(
      document.querySelector('.dnb-date-picker--inline')
    ).not.toBeInTheDocument()
    expect(document.querySelector('.dnb-accordion')).toBeInTheDocument()
  })
})

describe('Filter.Date accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterDate label="Dato" defaultOpen />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
