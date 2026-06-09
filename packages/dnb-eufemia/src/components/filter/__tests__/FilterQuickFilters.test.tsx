import { render } from '@testing-library/react'
import FilterQuickFilters from '../FilterQuickFilters'

describe('Filter.QuickFilters', () => {
  it('renders with dnb-filter__quick-filters class', () => {
    render(
      <FilterQuickFilters>
        <button>Filter A</button>
      </FilterQuickFilters>
    )

    const element = document.querySelector('.dnb-filter__quick-filters')

    expect(element).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FilterQuickFilters>
        <button>Filter A</button>
        <button>Filter B</button>
      </FilterQuickFilters>
    )

    const buttons = document.querySelectorAll(
      '.dnb-filter__quick-filters button'
    )

    expect(buttons).toHaveLength(2)
  })

  it('merges custom className', () => {
    render(
      <FilterQuickFilters className="my-custom">
        <button>Filter</button>
      </FilterQuickFilters>
    )

    const element = document.querySelector('.dnb-filter__quick-filters')

    expect(element.classList).toContain('my-custom')
  })

  it('supports spacing props', () => {
    render(
      <FilterQuickFilters top="large">
        <button>Filter</button>
      </FilterQuickFilters>
    )

    const element = document.querySelector('.dnb-filter__quick-filters')

    expect(element.className).toContain('dnb-space__top--large')
  })
})
