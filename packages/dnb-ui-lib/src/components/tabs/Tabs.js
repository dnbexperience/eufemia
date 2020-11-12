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
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes
} from '../skeleton/SkeletonHelper'
import Button from '../button/Button'

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
    label: PropTypes.string,
    selected_key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    section_style: PropTypes.string,
    section_spacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    use_hash: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_rerender: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    scroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    class: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func
    ]),

    render: PropTypes.func
  }

  static defaultProps = {
    data: null,
    content: null,
    label: null,
    selected_key: null,
    align: 'left',
    section_style: null,
    section_spacing: null,
    use_hash: false,
    prerender: false,
    prevent_rerender: false,
    scroll: null,
    skeleton: null,
    id: null,
    class: null,

    className: null,
    children: null,
    render: null
  }

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
          content.props.displayName === 'CustomContent' // we use this sollution, as Component.displayName
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

    this.state = {
      hasScrollbar: false,
      _listenForPropChanges: true,
      selected_key,
      _selected_key: selected_key,
      _data: props.data || props.children,
      data
    }

    this._tablistRef = React.createRef()
  }

  componentDidMount() {
    this.addScrollBehaviour()
    this.scrollToTab()
  }

  onScrollHandler = () => {
    const hasScrollbar = this.hasScrollbar()
    if (hasScrollbar !== this.state.hasScrollbar) {
      this.setState({
        hasScrollbar
      })
    }
  }

  hasScrollbar() {
    return (
      this._tablistRef.current.scrollWidth >
      this._tablistRef.current.offsetWidth
    )
  }

  componentWillUnmount() {
    clearTimeout(this._scrollToTabTimeout)
    clearTimeout(this._setFocusOnTablistId)
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onScrollHandler)
    }
  }

  addScrollBehaviour() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onScrollHandler)
    }
    this.onScrollHandler()
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'up':
      case 'page up':
      case 'left':
        e.preventDefault()
        this.prevTab(e)
        this.setFocusOnTablist()
        break
      case 'down':
      case 'page down':
      case 'right':
        e.preventDefault()
        this.nextTab(e)
        this.setFocusOnTablist()
        break
    }
  }

  prevTab = (e) => {
    this.openTab(-1, e, 'step')
  }
  nextTab = (e) => {
    this.openTab(+1, e, 'step')
  }

  scrollToTab() {
    clearTimeout(this._scrollToTabTimeout)
    this._scrollToTabTimeout = setTimeout(() => {
      if (this.state.hasScrollbar) {
        try {
          const elem = this._tablistRef.current.querySelector(
            '.dnb-tabs__button.selected'
          )
          this._tablistRef.current.scrollLeft = elem.offsetLeft

          const isFirst = this._tablistRef.current
            .querySelector('.dnb-tabs__button__snap:first-of-type button')
            .classList.contains('selected')
          const isLast = this._tablistRef.current
            .querySelector('.dnb-tabs__button__snap:last-of-type button')
            .classList.contains('selected')

          this.setState({
            isFirst,
            isLast
          })
        } catch (e) {
          warn(e)
        }
      }
    }, 1) // delay because chrome does not react during click

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

  setFocusOnTablist = () => {
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        if (this._tablistRef.current) {
          this._tablistRef.current.focus()
        }
      }, 1) // to make sure we don't "flicker"
      clearTimeout(this._setFocusOnTablistId)
      this._setFocusOnTablistId = setTimeout(() => {
        if (this._tablistRef.current) {
          this._tablistRef.current.focus()
        }
      }, 50)
      // makes it possible to navigate with left/right key
      // also, if tabs are used with @reach/router we have to be after the focus handling of this one
    }
  }

  openTabByDOM = (e) => {
    try {
      const selected_key = (function (elem) {
        return (
          getPreviousSibling('dnb-tabs__button', elem) || { dataset: {} }
        )
      })(e.target).dataset.tabKey

      this.openTab(selected_key, e)
      this.setFocusOnTablist()
    } catch (e) {
      warn('Tabs Error:', e)
    }
  }

  getCurrentTitle = () => {
    const { selected_key } = this.state
    const current = this.state.data.filter(
      ({ key }) => key == selected_key
    )[0]
    return (current && current.title) || null
  }

  openTab = (selected_key, event = null, mode = null) => {
    // for handling prevTab and nextTab
    if (mode === 'step' && parseFloat(selected_key)) {
      const currentData = this.state.data.filter(
        ({ disabled }) => !disabled
      )
      const currentIndex = currentData.reduce(
        (acc, { key }, i) => (key == this.state.selected_key ? i : acc),
        -1
      )
      let nextIndex = currentIndex + selected_key
      if (nextIndex < 0) {
        nextIndex = currentData.length - 1
      }
      if (nextIndex >= currentData.length) {
        nextIndex = 0
      }
      selected_key = currentData.reduce(
        (acc, { key }, i) => (i === nextIndex ? key : acc),
        null
      )
    }

    if (selected_key) {
      this.setState(
        {
          selected_key,
          _listenForPropChanges: false
        },
        () => {
          this.scrollToTab()
        }
      )
    }

    dispatchCustomElementEvent(this, 'on_change', {
      key: selected_key,
      event
    })

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
    const { align, section_style, section_spacing } = this.props
    const { hasScrollbar } = this.state

    return (
      <div
        className={classnames(
          'dnb-tabs__tabs',
          align ? `dnb-tabs__tabs--${align}` : null,
          section_style
            ? `dnb-section dnb-section--${section_style}`
            : null,
          section_spacing
            ? `dnb-section--spacing-${
                isTrue(section_spacing) ? 'default' : section_spacing
              }`
            : null,
          hasScrollbar && 'dnb-tabs--has-scrollbar',
          className
        )}
      >
        <ScrollNavButton
          onMouseDown={this.prevTab}
          icon="chevron_left"
          className={classnames(
            hasScrollbar && 'dnb-tabs__scroll-nav-button--visible',
            this.state.isFirst && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />
        {children}
        <ScrollNavButton
          onMouseDown={this.nextTab}
          icon="chevron_right"
          className={classnames(
            hasScrollbar && 'dnb-tabs__scroll-nav-button--visible',
            this.state.isLast && 'dnb-tabs__scroll-nav-button--hide'
          )}
        />
      </div>
    )
  }

  TabContentHandler = ({ showEmptyMessage = false } = {}) => {
    const { selected_key } = this.state

    const content = this.renderContent()
    return (
      <ContentWrapper id={this._id} selected_key={selected_key}>
        {content ||
          (showEmptyMessage && <span>Tab content not found</span>)}
      </ContentWrapper>
    )
  }

  TabsHandler = () => {
    const { label, skeleton } = this._props
    const { selected_key } = this.state

    const tabs = this.state.data.map(
      ({ title, key, disabled = false }) => {
        const itemParams = {}
        const isSelected = this.isSelected(key)
        if (isSelected) {
          itemParams['aria-controls'] = `${this._id}-content-${key}`
        }

        // itemParams['aria-current'] = isSelected // has best support on NVDA
        // itemParams['aria-selected'] = isSelected // has best support on VO

        if (isTrue(disabled)) {
          itemParams.disabled = true
          itemParams['aria-disabled'] = true
        }

        skeletonDOMAttributes(itemParams, skeleton, this.context)

        return (
          <div className="dnb-tabs__button__snap" key={`tab-${key}`}>
            <button
              type="button"
              role="tab"
              tabIndex="-1"
              id={`${this._id}-tab-${key}`}
              aria-selected={isSelected}
              className={classnames(
                'dnb-tabs__button',
                isSelected && 'selected'
              )}
              onClick={this.openTabByDOM}
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
        onKeyDown={this.onKeyDownHandler}
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
        <Content showEmptyMessage />
      </Wrapper>
    )
  }
}

class ContentWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected_key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    children: PropTypes.node.isRequired
  }
  render() {
    const { id, children, selected_key: key, ...rest } = this.props
    if (!children) {
      return <></>
    }
    return (
      <div
        role="tabpanel"
        id={`${id}-content-${key}`}
        className={classnames(
          'dnb-tabs__content',
          createSpacingClasses(rest)
        )}
        aria-labelledby={`${id}-tab-${key}`}
      >
        {children}
      </div>
    )
  }
}

// This component is only a dummy component to collect data
/*
  Like:
  <Tabs>
    <Tabs.Content title="first" selected disabled>first</Tabs.Content>
    <Tabs.Content title="second">second</Tabs.Content>
  </Tabs>
 */
class CustomContent extends React.PureComponent {
  static propTypes = {
    displayName: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func
    ]), // eslint-disable-line
    hash: PropTypes.string, // eslint-disable-line
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    class: PropTypes.string
  }
  static defaultProps = {
    displayName: 'CustomContent' /** React props */,
    title: null,
    hash: null,
    selected: null,
    disabled: null,
    className: null,
    class: null
  }
  render() {
    const {
      children,
      displayName, // eslint-disable-line
      title, // eslint-disable-line
      hash, // eslint-disable-line
      selected, // eslint-disable-line
      disabled, // eslint-disable-line
      className,
      class: _className,
      ...rest
    } = this.props
    return (
      <div
        className={classnames(
          'dnb-tabs__content__inner',
          createSpacingClasses(rest),
          className,
          _className
        )}
      >
        {children}
      </div>
    )
  }
}

Tabs.Content = CustomContent
Tabs.ContentWrapper = ContentWrapper

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
      // className="dnb-sr-only"
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
