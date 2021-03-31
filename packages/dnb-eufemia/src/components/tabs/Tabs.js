/**
 * Web Tabs Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import Context from '../../shared/Context'
import {
  warn,
  slugify,
  isTrue,
  makeUniqueId,
  registerElement,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  getPreviousSibling,
  filterProps
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes
} from '../skeleton/SkeletonHelper'
import Button from '../button/Button'
import whatInput from 'what-input'
import CustomContent from './TabsCustomContent'
import ContentWrapper from './TabsContentWrapper'
import TabsController from './TabsController'

export default class Tabs extends React.PureComponent {
  static tagName = 'dnb-tabs'
  static contextType = Context

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.func
          ]).isRequired,
          key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          selected: PropTypes.bool,
          disabled: PropTypes.bool
        })
      ),
      PropTypes.objectOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          selected: PropTypes.bool,
          disabled: PropTypes.bool
        })
      )
    ]),
    content: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func
    ]),
    content_style: PropTypes.string,
    content_spacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    label: PropTypes.string,
    selected_key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    tabs_style: PropTypes.string,
    tabs_spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    use_hash: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_rerender: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    scroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func
    ]),

    render: PropTypes.func,
    on_change: PropTypes.func,
    on_click: PropTypes.func,
    on_focus: PropTypes.func
  }

  static defaultProps = {
    data: null,
    content: null,
    content_style: null,
    content_spacing: true,
    label: null,
    selected_key: null,
    align: 'left',
    tabs_style: null,
    tabs_spacing: null,
    use_hash: false,
    prerender: false,
    prevent_rerender: false,
    scroll: null,
    skeleton: null,
    id: null,
    class: null,

    className: null,
    children: null,
    render: null,
    on_change: null,
    on_click: null,
    on_focus: null
  }

  static Content = CustomContent
  static ContentWrapper = ContentWrapper

  static enableWebComponent() {
    registerElement(Tabs.tagName, Tabs, Tabs.defaultProps)
  }

  static getSelectedKeyOrFallback(selected_key, data) {
    let useKey = selected_key

    // 1. if selected_key is null/undefined then try to get it from data
    if (!useKey) {
      useKey =
        data.reduce(
          (acc, { selected, key }) => (selected ? key : acc),
          null
        ) ||
        (data[0] && data[0].key)
    } else {
      // 2. check if the key is valid
      // just to make sure we never get an empty content
      const keyExists = data.findIndex(({ key }) => key == selected_key)
      if (keyExists === -1) {
        // key did not exists, so we get the first one
        useKey = data[0] && data[0].key
      }
    }

    return useKey
  }

  static getDerivedStateFromProps(props, state) {
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
      if (
        props.selected_key &&
        state._selected_key !== props.selected_key
      ) {
        state.selected_key = state._selected_key = Tabs.getSelectedKeyOrFallback(
          props.selected_key,
          state.data
        )
      }
    }
    state._listenForPropChanges = true
    return state
  }

  static getData(props) {
    let res = []

    // check if we have to use the children prop to prepare our data
    const data =
      !props.data && props.children ? props.children : props.data

    // if it is a React Component - collect data from Tabs.Content component
    if (
      Array.isArray(props.children) &&
      (typeof props.children[0] === 'function' ||
        React.isValidElement(props.children[0]))
    ) {
      res = props.children.reduce((acc, content, i) => {
        if (
          content.props &&
          content.props.displayName === 'CustomContent' // we use this solution, as Component.displayName
        ) {
          // tabs data from main prop
          const dataProps =
            (props.tabs && Array.isArray(props.tabs) && props.tabs[i]) ||
            {}

          // props from the "CustomContent" Component
          const componentProps = { ...content.props }
          if (componentProps.title === null) {
            delete componentProps.title
          }

          const { title, key: _key, hash, ...rest } = {
            ...dataProps,
            ...componentProps,
            ...{ children: null } // remove children, if there is some
          }

          acc.push({
            title,
            key: (!_key && hash ? hash : _key) || slugify(title),
            content, // can be a Node or a Function
            ...rest
          })
        }
        return acc
      }, [])
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
              ...obj
            })
          }
          return acc
        }, [])
      }
    }

    return res || []
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway
    const data = Tabs.getData(props)

    let selected_key = Tabs.getSelectedKeyOrFallback(
      props.selected_key,
      data
    )

    // check if we have to open a diffrent tab
    if (props.use_hash && typeof window !== 'undefined') {
      try {
        const useHashKey = String(window.location.hash).replace('#', '')
        if (useHashKey && String(useHashKey).length > 0) {
          selected_key = Tabs.getSelectedKeyOrFallback(useHashKey, data)
        }
      } catch (e) {
        // do nothing
      }
    }

    const lastPosition = this.getLastPosition()
    this.state = {
      data,
      lastPosition,
      selected_key,
      focus_key: selected_key,
      atEdge: false,
      hasScrollbar: lastPosition > -1,
      _selected_key: selected_key,
      _data: props.data || props.children,
      _listenForPropChanges: true
    }

    this._tabsRef = React.createRef()
    this._tablistRef = React.createRef()

    if (props.id) {
      this._controller = TabsController.use(props.id)
      this._controller.set({ key: selected_key })
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
    if (this._controller) {
      this._controller.remove()
      this._controller = null
    }
    clearTimeout(this._scrollToTabTimeout)
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResizeHandler)
      window.removeEventListener('load', this.init)
    }
  }

  init = () => {
    if (this._isMounted) {
      this.addScrollBehaviour()
      this.scrollToLastPosition()
      this.scrollToTab('selected')

      if (this.getLastUsedTab() !== null) {
        this.setState(null, this.setFocusOnTab)
      }
    }
  }

  componentDidUpdate(props) {
    this.onResizeHandler()

    if (
      this._controller &&
      this.props.selected_key !== props.selected_key
    ) {
      this._controller.update({ key: this.state.selected_key })
    }
  }

  getLastPosition() {
    if (typeof window !== 'undefined') {
      try {
        const pos =
          parseFloat(window.localStorage.getItem('tmp-tabs-pos')) || -1
        window.localStorage.removeItem('tmp-tabs-pos')
        return pos
      } catch (e) {
        warn(e)
      }
    }
    return -1
  }

  getLastUsedTab() {
    if (typeof window !== 'undefined') {
      try {
        const key = window.localStorage.getItem('tmp-tabs-last') || null
        window.localStorage.removeItem('tmp-tabs-last')
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
          'tmp-tabs-last',
          this.state.selected_key
        ) // gets removed right afterwards
      } catch (e) {
        warn(e)
      }
    }
  }

  saveLastPosition(pos = this._tablistRef.current.scrollLeft) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('tmp-tabs-pos', pos) // gets removed right afterwards
      } catch (e) {
        warn(e)
      }
    }
  }

  onResizeHandler = () => {
    const hasScrollbar = (this._hasScrollbar = this.hasScrollbar())
    if (hasScrollbar !== this.state.hasScrollbar) {
      this.setState({
        hasScrollbar
      })
    }

    if (this._hasScrollbar) {
      try {
        if (Math.ceil(window.innerWidth / 16) <= 40 || this.isAtEdge()) {
          if (!this._tabsRef.current.style.marginLeft) {
            const style = window.getComputedStyle(this._tabsRef.current)

            if (!(Math.abs(parseFloat(style.marginLeft)) > 0)) {
              const diff =
                window.innerWidth - this._tabsRef.current.offsetWidth
              let val = (Math.round(diff / 16) / 2) * 16
              this._tabsRef.current.style.marginLeft = `-${val}px`
              this._tabsRef.current.style.marginRight = `-${val}px`
              if (val < 32) {
                val = 32
              }
              this._tablistRef.current.style.paddingLeft = `${val}px`
              this._tablistRef.current.style.paddingRight = `${val}px`
            }
          }
        } else {
          this._tabsRef.current.style.marginLeft = ''
          this._tabsRef.current.style.marginRight = ''
          this._tablistRef.current.style.paddingLeft = ''
          this._tablistRef.current.style.paddingRight = ''
        }
      } catch (e) {
        //
      }
    }

    this.setState({
      atEdge: this.isAtEdge()
    })

    // ensure that we scroll to the active item
    if (hasScrollbar) {
      this.scrollToTab('selected')
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

  isAtEdge() {
    if (!this._hasScrollbar || typeof window === 'undefined') {
      return false
    }

    try {
      const padding = parseFloat(
        window.getComputedStyle(this._tablistRef.current).paddingLeft
      )
      /**
       * 2 for border correction to ensure we do that
       * + 64 for the buttons (2x2rem)
       */
      const width = this._tablistRef.current.offsetWidth + 2 + 64 - padding
      const screenWidth = window.innerWidth

      return width >= screenWidth
    } catch (e) {
      //
    }

    return false
  }

  addScrollBehaviour() {
    this.onResizeHandler()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResizeHandler)
    }
  }

  onTablistKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'up':
      case 'page up':
      case 'left':
        e.preventDefault()
        this.focusPrevTab(e)
        break
      case 'down':
      case 'page down':
      case 'right':
        e.preventDefault()
        this.focusNextTab(e)
        break
      case 'home':
        e.preventDefault()
        this.focusFirstTab(e)
        break
      case 'end':
        e.preventDefault()
        this.focusLastTab(e)
        break
    }
  }

  focusFirstTab = (e) => {
    const key = this.state.data[0].key
    this.focusTab(key, e, 'step')
    this.scrollToTab('focus')
  }

  focusLastTab = (e) => {
    const key = this.state.data[this.state.data.length - 1].key
    this.focusTab(key, e, 'step')
    this.scrollToTab('focus')
  }

  focusPrevTab = (e) => {
    this.focusTab(-1, e, 'step')
    this.scrollToTab('focus')
  }
  focusNextTab = (e) => {
    this.focusTab(+1, e, 'step')
    this.scrollToTab('focus')
  }

  openPrevTab = (e) => {
    this.openTab(-1, e, 'step')
    this.scrollToTab('selected')
  }
  openNextTab = (e) => {
    this.openTab(+1, e, 'step')
    this.scrollToTab('selected')
  }

  handleVerticalScroll = () => {
    if (
      isTrue(this.props.scroll) &&
      this._tablistRef.current &&
      typeof this._tablistRef.current.scrollIntoView === 'function'
    ) {
      this._tablistRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }

  scrollToLastPosition() {
    try {
      this._tablistRef.current.style.scrollBehavior = 'auto'
      this._tablistRef.current.scrollLeft = this.state.lastPosition
      this._tablistRef.current.style.scrollBehavior = 'smooth'
    } catch (e) {
      //
    }
  }

  scrollToTab(type) {
    if (typeof window === 'undefined') {
      return // stop here
    }
    clearTimeout(this._scrollToTabTimeout)
    this._scrollToTabTimeout = setTimeout(
      () => {
        try {
          if (
            (this._hasScrollbar || this.state.hasScrollbar) &&
            this._tablistRef.current
          ) {
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

            if (
              !isFirst &&
              this.state.atEdge &&
              parseFloat(style.paddingLeft) < 16
            ) {
              const navButton = this._tabsRef.current.querySelector(
                '.dnb-tabs__scroll-nav-button:first-of-type'
              )
              padding = parseFloat(
                window.getComputedStyle(navButton).width
              )
            }

            const leftPadding =
              (margin < 0 ? Math.abs(margin) : 0) +
              padding +
              parseFloat(window.getComputedStyle(first).paddingLeft)

            const left =
              elem && !isFirst ? elem.offsetLeft - leftPadding : 0

            this._tablistRef.current.scrollTo({
              left,
              behavior: window.IS_TEST ? 'auto' : 'smooth'
            })

            this.setState({
              isFirst,
              isLast
            })
          }
        } catch (e) {
          warn(e)
        }
      },
      window.IS_TEST ? 0 : 100
    ) // Delay so Chrome/Safari makes the transition / animation smooth
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        try {
          const elem = document.getElementById(`${this._id}-content`)
          elem.focus()
        } catch (e) {
          warn(e)
        }
        break
    }
  }

  onClickHandler = (event) => {
    let selected_key
    try {
      selected_key = (function (elem) {
        return (
          getPreviousSibling('dnb-tabs__button', elem) || { dataset: {} }
        )
      })(event.target).dataset.tabKey
    } catch (e) {
      warn('Tabs Error:', e)
    }

    if (selected_key) {
      const ret = dispatchCustomElementEvent(
        this,
        'on_click',
        this.getEventArgs({ event, selected_key })
      )

      if (ret !== false) {
        this.openTab(selected_key, event)
        this.scrollToTab('selected')
      }
    }
  }

  getCurrentTitle = () => {
    const { selected_key } = this.state
    const current = this.state.data.filter(
      ({ key }) => key == selected_key
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

  focusTab = (focus_key, event = null, mode = null) => {
    // for handling openPrevTab and openNextTab
    if (mode === 'step' && parseFloat(focus_key)) {
      focus_key = this.getStepKey(focus_key, this.state.focus_key)
    }

    this.setState(
      {
        focus_key,
        _listenForPropChanges: false
      },
      this.setFocusOnTab
    )

    dispatchCustomElementEvent(
      this,
      'on_focus',
      this.getEventArgs({ event, focus_key })
    )

    this.setWhatInput()
  }

  setWhatInput() {
    whatInput.specificKeys([9, 37, 39, 33, 34, 35, 36])
  }

  resetWhatInput() {
    whatInput.specificKeys([9])
  }

  setFocusOnTab = () => {
    try {
      const elem = this._tablistRef.current.querySelector(
        '.dnb-tabs__button.focus'
      )
      elem.focus()

      if (
        !document.getElementById(`${this._id}-content`) &&
        typeof process !== 'undefined' &&
        process.env.NODE_ENV !== 'test'
      ) {
        warn(
          `Could not find the required <Tabs.Content id="${this._id}-content" ... /> that provides role="tabpanel"`
        )
      }
    } catch (e) {
      warn(e)
    }
  }

  openTab = (selected_key, event = null, mode = null) => {
    // saving the position will avoid flickering if the new tab will be done by a new page load
    this.saveLastPosition()
    this.saveLastUsedTab()
    this.resetWhatInput()

    // for handling openPrevTab and openNextTab
    if (mode === 'step' && parseFloat(selected_key)) {
      selected_key = this.getStepKey(selected_key, this.state.selected_key)
    }

    if (typeof selected_key !== 'undefined') {
      this.setState(
        {
          selected_key,
          focus_key: selected_key,
          _listenForPropChanges: false
        },
        this.handleVerticalScroll
      )
    }

    dispatchCustomElementEvent(
      this,
      'on_change',
      this.getEventArgs({ event, selected_key })
    )

    if (this.props.use_hash && typeof window !== 'undefined') {
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

    if (this._controller) {
      this._controller.update({ key: selected_key })
    }
  }

  getEventArgs(args) {
    const { selected_key, focus_key } = this.state
    return {
      key:
        typeof args.selected_key !== 'undefined'
          ? args.selected_key
          : selected_key,
      selected_key,
      focus_key,
      ...args
    }
  }

  isFocus(tabKey) {
    return this.state.focus_key == tabKey
  }
  isSelected(tabKey) {
    return this.state.selected_key == tabKey
  }

  renderCachedContent() {
    const { selected_key, data } = this.state
    const { prevent_rerender, prerender } = this.props

    if (isTrue(prerender)) {
      this._cache = Object.entries(data).reduce(
        /* eslint-disable-next-line */
        (acc, [idx, cur]) => {
          acc[cur.key] = {
            ...cur,
            content: this.getContent(cur.key)
          }
          return acc
        },
        {}
      )
    } else if (isTrue(prevent_rerender)) {
      this._cache = {
        ...(this._cache || {}),
        [selected_key]: { content: this.getContent(selected_key) }
      }
    }

    const cachedContent = Object.entries(this._cache).map(
      ([key, { content }]) => {
        const params = {}
        if (key !== String(selected_key)) {
          params.hidden = true
          params['aria-hidden'] = true
        }
        return (
          <div key={key} className="dnb-tabs__cached" {...params}>
            {content}
          </div>
        )
      }
    )

    return cachedContent
  }

  renderContent() {
    const { prevent_rerender, prerender } = this.props

    if (isTrue(prevent_rerender) || isTrue(prerender)) {
      return this.renderCachedContent()
    }

    return this.getContent(this.state.selected_key)
  }

  getContent = (selected_key) => {
    const { children, content: _content } = this.props

    const contentToRender = children || _content

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

      if (Array.isArray(this.state.data)) {
        items = this.state.data
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

  TabsWrapperHandler = ({ children, ...rest }) => {
    const { className, class: _className } = this.props
    const { ...attributes } = filterProps(this.props, Tabs.defaultProps)

    const params = {
      ...attributes,
      className: classnames(
        'dnb-tabs',
        createSpacingClasses(this.props),
        className,
        _className
      )
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params} {...rest}>
        {children}
      </div>
    )
  }

  TabsListHandler = ({ children, className }) => {
    const { align, tabs_style, tabs_spacing } = this.props
    const { hasScrollbar, atEdge } = this.state

    return (
      <div
        className={classnames(
          'dnb-tabs__tabs',
          align ? `dnb-tabs__tabs--${align}` : null,
          tabs_style ? `dnb-section dnb-section--${tabs_style}` : null,
          tabs_spacing
            ? `dnb-section--spacing-${
                isTrue(tabs_spacing) ? 'default' : tabs_spacing
              }`
            : null,
          hasScrollbar && 'dnb-tabs--has-scrollbar',
          atEdge && 'dnb-tabs--at-edge',
          className
        )}
        ref={this._tabsRef}
      >
        <ScrollNavButton
          onMouseDown={this.openPrevTab}
          icon="chevron_left"
          className={classnames(
            hasScrollbar && 'dnb-tabs__scroll-nav-button--visible',
            this.state.isFirst && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />
        {children}
        <ScrollNavButton
          onMouseDown={this.openNextTab}
          icon="chevron_right"
          className={classnames(
            hasScrollbar && 'dnb-tabs__scroll-nav-button--visible',
            this.state.isLast && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />
      </div>
    )
  }

  TabContentHandler = () => {
    const { selected_key } = this.state

    const content = this.renderContent()

    if (!this._controller && !content) {
      warn(`No content was given to the Tabs component!
Tip: Check out other solutions like <Tabs.Content id="unique">Your content, outside of the Tabs component</Tabs.Content>
`)
    }

    return (
      <ContentWrapper
        id={this._id}
        selected_key={selected_key}
        content_style={this.props.content_style}
        content_spacing={this.props.content_spacing}
      >
        {content}
      </ContentWrapper>
    )
  }

  TabsHandler = () => {
    const { label, skeleton } = this._props
    const { selected_key } = this.state

    const tabs = this.state.data.map(
      ({ title, key, disabled = false }) => {
        const itemParams = {}
        const isFocus = this.isFocus(key)
        const isSelected = this.isSelected(key)
        if (isSelected) {
          itemParams['aria-controls'] = `${this._id}-content`
        }

        // itemParams['aria-current'] = isSelected // has best support on NVDA
        // itemParams['aria-selected'] = isSelected // has best support on VO

        if (isTrue(disabled)) {
          itemParams.disabled = true
          itemParams['aria-disabled'] = true
        }

        skeletonDOMAttributes(itemParams, skeleton, this.context)

        return (
          <div
            className={classnames(
              'dnb-tabs__button__snap',
              isFocus && 'focus',
              isSelected && 'selected'
            )}
            key={`tab-${key}`}
          >
            <button
              type="button"
              role="tab"
              tabIndex="-1"
              id={`${this._id}-tab-${key}`}
              aria-selected={isSelected}
              className={classnames(
                'dnb-tabs__button',
                isFocus && 'focus',
                isSelected && 'selected'
              )}
              onClick={this.onClickHandler}
              onKeyUp={this.onKeyDownHandler}
              data-tab-key={key}
              {...itemParams}
            >
              <span
                className={classnames(
                  'dnb-tabs__button__title',
                  createSkeletonClass('font', skeleton, this.context)
                )}
              >
                {title}
              </span>
              <Dummy>{title}</Dummy>
            </button>
          </div>
        )
      }
    )

    const params = {}
    if (label) {
      params['aria-label'] = label
    }
    if (selected_key) {
      params['aria-labelledby'] = `${this._id}-tab-${selected_key}`
    }
    return (
      <div
        role="tablist"
        className="dnb-tabs__tabs__tablist"
        tabIndex="0"
        onKeyDown={this.onTablistKeyDownHandler}
        ref={this._tablistRef}
        {...params}
      >
        {tabs}
      </div>
    )
  }

  render() {
    const props = (this._props = extendPropsWithContext(
      this.props,
      Tabs.defaultProps,
      { skeleton: this.context?.skeleton }
    ))

    const { render: customRenderer } = props

    const TabItems = this.TabsHandler
    TabItems.displayName = 'Tabs'

    const TabsList = this.TabsListHandler
    TabsList.displayName = 'TabsList'

    const Wrapper = this.TabsWrapperHandler
    Wrapper.displayName = 'TabsWrapper'

    const Content = this.TabContentHandler
    Content.displayName = 'TabContent'

    // here we reuse the component, if it has a custom renderer
    if (typeof customRenderer === 'function') {
      return customRenderer({
        Wrapper,
        Content,
        TabsList,
        Tabs: TabItems
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

export const Dummy = ({ children }) => {
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
      // role="textbox" // methodes to try to make NVDA not read blank
      // aria-readonly // methodes to try to make NVDA not read blank
    >
      {children}
    </span>
  )
}
Dummy.propTypes = {
  children: PropTypes.node.isRequired
}

const ScrollNavButton = (props) => {
  return (
    <Button
      size="medium"
      variant="primary"
      tabIndex="-1"
      bounding
      aria-hidden
      icon_size="medium"
      {...props}
      className={classnames(
        'dnb-tabs__scroll-nav-button',
        props.className
      )}
    />
  )
}
ScrollNavButton.propTypes = {
  className: PropTypes.node.isRequired
}
