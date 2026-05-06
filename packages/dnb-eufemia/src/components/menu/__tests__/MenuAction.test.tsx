import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import MenuAction from '../MenuAction'
import { MenuContext, MenuTriggerContext } from '../MenuContext'
import { createMockContext, renderWithContext } from './testHelpers'

describe('MenuAction', () => {
  it('renders as li element', () => {
    renderWithContext(<MenuAction text="Click me" />)

    const element = document.querySelector('.dnb-menu__action')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('LI')
  })

  it('has role="menuitem"', () => {
    renderWithContext(<MenuAction text="Click me" />)

    const element = document.querySelector('[role="menuitem"]')
    expect(element).toBeInTheDocument()
  })

  it('renders text content', () => {
    renderWithContext(<MenuAction text="My Action" />)

    const textEl = document.querySelector('.dnb-menu__action__text')
    expect(textEl).toBeInTheDocument()
    expect(textEl.textContent).toBe('My Action')
  })

  it('renders icon when provided', () => {
    renderWithContext(<MenuAction icon="bell" text="Alert" />)

    const icon = document.querySelector('.dnb-menu__action__icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders children', () => {
    renderWithContext(
      <MenuAction>
        <span data-testid="child">Custom content</span>
      </MenuAction>
    )

    expect(
      document.querySelector('[data-testid="child"]')
    ).toBeInTheDocument()
  })

  it('fires onClick on click', () => {
    const onClick = jest.fn()
    renderWithContext(<MenuAction text="Click" onClick={onClick} />)

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.click(item)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('closes all menus after click', () => {
    const onClick = jest.fn()
    const { context } = renderWithContext(
      <MenuAction text="Click" onClick={onClick} />
    )

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.click(item)

    expect(context.closeAll).toHaveBeenCalled()
  })

  it('does not close menus when hasSubMenu', () => {
    const onClick = jest.fn()
    const { context } = renderWithContext(
      <MenuAction text="Sub" onClick={onClick} hasSubMenu />
    )

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.click(item)

    expect(context.closeAll).not.toHaveBeenCalled()
  })

  it('fires onClick on Enter key', () => {
    const onClick = jest.fn()
    renderWithContext(<MenuAction text="Enter" onClick={onClick} />)

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.keyDown(item, { key: 'Enter' })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('fires onClick on Space key', () => {
    const onClick = jest.fn()
    renderWithContext(<MenuAction text="Space" onClick={onClick} />)

    const item = document.querySelector('[role="menuitem"]')
    fireEvent.keyDown(item, { key: ' ' })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  describe('disabled state', () => {
    it('sets aria-disabled', () => {
      renderWithContext(<MenuAction text="Disabled" disabled />)

      const item = document.querySelector('[role="menuitem"]')
      expect(item.getAttribute('aria-disabled')).toBe('true')
    })

    it('adds disabled class', () => {
      renderWithContext(<MenuAction text="Disabled" disabled />)

      const item = document.querySelector('.dnb-menu__action--disabled')
      expect(item).toBeInTheDocument()
    })

    it('does not fire onClick when disabled', () => {
      const onClick = jest.fn()
      renderWithContext(
        <MenuAction text="Disabled" disabled onClick={onClick} />
      )

      const item = document.querySelector('[role="menuitem"]')
      fireEvent.click(item)

      expect(onClick).not.toHaveBeenCalled()
    })

    it('does not fire onClick on Enter when disabled', () => {
      const onClick = jest.fn()
      renderWithContext(
        <MenuAction text="Disabled" disabled onClick={onClick} />
      )

      const item = document.querySelector('[role="menuitem"]')
      fireEvent.keyDown(item, { key: 'Enter' })

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('active trigger state', () => {
    it('adds active-trigger class when used as sub-menu trigger', () => {
      const triggerValue = {
        active: true,
        triggerProps: { ref: jest.fn() },
        open: jest.fn(),
        close: jest.fn(),
        toggle: jest.fn(),
      }

      const context = createMockContext()
      render(
        <MenuContext value={context}>
          <ul role="menu">
            <MenuTriggerContext value={triggerValue}>
              <MenuAction text="Sub menu" />
            </MenuTriggerContext>
          </ul>
        </MenuContext>
      )

      const item = document.querySelector(
        '.dnb-menu__action--active-trigger'
      )
      expect(item).toBeInTheDocument()
    })
  })

  describe('link variant', () => {
    it('renders as link when href is provided', () => {
      renderWithContext(
        <MenuAction text="Link" href="https://example.com" />
      )

      const anchor = document.querySelector('.dnb-menu__action__link')
      expect(anchor).toBeInTheDocument()
      expect(anchor.tagName).toBe('A')
      expect(anchor.getAttribute('href')).toBe('https://example.com')
    })

    it('adds link class', () => {
      renderWithContext(<MenuAction text="Link" href="/path" />)

      const item = document.querySelector('.dnb-menu__action--link')
      expect(item).toBeInTheDocument()
    })

    it('sets target and rel', () => {
      renderWithContext(
        <MenuAction
          text="External"
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        />
      )

      const anchor = document.querySelector('a')
      expect(anchor.getAttribute('target')).toBe('_blank')
      expect(anchor.getAttribute('rel')).toBe('noopener noreferrer')
    })

    it('removes href when disabled', () => {
      renderWithContext(
        <MenuAction text="Disabled Link" href="/path" disabled />
      )

      const anchor = document.querySelector('a')
      expect(anchor.getAttribute('href')).toBeNull()
    })
  })

  describe('sub-menu', () => {
    it('sets aria-haspopup when hasSubMenu', () => {
      renderWithContext(<MenuAction text="Sub" hasSubMenu />)

      const item = document.querySelector('[role="menuitem"]')
      expect(item.getAttribute('aria-haspopup')).toBe('menu')
    })

    it('adds has-submenu class', () => {
      renderWithContext(<MenuAction text="Sub" hasSubMenu />)

      const item = document.querySelector('.dnb-menu__action--has-submenu')
      expect(item).toBeInTheDocument()
    })

    it('renders submenu indicator icon', () => {
      renderWithContext(<MenuAction text="Sub" hasSubMenu />)

      const indicator = document.querySelector(
        '.dnb-menu__action__submenu-indicator'
      )
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('custom props', () => {
    it('forwards id', () => {
      renderWithContext(<MenuAction id="my-action" text="Item" />)

      const item = document.querySelector('#my-action')
      expect(item).toBeInTheDocument()
    })

    it('merges custom className', () => {
      renderWithContext(<MenuAction className="custom" text="Item" />)

      const item = document.querySelector('.dnb-menu__action')
      expect(item.classList).toContain('custom')
    })
  })

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = renderWithContext(<MenuAction text="Item 1" />)

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations for link variant', async () => {
      const { container } = renderWithContext(
        <MenuAction text="Link" href="/path" />
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations when disabled', async () => {
      const { container } = renderWithContext(
        <MenuAction text="Disabled" disabled />
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
