import React from 'react'
import { render } from '@testing-library/react'
import { MenuContext } from '../MenuContext'
import type { MenuContextValue } from '../types'

/**
 * Mock Popover component for menu tests.
 *
 * Use with jest.mock at the top of your test file:
 * ```
 * jest.mock('../../popover/Popover', () => MockPopover)
 * ```
 */
export function MockPopover(props: {
  open?: boolean
  onOpenChange?: (state: boolean) => void
  trigger?: unknown
  children?:
    | React.ReactNode
    | ((ctx: Record<string, unknown>) => React.ReactNode)
  className?: string
  id?: string
  triggerAttributes?: Record<string, unknown>
  [key: string]: unknown
}) {
  const closeFn = () => props.onOpenChange?.(false)

  const triggerElement =
    typeof props.trigger === 'function'
      ? (() => {
          const triggerRenderProps = {
            ref: () => {},
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

export function createMockContext(
  overrides?: Partial<MenuContextValue>,
): MenuContextValue {
  const itemRefs: React.RefObject<Array<React.RefObject<HTMLElement>>> = {
    current: [],
  }

  return {
    level: 0,
    closeAll: jest.fn(),
    activeIndex: 0,
    setActiveIndex: jest.fn(),
    registerItem: jest.fn((ref) => {
      const index = itemRefs.current.length
      itemRefs.current.push(ref)
      return index
    }),
    unregisterItem: jest.fn(),
    itemRefs,
    menuRef: { current: null },
    isOpen: true,
    ...overrides,
  }
}

export function renderWithContext(
  ui: React.ReactElement,
  contextOverrides?: Partial<MenuContextValue>,
) {
  const context = createMockContext(contextOverrides)
  return {
    ...render(
      <MenuContext value={context}>
        <ul role="menu">{ui}</ul>
      </MenuContext>,
    ),
    context,
  }
}
