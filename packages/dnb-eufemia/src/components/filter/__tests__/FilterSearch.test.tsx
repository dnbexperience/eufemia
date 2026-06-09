import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterSearch from '../FilterSearch'
import { useFilterContext } from '../hooks/useFilter'

describe('Filter.Search', () => {
  it('renders a search input', () => {
    render(
      <FilterRoot id="search-test">
        <FilterSearch label="Søk" placeholder="Søk..." />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toBeInTheDocument()
  })

  it('updates search state on input', () => {
    function SearchValue() {
      const ctx = useFilterContext()
      return <span data-testid="value">{ctx.search}</span>
    }

    render(
      <FilterRoot id="search-input-test">
        <FilterSearch label="Søk" />
        <SearchValue />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })

    const value = document.querySelector('[data-testid="value"]')

    expect(value.textContent).toBe('hello')
  })

  it('shows progress indicator when typing and resultLoading is true', () => {
    render(
      <FilterRoot id="search-loading-test" resultLoading>
        <FilterSearch label="Søk" />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'test' } })

    const indicator = document.querySelector(
      '.dnb-filter__search .dnb-progress-indicator'
    )

    expect(indicator).toBeInTheDocument()
  })

  it('does not show progress indicator when resultLoading is true but not typing', () => {
    render(
      <FilterRoot id="search-no-typing-test" resultLoading>
        <FilterSearch label="Søk" />
      </FilterRoot>
    )

    const indicator = document.querySelector(
      '.dnb-filter__search .dnb-progress-indicator'
    )

    expect(indicator).not.toBeInTheDocument()
  })

  it('does not show progress indicator when resultLoading is false', () => {
    render(
      <FilterRoot id="search-no-loading-test">
        <FilterSearch label="Søk" />
      </FilterRoot>
    )

    const indicator = document.querySelector(
      '.dnb-filter__search .dnb-progress-indicator'
    )

    expect(indicator).not.toBeInTheDocument()
  })
})

describe('Filter.Search events', () => {
  it('calls onChange when search value changes', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot id="search-on-change-test">
        <FilterSearch label="Søk" onChange={onChange} />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('test')
  })
})

describe('Filter.Search clear button', () => {
  it('resets search state when clear button is clicked', () => {
    function SearchState() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot id="clear-btn-test">
        <FilterSearch label="Søk" />
        <SearchState />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('hello')

    const clearButton = document.querySelector('.dnb-input__clear-button')
    fireEvent.click(clearButton)

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('')
  })
})

describe('Filter.Search accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <FilterRoot id="a11y-search-test">
        <FilterSearch label="Search" placeholder="Search..." />
      </FilterRoot>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})

describe('Filter.Search prop forwarding', () => {
  it('forwards type prop to the input element', () => {
    render(
      <FilterRoot id="search-type-test">
        <FilterSearch label="Søk" type="search" />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toHaveAttribute('type', 'search')
  })

  it('has autocomplete off by default', () => {
    render(
      <FilterRoot id="search-autocomplete-default-test">
        <FilterSearch label="Søk" />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toHaveAttribute('autocomplete', 'off')
  })

  it('disables autoCorrect, autoCapitalize and spellCheck by default', () => {
    render(
      <FilterRoot id="search-browser-features-test">
        <FilterSearch label="Søk" />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toHaveAttribute('autocorrect', 'off')
    expect(input).toHaveAttribute('autocapitalize', 'none')
    expect(input).toHaveAttribute('spellcheck', 'false')
  })

  it('forwards autoComplete prop to the input element', () => {
    render(
      <FilterRoot id="search-autocomplete-test">
        <FilterSearch label="Søk" autoComplete="name" />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toHaveAttribute('autocomplete', 'name')
  })

  it('forwards disabled prop to the input element', () => {
    render(
      <FilterRoot id="search-disabled-test">
        <FilterSearch label="Søk" disabled />
      </FilterRoot>
    )

    const input = document.querySelector('.dnb-filter__search input')

    expect(input).toBeDisabled()
  })
})

describe('Filter.Search submitBehavior="manual"', () => {
  it('does not update search state on input change', () => {
    function SearchState() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot id="manual-no-update-test">
        <FilterSearch label="Søk" submitBehavior="manual" />
        <SearchState />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('')
  })

  it('updates search state on Enter key press', () => {
    function SearchState() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot id="manual-enter-test">
        <FilterSearch label="Søk" submitBehavior="manual" />
        <SearchState />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('hello')
  })

  it('updates search state when submit button is clicked', () => {
    function SearchState() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot id="manual-submit-btn-test">
        <FilterSearch label="Søk" submitBehavior="manual" />
        <SearchState />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'world' } })

    expect(input.value).toBe('world')

    const submitButton = document.querySelector(
      '.dnb-input__submit-button__button'
    )

    expect(submitButton).toBeInTheDocument()

    fireEvent.click(submitButton)

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('world')
  })

  it('clears search state when clear button is clicked', () => {
    function SearchState() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot id="manual-clear-test">
        <FilterSearch label="Søk" submitBehavior="manual" />
        <SearchState />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('hello')

    const clearButton = document.querySelector('.dnb-input__clear-button')
    fireEvent.click(clearButton)

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('')
  })

  it('calls onChange on every keystroke', () => {
    const onChange = vi.fn()

    render(
      <FilterRoot id="manual-onchange-test">
        <FilterSearch
          label="Søk"
          submitBehavior="manual"
          onChange={onChange}
        />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenNthCalledWith(1, 'a')
    expect(onChange).toHaveBeenNthCalledWith(2, 'ab')
  })

  it('commits empty value when input is cleared by typing', () => {
    function SearchState() {
      const ctx = useFilterContext()
      return <span data-testid="search">{ctx.search}</span>
    }

    render(
      <FilterRoot id="manual-empty-commit-test">
        <FilterSearch label="Søk" submitBehavior="manual" />
        <SearchState />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('hello')

    fireEvent.change(input, { target: { value: '' } })

    expect(
      document.querySelector('[data-testid="search"]').textContent
    ).toBe('')
  })

  it('resets localValue when resetFilters is called in manual mode', () => {
    function Controls() {
      const ctx = useFilterContext()
      return (
        <button data-testid="reset" onClick={() => ctx.resetFilters()}>
          Reset
        </button>
      )
    }

    render(
      <FilterRoot id="manual-reset-test">
        <FilterSearch label="Søk" submitBehavior="manual" />
        <Controls />
      </FilterRoot>
    )

    const input = document.querySelector('input')

    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(input).toHaveValue('hello')

    fireEvent.click(document.querySelector('[data-testid="reset"]'))

    expect(input).toHaveValue('')
  })
})
