import React, { act } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Menu from '../Menu'

jest.mock('../../popover/Popover', () => {
  return jest.requireActual('./testHelpers').MockPopover
})

describe('Menu integration', () => {
  it('renders a complete menu with root, content, and actions', () => {
    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Open Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="File actions">
          <Menu.Action text="Copy" />
          <Menu.Action text="Paste" />
          <Menu.Divider />
          <Menu.Action text="Delete" />
        </Menu.List>
      </Menu.Root>
    )

    const menu = document.querySelector('[role="menu"]')
    expect(menu).toBeInTheDocument()

    const items = document.querySelectorAll('[role="menuitem"]')
    expect(items).toHaveLength(3)

    const divider = document.querySelector('[role="separator"]')
    expect(divider).toBeInTheDocument()
  })

  it('renders with render function trigger', () => {
    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...triggerProps }) => (
            <button {...triggerProps} data-active={active}>
              Menu
            </button>
          )}
        </Menu.Button>
        <Menu.List aria-label="Actions">
          <Menu.Action text="Item 1" />
        </Menu.List>
      </Menu.Root>
    )

    const trigger = document.querySelector('button')
    expect(trigger).toBeInTheDocument()
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
  })

  it('fires action onClick and closes menu', () => {
    const onClick = jest.fn()
    const onOpenChange = jest.fn()

    render(
      <Menu.Root open={true} onOpenChange={onOpenChange}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="Actions">
          <Menu.Action text="Click me" onClick={onClick} />
        </Menu.List>
      </Menu.Root>
    )

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.click(item)

    expect(onClick).toHaveBeenCalledTimes(1)
    // closeAll triggers onOpenChange(false)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders menu with icons', () => {
    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="Actions">
          <Menu.Action icon="bell" text="Alert" />
          <Menu.Action icon="trash" text="Delete" />
        </Menu.List>
      </Menu.Root>
    )

    const icons = document.querySelectorAll('.dnb-menu__action__icon')
    expect(icons).toHaveLength(2)
  })

  it('renders menu with mixed action types', () => {
    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="Actions">
          <Menu.Action text="Button action" onClick={jest.fn()} />
          <Menu.Action text="Link action" href="/path" />
          <Menu.Action text="Disabled" disabled />
        </Menu.List>
      </Menu.Root>
    )

    const items = document.querySelectorAll('[role="menuitem"]')
    expect(items).toHaveLength(3)

    expect(
      document.querySelector('.dnb-menu__action--link')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-menu__action--disabled')
    ).toBeInTheDocument()
  })

  it('disabled action does not fire onClick', () => {
    const onClick = jest.fn()

    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="Actions">
          <Menu.Action text="Disabled" disabled onClick={onClick} />
        </Menu.List>
      </Menu.Root>
    )

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.click(item)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders action with to and custom element for router navigation', () => {
    const MockLink = ({
      to,
      children,
      ...rest
    }: {
      to: string
      children: React.ReactNode
    }) => (
      <a href={to} data-router-link {...rest}>
        {children}
      </a>
    )

    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="Navigation">
          <Menu.Action
            text="Dashboard"
            to="/dashboard"
            element={MockLink as React.ComponentType}
          />
        </Menu.List>
      </Menu.Root>
    )

    const link = document.querySelector('[data-router-link]')
    expect(link).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-menu__action--link')
    ).toBeInTheDocument()
  })

  it('renders action with to as a link even without href', () => {
    render(
      <Menu.Root open={true}>
        <Menu.Button>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </Menu.Button>
        <Menu.List aria-label="Navigation">
          <Menu.Action text="Route" to="/route" />
        </Menu.List>
      </Menu.Root>
    )

    const link = document.querySelector('.dnb-menu__action__link')
    expect(link).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-menu__action--link')
    ).toBeInTheDocument()
  })

  describe('keyboard navigation', () => {
    it('navigates with ArrowDown after mouse-open (focus on menu, not item)', () => {
      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Item 1" />
            <Menu.Action text="Item 2" />
            <Menu.Action text="Item 3" />
          </Menu.List>
        </Menu.Root>
      )

      // Simulate mouse-open: focus lands on the <ul>, no item is active
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      menu.focus()
      expect(document.activeElement).toBe(menu)

      // First ArrowDown should focus the first item
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[0])

      // Second ArrowDown should move to the second item
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(items[1])
    })

    it('navigates with ArrowUp after mouse-open (focuses last item)', () => {
      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Item 1" />
            <Menu.Action text="Item 2" />
            <Menu.Action text="Item 3" />
          </Menu.List>
        </Menu.Root>
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.focus(menu)

      // ArrowUp with no active item should focus the last item
      fireEvent.keyDown(menu, { key: 'ArrowUp' })
      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[2])
    })

    it('moves focus into menu on ArrowDown when already open', () => {
      jest.useFakeTimers()

      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...triggerProps }) => (
              <button {...triggerProps}>Menu</button>
            )}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Item 1" />
            <Menu.Action text="Item 2" />
          </Menu.List>
        </Menu.Root>
      )

      const trigger = document.querySelector('button')
      trigger.focus()

      fireEvent.keyDown(trigger, { key: 'ArrowDown' })

      // Flush the requestAnimationFrame that focuses the first item
      act(() => {
        jest.advanceTimersByTime(16)
      })

      const items = document.querySelectorAll('[role="menuitem"]')
      expect(document.activeElement).toBe(items[0])

      jest.useRealTimers()
    })

    it('does not redundantly handle Escape — Popover manages it', () => {
      const onOpenChange = jest.fn()

      render(
        <Menu.Root open={true} onOpenChange={onOpenChange}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Item 1" />
            <Menu.Action text="Item 2" />
          </Menu.List>
        </Menu.Root>
      )

      const menu = document.querySelector('[role="menu"]')
      fireEvent.keyDown(menu, { key: 'Escape' })

      // Menu lets Popover's capture-phase handler close and restore focus
      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('activates action on Enter key', () => {
      const onClick = jest.fn()

      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Enter me" onClick={onClick} />
          </Menu.List>
        </Menu.Root>
      )

      const item = document.querySelector('[role="menuitem"]')
      fireEvent.keyDown(item, { key: 'Enter' })

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('activates action on Space key', () => {
      const onClick = jest.fn()

      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Space me" onClick={onClick} />
          </Menu.List>
        </Menu.Root>
      )

      const item = document.querySelector('[role="menuitem"]')
      fireEvent.keyDown(item, { key: ' ' })

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('nested menu', () => {
    it('navigates to nested menu trigger with ArrowDown', () => {
      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Main menu">
            <Menu.Action text="Simple" />
            <Menu.Root>
              <Menu.Action text="More options" />
              <Menu.List aria-label="Sub menu">
                <Menu.Action text="Sub item 1" />
              </Menu.List>
            </Menu.Root>
            <Menu.Action text="Last" />
          </Menu.List>
        </Menu.Root>
      )

      const menu = document.querySelector('[role="menu"]') as HTMLElement
      menu.focus()

      // ArrowDown from <ul> → first item "Simple"
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement?.textContent).toContain('Simple')

      // ArrowDown → nested trigger "More options"
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement?.textContent).toContain('More options')

      // ArrowDown → "Last"
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement?.textContent).toContain('Last')
    })

    it('renders nested menu structure', () => {
      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Main menu">
            <Menu.Action text="Simple" />
            <Menu.Root open={true}>
              <Menu.Action text="More options" />
              <Menu.List aria-label="Sub menu">
                <Menu.Action text="Sub item 1" />
                <Menu.Action text="Sub item 2" />
              </Menu.List>
            </Menu.Root>
          </Menu.List>
        </Menu.Root>
      )

      const menus = document.querySelectorAll('[role="menu"]')
      expect(menus).toHaveLength(2)

      const allItems = document.querySelectorAll('[role="menuitem"]')
      // "Simple" + "More options" (trigger) + "Sub item 1" + "Sub item 2"
      expect(allItems.length).toBeGreaterThanOrEqual(3)
    })

    it('opens nested menu on ArrowRight', () => {
      jest.useFakeTimers()
      const onOpenChange = jest.fn()

      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Main menu">
            <Menu.Action text="Simple" />
            <Menu.Root onOpenChange={onOpenChange}>
              <Menu.Action text="More options" />
              <Menu.List aria-label="Sub menu">
                <Menu.Action text="Sub item 1" />
                <Menu.Action text="Sub item 2" />
              </Menu.List>
            </Menu.Root>
          </Menu.List>
        </Menu.Root>
      )

      // Focus the sub-menu trigger item
      const items = document.querySelectorAll('[role="menuitem"]')
      const subMenuTrigger = items[1] // "More options"
      ;(subMenuTrigger as HTMLElement).focus()

      // ArrowRight should open the nested menu
      fireEvent.keyDown(subMenuTrigger, { key: 'ArrowRight' })
      expect(onOpenChange).toHaveBeenCalledWith(true)

      jest.useRealTimers()
    })

    it('auto-detects hasSubMenu and active-trigger on nested trigger', () => {
      render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Main menu">
            <Menu.Root open={true}>
              <Menu.Action text="Sub trigger" />
              <Menu.List aria-label="Sub menu">
                <Menu.Action text="Sub item" />
              </Menu.List>
            </Menu.Root>
          </Menu.List>
        </Menu.Root>
      )

      const trigger = document.querySelector(
        '.dnb-menu__action--has-submenu'
      )
      expect(trigger).toBeInTheDocument()
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
      expect(trigger.textContent).toContain('Sub trigger')

      // active-trigger class is auto-set when sub-menu is open
      expect(trigger.classList).toContain(
        'dnb-menu__action--active-trigger'
      )
    })
  })

  describe('accessibility', () => {
    it('has no axe violations for basic menu', async () => {
      const { container } = render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Copy" />
            <Menu.Action text="Paste" />
          </Menu.List>
        </Menu.Root>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations with dividers', async () => {
      const { container } = render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Copy" />
            <Menu.Divider />
            <Menu.Action text="Delete" />
          </Menu.List>
        </Menu.Root>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations with disabled items', async () => {
      const { container } = render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action text="Enabled" />
            <Menu.Action text="Disabled" disabled />
          </Menu.List>
        </Menu.Root>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations with links', async () => {
      const { container } = render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Navigation">
            <Menu.Action text="Home" href="/" />
            <Menu.Action text="Settings" href="/settings" />
          </Menu.List>
        </Menu.Root>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations with icons', async () => {
      const { container } = render(
        <Menu.Root open={true}>
          <Menu.Button>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </Menu.Button>
          <Menu.List aria-label="Actions">
            <Menu.Action icon="bell" text="Alert" />
            <Menu.Action icon="trash" text="Delete" />
          </Menu.List>
        </Menu.Root>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
