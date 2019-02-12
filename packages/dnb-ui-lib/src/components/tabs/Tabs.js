/**
 * Web Tabs Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'

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

  static enableWebComponent() {
    registerElement(Tabs.tagName, Tabs, defaultProps)
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
        state.selected_key = props.selected_key
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
            key: (!_key && hash ? hash : _key) || generateKey(title),
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

    this._id = props.id || `dnb-tabs-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    const data = Tabs.getData(props)

    let selected_key =
      props.selected_key ||
      data.reduce(
        (acc, { selected, key }) => (selected ? key : acc),
        null
      ) ||
      (data[0] && data[0].key)

    // check if we have to open a diffrent tab
    if (props.use_hash && typeof window !== 'undefined') {
      try {
        const use_this_key = String(window.location.hash).replace('#', '')
        if (use_this_key && String(use_this_key).length > 0) {
          const keyExists = data.some(({ key }) => key === use_this_key)
          if (keyExists) {
            selected_key = use_this_key
          }
        }
      } catch (e) {
        console.log('Tabs Error:', e)
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
      case 'left':
        this.hasKeyDown = true
        e.preventDefault()
        this.prevTab()
        this.setFocusOnTablist()
        break
      case 'right':
        this.hasKeyDown = true
        e.preventDefault()
        this.nextTab()
        this.setFocusOnTablist()
        break
    }
  }

  onKeyUpHandler = () => {
    this.hasKeyDown = false
  }

  prevTab = () => {
    this.openTab(-1)
  }
  nextTab = () => {
    this.openTab(+1)
  }

  setFocusOnTablist = () => {
    setTimeout(() => {
      if (this._tablistRef.current) {
        this._tablistRef.current.focus()
      }
    }, 1)
  }

  openTabByDOM = e => {
    const target =
      e.target.nodeName === 'SPAN' ? e.target.parentElement : e.target
    const selected_key = String(target.className).match(
      /tab--([-_a-z0-9]+)/i
    )[1]

    return this.openTab(selected_key)
  }

  openTab = selected_key => {
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
        selected_key
      })
    }

    dispatchCustomElementEvent(this, 'on_change', {
      key: selected_key
    })

    if (this.props.use_hash && typeof window !== 'undefined') {
      try {
        window.history.replaceState(
          undefined,
          undefined,
          `#${selected_key}`
        )
      } catch (e) {
        console.log('Tabs Error:', e)
      }
    }
  }

  isSelected(tabKey) {
    return this.state.selected_key === tabKey
  }

  renderSelectedTab(tabKey) {
    return `dnb-tablink tab--${tabKey} ${
      this.isSelected(tabKey) ? 'selected' : ''
    }`
  }

  renderContent(useKey = null) {
    const { children } = this.props

    if (!useKey) {
      const { selected_key, data } = this.state

      // just to make sure we never get an empty content
      const keyExists = data.some(({ key }) => key === selected_key)
      if (keyExists) {
        useKey = selected_key
      } else {
        // key did not exists, so we get the first one
        useKey = data[0].key
      }
    }
    let content = null

    if (children) {
      if (typeof children === 'object' && children[useKey]) {
        // if content is provided as an object
        content = children[useKey]
      } else if (typeof children === 'function') {
        // if content is provided as a render prop
        content = children.apply(this, [useKey])
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
          .filter(({ key }) => key && useKey && key === useKey)
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
    const {
      render: customRenderer,
      label,
      align,
      selected_key,
      className,
      class: _className,
      id, //eslint-disable-line
      data, //eslint-disable-line
      use_hash, //eslint-disable-line
      children, //eslint-disable-line
      on_change, //eslint-disable-line
      ...props
    } = this.props

    // To have a reusable Component laster, do this like that
    const Tabs = () => {
      const tabs = this.state.data.map(
        ({ title, key, disabled = false }) => {
          const params = {}
          if (this.isSelected(key)) {
            params['aria-controls'] = `${this._id}-content-${key}`
          }
          return (
            <button
              key={`tab--${key}`}
              role="tab"
              tabIndex="-1"
              id={`${this._id}-tab-${key}`}
              aria-selected={this.isSelected(key)}
              className={this.renderSelectedTab(key)}
              onClick={this.openTabByDOM}
              disabled={disabled}
              {...params}
            >
              <span className="dnb-tablink-title">{title}</span>
              <Dummy>{title}</Dummy>
            </button>
          )
        }
      )
      const params = {}
      if (label) {
        params['aria-label'] = label
      }
      return (
        <div
          role="tablist"
          className="dnb-tabs__tabs__tablist dnb-tab-focus"
          tabIndex="0"
          onKeyUp={this.onKeyUpHandler}
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
    const TabsList = ({ children }) => (
      <div
        className={classnames(
          'dnb-tabs__tabs',
          align ? `dnb-tabs__tabs--${align}` : null
        )}
      >
        {children}
      </div>
    )
    TabsList.displayName = 'TabsList'

    // To have a reusable Component laster, do this like that
    const Wrapper = ({ children, ...rest }) => {
      const params = {
        ...props,
        className: classnames('dnb-tabs', className, _className)
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
    selected_key: PropTypes.string,
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    selected_key: null
  }
  render() {
    const { id, children } = this.props
    const key = this.props.selected_key || 'key'

    return (
      <div
        role="tabpanel"
        id={`${id}-content-${key}`}
        className="dnb-tabs__content"
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
    displayName: PropTypes.string, // eslint-disable-line
    title: PropTypes.string, // eslint-disable-line
    hash: PropTypes.string, // eslint-disable-line
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    displayName: 'CustomContent',
    title: null,
    hash: null,
    selected: null,
    disabled: null
  }
  render() {
    const { children } = this.props
    return children
  }
}

const generateKey = title => {
  const key = String(title)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-{1,}/g, '-')
  return key
}

Tabs.Content = CustomContent
Tabs.generateKey = generateKey
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
