import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterMultiSelection from '../FilterMultiSelection'
import { useFilterContext } from '../hooks/useFilter'

describe('Filter.MultiSelection', () => {
  const data = [
    { value: 'acme', title: 'Acme Corp' },
    { value: 'globex', title: 'Globex Inc' },
  ]

  it('renders inside an accordion', () => {
    render(
      <FilterRoot id="multi-sel-test">
        <FilterMultiSelection
          label="Client"
          filterKey="/client"
          data={data}
          defaultOpen
        />
      </FilterRoot>
    )

    const accordion = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    expect(accordion).toBeInTheDocument()
  })

  it('throws when used outside Filter.Root', () => {
    expect(() =>
      render(
        <FilterMultiSelection
          label="Client"
          filterKey="/client"
          data={data}
        />
      )
    ).toThrow('Filter.MultiSelection must be used inside a Filter.Root.')
  })
})

describe('Filter.MultiSelection state', () => {
  const data = [
    { value: 'acme', title: 'Acme Corp' },
    { value: 'globex', title: 'Globex Inc' },
  ]

  it('sets filter entries when items are selected', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="filters">{JSON.stringify(ctx.filters)}</span>
      )
    }

    render(
      <FilterRoot id="multi-sel-state-test">
        <FilterMultiSelection
          label="Client"
          filterKey="client"
          data={data}
          defaultOpen
        />
        <FilterState />
      </FilterRoot>
    )

    const checkboxes = document.querySelectorAll('.dnb-checkbox__input')
    fireEvent.click(checkboxes[0])

    const filters = JSON.parse(
      document.querySelector('[data-testid="filters"]').textContent
    )

    expect(filters['client/acme']).toEqual(
      expect.objectContaining({
        value: 'acme',
        label: 'Acme Corp',
      })
    )
  })

  it('removes filter entries when items are deselected', () => {
    function FilterState() {
      const ctx = useFilterContext()
      return (
        <span data-testid="count">{Object.keys(ctx.filters).length}</span>
      )
    }

    render(
      <FilterRoot id="multi-sel-remove-test">
        <FilterMultiSelection
          label="Client"
          filterKey="client"
          data={data}
          defaultOpen
        />
        <FilterState />
      </FilterRoot>
    )

    const checkboxes = document.querySelectorAll('.dnb-checkbox__input')

    // Select
    fireEvent.click(checkboxes[0])

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')

    // Deselect
    fireEvent.click(checkboxes[0])

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')
  })
})

describe('Filter.MultiSelection accessibility', () => {
  const data = [
    { value: 'acme', title: 'Acme Corp' },
    { value: 'globex', title: 'Globex Inc' },
  ]

  it('has no axe violations', async () => {
    const { container } = render(
      <FilterRoot id="multi-sel-a11y-test">
        <FilterMultiSelection
          label="Client"
          filterKey="/client"
          data={data}
          defaultOpen
        />
      </FilterRoot>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
