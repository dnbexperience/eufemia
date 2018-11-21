/**
 * Web Tabs Component
 *
 */

import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { pageFocus } from '../../shared/tools'
// import './style/dnb-tabs.scss' // no good solution to import the style here

const renderProps = {
  render: null
}

export const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.exact({
        title: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        disabled: PropTypes.bool
      })
    )
  ]).isRequired,
  selected_key: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'center', 'right']),
  do_set_hash: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  // Web Component props
  render: PropTypes.func
}

export const defaultProps = {
  data: [],
  selected_key: null,
  direction: 'left',
  do_set_hash: false,
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
    if (props.data) res = props.data
    // else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  constructor(props) {
    super(props)

    const data = Tabs.getData(props)
    const selected_key = props.selected_key || (data[0] && data[0].key)

    this.state = {
      _listenForPropChanges: true,
      selected_key,
      _selected_key: selected_key,
      _data: props.data,
      data
    }

    // setTimeout(() => {
    //   this.nextTab()
    // }, 1e3)
  }

  onKeyDownHandler = e => {
    // let selected_item = this.state.selected_item
    // const total = this.state.data.length - 1

    console.log('keycode(e)', keycode(e))

    switch (keycode(e)) {
      case 'left':
        this.prevTab()
        e.preventDefault()
        break
      case 'right':
        this.nextTab()
        e.preventDefault()
        break
      case 'shift':
        this.hasShift = true
    }
  }

  onKeyUpHandler = e => {
    switch (keycode(e)) {
      case 'shift':
        this.hasShift = false
        break
    }
  }

  prevTab = () => {
    this.openTab(-1)
  }
  nextTab = () => {
    this.openTab(+1)
  }

  openTabByDOM = e => {
    const target =
      e.target.nodeName === 'SPAN' ? e.target.parentElement : e.target
    const selected_key = String(target.className).match(/tab--([a-z]+)/)[1]

    return this.openTab(selected_key)
  }

  openTab = selected_key => {
    if (parseFloat(selected_key)) {
      // console.log('selected_key', selected_key)
      // console.log('this.state', this.state.data)
      const currentIndex = this.state.data.reduce(
        (acc, { key }, i) => (key === this.state.selected_key ? i : acc),
        -1
      )
      let nextIndex = currentIndex + selected_key
      if (nextIndex < 0) {
        nextIndex = 0
      }
      if (nextIndex > this.state.data.length) {
        nextIndex = 0
      }
      selected_key = this.state.data.reduce(
        (acc, { key }, i) => (i === nextIndex ? key : acc),
        null
      )
    }
    if (selected_key) {
      if (this.props.do_set_hash && typeof window !== 'undefined') {
        try {
          window.location.hash = selected_key
        } catch (e) {
          console.log('Tabs Error:', e)
        }
      }

      dispatchCustomElementEvent(this, 'on_change', {
        key: selected_key
      })

      this.setState({
        selected_key
      })
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
    if (this.props.do_set_hash && typeof window !== 'undefined') {
      const selected_key = String(window.location.hash).replace('#', '')
      if (selected_key) {
        this.setState({
          selected_key
        })
        dispatchCustomElementEvent(this, 'on_change', {
          key: selected_key
        })
      }
    }
  }

  getContent() {
    if (!this.props.children) return null

    const { selected_key } = this.state

    if (typeof this.props.children === 'object') {
      return this.props.children[selected_key]
    }
    if (typeof this.props.children === 'function') {
      return this.props.children.apply(this, [selected_key])
    }
  }

  render() {
    const {
      render: customRenderer,
      direction,
      className,
      class: _className
    } = this.props

    const params = {
      className: classnames('dnb-tabs', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const content = this.getContent()

    const Tabs = () => {
      const tabs = this.state.data.map(
        ({ title, key, disabled = false }) => (
          <Fragment key={`tab--${key}`}>
            <button
              role="tab"
              aria-selected={this.isSelected(key)}
              className={this.renderActiveTab(key)}
              onClick={this.openTabByDOM}
              disabled={disabled}
            >
              <span className="dnb-tablink-title">{title}</span>
              {/* we use "aria-hidden" SPAN to simulate a wider width for each tab */}
              <span aria-hidden={true} hidden>
                {title}
              </span>
            </button>
          </Fragment>
        )
      )
      return (
        <div
          role="tablist"
          className="dnb-tabs__tabs__tablist dnb-tab-focus"
          tabIndex={0}
          onKeyUp={this.onKeyUpHandler}
          onKeyDown={this.onKeyDownHandler}
        >
          {tabs}
        </div>
      )
    }

    const TabsList = ({ children }) => (
      <div
        className={classnames(
          'dnb-tabs__tabs',
          direction ? `dnb-tabs__tabs--${direction}` : null
        )}
      >
        {children}
      </div>
    )

    const Wrapper = ({ children, ...rest }) => (
      <div {...params} {...rest}>
        {children}
        {content && <Content>{content}</Content>}
      </div>
    )

    if (typeof customRenderer === 'function') {
      return customRenderer({ Wrapper, TabsList, Tabs })
    }

    return (
      <Wrapper>
        <TabsList>
          <Tabs />
        </TabsList>
      </Wrapper>
    )
  }
}

class Content extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
  }
  componentDidMount() {
    if (this._contentRef.current) {
      pageFocus(this._contentRef.current)
    }
  }
  render() {
    const { children } = this.props
    return (
      <div className="dnb-tabs__content" ref={this._contentRef}>
        {children}
      </div>
    )
  }
}
