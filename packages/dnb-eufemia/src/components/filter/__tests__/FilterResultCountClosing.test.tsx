import { fireEvent, render } from '@testing-library/react'
import { useState } from 'react'
import FilterRoot from '../FilterRoot'
import FilterResultCount from '../FilterResultCount'
import { useFilterContext } from '../hooks/useFilter'

// Keep this regression in its own file so the HeightAnimation mock stays
// isolated from the regular FilterResultCount tests.
vi.mock('../../HeightAnimation', () => ({
  default: ({
    children,
    className,
    open,
  }: {
    children?: React.ReactNode
    className?: string
    open?: boolean
  }) => (
    <div className={className} data-open={String(open)}>
      {children}
    </div>
  ),
}))

const defaultFilters = {
  '/type/card': {
    value: 'card',
    label: 'Card',
  },
}

describe('Filter.ResultCount closing state', () => {
  it('keeps the last visible count while closing', () => {
    function Controls({ onClear }: { onClear: () => void }) {
      const { removeFilter } = useFilterContext()

      return (
        <button
          data-testid="clear-filter"
          onClick={() => {
            removeFilter('/type/card')
            onClear()
          }}
        >
          Clear
        </button>
      )
    }

    function Example() {
      const [count, setCount] = useState(3)

      return (
        <FilterRoot
          id="count-close-freeze-test"
          resultCount={count}
          defaultFilters={defaultFilters}
        >
          <Controls onClear={() => setCount(10)} />
          <FilterResultCount />
        </FilterRoot>
      )
    }

    render(<Example />)

    const count = document.querySelector('.dnb-filter__result-count')

    expect(count.textContent).toContain('3')

    fireEvent.click(document.querySelector('[data-testid="clear-filter"]'))

    const wrapper = document.querySelector(
      '.dnb-filter__result-count-wrapper'
    )
    const closingCount = document.querySelector(
      '.dnb-filter__result-count'
    )

    expect(wrapper.getAttribute('data-open')).toBe('false')
    expect(closingCount).toBeInTheDocument()
    expect(closingCount.textContent).toContain('3')
    expect(closingCount.textContent).not.toContain('10')
  })
})
