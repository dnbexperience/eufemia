/**
 * Web DrawerList Provider
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  roundToNearest,
  getClosestScrollViewElement,
  detectOutsideClick,
  dispatchCustomElementEvent,
  getClosestParent,
  keycode,
  DetectOutsideClickClass,
} from '../../shared/component-helper'
import {
  getOffsetTop,
  getOffsetLeft,
  hasSelectedText,
  getSelectedElement as getSelectedTextElement,
} from '../../shared/helpers'
import {
  getData,
  normalizeData,
  findClosest,
  getSelectedItemValue,
  parseContentTitle,
  getEventData,
  prepareStartupState,
  prepareDerivedState,
  drawerListDefaultProps,
  drawerListProviderDefaultProps,
} from './DrawerListHelpers'
import DrawerListContext, {
  DrawerListContextState,
} from './DrawerListContext'
import {
  disableBodyScroll,
  enableBodyScroll,
} from '../../components/modal/bodyScrollLock'

import type { SpacingProps } from '../../shared/types'
import type { DrawerListProps } from './DrawerList'

export type DrawerListProviderProps = Omit<DrawerListProps, 'children'> &
  Omit<React.HTMLProps<HTMLElement>, 'data' | 'role' | 'size' | 'value'> &
  SpacingProps & {
    hasFocusOnElement?: boolean
    setData?: (
      data: any,
      cb?: any,
      {
        overwriteOriginalData,
      }?: {
        overwriteOriginalData?: boolean
      }
    ) => DrawerListProvider
    setState?: (state: any, cb?: any) => void
    setWrapperElement?: (
      wrapper_element?: string | HTMLElement
    ) => DrawerListProvider
    setHidden?: (args?: any[], onStateComplete?: any) => void
    selectItemAndClose?: (
      itemToSelect: any,
      args?: {
        fireSelectEvent?: boolean
        event: any
      }
    ) => any
    selected_item?: string | number
    active_item?: string | number
    showFocusRing?: boolean
    closestToTop?: string
    closestToBottom?: string
    skipPortal?: boolean
    addObservers?: () => void
    removeObservers?: () => void
    setVisible?: (
      args?: Record<string, any>,
      onStateComplete?: any
    ) => void
    toggleVisible?: (...args: any[]) => void
    selectItem?: (
      itemToSelect: any,
      args?: {
        fireSelectEvent?: boolean
        event?: any
        closeOnSelection?: boolean
      }
    ) => any
    scrollToItem?: (
      active_item: any,
      opt?: {
        scrollTo?: boolean
        element?: any
      }
    ) => void
    setActiveItemAndScrollToIt?: (
      active_item: any,
      args?: {
        fireSelectEvent?: boolean
        scrollTo?: boolean
        event?: any
      }
    ) => void
    _refShell?: React.RefObject<HTMLSpanElement>
    _refTriangle?: React.RefObject<HTMLLIElement & HTMLSpanElement>
    _refUl?: React.RefObject<HTMLUListElement>
    _refRoot?: React.RefObject<HTMLSpanElement>
    _rootElem?: Window | Element
    attributes?: Record<string, any>
    children: React.ReactNode
  }

export default class DrawerListProvider extends React.PureComponent<
  DrawerListProviderProps,
  DrawerListContextState
> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  static defaultProps = {
    ...drawerListDefaultProps,
    ...drawerListProviderDefaultProps,
  }

  static blurDelay = 201 // some ms more than "DrawerListSlideDown 200ms"

  static isOpen: boolean

  static getDerivedStateFromProps(props, state) {
    return prepareDerivedState(props, state)
  }

  attributes: object
  _refRoot: React.RefObject<HTMLSpanElement>
  _refShell: React.RefObject<HTMLSpanElement>
  _refUl: React.RefObject<HTMLUListElement>
  _refTriangle: React.RefObject<HTMLLIElement & HTMLSpanElement>

  _showTimeout: NodeJS.Timeout
  _hideTimeout: NodeJS.Timeout
  _scrollTimeout: NodeJS.Timeout
  _directionTimeout: NodeJS.Timeout

  itemSpots: { [customProperty: number]: { id: string } }
  itemSpotsCount: number
  setOnScroll: () => void
  _bodyLockIsEnabled: boolean
  setDirection: () => void
  _rootElem: Window | Element
  changedOrderFor: string
  searchCache: Record<string, { i: number }[]>
  meta: {
    cmd: any
    ctrl: any
    shift: any
    alt: any
  }
  outsideClick: DetectOutsideClickClass

  constructor(props) {
    super(props)

    this.attributes = {}
    this.state = {
      cache_hash: '',
      active_item: undefined,
      selected_item: undefined,
      ignore_events: false,
      ...prepareStartupState(props),
    }

    this._refRoot = React.createRef()
    this._refShell = React.createRef()
    this._refUl = React.createRef()
    this._refTriangle = React.createRef()
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
      this.setVisible()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.opened !== null &&
      this.props.opened !== prevProps.opened
    ) {
      if (isTrue(this.props.opened)) {
        this.setVisible()
      } else if (isTrue(this.props.opened) === false) {
        this.setHidden()
      }
    }

    if (this.state.opened) {
      if (
        this.props.data !== prevProps.data &&
        typeof document !== 'undefined' &&
        document.activeElement?.tagName === 'BODY'
      ) {
        this._refUl.current?.focus()
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)
    clearTimeout(this._scrollTimeout)
    clearTimeout(this._directionTimeout)

    this.removeObservers()
    this.setActiveState(false)
  }

  refreshScrollObserver() {
    if (typeof window === 'undefined' || !this._refUl.current) {
      return
    }
    const elements = this._refUl.current?.querySelectorAll<HTMLLIElement>(
      `li.dnb-drawer-list__option,li.dnb-drawer-list__group-title`
    )
    this.itemSpots = {}
    elements.forEach((element) => {
      this.itemSpots[element.offsetTop] = {
        id: element.getAttribute('id'),
      }
    })

    this.itemSpotsCount = Object.keys(this.itemSpots).length
  }

  setScrollObserver() {
    if (typeof window === 'undefined' || !this._refUl.current) {
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
        // TODO: BUG: doesn't run when direction changes or when search results change
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
        if (
          this.itemSpots[closestToTop] &&
          this.itemSpots[closestToTop].id !== tmpToTop
        ) {
          tmpToTop = this.itemSpots[closestToTop].id
          this.setState({
            closestToTop: this.itemSpots[closestToTop].id,
          })
        }
        // we do this because we want the arrow
        // to change visually
        if (
          this.itemSpots[closestToBottom] &&
          this.itemSpots[closestToBottom].id !== tmpToBottom
        ) {
          tmpToBottom = this.itemSpots[closestToBottom].id
          this.setState({
            closestToBottom: this.itemSpots[closestToBottom].id,
          })
        }
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
      scrollable,
      min_height,
      max_height,
      on_resize,
      page_offset,
      observer_element,
      direction: directionProp,
    } = this.props

    const useBodyLock = isTrue(enable_body_lock)
    const isScrollable = isTrue(scrollable)
    const customMinHeight = parseFloat(min_height as string) * 16
    const customMaxHeight = parseFloat(max_height as string) || 0

    let customElem =
      typeof observer_element === 'string'
        ? document.querySelector(observer_element)
        : null

    if (!customElem) {
      customElem = getClosestScrollViewElement(this._refRoot.current)
    }

    // In case we have one before hand
    this.removeDirectionObserver()

    const directionOffset = 96
    const spaceToTopOffset = 2 * 16
    const spaceToBottomOffset = 2 * 16
    const elem = this.state.wrapper_element || this._refRoot.current
    const getSpaceToBottom = ({ rootElem, pageYOffset }) => {
      const spaceToBottom =
        rootElem.clientHeight -
        (getOffsetTop(elem) + elem.offsetHeight) +
        pageYOffset

      const html = document.documentElement
      if (spaceToBottom < customMinHeight && rootElem !== html) {
        return getSpaceToBottom({
          rootElem: html,
          pageYOffset,
        })
      }

      return spaceToBottom
    }

    const calculateMaxHeight = () => {
      // make calculation for both direction and height
      const rootElem = customElem || document.documentElement

      const pageYOffset = !isNaN(parseFloat(page_offset as string))
        ? parseFloat(page_offset as string)
        : rootElem.scrollTop
      const spaceToTop =
        getOffsetTop(elem) + elem.offsetHeight - pageYOffset
      const spaceToBottom = getSpaceToBottom({ rootElem, pageYOffset })

      let direction = directionProp
      if (!direction || direction === 'auto') {
        direction =
          Math.max(spaceToBottom - directionOffset, directionOffset) <
            customMinHeight && spaceToTop > customMinHeight
            ? 'top'
            : 'bottom'
      }

      // make sure we never get higher than we have defined in CSS
      let maxHeight = customMaxHeight
      if (!(maxHeight > 0)) {
        if (direction === 'top') {
          maxHeight =
            spaceToTop -
            ((this.state.wrapper_element || this._refRoot.current)
              .offsetHeight || 0) -
            spaceToTopOffset
        }

        if (direction === 'bottom') {
          maxHeight = spaceToBottom - spaceToBottomOffset
        }

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

        if (maxHeight > vh) {
          maxHeight = vh
        }

        // convert px to rem
        maxHeight = roundToNearest(maxHeight, 8) / 16
      }

      return { direction, maxHeight }
    }

    const renderDirection = () => {
      try {
        const { direction, maxHeight: max_height } = calculateMaxHeight()

        // update the states
        if (this.props.direction === 'auto') {
          this.setState({
            direction,
          })
        }
        this.setState({
          max_height,
        })

        // call the event, if set
        if (on_resize) {
          dispatchCustomElementEvent(this.state, 'on_resize', {
            direction,
            max_height,
          })
        }
      } catch (e) {
        warn('List could not set onResize:', e)
      }

      // React v18 needs a delay to make the calculation during first render
      window?.requestAnimationFrame?.(this.correctHiddenView) ||
        this.correctHiddenView()
    }

    // debounce
    this.setDirection = () => {
      clearTimeout(this._directionTimeout)
      this._directionTimeout = setTimeout(renderDirection, 50)
    }

    // customElem can be a dnb-scroll-view
    this._rootElem = customElem || window
    this._rootElem.addEventListener('scroll', this.setDirection)

    // this fixes iOS softkeyboard
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener('scroll', this.setDirection)
      window.visualViewport.addEventListener('resize', this.setDirection)
    } else {
      window.addEventListener('resize', this.setDirection)
    }

    if (useBodyLock) {
      this.enableBodyLock()
    }

    this.refreshScrollObserver()

    renderDirection()
  }

  /**
   * Deprecated
   * We should replace all the logic of handling left/right aligned
   * and setting the position, with a PopupMenu component,
   * which uses the logic form Tooltip.
   *
   * EDS-246
   */
  correctHiddenView = () => {
    // We use "style.transform", because it is a independent "and quick" solution
    // we could send down spaceToLeft and spaceToRight and set it with React's "style" prop in future
    if (!this._refShell.current || !this._refUl.current) {
      return // stop here
    }

    try {
      const spaceToLeft = getOffsetLeft(this._refUl.current)
      const spaceToRight =
        window.innerWidth -
        (getOffsetLeft(this._refUl.current) +
          this._refUl.current.offsetWidth)

      const triangleStyle = this._refTriangle.current.style
      const shellStyle = this._refShell.current.style

      // correct left side
      if (spaceToLeft < 0) {
        shellStyle.transform = `translateX(${Math.abs(
          spaceToLeft / 16
        )}rem)`
        triangleStyle.right = `${Math.abs(spaceToLeft / 16)}rem`

        // correct right side
      } else if (spaceToRight < 0) {
        shellStyle.transform = `translateX(${spaceToRight / 16}rem)`
        triangleStyle.left = `${Math.abs(spaceToRight / 16)}rem`
      } else {
        if (shellStyle.transform) {
          shellStyle.transform = ''
          triangleStyle.left = 'auto'
          triangleStyle.right = 'auto'
        }
      }
    } catch (e) {
      //
    }
  }

  // this gives us the possibility to quickly search for an item
  // by simply pressing any alphabetical key
  findItemByValue(value) {
    if (isTrue(this.props.skip_keysearch)) {
      return
    }

    let index = -1

    try {
      value = String(value).toLowerCase()

      // delete the cache
      // if there are several of the same type
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
              removeNumericOnlyValues: true,
            })
          )

          // take the first letter
          const firstLetter = String(str[0]).toLowerCase()
          acc[firstLetter] = acc[firstLetter] || []
          acc[firstLetter].push({
            i,
          })

          return acc
        }, {})

      const found = this.searchCache[value]
      index = found && found[0] && found[0].i > -1 ? found[0].i : -1

      // if there are several of the same type
      if (found && found.length > 1) {
        found.push(found.shift())
        this.changedOrderFor = value
      }
    } catch (e) {
      warn('List could not findItemByValue:', e)
    }

    return index
  }

  scrollToItem = (
    active_item,
    { scrollTo = true, element = null } = {}
  ) => {
    clearTimeout(this._scrollTimeout)
    this._scrollTimeout = setTimeout(() => {
      // try to scroll to item
      if (this._refUl.current && parseFloat(active_item) > -1) {
        try {
          const ulElement = this._refUl.current
          const liElement =
            element || this.getActiveElement() || this.getSelectedElement()
          if (liElement) {
            const top = liElement.offsetTop
            if (ulElement.scrollTo) {
              if (scrollTo === false || window['IS_TEST']) {
                ulElement.style.scrollBehavior = 'auto'
              }
              ulElement.scrollTo({
                top,
                behavior: scrollTo ? 'smooth' : 'auto',
              })
              if (scrollTo === false) {
                ulElement.style.scrollBehavior = 'smooth'
              }
            } else if (ulElement.scrollTop) {
              ulElement.scrollTop = top
            }

            if (!isTrue(this.props.prevent_focus) && liElement) {
              liElement.focus()
              dispatchCustomElementEvent(this, 'on_show_focus', {
                element: liElement,
              })
            }
          } else {
            warn('The DrawerList item was not a DOM Element')
          }
        } catch (e) {
          warn('List could not scroll into element:', e)
        }
      }
    }, 1) // to make sure we are after all DOM updates, else we don't get this scrolling
  }

  /**
   * During opening (Dropdown, Autocomplete),
   * and if noting is selected,
   * set scroll to item.
   *
   * @param {number} active_item The item to set as active
   * @param {object} param1
   * @property {boolean} fireSelectEvent Whether the onSelect event should get emitted
   * @property {boolean} scrollTo Whether the list should animate the scroll to the new active item or not
   * @property {event} event The event object to forward to the emitted events
   */
  setActiveItemAndScrollToIt = (
    active_item,
    { fireSelectEvent = false, scrollTo = true, event = null } = {}
  ) => {
    this.setState({ active_item }, () => {
      if (parseFloat(active_item) === -1) {
        // Select the first item to NVDA is more easily navigatable,
        // without using the alt + arrow key
        // else we set the focus on the "ul" element
        if (document.activeElement?.tagName !== 'INPUT') {
          this._refUl.current?.focus({ preventScroll: true })
        }

        dispatchCustomElementEvent(this, 'on_show_focus', {
          element: this._refUl.current,
        })
      } else if (parseFloat(active_item) > -1) {
        const { selected_item } = this.state

        if (fireSelectEvent) {
          const attributes = this.attributes
          const ret = dispatchCustomElementEvent(this.state, 'on_select', {
            active_item,
            value: getSelectedItemValue(selected_item, this.state),
            data: getEventData(active_item, this.state.data),
            event,
            attributes,
          })
          if (ret === false) {
            return // stop here!
          }
        }

        if (isTrue(this.props.no_animation)) {
          scrollTo = false
        }

        this.scrollToItem(active_item, { scrollTo })
      }
    })
  }

  removeDirectionObserver() {
    this.disableBodyLock()

    clearTimeout(this._directionTimeout)
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

  setWrapperElement = (wrapper_element = this.props.wrapper_element) => {
    if (typeof wrapper_element === 'string') {
      wrapper_element =
        typeof document !== 'undefined'
          ? document.querySelector<HTMLElement>(wrapper_element)
          : undefined
    }

    if (wrapper_element !== this.state.wrapper_element) {
      this.setState({
        wrapper_element,
      })
    }

    return this
  }

  getAnchorElem(activeElement) {
    try {
      return activeElement?.querySelector('a:first-of-type')
    } catch (e) {
      return null
    }
  }

  setMetaKey = (e) => {
    this.meta = {
      cmd: e.metaKey,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
    }
  }

  onKeyUpHandler = (e) => {
    this.setMetaKey(e)
  }

  onKeyDownHandler = (e) => {
    const key = keycode(e)

    if (/command|alt|shift|ctrl/.test(key)) {
      this.setMetaKey(e)
    }

    dispatchCustomElementEvent(this.state, 'on_key_down', {
      event: e,
      key,
    })

    // To allow copy
    // But makes VO not reading our list items once command key is pressed
    // if (this.meta.cmd || this.meta.ctrl || this.meta.shift || this.meta.alt) {
    //   return // stop here
    // }

    // stop here if the focus is not set
    // and the drawer is opened by default
    if (
      isTrue(this.props.prevent_close)
      // TODO: Has to be worked on better!
      // !isTrue(this.props.prevent_focus)
    ) {
      let isSameDrawer = false
      try {
        const ulElem = getClosestParent(
          'dnb-drawer-list__options',
          document.activeElement
        )

        isSameDrawer =
          ulElem === this._refUl.current ||
          ulElem?.getAttribute('id') === this.state.id
      } catch (e) {
        warn(e)
      }
      if (!isSameDrawer && key !== 'tab') {
        return // stop here
      }
    }

    if (!this.state.isOpen) {
      return // stop here
    }

    if (isTrue(this.state.ignore_events) && key !== 'tab') {
      return // stop here
    }

    let active_item = parseFloat(this.state.active_item as string)

    if (isNaN(active_item)) {
      active_item = -1
    }

    const total = this.state.data && this.state.data.length - 1

    switch (key) {
      case 'up':
        {
          e.preventDefault()

          active_item = this.getPrevActiveItem() ?? this.getLastItem()
        }
        break

      case 'down':
        {
          e.preventDefault()

          active_item = this.getNextActiveItem() ?? this.getFirstItem()
        }
        break

      case 'page up':
      case 'home':
        {
          e.preventDefault()
          active_item = this.getFirstItem() ?? 0
        }
        break

      case 'page down':
      case 'end':
        {
          e.preventDefault()
          active_item = this.getLastItem() ?? total
        }
        break

      case 'enter':
      case 'space':
        {
          if (e.target.tagName === 'A') {
            e.target.dispatchEvent(new MouseEvent('click'))
            this.setHidden()
            return // stop here, and let the browser + anchor do the rest
          }

          active_item =
            this.getCurrentActiveItem() ?? this.getCurrentSelectedItem()

          if (
            isTrue(this.props.skip_keysearch)
              ? active_item > -1 && key !== 'space'
              : true
          ) {
            e.preventDefault()
            const result = this.selectItemAndClose(active_item, {
              fireSelectEvent: true,
              event: e,
            })
            if (result === false) {
              return // stop here if the data actually does not exit
            }
          }
        }
        break

      case 'escape':
      case 'esc':
        {
          this.setHidden({ event: e })
          e.preventDefault()
          e.stopPropagation() // To make Modal/Dialog/Drawer not close as well
        }
        break

      case 'tab':
        {
          if (active_item > -1) {
            // If there is an active item
            // we make it possible to tab inside it (to an anchor) instead of closing the list
            const activeElement = this.getActiveElement()
            const hasFocusOnElement = Boolean(
              this.getAnchorElem(activeElement)
            )

            this.setState({ hasFocusOnElement })

            // And if there is an anchor inside our active element
            if (hasFocusOnElement) {
              e.stopPropagation()

              // Also, set the focus actively into the active element, if it is not from beforehand
              const currentActiveElement = getClosestParent(
                'dnb-drawer-list__option',
                document.activeElement
              )

              if (currentActiveElement !== activeElement) {
                /**
                 * Create an fake element,
                 * so it's the last one we focus, within our active element.
                 *
                 * When the users tabs to it,
                 * we return the focus the users prev focus element, e.g. autocomplete input
                 *
                 * Why is this needed? Because we have our list in a portal, outside of the tab order
                 */
                const createTabElem = () => {
                  try {
                    const elem = document.createElement('BUTTON')
                    elem.setAttribute(
                      'style',
                      'opacity:0;position:absolute;'
                    )
                    const focus = () => {
                      prevActiveElement.focus()
                      elem.removeEventListener('focus', focus)
                      activeElement.removeChild(after)
                      activeElement.removeChild(before)
                    }
                    elem.addEventListener('focus', focus)
                    return elem
                  } catch (e) {
                    //
                  }
                }

                const prevActiveElement =
                  document.activeElement as HTMLElement
                const after = createTabElem()
                const before = createTabElem()

                // Now, focus our active element
                activeElement.focus()

                const insertElem = () => {
                  try {
                    // Insert our fake elements
                    activeElement.appendChild(after)
                    activeElement.insertBefore(
                      before,
                      activeElement.firstChild
                    )
                  } catch (e) {
                    //
                  }
                }

                // check because of test
                if (typeof window.requestAnimationFrame === 'function') {
                  // requestAnimationFrame is need by chromium browsers
                  window.requestAnimationFrame(insertElem)
                } else {
                  insertElem()
                }
              }

              return // stop here
            }

            // We may consider to close the list and set the focus it the handler
            // but also, in portal mode, we want to prevent to start the focus from the top of the page
            else if (isTrue(this.props.prevent_close)) {
              active_item = -1
            }
          }

          this.setHidden({ event: e })
        }
        break

      default:
        {
          const searchIndex = this.findItemByValue(keycode(e))
          if (searchIndex > -1) {
            // Only change position if we find a result
            active_item = searchIndex
          }
        }
        break
    }

    if (
      active_item === -1 &&
      this._refUl.current &&
      typeof document !== 'undefined'
    ) {
      const ulElem = getClosestParent(
        'dnb-drawer-list__options',
        document.activeElement
      )

      if (ulElem === this._refUl.current) {
        this.setState({
          showFocusRing: true,
          active_item,
        })

        this._refUl.current.focus({ preventScroll: true })
        dispatchCustomElementEvent(this.state, 'handle_dismiss_focus')
      }
    } else if (
      active_item > -1 &&
      active_item !== this.state.active_item
    ) {
      this.setState({
        showFocusRing: false,
      })
      this.setActiveItemAndScrollToIt(active_item, {
        fireSelectEvent: true,
        event: e,
      })
    }
  }

  /**
   * Gets the currently selected element inside the DrawerList. Or the list element if nothing is selected.
   */
  getSelectedElement = () => {
    return (
      this._refUl.current?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option--selected'
      ) || this._refUl.current
    )
  }

  getCurrentSelectedItem = () => {
    const elem = this.getSelectedElement()
    return this.getItemData(elem)
  }

  /**
   * Gets the currently focused element inside the DrawerList. Or `null` if nothing is focused.
   */
  getActiveElement = () => {
    return this._refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option--focus'
    )
  }

  getElementGroup = (element: HTMLLIElement) => {
    return element?.parentElement?.classList.contains(
      'dnb-drawer-list__group'
    )
      ? (element.parentElement as HTMLUListElement)
      : null
  }

  getCurrentActiveItem = () => {
    const elem = this.getActiveElement()
    return this.getItemData(elem)
  }

  getNextActiveItem = () => {
    const activeElement = this.getActiveElement()

    const elem =
      activeElement?.nextElementSibling ||
      this.getElementGroup(
        activeElement
      )?.nextElementSibling?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option.first-of-type'
      )

    return this.getItemData(elem)
  }

  getPrevActiveItem = () => {
    const activeElement = this.getActiveElement()

    const elem =
      (activeElement?.previousElementSibling?.classList.contains(
        'dnb-drawer-list__option'
      ) &&
        activeElement?.previousElementSibling) ||
      this.getElementGroup(
        activeElement
      )?.previousElementSibling?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option.last-of-type'
      )

    return this.getItemData(elem)
  }

  getFirstItem = () => {
    const elem = this._refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option.first-item' // because of the triangle element
    )
    return this.getItemData(elem)
  }

  getLastItem = () => {
    const elem = this._refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option.last-item' // because of the triangle element
    )
    return this.getItemData(elem)
  }

  getItemData = (element: Element) => {
    const item = parseFloat(element && element.getAttribute('data-item'))
    return isNaN(item) ? undefined : item
  }

  setOutsideClickObserver = () => {
    this.removeOutsideClickObserver()

    this.outsideClick = detectOutsideClick(
      [
        this.state.wrapper_element,
        this._refRoot.current,
        this._refUl.current,
      ],
      () => this.setHidden({ preventHideFocus: true }),
      { includedKeys: ['tab'] }
    )

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler, true)
      document.addEventListener('keyup', this.onKeyUpHandler, true)
    }
  }

  removeOutsideClickObserver() {
    if (this.outsideClick) {
      this.outsideClick.remove()
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler, true)
      document.removeEventListener('keyup', this.onKeyUpHandler, true)
    }
  }

  addObservers = () => {
    this.setDirectionObserver()
    this.setScrollObserver()
    this.setOutsideClickObserver()
  }
  removeObservers = () => {
    this.removeDirectionObserver()
    this.removeScrollObserver()
    this.removeOutsideClickObserver()
  }

  toggleVisible = (...args) => {
    return this.state.opened
      ? this.setHidden(...args)
      : this.setVisible(...args)
  }

  setVisible = (args = {}, onStateComplete = null) => {
    if (this.state.opened && this.state.hidden === false) {
      if (typeof onStateComplete === 'function') {
        onStateComplete(true)
      }
      return // stop
    }

    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)

    this.searchCache = null

    const handleSingleComponentCheck = () => {
      this.setState({
        hidden: false,
        opened: true,
      })

      const animationDelayHandler = () => {
        DrawerListProvider.isOpen = true
        this.setState({
          isOpen: true,
        })

        if (typeof onStateComplete === 'function') {
          onStateComplete(true)
        }

        this.setActiveState(true)
      }

      if (isTrue(this.props.no_animation)) {
        // our tests want no delay!
        if (process?.env.NODE_ENV === 'test') {
          animationDelayHandler()
        } else {
          // We have to have still a delay, to ensure the user can press enter to toggle the open state
          clearTimeout(this._showTimeout)
          this._showTimeout = setTimeout(animationDelayHandler, 0) // ensure we do not set isOpen true before the keydown handler has run
        }
      } else {
        clearTimeout(this._showTimeout)
        this._showTimeout = setTimeout(
          animationDelayHandler,
          DrawerListProvider.blurDelay
        ) // wait until animation is over
      }

      const { selected_item, active_item } = this.state
      const newActiveItem =
        parseFloat(selected_item as string) > -1
          ? selected_item
          : active_item
      dispatchCustomElementEvent(this.state, 'on_show', {
        ...args,
        data: getEventData(newActiveItem, this.state.data),
        attributes: this.attributes,
        ulElement: this._refUl.current,
      })

      this.setActiveItemAndScrollToIt(
        parseFloat(newActiveItem as string) > -1 ? newActiveItem : -1,
        { scrollTo: false }
      )
    }

    // If a user clicks on a second drawer list
    // we ensure we first close it, before we open it
    if (DrawerListProvider.isOpen && !isTrue(this.props.no_animation)) {
      clearTimeout(this._hideTimeout)
      this._hideTimeout = setTimeout(
        handleSingleComponentCheck,
        DrawerListProvider.blurDelay
      )
    } else {
      handleSingleComponentCheck()
    }
  }

  setHidden = (args = {}, onStateComplete = null) => {
    if (!this.state.opened || isTrue(this.props.prevent_close)) {
      if (typeof onStateComplete === 'function') {
        onStateComplete(false)
      }
      return // stop here
    }

    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)

    const { selected_item, active_item } = this.state
    const res = dispatchCustomElementEvent(this.state, 'on_hide', {
      ...args,
      data: getEventData(
        parseFloat(selected_item as string) > -1
          ? selected_item
          : active_item,
        this.state.data
      ),
      attributes: this.attributes,
    })

    if (res !== false) {
      this.setState({
        opened: false,
      })

      const delayHandler = () => {
        this.removeObservers()

        this.setState({
          hidden: true,
          isOpen: false,
        })
        if (typeof onStateComplete === 'function') {
          onStateComplete(false)
        }
        DrawerListProvider.isOpen = false

        this.setActiveState(false)
      }

      if (isTrue(this.props.no_animation)) {
        delayHandler()
      } else {
        clearTimeout(this._hideTimeout)
        this._hideTimeout = setTimeout(
          delayHandler,
          DrawerListProvider.blurDelay
        ) // wait until animation is over
      }
    }
  }

  setActiveState(active) {
    if (typeof document !== 'undefined') {
      try {
        if (active) {
          document.documentElement.setAttribute(
            'data-dnb-drawer-list-active',
            String(this.state.id)
          )
        } else {
          document.documentElement.removeAttribute(
            'data-dnb-drawer-list-active'
          )
        }
      } catch (e) {
        warn(
          'DrawerList: Error on set "data-dnb-drawer-list-active" by using element.setAttribute()',
          e
        )
      }
    }
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
      },
      cb
    )

    return this
  }

  selectItemAndClose = (
    itemToSelect,
    args: {
      fireSelectEvent?: boolean
      event?: any
      closeOnSelection?: boolean
    } = {}
  ) => {
    args.closeOnSelection = true
    return this.selectItem(itemToSelect, args)
  }

  selectItem = (
    itemToSelect,
    {
      fireSelectEvent = false,
      event = null,
      closeOnSelection = false,
    } = {}
  ) => {
    // because of our delay on dispatching the event
    // make a copy of it, so we don't break the synthetic event
    if (event && typeof event.persist === 'function') {
      event.persist()
    }

    // if no value is set on start and we confirm, we get -1
    if (itemToSelect === -1) {
      itemToSelect = null
    }

    const data = getEventData(itemToSelect, this.state.data) || null
    const value = getSelectedItemValue(itemToSelect, this.state)
    const attributes = this.attributes
    const attr = {
      selected_item: itemToSelect,
      value,
      data,
      event,
      attributes,
    }

    if (data?.disabled) {
      return false
    }

    const res = dispatchCustomElementEvent(
      this.state,
      'on_pre_change',
      attr
    )

    if (res === false) {
      return res // stop here
    }

    if (hasSelectedText()) {
      const elem = getSelectedTextElement()
      const isInput =
        elem instanceof Element
          ? getClosestParent('dnb-input', elem)
          : null
      if (!isInput) {
        return // stop here
      }
    }

    const { keep_open, preventSelection } = this.props

    const doCallOnChange =
      parseFloat(itemToSelect) > -1 &&
      itemToSelect !== this.state.selected_item
    const onSelectionIsComplete = () => {
      if (doCallOnChange) {
        dispatchCustomElementEvent(this.state, 'on_change', attr)
      }
      if (fireSelectEvent) {
        dispatchCustomElementEvent(this.state, 'on_select', {
          ...attr,
          active_item: itemToSelect,
        })
      }

      if (closeOnSelection && !isTrue(keep_open)) {
        this.setHidden()
      }
    }

    if (isTrue(preventSelection)) {
      onSelectionIsComplete()
    } else {
      this.setState(
        {
          selected_item: itemToSelect,
          active_item: itemToSelect,
        },
        onSelectionIsComplete
      )
    }
  }

  render() {
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
            addObservers: this.addObservers,
            removeObservers: this.removeObservers,
            setVisible: this.setVisible,
            setHidden: this.setHidden,
            toggleVisible: this.toggleVisible,
            selectItem: this.selectItem,
            selectItemAndClose: this.selectItemAndClose,
            scrollToItem: this.scrollToItem,
            setActiveItemAndScrollToIt: this.setActiveItemAndScrollToIt,
            ...this.state,
          },
        }}
      >
        {this.props.children}
      </DrawerListContext.Provider>
    )
  }
}
