import { createRef } from 'react'
import { act, render, fireEvent, waitFor } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import FilterRoot from '../FilterRoot'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import FilterSelection from '../FilterSelection'
import FilterSearch from '../FilterSearch'
import FilterToolbar from '../FilterToolbar'

describe('Filter.Panel', () => {
  let contentHeight = 100

  beforeEach(() => {
    contentHeight = 100
    vi.spyOn(
      HTMLElement.prototype,
      'getBoundingClientRect'
    ).mockImplementation(function (this: HTMLElement) {
      const height = this.classList.contains('dnb-filter__panel-content')
        ? contentHeight
        : 0
      return new DOMRect(0, 0, 0, height)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('omits the close button and divider when the options fit in the viewport', () => {
    render(
      <FilterRoot defaultPanelOpen>
        <FilterPanelButton />
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__panel-close')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-filter__hr')
    ).not.toBeInTheDocument()
  })

  it('keeps a close button when there is no panel toggle', () => {
    render(
      <FilterRoot defaultPanelOpen>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__panel-close')
    ).toBeInTheDocument()
    fireEvent.click(document.querySelector('.dnb-filter__panel-close'))
    expect(
      document.querySelector('.dnb-filter__panel')
    ).not.toBeInTheDocument()
  })

  it('updates the close button when the viewport or filter options resize', () => {
    contentHeight = 900
    let onResize: ResizeObserverCallback
    const disconnect = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          onResize = callback
        }
        observe = vi.fn()
        disconnect = disconnect
      }
    )

    const { unmount } = render(
      <FilterRoot defaultPanelOpen>
        <FilterPanelButton />
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    expect(
      document.querySelector('.dnb-filter__panel-close')
    ).toBeInTheDocument()

    vi.stubGlobal('innerHeight', 1200)
    fireEvent(window, new Event('resize'))
    expect(
      document.querySelector('.dnb-filter__panel-close')
    ).not.toBeInTheDocument()

    contentHeight = 1400
    act(() => onResize([], null))
    expect(
      document.querySelector('.dnb-filter__panel-close')
    ).toBeInTheDocument()

    const closeButton = document.querySelector<HTMLButtonElement>(
      '.dnb-filter__panel-close'
    )
    closeButton.focus()
    contentHeight = 200
    act(() => onResize([], null))
    expect(
      document.querySelector('.dnb-filter__panel-close')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-filter__hr')
    ).not.toBeInTheDocument()
    expect(document.querySelector('button[aria-expanded]')).toHaveFocus()

    unmount()
    expect(disconnect).toHaveBeenCalled()
  })

  it('is hidden by default', () => {
    render(
      <FilterRoot>
        <FilterPanel>
          <FilterSelection
            label="Type"
            filterKey="/type"
            data={[{ value: 'a', label: 'A' }]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).not.toBeInTheDocument()
  })

  it('becomes visible when panelOpen is toggled via PanelButton', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Type"
            filterKey="/type"
            data={[{ value: 'a', label: 'A' }]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    const button = document.querySelector('.dnb-button')

    fireEvent.click(button)

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).toBeVisible()
  })

  it('opens when matching content is found', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel openOnFind>
          <p>Findable filter</p>
        </FilterPanel>
      </FilterRoot>
    )

    const animation = document.querySelector('.dnb-height-animation')
    expect(animation).toHaveAttribute('hidden', 'until-found')

    act(() => {
      animation.dispatchEvent(new Event('beforematch'))
    })

    expect(document.querySelector('.dnb-button')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(document.body).toHaveTextContent('Findable filter')
  })

  it('renders filter children as tertiary accordions', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Type"
            filterKey="/type"
            data={[{ value: 'a', label: 'A' }]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const accordion = document.querySelector(
      '.dnb-filter__panel .dnb-accordion__variant--tertiary'
    )

    expect(accordion).toBeInTheDocument()
  })

  it('renders a close button with hide label', () => {
    contentHeight = 1000
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const closeButton = document.querySelector('.dnb-filter__panel-close')

    expect(closeButton).toBeInTheDocument()
    expect(closeButton.textContent).toContain('Skjul filter')
  })

  it('closes the panel when close button is clicked', async () => {
    contentHeight = 1000
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel).toBeVisible()

    const closeButton = document.querySelector('.dnb-filter__panel-close')

    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(panel).not.toBeInTheDocument()
    })
  })

  it('moves focus to the panel button when close button is clicked', () => {
    contentHeight = 1000
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const closeButton = document.querySelector('.dnb-filter__panel-close')
    fireEvent.click(closeButton)

    const panelButton = document.querySelector('.dnb-button')

    expect(document.activeElement).toBe(panelButton)
  })

  it('moves focus to the panel button when a ref is given to it', () => {
    contentHeight = 1000
    const ref = createRef<HTMLButtonElement>()

    render(
      <FilterRoot>
        <FilterPanelButton ref={ref}>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))
    fireEvent.click(document.querySelector('.dnb-filter__panel-close'))

    const panelButton = document.querySelector('.dnb-button')

    expect(document.activeElement).toBe(panelButton)
    expect(ref.current).toBe(panelButton)
  })

  it('moves focus to the panel button when apply is clicked in manual mode', () => {
    render(
      <FilterRoot behavior="manual">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const applyButton = document.querySelector(
      '.dnb-filter__panel-actions .dnb-button--primary'
    )
    fireEvent.click(applyButton)

    const panelButton = document.querySelector('.dnb-button')

    expect(document.activeElement).toBe(panelButton)
  })

  it('renders cancel button without icon in manual mode', () => {
    render(
      <FilterRoot behavior="manual">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const cancelButton = document.querySelector(
      '.dnb-filter__panel-actions .dnb-button--tertiary'
    )

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton.textContent).toContain('Avbryt')
    expect(cancelButton.querySelector('.dnb-icon')).not.toBeInTheDocument()
  })

  it('moves focus to the panel button when cancel is clicked in manual mode', () => {
    render(
      <FilterRoot behavior="manual">
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const cancelButton = document.querySelector(
      '.dnb-filter__panel-actions .dnb-button--tertiary'
    )
    fireEvent.click(cancelButton)

    const panelButton = document.querySelector('.dnb-button')

    expect(document.activeElement).toBe(panelButton)
  })

  it('merges custom className', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel className="my-panel">
          <p>Content</p>
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    const panel = document.querySelector('.dnb-filter__panel')

    expect(panel.classList).toContain('dnb-filter__panel')
    expect(panel.classList).toContain('my-panel')
  })

  it('throws when used outside Filter.Root', () => {
    expect(() =>
      render(
        <FilterPanel>
          <p>Content</p>
        </FilterPanel>
      )
    ).toThrow('Filter.Panel must be used inside a Filter.Root.')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
        <FilterPanel>
          <FilterSelection
            label="Type"
            filterKey="/type"
            data={[{ value: 'a', label: 'A' }]}
          />
        </FilterPanel>
      </FilterRoot>
    )

    fireEvent.click(document.querySelector('.dnb-button'))

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})

describe('Filter.PanelButton', () => {
  it('renders a tertiary button', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
      </FilterRoot>
    )

    const button = document.querySelector('.dnb-button--tertiary')

    expect(button).toBeInTheDocument()
    expect(button.textContent).toContain('Filters')
  })

  it('toggles aria-expanded on click', () => {
    render(
      <FilterRoot>
        <FilterPanelButton>Filters</FilterPanelButton>
      </FilterRoot>
    )

    const button = document.querySelector('.dnb-button')

    expect(button).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('throws when used outside Filter.Root', () => {
    expect(() =>
      render(<FilterPanelButton>Filters</FilterPanelButton>)
    ).toThrow('Filter.PanelButton must be used inside a Filter.Root.')
  })

  it('renders the translated default label when no children are given', () => {
    render(
      <FilterRoot>
        <FilterPanelButton />
      </FilterRoot>
    )

    const button = document.querySelector('.dnb-button')

    expect(button.textContent).toContain('Filter')
  })
})

describe('Filter.Toolbar', () => {
  it('renders children inside toolbar', () => {
    render(
      <FilterRoot>
        <FilterToolbar>
          <FilterSearch label="Søk" />
        </FilterToolbar>
      </FilterRoot>
    )

    const toolbar = document.querySelector('.dnb-filter__toolbar')

    expect(toolbar).toBeInTheDocument()
    expect(
      toolbar.querySelector('.dnb-filter__search')
    ).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <FilterRoot>
        <FilterToolbar className="my-toolbar">
          <p>Content</p>
        </FilterToolbar>
      </FilterRoot>
    )

    const toolbar = document.querySelector('.dnb-filter__toolbar')

    expect(toolbar.classList).toContain('dnb-filter__toolbar')
    expect(toolbar.classList).toContain('my-toolbar')
  })
})

describe('Filter.Toolbar.Actions', () => {
  it('renders children inside actions container', () => {
    render(
      <FilterRoot>
        <FilterToolbar>
          <FilterToolbar.Actions>
            <FilterPanelButton>Filters</FilterPanelButton>
          </FilterToolbar.Actions>
        </FilterToolbar>
      </FilterRoot>
    )

    const actions = document.querySelector('.dnb-filter__toolbar-actions')

    expect(actions).toBeInTheDocument()
    expect(actions.querySelector('.dnb-button')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <FilterRoot>
        <FilterToolbar>
          <FilterToolbar.Actions className="my-actions">
            <FilterPanelButton>Filters</FilterPanelButton>
          </FilterToolbar.Actions>
        </FilterToolbar>
      </FilterRoot>
    )

    const actions = document.querySelector('.dnb-filter__toolbar-actions')

    expect(actions.classList).toContain('my-actions')
  })

  it('renders without a container', () => {
    render(
      <FilterToolbar>
        <FilterToolbar.Actions>
          <button>Action</button>
        </FilterToolbar.Actions>
      </FilterToolbar>
    )

    const actions = document.querySelector('.dnb-filter__toolbar-actions')

    expect(actions).toBeInTheDocument()
    expect(actions.querySelector('button')).toBeInTheDocument()
  })
})
