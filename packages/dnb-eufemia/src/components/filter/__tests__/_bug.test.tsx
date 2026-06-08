import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterActiveFilters from '../FilterActiveFilters'
import { useFilter, useFilterContext } from '../hooks/useFilter'

describe('manual mode resetFilters bug', () => {
  it('resetFilters in manual mode should clear committed filters and tags', () => {
    function ApplyAndReset() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="set"
            onClick={() =>
              ctx.setFilter('status', { value: 'paid', label: 'Paid' })
            }
          >
            Set
          </button>
          <button data-testid="commit" onClick={() => ctx.commitFilters()}>
            Commit
          </button>
          <button data-testid="reset" onClick={() => ctx.resetFilters()}>
            Reset
          </button>
        </>
      )
    }

    function ExternalReader() {
      const { filters } = useFilter('manual-reset-bug')
      return (
        <span data-testid="external-keys">
          {Object.keys(filters).join(',')}
        </span>
      )
    }

    render(
      <>
        <FilterRoot id="manual-reset-bug" behavior="manual">
          <ApplyAndReset />
          <FilterActiveFilters />
        </FilterRoot>
        <ExternalReader />
      </>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))
    fireEvent.click(document.querySelector('[data-testid="commit"]'))

    // Sanity: tag visible after commit
    expect(document.querySelectorAll('.dnb-tag')).toHaveLength(1)
    expect(
      document.querySelector('[data-testid="external-keys"]').textContent
    ).toBe('status')

    // Now reset
    fireEvent.click(document.querySelector('[data-testid="reset"]'))

    // Expect no tags and external reader sees empty
    expect(document.querySelectorAll('.dnb-tag')).toHaveLength(0)
    expect(
      document.querySelector('[data-testid="external-keys"]').textContent
    ).toBe('')
  })
})
