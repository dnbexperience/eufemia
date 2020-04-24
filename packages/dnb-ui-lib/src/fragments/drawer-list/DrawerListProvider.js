/**
 * Web DrawerList Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Context from '../../shared/Context'
import {
  isTrue,
  detectOutsideClick,
  getPreviousSibling,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'
import {
  getData,
  findClosest,
  getSelectedItemValue,
  parseContentTitle,
  getCurrentData,
  prepareStartupState,
  prepareDerivedState
} from './DrawerListHelpers'
import DrawerListContext from './DrawerListContext'

const propTypes = {
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  align_drawer: PropTypes.oneOf(['left', 'right']),
  wrapper_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node
  ]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skip_keysearch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  page_offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  observer_element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  min_height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max_height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  on_resize: PropTypes.func,

  // React
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ])
}
const defaultProps = {
  no_animation: false,
  prevent_selection: false,
  direction: 'auto',
  align_drawer: null,
  wrapper_element: null,
  prevent_close: false,
  keep_open: false,
  prevent_focus: false,
  skip_keysearch: false,
  page_offset: null,
  observer_element: null,
  opened: null,
  min_height: 10, // 10rem = 10x16=160,
  max_height: null,
  on_resize: null,

  // React props
  children: null
}

export default class DrawerListProvider extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static blurDelay = 201 // some ms more than "DrawerListSlideDown 200ms"

  static getDerivedStateFromProps(props, state) {
    return prepareDerivedState(props, state)
  }

  constructor(props) {
    super(props)

    this.attributes = {}
    this.state = {
      tagName: 'dnb-drawer-list',
      cache_hash: '',
      active_item: null,
      selected_item: null,
      ignore_events: false,
      ...prepareStartupState(props),
      _listenForPropChanges: true
    }

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

    // NB: do not use setHidden here
    this.setState({
      opened: false,
      _listenForPropChanges: false
    })
    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()
  }

  setScrollObserver() {
    if (typeof window === 'undefined' || !this._refUl.current) {
      return
    }
    this.removeScrollObserver()

    try {
      const itemSpots = this.state.data.reduce((acc, cur, i) => {
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
        if (
          closestToBottom !== tmpToBottom &&
          itemSpots[closestToBottom]
        ) {
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
      typeof document === 'undefined' ||
      !(this.state.wrapper_element || this._refShell.current)
    ) {
      return
    }

    const {
      min_height,
      max_height,
      on_resize,
      page_offset,
      observer_element
    } = this.props
    const customMinHeight = parseFloat(min_height) * 16
    const customMaxHeight = parseFloat(max_height) || 0

    let customElem =
      typeof observer_element === 'string'
        ? document.querySelector(observer_element)
        : null
    if (!customElem) {
      customElem = getPreviousSibling(
        'dnb-modal__content__inner',
        this._refShell.current
      )
    }

    // In case we have one before hand
    this.removeDirectionObserver()

    const spaceToTopOffset = 4 * 16 //because of headers
    const spaceToBottomOffset = 2 * 16
    const elem = this.state.wrapper_element || this._refShell.current

    const renderDirection = () => {
      try {
        // make calculation for both direction and height
        const rootElem = customElem || document.documentElement

        const pageYOffset = !isNaN(parseFloat(page_offset))
          ? parseFloat(page_offset)
          : rootElem.scrollTop /* pageYOffset */
        const spaceToTop =
          getOffsetTop(elem) + elem.offsetHeight - pageYOffset
        const spaceToBottom =
          rootElem.clientHeight /* innerHeight */ -
          (getOffsetTop(elem) + elem.offsetHeight) +
          pageYOffset

        const direction =
          spaceToBottom < customMinHeight && spaceToTop > customMinHeight
            ? 'top'
            : 'bottom'

        // and calc the max_height if not set
        let max_height = customMaxHeight
        if (!(parseFloat(max_height) > 0)) {
          max_height =
            (direction === 'top'
              ? spaceToTop -
                ((this.state.wrapper_element || this._refShell.current)
                  .offsetHeight || 0) -
                spaceToTopOffset
              : spaceToBottom - spaceToBottomOffset) / 16 // calc to rem
        }

        // update the states
        if (this.props.direction === 'auto') {
          this.setState({
            direction,
            _listenForPropChanges: false
          })
        }
        this.setState({
          max_height,
          _listenForPropChanges: false
        })

        // call the event, if set
        if (on_resize) {
          dispatchCustomElementEvent(this.state, 'on_resize', {
            direction,
            max_height
          })
        }
      } catch (e) {
        console.warn('List could not set onResize:', e)
      }
    }

    // debounce
    this.setDirection = () => {
      clearTimeout(this._ddt)
      this._ddt = setTimeout(renderDirection, 30)
    }

    const rootElem = customElem || window
    rootElem.addEventListener('scroll', this.setDirection)
    window.addEventListener('resize', this.setDirection)

    renderDirection()
  }

  // this gives us the possibility to quickly search for an item
  // by simply pressing any alfabetic key
  findItemByValue(value) {
    if (isTrue(this.props.skip_keysearch)) {
      return
    }

    let index = -1

    try {
      value = value.toLowerCase()
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
            parseContentTitle(itemData, {
              separator: ' ',
              removeNumericOnlyValues: true
            })
          )

          // take the first letter
          const firstLetter = String(str[0]).toLowerCase()
          acc[firstLetter] = acc[firstLetter] || []
          acc[firstLetter].push({
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

  scrollToItem = (active_item, { scrollTo = true } = {}) => {
    // try to scroll to item
    if (this._refUl.current && parseFloat(active_item) > -1) {
      try {
        const ulElement = this._refUl.current
        const liElement = ulElement.querySelector(
          `li.dnb-drawer-list__option:nth-of-type(${
            parseFloat(active_item) + 1
          })`
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
    }
  }

  scrollToAndSetActiveItem = (
    active_item,
    { fireSelectEvent = false, scrollTo = true, event = null } = {}
  ) => {
    clearTimeout(this._focusTimeout)

    if (parseFloat(active_item) > -1) {
      this.setState(
        {
          active_item,
          _listenForPropChanges: false
        },
        () => {
          const { selected_item } = this.state

          if (fireSelectEvent) {
            const attributes = this.attributes
            const ret = dispatchCustomElementEvent(
              this.state,
              'on_select',
              {
                active_item,
                value: getSelectedItemValue(selected_item, this.state),
                data: getCurrentData(active_item, this.state.data),
                event,
                attributes
              }
            )
            if (ret === false) {
              return // stop here!
            }
          }

          this.scrollToItem(active_item, { scrollTo })
        }
      )
    } else if (!isTrue(this.props.prevent_focus)) {
      if (this._refUl.current) {
        this._refUl.current.focus({ preventScroll: true })
      }
    }
  }

  removeDirectionObserver() {
    if (typeof window !== 'undefined' && this.setDirection) {
      window.removeEventListener('resize', this.setDirection)
      window.removeEventListener('scroll', this.setDirection)
    }
  }

  setTrianglePosition = () => {
    if (!this._refTriangle.current) {
      return
    }
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
        const { align_drawer } = this.props
        const { triangle_position } = this.state
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
              this._refTriangle.current.style.right = `${
                width / 16 - 3
              }rem` // -3rem
            }
            break
        }
      }
    } catch (e) {
      console.warn(e)
    }
  }

  setWrapperElement = (wrapper_element = this.props.wrapper_element) => {
    if (
      // !this.state.wrapper_element &&
      typeof wrapper_element === 'string' &&
      typeof document !== 'undefined'
    ) {
      wrapper_element = document.querySelector(wrapper_element)
    }
    if (wrapper_element) {
      this.setState({
        wrapper_element,
        _listenForPropChanges: false
      })
    }

    return this
  }

  onKeyDownHandler = (e) => {
    const key = keycode(e)

    // stop here if the focus is not set
    // and the drawer is opened by default
    if (
      isTrue(this.props.prevent_close)
      // TODO: Has to be checkotu out better!
      //  &&
      // !isTrue(this.props.prevent_focus)
    ) {
      const isSameDrawer =
        typeof document !== 'undefined' &&
        getPreviousSibling('dnb-drawer-list', document.activeElement) ===
          this._refShell.current
      if (!isSameDrawer || key === 'tab') {
        return
      }
    }

    if (isTrue(this.state.ignore_events) && key !== 'tab') {
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
      this.scrollToAndSetActiveItem(active_item, {
        fireSelectEvent: true,
        event: e
      })
    }
  }

  getSelectedElement = () => {
    return (
      this._refUl.current?.querySelector(
        'li.dnb-drawer-list__option--selected'
      ) ||
      this._refUl.current || {
        getAttribute: () => null
      }
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

        const { selected_item, active_item } = this.state

        this.scrollToAndSetActiveItem(
          parseFloat(active_item) > -1 ? active_item : selected_item,
          {
            scrollTo: false
          }
        )

        dispatchCustomElementEvent(this.state, 'on_show', {
          data: getCurrentData(selected_item, this.state.data),
          attributes: this.attributes
        })
      }
    )
  }

  setHidden = (args = {}, onStateComplete = null) => {
    if (!this.state.opened || isTrue(this.props.prevent_close)) {
      if (typeof onStateComplete === 'function') {
        onStateComplete()
      }
      return
    }

    clearTimeout(this._focusTimeout)
    clearTimeout(this._hideTimeout)

    this.setState(
      {
        opened: false,
        _listenForPropChanges: false
      },
      () => {
        this._hideTimeout = setTimeout(
          () => {
            this.setState({
              hidden: undefined, // only to idendify once we rerender
              _listenForPropChanges: false
            })
            if (typeof onStateComplete === 'function') {
              onStateComplete()
            }
          },
          isTrue(this.props.no_animation)
            ? 1
            : DrawerListProvider.blurDelay
        ) // wait until animation is over
      }
    )

    if (typeof this.modalScrollLock === 'function') {
      this.modalScrollLock()
    }

    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()

    dispatchCustomElementEvent(this.state, 'on_hide', {
      ...args,
      data: getCurrentData(this.state.selected_item, this.state.data),
      attributes: this.attributes
    })
  }

  setDataHandler = (data, cb, { overwriteOriginalData = false } = {}) => {
    if (!data) {
      return
    }

    if (typeof data === 'function') {
      data = getData(data)
    }

    this.setState(
      {
        data,
        original_data:
          !overwriteOriginalData && this.state.original_data
            ? this.state.original_data
            : data,
        _listenForPropChanges: false
      },
      cb
    )

    return this
  }

  setStateHandler = (state, cb = null) => {
    this.setState(
      {
        ...state,
        _listenForPropChanges: false
      },
      cb
    )

    return this
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

    const doCallOnChange = this.state.selected_item !== itemToSelect

    const onSelectionIsComplete = () => {
      const attributes = this.attributes
      if (doCallOnChange) {
        dispatchCustomElementEvent(this.state, 'on_change', {
          selected_item: itemToSelect,
          value: getSelectedItemValue(itemToSelect, this.state),
          data: getCurrentData(itemToSelect, this.state.data),
          event,
          attributes
        })
      }
      if (fireSelectEvent) {
        dispatchCustomElementEvent(this.state, 'on_select', {
          selected_item: itemToSelect,
          active_item: itemToSelect,
          value: getSelectedItemValue(itemToSelect, this.state),
          data: getCurrentData(itemToSelect, this.state.data),
          event,
          attributes
        })
      }

      clearTimeout(this._selectTimeout)
      this._selectTimeout = setTimeout(
        () => {
          if (!isTrue(this.props.keep_open)) {
            this.setHidden({ setFocus: true })
          }
        },
        isTrue(this.props.no_animation)
          ? 1
          : DrawerListProvider.blurDelay / 2
      ) // only for the user experience
    }

    if (isTrue(this.props.prevent_selection)) {
      onSelectionIsComplete()
    } else {
      this.setState(
        {
          _listenForPropChanges: false,
          selected_item: itemToSelect,
          active_item: itemToSelect
        },
        onSelectionIsComplete
      )
    }
  }

  render() {
    const { children } = this.props
    const { opened, hidden } = this.state

    if (
      this.props.opened !== null &&
      isTrue(this.props.opened) &&
      opened === false &&
      typeof hidden === 'undefined'
    ) {
      clearTimeout(this._showTimeout)
      this._showTimeout = setTimeout(this.setVisible, 1)
      return null
    }
    if (
      this.props.opened !== null &&
      isTrue(this.props.opened) === false &&
      opened === true &&
      hidden === false
    ) {
      clearTimeout(this._hideTimeout)
      this._hideTimeout = setTimeout(this.setHidden, 1)
      return null
    }

    return (
      <DrawerListContext.Provider
        value={{
          ...this.context,
          drawerList: {
            attributes: this.attributes,
            _refShell: this._refShell,
            _refUl: this._refUl,
            _refTriangle: this._refTriangle,
            setData: this.setDataHandler,
            setState: this.setStateHandler,
            setWrapperElement: this.setWrapperElement,
            setVisible: this.setVisible,
            setHidden: this.setHidden,
            selectItem: this.selectItem,
            scrollToItem: this.scrollToItem,
            scrollToAndSetActiveItem: this.scrollToAndSetActiveItem,
            ...this.state
          }
        }}
      >
        {children}
      </DrawerListContext.Provider>
    )
  }
}
