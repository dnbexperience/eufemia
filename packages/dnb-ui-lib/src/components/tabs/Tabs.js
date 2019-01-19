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

    // if it is a React Component - collect data from Tabs.Tab component
    if (
      Array.isArray(props.children) &&
      (typeof props.children[0] === 'function' ||
        React.isValidElement(props.children[0]))
    ) {
      res = props.children.reduce((acc, cur, i) => {
        if (cur.props.title) {
          const { key, ...rest } = cur.props
          acc.push({
            key: key || `key${i}`,
            content: cur, // can be a Node or a Function
            ...rest
          })
        }
        return acc
      }, [])
    }

    // continue, while the children dident contain our data
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

    const selected_key =
      props.selected_key ||
      data.reduce(
        (acc, { selected, key }) => (selected ? key : acc),
        null
      ) ||
      (data[0] && data[0].key)

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

      dispatchCustomElementEvent(this, 'on_change', {
        key: selected_key
      })

      if (this.props.use_hash && typeof window !== 'undefined') {
        try {
          window.location.hash = selected_key
        } catch (e) {
          console.log('Tabs Error:', e)
        }
      }
    }
  }

  isSelected(tabKey) {
    return this.state.selected_key === tabKey
  }

  renderActiveTab(tabKey) {
    return `dnb-tablink dnb-no-mouse-focus tab--${tabKey} ${
      this.isSelected(tabKey) ? 'selected' : ''
    }`
  }

  isActive(tabKey) {
    return this.state.selected_key === tabKey
  }

  componentDidMount() {
    // check if one tab should be "opened"
    if (this.props.use_hash && typeof window !== 'undefined') {
      try {
        const selected_key = String(window.location.hash).replace('#', '')
        if (selected_key) {
          this.setState({
            selected_key
          })
          dispatchCustomElementEvent(this, 'on_change', {
            key: selected_key
          })
        }
      } catch (e) {
        console.log('Tabs Error:', e)
      }
    }
  }

  renderContent() {
    const { children } = this.props

    const { selected_key } = this.state
    let content = null

    // if content is provided as an object
    if (
      children &&
      typeof children === 'object' &&
      children[selected_key]
    ) {
      content = children[selected_key]

      // if content is provided as a render prop
    } else if (children && typeof children === 'function') {
      content = children.apply(this, [selected_key])
    }

    if (!content) {
      let items = []

      if (Array.isArray(this.state.data)) {
        items = this.state.data
      } else if (Array.isArray(children)) {
        items = children
      }

      // if content was provided as a React Component like "Tabs.Tab"
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

    return (
      <ContentWrapper id={this._id} selected_key={selected_key}>
        {content || <span>Tab content not found</span>}
      </ContentWrapper>
    )
  }

  render() {
    const {
      render: customRenderer,
      align,
      className,
      class: _className
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
              className={this.renderActiveTab(key)}
              onClick={this.openTabByDOM}
              disabled={disabled}
              {...params}
            >
              <span className="dnb-tablink-title">{title}</span>
              {/* we use "aria-hidden" SPAN to simulate a wider width for each tab */}
              <span aria-hidden={true} hidden>
                {title}
              </span>
            </button>
          )
        }
      )
      const params = {}
      if (this.props.label) {
        params['aria-label'] = this.props.label
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

    // To have a reusable Component laster, do this like that
    const Wrapper = ({ children, isInside, ...rest }) => {
      const params = {
        className: classnames('dnb-tabs', className, _className)
      }

      // also used for code markup simulation
      validateDOMAttributes(this.props, params)

      // check if the Wrapper is used from "inside", else there have to be children
      // from inside, there is the posibility that we got the content privded by the "data" prop
      const content =
        isInside || this.props.children ? this.renderContent() : null

      return (
        <div {...params} {...rest}>
          {children}
          {content}
        </div>
      )
    }

    // here we reuse the component, if it has a custom renderer
    if (typeof customRenderer === 'function') {
      return customRenderer({ Wrapper, TabsList, Tabs })
    }

    return (
      <Wrapper isInside>
        <TabsList>
          <Tabs />
        </TabsList>
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
    const key =
      this.props.selected_key ||
      (this._reactInternalFiber && this._reactInternalFiber.key) ||
      'key'

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
    <Tabs.Tab title="first" selected disabled>first</Tabs.Tab>
    <Tabs.Tab title="second">second</Tabs.Tab>
  </Tabs>
 */
class Tab extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired, // eslint-disable-line
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    selected: null,
    disabled: null
  }
  render() {
    const { children } = this.props
    return children
  }
}

Tabs.Tab = Tab
Tabs.ContentWrapper = ContentWrapper
