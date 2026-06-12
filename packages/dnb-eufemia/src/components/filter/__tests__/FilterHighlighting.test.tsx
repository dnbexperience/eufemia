import { render, act, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterContent from '../FilterContent'
import FilterHighlighting from '../FilterHighlighting'
import FilterSearch from '../FilterSearch'
import { useSharedState } from '../../../shared/helpers/useSharedState'

function changeSearch(search: string) {
  act(() => {
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: search },
    })
  })
}

describe('Filter.Highlighting', () => {
  it('renders plain text when there is no search', () => {
    render(
      <FilterRoot>
        <FilterContent>
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
    render(
      <FilterRoot>
        <FilterSearch label="Search" />
        <FilterContent>
          <FilterHighlighting>Hello World</FilterHighlighting>
        </FilterContent>
      </FilterRoot>
    )

    changeSearch('World')

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.tagName).toBe('MARK')
    expect(mark.textContent).toBe('World')
  })

  it('highlights case-insensitively', () => {
    render(
      <FilterRoot>
        <FilterSearch label="Search" />
        <FilterContent>
          <FilterHighlighting>Hello World</FilterHighlighting>
        </FilterContent>
      </FilterRoot>
    )

    changeSearch('hello')

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.textContent).toBe('Hello')
  })

  it('highlights multiple occurrences', () => {
    render(
      <FilterRoot>
        <FilterSearch label="Search" />
        <FilterContent>
          <FilterHighlighting>banana</FilterHighlighting>
        </FilterContent>
      </FilterRoot>
    )

    changeSearch('a')

    const marks = document.querySelectorAll('.dnb-filter__highlighting')
    expect(marks).toHaveLength(3)
  })

  it('escapes regex special characters in search', () => {
    render(
      <FilterRoot>
        <FilterSearch label="Search" />
        <FilterContent>
          <FilterHighlighting>foo (test) bar</FilterHighlighting>
        </FilterContent>
      </FilterRoot>
    )

    changeSearch('(test)')

    const mark = document.querySelector('.dnb-filter__highlighting')
    expect(mark).toBeInTheDocument()
    expect(mark.textContent).toBe('(test)')
  })

  it('returns plain text when search does not match', () => {
    render(
      <FilterRoot>
        <FilterSearch label="Search" />
        <FilterContent>
          <FilterHighlighting>Hello World</FilterHighlighting>
        </FilterContent>
      </FilterRoot>
    )

    changeSearch('xyz')

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
