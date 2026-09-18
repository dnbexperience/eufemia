/**
 * Types for DrawerList
 *
 */

import type {
  CSSProperties,
  ComponentType,
  HTMLProps,
  MouseEvent,
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
  SyntheticEvent,
} from 'react'
import type { SpacingProps } from '../../shared/types'
import type { DrawerListItemProps } from './DrawerListItem'

export type DrawerListContent = string | ReactNode | (string | ReactNode)[]

export type DrawerListDataArrayObjectStrict = {
  /**
   * What group index in the `groups` property this item belongs to.
   */
  groupIndex?: number
  selectedValue?: string | ReactNode
  selectedKey?: string | number
  suffixValue?: string | ReactNode
  content: DrawerListContent
  disabled?: boolean
  /** used by Autocomplete for additional search hits */
  searchContent?: string | ReactNode | string[]
  /** style prop of the html list item */
  style?: CSSProperties
  /** classname added to the html list item */
  className?: string
  /**
   * If set to `true`, mouse events selected style will be disabled. Keyboard can still select.
   */
  ignoreEvents?: boolean
  /** internal use only */
  render?: (children: ReactNode, id: string) => ReactNode
}

export type DrawerListDataArrayObject = {
  [customProperty: string]: any
} & DrawerListDataArrayObjectStrict

export type DrawerListDataArrayItem =
  | DrawerListDataArrayObject
  | DrawerListContent

export type DrawerListDataArray = DrawerListDataArrayItem[]

export type DrawerListDataRecord = Record<string, DrawerListContent>

export type DrawerListDataAll = DrawerListDataRecord | DrawerListDataArray

export type DrawerListSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | number

export type DrawerListGroup<T> = {
  groupTitle: ReactNode
  groupData: T
  /** Make title screen reader only */
  hideTitle?: boolean
}

export type DrawerListGroupTitles = ReactNode[]

export type DrawerListOptionsRender = ({
  data,
  Items,
  Item,
}: {
  data: DrawerListDataArrayObject[]
  Items: () => ReactNode
  Item: ComponentType<DrawerListItemProps>
}) => ReactNode

export type DrawerListDriverRow = {
  key: string
  type: 'group' | 'option'
  itemId?: number
  keepMounted?: boolean
  render: (props?: DrawerListDriverRowProps) => ReactNode
}

export type DrawerListDriverRowProps = {
  ref?: Ref<HTMLLIElement>
  className?: string
  style?: CSSProperties
  'data-index'?: number
  'aria-describedby'?: string
  'aria-posinset'?: number
  'aria-setsize'?: number
}

export type DrawerListDriverProps = {
  rows: DrawerListDriverRow[]
  activeIndex: number
  selectedIndex: number
  open: boolean
  listRef: RefObject<HTMLUListElement>
  registerListDriver: (driver: {
    itemIds: number[]
    scrollToItem: (itemId: number, smooth: boolean) => void
  }) => () => void
}

export type DrawerListDriver = {
  Renderer: ComponentType<DrawerListDriverProps>
}

export type DrawerListValue = string | number

export type DrawerListData =
  | string
  | (() => DrawerListDataAll)
  | DrawerListDataAll

export type DrawerListSuffix = ReactNode

export type DrawerListEvent = {
  data: DrawerListDataArrayObject | null
  attributes: Record<string, unknown>
  ulElement?: HTMLUListElement | null
}

export type DrawerListChangeEvent = {
  selectedItem: number | null
  value: string | number
  data: DrawerListDataArrayObject | null
  event: SyntheticEvent | null
  attributes: Record<string, unknown>
}

export type DrawerListSelectEvent = DrawerListChangeEvent & {
  activeItem: number | string
}

export type DrawerListResizeEvent = {
  direction: string
  maxHeight: number
}

export type DrawerListItemMouseEnterEvent = {
  item: number
  data: DrawerListDataArrayObject | string | null
  event: MouseEvent<HTMLLIElement>
}

export type DrawerListProps = {
  id?: string
  role?: string
  /**
   * Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.
   */
  cacheHash?: string
  /**
   * Does nothing as there is no longer any arrow. Legacy docs: Position of the arrow on the popup drawer. Set to `left` or `right`. Defaults to `left` if not set.
   * @deprecated does nothing as there is no longer any arrow, and will be removed in v13.
   */
  arrowPosition?: string
  /**
   * Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).
   */
  scrollable?: boolean
  /**
   * If set to `true`, the element is then focusable by assertive technologies.
   */
  focusable?: boolean
  /**
   * Defines the direction of how the drawer-list shows the options list. Can be `bottom` or `top`. Defaults to `auto`.
   */
  direction?: 'auto' | 'top' | 'bottom'
  size?: DrawerListSize
  /**
   * Defines the minimum height (in `rem`) of the options list.
   */
  minHeight?: string | number
  /**
   * Defines the maximum height (in `rem`) of the options list.
   */
  maxHeight?: string | number
  /**
   * To disable appear/disappear (show/hide) animation.
   */
  noAnimation?: boolean
  /**
   * To disable scrolling animation.
   */
  noScrollAnimation?: boolean
  /**
   * If set to `true`, the DrawerList will then not make any permanent selection.
   */
  preventSelection?: boolean
  isPopup?: boolean
  /**
   * Use 'right' to change the options alignment direction. Only makes sense to use in combination with `preventSelection` - or if an independent width is used.
   */
  alignDrawer?: 'left' | 'right'
  /**
   *  Removes the divider line between options. Defaults to `false`.
   */
  noDivider?: boolean
  /**
   * Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsrender). This can be used to add additional options above the actual rendered list.
   */
  optionsRender?: DrawerListOptionsRender
  /**
   * Opt in to a custom list renderer. Use `createDrawerListVirtualization` from `@dnb/eufemia/fragments/drawer-list/Virtualization` to render large data sets without mounting every option. Install the optional `@tanstack/react-virtual` peer dependency when using this driver. Cannot be combined with `optionsRender`.
   */
  listDriver?: DrawerListDriver
  /**
   * Has to be an HTML Element, or a selector for one, ideally a parent element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapperElement` will not trigger an outside click.
   */
  wrapperElement?: string | HTMLElement
  /**
   * Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to `null`.
   */
  defaultValue?: DrawerListValue
  /**
   * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` property (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
   */
  value?: DrawerListValue
  /**
   * To disable the React Portal behavior.
   */
  skipPortal?: boolean
  /**
   * Define an HTML class that will be set on the DOM portal alongside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
   */
  portalClass?: string
  /**
   * Define an HTML class that will be set on the list, alongside `dnb-drawer-list__list`.
   */
  listClass?: string
  /**
   * If set to `true`, the DrawerList will not close on any events.
   */
  preventClose?: boolean
  /**
   * If set to `true`, the DrawerList will handle its width and position independently of the parent element.
   */
  independentWidth?: boolean
  /**
   * If set to `true`, the list is rendered in normal document flow instead of an absolute overlay, with a flat look instead of a floating card. Implies `skipPortal`. Defaults to `false`.
   */
  inline?: boolean
  /**
   * If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.
   */
  fixedPosition?: boolean
  /**
   * If set to `true`, the DrawerList will close on outside clicks, but not on selection.
   */
  keepOpen?: boolean
  preventFocus?: boolean
  /**
   * If set to `true`, search items by the first key will be ignored.
   */
  skipKeysearch?: boolean
  /**
   * If set to `true`, the DrawerList will be open. Use together with onHide/onShow to control visibility.
   */
  open?: boolean
  data?: DrawerListData
  groups?: DrawerListGroupTitles
  /**
   * If set to `true`, all keyboard and mouse events will be ignored.
   */
  ignoreEvents?: boolean
  className?: string
  /** Accepts the same values as the `data` prop. Will be ignored if `data` is used. Can also accept a single child for custom rendering. */
  children?: DrawerListData | ReactElement
  suffix?: DrawerListSuffix
  /**
   * If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.
   */
  enableBodyLock?: boolean
  /**
   * Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions in contrast to a scrollable page content).
   */
  pageOffset?: string | number
  /**
   * Set an HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.
   */
  observerElement?: string | ReactNode
  onOpen?: (event: DrawerListEvent) => void
  onClose?: (event: DrawerListEvent) => void
  handleDismissFocus?: () => void
  onChange?: (event: DrawerListChangeEvent) => void
  onPreChange?: (event: DrawerListChangeEvent) => boolean | void
  onResize?: (event: DrawerListResizeEvent) => void
  onSelect?: (event: DrawerListSelectEvent) => void
  /**
   * Will be called when the mouse enters a dropdown item. Returns item data and index.
   */
  onItemMouseEnter?: (event: DrawerListItemMouseEnterEvent) => void
}

export type DrawerListInternalItem = {
  __id: number
} & DrawerListDataArrayObject

export type DrawerListInternalData = Array<DrawerListInternalItem>

export type DrawerListRenderData = Array<
  DrawerListGroup<DrawerListInternalData>
>

export type DrawerListAllProps = DrawerListProps &
  SpacingProps &
  Omit<
    HTMLProps<HTMLElement>,
    | 'ref'
    | 'size'
    | 'label'
    | 'placeholder'
    | 'data'
    | 'children'
    | 'onChange'
    | 'onSelect'
    | 'onResize'
  >

export type DrawerListOptionsProps = HTMLProps<HTMLUListElement> & {
  children: ReactNode
  cacheHash?: string
  hasGroups?: boolean
  renderDriver?: DrawerListDriver
}
