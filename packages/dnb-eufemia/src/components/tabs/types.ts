/**
 * Types for Tabs
 *
 */

import type {
  ComponentType,
  HTMLProps,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
} from 'react'
import type {
  DynamicElement,
  InnerSpaceType,
  SpaceType,
  SpacingProps,
} from '../../shared/types'
import type { ButtonProps } from '../Button'
import type { AnchorAllProps } from '../Anchor'
import type { SectionVariants } from '../Section'
import type { SkeletonShow } from '../Skeleton'

export type TabsData =
  | string
  | {
      title: string | ReactNode | (() => ReactNode)
      key: string | number
      selected?: boolean
      disabled?: boolean
      content?: TabsContent
    }[]
  | any

export type TabsContent =
  | Record<string, unknown>
  | ReactNode
  | ((key: TabsSelectedKey) => ReactNode)

export type TabsTabElement = DynamicElement<
  null,
  ButtonProps | AnchorAllProps
>

export type TabsSelectedKey = string | number

export type TabsAlign = 'left' | 'center' | 'right'

export type TabsChildren =
  | Record<string, unknown>
  | ReactNode
  | ((key: TabsSelectedKey) => ReactNode)

export type TabsProps = Omit<
  HTMLProps<HTMLElement>,
  | 'ref'
  | 'data'
  | 'content'
  | 'children'
  | 'label'
  | 'onChange'
  | 'onClick'
  | 'onFocus'
  | 'onMouseEnter'
> &
  SpacingProps & {
    data?: TabsData
    /**
     * The content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    content?: TabsContent
    /**
     * To enable the visual helper `.dnb-section` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
     */
    contentStyle?: SectionVariants | string
    /**
     * To modify the inner space of the content wrapper. Defaults to `{ top: 'large' }`.
     */
    contentInnerSpace?: InnerSpaceType | boolean
    label?: string
    /**
     * Define what HTML element should be used. You can provide e.g. `tabElement={Link}` – you may then provide the `to` property inside every entry (`data={[{ to: '/url', ... }]}`). Defaults to `<button>`.
     */
    tabElement?: TabsTabElement
    /**
     * In case one of the tabs should be opened by a `key`.
     */
    selectedKey?: TabsSelectedKey
    /**
     * To align the tab list on the right side `align="right"`. Defaults to `left`.
     */
    align?: TabsAlign
    /**
     * To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
     */
    tabsStyle?: SectionVariants | string
    /**
     * To modify the top padding of the tab list. Only applies `paddingTop`. Defaults to `undefined`.
     */
    tabsInnerSpace?: SpaceType | boolean
    /**
     * If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.
     */
    noBorder?: boolean
    /**
     * If set to `false`, the default horizontal border line under the tablist remains inside the parent boundaries. Defaults to `true`.
     */
    breakout?: boolean
    /**
     * If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.
     */
    navButtonEdge?: boolean
    onOpenTabNavigationFn?: (selectedKey: TabsSelectedKey) => void
    /**
     * If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.
     */
    keepInDOM?: boolean
    /**
     * If set to `true`, all tab content is rendered and inactive content remains findable by the browser's find-in-page feature. Matching content selects its tab. Defaults to the value of `keepInDOM`.
     */
    openOnFind?: boolean
    /**
     * If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `keepInDOM`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.
     */
    preventRerender?: boolean
    /**
     * If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.
     */
    scroll?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    id?: string
    className?: string
    /**
     * The content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    children?: TabsChildren
    render?: (components: TabsRenderComponents) => ReactNode
    onChange?: (event: TabsEvent) => void
    onMouseEnter?: (event: TabsEvent) => void
    onClick?: (event: TabsEvent) => void | boolean
    onFocus?: (event: TabsEvent) => void
  }

export type TabsEvent = {
  key: TabsSelectedKey
  selectedKey: TabsSelectedKey
  focusKey: TabsSelectedKey
  title: string | ReactNode
  event?: SyntheticEvent | Event
}

export type TabsRenderComponents = {
  Wrapper: ComponentType<
    PropsWithChildren<{ className?: string } & Record<string, unknown>>
  >
  Content: ComponentType<Record<string, unknown>>
  TabsList: ComponentType<
    PropsWithChildren<{ className?: string } & Record<string, unknown>>
  >
  Tabs: ComponentType<Record<string, unknown>>
}

export type TabsDummyProps = {
  /**
   * The content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
   */
  children: ReactNode
}
