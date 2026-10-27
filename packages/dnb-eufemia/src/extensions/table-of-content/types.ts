import type {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import type { SpacingProps } from '../../shared/types'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'
import type { InternalLocale } from '../../shared/Context'
import type { WebStorageType } from '../../shared/helpers/webStorage'

export type TableOfContentSection = {
  /** Unique id of the heading or section to link to. */
  id: string
  /** Readable label. Inline formatting, such as code, is supported. */
  text: ReactNode
  /** Heading level from 1 to 6. Level 1 is tracked and appears when includeH1 is enabled. */
  level: number
}

export type TableOfContentRootProps = {
  /**
   * Nested TableOfContent.Item elements. Fragments and memoized items are supported. Use Data for generated content.
   */
  children?: ReactNode
  /**
   * Visible title and default accessible name. Translated through locale or the Provider locale.
   * Default: `"On this page"`
   */
  title?: ReactNode
  /**
   * Language of the built-in title and show-all label. Overrides the Provider locale for this navigation only. Also sets its lang attribute unless lang is supplied. Custom titles and accessible names take precedence.
   */
  locale?: InternalLocale
  /**
   * Controlled current section id. Omit to detect it while scrolling. Set null to clear it. A section below maxDepth marks its nearest visible ancestor.
   */
  currentId?: string | null
  /**
   * Distance in pixels from the viewport top where a heading becomes current. Match the height of your sticky header.
   * Default: `0`
   */
  currentSectionOffset?: number
  /**
   * Number of visible levels, starting at the highest heading level below h1. Deeper headings remain tracked.
   * Default: `2`
   */
  maxDepth?: number
  /**
   * Maximum number of links initially shown below the breakpoint, including nested links and an included page title. Set 0 to show every link. Desktop always shows all links.
   * Default: `10`
   */
  maxVisibleItems?: number
  /**
   * Eufemia breakpoint at or above which the navigation is always expanded. Below it, a disclosure button controls the list. Defaults to large (72em, normally 1152px); Provider breakpoint overrides are respected.
   * Default: `"large"`
   */
  breakpoint?: MediaQuerySizes
  /**
   * Use the available width. Otherwise the expanded sidebar is 12rem wide.
   * Default: `false`
   */
  stretch?: boolean
  /**
   * Keep the desktop navigation visible while its containing content scrolls. Set false when the application positions it.
   * Default: `true`
   */
  sticky?: boolean
  /**
   * Distance from the top of the scroll container. Numbers use pixels; strings accept CSS lengths.
   * Default: `0`
   */
  stickyOffset?: number | string
  /**
   * Animate heading-list changes with a short fade and staggered slide from the left. Initial rendering, section selection and collapsed lists are not animated. Respects reduced motion.
   * Default: `false`
   */
  animateChanges?: boolean
  /** Controlled disclosure state below the breakpoint. */
  expanded?: boolean
  /**
   * Initial disclosure state below the breakpoint.
   * Default: `false`
   */
  defaultExpanded?: boolean
  /**
   * Storage key used to remember the disclosure state across navigation and reloads. Stored booleans override defaultExpanded. Controlled expanded does not read or write storage.
   */
  expandedStorageKey?: string
  /**
   * Storage used with expandedStorageKey. Session storage is recommended for navigation UI state.
   * Default: `"session"`
   */
  expandedStorage?: WebStorageType
  /**
   * Called with the requested disclosure state after button activation or browser find-in-page. Update expanded when controlling the state.
   */
  onExpandedChange?: (expanded: boolean) => void
  /**
   * Reference to the navigation element.
   */
  ref?: Ref<HTMLElement>
} & SpacingProps &
  Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'>

export type TableOfContentDataProps = Omit<
  TableOfContentRootProps,
  'children'
> & {
  /**
   * Flat array of { id, text, level } in document order. Ids identify existing destinations and must be unique on the page. Text accepts inline React content. Level is the heading level from 1 to 6; h1 headings are tracked and shown when includeH1 is enabled.
   */
  data: TableOfContentSection[]
  /**
   * Include level-1 page titles as links before their sections, without adding indentation or counting toward maxDepth.
   * Default: `false`
   */
  includeH1?: boolean
}

export type TableOfContentItemProps = {
  /**
   * Unique id of the heading or section to navigate to. It is not applied to the list item.
   */
  id: string
  /**
   * Readable link label. Supports inline formatting such as code. Avoid interactive content inside labels.
   */
  text: ReactNode
  /** Nested TableOfContent.Item elements. */
  children?: ReactNode
  /**
   * Called before native fragment navigation and destination focus. Call event.preventDefault() to handle navigation yourself.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>
} & Omit<HTMLAttributes<HTMLLIElement>, 'id' | 'onClick'>
