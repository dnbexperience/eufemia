/**
 * Web Tabs Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
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
        key: PropTypes.string.isRequired
      })
    )
  ]).isRequired,
  selected_key: PropTypes.string,
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
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class Tabs extends Component {
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

  // static getRightContent(props) {
  //   if (typeof props.render === 'function') {
  //     return props.render(props)
  //   }
  //   return processChildren(props)
  // }

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
  }

  openTab = e => {
    const selected_key = String(e.target.className).match(
      /tab--([a-z]+)/
    )[1]

    if (!this.props.selected_key && typeof window !== 'undefined') {
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

  renderActiveTab(tabKey) {
    const { selected_key } = this.state
    return `dnb-tablink dnb-no-mouse-focus tab--${tabKey} ${
      selected_key === tabKey ? 'active' : ''
    }`
  }

  isActive(tabKey) {
    return this.state.selected_key === tabKey
  }

  componentDidMount() {
    if (!this.props.selected_key && typeof window !== 'undefined') {
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
    const { className, class: _className } = this.props

    // const leftContent = Tabs.getLeftContent(this.props)
    // const rightContent = Tabs.getRightContent(this.props)

    const params = {
      className: classnames('dnb-tabs', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const content = this.getContent()

    const Tabs = ({ data = this.state.data }) =>
      data.map(({ title, key }) => (
        <button
          key={`tab--${key}`}
          className={this.renderActiveTab(key)}
          onClick={this.openTab}
        >
          {title}
        </button>
      ))

    const TabsList = ({ children }) => (
      <div className="dnb-tabs__tabs">{children}</div>
    )

    const Wrapper = ({ children, ...rest }) => (
      <div {...params} {...rest}>
        {children}
        {content && <div className="dnb-tabs__content">{content}</div>}
      </div>
    )

    if (typeof this.props.render === 'function') {
      return this.props.render({ Wrapper, TabsList, Tabs })
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
