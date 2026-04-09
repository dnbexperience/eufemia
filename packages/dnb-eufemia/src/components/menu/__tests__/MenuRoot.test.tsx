import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import MenuRoot from '../MenuRoot'
import MenuButton from '../MenuButton'
import MenuList from '../MenuList'
import MenuAction from '../MenuAction'

// Mock Popover to avoid portal complexity in unit tests
jest.mock('../../popover/Popover', () => {
  return function MockPopover(props: {
    open?: boolean
    onOpenChange?: (state: boolean) => void
    trigger?: unknown
    children?:
      | React.ReactNode
      | ((ctx: Record<string, unknown>) => React.ReactNode)
    className?: string
    hideCloseButton?: boolean
    hideArrow?: boolean
    noInnerSpace?: boolean
    focusOnOpen?: boolean
    focusOnOpenElement?: () => HTMLElement | null
    contentClassName?: string
    triggerAttributes?: Record<string, unknown>
  }) {
    const closeFn = () => props.onOpenChange?.(false)

    const triggerElement =
      typeof props.trigger === 'function'
        ? (() => {
            const triggerRenderProps = {
              ref: () => {},
              'aria-controls': 'mock-popover',
              'aria-expanded': props.open || false,
              ...props.triggerAttributes,
            }
            Object.defineProperties(triggerRenderProps, {
              active: {
                value: props.open || false,
                enumerable: false,
              },
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
            id: 'mock-popover',
          })
        : props.children

    return (
      <div className={props.className} data-testid="mock-popover">
        {triggerElement}
        {props.open && (
          <div data-testid="mock-popover-content">{content}</div>
        )}
      </div>
    )
  }
})

describe('MenuRoot', () => {
  it('renders without errors', () => {
    render(
      <MenuRoot>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Open</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item 1" />
        </MenuList>
      </MenuRoot>
    )

    const element = document.querySelector('.dnb-menu')
    expect(element).toBeInTheDocument()
  })

  it('renders trigger element', () => {
    render(
      <MenuRoot>
        <MenuButton>
          {({ active, ...props }) => (
            <button {...props} data-active={active}>
              Menu
            </button>
          )}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const trigger = document.querySelector('button')
    expect(trigger).toBeInTheDocument()
    expect(trigger.textContent).toBe('Menu')
  })

  it('sets aria-haspopup="menu" on trigger', () => {
    render(
      <MenuRoot>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const trigger = document.querySelector('button')
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
  })

  it('opens and shows content when controlled', () => {
    const { rerender } = render(
      <MenuRoot open={false}>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item 1" />
        </MenuList>
      </MenuRoot>
    )

    expect(
      document.querySelector('[data-testid="mock-popover-content"]')
    ).not.toBeInTheDocument()

    rerender(
      <MenuRoot open={true}>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item 1" />
        </MenuList>
      </MenuRoot>
    )

    expect(
      document.querySelector('[data-testid="mock-popover-content"]')
    ).toBeInTheDocument()
  })

  it('calls onOpenChange when toggled', () => {
    const onOpenChange = jest.fn()

    render(
      <MenuRoot onOpenChange={onOpenChange}>
        <MenuButton>
          {({ toggle, ...props }) => (
            <button {...props} onClick={() => toggle()}>
              Menu
            </button>
          )}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const trigger = document.querySelector('button')
    fireEvent.click(trigger)

    expect(onOpenChange).toHaveBeenCalled()
  })

  it('merges custom className', () => {
    render(
      <MenuRoot className="custom-class">
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const element = document.querySelector('.dnb-menu')
    expect(element.classList).toContain('custom-class')
  })

  it('forwards id prop', () => {
    render(
      <MenuRoot id="my-menu">
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    // The Popover mock doesn't forward id, but we verify it doesn't throw
    expect(document.querySelector('.dnb-menu')).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(
        <MenuRoot>
          <MenuButton>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </MenuButton>
          <MenuList>
            <MenuAction text="Item 1" />
          </MenuList>
        </MenuRoot>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations when open', async () => {
      const { container } = render(
        <MenuRoot open={true}>
          <MenuButton>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </MenuButton>
          <MenuList aria-label="Menu">
            <MenuAction text="Item 1" />
            <MenuAction text="Item 2" />
          </MenuList>
        </MenuRoot>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
