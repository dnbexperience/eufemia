import type {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import type { SpacingProps } from '../../shared/types'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'

export type TableOfContentSection = {
  /** Unique id of the heading or section to link to. */
  id: string
  /** Readable label. Inline formatting, such as code, is supported. */
  text: ReactNode
  /** Heading level from 1 to 6. Level 1 is tracked but omitted from the list. */
  level: number
}

export type TableOfContentRootProps = {
  /**
   * Nested TableOfContent.Item elements. Fragments and memoized items are supported. Use Data for generated content.
   */
  children?: ReactNode
  /**
   * Visible title and default accessible name. Translated through Provider locale.
   * Default: `"On this page"`
   */
  title?: ReactNode
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
   * Eufemia breakpoint above which the navigation is always expanded. Below it, a disclosure button controls the list.
   * Default: `"large"`
   */
  breakpoint?: MediaQuerySizes
  /**
   * Use the available width. Otherwise the expanded sidebar is 12rem wide.
   * Default: `false`
   */
  stretch?: boolean
  /** Controlled disclosure state below the breakpoint. */
  expanded?: boolean
  /**
   * Initial disclosure state below the breakpoint.
   * Default: `false`
   */
  defaultExpanded?: boolean
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
   * Flat array of { id, text, level } in document order. Ids identify existing destinations and must be unique on the page. Text accepts inline React content. Level is the heading level from 1 to 6; h1 headings are tracked but omitted from the list.
   */
  data: TableOfContentSection[]
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
