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
// import { pageFocus } from '../../shared/tools'
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
  label: PropTypes.string,
  selected_key: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  use_hash: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  // Web Component props
  render: PropTypes.func
}

export const defaultProps = {
  data: [],
  label: null,
  selected_key: null,
  align: 'left',
  use_hash: false,
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
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  constructor(props) {
    super(props)

    this._id = props.id || `dnb-tabs-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    const data = Tabs.getData(props)
    const selected_key = props.selected_key || (data[0] && data[0].key)

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
      /tab--([a-z0-9]+)/
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
    if (!children) {
      return null
    }

    const { selected_key } = this.state
    let content = null

    if (typeof children === 'object' && children[selected_key]) {
      content = children[selected_key]
    } else if (typeof children === 'function') {
      content = children.apply(this, [selected_key])
    }

    return (
      <TabContent id={this._id} selection_key={selected_key}>
        {content || <span>Tab content not found</span>}
      </TabContent>
    )
  }

  render() {
    const {
      render: customRenderer,
      align,
      className,
      class: _className
    } = this.props

    const params = {
      className: classnames('dnb-tabs', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const content = this.renderContent()

    const Tabs = () => {
      const tabs = this.state.data.map(
        ({ title, key, disabled = false }) => {
          const params = {}
          if (this.isSelected(key))
            params['aria-controls'] = `${this._id}-content-${key}`
          return (
            <Fragment key={`tab--${key}`}>
              <button
                role="tab"
                tabIndex="-1"
                id={`${this._id}-tab-${key}`}
                // aria-controls={`${this._id}-content-${key}`}
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
            </Fragment>
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
          className="dnb-tabs__tabs__tablist tab-focus"
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

    const Wrapper = ({ children, ...rest }) => (
      <div {...params} {...rest}>
        {children}
        {content}
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

class TabContent extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selection_key: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }
  render() {
    const { id, children, selection_key: key } = this.props
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

Tabs.TabContent = TabContent
