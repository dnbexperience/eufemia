/**
 * Web List Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  detectOutsideClick,
  getPreviousSibling,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'
import { createSpacingClasses } from '../../components/space/SpacingHelper'

import Context from '../../shared/Context'

const renderProps = {
  on_set_active_item: null,
  on_show: null,
  on_hide: null,
  on_change: null,
  on_resize: null,
  on_select: null,
  on_state_update: null,
  wrapper_element: null
}

export const propTypes = {
  id: PropTypes.string,
  triangle_position: PropTypes.string,
  scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  max_height: PropTypes.number,
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_scroll_animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  align_drawer: PropTypes.oneOf(['left', 'right']),
  wrapper_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node
  ]),
  default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  button_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skip_keysearch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object
    ]),
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
  ]),
  prepared_data: PropTypes.array,
  raw_data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func
  ]),
  ignore_events: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // React
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ]),
  on_set_active_item: PropTypes.func,
  active_id: PropTypes.number,

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,

  // Events
  on_show: PropTypes.func,
  on_hide: PropTypes.func,
  on_change: PropTypes.func,
  on_resize: PropTypes.func,
  on_select: PropTypes.func,
  on_state_update: PropTypes.func
}

const defaultProps = {
  id: null,
  triangle_position: 'left',
  scrollable: true,
  focusable: false,
  max_height: null,
  direction: 'auto',
  size: 'default',
  no_animation: false,
  no_scroll_animation: false,
  prevent_selection: false,
  align_drawer: null,
  wrapper_element: null,
  default_value: null,
  value: 'initval',
  prevent_close: false,
  keep_open: false,
  prevent_focus: false,
  button_only: false,
  skip_keysearch: false,
  opened: false,
  class: null,
  data: null,
  prepared_data: null,
  raw_data: null,
  ignore_events: null,
  active_id: null,

  // React props
  className: null,
  children: null,
  on_set_active_item: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

export default class DrawerList extends PureComponent {
  static tagName = 'dnb-drawer-list'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static blurDelay = 201 // some ms more than "DrawerListSlideDown 200ms"

  static enableWebComponent() {
    registerElement(DrawerList.tagName, DrawerList, defaultProps)
  }

  static parseContentTitle = (
    dataItem,
    {
      separator = '\n',
      removeNumericOnlyValues = false,
      preferSelectedValue = false
    } = {}
  ) => {
    let ret = ''
    const onlyNumericRegex = /[0-9.,-\s]+/
    if (Array.isArray(dataItem) && dataItem.length > 0) {
      dataItem = { content: dataItem }
    }

    const hasValue = dataItem?.selected_value

    if (
      !(preferSelectedValue && hasValue) &&
      dataItem &&
      Array.isArray(dataItem.content)
    ) {
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

    if (hasValue) {
      if (preferSelectedValue) {
        ret = String(dataItem.selected_value)
      } else if (!onlyNumericRegex.test(dataItem.selected_value)) {
        ret = String(dataItem.selected_value) + separator + ret
      }
    }

    // make sure we don't return empty strings
    if (Array.isArray(dataItem) && dataItem.length === 0) {
      ret = null
    }

    if (ret && ret.length === 1 && ret[0].ignore_events) {
      return null
    }

    return ret
  }

  static hasObjectKeyAsValue(data) {
    data = data?.raw_data || data
    return data && typeof data === 'object' && !Array.isArray(data)
  }

  static preSelectData(data) {
    if (typeof data === 'string') {
      data = data[0] === '{' || data[0] === '[' ? JSON.parse(data) : null
    } else if (data && React.isValidElement(data)) {
      data = []
    } else if (typeof data === 'function') {
      data = data()
    }

    return data
  }

  // normalize data
  static normalizeData(props) {
    let data = DrawerList.preSelectData(props.data || props.children)

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const list = []
      for (let i in data) {
        list.push({ selected_key: i, content: data[i], type: 'object' })
      }
      data = list
    }

    return (data || []).map((item, i) => {
      if (typeof item === 'string') {
        item = { content: item, __isTransformed: true }
      }
      if (typeof item.__id !== 'undefined') {
        return item
      }
      if (Object.isExtensible(item)) {
        item.__id = i
        return item
      } else {
        return { ...item, __id: i }
      }
    })
  }

  static getData(props) {
    if (props.prepared_data && Array.isArray(props.prepared_data)) {
      return props.prepared_data
    }

    return DrawerList.normalizeData(props)
  }

  static findCurrentIndex(current_item, data) {
    return data.findIndex(({ __id }) => __id === current_item)
  }

  static getCurrentIndex(value, data) {
    // is numeric
    if (parseFloat(value) > -1) {
      return value
    }

    // if a key is given as a string
    else if (typeof value === 'string') {
      return data.findIndex(
        cur => DrawerList.parseCurrentValue(cur) === value
      )
    }

    return null
  }

  static getSelectedItemValue(value, state) {
    if (DrawerList.hasObjectKeyAsValue(state)) {
      return DrawerList.parseCurrentValue(
        state.data.filter((data, i) => i === parseFloat(value))[0]
      )
    }

    return value
  }

  static parseCurrentValue(current) {
    return current?.selected_key || current?.content || current
  }

  static getCurrentData(item_index, data) {
    if (typeof data === 'function') {
      data = DrawerList.normalizeData(data)
    }

    data = (data && data.find(({ __id }) => __id === item_index)) || null

    if (data && data.__isTransformed) {
      data = DrawerList.parseCurrentValue(data)
    }

    return data
  }

  static prepareStartupState(props) {
    const opened = isTrue(props.opened)
    const data = DrawerList.getData(props)

    let selected_item = DrawerList.getCurrentIndex(props.value, data)
    if (parseFloat(props.default_value) > -1) {
      selected_item = parseFloat(props.default_value)
    }

    const raw_data = DrawerList.preSelectData(
      props.raw_data || props.children || props.data
    )

    return {
      opened,
      data,
      raw_data,
      direction: props.direction,
      max_height: props.max_height,
      active_item: selected_item,
      selected_item,
      selectedItemHasChanged: false,
      _listenForPropChanges: false
    }
  }

  static prepareDerivedState(props, state) {
    if (state.opened && !state.data && typeof props.data === 'function') {
      state.data = DrawerList.getData(props)
    }

    if (state._listenForPropChanges) {
      if (
        (props.data && typeof props.data !== 'function') ||
        props.children
      ) {
        state.data = DrawerList.getData(props)
      }

      if (
        typeof props.wrapper_element === 'string' &&
        typeof document !== 'undefined'
      ) {
        const wrapper_element = document.querySelector(
          props.wrapper_element
        )
        if (wrapper_element) {
          state.wrapper_element = wrapper_element
        }
      } else {
        state.wrapper_element = props.wrapper_element
      }

      if (
        props.value !== 'initval' &&
        state.selected_item !== props.value
      ) {
        state.selected_item = DrawerList.getCurrentIndex(
          props.value,
          state.data
        )

        if (typeof props.on_state_update === 'function') {
          dispatchCustomElementEvent({ props }, 'on_state_update', {
            selected_item: state.selected_item,
            value: DrawerList.getSelectedItemValue(
              state.selected_item,
              state
            ),
            data: DrawerList.getCurrentData(
              state.selected_item,
              state.data
            )
          })
        }
      }

      if (parseFloat(props.active_id) > -1) {
        state.active_item = props.active_id
      }
    }
    state._listenForPropChanges = true

    return state
  }

  static getDerivedStateFromProps(props, state) {
    return DrawerList.prepareDerivedState(props, state)
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()

    this.state = DrawerList.prepareStartupState(props)

    this._refShell = React.createRef()
    this._refUl = React.createRef()
    this._refTriangle = React.createRef()
  }

  componentDidMount() {
    if (this.state.opened) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    clearTimeout(this._showTimeout)
    clearTimeout(this._focusTimeout)
    clearTimeout(this._hideTimeout)
    clearTimeout(this._selectTimeout)
    clearTimeout(this._ddt)
    // do not use setHidden here
    this.setState({
      opened: false,
      _listenForPropChanges: false
    })
    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()
  }

  setTrianglePosition = () => {
    // do not change the triangle on popup mode
    if (
      isTrue(this.props.prevent_selection)
      // TODO: maybe we have to send in someting like more_menu anyway?
      // ||  isTrue(this.props.more_menu)
    ) {
      return
    }

    try {
      const width = (this.state.wrapper_element || this._refShell.current)
        .offsetWidth
      if (parseFloat(width) > 0) {
        const { triangle_position, align_drawer } = this.props
        switch (align_drawer) {
          case 'left':
          default:
            if (triangle_position !== 'left') {
              this._refTriangle.current.style.left = `${width / 16 - 3}rem` // -3rem
            }
            break
          case 'right':
            if (triangle_position === 'left') {
              this._refTriangle.current.style.left = 'auto'
              this._refTriangle.current.style.right = `${width / 16 -
                3}rem` // -3rem
            }
            break
        }
      }
    } catch (e) {
      console.warn(e)
    }
  }

  setWrapperElement = () => {
    if (
      typeof this.props.wrapper_element === 'string' &&
      typeof document !== 'undefined'
    ) {
      const wrapper_element = document.querySelector(
        this.props.wrapper_element
      )
      if (wrapper_element) {
        this.setState({
          wrapper_element,
          _listenForPropChanges: false
        })
      }
    }
  }

  setOutsideClickObserver = () => {
    this.outsideClick = detectOutsideClick(
      [this.state.wrapper_element, this._refShell.current],
      this.setHidden // hide if document.activeElement is not inside our elements
    )
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }

  removeOutsideClickObserver() {
    if (this.outsideClick) {
      this.outsideClick.remove()
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
    }
  }

  setVisible = () => {
    if (this.state.opened && this.state.hidden === false) {
      return
    }

    clearTimeout(this._hideTimeout)
    this.searchCache = null
    const { selected_item, active_item } = this.state

    // This can be enabled in case we want to bypass the overflow hidden on Modals
    // Has to be tested more!
    // this.modalScrollLock = addScrollLock(this._refShell.current)

    this.setState(
      {
        hidden: false,
        opened: true,
        _listenForPropChanges: false
      },
      () => {
        this.setWrapperElement()
        this.setTrianglePosition()
        this.setDirectionObserver()
        this.setScrollObserver()
        this.setOutsideClickObserver()

        this.scrollToItem(
          parseFloat(active_item) > -1 ? active_item : selected_item,
          {
            scrollTo: false
          }
        )
      }
    )

    dispatchCustomElementEvent(this, 'on_show', {
      data: DrawerList.getCurrentData(selected_item, this.state.data),
      attributes: this.attributes || {}
    })
  }

  setHidden = (args = {}) => {
    if (!this.state.opened || isTrue(this.props.prevent_close)) {
      return
    }

    this.setState(
      {
        opened: false,
        _listenForPropChanges: false
      },
      () => {
        clearTimeout(this._hideTimeout)
        this._hideTimeout = setTimeout(
          () => {
            this.setState({
              hidden: undefined, // only to idendify once we rerender
              _listenForPropChanges: false
            })
          },
          isTrue(this.props.no_animation) ? 1 : DrawerList.blurDelay
        ) // wait until animation is over
      }
    )
    if (typeof this.modalScrollLock === 'function') {
      this.modalScrollLock()
    }
    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()

    dispatchCustomElementEvent(this, 'on_hide', {
      ...args,
      data: DrawerList.getCurrentData(
        this.state.selected_item,
        this.state.data
      ),
      attributes: this.attributes || {}
    })
  }

  // this gives us the possibility to quickly search for an item
  // by simply pressing any alfabetic key
  findItemByValue(value) {
    if (isTrue(this.props.skip_keysearch)) {
      return
    }

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
            DrawerList.parseContentTitle(itemData, {
              separator: ' '
              // removeNumericOnlyValues: true,// disabled 25. feb. 2020 as this does not make sence to handle this internally
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
      console.warn('List could not findItemByValue:', e)
    }

    return index
  }

  scrollToItem(
    active_item,
    { fireSelectEvent = false, scrollTo = true, event = null } = {}
  ) {
    if (
      !isTrue(this.props.prevent_focus) &&
      !(parseFloat(active_item) > -1)
    ) {
      this._focusTimeout = setTimeout(() => {
        try {
          if (this._refUl.current) {
            this._refUl.current.focus()
          }
        } catch (e) {
          console.warn(e)
        }
      }, 1) // NVDA / Firefox needs a dealy to set this focus
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
          const attributes = this.attributes || {}
          const ret = dispatchCustomElementEvent(this, 'on_select', {
            active_item,
            value: DrawerList.getSelectedItemValue(
              selected_item,
              this.state
            ),
            data: DrawerList.getCurrentData(active_item, this.state.data),
            event,
            attributes
          })
          if (ret === false) {
            return
          }
        }

        this._focusTimeout = setTimeout(() => {
          // try to scroll to item
          if (!this._refUl.current || !(parseFloat(active_item) > -1)) {
            return
          }
          try {
            const ulElement = this._refUl.current
            const liElement = ulElement.querySelector(
              `li.dnb-drawer-list__option:nth-of-type(${active_item + 1})`
            )
            if (liElement) {
              const top = liElement.offsetTop
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
              if (!isTrue(this.props.prevent_focus) && liElement) {
                liElement.focus()
              }
            }
          } catch (e) {
            console.warn('List could not scroll into element:', e)
          }
        }, 1) // NVDA / Firefox needs a dealy to set this focus
      }
    )

    if (typeof this.props.on_set_active_item === 'function') {
      this.props.on_set_active_item(active_item)
    }
  }

  preventTab = e => {
    switch (keycode(e)) {
      case 'tab':
        this.setHidden()
        break
    }
  }

  onKeyDownHandler = e => {
    const key = keycode(e)

    // stop here if the focus is not set
    // and the drawer is opened by default
    if (isTrue(this.props.prevent_close)) {
      const isSameDrawer =
        typeof document !== 'undefined' &&
        getPreviousSibling('dnb-drawer-list', document.activeElement) ===
          this._refShell.current

      if (!isSameDrawer || key === 'tab') {
        return
      }
    }

    if (isTrue(this.props.ignore_events) && key !== 'tab') {
      return
    }

    let active_item = parseFloat(this.state.active_item)

    if (isNaN(active_item)) {
      active_item = -1
    }

    const total = this.state.data && this.state.data.length - 1

    switch (key) {
      case 'shift':
        e.preventDefault()
        break

      case 'up':
        e.preventDefault()
        active_item = this.getPrevActiveItem()
        if (isNaN(active_item)) {
          active_item = this.getFirstItem()
        }
        break

      case 'down':
        e.preventDefault()
        if (active_item === -1) {
          active_item = this.getFirstItem()
        } else {
          active_item = this.getNextActiveItem()
          if (isNaN(active_item) || active_item === total) {
            active_item = this.getLastItem() || total
          }
        }
        break

      case 'home':
        e.preventDefault()
        active_item = this.getFirstItem() || 0
        break

      case 'end':
        e.preventDefault()
        active_item = this.getLastItem() || total
        break

      case 'enter':
      case 'space':
        active_item = this.getCurrentActiveItem()
        if (
          isTrue(this.props.skip_keysearch)
            ? active_item > -1 && key !== 'space'
            : true
        ) {
          e.preventDefault()
          this.selectItem(active_item, { fireSelectEvent: true, event: e })
          if (!isTrue(this.props.keep_open)) {
            this.setHidden({ setFocus: true })
          }
        }
        break

      case 'esc':
        e.preventDefault() // on edge, we need this prevent to not loose focus after close
        this.setHidden({ setFocus: true })
        break

      case 'tab':
        this.setHidden()
        break

      default:
        active_item = this.findItemByValue(keycode(e))
        break
    }

    if (
      parseFloat(active_item) > -1 &&
      active_item !== this.state.active_item
    ) {
      if (active_item > total) {
        active_item = total
      }
      this.scrollToItem(active_item, {
        fireSelectEvent: true,
        event: e
      })
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

  getSelectedElement = () => {
    return (
      this._refUl.current?.querySelector(
        'li.dnb-drawer-list__option--selected'
      ) ||
      this._refUl.current || { getAttribute: () => null }
    )
  }

  getCurrentSelectedItem = () => {
    const elem = this.getSelectedElement()
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  getActiveElement = () => {
    return (
      this._refUl.current?.querySelector(
        'li.dnb-drawer-list__option--focus'
      ) || this.getSelectedElement()
    )
  }

  getCurrentActiveItem = () => {
    const elem = this.getActiveElement()
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  getNextActiveItem = () => {
    const elem = this.getActiveElement().nextSibling
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  getPrevActiveItem = () => {
    const elem = this.getActiveElement().previousSibling
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  getFirstItem = () => {
    const elem = this._refUl.current?.querySelector(
      'li.dnb-drawer-list__option:first-of-type'
    )
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  getLastItem = () => {
    const elem = this._refUl.current?.querySelector(
      'li.dnb-drawer-list__option:last-of-type'
    )
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  selectItem = (
    itemToSelect,
    { fireSelectEvent = false, event = null } = {}
  ) => {
    // because of our delay on despatching the event
    // make a copy of it, so we don't break the syntetic event
    if (event && typeof event.persist === 'function') {
      event.persist()
    }

    // if no value is set on start and we confirm, we get -1
    if (itemToSelect === -1) {
      itemToSelect = null
    }

    const doCallOnChange =
      this.state.selected_item !== itemToSelect ||
      // to make sure we call "on_change" on startup
      this.state.selectedItemHasChanged === false

    const onSelectionIsComplete = () => {
      const attributes = this.attributes || {}
      if (doCallOnChange) {
        dispatchCustomElementEvent(this, 'on_change', {
          selected_item: itemToSelect,
          value: DrawerList.getSelectedItemValue(itemToSelect, this.state),
          data: DrawerList.getCurrentData(itemToSelect, this.state.data),
          event,
          attributes
        })
      }
      if (fireSelectEvent) {
        dispatchCustomElementEvent(this, 'on_select', {
          selected_item: itemToSelect,
          active_item: itemToSelect,
          value: DrawerList.getSelectedItemValue(itemToSelect, this.state),
          data: DrawerList.getCurrentData(itemToSelect, this.state.data),
          event,
          attributes
        })
      }
      if (this._selectTimeout) {
        clearTimeout(this._selectTimeout)
      }
      this._selectTimeout = setTimeout(
        () => {
          if (!isTrue(this.props.keep_open)) {
            this.setHidden({ setFocus: true })
          }
        },
        isTrue(this.props.no_animation) ? 1 : DrawerList.blurDelay / 2
      ) // only for the user experience
    }

    if (isTrue(this.props.prevent_selection)) {
      onSelectionIsComplete()
    } else {
      this.setState(
        {
          _listenForPropChanges: false,
          selectedItemHasChanged: true,
          selected_item: itemToSelect,
          active_item: itemToSelect
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
        const element = this._refUl.current?.querySelector(
          `li.dnb-drawer-list__option:nth-of-type(${i + 1})`
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
        Math.max.apply(
          null,
          arr.filter(v => v <= val)
        )
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
        if (itemSpots[closestToTop] && closestToTop !== tmpToTop) {
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
      console.warn('List could not set onScroll:', e)
    }
  }

  removeScrollObserver() {
    if (typeof window !== 'undefined' && this.setOnScroll) {
      window.removeEventListener('resize', this.setOnScroll)
    }
  }

  setDirectionObserver() {
    if (
      typeof window === 'undefined' ||
      !(this.state.wrapper_element || this._refShell.current)
    ) {
      return
    }
    if (this.props.direction !== 'auto') {
      return
    }

    // In case we have one before hand
    this.removeDirectionObserver()

    const min_height = 160 // 10rem = 10x16=160
    const spaceToTopOffset = 4 * 16 //because of headers
    const spaceToBottomOffset = 2 * 16
    const elem = this.state.wrapper_element || this._refShell.current

    const renderDirection = () => {
      try {
        // use "window.pageYOffset" instead of "window.scrollY" because IE
        const spaceToTop =
          getOffsetTop(elem) + elem.offsetHeight - window.pageYOffset
        const spaceToBottom =
          window.innerHeight -
          (getOffsetTop(elem) + elem.offsetHeight) +
          window.pageYOffset

        const direction =
          spaceToBottom < min_height && spaceToTop > min_height
            ? 'top'
            : 'bottom'

        const height =
          direction === 'top'
            ? spaceToTop -
              ((this.state.wrapper_element || this._refShell.current)
                .offsetHeight || 0) -
              spaceToTopOffset
            : spaceToBottom - spaceToBottomOffset

        const max_height = height / 16 // calc to rem

        this.setState({
          direction,
          max_height,
          _listenForPropChanges: false
        })

        dispatchCustomElementEvent(this, 'on_resize', {
          direction,
          max_height
        })
      } catch (e) {
        console.warn('List could not set onResize:', e)
      }
    }

    // debounce
    this.setDirection = () => {
      clearTimeout(this._ddt)
      this._ddt = setTimeout(renderDirection, 30)
    }

    window.addEventListener('resize', this.setDirection)
    window.addEventListener('scroll', this.setDirection)

    renderDirection()
  }

  removeDirectionObserver() {
    if (typeof window !== 'undefined' && this.setDirection) {
      window.removeEventListener('resize', this.setDirection)
      window.removeEventListener('scroll', this.setDirection)
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.List
    )

    let { triangle_position } = props

    const {
      triangle_position: _triangle_position, // eslint-disable-line
      align_drawer,
      button_only,
      scrollable,
      focusable,
      size,
      no_animation,
      no_scroll_animation,
      prevent_selection,
      inner_class,
      ignore_events,
      className,
      class: _className,
      active_id: _active_id, // eslint-disable-line
      wrapper_element: _wrapper_element, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      max_height: _max_height, // eslint-disable-line
      id: _id, // eslint-disable-line
      data: _data, // eslint-disable-line
      prepared_data: _prepared_data, // eslint-disable-line
      raw_data: _raw_data, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      children,

      ...attributes
    } = props

    const id = this._id

    const {
      data,
      direction,
      max_height,
      opened,
      hidden,
      selected_item
    } = this.state

    if (
      isTrue(this.props.opened) &&
      opened === false &&
      typeof hidden === 'undefined'
    ) {
      clearTimeout(this._showTimeout)
      this._showTimeout = setTimeout(this.setVisible, 1)
      return <></> // to avoid two renders on the first draw
    }
    if (
      isTrue(this.props.opened) === false &&
      opened === true &&
      hidden === false
    ) {
      clearTimeout(this._hideTimeout)
      this._hideTimeout = setTimeout(this.setHidden, 1)
    }

    const mainParams = {
      id: `${id}-drawer-list`,
      className: classnames(
        'dnb-drawer-list',
        opened && 'dnb-drawer-list--opened',
        hidden && 'dnb-drawer-list--hidden',
        `dnb-drawer-list--${direction}`,
        triangle_position &&
          `dnb-drawer-list--icon-position-${triangle_position}`,
        align_drawer && `dnb-drawer-list--${align_drawer}`,
        size && `dnb-drawer-list--${size}`,
        button_only && 'dnb-drawer-list--button',
        isTrue(scrollable) && 'dnb-drawer-list--scroll',
        isTrue(no_scroll_animation) &&
          'dnb-drawer-list--no-scroll-animation',
        createSpacingClasses(props),
        _className,
        className
      ),
      ...attributes
    }

    const listParams = {
      className: classnames(
        'dnb-drawer-list__list',
        isTrue(no_animation) && 'dnb-drawer-list__list--no-animation',
        inner_class
      )
    }
    const ulParams = {
      ['aria-labelledby']: id,
      style: {
        maxHeight: max_height > 0 ? `${max_height}rem` : null
      }
    }
    if (
      !isTrue(prevent_selection) &&
      !hidden &&
      parseFloat(selected_item) > -1
    ) {
      ulParams['aria-activedescendant'] = `option-${id}-${selected_item}`
    }
    if (isTrue(focusable)) {
      ulParams.tabIndex = '0'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, mainParams)
    validateDOMAttributes(null, listParams)
    validateDOMAttributes(null, ulParams)

    // make it pissible to grab the rest attributes and return it with all events
    this.attributes = validateDOMAttributes(null, attributes)

    const ignoreEvents = isTrue(ignore_events)

    return (
      <span {...mainParams} ref={this._refShell}>
        {hidden === false && (
          <span {...listParams}>
            {data && data.length > 0 ? (
              <DrawerList.List
                {...ulParams}
                ref={this._refUl}
                triangleRef={this._refTriangle}
              >
                {data.map(dataItem => {
                  const liParams = {
                    id: `option-${id}-${dataItem.__id}`, // we could use dataItem.__id here
                    className: classnames(
                      // helper classes
                      dataItem.__id === this.state.closestToTop &&
                        'closest-to-top',
                      dataItem.__id === this.state.closestToBottom &&
                        'closest-to-bottom',
                      dataItem.__id === data.length - 1 && 'last-of-type' // because of the triangle element
                    ),
                    onClick: this.selectItemHandler,
                    onKeyDown: this.preventTab,
                    'data-item': dataItem.__id
                  }

                  if (ignoreEvents) {
                    liParams.selected = null
                    liParams.onClick = null
                    liParams.onClick = null
                    liParams.className = classnames(
                      liParams.className,
                      'dnb-drawer-list__option--ignore'
                    )
                  }

                  return (
                    <DrawerList.Item
                      key={dataItem.__id}
                      selected={dataItem.__id === this.state.selected_item}
                      active={
                        !ignoreEvents &&
                        dataItem.__id === this.state.active_item
                      }
                      {...liParams}
                    >
                      {dataItem}
                    </DrawerList.Item>
                  )
                })}
              </DrawerList.List>
            ) : (
              children && (
                <span className="dnb-drawer-list__content">
                  {children}
                  <span className="dnb-drawer-list__triangle"></span>
                </span>
              )
            )}
          </span>
        )}
      </span>
    )
  }
}

// DrawerList List
DrawerList.List = React.forwardRef((props, ref) => {
  const { children, className, triangleRef = null, ...rest } = props
  return (
    <ul
      className={classnames('dnb-drawer-list__options', className)}
      role="listbox"
      tabIndex="-1"
      {...rest}
      ref={ref}
    >
      {children}
      <li
        className="dnb-drawer-list__triangle"
        aria-hidden
        ref={triangleRef}
      ></li>
    </ul>
  )
})
DrawerList.List.displayName = 'DrawerList.List'
DrawerList.List.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  triangleRef: PropTypes.object
}
DrawerList.List.defaultProps = {
  children: null,
  className: null,
  triangleRef: null
}

// DrawerList Item
DrawerList.Item = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    on_click,
    selected,
    active,
    value,
    ...rest
  } = props

  const params = {}
  if (selected) {
    params['aria-current'] = true // has best support on NVDA
    params['aria-selected'] = true // has best support on VO
  }

  if (on_click) {
    params.onClick = () =>
      dispatchCustomElementEvent(
        { props: { ...props, displayName: DrawerList.Item.displayName } },
        'on_click',
        {
          selected,
          value,
          ...rest
        }
      )
  }

  return (
    <li
      className={classnames(
        className,
        'dnb-drawer-list__option',
        selected && 'dnb-drawer-list__option--selected',
        active && 'dnb-drawer-list__option--focus'
      )}
      role="option"
      aria-selected="false"
      tabIndex="-1"
      {...rest}
      {...params}
      ref={ref}
    >
      <span className="dnb-drawer-list__option__inner">
        <ItemContent>{children}</ItemContent>
      </span>
    </li>
  )
})
DrawerList.Item.displayName = 'DrawerList.Item'
DrawerList.Item.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object
  ]),
  className: PropTypes.string,
  on_click: PropTypes.func,
  selected: PropTypes.bool,
  active: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DrawerList.Item.defaultProps = {
  children: null,
  className: null,
  on_click: null,
  selected: null,
  active: null,
  value: null
}

const ItemContent = ({ children }) => {
  if (Array.isArray(children.content)) {
    return children.content.map((item, n) => (
      <span key={n} className="dnb-drawer-list__option__item">
        {children.render ? children.render(item) : item}
      </span>
    ))
  }

  if (children.content) {
    return children.render
      ? children.render(children.content)
      : children.content
  }

  return children
}
ItemContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object
  ]).isRequired
}

export function grabStringFromReact(cur) {
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
