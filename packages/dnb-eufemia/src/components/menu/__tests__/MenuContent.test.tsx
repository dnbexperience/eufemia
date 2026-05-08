import type { ReactElement } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import MenuList from '../MenuList'
import MenuAction from '../MenuAction'
import MenuDivider from '../MenuDivider'
import { MenuContext } from '../MenuContext'
import type { MenuContextValue } from '../types'
import { createMockContext } from './testHelpers'

function renderWithContext(
  ui: ReactElement,
  contextOverrides?: Partial<MenuContextValue>
) {
  const context = createMockContext(contextOverrides)
  return {
    ...render(<MenuContext value={context}>{ui}</MenuContext>),
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

  describe('maxVisibleListItems', () => {
    it('sets fallback maxHeight based on maxVisibleListItems', () => {
      renderWithContext(
        <MenuList maxVisibleListItems={3}>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
          <MenuAction text="Item 4" />
          <MenuAction text="Item 5" />
        </MenuList>
      )

      const element = document.querySelector(
        '.dnb-menu__list'
      ) as HTMLElement
      expect(element.style.maxHeight).toBe(
        'calc(var(--menu-action-min-height, 2.5rem) * 3 + var(--menu-content-padding, 0.25rem) * 2)'
      )
      expect(element.style.overflowY).toBe('auto')
    })

    it('does not set maxHeight when maxVisibleListItems is not provided', () => {
      renderWithContext(
        <MenuList>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
        </MenuList>
      )

      const element = document.querySelector(
        '.dnb-menu__list'
      ) as HTMLElement
      expect(element.style.maxHeight).toBe('')
    })

    it('does not set maxHeight when maxVisibleListItems is 0', () => {
      renderWithContext(
        <MenuList maxVisibleListItems={0}>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
        </MenuList>
      )

      const element = document.querySelector(
        '.dnb-menu__list'
      ) as HTMLElement
      expect(element.style.maxHeight).toBe('')
    })

    it('uses measured height when items are rendered', () => {
      const itemHeight = 40
      const paddingBlock = 4

      const originalGetComputedStyle = window.getComputedStyle
      jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
        return {
          paddingTop: `${paddingBlock}px`,
          paddingBottom: `${paddingBlock}px`,
        } as unknown as CSSStyleDeclaration
      })

      // Mock offsetTop/offsetHeight on HTMLLIElement before render
      const originalOffsetTop = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetTop'
      )
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetHeight'
      )

      Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
        configurable: true,
        get() {
          if (this.getAttribute('role') === 'menuitem') {
            const index = Array.from(
              this.parentElement?.children ?? []
            ).indexOf(this)
            return index * itemHeight
          }
          return 0
        },
      })
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get() {
          if (this.getAttribute('role') === 'menuitem') {
            return itemHeight
          }
          return 0
        },
      })

      renderWithContext(
        <MenuList maxVisibleListItems={2}>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
        </MenuList>
      )

      const element = document.querySelector(
        '.dnb-menu__list'
      ) as HTMLElement
      const expectedHeight = itemHeight * 2 + paddingBlock * 2
      expect(element.style.maxHeight).toBe(`${expectedHeight}px`)

      // Restore
      if (originalOffsetTop) {
        Object.defineProperty(
          HTMLElement.prototype,
          'offsetTop',
          originalOffsetTop
        )
      }
      if (originalOffsetHeight) {
        Object.defineProperty(
          HTMLElement.prototype,
          'offsetHeight',
          originalOffsetHeight
        )
      }
      window.getComputedStyle = originalGetComputedStyle
    })

    it('allows style.maxHeight to override maxVisibleListItems', () => {
      renderWithContext(
        <MenuList maxVisibleListItems={3} style={{ maxHeight: '100px' }}>
          <MenuAction text="Item 1" />
          <MenuAction text="Item 2" />
          <MenuAction text="Item 3" />
          <MenuAction text="Item 4" />
        </MenuList>
      )

      const element = document.querySelector(
        '.dnb-menu__list'
      ) as HTMLElement
      expect(element.style.maxHeight).toBe('100px')
    })

    it('cleans up resize listener on unmount', () => {
      const addSpy = jest.spyOn(window, 'addEventListener')
      const removeSpy = jest.spyOn(window, 'removeEventListener')

      const { unmount } = renderWithContext(
        <MenuList maxVisibleListItems={3}>
          <MenuAction text="Item 1" />
        </MenuList>
      )

      expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function))

      unmount()

      expect(removeSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      )

      addSpy.mockRestore()
      removeSpy.mockRestore()
    })
  })
})
