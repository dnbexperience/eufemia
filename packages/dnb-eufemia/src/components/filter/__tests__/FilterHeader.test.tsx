import { render } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterHeader from '../FilterHeader'
import FilterToolbar from '../FilterToolbar'

describe('Filter.Header', () => {
  it('renders with dnb-filter__header class', () => {
    render(
      <FilterRoot>
        <FilterHeader>
          <p>Header content</p>
        </FilterHeader>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__header')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Header content')
  })

  it('merges custom className', () => {
    render(
      <FilterRoot>
        <FilterHeader className="my-header">
          <p>Content</p>
        </FilterHeader>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__header')

    expect(element.classList).toContain('dnb-filter__header')
    expect(element.classList).toContain('my-header')
  })
})

describe('Filter.Toolbar.Actions', () => {
  it('renders children', () => {
    render(
      <FilterRoot>
        <FilterToolbar>
          <FilterToolbar.Actions>
            <button>Action</button>
          </FilterToolbar.Actions>
        </FilterToolbar>
      </FilterRoot>
    )

    const actions = document.querySelector('.dnb-filter__toolbar-actions')

    expect(actions).toBeInTheDocument()
    expect(actions.textContent).toContain('Action')
  })

  it('merges custom className', () => {
    render(
      <FilterRoot>
        <FilterToolbar>
          <FilterToolbar.Actions className="my-actions">
            <button>Action</button>
          </FilterToolbar.Actions>
        </FilterToolbar>
      </FilterRoot>
    )

    const actions = document.querySelector('.dnb-filter__toolbar-actions')

    expect(actions.classList).toContain('dnb-filter__toolbar-actions')
    expect(actions.classList).toContain('my-actions')
  })
})
