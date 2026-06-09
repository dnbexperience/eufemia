import { render, act, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterContent from '../FilterContent'
import FilterHighlighting from '../FilterHighlighting'
import { useSharedState } from '../../../shared/helpers/useSharedState'

describe('Filter.Highlighting', () => {
  it('renders plain text when there is no search', () => {
    render(
      <FilterRoot id="highlight-no-search">
        <FilterContent connectedTo="highlight-no-search">
          <FilterHighlighting>Hello World</FilterHighlighting>
        </FilterContent>
      </FilterRoot>
    )

    const content = document.querySelector('.dnb-filter__content')
    expect(content.textContent).toBe('Hello World')
    expect(
      document.querySelector('.dnb-filter__highlighting')
    ).not.toBeInTheDocument()
  })

  it('highlights matching text from the search term', () => {
    function SetSearch() {
      const { extend } = useSharedState('highlight-match')
      return (
        <button
          onClick={() => extend({ search: 'World' })}
          data-testid="set-search"
        >
          Search
        </button>
      )
    }

    render(
      <>
        <SetSearch />
        <FilterRoot id="highlight-match">
          <FilterContent connectedTo="highlight-match">
            <FilterHighlighting>Hello World</FilterHighlighting>
          </FilterContent>
        </FilterRoot>
      </>
    )

    act(() => {
      fireEvent.click(document.querySelector('[data-testid="set-search"]'))
    })

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.tagName).toBe('MARK')
    expect(mark.textContent).toBe('World')
  })

  it('highlights case-insensitively', () => {
    function SetSearch() {
      const { extend } = useSharedState('highlight-case')
      return (
        <button
          onClick={() => extend({ search: 'hello' })}
          data-testid="set-search"
        >
          Search
        </button>
      )
    }

    render(
      <>
        <SetSearch />
        <FilterRoot id="highlight-case">
          <FilterContent connectedTo="highlight-case">
            <FilterHighlighting>Hello World</FilterHighlighting>
          </FilterContent>
        </FilterRoot>
      </>
    )

    act(() => {
      fireEvent.click(document.querySelector('[data-testid="set-search"]'))
    })

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.textContent).toBe('Hello')
  })

  it('highlights multiple occurrences', () => {
    function SetSearch() {
      const { extend } = useSharedState('highlight-multi')
      return (
        <button
          onClick={() => extend({ search: 'a' })}
          data-testid="set-search"
        >
          Search
        </button>
      )
    }

    render(
      <>
        <SetSearch />
        <FilterRoot id="highlight-multi">
          <FilterContent connectedTo="highlight-multi">
            <FilterHighlighting>banana</FilterHighlighting>
          </FilterContent>
        </FilterRoot>
      </>
    )

    act(() => {
      fireEvent.click(document.querySelector('[data-testid="set-search"]'))
    })

    const marks = document.querySelectorAll('.dnb-filter__highlighting')
    expect(marks).toHaveLength(3)
  })

  it('escapes regex special characters in search', () => {
    function SetSearch() {
      const { extend } = useSharedState('highlight-escape')
      return (
        <button
          onClick={() => extend({ search: '(test)' })}
          data-testid="set-search"
        >
          Search
        </button>
      )
    }

    render(
      <>
        <SetSearch />
        <FilterRoot id="highlight-escape">
          <FilterContent connectedTo="highlight-escape">
            <FilterHighlighting>foo (test) bar</FilterHighlighting>
          </FilterContent>
        </FilterRoot>
      </>
    )

    act(() => {
      fireEvent.click(document.querySelector('[data-testid="set-search"]'))
    })

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.textContent).toBe('(test)')
  })

  it('returns plain text when search does not match', () => {
    function SetSearch() {
      const { extend } = useSharedState('highlight-no-match')
      return (
        <button
          onClick={() => extend({ search: 'xyz' })}
          data-testid="set-search"
        >
          Search
        </button>
      )
    }

    render(
      <>
        <SetSearch />
        <FilterRoot id="highlight-no-match">
          <FilterContent connectedTo="highlight-no-match">
            <FilterHighlighting>Hello World</FilterHighlighting>
          </FilterContent>
        </FilterRoot>
      </>
    )

    act(() => {
      fireEvent.click(document.querySelector('[data-testid="set-search"]'))
    })

    expect(
      document.querySelector('.dnb-filter__highlighting')
    ).not.toBeInTheDocument()
  })

  it('supports connectedTo prop directly', () => {
    function SetSearch() {
      const { extend } = useSharedState('highlight-connected')
      return (
        <button
          onClick={() => extend({ search: 'Rema' })}
          data-testid="set-search"
        >
          Search
        </button>
      )
    }

    render(
      <>
        <SetSearch />
        <FilterRoot id="highlight-connected" />
        <FilterHighlighting connectedTo="highlight-connected">
          Rema 1000
        </FilterHighlighting>
      </>
    )

    act(() => {
      fireEvent.click(document.querySelector('[data-testid="set-search"]'))
    })

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.textContent).toBe('Rema')
  })
})
