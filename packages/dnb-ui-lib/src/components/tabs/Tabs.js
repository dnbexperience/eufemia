/**
 * Web Tabs Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import Context from '../../shared/Context'
import {
  slugify,
  isTrue,
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

const renderProps = {
  render: null
}

export const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
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
  label: PropTypes.string,
  selected_key: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  section_style: PropTypes.string,
  section_spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  use_hash: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  render: PropTypes.func
}

export const defaultProps = {
  data: null,
  label: null,
  selected_key: null,
  align: 'left',
  section_style: null,
  section_spacing: null,
  use_hash: false,
  id: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Tabs extends PureComponent {
  static tagName = 'dnb-tabs'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Tabs.tagName, Tabs, defaultProps)
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
      const keyExists = data.findIndex(({ key }) => key === selected_key)
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
          acc.push({
            key,
            ...obj
          })
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
      _listenForPropChanges: true,
      selected_key,
      _selected_key: selected_key,
      _data: props.data,
      data
    }

    this._tablistRef = React.createRef()
  }

  onKeyDownHandler = e => {
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

  prevTab = e => {
    this.openTab(-1, e)
  }
  nextTab = e => {
    this.openTab(+1, e)
  }

  componentWillUnmount() {
    clearTimeout(this._setFocusOnTablistId)
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

  openTabByDOM = e => {
    const target =
      e.target.nodeName === 'SPAN' ? e.target.parentElement : e.target
    const selected_key = target.getAttribute('data-tab-key')

    this.openTab(selected_key, e)
    this.setFocusOnTablist()
  }

  getCurrentTitle = () => {
    const { selected_key } = this.state
    const current = this.state.data.filter(
      ({ key }) => key === selected_key
    )[0]
    return (current && current.title) || null
  }

  openTab = (selected_key, event = null) => {
    // for handling prevTab and nextTab
    if (parseFloat(selected_key)) {
      const currentData = this.state.data.filter(
        ({ disabled }) => !disabled
      )
      const currentIndex = currentData.reduce(
        (acc, { key }, i) => (key === this.state.selected_key ? i : acc),
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
      this.setState({
        selected_key,
        _listenForPropChanges: false
      })
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
        console.warn('Tabs Error:', e)
      }
    }
  }

  isSelected(tabKey) {
    return this.state.selected_key === tabKey
  }

  renderContent() {
    const { children } = this.props
    const { selected_key } = this.state

    let content = null

    if (children) {
      if (typeof children === 'object' && children[selected_key]) {
        // if content is provided as an object
        content = children[selected_key]
      } else if (typeof children === 'function') {
        // if content is provided as a render prop
        content = children.apply(this, [selected_key])
      } else if (React.isValidElement(children)) {
        content = children
      }
    }

    // check of the content is provided in the "data" part instead
    if (!content) {
      let items = []

      if (Array.isArray(this.state.data)) {
        items = this.state.data
      } else if (Array.isArray(children)) {
        items = children
      }

      // if content was provided as a React Component like "Tabs.Content"
      // - or the content was provided as a content prop i data
      if (items) {
        content = items
          .filter(({ key }) => key && selected_key && key === selected_key)
          .reduce((acc, { content }) => content || acc, null)
      }
    }

    if (typeof content === 'function') {
      const Component = content
      content = <Component />
    }

    return content
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      render: customRenderer,
      label,
      align,
      section_style,
      section_spacing,
      className,
      class: _className,
      selected_key: _selected_key, //eslint-disable-line
      id, //eslint-disable-line
      data, //eslint-disable-line
      use_hash, //eslint-disable-line
      children, //eslint-disable-line
      on_change, //eslint-disable-line
      ...attributes
    } = props

    const { selected_key } = this.state

    // To have a reusable Component laster, do this like that
    const Tabs = () => {
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
          return (
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
              key={`tab-${key}`}
              data-tab-key={key}
              {...itemParams}
            >
              <span className="dnb-tabs__button__title">{title}</span>
              <Dummy>{title}</Dummy>
            </button>
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
    Tabs.displayName = 'Tabs'

    // To have a reusable Component laster, do this like that
    const TabsList = ({ children, className }) => (
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
          className
        )}
      >
        {children}
      </div>
    )

    TabsList.displayName = 'TabsList'

    // To have a reusable Component laster, do this like that
    const Wrapper = ({ children, ...rest }) => {
      const params = {
        ...attributes,
        className: classnames(
          'dnb-tabs',
          createSpacingClasses(props),
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
    Wrapper.displayName = 'TabsWrapper'

    const Content = ({ showEmptyMessage = false } = {}) => {
      const content = this.renderContent()
      return (
        <ContentWrapper id={this._id} selected_key={selected_key}>
          {content ||
            (showEmptyMessage && <span>Tab content not found</span>)}
        </ContentWrapper>
      )
    }
    Content.displayName = 'TabContent'

    // here we reuse the component, if it has a custom renderer
    if (typeof customRenderer === 'function') {
      return customRenderer({ Wrapper, Content, TabsList, Tabs })
    }

    return (
      <Wrapper>
        <TabsList>
          <Tabs />
        </TabsList>
        <Content showEmptyMessage />
      </Wrapper>
    )
  }
}

class ContentWrapper extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected_key: PropTypes.string.isRequired,
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
class CustomContent extends PureComponent {
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
    <span aria-hidden={true} hidden>
      {children}
    </span>
  )
}
Dummy.propTypes = {
  children: PropTypes.node.isRequired
}
