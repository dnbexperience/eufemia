import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterPanel from '../FilterPanel'
import FilterPanelButton from '../FilterPanelButton'
import FilterSelection from '../FilterSelection'
import FilterSearch from '../FilterSearch'
import FilterToolbar from '../FilterToolbar'

describe('Filter.Panel', () => {
  it('is hidden by default', () => {
    render(
      <FilterRoot id="panel-hidden-test">
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
      <FilterRoot id="panel-toggle-test">
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

  it('renders filter children as tertiary accordions', () => {
    render(
      <FilterRoot id="panel-children-test">
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
    render(
      <FilterRoot id="panel-close-test">
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

  it('closes the panel when close button is clicked', () => {
    render(
      <FilterRoot id="panel-close-click-test">
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

    expect(panel).not.toBeInTheDocument()
  })

  it('moves focus to the panel button when close button is clicked', () => {
    render(
      <FilterRoot id="panel-close-focus-test">
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

  it('moves focus to the panel button when apply is clicked in manual mode', () => {
    render(
      <FilterRoot id="panel-apply-focus-test" behavior="manual">
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

  it('moves focus to the panel button when cancel is clicked in manual mode', () => {
    render(
      <FilterRoot id="panel-cancel-focus-test" behavior="manual">
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
      <FilterRoot id="panel-class-test">
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
})

describe('Filter.PanelButton', () => {
  it('renders a tertiary button', () => {
    render(
      <FilterRoot id="accordion-btn-test">
        <FilterPanelButton>Filters</FilterPanelButton>
      </FilterRoot>
    )

    const button = document.querySelector('.dnb-button--tertiary')

    expect(button).toBeInTheDocument()
    expect(button.textContent).toContain('Filters')
  })

  it('toggles aria-expanded on click', () => {
    render(
      <FilterRoot id="accordion-btn-expanded-test">
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
      <FilterRoot id="default-label-test">
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
      <FilterRoot id="toolbar-test">
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
      <FilterRoot id="toolbar-class-test">
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
      <FilterRoot id="tools-test">
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
      <FilterRoot id="toolbar-actions-class">
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
