/**
 * Web Dropdown Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
// import './style/dnb-dropdown.scss' // no good solution to import the style here
import Icon from '../icon/IconWithAllIcons'

const renderProps = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_select: null,
  on_state_update: null
}

export const propTypes = {
  id: PropTypes.string,
  input_id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  icon_position: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          selected_value: PropTypes.string,
          outside_value: PropTypes.string,
          content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
          ])
        })
      ])
    )
  ]).isRequired,
  selected_item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_show: PropTypes.func,
  on_hide: PropTypes.func,
  on_change: PropTypes.func,
  on_select: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  id: `dropdown${Math.random() * 999}`,
  input_id: null,
  title: 'Option Menu',
  icon: 'chevron-left',
  icon_position: null,
  data: null,
  selected_item: 0,
  opened: false,
  disabled: false,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The dropdown component is our enhancement of the classic radio button. It acts like a switch. Example: On/off, yes/no.
 */
export default class Dropdown extends Component {
  static tagName = 'dnb-dropdown'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static blurDelay = 400

  static enableWebComponent() {
    registerElement(Dropdown.tagName, Dropdown, defaultProps)
  }

  static parseOpened = state => /true|on/.test(String(state))
  static parseContentTitle = dataItem => {
    if (dataItem.selected_value) return dataItem.selected_value
    if (dataItem.content)
      return Array.isArray(dataItem.content)
        ? dataItem.content.join(' ')
        : dataItem.content
    if (typeof dataItem === 'string') return dataItem
    return ''
  }

  static getData(props) {
    let res = []
    if (props.data) res = props.data
    else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.data) {
        if (state._data !== props.data) {
          state._data = props.data
          state.data = Dropdown.getData(props)
        }
      }
      if (state.selected_item !== props.selected_item) {
        state.selected_item = props.selected_item
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    const opened = Dropdown.parseOpened(props.opened)
    this.state = {
      _listenForPropChanges: true,
      active: -1,
      opened,
      visible: opened,
      selected_item: props.selected_item,
      _data: props.data || props.children,
      data: Dropdown.getData(props)
    }

    this._refInput = React.createRef()
    this._refButton = React.createRef()
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.selected_item !== nextProps.selected_item) {
      dispatchCustomElementEvent(this, 'on_state_update', {
        data: this.getOptionData(nextProps.selected_item)
      })
    }
    return true
  }

  componentDidMount() {
    if (this.state.opened && this.state.visible) {
      this.setFocus()
    }
  }

  setFocus = () => {
    if (this._refInput.current && !this.props.disabled) {
      this._refInput.current.focus()
    }
  }

  setVisible = () => {
    if (this._hideTimeout) clearTimeout(this._hideTimeout)
    this.setState({
      visible: true,
      _listenForPropChanges: false
    })
    dispatchCustomElementEvent(this, 'on_show', {
      data: this.getOptionData(this.state.selected_item)
    })
  }
  setHidden = () => {
    this._hideTimeout = setTimeout(() => {
      this.setState({
        visible: false,
        _listenForPropChanges: false
      })
    }, Dropdown.blurDelay) // wait until animation is over
    dispatchCustomElementEvent(this, 'on_hide', {
      data: this.getOptionData(this.state.selected_item)
    })
  }
  onFocusHandler = () => {
    if (!this.state.opened) {
      this.setState({
        opened: true,
        _listenForPropChanges: false
      })
      this.setVisible()
    }

    // Experimental, but not crucial
    // if (this._refInput.current && this._refInput.current.scrollIntoView) {
    //   this._refInput.current.scrollIntoView()
    // }
  }
  onBlurHandler = () => {
    this.setState({
      active: -1,
      opened: false,
      _listenForPropChanges: false
    })
    this.setHidden()
  }

  onMouseDownHandler = () => {
    if (this.state.opened) {
      this.onBlurHandler()
    }
  }

  onKeyDownHandler = e => {
    let selected_item = this.state.selected_item
    const total = this.state.data.length - 1

    switch (keycode(e)) {
      case 'up':
        selected_item--
        e.preventDefault()
        break
      case 'down':
        selected_item++
        e.preventDefault()
        break
      case 'shift':
        this.hasShift = true
        break
      case 'enter':
      case 'space':
        if (this._refInput.current) {
          this._refInput.current.blur()
        }
        dispatchCustomElementEvent(this, 'on_select', {
          data: this.getOptionData(selected_item)
        })
        e.preventDefault()
        break
      case 'esc':
        if (this._refInput.current) {
          this._refInput.current.blur()
        }
        e.preventDefault()
        break
    }

    if (selected_item < 0) {
      selected_item = total
    }
    if (selected_item > total) {
      selected_item = 0
    }

    if (selected_item !== this.state.selected_item) {
      this.setState({
        active: selected_item
      })
      this.selectItem(selected_item)
    }
  }

  onKeyUpHandler = e => {
    switch (keycode(e)) {
      case 'shift':
        this.hasShift = false
        break
    }
  }

  selectItem = (selected_item, { fireSelectEvent } = {}) => {
    if (this.state.selected_item !== selected_item) {
      dispatchCustomElementEvent(this, 'on_change', {
        data: this.getOptionData(selected_item)
      })
    }
    this.setState({
      selected_item,
      _listenForPropChanges: false
    })
    if (fireSelectEvent) {
      dispatchCustomElementEvent(this, 'on_select', {
        data: this.getOptionData(selected_item)
      })
    }
  }

  getOptionData(selected_item) {
    return (
      this.state.data.filter(
        (data, i) => i === parseFloat(selected_item)
      )[0] || []
    )
  }

  render() {
    const classes = classnames(
      'dnb-dropdown',
      'typo-light',
      `${
        this.props.icon_position
          ? `dnb-dropdown--icon-position-${this.props.icon_position}`
          : ''
      }`,
      this.state.visible
        ? 'dnb-dropdown--visible'
        : !this.state.opened && !this.state.visible
        ? 'dnb-dropdown--hidden'
        : '',
      this.props.class,
      this.props.className
    )

    const { input_id, id, disabled } = this.props

    const params = {
      disabled:
        typeof disabled === 'string'
          ? disabled === 'true'
          : Boolean(disabled)
    }
    if (this.state.opened) {
      params['aria-expanded'] = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const currentOptionData = this.getOptionData(this.state.selected_item)

    return (
      <span className={classes}>
        <input
          id={input_id || id}
          readOnly={true}
          title={
            this.props.title // type="checkbox"// dont works well on firefox
          }
          aria-haspopup="listbox"
          aria-label={this.props.title}
          className="dnb-dropdown__value-holder-input"
          value={currentOptionData.value || ''}
          onKeyUp={this.onKeyUpHandler}
          onKeyDown={this.onKeyDownHandler}
          onFocus={this.onFocusHandler}
          onBlur={this.onBlurHandler}
          ref={this._refInput}
          {...params}
        />
        <button
          tabIndex="-1"
          aria-hidden={true}
          aria-labelledby={`${params.id}`}
          className="dnb-dropdown__trigger typo-book"
          onMouseDown={this.onMouseDownHandler}
          ref={this._refButton}
          {...params}
        >
          <span className="dnb-dropdown__text">
            <span className="dnb-dropdown__text__inner">
              {Dropdown.parseContentTitle(currentOptionData)}
            </span>
          </span>
          <span className={`dnb-dropdown__icon icon-${this.props.icon}`}>
            {this.props.icon && (
              <Icon icon={this.props.icon} icon_size="24" />
            )}
            <span className="dnb-dropdown__icon__triangle" />
          </span>
        </button>
        <ul
          className="dnb-dropdown__options"
          aria-labelledby={`${params.id}`}
        >
          {this.state.data.map((dataItem, i) => (
            <li
              key={`dw_li${i}`}
              role="option"
              aria-selected={i === this.state.active}
              className={`dnb-dropdown__option ${
                i === parseFloat(this.state.selected_item)
                  ? 'dnb-dropdown__option--selected'
                  : ''
              }  ${
                i === this.state.active
                  ? 'dnb-dropdown__option--active'
                  : ''
              }`}
            >
              <span
                title={Dropdown.parseContentTitle(dataItem)}
                className="dnb-dropdown__option__inner"
                onMouseDown={() =>
                  this.selectItem(i, { fireSelectEvent: true })
                }
                role="button"
                tabIndex="-1"
              >
                {(Array.isArray(dataItem.content) &&
                  dataItem.content.map((item, i) => {
                    return (
                      <span
                        key={`dw_item${i}`}
                        className="dnb-dropdown__option__item"
                      >
                        {item}
                      </span>
                    )
                  })) ||
                  dataItem.content ||
                  dataItem}
              </span>
            </li>
          ))}
        </ul>
        <span className="dnb-dropdown__outside-value typo-book">
          {currentOptionData.outside_value}
        </span>
      </span>
    )
  }
}
