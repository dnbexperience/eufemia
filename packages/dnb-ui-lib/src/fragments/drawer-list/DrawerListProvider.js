/**
 * Web DrawerList Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  roundToNearest,
  isInsideScrollView,
  detectOutsideClick,
  getPreviousSibling,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import {
  getOffsetTop,
  getOffsetLeft,
  hasSelectedText
} from '../../shared/helpers'
import {
  getData,
  normalizeData,
  findClosest,
  getSelectedItemValue,
  parseContentTitle,
  getEventData,
  prepareStartupState,
  prepareDerivedState
} from './DrawerListHelpers'
import DrawerListContext from './DrawerListContext'
import {
  disableBodyScroll,
  enableBodyScroll
} from '../../shared/libs/bodyScrollLock'

const propTypes = {
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  // align_drawer: PropTypes.oneOf(['left', 'right']),
  wrapper_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node
  ]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skip_keysearch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  use_drawer_on_mobile: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  enable_body_lock: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  page_offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  observer_element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  enable_closest_observer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  // align_drawer: null,
  wrapper_element: null,
  prevent_close: false,
  keep_open: false,
  prevent_focus: false,
  skip_keysearch: false,
  use_drawer_on_mobile: null,
  enable_body_lock: null,
  page_offset: null,
  observer_element: null,
  enable_closest_observer: null,
  opened: null,
  scrollable: null,
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

    this._refRoot = React.createRef()
    this._refShell = React.createRef()
    this._refUl = React.createRef()
    this._refTriangle = React.createRef()
  }

  // NB: Not sure if this is needed anymore!
  componentDidMount() {
    if (this.state.opened) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    clearTimeout(this._showTimeout)
    clearTimeout(this._outsideClickTimeout)
    clearTimeout(this._hideTimeout)
    clearTimeout(this._selectTimeout)
    clearTimeout(this._scrollTimeout)
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

  refreshScrollObserver() {
    if (typeof window === 'undefined' || !this._refUl.current) {
      return
    }

    this.itemSpots = this.state.data.reduce((acc, cur, i) => {
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

    this.itemSpotsCount = Object.keys(this.itemSpots).length
  }

  setScrollObserver() {
    if (
      !isTrue(this.props.enable_closest_observer) ||
      typeof window === 'undefined' ||
      !this._refUl.current
    ) {
      return
    }

    this.removeScrollObserver()
    this.itemSpotsCount = 1 // to make sure we recalculate the spots

    try {
      let closestToTop = null,
        closestToBottom = null,
        tmpToTop,
        tmpToBottom

      this.setOnScroll = () => {
        if (!this._refUl.current) {
          return // stop here
        }

        // recalculate the spots
        if (this.itemSpotsCount <= 1) {
          this.refreshScrollObserver()
        }

        const counts = Object.keys(this.itemSpots)
        closestToBottom = findClosest(
          counts,
          this._refUl.current.scrollTop + this._refUl.current.offsetHeight
        )
        closestToTop = findClosest(counts, this._refUl.current.scrollTop)
        if (this.itemSpots[closestToTop] && closestToTop !== tmpToTop) {
          this.setState({
            closestToTop: this.itemSpots[closestToTop].i,
            _listenForPropChanges: false
          })
        }
        // we do this because we want the arrow
        // to change visually
        if (
          closestToBottom !== tmpToBottom &&
          this.itemSpots[closestToBottom]
        ) {
          this.setState({
            closestToBottom: this.itemSpots[closestToBottom].i,
            _listenForPropChanges: false
          })
        }
        tmpToTop = closestToTop
        tmpToBottom = closestToBottom
      }

      this._refUl.current.addEventListener('scroll', this.setOnScroll)
      this.setOnScroll()
    } catch (e) {
      warn('List could not set onScroll:', e)
    }
  }

  removeScrollObserver() {
    if (typeof window !== 'undefined' && this.setOnScroll) {
      window.removeEventListener('resize', this.setOnScroll)
      this.setOnScroll = null
    }
  }

  enableBodyLock = () => {
    if (this._refUl.current) {
      this._bodyLockIsEnabled = true
      disableBodyScroll(this._refUl.current)
    }
  }

  disableBodyLock = () => {
    if (this._bodyLockIsEnabled && this._refUl.current) {
      this._bodyLockIsEnabled = null
      enableBodyScroll(this._refUl.current)
    }
  }

  setDirectionObserver() {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !(this.state.wrapper_element || this._refRoot.current)
    ) {
      return
    }

    const {
      enable_body_lock,
      use_drawer_on_mobile,
      scrollable,
      min_height,
      max_height,
      on_resize,
      page_offset,
      observer_element
    } = this.props

    // const skipPortal = isTrue(skip_portal)
    const useBodyLock = isTrue(enable_body_lock)
    const useDrawer = isTrue(use_drawer_on_mobile)
    const isScrollable = isTrue(scrollable)
    const customMinHeight = parseFloat(min_height) * 16
    const customMaxHeight = parseFloat(max_height) || 0

    let customElem =
      typeof observer_element === 'string'
        ? document.querySelector(observer_element)
        : null

    if (!customElem) {
      customElem = isInsideScrollView(this._refRoot.current, true)
    }

    // In case we have one before hand
    this.removeDirectionObserver()

    const directionOffset = 96
    const spaceToTopOffset = 2 * 16
    const spaceToBottomOffset = 2 * 16
    const elem = this.state.wrapper_element || this._refRoot.current

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
          Math.max(spaceToBottom - directionOffset, directionOffset) <
            customMinHeight && spaceToTop > customMinHeight
            ? 'top'
            : 'bottom'

        // make sure we never get higher than we have defined in CSS
        let max_height = customMaxHeight
        if (!(max_height > 0)) {
          max_height =
            direction === 'top'
              ? spaceToTop -
                ((this.state.wrapper_element || this._refRoot.current)
                  .offsetHeight || 0) -
                spaceToTopOffset
              : spaceToBottom - spaceToBottomOffset

          // get the view port height, like in CSS
          let vh = 0
          if (typeof window.visualViewport !== 'undefined') {
            vh = window.visualViewport.height
          } else {
            vh = Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0
            )
          }

          // like defined in CSS
          vh = vh * (isScrollable ? 0.7 : 0.9)

          if (max_height > vh) {
            max_height = vh
          }

          // convert px to rem
          max_height = roundToNearest(max_height, 8) / 16
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
        warn('List could not set onResize:', e)
      }
    }

    // debounce
    this.setDirection = (e) => {
      clearTimeout(this._ddt)
      this._ddt = setTimeout(renderDirection, 30)

      if (useDrawer && e.type === 'resize') {
        if (
          !this._bodyLockIsEnabled &&
          // Like @media screen and (max-width: 40em) { ...
          (window.innerWidth / 16 <= 40 || window.innerHeight / 16 <= 40)
        ) {
          this.enableBodyLock()
        } else if (this._bodyLockIsEnabled && !useBodyLock) {
          this.disableBodyLock()
        }
      }

      if (e.type === 'resize') {
        this.correctHiddenView()
      }
    }

    // customElem can be a modal etc.
    this._rootElem = customElem || window
    this._rootElem.addEventListener('scroll', this.setDirection)

    // this fixes iOS softkeyboard
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener('scroll', this.setDirection)
      window.visualViewport.addEventListener('resize', this.setDirection)
    } else {
      window.addEventListener('resize', this.setDirection)
    }

    // wait unitl render is complete and we have a valid this._refUl.current
    this._ddt = setTimeout(() => {
      if (
        useBodyLock ||
        (useDrawer && // Like @media screen and (max-width: 40em) { ...
          (window.innerWidth / 16 <= 40 || window.innerHeight / 16 <= 40))
      ) {
        this.enableBodyLock()
      }

      this.correctHiddenView()
      this.setScrollObserver() // because, now we have _refUl!
      // setTimeout(() => {
      //   this.refreshScrollObserver()
      // }, 1)

      const { selected_item, active_item } = this.state
      this.scrollToAndSetActiveItem(
        parseFloat(active_item) > -1 ? active_item : selected_item,
        {
          scrollTo: false
        }
      )
    }, 1)

    renderDirection()
  }

  correctHiddenView() {
    // We use "style.transform", because it is a independent "and quick" solution
    // we could send down spaceToLeft and spaceToRight and set it with React's "style" prop in future
    try {
      const spaceToLeft = getOffsetLeft(this._refUl.current)
      const spaceToRight =
        window.innerWidth -
        (getOffsetLeft(this._refUl.current) +
          this._refUl.current.offsetWidth)

      // correct left side
      if (spaceToLeft < 0) {
        this._refShell.current.style.transform = `translateX(${Math.abs(
          spaceToLeft
        )}px)`
        this._refTriangle.current.style.transform = `translateX(${spaceToLeft}px)`

        // correct right side
      } else if (spaceToRight < 0) {
        this._refShell.current.style.transform = `translateX(${spaceToRight}px)`
        this._refTriangle.current.style.transform = `translateX(${-spaceToRight}px)`
      } else {
        if (this._refShell.current.style.transform) {
          this._refShell.current.style.transform = ''
          this._refTriangle.current.style.transform = ''
        }
      }
    } catch (e) {
      //
    }
  }

  // this gives us the possibility to quickly search for an item
  // by simply pressing any alfabetic key
  findItemByValue(value) {
    if (isTrue(this.props.skip_keysearch)) {
      return
    }

    let index = -1

    try {
      value = String(value).toLowerCase()

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
      warn('List could not findItemByValue:', e)
    }

    return index
  }

  scrollToItem = (active_item, { scrollTo = true } = {}) => {
    clearTimeout(this._scrollTimeout)
    this._scrollTimeout = setTimeout(() => {
      // try to scroll to item
      if (this._refUl.current && parseFloat(active_item) > -1) {
        try {
          const ulElement = this._refUl.current
          const liElement = this.getActiveElement()
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
          warn('List could not scroll into element:', e)
        }
      }
    }, 1) // to make sure we are after all DOM updates, else we don't get this scrolling
  }

  scrollToAndSetActiveItem = (
    active_item,
    { fireSelectEvent = false, scrollTo = true, event = null } = {}
  ) => {
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
                data: getEventData(active_item, this.state.data),
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
    this.disableBodyLock()

    clearTimeout(this._ddt)
    if (typeof window !== 'undefined' && this.setDirection) {
      this._rootElem?.removeEventListener('scroll', this.setDirection)

      // this fixes iOS softkeyboard
      if (typeof window.visualViewport !== 'undefined') {
        window.visualViewport.removeEventListener(
          'scroll',
          this.setDirection
        )
        window.visualViewport.removeEventListener(
          'resize',
          this.setDirection
        )
      } else {
        window.removeEventListener('resize', this.setDirection)
      }

      this.setDirection = null
    }
  }

  // NB: from v7, CSS is resolving the positioning (deprecated)
  // setTrianglePosition = () => {
  //   if (!this._refTriangle.current) {
  //     return
  //   }
  //   // do not change the triangle on popup mode
  //   if (isTrue(this.props.prevent_selection)) {
  //     return
  //   }

  //   try {
  //     const width = this._refUl.current.offsetWidth
  //     if (parseFloat(width) > 0) {
  //       const { align_drawer } = this.props
  //       const { triangle_position } = this.state
  //       switch (align_drawer) {
  //         case 'left':
  //         default:
  //           if (triangle_position !== 'left') {
  //             this._refTriangle.current.style.left = `${width / 16 - 3}rem` // -3rem
  //           }
  //           break
  //         case 'right':
  //           if (triangle_position === 'left') {
  //             this._refTriangle.current.style.left = 'auto'
  //             this._refTriangle.current.style.right = `${
  //               width / 16 - 3
  //             }rem` // -3rem
  //           }
  //           break
  //       }
  //     }
  //   } catch (e) {
  //     warn(e)
  //   }
  // }

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

  onKeyUpHandler = () => {
    this.currentKey = null
  }

  onKeyDownHandler = (e) => {
    const key = keycode(e)

    // to allow copy keycode
    if (
      this.currentKey &&
      /command|alt|shift|ctrl/.test(this.currentKey)
    ) {
      return // stop here
    }
    this.currentKey = key

    // stop here if the focus is not set
    // and the drawer is opened by default
    if (
      isTrue(this.props.prevent_close)
      // TODO: Has to be worked on better!
      // !isTrue(this.props.prevent_focus)
    ) {
      const isSameDrawer =
        typeof document !== 'undefined' &&
        getPreviousSibling('dnb-drawer-list', document.activeElement) ===
          this._refRoot.current
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
        {
          e.preventDefault()
          active_item = this.getPrevActiveItem()
          if (isNaN(active_item)) {
            active_item = this.getFirstItem() || 0
          }
        }
        break

      case 'down':
        {
          e.preventDefault()
          const activeItem = this.getCurrentActiveItem()
          if (active_item === -1 || isNaN(activeItem)) {
            active_item = this.getFirstItem() || 0
          } else {
            active_item = this.getNextActiveItem()
          }
        }
        break

      case 'page up':
      case 'home':
        {
          e.preventDefault()
          active_item = this.getFirstItem() || 0
        }
        break

      case 'page down':
      case 'end':
        {
          e.preventDefault()
          active_item = this.getLastItem()
          if (isNaN(active_item)) {
            active_item = total
          }
        }
        break

      case 'enter':
      case 'space':
        {
          active_item = this.getCurrentActiveItem()
          if (
            isTrue(this.props.skip_keysearch)
              ? active_item > -1 && key !== 'space'
              : true
          ) {
            e.preventDefault()
            this.selectItem(active_item, {
              fireSelectEvent: true,
              event: e
            })
          }
        }
        break

      case 'esc':
        {
          e.preventDefault() // on edge, we need this prevent to not loose focus after close
          this.setHidden()
        }
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
      'li.dnb-drawer-list__option.first-of-type' // because of the triangle element
    )
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  getLastItem = () => {
    const elem = this._refUl.current?.querySelector(
      'li.dnb-drawer-list__option.last-of-type' // because of the triangle element
    )
    return parseFloat(elem && elem.getAttribute('data-item'))
  }

  setOutsideClickObserver = () => {
    this.removeOutsideClickObserver()

    clearTimeout(this._outsideClickTimeout)
    this._outsideClickTimeout = setTimeout(() => {
      this.outsideClick = detectOutsideClick(
        [
          this.state.wrapper_element,
          this._refRoot.current,
          this._refUl.current
        ],
        this.setHidden // hide if document.activeElement is not inside our elements
      )
    }, 1) // delay so we get a proper this._refUl.current used in setOutsideClickObserver

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler)
      document.addEventListener('keyup', this.onKeyUpHandler)
    }
  }

  removeOutsideClickObserver() {
    if (this.outsideClick) {
      this.outsideClick.remove()
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
      document.removeEventListener('keyup', this.onKeyUpHandler)
    }
  }

  assignObservers = () => {
    // this is the one which will be visible, so we depend on the _refUl
    if (
      !this._refUl.current ||
      (this._refUl.current && !this.hasObservers)
    ) {
      // this.setTrianglePosition() // deprecated
      this.setDirectionObserver()
      this.setScrollObserver()
      this.setOutsideClickObserver()
      this.hasObservers = true
    }
  }

  setVisible = () => {
    if (this.state.opened && this.state.hidden === false) {
      this.assignObservers()
      return
    }

    clearTimeout(this._hideTimeout)
    this.searchCache = null

    this.setState(
      {
        hidden: false,
        opened: true,
        _listenForPropChanges: false
      },
      () => {
        this.setWrapperElement()
        this.assignObservers()
      }
    )

    const { selected_item } = this.state
    dispatchCustomElementEvent(this.state, 'on_show', {
      data: getEventData(selected_item, this.state.data),
      attributes: this.attributes
    })
  }

  setHidden = (args = {}, onStateComplete = null) => {
    if (!this.state.opened || isTrue(this.props.prevent_close)) {
      if (typeof onStateComplete === 'function') {
        onStateComplete()
      }
      return
    }

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

    this.hasObservers = false
    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()

    dispatchCustomElementEvent(this.state, 'on_hide', {
      ...args,
      data: getEventData(this.state.selected_item, this.state.data),
      attributes: this.attributes
    })
  }

  setDataHandler = (
    data,
    cb = null,
    { overwriteOriginalData = false } = {}
  ) => {
    if (!data) {
      return
    }

    if (typeof data === 'function') {
      data = getData(data)
    }

    data = normalizeData(data)

    this.setState(
      {
        data,
        original_data: overwriteOriginalData
          ? data
          : this.state.original_data,
        _listenForPropChanges: false
      },
      () => {
        this.refreshScrollObserver()
        typeof cb === 'function' && cb(data)
      }
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

    const data = getEventData(itemToSelect, this.state.data)
    const value = getSelectedItemValue(itemToSelect, this.state)
    const attributes = this.attributes
    const attr = {
      selected_item: itemToSelect,
      value,
      data,
      event,
      attributes
    }

    const res = dispatchCustomElementEvent(
      this.state,
      'on_pre_change',
      attr
    )

    if (res === false || hasSelectedText()) {
      return // stop here
    }

    const doCallOnChange = this.state.selected_item !== itemToSelect
    const onSelectionIsComplete = () => {
      const delayHandler = () => {
        if (doCallOnChange) {
          dispatchCustomElementEvent(this.state, 'on_change', attr)
        }
        if (fireSelectEvent) {
          dispatchCustomElementEvent(this.state, 'on_select', {
            ...attr,
            active_item: itemToSelect
          })
        }

        const { keep_open } = this.props
        if (!isTrue(keep_open)) {
          this.setHidden()
        }
      }

      if (isTrue(this.props.no_animation)) {
        delayHandler()
      } else {
        clearTimeout(this._selectTimeout)
        this._selectTimeout = setTimeout(
          delayHandler,
          DrawerListProvider.blurDelay / 2
        ) // only for the user experience
      }
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
            _refRoot: this._refRoot,
            _refShell: this._refShell,
            _refUl: this._refUl,
            _refTriangle: this._refTriangle,
            _rootElem: this._rootElem,
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
