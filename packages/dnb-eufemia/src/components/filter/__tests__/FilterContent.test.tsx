import { render, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterContent from '../FilterContent'
import FilterNoResults from '../FilterNoResults'
import ListContainer from '../../list/Container'
import userEvent from '@testing-library/user-event'

describe('Filter.Content', () => {
  it('renders children', () => {
    render(
      <FilterRoot>
        <FilterContent>
          <p>Result content</p>
        </FilterContent>
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__content')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-filter__content p')
    ).toBeInTheDocument()
  })

  it('shows skeleton when resultLoading is true', () => {
    render(
      <FilterRoot resultLoading>
        <FilterContent>
          <p>Loading content</p>
        </FilterContent>
      </FilterRoot>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__content.dnb-skeleton'
    )

    expect(skeleton).toBeInTheDocument()
  })

  it('does not show skeleton when resultLoading is false', () => {
    render(
      <FilterRoot resultLoading={false}>
        <FilterContent>
          <p>Normal content</p>
        </FilterContent>
      </FilterRoot>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__content.dnb-skeleton'
    )

    expect(skeleton).not.toBeInTheDocument()
  })

  it('reads resultLoading via connectedTo from shared state', () => {
    render(
      <>
        <FilterRoot id="results-shared-test" resultLoading />
        <FilterContent connectedTo="results-shared-test">
          <p>Shared content</p>
        </FilterContent>
      </>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__content.dnb-skeleton'
    )

    expect(skeleton).toBeInTheDocument()
  })

  it('supports spacing props', () => {
    render(
      <FilterRoot>
        <FilterContent top="large">
          <p>Content</p>
        </FilterContent>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__content')

    expect(element.className).toContain('dnb-space__top--large')
  })

  it('uses context when connectedTo is omitted', () => {
    render(
      <FilterRoot resultLoading>
        <FilterContent>
          <p>Content</p>
        </FilterContent>
      </FilterRoot>
    )

    const skeleton = document.querySelector(
      '.dnb-filter__content.dnb-skeleton'
    )

    expect(skeleton).toBeInTheDocument()
  })

  it('does not wrap children in HeightAnimation on initial render', () => {
    render(
      <FilterRoot>
        <FilterContent>
          <p>Content</p>
        </FilterContent>
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-height-animation')
    ).not.toBeInTheDocument()
  })

  it('wraps children in HeightAnimation after loading has occurred', async () => {
    function FilterWithLoading() {
      const [loading, setLoading] = useState(true)

      return (
        <FilterRoot resultLoading={loading}>
          <FilterContent>
            <p>Content</p>
          </FilterContent>
          <button onClick={() => setLoading(false)} data-testid="trigger">
            Done
          </button>
        </FilterRoot>
      )
    }

    render(<FilterWithLoading />)

    expect(
      document.querySelector('.dnb-height-animation')
    ).toBeInTheDocument()

    await userEvent.click(
      document.querySelector('[data-testid="trigger"]')
    )

    expect(
      document.querySelector('.dnb-height-animation')
    ).toBeInTheDocument()
  })
})

describe('Filter.Content error handling', () => {
  it('throws when used outside Filter.Root without connectedTo', () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => {
      render(
        <FilterContent>
          <p>Orphan</p>
        </FilterContent>
      )
    }).toThrow(
      'Filter.Content requires a connectedTo prop or must be used inside a Filter.Root.'
    )

    consoleSpy.mockRestore()
  })
})

describe('Filter.NoResults', () => {
  it('shows message when resultCount is 0', () => {
    render(
      <FilterRoot resultCount={0}>
        <FilterNoResults />
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).toBeInTheDocument()
  })

  it('returns nothing when resultCount is greater than 0', () => {
    render(
      <FilterRoot resultCount={5}>
        <FilterNoResults />
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).not.toBeInTheDocument()
  })

  it('reads resultCount via connectedTo from shared state', () => {
    render(
      <>
        <FilterRoot id="no-results-shared-test" resultCount={0} />
        <FilterNoResults connectedTo="no-results-shared-test" />
      </>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).toBeInTheDocument()
  })

  it('shows custom children text', () => {
    render(
      <FilterRoot resultCount={0}>
        <FilterNoResults>Custom no results text</FilterNoResults>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__no-results')

    expect(element.textContent).toContain('Custom no results text')
  })

  it('inherits connectedTo from parent Results', () => {
    render(
      <>
        <FilterRoot id="no-results-inherited-test" resultCount={0} />
        <FilterContent connectedTo="no-results-inherited-test">
          <FilterNoResults />
        </FilterContent>
      </>
    )

    expect(
      document.querySelector('.dnb-filter__no-results')
    ).toBeInTheDocument()
  })

  it('renders as a list item when inside List.Container', () => {
    render(
      <FilterRoot resultCount={0}>
        <ListContainer>
          <FilterNoResults />
        </ListContainer>
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__no-results')

    expect(element.tagName).toBe('LI')
    expect(element).toHaveClass('dnb-list__item')
  })

  it('renders as a paragraph when outside List.Container', () => {
    render(
      <FilterRoot resultCount={0}>
        <FilterNoResults />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__no-results')

    expect(element.tagName).toBe('P')
  })

  it('supports spacing props', () => {
    render(
      <FilterRoot resultCount={0}>
        <FilterNoResults top="large" />
      </FilterRoot>
    )

    const element = document.querySelector('.dnb-filter__no-results')

    expect(element.className).toContain('dnb-space__top--large')
  })
})

describe('Filter.Content aria-live', () => {
  it('announces result count to screen readers', async () => {
    render(
      <FilterRoot resultCount={3}>
        <FilterContent>
          <p>Results</p>
        </FilterContent>
      </FilterRoot>
    )

    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(ariaLive).toBeInTheDocument()
    expect(ariaLive).toHaveAttribute('aria-live', 'assertive')

    await waitFor(() => {
      expect(ariaLive.textContent).toBe('3 treff')
    })
  })

  it('announces no results message when resultCount is 0', async () => {
    render(
      <FilterRoot resultCount={0}>
        <FilterContent>
          <p>Results</p>
        </FilterContent>
      </FilterRoot>
    )

    const ariaLive = document.querySelector('.dnb-aria-live')

    await waitFor(() => {
      expect(ariaLive.textContent).toBe(
        'Prøv å endre eller fjerne noen filtre.'
      )
    })
  })

  it('does not announce when resultCount is undefined', () => {
    render(
      <FilterRoot>
        <FilterContent>
          <p>Results</p>
        </FilterContent>
      </FilterRoot>
    )

    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(ariaLive).toBeInTheDocument()
    expect(ariaLive.textContent).toBe('')
  })

  it('does not announce while loading', () => {
    render(
      <FilterRoot resultCount={3} resultLoading>
        <FilterContent>
          <p>Results</p>
        </FilterContent>
      </FilterRoot>
    )

    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(ariaLive.textContent).toBe('')
  })
})

describe('Filter.Content accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <FilterRoot>
        <FilterContent>
          <p>Result content</p>
        </FilterContent>
      </FilterRoot>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('has no axe violations when loading', async () => {
    const { container } = render(
      <FilterRoot resultLoading>
        <FilterContent>
          <p>Loading content</p>
        </FilterContent>
      </FilterRoot>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
