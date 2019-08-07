/**
 * Web Dropdown Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren,
  detectOutsideClick,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import Icon from '../icon-primary/IconPrimary'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_select: null,
  on_state_update: null,
  trigger_component: null
}

export const propTypes = {
  id: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon_position: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  scrollable: PropTypes.bool,
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  max_height: PropTypes.number,
  no_animation: PropTypes.bool,
  no_scroll_animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  popup_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trigger_component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  data: PropTypes.oneOfType([
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        PropTypes.shape({
          selected_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
          ]),
          content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.string)
          ])
        })
      ])
    )
  ]).isRequired,
  selected_item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  open_on_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  icon: null,
  icon_position: null,
  label: null,
  label_direction: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  scrollable: true,
  max_height: null,
  direction: 'auto',
  no_animation: false,
  no_scroll_animation: false,
  prevent_selection: false,
  popup_menu: false,
  data: null,
  selected_item: null,
  open_on_focus: false,
  opened: false,
  disabled: null,
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
export default class Dropdown extends PureComponent {
  static tagName = 'dnb-dropdown'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"

  static enableWebComponent() {
    registerElement(Dropdown.tagName, Dropdown, defaultProps)
  }

  static parseOpened = state => /true|on/.test(String(state))

  static parseContentTitle = (
    dataItem,
    { separator = '\n', removeNumericOnlyValues = false } = {}
  ) => {
    let ret = ''
    const onlyNumericRegex = /[0-9.,-\s]+/
    if (Array.isArray(dataItem) && dataItem.length > 0) {
      dataItem = { content: dataItem }
    }
    if (dataItem && Array.isArray(dataItem.content)) {
      ret = dataItem.content
        .reduce((acc, cur) => {
          // check if we have React inside, with strings we can use
          cur = grabStringFromReact(cur)
          if (cur === false) {
            return acc
          }
          // remove only numbers
          const found =
            removeNumericOnlyValues && cur && cur.match(onlyNumericRegex)
          if (!(found && found[0].length === cur.length)) {
            acc.push(cur)
          }
          return acc
        }, [])
        .join(separator)
    } else {
      ret = grabStringFromReact((dataItem && dataItem.content) || dataItem)
    }
    if (
      dataItem &&
      dataItem.selected_value &&
      !onlyNumericRegex.test(dataItem.selected_value)
    ) {
      ret = dataItem.selected_value + separator + ret
    }
    // make sure we don't return empty strings
    if (Array.isArray(dataItem) && dataItem.length === 0) {
      ret = null
    }
    return ret
  }

  static getData(props) {
    let res = []
    if (props.data) res = props.data
    else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  static getOptionData(selected_item, data) {
    return (
      (data &&
        data.filter((data, i) => i === parseFloat(selected_item))[0]) ||
      []
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.data) {
        state.data = Dropdown.getData(props)
      }
      if (
        !state._isNewActiveItem &&
        state.selected_item !== props.selected_item
      ) {
        state.selected_item = props.selected_item
        if (typeof props.on_state_update === 'function') {
          dispatchCustomElementEvent({ props }, 'on_state_update', {
            data: Dropdown.getOptionData(props.selected_item, props.data)
          })
        }
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
      direction: props.direction,
      max_height: props.max_height,
      active_item: props.selected_item,
      // send selected_item in here, so we dont trigger on_state_update
      selected_item: props.selected_item,
      selectedItemHasChanged: false
    }

    this._ref = React.createRef()
    this._refUl = React.createRef()
    this._refButton = React.createRef()
  }

  componentDidMount() {
    if (this.state.opened && !this.state.hidden) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    this.setHidden()
    clearTimeout(this._hideTimeout)
    clearTimeout(this._selectTimeout)
  }

  setOutsideClickObserver = () => {
    detectOutsideClick(this, this._ref.current, this.setHidden)
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }

  removeOutsideClickObserver() {
    detectOutsideClick.remove(this)
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
    }
  }

  setVisible = () => {
    clearTimeout(this._hideTimeout)
    clearTimeout(this._showTimeout)
    this.searchCache = null
    const { selected_item, opened, hidden } = this.state
    if (!opened && hidden) {
      this.blockDoubleClick = true
    }
    this.setState(
      {
        hidden: false,
        opened: true,
        _listenForPropChanges: false
      },
      () => {
        this._showTimeout = setTimeout(() => {
          this.blockDoubleClick = false
        }, 1e3) // wait until animation is over
        this.setDirectionObserver()
        this.setScrollObserver()
        this.setOutsideClickObserver()
        this.scrollToItem(selected_item, {
          scrollTo: false
        })
      }
    )
    dispatchCustomElementEvent(this, 'on_show', {
      data: Dropdown.getOptionData(selected_item, this.state.data)
    })
  }
  setHidden = () => {
    this.setState(
      {
        opened: false,
        _listenForPropChanges: false
      },
      () => {
        this._hideTimeout = setTimeout(
          () => {
            this.setState({
              hidden: true,
              _listenForPropChanges: false
            })
          },
          this.props.no_animation ? 1 : Dropdown.blurDelay
        ) // wait until animation is over
      }
    )
    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()
    dispatchCustomElementEvent(this, 'on_hide', {
      data: Dropdown.getOptionData(
        this.state.selected_item,
        this.state.data
      )
    })
    this.blockDoubleClick = false
  }

  // this gives us the possibility to quickly search for an item
  // by simply pressing any alfabetic key
  findItemByValue(value) {
    let index = -1

    try {
      // delete the cache
      // if ther eare several of the same type
      if (this.changedOrderFor !== value) {
        this.searchCache = null
        this.changedOrderFor = null
      }

      this.searchCache =
        this.searchCache ||
        this.state.data.reduce((acc, itemData, i) => {
          const str = String(
            Dropdown.parseContentTitle(itemData, {
              removeNumericOnlyValues: true,
              separator: ' '
            })
          ).toLowerCase()

          acc[str[0]] = acc[str[0]] || []
          acc[str[0]].push({
            i
          })
          return acc
        }, {})

      const found = this.searchCache[value]
      index = found && found[0] && found[0].i > -1 ? found[0].i : -1

      // if ther eare several of the same type
      if (found && found.length > 1) {
        found.push(found.shift())
        this.changedOrderFor = value
      }
    } catch (e) {
      console.log('Dropdown could not findItemByValue:', e)
    }

    return index
  }

  scrollToItem(
    active_item,
    { fireSelectEvent = false, scrollTo = true, event = null } = {}
  ) {
    if (!(active_item > -1)) {
      return
    }
    this.setState(
      {
        active_item,
        _listenForPropChanges: false
      },
      () => {
        const { selected_item } = this.state
        if (fireSelectEvent) {
          const ret = dispatchCustomElementEvent(this, 'on_select', {
            selected_item,
            active_item,
            data: Dropdown.getOptionData(active_item, this.state.data),
            event
          })
          if (ret === false) return
        }
        // try to scroll to item
        if (!this._refUl.current) return
        try {
          const ulElement = this._refUl.current
          const liElement = ulElement.querySelector(
            `li.dnb-dropdown__option:nth-of-type(${active_item + 1})`
          )
          const top = liElement.offsetTop
          // const { parentNode } = liElement
          if (ulElement.scrollTo) {
            const params = {
              top
            }
            if (scrollTo) {
              params.behavior = 'smooth'
            }
            ulElement.scrollTo(params)
          } else if (ulElement.scrollTop) {
            ulElement.scrollTop = top
          }
          if (liElement) {
            liElement.focus()
          }
        } catch (e) {
          console.log('Dropdown could not scroll into element:', e)
        }
      }
    )
  }

  onFocusHandler = () => {
    if (isTrue(this.props.open_on_focus)) {
      this.setVisible()
    }
  }
  onBlurHandler = () => {
    if (isTrue(this.props.open_on_focus)) {
      this.setHidden()
    }
  }
  toggleVisible = () => {
    if (!this.state.hidden && this.state.opened) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }
  onMouseDownHandler = () => {
    if (
      !this.state.hidden &&
      this.state.opened &&
      !this.blockDoubleClick
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }

  onTriggerKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'enter':
      case 'space':
      case 'up':
      case 'down':
        if (this.state.hidden) {
          e.preventDefault()
          this.setVisible()
        }
        break
      case 'esc':
        this.setHidden()
        break
    }
  }

  onKeyDownHandler = e => {
    let active_item = this.state.active_item
    const total = this.state.data.length - 1

    switch (keycode(e)) {
      case 'up':
        e.preventDefault()
        active_item--
        break
      case 'down':
        e.preventDefault()
        active_item++
        break
      case 'home':
        e.preventDefault()
        active_item = 0
        break
      case 'end':
        e.preventDefault()
        active_item = total
        break
      case 'enter':
      case 'space':
        e.preventDefault()
        this.selectItem(active_item, { fireSelectEvent: true, event: e })
        this.setHidden()
        break
      case 'esc':
        e.preventDefault()
        this.setHidden()
        break

      default:
        active_item = this.findItemByValue(keycode(e))
        break
    }

    if (active_item < 0) {
      active_item = 0
    }
    if (active_item > total) {
      active_item = total
    }

    if (active_item !== this.state.active_item) {
      this.scrollToItem(active_item, { fireSelectEvent: true, event: e })
    }
  }

  selectItemHandler = event => {
    const selected_item = parseFloat(
      event.currentTarget.getAttribute('data-item')
    )
    if (selected_item > -1) {
      this.selectItem(selected_item, { fireSelectEvent: true, event })
    }
  }

  selectItem = (
    selected_item,
    { fireSelectEvent = false, event = null } = {}
  ) => {
    if (
      this.state.selected_item !== selected_item ||
      // to make sure we call "on_change" on startup
      this.state.selectedItemHasChanged === false
    ) {
      dispatchCustomElementEvent(this, 'on_change', {
        selected_item,
        data: Dropdown.getOptionData(selected_item, this.state.data),
        event
      })
    }

    const onSelectionIsComplete = () => {
      if (fireSelectEvent) {
        dispatchCustomElementEvent(this, 'on_select', {
          selected_item,
          active_item: selected_item,
          data: Dropdown.getOptionData(selected_item, this.state.data),
          event
        })
      }
      if (this._selectTimeout) {
        clearTimeout(this._selectTimeout)
      }
      this._selectTimeout = setTimeout(() => {
        this.setHidden()
        if (this._refButton.current) {
          this._refButton.current.focus()
        }
      }, 150) // only for the user experience
    }

    if (
      isTrue(this.props.prevent_selection) ||
      (this.props.popup_menu !== false && this.props.popup_menu !== null)
    ) {
      onSelectionIsComplete()
    } else {
      this.setState(
        {
          // Do not set "_listenForPropChanges" to false here, as it will block instant component rerender
          _isNewActiveItem: true,
          selectedItemHasChanged: true,
          selected_item,
          active_item: selected_item
        },
        onSelectionIsComplete
      )
    }
  }

  setScrollObserver() {
    if (typeof window === 'undefined' || !this._refUl.current) {
      return
    }
    this.removeScrollObserver()

    try {
      const itemSpots = this.state.data.reduce((acc, current, i) => {
        const element = this._refUl.current.querySelector(
          `li.dnb-dropdown__option:nth-of-type(${i + 1})`
        )
        if (element) {
          acc[element.offsetTop] = {
            i
          }
        }
        return acc
      }, {})
      const counts = Object.keys(itemSpots)
      const findClosest = (arr, val) =>
        Math.max.apply(null, arr.filter(v => v <= val))
      let closestToTop = null,
        closestToBottom = null,
        tmpToTop,
        tmpToBottom
      this.setOnScroll = () => {
        closestToBottom = findClosest(
          counts,
          this._refUl.current.scrollTop + this._refUl.current.offsetHeight
        )
        closestToTop = findClosest(counts, this._refUl.current.scrollTop)
        if (closestToTop !== tmpToTop) {
          this.setState({
            closestToTop: itemSpots[closestToTop].i,
            _listenForPropChanges: false
          })
        }
        // we do this because we want the arrow
        // to change visually
        if (closestToBottom !== tmpToBottom) {
          this.setState({
            closestToBottom: itemSpots[closestToBottom].i,
            _listenForPropChanges: false
          })
        }
        tmpToTop = closestToTop
        tmpToBottom = closestToBottom
      }
      this._refUl.current.addEventListener('scroll', this.setOnScroll)
      this.setOnScroll()
    } catch (e) {
      console.log('Dropdown could not set onScroll:', e)
    }
  }

  removeScrollObserver() {
    if (typeof window !== 'undefined' && this.setOnScroll) {
      window.removeEventListener('resize', this.setOnScroll)
    }
  }

  setDirectionObserver() {
    if (typeof window === 'undefined' || !this._ref.current) {
      return
    }
    this.removeDirectionObserver()
    try {
      const min_height = 320 // 20rem = 20x16=320
      const spaceToTopOffset = 4 * 16 //because of headers
      const spaceToBottomOffset = 2 * 16
      const elem = this._ref.current

      this.setDirection = () => {
        const spaceToTop =
          getOffseTop(elem) + elem.offsetHeight - window.scrollY
        const spaceToBottom =
          window.innerHeight -
          (getOffseTop(elem) + elem.offsetHeight) +
          window.scrollY
        const direction =
          spaceToBottom < min_height && spaceToTop > min_height
            ? 'top'
            : 'bottom'
        const height =
          direction === 'top'
            ? spaceToTop -
              this._refButton.current.offsetHeight -
              spaceToTopOffset
            : spaceToBottom - spaceToBottomOffset
        const max_height = height / 16 // calc to rem

        this.setState({
          direction,
          max_height
        })
      }

      window.addEventListener('resize', this.setDirection)
      this.setDirection()
    } catch (e) {
      console.log('Dropdown could not set onResize:', e)
    }
  }

  removeDirectionObserver() {
    if (typeof window !== 'undefined' && this.setDirection) {
      window.removeEventListener('resize', this.setDirection)
    }
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    let { icon, icon_position } = props

    const {
      title,
      label,
      label_direction,
      icon: _icon, // eslint-disable-line
      icon_position: _icon_position, // eslint-disable-line
      status,
      status_state,
      status_animation,
      scrollable,
      no_animation,
      no_scroll_animation,
      trigger_component: CustomTrigger,
      popup_menu,
      className,
      class: _className,
      disabled,

      prevent_selection: _prevent_selection, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      max_height: _max_height, // eslint-disable-line
      id: _id, // eslint-disable-line
      data: _data, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      selected_item: _selected_item, // eslint-disable-line
      children,

      ...attributes
    } = props

    const id = this._id

    const isPopupMenu = popup_menu !== false && popup_menu !== null
    if (isPopupMenu) {
      if (icon === null) {
        icon = 'more'
      }
      if (icon_position === null) {
        icon_position = 'left'
      }
    }

    const {
      data,
      direction,
      max_height,
      opened,
      hidden,
      active_item,
      selected_item
    } = this.state
    const showStatus = status && status !== 'error'

    const currentOptionData = Dropdown.getOptionData(selected_item, data)

    const mainParams = {
      className: classnames(
        'dnb-dropdown',
        opened && 'dnb-dropdown--opened',
        hidden && 'dnb-dropdown--hidden',
        `dnb-dropdown--direction-${direction}`,
        label_direction && `dnb-dropdown--${label_direction}`,
        'dnb-dropdown',
        icon_position && `dnb-dropdown--icon-position-${icon_position}`,
        isPopupMenu && 'dnb-dropdown--is-popup',
        isPopupMenu &&
          typeof popup_menu === 'string' &&
          `dnb-dropdown__popup--${popup_menu}`,
        scrollable && 'dnb-dropdown--scroll',
        isTrue(no_scroll_animation) && 'dnb-dropdown--no-scroll-animation',
        status && `dnb-dropdown__status--${status_state}`,
        showStatus && 'dnb-dropdown__form-status',
        createSpacingClasses(props),
        _className,
        className
      )
    }

    // To link the selected item with the aria-labelledby, use this:
    // const selectedId = `option-${id}-${selected_item}`
    // But for now we use
    const selectedId = `dropdown-${id}-value`
    const triggerParams = {
      type: 'button',
      id,
      title,
      ['aria-label']: title,
      ['aria-haspopup']: 'listbox',
      ['aria-labelledby']: selectedId,
      ['aria-expanded']: opened,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      onMouseDown: this.onMouseDownHandler,
      onKeyDown: this.onTriggerKeyDownHandler,
      disabled: isTrue(disabled),
      ...attributes
    }
    if (isTrue(disabled)) {
      triggerParams['aria-disabled'] = true
    }
    const listParams = {
      className: classnames(
        'dnb-dropdown__list',
        no_animation && 'dnb-dropdown__list--no-animation'
      )
    }
    const ulParams = {
      className: 'dnb-dropdown__options',
      role: 'listbox',
      tabIndex: '0',
      ['aria-activedescendant']: `option-${id}-${selected_item}`,
      ['aria-labelledby']: id,
      ref: this._refUl,
      style: {
        maxHeight: max_height > 0 ? `${max_height}rem` : null
      }
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, triggerParams)
    validateDOMAttributes(null, listParams)
    validateDOMAttributes(null, ulParams)

    return (
      <span {...mainParams}>
        {(label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            direction={label_direction}
            disabled={disabled}
          />
        )) || (
          <span className="dnb-dropdown__helper" aria-hidden>
            {'-'}
          </span>
        )}
        <span className="dnb-dropdown__inner" ref={this._ref}>
          <span className="dnb-dropdown__shell">
            {CustomTrigger ? (
              <CustomTrigger {...triggerParams} />
            ) : (
              <button
                className="dnb-dropdown__trigger"
                ref={this._refButton}
                {...triggerParams}
              >
                {!isPopupMenu && (
                  <span className="dnb-dropdown__text">
                    <span
                      id={`dropdown-${id}-value`}
                      className="dnb-dropdown__text__inner"
                    >
                      {data && data.length > 0
                        ? currentOptionData.selected_value ||
                          Dropdown.parseContentTitle(currentOptionData) ||
                          title
                        : title}
                    </span>
                  </span>
                )}
                <span
                  className={classnames(
                    'dnb-dropdown__icon',
                    // icon && `icon-${icon}`,// not used anymore for now
                    parseFloat(selected_item) === 0 &&
                      'dnb-dropdown__icon--first'
                  )}
                >
                  {icon !== false && (
                    <Icon icon={icon || 'chevron-down'} />
                  )}
                </span>
              </button>
            )}

            {!hidden && (
              <span {...listParams}>
                {data && data.length > 0 ? (
                  <ul {...ulParams}>
                    {data.map((dataItem, i) => {
                      const isCurrent = i === parseFloat(selected_item)
                      const liParams = {
                        id: `option-${id}-${i}`,
                        role: 'option', // here we could use "menuitem"
                        tabIndex: '-1',
                        title: Dropdown.parseContentTitle(dataItem),
                        className: classnames(
                          'dnb-dropdown__option',
                          isCurrent && 'dnb-dropdown__option--selected',
                          i === active_item &&
                            'dnb-dropdown__option--focus',
                          // helper classes
                          i === this.state.closestToTop &&
                            'closest-to-top',
                          i === this.state.closestToBottom &&
                            'closest-to-bottom',
                          i === data.length - 1 && 'last-of-type' // because of the triangle element
                        ),
                        onMouseDown: this.selectItemHandler,
                        'data-item': i
                      }
                      if (isCurrent) {
                        liParams['aria-selected'] = true

                        // use checked if we use role="menuitem"
                        // liParams['aria-checked'] = true
                      }
                      return (
                        <li key={id + i} {...liParams}>
                          <span className="dnb-dropdown__option__inner">
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
                    <li className="dnb-dropdown__triangle" aria-hidden />
                  </ul>
                ) : (
                  children && (
                    <span className="dnb-dropdown__content">
                      {children}
                    </span>
                  )
                )}
              </span>
            )}
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
      </span>
    )
  }
}

function getOffseTop(elem) {
  let offsetTop = 0
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop
    }
  } while ((elem = elem.offsetParent))
  return offsetTop
}

function grabStringFromReact(cur) {
  if (React.isValidElement(cur)) {
    if (typeof cur.props.children === 'string') {
      cur = cur.props.children
    } else if (Array.isArray(cur.props.children)) {
      cur = cur.props.children.reduce((acc, cur) => {
        if (typeof cur === 'string') {
          acc = acc + cur
        }
        return acc
      }, '')
    } else {
      return false
    }
  }

  return cur
}
