import { DynamicElement, SpacingProps } from '../../shared/types'
import { AnchorAllProps } from '../Anchor'
import { ButtonProps } from '../Button'
import {
  SectionSpacing,
  SectionStyleTypes,
  SectionVariants,
} from '../Section'
import { SkeletonShow } from '../Skeleton'

export type TabsContent =
  | React.ReactNode
  | Record<string, React.ReactNode | TabsContentFn>
  | TabsContentFn
export type TabsContentFn = ({
  key,
}: Partial<TabsInternalState>) => JSX.Element

export type TabsDataItem = {
  title: React.ReactNode
  key: TabsSelectedKey | TabsSelectedKeyStep
  content?: TabsContent
  selected?: boolean
  disabled?: boolean
  hash?: string
  to?: string
  href?: string
}

export type TabsData = Array<TabsDataItem>

export type TabsTabElement = DynamicElement<
  null,
  ButtonProps | AnchorAllProps
>

export type TabsAlign = 'left' | 'center' | 'right'

export type TabsSelectedKey = string | number
export type TabsSelectedKeyStep = TabsSelectedKey

export type TabsProps = SpacingProps & {
  /**
   * <em>(required)</em> defines the data structure to load as a JSON. e.g. `[{title: &#39;...&#39;, content: &#39;Current tab&#39;, key: &#39;...&#39;, hash: &#39;...&#39;}]`
   */
  data?: TabsData
  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  content?: TabsContent
  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  children?: TabsContent
  /**
   * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  content_style?: SectionStyleTypes | SectionVariants
  /**
   * To modify the `spacing` onto the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `large`.
   */
  content_spacing?: SectionSpacing
  label?: string
  /**
   * Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: &#39;url&#39;, ... }]}`). Defaults to `<button>`.
   */
  tab_element?: TabsTabElement
  /**
   * In case one of the tabs should be opened by a `key`.
   */
  selected_key?: TabsSelectedKey
  /**
   * To align the tab list on the right side `align="right"`. Defaults to `left`.
   */
  align?: TabsAlign
  /**
   * To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  tabs_style?: SectionStyleTypes | SectionVariants
  /**
   * To modify the `spacing` inside the tab list. Defaults to `null`.
   */
  tabs_spacing?: boolean
  /**
   * If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.
   */
  no_border?: boolean
  /**
   * If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.
   */
  nav_button_edge?: boolean
  use_hash?: boolean
  /**
   * If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.
   */
  prerender?: boolean
  /**
   * If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.
   */
  prevent_rerender?: boolean
  /**
   * If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.
   */
  scroll?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  id?: string

  /**
   * (preferred) this event gets triggered once the tab changes its selected key. Returns `{ key, selected_key, focus_key, event }`.
   */
  on_change?: (event: React.SyntheticEvent) => void
  /**
   * This event gets triggered once the user&#39;s mouse enters a tab (hover). Returns `{ key, selected_key, focus_key, event }`.
   */
  on_mouse_enter?: (event: React.SyntheticEvent) => void
  /**
   * This event gets triggered once the tab gets clicked. Returns `{ key, selected_key, focus_key, event }`.
   */
  on_click?: (event: React.SyntheticEvent) => void
  /**
   * This event gets triggered once the tab changes its focus key. Returns `{ key, selected_key, focus_key, event }`.
   */
  on_focus?: (event: React.SyntheticEvent) => void
  /**
   * Gives you the full flexibility to combine the different internal components
   */
  render?: ({
    Wrapper,
    Content,
    TabsList,
    Tabs,
  }: {
    Tabs: (props: TabsProps) => JSX.Element
    Content: (props: ContentWrapperProps) => JSX.Element
    Wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element
    TabsList: ({ children }: { children: React.ReactNode }) => JSX.Element
  }) => JSX.Element
}

export type TabsAllProps = TabsProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'data' | 'children'>

export type ContentWrapperProps = {
  id?: string
  selected_key?: TabsSelectedKey
  content_style?: SectionStyleTypes | SectionVariants
  content_spacing?: SectionSpacing
  animate?: boolean
  children?: TabsContent
} & Omit<React.HTMLProps<HTMLElement>, 'children'>

export type CustomContentProps = {
  title?: React.ReactNode
  hash?: string
  selected?: boolean
  disabled?: boolean
  children?:
    | React.ReactNode
    | ((args: TabsInternalEventArgs) => React.ReactNode)
} & Omit<React.HTMLProps<HTMLElement>, 'children'> &
  SpacingProps

export type TabsInternalState = {
  key?: string | number
  data?: TabsData
  selected_key?: TabsSelectedKey
  focus_key?: TabsSelectedKey
  lastPosition?: number
  hasScrollbar?: boolean
  atEdge?: boolean
  isFirst?: boolean
  isLast?: boolean
}

export type TabsInternalEventArgs = TabsInternalState & {
  key?: string | number
  data?: TabsData
  selected_key?: TabsSelectedKey
  focus_key?: TabsSelectedKey
  title?: React.ReactNode
  event?: React.MouseEvent | React.KeyboardEvent
}

export type TabsInternalModes = 'step' | null
