import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import MenuList from '../MenuList'
import MenuAction from '../MenuAction'
import MenuDivider from '../MenuDivider'
import { MenuContext } from '../MenuContext'
import type { MenuContextValue } from '../types'
import { createMockContext } from './testHelpers'

function renderWithContext(
  ui: React.ReactElement,
  contextOverrides?: Partial<MenuContextValue>
) {
  const context = createMockContext(contextOverrides)
  return {
    ...render(
      <MenuContext.Provider value={context}>{ui}</MenuContext.Provider>
    ),
    context,
  }
}

describe('MenuList', () => {
  it('renders as ul element', () => {
    renderWithContext(
      <MenuList>
        <MenuAction text="Item" />
      </MenuList>
    )

    const element = document.querySelector('.dnb-menu__list')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('UL')
  })

  it('has role="menu"', () => {
    renderWithContext(
      <MenuList>
        <MenuAction text="Item" />
      </MenuList>
    )

    const element = document.querySelector('[role="menu"]')
    expect(element).toBeInTheDocument()
  })

  it('renders children', () => {
    renderWithContext(
      <MenuList>
        <MenuAction text="First" />
        <MenuAction text="Second" />
      </MenuList>
    )

    const items = document.querySelectorAll('[role="menuitem"]')
    expect(items).toHaveLength(2)
  })

  it('forwards aria-label', () => {
    renderWithContext(
      <MenuList aria-label="File actions">
        <MenuAction text="Item" />
      </MenuList>
    )

    const element = document.querySelector('[role="menu"]')
    expect(element.getAttribute('aria-label')).toBe('File actions')
  })

  it('forwards aria-labelledby', () => {
    renderWithContext(
      <MenuList aria-labelledby="menu-heading">
        <MenuAction text="Item" />
      </MenuList>
    )

    const element = document.querySelector('[role="menu"]')
    expect(element.getAttribute('aria-labelledby')).toBe('menu-heading')
  })

  it('merges custom className', () => {
    renderWithContext(
      <MenuList className="custom-menu">
        <MenuAction text="Item" />
      </MenuList>
    )

    const element = document.querySelector('.dnb-menu__list')
    expect(element.classList).toContain('custom-menu')
  })

  it('renders dividers', () => {
    renderWithContext(
      <MenuList>
        <MenuAction text="First" />
        <MenuDivider />
        <MenuAction text="Second" />
      </MenuList>
    )

    const divider = document.querySelector('[role="separator"]')
    expect(divider).toBeInTheDocument()
  })

  describe('keyboard navigation', () => {
    it('focuses first item on ArrowDown when no item is active (mouse-open scenario)', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: -1, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowDown' })

      expect(setActiveIndex).toHaveBeenCalledWith(0)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[0])
    })

    it('focuses last item on ArrowUp when no item is active (mouse-open scenario)', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: -1, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowUp' })

      expect(setActiveIndex).toHaveBeenCalledWith(2)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[2])
    })

    it('moves focus to next item on ArrowDown', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: 0, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowDown' })

      expect(setActiveIndex).toHaveBeenCalledWith(1)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[1])
    })

    it('moves focus to previous item on ArrowUp', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: 2, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowUp' })

      expect(setActiveIndex).toHaveBeenCalledWith(1)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[1])
    })

    it('wraps focus from last to first on ArrowDown', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
        </MenuList>,
        { activeIndex: 1, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowDown' })

      expect(setActiveIndex).toHaveBeenCalledWith(0)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[0])
    })

    it('wraps focus from first to last on ArrowUp', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: 0, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowUp' })

      expect(setActiveIndex).toHaveBeenCalledWith(2)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[2])
    })

    it('skips disabled items on ArrowDown', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" disabled />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: 0, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'ArrowDown' })

      expect(setActiveIndex).toHaveBeenCalledWith(2)
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[2])
    })

    it('focuses first item on Home', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: 2, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'Home' })

      expect(setActiveIndex).toHaveBeenCalledWith(0)
    })

    it('focuses last item on End', () => {
      const setActiveIndex = jest.fn()
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>,
        { activeIndex: 0, setActiveIndex }
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'End' })

      expect(setActiveIndex).toHaveBeenCalledWith(2)
    })

    it('does not call closeAll on Escape — Popover handles it', () => {
      const { context } = renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
        </MenuList>
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'Escape' })

      expect(context.closeAll).not.toHaveBeenCalled()
    })

    it('does not call closeAll on Tab — Popover handles it', () => {
      const { context } = renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
        </MenuList>
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'Tab' })

      expect(context.closeAll).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = renderWithContext(
        <MenuList aria-label="Test menu">
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
        </MenuList>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations with divider', async () => {
      const { container } = renderWithContext(
        <MenuList aria-label="Test menu">
          <MenuAction text="Item 1" />
          <MenuDivider />
          <MenuAction text="Item 2" />
        </MenuList>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations with disabled items', async () => {
      const { container } = renderWithContext(
        <MenuList aria-label="Test menu">
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" disabled />
        </MenuList>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
