/**
 * Web Tabs Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context from '../../shared/Context'
import {
  warn,
  slugify,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  getClosestParent,
  filterProps,
  combineLabelledBy,
} from '../../shared/component-helper'
import { extendPropsWithContext } from '../../shared/helpers/extendPropsWithContext'
import { applySpacing } from '../space/SpacingUtils'
import type {
  DynamicElement,
  InnerSpaceType,
  SpaceType,
  SpacingProps,
} from '../../shared/types'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import Button from '../button/Button'
import useId from '../../shared/helpers/useId'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import useUpdateEffect from '../../shared/helpers/useUpdateEffect'
import whatInput from '../../shared/helpers/whatInput'
import CustomContent from './TabsCustomContent'
import ContentWrapper from './TabsContentWrapper'
import {
  createSharedState,
  type SharedStateReturn,
} from '../../shared/helpers/useSharedState'
import type { ButtonProps } from '../Button'
import type { AnchorAllProps } from '../Anchor'
import type { SectionVariants } from '../Section'
import type { SkeletonShow } from '../Skeleton'

export type TabsData =
  | string
  | {
      title: string | React.ReactNode | (() => React.ReactNode)
      key: string | number
      selected?: boolean
      disabled?: boolean
      content?: TabsContent
    }[]
  | any

export type TabsContent =
  | Record<string, unknown>
  | React.ReactNode
  | ((key: TabsSelectedKey) => React.ReactNode)

export type TabsTabElement = DynamicElement<
  null,
  ButtonProps | AnchorAllProps
>

export type TabsSelectedKey = string | number
export type TabsAlign = 'left' | 'center' | 'right'
export type TabsChildren =
  | Record<string, unknown>
  | React.ReactNode
  | ((key: TabsSelectedKey) => React.ReactNode)

export type TabsProps = Omit<
  React.HTMLProps<HTMLElement>,
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
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    content?: TabsContent
    /**
     * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
     */
    contentStyle?: SectionVariants | string
    /**
     * To modify the inner space of the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `{ top: 'large' }`.
     */
    contentInnerSpace?: InnerSpaceType | boolean
    label?: string
    /**
     * Define what HTML element should be used. You can provide e.g. `tabElement={Link}` and then pass the `to` property inside every entry (`data={[{ to: '/url', ... }]}`). Defaults to `<button>`.
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
     * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
     */
    children?: TabsChildren
    render?: (components: TabsRenderComponents) => React.ReactNode
    onChange?: (event: TabsEvent) => void
    onMouseEnter?: (event: TabsEvent) => void
    onClick?: (event: TabsEvent) => void | boolean
    onFocus?: (event: TabsEvent) => void
  }

export type TabsEvent = {
  key: TabsSelectedKey
  selectedKey: TabsSelectedKey
  focusKey: TabsSelectedKey
  title: string | React.ReactNode
  event?: React.SyntheticEvent
}

export type TabsRenderComponents = {
  Wrapper: React.ComponentType<
    React.PropsWithChildren<
      { className?: string } & Record<string, unknown>
    >
  >
  Content: React.ComponentType<Record<string, unknown>>
  TabsList: React.ComponentType<
    React.PropsWithChildren<
      { className?: string } & Record<string, unknown>
    >
  >
  Tabs: React.ComponentType<Record<string, unknown>>
}

export type TabsDummyProps = {
  /**
   * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
   */
  children: React.ReactNode
}

type TabDataItem = {
  title: string | React.ReactNode | (() => React.ReactNode)
  key: string | number
  selected?: boolean
  disabled?: boolean
  content?: TabsContent
  [key: string]: unknown
}

type SharedState = SharedStateReturn<Record<string, unknown>> & {
  subscribe: (subscriber: () => void) => void
  unsubscribe: (subscriber: () => void) => void
}

const tabsDefaultProps: Record<string, unknown> = {
  data: null,
  content: null,
  contentStyle: null,
  contentInnerSpace: { top: 'large' },
  label: null,
  tabElement: 'button',
  selectedKey: null,
  align: 'left',
  tabsStyle: null,
  tabsInnerSpace: undefined,
  noBorder: false,
  navButtonEdge: false,
  onOpenTabNavigationFn: null,
  keepInDOM: false,
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

function getSelectedKeyOrFallback(
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

function getData(props: TabsProps) {
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
  const data = !props.data && props.children ? props.children : props.data

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

function TabsComponent(ownProps: TabsProps) {
  const context = useContext(Context)

  // Extend props with context (with defaults) - do this early so sub-components can use it
  const props = extendPropsWithContext(ownProps, tabsDefaultProps, {
    skeleton: context?.skeleton,
  }) as TabsProps

  // Ref for merged props so stable sub-components can access latest values
  const propsRef = useRef(props)
  propsRef.current = props

  // Refs
  const tabsRef = useRef<HTMLDivElement>(null)
  const tablistRef = useRef<HTMLDivElement>(null)
  const cacheRef = useRef<
    Record<string, { content: React.ReactNode; [key: string]: unknown }>
  >({})
  const listenForPropChangesRef = useRef(true)

  // ID
  const _id = useId(ownProps.id)

  // Shared state
  const sharedStateRef = useRef<SharedState | null>(null)
  const propChangeRef = useRef(false)

  // Initialize data and keys
  const initialData = useRef(getData(ownProps))
  const [data, setData] = useState<TabDataItem[]>(initialData.current)
  const [selectedKey, setSelectedKey] = useState<string | number>(() =>
    getSelectedKeyOrFallback(ownProps.selectedKey, initialData.current)
  )
  const [focusKey, setFocusKey] = useState<string | number>(selectedKey)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const [isFirst, setIsFirst] = useState<boolean | undefined>(undefined)
  const [isLast, setIsLast] = useState<boolean | undefined>(undefined)

  // Track previous props for getDerivedStateFromProps equivalent
  const [prevDataSource, setPrevDataSource] = useState(
    ownProps.data || ownProps.children
  )
  const [prevSelectedKey, setPrevSelectedKey] = useState(
    ownProps.selectedKey
  )

  // Sync state from props
  if (listenForPropChangesRef.current) {
    const dataSource = ownProps.data || ownProps.children
    let currentData = data
    if (prevDataSource !== dataSource) {
      setPrevDataSource(dataSource)
      const newData = getData(ownProps)
      setData(newData)
      currentData = newData
      propChangeRef.current = true
    }
    if (ownProps.selectedKey && prevSelectedKey !== ownProps.selectedKey) {
      setPrevSelectedKey(ownProps.selectedKey)
      setSelectedKey(
        getSelectedKeyOrFallback(ownProps.selectedKey, currentData)
      )
      propChangeRef.current = true
    }
  }

  // Reset listen flag after each render
  useEffect(() => {
    listenForPropChangesRef.current = true
  })

  // Store latest state in refs so stable sub-components can access them
  const dataRef = useRef(data)
  dataRef.current = data
  const selectedKeyRef = useRef(selectedKey)
  selectedKeyRef.current = selectedKey
  const focusKeyRef = useRef(focusKey)
  focusKeyRef.current = focusKey
  const hasScrollbarRef = useRef(hasScrollbar)
  hasScrollbarRef.current = hasScrollbar
  const isFirstRef = useRef(isFirst)
  isFirstRef.current = isFirst
  const isLastRef = useRef(isLast)
  isLastRef.current = isLast
  const contextRef = useRef(context)
  contextRef.current = context

  // Last position from localStorage
  const getLastPosition = () => {
    if (typeof window !== 'undefined') {
      try {
        const pos = parseFloat(
          window.localStorage.getItem(`tabs-pos-${_id}`)
        )
        window.localStorage.removeItem(`tabs-pos-${_id}`)
        return isNaN(pos) ? -1 : pos
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  const hasLastPosition = () => {
    return lastPositionRef.current > -1
  }

  const lastPositionRef = useRef(getLastPosition())

  const hasLastUsedTab = () => {
    if (typeof window !== 'undefined') {
      try {
        const key = window.localStorage.getItem(`tabs-last-${_id}`) || null
        window.localStorage.removeItem(`tabs-last-${_id}`)
        return key
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  const saveLastUsedTab = () => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          `tabs-last-${_id}`,
          String(selectedKeyRef.current)
        )
      } catch (e) {
        warn(e)
      }
    }
  }

  const saveLastPosition = (position = tablistRef.current?.scrollLeft) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(`tabs-pos-${_id}`, String(position))
      } catch (e) {
        warn(e)
      }
    }
  }

  const checkHasScrollbar = () => {
    if (!tablistRef.current) {
      return false
    }

    const tablistElem = tablistRef.current

    /**
     * Safari Desktop adds one pixel "on zoom" level 1
     * therefore we just remove it here
     */
    let tolerance = 1

    /**
     * Components placed in a tab title (e.g. Badge) may add
     * margin-right to the button for absolute positioning.
     * On the last tab, this trailing margin inflates
     * scrollWidth beyond the actual visible content.
     * Subtract the net trailing margin from the last snap
     * and its button to avoid false overflow detection.
     */
    const lastSnap = tablistElem.querySelector(
      '.dnb-tabs__button__snap:last-of-type'
    )
    if (lastSnap) {
      const lastButton = lastSnap.querySelector('.dnb-tabs__button')
      if (lastButton) {
        const buttonMargin =
          parseFloat(window.getComputedStyle(lastButton).marginRight) || 0
        const snapMargin =
          parseFloat(window.getComputedStyle(lastSnap).marginRight) || 0
        tolerance += Math.max(0, buttonMargin + snapMargin)
      }
    }

    return tablistElem.scrollWidth - tolerance > tablistElem.offsetWidth
  }

  const setLeftPosition = (scrollLeft: number) => {
    try {
      tablistRef.current.style.scrollBehavior = 'auto'
      tablistRef.current.scrollLeft = scrollLeft
      tablistRef.current.style.scrollBehavior = 'smooth'
    } catch (e) {
      //
    }
  }

  const scrollToTab = useCallback(
    ({
      type,
      behavior = 'smooth',
    }: {
      type: string
      behavior?: ScrollBehavior
    }) => {
      if (typeof window === 'undefined') {
        return // stop here
      }

      if (globalThis.IS_TEST) {
        behavior = 'auto'
      }

      const delay = () => {
        try {
          if (hasScrollbarRef.current && tablistRef.current) {
            const first = tablistRef.current.querySelector(
              '.dnb-tabs__button__snap:first-of-type'
            )
            const isFirstItem = first.classList.contains(type)
            const last = tablistRef.current.querySelector(
              '.dnb-tabs__button__snap:last-of-type'
            )
            const isLastItem = last.classList.contains(type)
            const elem = tablistRef.current.querySelector(
              `.dnb-tabs__button.${type}`
            )

            const style = window.getComputedStyle(tabsRef.current)
            const margin = parseFloat(style.marginLeft)
            let padding = margin < 0 ? parseFloat(style.paddingLeft) : 0

            if (
              !isFirstItem &&
              !isLastItem &&
              parseFloat(style.paddingLeft) < 16
            ) {
              const navButton = tabsRef.current.querySelector(
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

            const left =
              elem && !isFirstItem ? offsetLeft - leftPadding : 0

            if (behavior === 'auto') {
              tablistRef.current.style.scrollBehavior = 'auto'
              tablistRef.current.scrollLeft = left
              tablistRef.current.style.scrollBehavior = ''
            } else {
              tablistRef.current.scrollTo({
                left,
                behavior,
              })
            }

            setIsFirst(isFirstItem)
            setIsLast(isLastItem)
          }
        } catch (e) {
          warn(e)
        }
      }

      if (globalThis.IS_TEST) {
        // Run synchronously in tests to avoid rAF timing flakiness
        delay()
      } else {
        // Delay so Chrome/Safari makes the transition / animation smooth
        window.requestAnimationFrame(delay)
      }
    },
    []
  )

  const handleVerticalScroll = () => {
    if (
      propsRef.current.scroll &&
      tablistRef.current &&
      typeof tablistRef.current.scrollIntoView === 'function'
    ) {
      tablistRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }

  const setFocusOnTabButton = useCallback(() => {
    try {
      const elem = tablistRef.current.querySelector(
        '.dnb-tabs__button.focus'
      ) as HTMLElement
      elem.focus({ preventScroll: true })

      if (
        !document.getElementById(`${_id}-content`) &&
        typeof process !== 'undefined' &&
        process.env.NODE_ENV !== 'test'
      ) {
        warn(
          `Could not find the required <Tabs.Content id="${_id}-content" ... /> that provides role="tabpanel"`
        )
      }
    } catch (e) {
      warn(e)
    }
  }, [_id])

  const getCurrentTitle = (key?: string | number) => {
    const useKey = key ?? selectedKeyRef.current
    const current = dataRef.current.filter(({ key: k }) => k == useKey)[0]
    return (current && current.title) || null
  }

  const getStepKey = (
    useKey: string | number,
    stateKey: string | number
  ) => {
    const currentData = dataRef.current.filter(({ disabled }) => !disabled)
    const currentIndex = currentData.reduce(
      (acc: number, { key }: TabDataItem, i: number) =>
        key == stateKey ? i : acc,
      -1
    )
    let nextIndex = currentIndex + Number(useKey)
    if (nextIndex < 0) {
      nextIndex = currentData.length - 1
    }
    if (nextIndex >= currentData.length) {
      nextIndex = 0
    }
    return currentData.reduce<string | number | null>(
      (acc, { key }: TabDataItem, i: number) =>
        i === nextIndex ? key : acc,
      null
    )
  }

  const getEventArgs = (args: Record<string, unknown>) => {
    const key =
      typeof args.selectedKey !== 'undefined'
        ? args.selectedKey
        : selectedKeyRef.current

    return {
      key,
      selectedKey: selectedKeyRef.current,
      focusKey: focusKeyRef.current,
      title: getCurrentTitle(key as string | number | undefined),
      ...args,
    }
  }

  const focusTab = (
    newFocusKey: string | number,
    event: React.SyntheticEvent | null = null,
    mode: string | null = null
  ) => {
    // for handling openPrevTab and openNextTab
    if (mode === 'step' && parseFloat(String(newFocusKey))) {
      newFocusKey = getStepKey(newFocusKey, focusKeyRef.current)
    }

    listenForPropChangesRef.current = false
    setFocusKey(newFocusKey)

    // setFocusOnTabButton will be called via useEffect below

    dispatchCustomElementEvent(
      { props: propsRef.current },
      'onFocus',
      getEventArgs({ event, focusKey: newFocusKey })
    )

    whatInput.specificKeys([
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'PageUp',
      'PageDown',
      'End',
      'Home',
    ])
  }

  // Focus tab button when focusKey changes
  useUpdateEffect(() => {
    setFocusOnTabButton()
  }, [focusKey])

  const openTab = (
    newSelectedKey: string | number,
    event: React.SyntheticEvent | null = null,
    mode: string | null = null
  ) => {
    // saving the position will avoid flickering if the new tab will be done by a new page load
    saveLastPosition()
    saveLastUsedTab()
    whatInput.specificKeys(['Tab'])

    // for handling openPrevTab and openNextTab
    if (mode === 'step' && parseFloat(String(newSelectedKey))) {
      newSelectedKey = getStepKey(newSelectedKey, selectedKeyRef.current)
    }

    if (typeof newSelectedKey !== 'undefined') {
      listenForPropChangesRef.current = false
      setSelectedKey(newSelectedKey)
      setFocusKey(newSelectedKey)
    }

    dispatchCustomElementEvent(
      { props: propsRef.current },
      'onChange',
      getEventArgs({ event, selectedKey: newSelectedKey })
    )

    if (
      propsRef.current.onOpenTabNavigationFn &&
      typeof window !== 'undefined'
    ) {
      try {
        propsRef.current.onOpenTabNavigationFn(newSelectedKey)
      } catch (e) {
        warn('Tabs Error:', e)
      }
    }

    if (sharedStateRef.current) {
      sharedStateRef.current.update(
        getEventArgs({ event, selectedKey: newSelectedKey })
      )
    }
  }

  // Scroll on open tab (handleVerticalScroll)
  // Use layout effect so scroll position settles before paint,
  // avoiding flicker and screenshot flakiness.
  const hasHandledVerticalScroll = useRef(false)
  useIsomorphicLayoutEffect(() => {
    if (!hasHandledVerticalScroll.current) {
      hasHandledVerticalScroll.current = true
      return
    }
    handleVerticalScroll()
  }, [selectedKey])

  const onResizeHandler = useCallback(() => {
    const scrollbarVisible = checkHasScrollbar()
    setHasScrollbar(scrollbarVisible)
    hasScrollbarRef.current = scrollbarVisible

    if (scrollbarVisible) {
      // Set button visibility state synchronously from data to avoid
      // the extra render cycle that rAF-based scrollToTab causes.
      const data = dataRef.current
      const key = selectedKeyRef.current
      if (data.length > 0) {
        setIsFirst(key === data[0].key)
        setIsLast(key === data[data.length - 1].key)
      }

      scrollToTab({ type: 'selected' })
    }
  }, [scrollToTab])

  // Synchronous shared state initialization (must happen during render, not in useEffect)
  if (ownProps.id && !sharedStateRef.current) {
    sharedStateRef.current = createSharedState(ownProps.id)
    sharedStateRef.current.set({
      key: selectedKey,
      selectedKey,
      focusKey,
      title: getCurrentTitle(selectedKey),
    })
  }

  // Init on mount / window load
  useIsomorphicLayoutEffect(() => {
    let isMounted = true

    const init = () => {
      if (isMounted && tablistRef.current) {
        const scrollbarVisible = checkHasScrollbar()
        const hasLP = lastPositionRef.current > -1

        setHasScrollbar(scrollbarVisible)
        hasScrollbarRef.current = scrollbarVisible

        if (hasLP) {
          setLeftPosition(lastPositionRef.current)
        }

        if (scrollbarVisible) {
          // Set button visibility state synchronously from data to avoid
          // the extra render cycle that rAF-based scrollToTab causes.
          const data = dataRef.current
          const key = selectedKeyRef.current
          if (data.length > 0) {
            setIsFirst(key === data[0].key)
            setIsLast(key === data[data.length - 1].key)
          }

          scrollToTab({
            type: 'selected',
            behavior: hasLP ? 'smooth' : 'auto',
          })
        }

        if (hasLastUsedTab() !== null) {
          setFocusOnTabButton()
        }
      }
    }

    if (document.readyState === 'complete') {
      init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', init)
    }

    let resizeObserver: ResizeObserver | undefined
    if (tabsRef.current && typeof ResizeObserver !== 'undefined') {
      // eslint-disable-next-line compat/compat
      resizeObserver = new ResizeObserver(onResizeHandler)
      resizeObserver.observe(tabsRef.current)
    }

    return () => {
      isMounted = false
      whatInput.specificKeys(['Tab'])
      sharedStateRef.current = null
      resizeObserver?.disconnect()
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', init)
      }
    }
    // Mount-only effect — all referenced functions either use refs for latest state
    // or are stable (useCallback with [] deps). Intentionally not re-run on updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update shared state when props change selectedKey or data
  // Only fires for prop-driven changes, matching original componentDidUpdate behavior.
  // Uses layout effect so scroll button state settles before paint.
  const hasHandledPropChange = useRef(false)
  useIsomorphicLayoutEffect(() => {
    if (!hasHandledPropChange.current) {
      hasHandledPropChange.current = true
      return
    }
    if (sharedStateRef.current && propChangeRef.current) {
      propChangeRef.current = false
      onResizeHandler()
      sharedStateRef.current.update(getEventArgs({ selectedKey }))
    }
  }, [selectedKey, data])

  // Navigation handlers
  const focusFirstTab = (e: React.KeyboardEvent) => {
    const key = dataRef.current[0].key
    focusTab(key, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  const focusLastTab = (e: React.KeyboardEvent) => {
    const d = dataRef.current
    const key = d[d.length - 1].key
    focusTab(key, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  const focusPrevTab = (e: React.KeyboardEvent) => {
    focusTab(-1, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  const focusNextTab = (e: React.KeyboardEvent) => {
    focusTab(+1, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  const openPrevTab = (e: React.MouseEvent) => {
    openTab(-1, e, 'step')
    scrollToTab({ type: 'selected' })
  }

  const openNextTab = (e: React.MouseEvent) => {
    openTab(+1, e, 'step')
    scrollToTab({ type: 'selected' })
  }

  const onTablistKeyDownHandler = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'PageUp':
      case 'ArrowLeft':
        e.preventDefault()
        focusPrevTab(e)
        break
      case 'ArrowDown':
      case 'PageDown':
      case 'ArrowRight':
        e.preventDefault()
        focusNextTab(e)
        break
      case 'Home':
        e.preventDefault()
        focusFirstTab(e)
        break
      case 'End':
        e.preventDefault()
        focusLastTab(e)
        break
    }
  }

  const getCurrentKey = (event: React.SyntheticEvent) => {
    let currentKey: string | undefined
    try {
      const elem = getClosestParent(
        'dnb-tabs__button',
        event.target as HTMLElement
      ) as HTMLElement | null
      currentKey = elem?.dataset?.tabKey
    } catch (e) {
      warn('Tabs Error:', e)
    }
    return currentKey
  }

  const onMouseEnterHandler = (event: React.SyntheticEvent) => {
    const key = getCurrentKey(event)
    if (key) {
      dispatchCustomElementEvent(
        { props: propsRef.current },
        'onMouseEnter',
        getEventArgs({ event, selectedKey: key })
      )
    }
  }

  const onClickHandler = (event: React.SyntheticEvent) => {
    const key = getCurrentKey(event)
    if (key) {
      const ret = dispatchCustomElementEvent(
        { props: propsRef.current },
        'onClick',
        getEventArgs({ event, selectedKey: key })
      )

      if (ret !== false) {
        openTab(key, event)
        scrollToTab({ type: 'selected' })
      }
    }
  }

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      try {
        const elem = document.getElementById(`${_id}-content`)
        elem.focus({ preventScroll: true })
      } catch (e) {
        warn(
          `Could not find the required <Tabs.Content id="${_id}-content" ... /> that provides role="tabpanel"`
        )
      }
    }
  }

  // Content rendering helper
  const getContent = (key: string | number) => {
    const { children, content: _content } = propsRef.current

    const contentToRender = children || _content
    let content = null

    if (contentToRender) {
      if (typeof contentToRender === 'object' && contentToRender[key]) {
        content = contentToRender[key]
      } else if (typeof contentToRender === 'function') {
        content = contentToRender(key)
      } else if (React.isValidElement(contentToRender)) {
        content = contentToRender
      }
    }

    if (!content) {
      let items = []

      if (Array.isArray(dataRef.current)) {
        items = dataRef.current
      } else if (Array.isArray(contentToRender)) {
        items = contentToRender
      }

      if (items) {
        content = items
          .filter(({ key: k }) => k && key && k == key)
          .reduce((acc, { content }) => content || acc, null)
      }
    }

    if (typeof content === 'function') {
      const Component = content
      content = <Component />
    }

    return content
  }

  // Store render functions in refs for stable sub-component wrappers
  const renderWrapperRef =
    useRef<
      (
        p: React.PropsWithChildren<Record<string, unknown>>
      ) => React.ReactElement
    >(null)
  const renderTabsListRef =
    useRef<
      (
        p: React.PropsWithChildren<
          { className?: string } & Record<string, unknown>
        >
      ) => React.ReactElement
    >(null)
  const renderContentRef = useRef<() => React.ReactElement>(null)
  const renderTabsRef =
    useRef<(p?: Record<string, unknown>) => React.ReactElement>(null)

  // Update render functions with latest state on every render
  renderWrapperRef.current = ({
    children,
    ...rest
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { className } = ownProps as TabsProps
    const { ...attributes } = filterProps(ownProps, tabsDefaultProps)

    const params: Record<string, unknown> = applySpacing(ownProps, {
      ...attributes,
      className: clsx('dnb-tabs', className),
    })

    validateDOMAttributes(ownProps, params)

    delete params.contentInnerSpace
    delete params.tabsInnerSpace

    return (
      <div {...params} {...rest}>
        {children}
      </div>
    )
  }

  renderTabsListRef.current = ({
    children,
    className: extraClassName,
    ...rest
  }: React.PropsWithChildren<
    { className?: string } & Record<string, unknown>
  >) => {
    const {
      align,
      tabsStyle,
      tabsInnerSpace,
      noBorder,
      navButtonEdge,
      breakout,
    } = propsRef.current

    return (
      <div
        className={clsx(
          'dnb-tabs__tabs',
          align ? `dnb-tabs__tabs--${align}` : null,
          tabsStyle ? `dnb-section dnb-section--${tabsStyle}` : null,
          hasScrollbarRef.current && 'dnb-tabs--has-scrollbar',
          navButtonEdge && 'dnb-tabs--at-edge',
          noBorder && 'dnb-tabs__tabs--no-border',
          breakout && 'dnb-tabs__tabs--breakout',
          extraClassName
        )}
        ref={tabsRef}
        style={
          tabsInnerSpace
            ? {
                paddingTop: `var(--spacing-${
                  tabsInnerSpace === true ? 'large' : tabsInnerSpace
                })`,
              }
            : undefined
        }
        {...rest}
      >
        <ScrollNavButton
          onMouseDown={openPrevTab}
          icon="chevron_left"
          className={clsx(
            hasScrollbarRef.current &&
              (typeof isFirstRef.current !== 'undefined' ||
                hasLastPosition()) &&
              'dnb-tabs__scroll-nav-button--visible',
            isFirstRef.current && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />

        {children}

        <ScrollNavButton
          onMouseDown={openNextTab}
          icon="chevron_right"
          className={clsx(
            hasScrollbarRef.current &&
              (typeof isLastRef.current !== 'undefined' ||
                hasLastPosition()) &&
              'dnb-tabs__scroll-nav-button--visible',
            isLastRef.current && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />
      </div>
    )
  }

  renderContentRef.current = () => {
    const { preventRerender, keepInDOM } = propsRef.current
    const currentSelectedKey = selectedKeyRef.current
    const currentData = dataRef.current

    let content
    if (preventRerender || keepInDOM) {
      // Cached content rendering
      if (keepInDOM) {
        cacheRef.current = Object.entries(currentData).reduce(
          (acc, [_idx, cur]) => {
            acc[cur.key] = {
              ...cur,
              content: getContent(cur.key),
            }
            return acc
          },
          {}
        )
      } else if (preventRerender) {
        cacheRef.current = {
          ...(cacheRef.current || {}),
          [currentSelectedKey]: {
            content: getContent(currentSelectedKey),
          },
        }
      }

      content = Object.entries(cacheRef.current).map(
        ([key, { content: cachedContent }]) => {
          const hide = key !== String(currentSelectedKey)
          return (
            <div
              key={key}
              aria-hidden={hide ? true : undefined}
              className={clsx(
                'dnb-tabs__cached',
                hide && 'dnb-tabs__cached--hidden'
              )}
            >
              {cachedContent}
            </div>
          )
        }
      )
    } else {
      content = getContent(currentSelectedKey)
    }

    if (!sharedStateRef.current && !content) {
      warn(`No content was given to the Tabs component!
Tip: Check out other solutions like <Tabs.Content id="unique">Your content, outside of the Tabs component</Tabs.Content>
`)
    }

    return (
      <ContentWrapper
        id={_id}
        selectedKey={currentSelectedKey}
        contentStyle={propsRef.current.contentStyle}
        contentInnerSpace={propsRef.current.contentInnerSpace}
        animate={propsRef.current.keepInDOM}
      >
        {content}
      </ContentWrapper>
    )
  }

  renderTabsRef.current = (extraProps: Record<string, unknown> = {}) => {
    const mergedProps = propsRef.current
    const { label, skeleton, tabElement } = {
      ...mergedProps,
      ...extraProps,
    }
    const currentData = dataRef.current
    const currentFocusKey = focusKeyRef.current
    const currentSelectedKey = selectedKeyRef.current
    const currentContext = contextRef.current

    const TabElement = tabElement || 'button'

    const tabs = currentData.map(
      ({ title, key, disabled = false, to, href }) => {
        const itemParams: Record<string, unknown> = { to, href }
        const isFocus = currentFocusKey == key
        const isSelected = currentSelectedKey == key
        if (isSelected) {
          itemParams['aria-controls'] = `${_id}-content`
        }

        if (disabled) {
          itemParams.disabled = true
          itemParams['aria-disabled'] = true
        }

        if (TabElement === 'button') {
          itemParams.type = 'button'
        }

        skeletonDOMAttributes(itemParams, skeleton, currentContext)

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
              id={`${_id}-tab-${key}`}
              aria-selected={isSelected}
              className={clsx(
                'dnb-tabs__button',
                isFocus && 'focus',
                isSelected && 'selected'
              )}
              onMouseEnter={onMouseEnterHandler}
              onClick={onClickHandler}
              onKeyUp={onKeyDownHandler}
              data-tab-key={key}
              {...itemParams}
            >
              <span
                className={clsx(
                  'dnb-tabs__button__title',
                  createSkeletonClass('font', skeleton, currentContext)
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
    if (currentSelectedKey) {
      params['aria-labelledby'] = combineLabelledBy(
        params,
        `${_id}-tab-${currentSelectedKey}`
      )
    }
    return (
      <div
        role="tablist"
        className="dnb-tabs__tabs__tablist"
        tabIndex={0}
        onKeyDown={onTablistKeyDownHandler}
        ref={tablistRef}
        {...params}
      >
        {tabs}
      </div>
    )
  }

  // Create stable sub-component wrappers that delegate to the render refs
  // This prevents React from unmounting/remounting when state changes
  const Wrapper = useMemo(() => {
    const C = (p: React.PropsWithChildren<Record<string, unknown>>) =>
      renderWrapperRef.current(p)
    C.displayName = 'TabsWrapper'
    return C
  }, [])

  const TabsList = useMemo(() => {
    const C = (
      p: React.PropsWithChildren<
        { className?: string } & Record<string, unknown>
      >
    ) => renderTabsListRef.current(p)
    C.displayName = 'TabsList'
    return C
  }, [])

  const Content = useMemo(() => {
    const C = () => renderContentRef.current()
    C.displayName = 'TabContent'
    return C
  }, [])

  const TabItems = useMemo(() => {
    const C = (p?: Record<string, unknown>) => renderTabsRef.current(p)
    C.displayName = 'Tabs'
    return C
  }, [])

  // here we reuse the component, if it has a custom renderer
  if (typeof props.render === 'function') {
    return props.render({
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

TabsComponent.displayName = 'Tabs'

type TabsWithStatics = ((props: TabsProps) => React.ReactNode) & {
  Content: typeof CustomContent
  ContentWrapper: typeof ContentWrapper
}

const Tabs = Object.assign(React.memo(TabsComponent), {
  Content: CustomContent,
  ContentWrapper: ContentWrapper,
}) as TabsWithStatics

withComponentMarkers(Tabs, { _supportsSpacingProps: true })

export default Tabs

export const Dummy = ({ children }: { children: React.ReactNode }) => {
  /**
   * This is a dummy markup, to define a width of every tab
   * We use "aria-hidden" SPAN to simulate a wider width for each tab
   * There is also a CSS to make this work. Have a look in the styles: & > span[hidden] {...}
   */
  return (
    <span aria-hidden hidden className="dnb-dummy">
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
