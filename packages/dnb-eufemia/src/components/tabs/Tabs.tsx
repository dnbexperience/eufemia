/**
 * Web Tabs Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context, { type ContextProps } from '../../shared/Context'
import {
  warn,
  slugify,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  getClosestParent,
  filterProps,
  combineLabelledBy,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../space/types'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import Button from '../button/Button'
import whatInput from '../../shared/helpers/whatInput'
import CustomContent from './TabsCustomContent'
import ContentWrapper from './TabsContentWrapper'
import {
  createSharedState,
  type SharedStateReturn,
} from '../../shared/helpers/useSharedState'
import { DynamicElement } from '../../shared/types'
import { ButtonProps } from '../Button'
import { AnchorAllProps } from '../Anchor'
import type {
  SectionSpacing,
  SectionStyle,
  SectionVariants,
} from '../Section'
import type { SkeletonShow } from '../Skeleton'

export type TabsData =
  | string
  | {
      title: string | React.ReactNode | ((...args: any[]) => any)
      key: string | number
      selected?: boolean
      disabled?: boolean
      content?: TabsContent
    }[]
  | any

export type TabsContent =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)

export type TabsTabElement = DynamicElement<
  null,
  ButtonProps | AnchorAllProps
>

export type TabsSelectedKey = string | number
export type TabsAlign = 'left' | 'center' | 'right'
export type TabsChildren =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)

export type TabsProps = Omit<
  React.HTMLProps<HTMLElement>,
  | 'ref'
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
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    content?: TabsContent
    /**
     * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
     */
    contentStyle?: SectionStyle | SectionVariants
    /**
     * To modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `large`.
     */
    contentSpacing?: SectionSpacing
    label?: string
    /**
     * Define what HTML element should be used. You can provide e.g. `tabElement={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: ';url';, ... }]}`). Defaults to `<button>`.
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
    tabsStyle?: SectionStyle | SectionVariants
    /**
     * To modify the `spacing` inside the tab list. Defaults to `null`.
     */
    tabsSpacing?: boolean
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
    onOpenTabNavigationFn?: (...args: any[]) => any
    /**
     * If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.
     */
    prerender?: boolean
    /**
     * If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.
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
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    children?: TabsChildren
    render?: (...args: any[]) => any
    onChange?: (...args: any[]) => any
    onMouseEnter?: (...args: any[]) => any
    onClick?: (...args: any[]) => any
    onFocus?: (...args: any[]) => any
  }

export type DummyProps = {
  /**
   * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
   */
  children: React.ReactNode
}

type TabDataItem = {
  title: string | React.ReactNode | ((...args: any[]) => any)
  key: string | number
  selected?: boolean
  disabled?: boolean
  content?: TabsContent
  [key: string]: unknown
}

type TabsState = {
  data: TabDataItem[]
  selectedKey: string | number
  focusKey: string | number
  atEdge: boolean
  lastPosition: number
  hasScrollbar: boolean
  _selectedKey: string | number
  _data: TabsData | TabsChildren
  _listenForPropChanges: boolean
  isFirst?: boolean
  isLast?: boolean
}

type SharedState = SharedStateReturn<Record<string, unknown>> & {
  subscribe: (subscriber: () => void) => void
  unsubscribe: (subscriber: () => void) => void
}

export default class Tabs extends React.PureComponent<
  TabsProps,
  TabsState
> {
  static contextType = Context
  context!: ContextProps

  _id: string
  _tabsRef: React.RefObject<HTMLDivElement>
  _tablistRef: React.RefObject<HTMLDivElement>
  _sharedState: SharedState | null
  _isMounted: boolean
  _cache: Record<
    string,
    { content: React.ReactNode; [key: string]: unknown }
  >
  _props: TabsProps

  static defaultProps = {
    data: null,
    content: null,
    contentStyle: null,
    contentSpacing: true,
    label: null,
    tabElement: 'button',
    selectedKey: null,
    align: 'left',
    tabsStyle: null,
    tabsSpacing: null,
    noBorder: false,
    navButtonEdge: false,
    onOpenTabNavigationFn: null,
    prerender: false,
    preventRerender: false,
    scroll: null,
    skeleton: null,
    id: null,

    className: null,
    children: null,
    render: null,
    onChange: null,
    onMouseEnter: null,
    onClick: null,
    onFocus: null,
    breakout: true,
  }

  static Content = CustomContent
  static ContentWrapper = ContentWrapper

  static getSelectedKeyOrFallback(
    selectedKey: TabsSelectedKey | null,
    data: TabDataItem[]
  ) {
    let useKey = selectedKey

    // 1. if selectedKey is null/undefined then try to get it from data
    if (!useKey) {
      useKey =
        data.reduce<TabsSelectedKey | null>(
          (acc, { selected, key }) => (selected ? key : acc),
          null
        ) ||
        (data[0] && data[0].key)
    } else {
      // 2. check if the key is valid
      // just to make sure we never get an empty content
      const keyExists = data.findIndex(({ key }) => key == selectedKey)
      if (keyExists === -1) {
        // key did not exists, so we get the first one
        useKey = data[0] && data[0].key
      }
    }

    return useKey
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    if (state._listenForPropChanges) {
      if (props.data) {
        if (state._data !== props.data) {
          state._data = props.data
          state.data = Tabs.getData(props)
        }
      } else if (props.children) {
        if (state._data !== props.children) {
          state._data = props.children
          state.data = Tabs.getData(props)
        }
      }
      if (props.selectedKey && state._selectedKey !== props.selectedKey) {
        state.selectedKey = state._selectedKey =
          Tabs.getSelectedKeyOrFallback(props.selectedKey, state.data)
      }
    }
    state._listenForPropChanges = true
    return state
  }

  static getData(props: TabsProps) {
    const addReactElement = (
      list: TabDataItem[],
      reactElem: React.ReactElement,
      reactElemIndex?: number
    ) => {
      if (reactElem && reactElem.type === CustomContent) {
        // tabs data from main prop
        const dataProps =
          (props.children &&
            Array.isArray(props.children) &&
            props.children[reactElemIndex]) ||
          {}

        // props from the "CustomContent" Component
        const componentProps = {
          ...(reactElem.props as Record<string, unknown>),
        }
        if (componentProps.title === null) {
          delete componentProps.title
        }

        const {
          title,
          key: _key,
          hash,
          ...rest
        } = {
          ...dataProps,
          ...componentProps,
          ...{ children: null }, // remove children, if there is some
        }

        list.push({
          title,
          key: (!_key && hash ? hash : _key) || slugify(title),
          content: reactElem, // can be a Node or a Function
          ...rest,
        })
      }
    }

    let res = []

    // check if we have to use the children prop to prepare our data
    const data =
      !props.data && props.children ? props.children : props.data

    // if it is an array containing React Components - collect data from Tabs.Content component
    if (
      Array.isArray(props.children) &&
      props.children.some(
        (element) =>
          typeof element === 'function' || React.isValidElement(element)
      )
    ) {
      res = props.children.reduce((list, reactElem, i) => {
        addReactElement(list, reactElem, i)
        return list
      }, [])
    }

    // if it is a single React Component - collect data from Tabs.Content component
    if (
      !Array.isArray(props.children) &&
      (typeof props.children === 'function' ||
        React.isValidElement(props.children))
    ) {
      addReactElement(res, props.children as React.ReactElement)
    }

    // continue, while the children didn't contain our data
    if (!(res && res.length > 0)) {
      // if data is array, it looks good!
      if (props.data && Array.isArray(data)) {
        res = data

        // it may be a json
      } else if (typeof data === 'string') {
        res = data[0] === '[' ? JSON.parse(data) : []

        // but it may also be an object
      } else if (data && typeof data === 'object') {
        res = Object.entries(data).reduce((acc, [key, obj]) => {
          if (obj) {
            acc.push({
              key,
              ...(obj as Record<string, unknown>),
            })
          }
          return acc
        }, [])
      }
    }

    return res || []
  }

  constructor(props: TabsProps) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway
    const data = Tabs.getData(props)

    const selectedKey = Tabs.getSelectedKeyOrFallback(
      props.selectedKey,
      data
    )

    const lastPosition = this.getLastPosition()
    this.state = {
      data,
      selectedKey,
      focusKey: selectedKey,
      atEdge: false,
      lastPosition,
      hasScrollbar: lastPosition > -1,
      _selectedKey: selectedKey,
      _data: props.data || props.children,
      _listenForPropChanges: true,
    }

    this._tabsRef = React.createRef()
    this._tablistRef = React.createRef()

    if (props.id) {
      this._sharedState = createSharedState(props.id)
      this._sharedState.set(this.getEventArgs({ selectedKey }))
    }
  }

  componentDidMount() {
    this._isMounted = true
    if (document.readyState === 'complete') {
      this.init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', this.init)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    this.resetWhatInput()
    if (this._sharedState) {
      this._sharedState = null
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResizeHandler)
      window.removeEventListener('load', this.init)
    }
  }

  init = () => {
    if (this._isMounted) {
      this.addScrollBehavior()

      const hasScrollbar = this.hasScrollbar()
      const hasLastPosition = this.hasLastPosition()
      this.setScrollbarState({ hasScrollbar })

      if (hasLastPosition) {
        this.setLeftPosition(this.state.lastPosition)
      }

      if (hasScrollbar) {
        this.scrollToTab({
          type: 'selected',
          behavior: hasLastPosition ? 'smooth' : 'auto',
        })
      }

      /**
       * This is a helper in order to set the focus on the content,
       * when the Tabs component is used with real route.
       *
       * 1. We save the last used tab every time
       * 2. Check if it is set
       * 3. If yes, then focus the tab content
       *
       */
      if (this.hasLastUsedTab() !== null) {
        this.setState(null, this.setFocusOnTabButton)
      }
    }
  }

  componentDidUpdate(props: TabsProps) {
    if (
      this._sharedState &&
      (this.props.selectedKey !== props.selectedKey ||
        this.props.data !== props.data)
    ) {
      this.onResizeHandler()

      if (this._sharedState) {
        const selectedKey = this.state.selectedKey
        this._sharedState.update(this.getEventArgs({ selectedKey }))
      }
    }
  }

  hasLastPosition() {
    return this.state.lastPosition > -1
  }

  getLastPosition() {
    if (typeof window !== 'undefined') {
      try {
        const pos = parseFloat(
          window.localStorage.getItem(`tabs-pos-${this._id}`)
        )
        window.localStorage.removeItem(`tabs-pos-${this._id}`)
        return isNaN(pos) ? -1 : pos
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  hasLastUsedTab() {
    if (typeof window !== 'undefined') {
      try {
        const key =
          window.localStorage.getItem(`tabs-last-${this._id}`) || null
        window.localStorage.removeItem(`tabs-last-${this._id}`)
        return key
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  saveLastUsedTab() {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          `tabs-last-${this._id}`,
          String(this.state.selectedKey)
        ) // gets removed right afterwards
      } catch (e) {
        warn(e)
      }
    }
  }

  saveLastPosition(position = this._tablistRef.current?.scrollLeft) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          `tabs-pos-${this._id}`,
          String(position)
        ) // gets removed right afterwards
      } catch (e) {
        warn(e)
      }
    }
  }

  setScrollbarState = ({ hasScrollbar = this.hasScrollbar() } = {}) => {
    if (hasScrollbar !== this.state.hasScrollbar) {
      this.setState({
        hasScrollbar,
      })
    }
  }

  onResizeHandler = () => {
    const hasScrollbar = this.hasScrollbar()
    this.setScrollbarState({ hasScrollbar })

    // ensure that we scroll to the "active" item
    if (hasScrollbar) {
      this.scrollToTab({ type: 'selected' })
    }
  }

  hasScrollbar() {
    return (
      /**
       * Safari Desktop adds one pixel "on zoom" level 1
       * therefore we just remove it here
       */
      this._tablistRef.current.scrollWidth - 1 >
      this._tablistRef.current.offsetWidth
    )
  }

  addScrollBehavior() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResizeHandler)
    }

    // Note: We could make use of "onMediaQueryChange"
    // But the problem is, we want constantly resize updates, and not just "one"
    // because we don't know the media query values beforehand
    // this.mediaQueryListener = onMediaQueryChange(
    //   {
    //     min: 'small',
    //   },
    //   this.onResizeHandler
    // )
  }

  onTablistKeyDownHandler = (e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'PageUp':
      case 'ArrowLeft':
        e.preventDefault()
        this.focusPrevTab(e)
        break
      case 'ArrowDown':
      case 'PageDown':
      case 'ArrowRight':
        e.preventDefault()
        this.focusNextTab(e)
        break
      case 'Home':
        e.preventDefault()
        this.focusFirstTab(e)
        break
      case 'End':
        e.preventDefault()
        this.focusLastTab(e)
        break
    }
  }

  focusFirstTab = (e) => {
    const key = this.state.data[0].key
    this.focusTab(key, e, 'step')
    this.scrollToTab({ type: 'focus' })
  }

  focusLastTab = (e) => {
    const key = this.state.data[this.state.data.length - 1].key
    this.focusTab(key, e, 'step')
    this.scrollToTab({ type: 'focus' })
  }

  focusPrevTab = (e) => {
    this.focusTab(-1, e, 'step')
    this.scrollToTab({ type: 'focus' })
  }
  focusNextTab = (e) => {
    this.focusTab(+1, e, 'step')
    this.scrollToTab({ type: 'focus' })
  }

  openPrevTab = (e) => {
    this.openTab(-1, e, 'step')
    this.scrollToTab({ type: 'selected' })
  }
  openNextTab = (e) => {
    this.openTab(+1, e, 'step')
    this.scrollToTab({ type: 'selected' })
  }

  handleVerticalScroll = () => {
    if (
      this.props.scroll &&
      this._tablistRef.current &&
      typeof this._tablistRef.current.scrollIntoView === 'function'
    ) {
      this._tablistRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }

  setLeftPosition(scrollLeft) {
    try {
      this._tablistRef.current.style.scrollBehavior = 'auto'
      this._tablistRef.current.scrollLeft = scrollLeft
      this._tablistRef.current.style.scrollBehavior = 'smooth'
    } catch (e) {
      //
    }
  }

  scrollToTab({
    type,
    behavior = 'smooth',
  }: {
    type: string
    behavior?: ScrollBehavior
  }) {
    if (typeof window === 'undefined') {
      return // stop here
    }

    if ((window as Window & { IS_TEST?: boolean }).IS_TEST) {
      behavior = 'auto'
    }

    const delay = () => {
      try {
        if (this.state.hasScrollbar && this._tablistRef.current) {
          const first = this._tablistRef.current.querySelector(
            '.dnb-tabs__button__snap:first-of-type'
          )
          const isFirst = first.classList.contains(type)
          const last = this._tablistRef.current.querySelector(
            '.dnb-tabs__button__snap:last-of-type'
          )
          const isLast = last.classList.contains(type)
          const elem = this._tablistRef.current.querySelector(
            `.dnb-tabs__button.${type}`
          )

          const style = window.getComputedStyle(this._tabsRef.current)
          const margin = parseFloat(style.marginLeft)
          let padding = margin < 0 ? parseFloat(style.paddingLeft) : 0

          // Add the extra padding when we go from 1 to 2 tab so the nav button
          if (!isFirst && !isLast && parseFloat(style.paddingLeft) < 16) {
            const navButton = this._tabsRef.current.querySelector(
              '.dnb-tabs__scroll-nav-button:first-of-type'
            )
            const additionalSpace =
              parseFloat(window.getComputedStyle(navButton).width) * 1.5

            padding += additionalSpace
          }

          const leftPadding =
            (margin < 0 ? Math.abs(margin) : 0) +
            padding +
            parseFloat(window.getComputedStyle(first).paddingLeft)
          const offsetLeft = (elem as HTMLElement).offsetLeft

          const left = elem && !isFirst ? offsetLeft - leftPadding : 0

          if (behavior === 'auto') {
            this._tablistRef.current.style.scrollBehavior = 'auto'
          }

          this._tablistRef.current.scrollTo({
            left,
            behavior,
          })

          if (behavior === 'auto') {
            this._tablistRef.current.style.scrollBehavior = ''
          }

          this.setState({
            isFirst,
            isLast,
          })
        }
      } catch (e) {
        warn(e)
      }
    }

    // Delay so Chrome/Safari makes the transition / animation smooth
    window.requestAnimationFrame(delay)
  }

  onMouseDown = (event) => {
    // once we press with mouse, the focus makes the scroll view move
    // in order to enhance UX, we prevent that and only allow a real click
    event.preventDefault()
  }

  onKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      try {
        const elem = document.getElementById(`${this._id}-content`)
        elem.focus({ preventScroll: true })
      } catch (e) {
        this.warnAboutMissingContainer()
      }
    }
  }

  onMouseEnterHandler = (event) => {
    const selectedKey = this.getCurrentKey(event)
    if (selectedKey) {
      dispatchCustomElementEvent(
        this,
        'onMouseEnter',
        this.getEventArgs({ event, selectedKey })
      )
    }
  }

  onClickHandler = (event) => {
    const selectedKey = this.getCurrentKey(event)
    if (selectedKey) {
      const ret = dispatchCustomElementEvent(
        this,
        'onClick',
        this.getEventArgs({ event, selectedKey })
      )

      if (ret !== false) {
        this.openTab(selectedKey, event)
        this.scrollToTab({ type: 'selected' })
      }
    }
  }

  getCurrentKey = (event: React.SyntheticEvent) => {
    let selectedKey: string | undefined
    try {
      const elem = getClosestParent(
        'dnb-tabs__button',
        event.target as HTMLElement
      ) as HTMLElement | null
      selectedKey = elem?.dataset?.tabKey
    } catch (e) {
      warn('Tabs Error:', e)
    }

    return selectedKey
  }

  getCurrentTitle = (selectedKey = this.state.selectedKey) => {
    const current = this.state.data.filter(
      ({ key }) => key == selectedKey
    )[0]
    return (current && current.title) || null
  }

  getStepKey(useKey, stateKey) {
    const currentData = this.state.data.filter(({ disabled }) => !disabled)
    const currentIndex = currentData.reduce(
      (acc, { key }, i) => (key == stateKey ? i : acc),
      -1
    )
    let nextIndex = currentIndex + useKey
    if (nextIndex < 0) {
      nextIndex = currentData.length - 1
    }
    if (nextIndex >= currentData.length) {
      nextIndex = 0
    }
    return currentData.reduce(
      (acc, { key }, i) => (i === nextIndex ? key : acc),
      null
    )
  }

  focusTab = (focusKey, event = null, mode = null) => {
    // for handling openPrevTab and openNextTab
    if (mode === 'step' && parseFloat(focusKey)) {
      focusKey = this.getStepKey(focusKey, this.state.focusKey)
    }

    this.setState(
      {
        focusKey,
        _listenForPropChanges: false,
      },
      this.setFocusOnTabButton
    )

    dispatchCustomElementEvent(
      this,
      'onFocus',
      this.getEventArgs({ event, focusKey })
    )

    this.setWhatInput()
  }

  setWhatInput() {
    whatInput.specificKeys([9, 37, 39, 33, 34, 35, 36])
  }

  resetWhatInput() {
    whatInput.specificKeys([9])
  }

  setFocusOnTabButton = () => {
    try {
      const elem = this._tablistRef.current.querySelector(
        '.dnb-tabs__button.focus'
      ) as HTMLElement
      elem.focus({ preventScroll: true })

      if (
        !document.getElementById(`${this._id}-content`) &&
        typeof process !== 'undefined' &&
        process.env.NODE_ENV !== 'test'
      ) {
        this.warnAboutMissingContainer()
      }
    } catch (e) {
      warn(e)
    }
  }

  warnAboutMissingContainer() {
    warn(
      `Could not find the required <Tabs.Content id="${this._id}-content" ... /> that provides role="tabpanel"`
    )
  }

  openTab = (selectedKey, event = null, mode = null) => {
    // saving the position will avoid flickering if the new tab will be done by a new page load
    this.saveLastPosition()
    this.saveLastUsedTab()
    this.resetWhatInput()

    // for handling openPrevTab and openNextTab
    if (mode === 'step' && parseFloat(selectedKey)) {
      selectedKey = this.getStepKey(selectedKey, this.state.selectedKey)
    }

    if (typeof selectedKey !== 'undefined') {
      this.setState(
        {
          selectedKey,
          focusKey: selectedKey,
          _listenForPropChanges: false,
        },
        this.handleVerticalScroll
      )
    }

    dispatchCustomElementEvent(
      this,
      'onChange',
      this.getEventArgs({ event, selectedKey })
    )

    if (
      this.props.onOpenTabNavigationFn &&
      typeof window !== 'undefined'
    ) {
      try {
        this.props.onOpenTabNavigationFn(selectedKey)
      } catch (e) {
        warn('Tabs Error:', e)
      }
    }

    if (this._sharedState) {
      this._sharedState.update(this.getEventArgs({ event, selectedKey }))
    }
  }

  getEventArgs(args) {
    const { selectedKey, focusKey } = this.state
    const key =
      typeof args.selectedKey !== 'undefined'
        ? args.selectedKey
        : selectedKey

    return {
      key,
      selectedKey,
      focusKey,
      title: this.getCurrentTitle(key),
      ...args,
    }
  }

  isFocus(tabKey) {
    return this.state.focusKey == tabKey
  }
  isSelected(tabKey) {
    return this.state.selectedKey == tabKey
  }

  renderCachedContent() {
    const { selectedKey, data } = this.state
    const { preventRerender, prerender } = this.props

    if (prerender) {
      this._cache = Object.entries(data).reduce((acc, [_idx, cur]) => {
        acc[cur.key] = {
          ...cur,
          content: this.getContent(cur.key),
        }
        return acc
      }, {})
    } else if (preventRerender) {
      this._cache = {
        ...(this._cache || {}),
        [selectedKey]: { content: this.getContent(selectedKey) },
      }
    }

    const cachedContent = Object.entries(this._cache).map(
      ([key, { content }]) => {
        const hide = key !== String(selectedKey)
        return (
          <div
            key={key}
            aria-hidden={hide ? true : undefined}
            className={clsx(
              'dnb-tabs__cached',
              hide && 'dnb-tabs__cached--hidden'
            )}
          >
            {content}
          </div>
        )
      }
    )

    return cachedContent
  }

  renderContent() {
    const { preventRerender, prerender } = this.props

    if (preventRerender || prerender) {
      return this.renderCachedContent()
    }

    return this.getContent(this.state.selectedKey)
  }

  getContent = (selectedKey) => {
    const { children, content: _content } = this.props

    const contentToRender = children || _content

    let content = null

    if (contentToRender) {
      if (
        typeof contentToRender === 'object' &&
        contentToRender[selectedKey]
      ) {
        // if content is provided as an object
        content = contentToRender[selectedKey]
      } else if (typeof contentToRender === 'function') {
        // if content is provided as a render prop
        content = contentToRender.apply(this, [selectedKey])
      } else if (React.isValidElement(contentToRender)) {
        content = contentToRender
      }
    }

    // check of the content is provided in the "data" part instead
    if (!content) {
      let items = []

      if (Array.isArray(this.state.data)) {
        items = this.state.data
      } else if (Array.isArray(contentToRender)) {
        items = contentToRender
      }

      // if content was provided as a React Component like "Tabs.Content"
      // - or the content was provided as a content prop i data
      if (items) {
        content = items
          .filter(({ key }) => key && selectedKey && key == selectedKey) // like isSelected
          .reduce((acc, { content }) => content || acc, null)
      }
    }

    if (typeof content === 'function') {
      const Component = content
      content = <Component />
    }

    return content
  }

  TabsWrapperHandler = ({
    children,
    ...rest
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { className, class: _className } = this.props as TabsProps & {
      class?: string
    }
    const { ...attributes } = filterProps(this.props, Tabs.defaultProps)

    const params: Record<string, unknown> = {
      ...attributes,
      className: clsx(
        'dnb-tabs',
        createSpacingClasses(this.props),
        className,
        _className
      ),
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params} {...rest}>
        {children}
      </div>
    )
  }

  TabsListHandler = ({
    children,
    className,
    ...rest
  }: React.PropsWithChildren<
    { className?: string } & Record<string, unknown>
  >) => {
    const {
      align,
      tabsStyle,
      tabsSpacing,
      noBorder,
      navButtonEdge,
      breakout,
    } = this.props
    const { hasScrollbar } = this.state

    return (
      <div
        className={clsx(
          'dnb-tabs__tabs',
          align ? `dnb-tabs__tabs--${align}` : null,
          tabsStyle ? `dnb-section dnb-section--${tabsStyle}` : null,
          tabsSpacing
            ? `dnb-section--spacing-${
                tabsSpacing === true ? 'large' : tabsSpacing
              }`
            : null,
          hasScrollbar && 'dnb-tabs--has-scrollbar',
          navButtonEdge && 'dnb-tabs--at-edge',
          noBorder && 'dnb-tabs__tabs--no-border',
          breakout && 'dnb-tabs__tabs--breakout',
          className
        )}
        ref={this._tabsRef}
        {...rest}
      >
        <ScrollNavButton
          onMouseDown={this.openPrevTab}
          icon="chevron_left"
          className={clsx(
            hasScrollbar &&
              (typeof this.state.isFirst !== 'undefined' ||
                this.hasLastPosition()) &&
              'dnb-tabs__scroll-nav-button--visible',
            this.state.isFirst && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />

        {children}

        <ScrollNavButton
          onMouseDown={this.openNextTab}
          icon="chevron_right"
          className={clsx(
            hasScrollbar &&
              (typeof this.state.isLast !== 'undefined' ||
                this.hasLastPosition()) &&
              'dnb-tabs__scroll-nav-button--visible',
            this.state.isLast && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />
      </div>
    )
  }

  TabContentHandler = () => {
    const { selectedKey } = this.state

    const content = this.renderContent()

    if (!this._sharedState && !content) {
      warn(`No content was given to the Tabs component!
Tip: Check out other solutions like <Tabs.Content id="unique">Your content, outside of the Tabs component</Tabs.Content>
`)
    }

    return (
      <ContentWrapper
        id={this._id}
        selectedKey={selectedKey}
        contentStyle={this.props.contentStyle}
        contentSpacing={this.props.contentSpacing}
        animate={this.props.prerender}
      >
        {content}
      </ContentWrapper>
    )
  }

  TabsHandler = (props: Record<string, unknown>) => {
    const { label, skeleton, tabElement } = { ...this._props, ...props }
    const { selectedKey } = this.state

    const TabElement = tabElement || 'button'

    const tabs = this.state.data.map(
      ({ title, key, disabled = false, to, href }) => {
        const itemParams: Record<string, unknown> = { to, href }
        const isFocus = this.isFocus(key)
        const isSelected = this.isSelected(key)
        if (isSelected) {
          itemParams['aria-controls'] = `${this._id}-content`
        }

        // itemParams['aria-current'] = isSelected // has best support on NVDA
        // itemParams['aria-selected'] = isSelected // has best support on VO

        if (disabled) {
          itemParams.disabled = true
          itemParams['aria-disabled'] = true
        }

        if (TabElement === 'button') {
          itemParams.type = 'button'
        }

        skeletonDOMAttributes(itemParams, skeleton, this.context)

        return (
          <div
            className={clsx(
              'dnb-tabs__button__snap',
              isFocus && 'focus',
              isSelected && 'selected'
            )}
            key={`tab-${key}`}
          >
            <TabElement
              role="tab"
              tabIndex={-1}
              id={`${this._id}-tab-${key}`}
              aria-selected={isSelected}
              className={clsx(
                'dnb-tabs__button',
                isFocus && 'focus',
                isSelected && 'selected'
              )}
              onMouseEnter={this.onMouseEnterHandler}
              onClick={this.onClickHandler}
              onKeyUp={this.onKeyDownHandler}
              onMouseDown={this.onMouseDown}
              data-tab-key={key}
              {...itemParams}
            >
              <span
                className={clsx(
                  'dnb-tabs__button__title',
                  createSkeletonClass('font', skeleton, this.context)
                )}
              >
                {title as React.ReactNode}
              </span>
              <Dummy>{title as React.ReactNode}</Dummy>
            </TabElement>
          </div>
        )
      }
    )

    const params: Record<string, unknown> = {}
    if (label) {
      params['aria-label'] = label
    }
    if (selectedKey) {
      params['aria-labelledby'] = combineLabelledBy(
        params,
        `${this._id}-tab-${selectedKey}`
      )
    }
    return (
      <div
        role="tablist"
        className="dnb-tabs__tabs__tablist"
        tabIndex={0}
        onKeyDown={this.onTablistKeyDownHandler}
        ref={this._tablistRef}
        {...params}
      >
        {tabs}
      </div>
    )
  }

  render() {
    const props = (this._props = extendPropsWithContextInClassComponent(
      this.props,
      Tabs.defaultProps,
      { skeleton: this.context?.skeleton }
    ) as TabsProps)

    const { render: customRenderer } = props

    const TabItems = this.TabsHandler as React.FC & {
      displayName?: string
    }
    TabItems.displayName = 'Tabs'

    const TabsList = this
      .TabsListHandler as React.FC<React.PropsWithChildren> & {
      displayName?: string
    }
    TabsList.displayName = 'TabsList'

    const Wrapper = this
      .TabsWrapperHandler as React.FC<React.PropsWithChildren> & {
      displayName?: string
    }
    Wrapper.displayName = 'TabsWrapper'

    const Content = this.TabContentHandler as React.FC & {
      displayName?: string
    }
    Content.displayName = 'TabContent'

    // here we reuse the component, if it has a custom renderer
    if (typeof customRenderer === 'function') {
      return customRenderer({
        Wrapper,
        Content,
        TabsList,
        Tabs: TabItems,
      })
    }

    return (
      <Wrapper>
        <TabsList>
          <TabItems />
        </TabsList>
        <Content />
      </Wrapper>
    )
  }
}

export const Dummy = ({ children }: { children: React.ReactNode }) => {
  /**
   * This is a dummy markup, to define a width of every tab
   * We use "aria-hidden" SPAN to simulate a wider width for each tab
   * There is also a CSS to make this work. Have a look in the styles: & > span[hidden] {...}
   */
  return (
    <span
      aria-hidden
      hidden
      className="dnb-dummy"
      // role="textbox" // methods to try to make NVDA not read blank
      // aria-readonly // methods to try to make NVDA not read blank
    >
      {children}
    </span>
  )
}

const ScrollNavButton = (
  props: Record<string, unknown> & { className?: string }
) => {
  return (
    <Button
      size="medium"
      variant="primary"
      tabIndex={-1}
      bounding
      aria-hidden
      {...props}
      className={clsx('dnb-tabs__scroll-nav-button', props.className)}
    />
  )
}

withComponentMarkers(Tabs, { _supportsSpacingProps: true })
