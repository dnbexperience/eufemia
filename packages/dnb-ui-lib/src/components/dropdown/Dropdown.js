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
import Icon from '../icon-primary/IconPrimary'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_select: null,
  on_state_update: null
}

export const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  icon_position: PropTypes.string,
  label: PropTypes.string,
  status: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  scrollable: PropTypes.bool,
  no_animation: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          selected_value: PropTypes.string,
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

  // React
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
  id: null,
  title: 'Option Menu',
  icon: 'chevron-left',
  icon_position: null,
  label: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  scrollable: false,
  no_animation: false,
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
        ? dataItem.content
            .reduce((acc, cur) => {
              // remove only numbers
              const found = cur && cur.match(/[0-9.,-\s]+/)
              if (!(found && found[0].length === cur.length)) {
                acc.push(cur)
              }
              return acc
            }, [])
            .join(' ')
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

    this._id = props.id || `dropdown-${Math.round(Math.random() * 999)}`

    const opened = Dropdown.parseOpened(props.opened)
    this.state = {
      _listenForPropChanges: true,
      opened,
      hidden: !opened,
      active_item: props.selected_item,
      selected_item: props.selected_item,
      _data: props.data || props.children,
      data: Dropdown.getData(props)
    }

    this._refUl = React.createRef()
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
    if (this.state.opened && this.state.hidden) {
      this.setFocus()
    }
  }

  componentWillUnmount() {
    clearTimeout(this._hideTimeout)
  }

  setFocus = () => {
    if (this._refInput.current && !this.props.disabled) {
      this._refInput.current.focus()
    }
  }

  setVisible = () => {
    if (this._hideTimeout) clearTimeout(this._hideTimeout)
    this.setState({
      hidden: false,
      _listenForPropChanges: false
    })
    dispatchCustomElementEvent(this, 'on_show', {
      data: this.getOptionData(this.state.selected_item)
    })
  }
  setHidden = () => {
    this._hideTimeout = setTimeout(() => {
      this.setState({
        hidden: true,
        _listenForPropChanges: false
      })
    }, Dropdown.blurDelay) // wait until animation is over
    dispatchCustomElementEvent(this, 'on_hide', {
      data: this.getOptionData(this.state.selected_item)
    })
  }

  // this gives us the possibility to quickly search for an item
  // by simply pressing any alfabetic key
  findItemByValue(value) {
    return this.state.data.slice(0).reduce((acc, itemData, i, arr) => {
      const str = Dropdown.parseContentTitle(itemData)
      if (str) {
        const found = new RegExp(`^${value}`, 'i').test(str)
        if (found) {
          arr.splice(1) // break the loop
          return i
        }
      }
      return -1
    }, -1)
  }

  scrollToItem(active_item) {
    if (!(active_item > -1)) {
      return
    }
    this.setState({
      active_item,
      _listenForPropChanges: false
    })

    // try to scroll to item
    try {
      const liElement = this._refUl.current.querySelector(
        `li:nth-of-type(${active_item + 1})`
      )
      const top = liElement.offsetTop
      liElement.parentNode.scrollTo({
        top,
        behavior: 'smooth'
      })
    } catch (e) {
      console.log('Dropdown could not scroll into element:', e)
    }
  }

  onFocusHandler = () => {
    if (!this.state.opened) {
      this.setState({
        opened: true,
        _listenForPropChanges: false
      })
      this.setVisible()
    }
  }
  onBlurHandler = () => {
    this.setState({
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
    let active_item = this.state.active_item
    const total = this.state.data.length - 1

    switch (keycode(e)) {
      case 'up':
        active_item--
        e.preventDefault()
        break
      case 'down':
        active_item++
        e.preventDefault()
        break
      case 'enter':
      case 'space':
        this.selectItem(active_item)
        if (this._refInput.current) {
          this._refInput.current.blur()
        }
        dispatchCustomElementEvent(this, 'on_select', {
          data: this.getOptionData(active_item)
        })
        e.preventDefault()
        break
      case 'esc':
        if (this._refInput.current) {
          this._refInput.current.blur()
        }
        e.preventDefault()
        break

      default:
        if (this._refUl.current) {
          this.scrollToItem(this.findItemByValue(keycode(e)))
        }
        break
    }

    if (active_item < 0) {
      active_item = total
    }
    if (active_item > total) {
      active_item = 0
    }

    if (active_item !== this.state.active_item) {
      this.scrollToItem(active_item)
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
    const {
      title,
      label,
      icon,
      icon_position,
      status,
      status_state,
      status_animation,
      scrollable,
      no_animation,
      className,
      class: _className,
      disabled,

      id: _id /* eslint-disable-line */,
      data /* eslint-disable-line */,
      opened: _opened /* eslint-disable-line */,
      selected_item: _selected_item /* eslint-disable-line */,

      ...attributes
    } = this.props

    const id = this._id

    const { opened, hidden, active_item, selected_item } = this.state
    const showStatus = status && status !== 'error'

    const currentOptionData = this.getOptionData(selected_item)

    const classes = classnames(
      'dnb-dropdown',
      icon_position && `dnb-dropdown--icon-position-${icon_position}`,
      scrollable && 'dnb-dropdown--scroll',
      opened && 'dnb-dropdown--opened',
      hidden && 'dnb-dropdown--hidden',
      showStatus && 'dnb-dropdown__form-status',
      status && `dnb-dropdown__status--${status_state}`,
      _className,
      className
    )

    // To link the selected item with the aria-labelledby, use this:
    // const selectedId = `option-${id}-${selected_item}`
    // But for now we use
    const selectedId = `dropdown-${id}-value`
    const shellParams = {}
    const inputParams = {
      id,
      className: 'dnb-dropdown__input',
      ['aria-hidden']: true,
      readOnly: true,
      value: currentOptionData.value || '',
      onKeyUp: this.onKeyUpHandler,
      onKeyDown: this.onKeyDownHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      ref: this._refInput,
      disabled
    }
    const triggerParams = {
      className: 'dnb-dropdown__trigger',
      title: title, // type="checkbox"// dont works well on firefox
      ['aria-label']: title,
      ['aria-haspopup']: 'listbox',
      ['aria-labelledby']: selectedId,
      ['aria-expanded']: opened,
      onMouseDown: this.onMouseDownHandler,
      ref: this._refButton,
      disabled,
      ...attributes
    }
    if (disabled) {
      triggerParams['aria-disabled'] = true
    }
    const ulParams = {
      className: classnames(
        'dnb-dropdown__options',
        no_animation && 'dnb-dropdown__options--no-animation'
      ),
      role: 'listbox',
      tabIndex: '-1',
      ['aria-activedescendant']: `option-${id}-${selected_item}`,
      ['aria-labelledby']: id,
      ref: this._refUl
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, triggerParams)
    validateDOMAttributes(null, shellParams)
    validateDOMAttributes(null, inputParams)
    validateDOMAttributes(null, ulParams)

    return (
      <>
        {label && (
          <FormLabel
            aria-hidden
            for_id={id}
            text={label}
            disabled={disabled}
          />
        )}
        <span className={classes}>
          <span className="dnb-dropdown__shell" {...shellParams}>
            <input {...inputParams} />
            <button {...triggerParams}>
              <span className="dnb-dropdown__text">
                <span
                  id={`dropdown-${id}-value`}
                  className="dnb-dropdown__text__inner"
                >
                  {Dropdown.parseContentTitle(currentOptionData)}
                </span>
              </span>
              <span
                className={classnames(
                  'dnb-dropdown__icon',
                  `icon-${icon}`,
                  parseFloat(selected_item) === 0 &&
                    'dnb-dropdown__icon--first'
                )}
              >
                {icon && <Icon icon={icon} />}
              </span>
            </button>

            <ul {...ulParams}>
              {this.state.data.map((dataItem, i) => {
                const isCurrent = i === parseFloat(selected_item)
                const params = {
                  id: `option-${id}-${i}`,
                  role: 'option',
                  ['aria-selected']: isCurrent,
                  className: classnames(
                    'dnb-dropdown__option',
                    isCurrent && 'dnb-dropdown__option--selected',
                    i === active_item && 'dnb-dropdown__option--focus'
                  )
                }
                return (
                  <li key={id + i} {...params}>
                    {i === 0 && (
                      <span className="dnb-dropdown__triangle" />
                    )}
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
                        dataItem.content.map((item, n) => {
                          return (
                            <span
                              key={id + i + n}
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
                )
              })}
            </ul>
          </span>

          {showStatus && (
            <FormStatus
              text={status}
              status={status_state}
              text_id={id + '-status'} // used for "aria-describedby"
              animation={status_animation}
            />
          )}
        </span>
      </>
    )
  }
}
