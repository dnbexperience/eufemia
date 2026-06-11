import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterSelection from '../FilterSelection'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import { useFilterContext } from '../hooks/useFilter'

describe('Filter.Selection', () => {
  const options = [
    { value: 'incoming', label: 'Innkommende' },
    { value: 'outgoing', label: 'Utgående' },
  ]

  it('renders checkboxes for each option', () => {
    render(
      <FilterRoot>
        <FilterSelection label="Type" filterKey="type" data={options} />
      </FilterRoot>
    )

    // Open the accordion to reveal the checkboxes
    const accordionHeader = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    fireEvent.click(accordionHeader)

    const checkboxes = document.querySelectorAll('.dnb-checkbox')

    expect(checkboxes).toHaveLength(2)
  })

  it('sets individual filter entries when checkboxes are checked', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="filters">{JSON.stringify(ctx.filters)}</span>
      )
    }

    render(
      <FilterRoot>
        <FilterSelection label="Type" filterKey="type" data={options} />
        <FilterState />
      </FilterRoot>
    )

    // Open the accordion to reveal the checkboxes
    const accordionHeader = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    fireEvent.click(accordionHeader)

    const checkboxInputs = document.querySelectorAll('.dnb-checkbox input')
    fireEvent.click(checkboxInputs[0])

    const filters = JSON.parse(
      document.querySelector('[data-testid="filters"]').textContent
    )

    expect(filters['type/incoming']).toEqual({
      value: 'incoming',
      label: 'Innkommende',
      categoryLabel: 'Type',
    })
    expect(filters['type/outgoing']).toBeUndefined()

    fireEvent.click(checkboxInputs[1])

    const filtersAfter = JSON.parse(
      document.querySelector('[data-testid="filters"]').textContent
    )

    expect(filtersAfter['type/incoming']).toBeDefined()
    expect(filtersAfter['type/outgoing']).toEqual({
      value: 'outgoing',
      label: 'Utgående',
      categoryLabel: 'Type',
    })
  })

  it('removes individual filter entry when checkbox is unchecked', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="filters">{JSON.stringify(ctx.filters)}</span>
      )
    }

    render(
      <FilterRoot>
        <FilterSelection label="Type" filterKey="type" data={options} />
        <FilterState />
      </FilterRoot>
    )

    const accordionHeader = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    fireEvent.click(accordionHeader)

    const checkboxInputs = document.querySelectorAll('.dnb-checkbox input')

    // Check both
    fireEvent.click(checkboxInputs[0])
    fireEvent.click(checkboxInputs[1])

    // Uncheck first
    fireEvent.click(checkboxInputs[0])

    const filters = JSON.parse(
      document.querySelector('[data-testid="filters"]').textContent
    )

    expect(filters['type/incoming']).toBeUndefined()
    expect(filters['type/outgoing']).toBeDefined()
  })

  it('renders accordion open when defaultOpen is true', () => {
    render(
      <FilterRoot>
        <FilterSelection
          label="Type"
          filterKey="type"
          data={options}
          defaultOpen
        />
      </FilterRoot>
    )

    const header = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    expect(header).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Filter.Selection accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <FilterRoot>
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
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
