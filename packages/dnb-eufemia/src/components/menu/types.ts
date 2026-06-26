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
   * Preferred placement of the menu relative to the trigger.
   * Default: `"bottom"`
   */
  placement?: PopoverPlacement
  /**
   * Position of the popover arrow relative to the popover. `top` and `bottom` positions are only applicable when `placement` is `left` or `right`, and vice versa.
   * Default: `"center"`
   */
  arrowPosition?: PopoverArrow
  /**
   * Controlled open state. Use together with `onOpenChange`.
   */
  open?: boolean
  /**
   * Called whenever the open state changes. Receives the new open state as a boolean.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Render inline instead of inside a portal.
   * Default: `false`
   */
  skipPortal?: boolean
  /**
   * Disable the open/close animation.
   * Default: `false`
   */
  noAnimation?: boolean
  /**
   * Control when the menu automatically flips its placement to fit within the viewport. `"initial"`: flip only on open. `"scroll"`: also flip during scroll. `"never"`: always use specified placement.
   * Default: `"initial"`
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
   * Alternative to `text`. Content rendered inside the header.
   */
  children?: ReactNode | ((context: MenuTriggerRenderProps) => ReactNode)
}

export type MenuListProps = {
  children?: ReactNode
  className?: string
  /**
   * Sets the maximum visible list items before the content scrolls. The component measures the rendered height of the first visible items. An explicit `style.maxHeight` overrides this.
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
   * Called when the action is clicked or activated via keyboard (Enter/Space). The menu closes automatically after the handler is invoked unless used as a trigger for a nested `Menu.Root`.
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
   * Disables the action. Sets `aria-disabled` and prevents click/keyboard activation.
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
   * Disables the accordion trigger. Sets `aria-disabled` and prevents toggling.
   * Default: `false`
   */
  disabled?: boolean
  /**
   * Called whenever the accordion open state changes. Receives the new open state as a boolean.
   */
  onOpenChange?: (open: boolean) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'>

export type MenuDividerProps = {
  className?: string
}

export type MenuHeaderProps = {
  className?: string
  /**
   * Header text displayed in the menu.
   */
  text?: ReactNode
  /**
   * Alternative to `text`. Content rendered inside the header.
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
