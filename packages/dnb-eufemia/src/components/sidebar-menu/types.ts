import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import type { AnchorProps } from '../anchor/Anchor'
import type { BadgeProps } from '../badge/Badge'
import type { IconIcon } from '../icon/Icon'
import type { SpacingProps } from '../../shared/types'

export type SidebarMenuItemData = {
  /** Unique id used for selection and open state. */
  id: string
  /** Visible item or accordion label. */
  text: ReactNode
  /** Icon shown before the label. Accordions default to folder. */
  icon?: IconIcon
  /** Badge content displayed on the right side. */
  badge?: BadgeProps['content']
  /** Additional content displayed on the right side before the badge. */
  suffix?: ReactNode
  /** Additional properties passed to the Badge component. */
  badgeProps?: Omit<BadgeProps, 'content' | 'children'>
  /** Link destination. When absent, leaf items render as buttons. */
  href?: string
  to?: string
  element?: AnchorProps['element']
  target?: string
  rel?: string
  /** Called when the page link is activated. */
  onClick?: MouseEventHandler<HTMLElement>
  /** Disables activation. */
  disabled?: boolean
  /** Marks a leaf item as the current page, or a section as initially active. */
  active?: boolean
  /** Nested items turn this data item into an accordion. */
  items?: SidebarMenuItemData[]
}

export type SidebarMenuSectionData = {
  /** Unique section id. */
  id: string
  /** Section toggle label. */
  text: ReactNode
  /** Marks this section as initially active. */
  active?: boolean
  /** Recursive menu content for the section. */
  items: SidebarMenuItemData[]
}

export type SidebarMenuContainerProps = {
  /**
   * Declarative menu content using the SidebarMenu subcomponents.
   */
  children?: ReactNode
  /**
   * Recursive items used to render a menu from data. Use instead of children or sections.
   */
  data?: SidebarMenuItemData[]
  /**
   * Top-level switchable sections and their recursive items.
   */
  sections?: SidebarMenuSectionData[]
  /** Controlled array of open accordion ids. */
  openItems?: string[]
  /**
   * Accordion ids that are initially open.
   * Default: `[]`
   */
  defaultOpenItems?: string[]
  /** Storage key used to persist the user's open accordion state between route navigations. */
  openItemsStorageKey?: string
  /**
   * Storage used with openItemsStorageKey. Session storage is recommended for navigation UI state.
   * Default: `"session"`
   */
  openItemsStorage?: 'session' | 'local'
  /** Storage key used to persist the nearest ScrollView's vertical position between route navigations. */
  scrollPositionStorageKey?: string
  /**
   * Storage used with scrollPositionStorageKey. Session storage is recommended for navigation UI state.
   * Default: `"session"`
   */
  scrollPositionStorage?: 'session' | 'local'
  /**
   * Called whenever an accordion opens or closes with all open accordion ids.
   */
  onOpenItemsChange?: (openItems: string[]) => void
  /** Controlled id of the visible section. */
  activeSection?: string
  /**
   * Id of the initially visible section. Defaults to the section marked active, then the first section.
   */
  defaultActiveSection?: string
  /**
   * Accessible label for the section toggle group.
   * Default: `"Menu section"`
   */
  sectionLabel?: ReactNode
  /** Called when a section toggle is selected. */
  onActiveSectionChange?: (sectionId: string) => void
  /** Controlled id of the selected item or page accordion. Its ancestor accordions and section open automatically. */
  selectedItem?: string
  /**
   * Id of the initially selected item or page accordion.
   */
  defaultSelectedItem?: string
  /** Called when a leaf item is selected. */
  onSelectedItemChange?: (itemId: string) => void
} & SpacingProps &
  Omit<HTMLAttributes<HTMLElement>, 'children'>

export type SidebarMenuItemProps = {
  /**
   * Unique item id used for selection state.
   */
  id: string
  /** Visible item label. */
  text?: ReactNode
  children?: ReactNode
  /**
   * Icon displayed before the label. The selection arrow replaces it while selected.
   */
  icon?: IconIcon
  /** Badge content displayed on the right side. */
  badge?: BadgeProps['content']
  /** Additional content displayed on the right side before the badge. */
  suffix?: ReactNode
  /** Additional properties passed to the Badge component. */
  badgeProps?: Omit<BadgeProps, 'content' | 'children'>
  /**
   * Renders the item as a link with this destination.
   */
  href?: string
  to?: string
  element?: AnchorProps['element']
  target?: string
  rel?: string
  /**
   * Disables activation.
   * Default: `false`
   */
  disabled?: boolean
  /**
   * Marks the item as the current page without managing container selection state.
   * Default: `false`
   */
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
} & Omit<HTMLAttributes<HTMLElement>, 'title' | 'onClick' | 'children'>

export type SidebarMenuAccordionProps = {
  /**
   * Unique accordion id used by controlled open state and ARIA relationships.
   */
  id: string
  /** Visible accordion label. */
  text?: ReactNode
  children?: ReactNode
  /**
   * Icon displayed before the label.
   * Default: `"folder"`
   */
  icon?: IconIcon
  /** Badge content displayed before the accordion indicator. */
  badge?: BadgeProps['content']
  /** Additional content displayed before the badge and accordion indicator. */
  suffix?: ReactNode
  /** Additional properties passed to the Badge component. */
  badgeProps?: Omit<BadgeProps, 'content' | 'children'>
  /**
   * Makes the accordion label a page link while the chevron remains a separate expansion button.
   */
  href?: string
  /** Router destination passed to element. */
  to?: string
  /** Custom link element, such as a router Link component. */
  element?: AnchorProps['element']
  target?: string
  rel?: string
  /**
   * Called when the optional page link is activated.
   */
  onClick?: MouseEventHandler<HTMLElement>
  /**
   * Disables the accordion trigger.
   * Default: `false`
   */
  disabled?: boolean
  /**
   * Controlled open state for this accordion.
   */
  open?: boolean
  /**
   * Initial local open state.
   * Default: `false`
   */
  defaultOpen?: boolean
  /**
   * Called whenever this accordion opens or closes.
   */
  onOpenChange?: (open: boolean) => void
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children' | 'onClick'>

export type SidebarMenuSectionProps = {
  id: string
  text: ReactNode
  children?: ReactNode
}

export type SidebarMenuHeaderProps = {
  children?: ReactNode
  text?: ReactNode
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children'>

export type SidebarMenuDividerProps = HTMLAttributes<HTMLLIElement>
