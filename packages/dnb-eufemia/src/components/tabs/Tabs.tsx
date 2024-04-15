/**
 * Web Tabs Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  warn,
  slugify,
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  removeInvalidAttributes,
  dispatchCustomElementEvent,
  getPreviousSibling,
  combineLabelledBy,
  findElementInChildren,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import Button, { ButtonProps } from '../button/Button'
import whatInput from 'what-input'
import CustomContent from './TabsCustomContent'
import ContentWrapper from './TabsContentWrapper'
import EventEmitter from '../../shared/helpers/EventEmitter'
import {
  TabsAllProps,
  TabsContent,
  TabsData,
  TabsDataItem,
  TabsInternalEventArgs,
  TabsInternalModes,
  TabsInternalState,
  TabsProps,
  TabsSelectedKey,
} from './types'
import { DynamicElement, DynamicElementParams } from '../../shared/types'
export * from './types'

export const defaultProps = {
  content_spacing: true,
  tab_element: 'button',
  align: 'left',
  no_border: false,
  nav_button_edge: false,
  use_hash: false,
  prerender: false,
  prevent_rerender: false,
  breakout: true,
}

export default function Tabs(localProps: TabsAllProps): JSX.Element {
  const context = React.useContext(Context)

  const props: TabsAllProps = extendPropsWithContext(
    localProps,
    defaultProps,
    {
      skeleton: context?.skeleton,
    }
  )

  const {
    id,
    selected_key,
    data,
    label,
    skeleton,
    content,
    align,
    prerender,
    scroll,
    render,
    content_style,
    content_spacing,
    ...attributes
  } = props

  const [_id] = React.useState(() => id || makeUniqueId()) // cause we need an id anyway
  const [state, updateState] = React.useState<TabsInternalState>(() => {
    const data = getData(props)
    const selected_key = getSelectedKeyOrFallback(props.selected_key, data)
    const lastPosition = getLastPosition()

    return {
      data,
      selected_key,
      focus_key: selected_key,
      atEdge: false,
      lastPosition,
      hasScrollbar: lastPosition > -1,
      isFirst: null,
      isLast: null,
    }
  })

  const _cache =
    React.useRef<Record<TabsSelectedKey, Partial<TabsDataItem>>>(null)
  const _tabsRef = React.useRef<HTMLDivElement>()
  const _tablistRef = React.useRef<HTMLDivElement>()
  const _eventEmitter = React.useRef<EventEmitter>()
  const _isMounted = React.useRef<boolean>()

  // In order to make getContent work like in a React Class Component
  const stateRef = React.useRef<TabsInternalState>(state)
  const propsRef = React.useRef<TabsProps>(props)
  propsRef.current = props

  if (id) {
    if (!_eventEmitter.current) {
      _eventEmitter.current = EventEmitter.createInstance(id)
    }
    _eventEmitter.current.set(
      getEventArgs({ selected_key: state.selected_key })
    )
  }

  React.useEffect(() => {
    _isMounted.current = true
    if (document.readyState === 'complete') {
      init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', init)
    }

    return () => {
      _isMounted.current = false
      resetWhatInput()
      if (_eventEmitter.current) {
        _eventEmitter.current.remove()
        _eventEmitter.current = null
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResizeHandler)
        window.removeEventListener('load', init)
      }
    }
  }, [])

  React.useEffect(() => {
    if (selected_key) {
      setState({ selected_key })
    }
  }, [selected_key])

  React.useEffect(() => {
    if (
      _eventEmitter.current &&
      (selected_key !== state.selected_key || data !== state.data)
    ) {
      onResizeHandler()

      const { selected_key } = props
      _eventEmitter.current.update(getEventArgs({ selected_key }))
    }
  }, [selected_key, data])

  const TabsInstance = React.useCallback(
    (localProps: TabsProps) => {
      const { label, skeleton, tab_element } = { ...props, ...localProps }
      const { selected_key } = state

      const TabElement = (tab_element || 'button') as DynamicElement

      const tabs = state.data.map(
        ({ title, key, disabled = false, to, href }) => {
          const itemParams = {
            to,
            href,
            disabled: null,
            type: null,
          } as DynamicElementParams
          const isFocus = isFocusCheck(key)
          const isSelected = isSelectedCheck(key)
          if (isSelected) {
            itemParams['aria-controls'] = `${_id}-content`
          }

          // itemParams['aria-current'] = isSelected // has best support on NVDA
          // itemParams['aria-selected'] = isSelected // has best support on VO

          if (isTrue(disabled)) {
            itemParams.disabled = true
            itemParams['aria-disabled'] = true
          }

          if (TabElement === 'button') {
            itemParams.type = 'button'
          }

          skeletonDOMAttributes(itemParams, skeleton, context)

          return (
            <div
              className={classnames(
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
                className={classnames(
                  'dnb-tabs__button',
                  isFocus && 'focus',
                  isSelected && 'selected'
                )}
                onMouseEnter={onMouseEnterHandler}
                onClick={onClickHandler}
                onMouseDown={onMouseDown}
                onKeyDown={onKeyDownHandler}
                data-tab-key={key}
                {...itemParams}
              >
                <span
                  className={classnames(
                    'dnb-tabs__button__title',
                    createSkeletonClass('font', skeleton, context)
                  )}
                >
                  {title}
                </span>
                <Dummy>{title}</Dummy>
              </TabElement>
            </div>
          )
        }
      )

      const params = {}

      if (label) {
        params['aria-label'] = label
      }
      if (selected_key) {
        params['aria-labelledby'] = combineLabelledBy(
          params,
          `${_id}-tab-${selected_key}`
        )
      }

      return (
        <div
          role="tablist"
          className="dnb-tabs__tabs__tablist"
          tabIndex={0}
          onKeyDown={onTablistKeyDownHandler}
          ref={_tablistRef}
          {...params}
        >
          {tabs}
        </div>
      )
    },
    [state.selected_key, state.focus_key]
  )

  const TabsList = React.useCallback(
    ({ children, className = null, ...rest }) => {
      const {
        align,
        tabs_style,
        tabs_spacing,
        no_border,
        nav_button_edge,
        breakout,
      } = props
      const { hasScrollbar } = state

      return (
        <div
          className={classnames(
            'dnb-tabs__tabs',
            align ? `dnb-tabs__tabs--${align}` : null,
            tabs_style ? `dnb-section dnb-section--${tabs_style}` : null,
            tabs_spacing
              ? `dnb-section--spacing-${
                  isTrue(tabs_spacing) ? 'large' : tabs_spacing
                }`
              : null,
            hasScrollbar && 'dnb-tabs--has-scrollbar',
            nav_button_edge && 'dnb-tabs--at-edge',
            no_border && 'dnb-tabs__tabs--no-border',
            breakout && 'dnb-tabs__tabs--breakout',
            className
          )}
          ref={_tabsRef}
          {...rest}
        >
          <ScrollNavButton
            onMouseDown={openPrevTab}
            icon="chevron_left"
            className={classnames(
              hasScrollbar &&
                (typeof state.isFirst !== 'undefined' ||
                  hasLastPositionCheck()) &&
                'dnb-tabs__scroll-nav-button--visible',
              state.isFirst && 'dnb-tabs__scroll-nav-button--hide'
            )}
          />

          {children}

          <ScrollNavButton
            onMouseDown={openNextTab}
            icon="chevron_right"
            className={classnames(
              hasScrollbar &&
                (typeof state.isLast !== 'undefined' ||
                  hasLastPositionCheck()) &&
                'dnb-tabs__scroll-nav-button--visible',
              state.isLast && 'dnb-tabs__scroll-nav-button--hide'
            )}
          />
        </div>
      )
    },
    [state.selected_key, state.focus_key]
  )

  const Wrapper = React.useCallback(({ children, ...rest }) => {
    const { className } = props

    const params = {
      ...attributes,
      className: classnames(
        'dnb-tabs',
        createSpacingClasses(props),
        className
      ),
    }

    removeInvalidAttributes(params)

    return (
      <div {...params} {...rest}>
        {children}
      </div>
    )
  }, [])

  const Content = React.useCallback(() => {
    const { selected_key } = stateRef.current
    const content = renderContent()

    if (!_eventEmitter.current && !content) {
      warn(`No content was given to the Tabs component!
  Tip: Check out other solutions like <Tabs.Content id="unique">Your content, outside of the Tabs component</Tabs.Content>
  `)
    }

    return (
      <ContentWrapper
        id={_id}
        selected_key={selected_key}
        content_style={content_style}
        content_spacing={content_spacing}
        animate={this.props.prerender}
      >
        {content}
      </ContentWrapper>
    )
  }, [])

  // here we reuse the component, if it has a custom renderer
  if (typeof render === 'function') {
    return render({
      Wrapper,
      Content,
      TabsList,
      Tabs: TabsInstance,
    })
  }

  return (
    <Wrapper>
      <TabsList>
        <TabsInstance />
      </TabsList>
      <Content />
    </Wrapper>
  )

  function init() {
    if (_isMounted.current) {
      addScrollBehaviour()

      const hasScrollbar = hasScrollbarCheck()
      const hasLastPosition = hasLastPositionCheck()
      setScrollbarState({ hasScrollbar })

      if (hasLastPosition) {
        setLeftPosition(state.lastPosition)
      }

      if (hasScrollbar) {
        scrollToTab({
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
      if (hasLastUsedTab()) {
        // Delay, so we ensure hasScrollbar is set
        window.requestAnimationFrame(setFocusOnTabButton)
      }
    }
  }

  function setState(changes: TabsInternalState, cb = null) {
    if (changes) {
      updateState((prev) => (stateRef.current = { ...prev, ...changes }))
    }

    if (typeof cb === 'function') {
      cb()
      // setTimeout(cb, 1)
    }
  }

  function getCurrentTitle(selected_key = state.selected_key) {
    const current = state.data?.filter(({ key }) => key == selected_key)[0]
    return current?.title || null
  }

  function getData(props: TabsProps & { tabs?: Array<TabsDataItem> }) {
    let res: TabsData = []

    // check if we have to use the children prop to prepare our data
    const data =
      !props.data && props.children ? props.children : props.data

    findElementInChildren(props.children, (cur, i) => {
      if (cur.type === CustomContent) {
        // tabs data from main prop
        const dataProps =
          (props.tabs && Array.isArray(props.tabs) && props.tabs[i]) || {}

        // props from the "CustomContent" Component
        const componentProps = { ...cur.props }
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
        } as TabsDataItem

        res.push({
          title,
          key: (!_key && hash ? hash : _key) || slugify(title),
          content: cur, // can be a Node or a Function
          ...rest,
        })
      }
    })

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
            acc.push(Object.assign({ key }, obj))
          }
          return acc
        }, [])
      }
    }

    return res || []
  }

  function getSelectedKeyOrFallback(
    selected_key: TabsSelectedKey,
    data: TabsData
  ): TabsSelectedKey {
    let useKey = selected_key

    // check if we have to open a different tab
    if (props.use_hash && typeof window !== 'undefined') {
      try {
        const useHashKey = String(window.location.hash).replace('#', '')
        if (useHashKey && String(useHashKey).length > 0) {
          useKey = useHashKey
        }
      } catch (e) {
        // do nothing
      }
    }

    // 1. if selected_key is null/undefined then try to get it from data
    if (!useKey) {
      useKey = (data.reduce(
        (acc, { selected, key }) => (selected ? key : acc),
        null
      ) || data[0]?.key) as TabsSelectedKey
    } else {
      // 2. check if the key is valid
      // just to make sure we never get an empty content
      const keyExists = data.findIndex(({ key }) => key == selected_key)
      if (keyExists === -1) {
        // key did not exists, so we get the first one
        useKey = data[0]?.key
      }
    }

    return useKey
  }

  function hasLastPositionCheck() {
    return state.lastPosition > -1
  }

  function getLastPosition() {
    if (typeof window !== 'undefined') {
      try {
        const pos = parseFloat(
          window.sessionStorage.getItem(`tabs-pos-${_id}`)
        )
        window.sessionStorage.removeItem(`tabs-pos-${_id}`)
        return isNaN(pos) ? -1 : pos
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  function hasLastUsedTab() {
    if (typeof window !== 'undefined') {
      try {
        const has = Boolean(
          window.sessionStorage.getItem(`tabs-last-${_id}`)
        )
        window.sessionStorage.removeItem(`tabs-last-${_id}`)
        return has
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  function saveLastUsedTab() {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(
          `tabs-last-${_id}`,
          String(state.selected_key)
        ) // gets removed right afterwards
      } catch (e) {
        warn(e)
      }
    }
  }

  function saveLastPosition(position = _tablistRef.current.scrollLeft) {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(`tabs-pos-${_id}`, String(position)) // gets removed right afterwards
      } catch (e) {
        warn(e)
      }
    }
  }

  function setScrollbarState({ hasScrollbar = hasScrollbarCheck() } = {}) {
    if (hasScrollbar !== state.hasScrollbar) {
      setState({
        hasScrollbar,
      })
    }
  }

  function onResizeHandler() {
    const hasScrollbar = hasScrollbarCheck()
    setScrollbarState({ hasScrollbar })

    // ensure that we scroll to the "active" item
    if (hasScrollbar) {
      scrollToTab({ type: 'selected' })
    }
  }

  function hasScrollbarCheck(): TabsInternalState['hasScrollbar'] {
    return (
      /**
       * Safari Desktop adds one pixel "on zoom" level 1
       * therefore we just remove it here
       */
      _tablistRef.current?.scrollWidth - 1 >
      _tablistRef.current?.offsetWidth
    )
  }

  function addScrollBehaviour() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResizeHandler)
    }
  }

  function onTablistKeyDownHandler(e: React.KeyboardEvent) {
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

  function focusFirstTab(e: React.KeyboardEvent) {
    const key = state.data[0].key
    focusTab(key, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  function focusLastTab(e: React.KeyboardEvent) {
    const key = state.data[state.data.length - 1].key
    focusTab(key, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  function focusPrevTab(e: React.KeyboardEvent) {
    focusTab(-1, e, 'step')
    scrollToTab({ type: 'focus' })
  }
  function focusNextTab(e: React.KeyboardEvent) {
    focusTab(+1, e, 'step')
    scrollToTab({ type: 'focus' })
  }

  function openPrevTab(e: React.MouseEvent) {
    openTab(-1, e, 'step')
    scrollToTab({ type: 'selected' })
  }
  function openNextTab(e: React.MouseEvent) {
    openTab(+1, e, 'step')
    scrollToTab({ type: 'selected' })
  }

  function handleVerticalScroll() {
    if (
      isTrue(props.scroll) &&
      typeof _tablistRef.current?.scrollIntoView === 'function'
    ) {
      _tablistRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }

  function setLeftPosition(scrollLeft: TabsInternalState['lastPosition']) {
    try {
      _tablistRef.current.style.scrollBehavior = 'auto'
      _tablistRef.current.scrollLeft = scrollLeft
      _tablistRef.current.style.scrollBehavior = 'smooth'
    } catch (e) {
      //
    }
  }

  function scrollToTab({
    type,
    behavior = 'smooth',
  }: {
    type: TabsSelectedKey
    behavior?: ScrollBehavior
  }) {
    if (typeof window === 'undefined') {
      return // stop here
    }

    if (globalThis.IS_TEST) {
      behavior = 'auto'
    }

    const delay = () => {
      try {
        if (state.hasScrollbar && _tablistRef.current) {
          const first = _tablistRef.current.querySelector(
            '.dnb-tabs__button__snap:first-of-type'
          )
          const isFirst = first.classList.contains(String(type))
          const last = _tablistRef.current.querySelector(
            '.dnb-tabs__button__snap:last-of-type'
          )
          const isLast = last.classList.contains(String(type))
          const elem = _tablistRef.current.querySelector(
            `.dnb-tabs__button.${String(type)}`
          ) as HTMLButtonElement

          const style = window.getComputedStyle(_tabsRef.current)
          const margin = parseFloat(style.marginLeft)
          let padding = margin < 0 ? parseFloat(style.paddingLeft) : 0

          // Add the extra padding when we go from 1 to 2 tab so the nav button
          if (!isFirst && !isLast && parseFloat(style.paddingLeft) < 16) {
            const navButton = _tabsRef.current.querySelector(
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
          const offsetLeft = elem.offsetLeft

          const left = elem && !isFirst ? offsetLeft - leftPadding : 0

          if (behavior === 'auto') {
            _tablistRef.current.style.scrollBehavior = 'auto'
          }

          if (typeof _tablistRef.current.scrollTo === 'function') {
            _tablistRef.current.scrollTo({
              left,
              behavior,
            })
          }

          if (behavior === 'auto') {
            _tablistRef.current.style.scrollBehavior = ''
          }

          setState({
            isFirst,
            isLast,
          })
        }
      } catch (e) {
        warn(e)
      }
    }

    if (globalThis.IS_TEST) {
      delay()
    } else {
      // Delay so Chrome/Safari makes the transition / animation smooth
      window.requestAnimationFrame(delay)
    }
  }

  function onMouseDown(event: React.MouseEvent) {
    // once we press with mouse, the focus makes the scroll view move
    // in order to enhance UX, we prevent that and only allow a real click
    event.preventDefault()
  }

  function onKeyDownHandler(event: React.KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        try {
          window.requestAnimationFrame(() => {
            const elem = document.getElementById(`${_id}-content`)
            elem?.focus({ preventScroll: true })
          })
        } catch (e) {
          warnAboutMissingContainer()
        }
        break
    }
  }

  function onMouseEnterHandler(event: React.MouseEvent) {
    const selected_key = getCurrentKey(event)
    if (selected_key) {
      dispatchCustomElementEvent(
        props,
        'on_mouse_enter',
        getEventArgs({ event, selected_key })
      )
    }
  }

  function onClickHandler(event: React.MouseEvent) {
    const selected_key = getCurrentKey(event)
    if (selected_key) {
      const ret = dispatchCustomElementEvent(
        props,
        'on_click',
        getEventArgs({ event, selected_key })
      )

      if (ret !== false) {
        openTab(selected_key, event)
        scrollToTab({ type: 'selected' })
      }
    }
  }

  function getCurrentKey(event: React.MouseEvent) {
    let selected_key: TabsSelectedKey

    try {
      const element = (function (elem) {
        return (
          getPreviousSibling('dnb-tabs__button', elem) || { dataset: {} }
        )
      })(event.target as HTMLElement) as HTMLElement

      selected_key = element.dataset.tabKey
    } catch (e) {
      warn('Tabs Error:', e)
    }

    return selected_key
  }

  function getStepKey(useKey: number, stateKey: TabsSelectedKey) {
    const currentData = state.data.filter(({ disabled }) => !disabled)
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
    ) as TabsSelectedKey
  }

  function focusTab(
    focusKey: TabsSelectedKey,
    event: React.KeyboardEvent = null,
    mode: TabsInternalModes = null
  ) {
    let focus_key = String(focusKey) as TabsSelectedKey

    // for handling openPrevTab and openNextTab
    if (mode === 'step' && !isNaN(parseFloat(String(focusKey)))) {
      focus_key = getStepKey(parseFloat(String(focusKey)), state.focus_key)
    }

    setState({
      focus_key,
    })

    // Delay, so we ensure hasScrollbar is set
    window.requestAnimationFrame(setFocusOnTabButton)

    dispatchCustomElementEvent(
      props,
      'on_focus',
      getEventArgs({ event, focus_key })
    )

    setWhatInput()
  }

  function setWhatInput() {
    whatInput.specificKeys([9, 37, 39, 33, 34, 35, 36])
  }

  function resetWhatInput() {
    whatInput.specificKeys([9])
  }

  function setFocusOnTabButton() {
    try {
      const elem = _tablistRef.current?.querySelector(
        '.dnb-tabs__button.focus'
      ) as HTMLElement
      elem?.focus({ preventScroll: true })

      if (
        !document.getElementById(`${_id}-content`) &&
        typeof process !== 'undefined' &&
        process.env.NODE_ENV !== 'test'
      ) {
        warnAboutMissingContainer()
      }
    } catch (e) {
      warn(e)
    }
  }

  function warnAboutMissingContainer() {
    warn(
      `Could not find the required <Tabs.Content id="${_id}-content" ... /> that provides role="tabpanel"`
    )
  }

  function openTab(
    selectedKey: TabsSelectedKey,
    event: React.MouseEvent | React.KeyboardEvent = null,
    mode: TabsInternalModes = null
  ) {
    // saving the position will avoid flickering if the new tab will be done by a new page load
    saveLastPosition()
    saveLastUsedTab()
    resetWhatInput()

    let selected_key = String(selectedKey) as TabsSelectedKey

    // for handling openPrevTab and openNextTab
    if (mode === 'step' && !isNaN(parseFloat(String(selectedKey)))) {
      selected_key = getStepKey(
        parseFloat(String(selectedKey)),
        state.selected_key
      )
    }

    if (typeof selected_key !== 'undefined') {
      setState(
        {
          selected_key,
          focus_key: selected_key,
        },
        handleVerticalScroll
      )
    }

    dispatchCustomElementEvent(
      props,
      'on_change',
      getEventArgs({ event, selected_key })
    )

    if (props.use_hash && typeof window !== 'undefined') {
      try {
        window.history.replaceState(
          undefined,
          undefined,
          `#${selected_key}`
        )
      } catch (e) {
        warn('Tabs Error:', e)
      }
    }

    if (_eventEmitter.current) {
      _eventEmitter.current.update(getEventArgs({ event, selected_key }))
    }
  }

  function getEventArgs(
    args: TabsInternalEventArgs
  ): TabsInternalEventArgs {
    const { selected_key, focus_key } = state
    const key =
      typeof args.selected_key !== 'undefined'
        ? args.selected_key
        : selected_key

    return {
      key,
      selected_key,
      focus_key,
      title: getCurrentTitle(key),
      ...args,
    }
  }

  function isFocusCheck(tabKey: TabsSelectedKey) {
    return state.focus_key == tabKey
  }
  function isSelectedCheck(tabKey: TabsSelectedKey) {
    return state.selected_key == tabKey
  }

  function renderContent() {
    const { selected_key } = stateRef.current
    const { prevent_rerender, prerender } = props

    if (isTrue(prevent_rerender) || isTrue(prerender)) {
      return renderCachedContent(selected_key)
    }

    return getContent(selected_key)
  }

  function renderCachedContent(selected_key: TabsSelectedKey) {
    const { data } = stateRef.current
    const { prevent_rerender, prerender } = props

    if (isTrue(prerender)) {
      _cache.current = Object.entries(data).reduce((acc, [_, cur]) => {
        acc[cur.key] = {
          ...cur,
          content: getContent(cur.key),
        }
        return acc
      }, {})
    } else if (isTrue(prevent_rerender)) {
      _cache.current = {
        ...(_cache.current || null),
        [selected_key]: { content: getContent(selected_key) },
      }
    }

    const cachedContent = Object.entries(_cache.current).map(
      ([key, data]) => {
        const hide = key !== String(selected_key)
        const content = data?.content as React.ReactNode
        return (
          <div
            key={key}
            aria-hidden={hide ? true : undefined}
            className={classnames(
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

  function getContent(selected_key: TabsSelectedKey): React.ReactNode {
    const { data } = stateRef.current
    const { children, content: _content } = propsRef.current

    const contentToRender = (children || _content) as
      | TabsContent
      | (() => void)

    let content = null

    if (contentToRender) {
      if (
        typeof contentToRender === 'object' &&
        contentToRender[selected_key]
      ) {
        // if content is provided as an object
        content = contentToRender[selected_key]
      } else if (typeof contentToRender === 'function') {
        // if content is provided as a render prop
        content = contentToRender.apply(this, [selected_key])
      } else if (React.isValidElement(contentToRender)) {
        content = contentToRender
      }
    }

    // check of the content is provided in the "data" part instead
    if (!content) {
      let items = []

      if (Array.isArray(data)) {
        items = data
      } else if (Array.isArray(contentToRender)) {
        items = contentToRender
      }

      // if content was provided as a React Component like "Tabs.Content"
      // - or the content was provided as a content prop i data
      if (items) {
        content = items
          .filter(({ key }) => key && selected_key && key == selected_key) // like isSelected
          .reduce((acc, { content }) => content || acc, null)
      }
    }

    if (typeof content === 'function') {
      const Component = content
      content = <Component />
    }

    return content
  }
}

Tabs.Content = CustomContent
Tabs.ContentWrapper = ContentWrapper

export function Dummy({ children }) {
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

function ScrollNavButton(props: ButtonProps) {
  return (
    <Button
      size="medium"
      variant="primary"
      tabIndex={-1}
      bounding
      aria-hidden
      {...props}
      className={classnames(
        'dnb-tabs__scroll-nav-button',
        props.className
      )}
    />
  )
}

Tabs._supportsSpacingProps = true
