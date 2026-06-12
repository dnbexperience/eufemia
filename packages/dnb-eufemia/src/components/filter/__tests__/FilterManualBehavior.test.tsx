import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterSearch from '../FilterSearch'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import FilterActiveFilters from '../FilterActiveFilters'
import FilterResultCount from '../FilterResultCount'
import FilterSelection from '../FilterSelection'
import { useFilter, useFilterContext } from '../hooks/useFilter'

const defaultFilters = {
  '/type/card': {
    value: 'card',
    label: 'Card',
    categoryLabel: 'Type',
  },
}

const defaultFiltersMultiple = {
  ...defaultFilters,
  '/type/transfer': {
    value: 'transfer',
    label: 'Transfer',
    categoryLabel: 'Type',
  },
}

describe('behavior="manual"', () => {
  it('does not call onChange when a filter changes', () => {
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
      <FilterRoot behavior="manual" onChange={onChange}>
        <TestInner />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('button'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onChange when search changes', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot behavior="manual" onChange={onChange}>
        <FilterSearch label="Søk" />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: 'hello',
      filters: {},
    })
  })

  it('applies search with only committed filters when panel filters are uncommitted', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot behavior="manual" onChange={onChange}>
        <FilterSearch label="Søk" />
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Status"
            filterKey="/status"
            defaultOpen
            data={[{ value: 'active', label: 'Active' }]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('button[aria-expanded]'))
    fireEvent.click(document.querySelector('.dnb-checkbox__input'))

    expect(onChange).not.toHaveBeenCalled()

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: 'hello',
      filters: {},
    })
  })

  it('preserves unrelated draft filters when an applied tag is removed', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        behavior="manual"
        defaultFilters={{
          '/status/active': {
            value: 'active',
            label: 'Active',
            categoryLabel: 'Status',
          },
        }}
        onChange={onChange}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Status"
            filterKey="/status"
            defaultOpen
            data={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </FilterPanel>
        <FilterActiveFilters />
      </FilterRoot>
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-checkbox input[type="checkbox"]'
    )

    fireEvent.click(checkboxes[1])

    expect(checkboxes[1]).toBeChecked()
    expect(onChange).not.toHaveBeenCalled()

    const removeButton = document.querySelector(
      '.dnb-tag.dnb-tag--removable'
    )

    fireEvent.click(removeButton)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: '',
      filters: {},
    })
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(document.querySelector('.dnb-tag')).not.toBeInTheDocument()
  })

  it('propagates search to shared state in realtime', () => {
    function HookReader() {
      const { search } = useFilter('manual-search-shared')
      return <span data-testid="hook-search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="manual-search-shared" behavior="manual">
          <FilterSearch label="Søk" />
        </FilterRoot>
        <HookReader />
      </>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'realtime' } })

    expect(
      document.querySelector('[data-testid="hook-search"]').textContent
    ).toBe('realtime')
  })

  it('updates internal state without emitting', () => {
    function StateReader() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot behavior="manual">
        <FilterSearch label="Søk" />
        <StateReader />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'draft' } })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('draft')
  })

  it('calls onChange when commitFilters is called', () => {
    const onChange = vi.fn()

    function TestInner() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="set"
            onClick={() =>
              ctx.setFilter('status', {
                value: 'paid',
                label: 'Paid',
              })
            }
          >
            Set
          </button>
          <button data-testid="commit" onClick={() => ctx.commitFilters()}>
            Commit
          </button>
        </>
      )
    }

    render(
      <FilterRoot behavior="manual" resultCount={5} onChange={onChange}>
        <TestInner />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(onChange).not.toHaveBeenCalled()

    fireEvent.click(document.querySelector('[data-testid="commit"]'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: '',
      filters: { status: { value: 'paid', label: 'Paid' } },
    })
    expect(onChange.mock.calls[0][0]).not.toHaveProperty('resultCount')
  })

  it('reverts state when revertFilters is called', () => {
    function TestInner() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="set"
            onClick={() =>
              ctx.setFilter('status', {
                value: 'paid',
                label: 'Paid',
              })
            }
          >
            Set
          </button>
          <button data-testid="revert" onClick={() => ctx.revertFilters()}>
            Revert
          </button>
          <span data-testid="count">
            {Object.keys(ctx.filters).length}
          </span>
        </>
      )
    }

    render(
      <FilterRoot behavior="manual">
        <TestInner />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')

    fireEvent.click(document.querySelector('[data-testid="revert"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')
  })

  it('renders apply and cancel buttons in the panel', () => {
    render(
      <FilterRoot behavior="manual">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const actions = document.querySelector('.dnb-filter__panel-actions')

    expect(actions).toBeInTheDocument()

    const buttons = actions.querySelectorAll('.dnb-button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent).toContain('Bruk filter')
    expect(buttons[1].textContent).toContain('Avbryt')
  })

  it('does not render apply/cancel in realtime mode', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const actions = document.querySelector('.dnb-filter__panel-actions')

    expect(actions).not.toBeInTheDocument()

    const closeButton = document.querySelector('.dnb-filter__panel-close')

    expect(closeButton).toBeInTheDocument()
  })

  it('commits and closes panel when apply is clicked', () => {
    const onChange = vi.fn()

    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          data-testid="set"
          onClick={() =>
            ctx.setFilter('/type', { value: 'a', label: 'A' })
          }
        >
          Set
        </button>
      )
    }

    render(
      <FilterRoot behavior="manual" onChange={onChange}>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <SetFilter />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(onChange).not.toHaveBeenCalled()

    const applyButton = document.querySelector(
      '.dnb-filter__panel-actions .dnb-button--primary'
    )

    fireEvent.click(applyButton)

    expect(onChange).toHaveBeenCalledTimes(1)

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).not.toBeInTheDocument()
  })

  it('reverts and closes panel when cancel is clicked', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <button
          data-testid="set"
          onClick={() =>
            ctx.setFilter('/type', { value: 'a', label: 'A' })
          }
        >
          Set
        </button>
      )
    }

    function StateReader() {
      const ctx = useFilterContext()
      return (
        <span data-testid="count">{Object.keys(ctx.filters).length}</span>
      )
    }

    render(
      <FilterRoot behavior="manual">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <SetFilter />
        </FilterPanel>
        <StateReader />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')

    const cancelButton = document.querySelector(
      '.dnb-filter__panel-actions .dnb-button--tertiary'
    )

    fireEvent.click(cancelButton)

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')
  })

  it('does not show active filters until filters are applied', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="set"
            onClick={() =>
              ctx.setFilter('/type', { value: 'a', label: 'A' })
            }
          >
            Set
          </button>
          <button data-testid="commit" onClick={() => ctx.commitFilters()}>
            Commit
          </button>
        </>
      )
    }

    render(
      <FilterRoot behavior="manual">
        <SetFilter />
        <FilterActiveFilters />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    const tags = document.querySelectorAll('.dnb-tag')

    expect(tags).toHaveLength(0)

    fireEvent.click(document.querySelector('[data-testid="commit"]'))

    const tagsAfterCommit = document.querySelectorAll('.dnb-tag')

    expect(tagsAfterCommit).toHaveLength(1)
    expect(tagsAfterCommit[0].textContent).toContain('A')
  })

  it('does not show result count until filters are applied', () => {
    function SetFilter() {
      const ctx = useFilterContext()
      return (
        <>
          <button
            data-testid="set"
            onClick={() =>
              ctx.setFilter('/type', { value: 'a', label: 'A' })
            }
          >
            Set
          </button>
          <button data-testid="commit" onClick={() => ctx.commitFilters()}>
            Commit
          </button>
        </>
      )
    }

    render(
      <FilterRoot behavior="manual" resultCount={5}>
        <SetFilter />
        <FilterResultCount />
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('[data-testid="set"]'))

    expect(
      document.querySelector('.dnb-filter__result-count')
    ).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('[data-testid="commit"]'))

    const resultCount = document.querySelector('.dnb-filter__result-count')

    expect(resultCount).toBeInTheDocument()
    expect(resultCount.textContent).toContain('5')
  })

  it('shows result count when search is typed', () => {
    render(
      <FilterRoot behavior="manual" resultCount={5}>
        <FilterSearch label="Søk" />
        <FilterResultCount />
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__result-count')
    ).not.toBeInTheDocument()

    const input = document.querySelector('input')
    fireEvent.change(input, { target: { value: 'card' } })

    const resultCount = document.querySelector('.dnb-filter__result-count')

    expect(resultCount).toBeInTheDocument()
    expect(resultCount.textContent).toContain('5')
  })

  it('submits filters when an applied filter tag is removed', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        behavior="manual"
        defaultFilters={defaultFilters}
        onChange={onChange}
      >
        <FilterActiveFilters />
      </FilterRoot>
    )

    const removeButton = document.querySelector(
      '.dnb-tag.dnb-tag--removable'
    )

    fireEvent.click(removeButton)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: '',
      filters: {},
    })
    expect(document.querySelector('.dnb-tag')).not.toBeInTheDocument()
  })

  it('submits remaining filters and preserves search when an applied filter tag is removed', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        behavior="manual"
        defaultFilters={defaultFiltersMultiple}
        resultCount={5}
        onChange={onChange}
      >
        <FilterSearch label="Søk" />
        <FilterActiveFilters />
      </FilterRoot>
    )

    const input = document.querySelector('input')
    fireEvent.change(input, { target: { value: 'salary' } })

    expect(onChange).toHaveBeenCalledWith({
      search: 'salary',
      filters: defaultFiltersMultiple,
    })
    onChange.mockClear()

    const tags = document.querySelectorAll('.dnb-tag.dnb-tag--removable')
    const removeButton = Array.from(tags).find((tag) =>
      tag.textContent.includes('Card')
    )

    fireEvent.click(removeButton)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: 'salary',
      filters: {
        '/type/transfer': {
          value: 'transfer',
          label: 'Transfer',
          categoryLabel: 'Type',
        },
      },
    })
    expect(onChange.mock.calls[0][0]).not.toHaveProperty('resultCount')
    expect(input).toHaveValue('salary')
    expect(document.querySelector('.dnb-tag').textContent).toContain(
      'Transfer'
    )
  })

  it('submits filters and preserves search when applied filters are cleared', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        behavior="manual"
        defaultFilters={defaultFiltersMultiple}
        resultCount={5}
        onChange={onChange}
      >
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
        <FilterSearch label="Søk" />
        <FilterActiveFilters />
      </FilterRoot>
    )

    const input = document.querySelector('input')
    fireEvent.change(input, { target: { value: 'card' } })

    expect(onChange).toHaveBeenCalledWith({
      search: 'card',
      filters: defaultFiltersMultiple,
    })
    onChange.mockClear()

    const buttons = document.querySelectorAll(
      '.dnb-filter__active-filters .dnb-button--tertiary'
    )
    const clearButton = Array.from(buttons).find((button) =>
      button.textContent.includes('Fjern alle')
    )

    fireEvent.click(clearButton)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: 'card',
      filters: {},
    })
    expect(onChange.mock.calls[0][0]).not.toHaveProperty('resultCount')
    expect(input).toHaveValue('card')
    expect(document.querySelector('.dnb-tag')).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-filter__panel')
    ).not.toBeInTheDocument()
  })

  it('submits filters when an applied selection is unchecked', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        behavior="manual"
        defaultFilters={defaultFilters}
        onChange={onChange}
      >
        <FilterSelection
          label="Type"
          filterKey="/type"
          defaultOpen
          data={[{ value: 'card', label: 'Card' }]}
        />
      </FilterRoot>
    )

    const checkbox = document.querySelector('.dnb-checkbox__input')

    expect(checkbox).toBeChecked()

    fireEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      search: '',
      filters: {},
    })
  })

  it('does not submit filters when an applied selection is unchecked inside the panel', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot
        behavior="manual"
        defaultFilters={defaultFilters}
        onChange={onChange}
      >
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Type"
            filterKey="/type"
            defaultOpen
            data={[{ value: 'card', label: 'Card' }]}
          />
        </FilterPanel>
        <FilterActiveFilters />
      </FilterRoot>
    )

    const checkbox = document.querySelector('.dnb-checkbox__input')

    expect(checkbox).toBeChecked()

    fireEvent.click(checkbox)

    expect(onChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
    expect(document.querySelector('.dnb-tag')).toBeInTheDocument()
  })

  it('does not submit filters when an unapplied selection is unchecked', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot behavior="manual" onChange={onChange}>
        <FilterSelection
          label="Type"
          filterKey="/type"
          defaultOpen
          data={[{ value: 'card', label: 'Card' }]}
        />
      </FilterRoot>
    )

    const checkbox = document.querySelector('.dnb-checkbox__input')

    fireEvent.click(checkbox)
    fireEvent.click(checkbox)

    expect(onChange).not.toHaveBeenCalled()
  })

  it('resets shared search state when resetFilters is called', () => {
    function Controls() {
      const ctx = useFilterContext()
      return (
        <>
          <button data-testid="reset" onClick={() => ctx.resetFilters()}>
            Reset
          </button>
        </>
      )
    }

    function ExternalConsumer() {
      const { search } = useFilter('manual-reset-shared')
      return <span data-testid="external-search">{search}</span>
    }

    render(
      <>
        <FilterRoot id="manual-reset-shared" behavior="manual">
          <FilterSearch label="Search" />
          <Controls />
        </FilterRoot>
        <ExternalConsumer />
      </>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(
      document.querySelector('[data-testid="external-search"]').textContent
    ).toBe('hello')

    fireEvent.click(document.querySelector('[data-testid="reset"]'))

    expect(
      document.querySelector('[data-testid="external-search"]').textContent
    ).toBe('')
  })

  it('calls onChange when resetFilters is called', () => {
    const onChange = vi.fn()

    function Controls() {
      const ctx = useFilterContext()
      return (
        <button data-testid="reset" onClick={() => ctx.resetFilters()}>
          Reset
        </button>
      )
    }

    render(
      <FilterRoot behavior="manual" onChange={onChange}>
        <FilterSearch label="Search" />
        <Controls />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-input__input')
    fireEvent.change(input, { target: { value: 'hello' } })
    onChange.mockClear()

    fireEvent.click(document.querySelector('[data-testid="reset"]'))

    expect(onChange).toHaveBeenCalledWith({
      search: '',
      filters: {},
    })
  })
})
