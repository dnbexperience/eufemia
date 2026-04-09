import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Menu from '../Menu'
import { MenuContext } from '../MenuContext'
import type { MenuContextValue } from '../types'

// Mock Popover for tests that use Menu.Root
jest.mock('../../popover/Popover', () => {
  const triggerRefCallback = jest.fn()

  return function MockPopover(props) {
    const closeFn = () => props.onOpenChange?.(false)

    const triggerElement =
      typeof props.trigger === 'function'
        ? (() => {
            const triggerRenderProps = {
              ref: triggerRefCallback,
              'aria-controls': 'mock-popover-content',
              'aria-expanded': props.open || false,
              ...props.triggerAttributes,
            }
            Object.defineProperties(triggerRenderProps, {
              active: { value: props.open || false, enumerable: false },
              open: {
                value: () => props.onOpenChange?.(true),
                enumerable: false,
              },
              close: { value: closeFn, enumerable: false },
              toggle: {
                value: () => props.onOpenChange?.(!props.open),
                enumerable: false,
              },
            })
            return props.trigger(triggerRenderProps)
          })()
        : props.trigger

    const content =
      typeof props.children === 'function'
        ? props.children({
            active: props.open || false,
            open: () => props.onOpenChange?.(true),
            close: closeFn,
            toggle: () => props.onOpenChange?.(!props.open),
            id: 'mock-popover-content',
          })
        : props.children

    return (
      <div className={props.className} id={props.id}>
        {triggerElement}
        {props.open && <div>{content}</div>}
      </div>
    )
  }
})

function createMockContext(
  overrides: Partial<MenuContextValue> = {}
): MenuContextValue {
  return {
    level: 0,
    closeAll: jest.fn(),
    activeIndex: 0,
    setActiveIndex: jest.fn(),
    registerItem: jest.fn().mockReturnValue(0),
    unregisterItem: jest.fn(),
    itemRefs: { current: [] },
    menuRef: { current: null },
    isOpen: true,
    ...overrides,
  }
}

describe('MenuAccordion', () => {
  it('renders with text and icon', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as" icon="download">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('[role="menuitem"]')
    expect(trigger).toBeInTheDocument()
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    expect(trigger.textContent).toContain('Export as')
  })

  it('toggles open/close on click', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
            <Menu.Action text="PNG" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // Nested items should not be visible
    expect(document.querySelectorAll('[role="menuitem"]')).toHaveLength(1)

    // Click to open
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // Nested items should now be visible
    const allItems = document.querySelectorAll('[role="menuitem"]')
    expect(allItems).toHaveLength(3) // trigger + 2 children

    // Click to close
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('opens on Enter key', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    fireEvent.keyDown(trigger, { key: 'Enter' })

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('opens on Space key', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    fireEvent.keyDown(trigger, { key: ' ' })

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('opens on ArrowRight and closes on ArrowLeft', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('.dnb-menu__accordion__trigger')

    // ArrowRight opens
    fireEvent.keyDown(trigger, { key: 'ArrowRight' })
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // ArrowLeft on trigger closes
    fireEvent.keyDown(trigger, { key: 'ArrowLeft' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('does not toggle when disabled', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as" disabled>
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    expect(trigger.getAttribute('aria-disabled')).toBe('true')

    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.keyDown(trigger, { key: 'Enter' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('applies correct CSS classes', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as" className="custom">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const wrapper = document.querySelector('.dnb-menu__accordion')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.classList.contains('custom')).toBe(true)
    expect(wrapper.classList.contains('dnb-menu__accordion--open')).toBe(
      false
    )

    // Open it
    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    fireEvent.click(trigger)
    expect(wrapper.classList.contains('dnb-menu__accordion--open')).toBe(
      true
    )
  })

  it('applies disabled CSS class', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as" disabled>
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const wrapper = document.querySelector('.dnb-menu__accordion')
    expect(
      wrapper.classList.contains('dnb-menu__accordion--disabled')
    ).toBe(true)
  })

  it('renders nested items with their own menu context', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
            <Menu.Divider />
            <Menu.Action text="PNG" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    fireEvent.click(trigger)

    // Nested menu list should have role="menu"
    const menus = document.querySelectorAll('[role="menu"]')
    expect(menus.length).toBeGreaterThanOrEqual(2) // parent + child

    // Child items rendered
    const items = document.querySelectorAll('[role="menuitem"]')
    expect(items).toHaveLength(3) // trigger + PDF + PNG

    // Divider rendered
    const dividers = document.querySelectorAll('[role="separator"]')
    expect(dividers).toHaveLength(1)
  })

  it('closes all menus when child action is clicked', () => {
    const closeAll = jest.fn()
    const ctx = createMockContext({ closeAll })

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" onClick={() => null} />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    // Open accordion
    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    fireEvent.click(trigger)

    // Click child action
    const pdfAction = Array.from(
      document.querySelectorAll('[role="menuitem"]')
    ).find((el) => el.textContent?.includes('PDF'))
    fireEvent.click(pdfAction)

    // closeAll on parent should have been called
    expect(closeAll).toHaveBeenCalled()
  })

  it('works inside Menu.Root', () => {
    render(
      <Menu.Root open>
        <Menu.Button text="File" />
        <Menu.List>
          <Menu.Action text="New" />
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
            <Menu.Action text="PNG" />
          </Menu.Accordion>
          <Menu.Action text="Close" />
        </Menu.List>
      </Menu.Root>
    )

    const items = document.querySelectorAll('[role="menuitem"]')
    // New + Export as trigger + Close = 3 (accordion children hidden)
    expect(items).toHaveLength(3)

    // Open accordion
    const exportTrigger = Array.from(items).find(
      (el) => el.textContent?.includes('Export as')
    )
    fireEvent.click(exportTrigger)

    // Now all items visible: New + Export as trigger + PDF + PNG + Close = 5
    const allItems = document.querySelectorAll('[role="menuitem"]')
    expect(allItems).toHaveLength(5)
  })

  it('registers in parent context', () => {
    const registerItem = jest.fn().mockReturnValue(2)
    const ctx = createMockContext({ registerItem })

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    expect(registerItem).toHaveBeenCalled()
  })

  it('renders indicator icon that changes on open', () => {
    const ctx = createMockContext()

    render(
      <MenuContext.Provider value={ctx}>
        <ul role="menu">
          <Menu.Accordion text="Export as">
            <Menu.Action text="PDF" />
          </Menu.Accordion>
        </ul>
      </MenuContext.Provider>
    )

    const indicator = document.querySelector(
      '.dnb-menu__accordion__indicator'
    )
    expect(indicator).toBeTruthy()

    // Open
    const trigger = document.querySelector('.dnb-menu__accordion__trigger')
    fireEvent.click(trigger)

    // Indicator should still be present when open
    expect(
      document.querySelector('.dnb-menu__accordion__indicator')
    ).toBeTruthy()
  })
})
