import type {
  CSSProperties,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import type { AnchorProps } from '../../components/anchor/Anchor'
import type { BadgeProps } from '../../components/badge/Badge'
import type { IconIcon } from '../../components/icon/Icon'
import type { SpacingProps } from '../../shared/types'

export type SidebarMenuItemData = {
  /** Renders nested items as a static titled group, or renders custom content without item semantics. */
  type?: 'group' | 'custom'
  /** Unique id used for selection and open state. */
  id: string
  /** Visible item or accordion label. */
  text?: ReactNode
  /** Content rendered when type is custom. */
  content?: ReactNode
  /** Additional class name passed to the rendered item. */
  className?: string
  /** Inline styles passed to the rendered item. */
  style?: CSSProperties
  /** Renders a separator immediately before this item. */
  dividerBefore?: boolean
  /** Icon shown before the label. */
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
  /** Whether nested items can be collapsed. Defaults to true. */
  collapsible?: boolean
}

export type SidebarMenuSectionData = {
  /** Unique section id. */
  id: string
  /** Section toggle label. */
  text: ReactNode
  /** Icon shown before the section label. */
  icon?: IconIcon
  /** Marks this section as initially active. */
  active?: boolean
  /** Recursive menu content for the section. */
  items: SidebarMenuItemData[]
}

export type SidebarMenuContainerProps = {
  /**
   * Declarative menu content composed with SidebarMenu.Item, SidebarMenu.Accordion,
   * SidebarMenu.Group, SidebarMenu.Section, SidebarMenu.Header, and
   * SidebarMenu.Divider. Use instead of data or sections.
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
   * Whether an off-screen selected item is positioned within the nearest ScrollView or browser viewport.
   * Default: `true`
   */
  scrollSelectedItemIntoView?: boolean
  /**
   * Disables keeping collapsed accordion content searchable with the browser's find-in-page functionality.
   * Default: `false`
   */
  disableUntilFound?: boolean
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
   * Screen-reader label for the section dropdown.
   * Default: `"Menu section"`
   */
  sectionLabel?: ReactNode
  /** Called when a section toggle is selected. */
  onActiveSectionChange?: (sectionId: string) => void
  /** Controlled id of the selected item or page accordion. Its ancestor accordions and section open automatically, but ancestor accordions can still be collapsed by the user. A collapsed ancestor indicates that it contains the current page. */
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
   * Icon displayed before the label.
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
  /** Icon displayed before the label. */
  icon?: IconIcon
  /** Badge content displayed before the accordion indicator. */
  badge?: BadgeProps['content']
  /** Additional content displayed before the badge and accordion indicator. */
  suffix?: ReactNode
  /** Additional properties passed to the Badge component. */
  badgeProps?: Omit<BadgeProps, 'content' | 'children'>
  /**
   * Makes the accordion trigger a page link that also controls expansion.
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
   * Whether nested items can be collapsed.
   * Default: `true`
   */
  collapsible?: boolean
  /**
   * Called whenever this accordion opens or closes.
   */
  onOpenChange?: (open: boolean) => void
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children' | 'onClick'>

export type SidebarMenuSectionProps = {
  id: string
  text: ReactNode
  /** Icon shown before the section label. */
  icon?: IconIcon
  children?: ReactNode
}

export type SidebarMenuGroupProps = {
  /** Unique id used to associate the title with the nested list. */
  id: string
  /** Visible group title. */
  text: ReactNode
  /** Icon shown before a linked group title. */
  icon?: IconIcon
  /** Badge content displayed on the right side of a linked group title. */
  badge?: BadgeProps['content']
  /** Additional content displayed before the badge. */
  suffix?: ReactNode
  /** Additional properties passed to the Badge component. */
  badgeProps?: Omit<BadgeProps, 'content' | 'children'>
  /** Nested menu content that is always visible. */
  children?: ReactNode
  /** Makes the group title a page link without making it collapsible. */
  href?: string
  /** Router destination passed to element. */
  to?: string
  /** Custom link element, such as a router Link component. */
  element?: AnchorProps['element']
  target?: string
  rel?: string
  /** Called when the optional page link is activated. */
  onClick?: MouseEventHandler<HTMLElement>
  /**
   * Disables activation of the optional page link.
   * Default: `false`
   */
  disabled?: boolean
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children' | 'onClick'>

export type SidebarMenuHeaderProps = {
  children?: ReactNode
  text?: ReactNode
} & Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children'>

export type SidebarMenuDividerProps = HTMLAttributes<HTMLLIElement>
