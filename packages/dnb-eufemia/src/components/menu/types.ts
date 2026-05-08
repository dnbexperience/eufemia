import type {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from 'react'
import type { IconIcon } from '../icon/Icon'
import type { AnchorProps } from '../anchor/Anchor'
import type { ButtonProps } from '../button/Button'
import type {
  PopoverArrow,
  PopoverPlacement,
  PopoverAutoAlignMode,
  PopoverTriggerRenderProps,
} from '../popover/types'

export type MenuTriggerRenderProps = PopoverTriggerRenderProps

export type MenuRootProps = {
  id?: string
  className?: string
  children?: ReactNode
  /**
   * Placement of the menu relative to the trigger.
   * Default: `bottom`
   */
  placement?: PopoverPlacement
  /**
   * Position of the popover arrow relative to the popover.
   * Default: `left`
   */
  arrowPosition?: PopoverArrow
  /**
   * Controlled open state.
   */
  open?: boolean
  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Skip rendering in a React Portal.
   * Default: `false`
   */
  skipPortal?: boolean
  /**
   * Disable the open/close animation.
   * Default: `false`
   */
  noAnimation?: boolean
  /**
   * Control auto-flip behavior.
   * Default: `initial`
   */
  autoAlignMode?: PopoverAutoAlignMode
}

/**
 * Menu.Button supports all [Button](/uilib/components/button/properties) props
 * (e.g. `text`, `icon`, `variant`, `size`, `disabled`) in addition to the
 * props listed here.
 */
export type MenuButtonProps = Omit<ButtonProps, 'children'> & {
  /**
   * Render function for a custom trigger element.
   * Receives trigger props including `ref`, `active`, `open`, `close`, `toggle`.
   */
  children?: ReactNode | ((context: MenuTriggerRenderProps) => ReactNode)
}

export type MenuListProps = {
  children?: ReactNode
  className?: string
  /**
   * Maximum number of visible items before the list scrolls.
   */
  maxVisibleListItems?: number
} & Omit<HTMLAttributes<HTMLUListElement>, 'children'>

export type MenuActionProps = {
  id?: string
  className?: string
  children?: ReactNode
  /**
   * Icon displayed before the text.
   */
  icon?: IconIcon
  /**
   * Action label text.
   */
  text?: ReactNode
  /**
   * Click handler for the action.
   */
  onClick?: MouseEventHandler<HTMLLIElement>
  /**
   * When provided, the action renders as a link.
   */
  href?: string
  /**
   * Use this property when using a router Link component as the `element`.
   * The `to` value is passed to the router element for client-side navigation.
   */
  to?: string
  /**
   * Define what HTML or React element should be used for the link
   * (e.g. `element={Link}` for a router Link component).
   * Defaults to a semantic `a` element.
   */
  element?: AnchorProps['element']
  target?: string
  rel?: string
  /**
   * Whether the action is disabled.
   * Default: `false`
   */
  disabled?: boolean
  /**
   * Indicates this action has a sub-menu.
   * Automatically set when used as a trigger for a nested Menu.Root.
   * Default: `false`
   */
  hasSubMenu?: boolean
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'onClick'>

export type MenuAccordionProps = {
  id?: string
  className?: string
  children?: ReactNode
  /**
   * Icon displayed before the text.
   */
  icon?: IconIcon
  /**
   * Accordion trigger label text.
   */
  text?: ReactNode
  /**
   * Whether the accordion is disabled.
   * Default: `false`
   */
  disabled?: boolean
  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (open: boolean) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'>

export type MenuDividerProps = {
  className?: string
}

export type MenuHeaderProps = {
  className?: string
  /**
   * Header text.
   */
  text?: ReactNode
  /**
   * Alternative to `text`. Rendered inside the header.
   */
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'role'>

export type MenuContextValue = {
  level: number
  closeAll: () => void
  closeSelf?: () => void
  activeIndex: number
  setActiveIndex: (index: number) => void
  registerItem: (ref: RefObject<HTMLElement>) => number
  unregisterItem: (index: number) => void
  itemRefs: RefObject<Array<RefObject<HTMLElement>>>
  menuRef: RefObject<HTMLUListElement>
  isOpen: boolean
}
