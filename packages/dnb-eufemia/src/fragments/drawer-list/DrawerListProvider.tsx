/**
 * Web DrawerList Provider
 *
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
    ) => void
    setState?: (state: any, cb?: any) => void
    setWrapperElement?: (wrapperElement?: string | HTMLElement) => void
    setHidden?: (args?: any[], onStateComplete?: any) => void
    selectItemAndClose?: (
      itemToSelect: any,
      args?: {
        fireSelectEvent?: boolean
        event: any
      }
    ) => any
    selectedItem?: string | number
    activeItem?: string | number
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
      activeItem: any,
      opt?: {
        scrollTo?: boolean
        element?: any
      }
    ) => void
    setActiveItemAndScrollToIt?: (
      activeItem: any,
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

const defaultProps = {
  ...drawerListDefaultProps,
  ...drawerListProviderDefaultProps,
}

const blurDelay = 201 // some ms more than "DrawerListSlideDown 200ms"

let isOpenGlobal = false

function DrawerListProvider(localProps: DrawerListProviderProps) {
  const context = React.useContext(Context)

  // Refs
  const _refRoot = React.useRef<HTMLSpanElement>(null)
  const _refShell = React.useRef<HTMLSpanElement>(null)
  const _refUl = React.useRef<HTMLUListElement>(null)
  const _refTriangle = React.useRef<HTMLLIElement & HTMLSpanElement>(null)

  const _showTimeoutRef = React.useRef<NodeJS.Timeout>(null)
  const _hideTimeoutRef = React.useRef<NodeJS.Timeout>(null)
  const _scrollTimeoutRef = React.useRef<NodeJS.Timeout>(null)
  const _directionTimeoutRef = React.useRef<NodeJS.Timeout>(null)

  const itemSpotsRef = React.useRef<{
    [customProperty: number]: { id: string }
  }>({})
  const itemSpotsCountRef = React.useRef<number>(0)
  const setOnScrollRef = React.useRef<() => void>(null)
  const _bodyLockIsEnabledRef = React.useRef<boolean>(false)
  const setDirectionRef = React.useRef<() => void>(null)
  const _rootElemRef = React.useRef<Window | Element>(null)
  const changedOrderForRef = React.useRef<string>(null)
  const searchCacheRef =
    React.useRef<Record<string, { i: number }[]>>(null)
  const metaRef = React.useRef<{
    cmd: any
    ctrl: any
    shift: any
    alt: any
  }>({
    cmd: false,
    ctrl: false,
    shift: false,
    alt: false,
  })
  const outsideClickRef = React.useRef<DetectOutsideClickClass>(null)
  const attributesRef = React.useRef<object>({})

  // Initial state setup
  const [state, setState] = React.useState<DrawerListContextState>(() => ({
    cacheHash: '',
    activeItem: undefined,
    selectedItem: undefined,
    ignoreEvents: false,
    ...prepareStartupState(localProps),
  }))

  // getDerivedStateFromProps equivalent
  React.useEffect(() => {
    const derivedState = prepareDerivedState(localProps, state)
    if (derivedState) {
      setState((prevState) => ({ ...prevState, ...derivedState }))
    }
  }, [localProps, state])

  // componentDidMount equivalent
  React.useEffect(() => {
    if (isTrue(localProps.open)) {
      setVisible()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle open prop changes (part of componentDidUpdate)
  const prevOpenRef = React.useRef(localProps.open)
  React.useEffect(() => {
    const prevOpen = prevOpenRef.current
    if (localProps.open !== null && localProps.open !== prevOpen) {
      if (isTrue(localProps.open)) {
        setVisible()
      } else if (isTrue(localProps.open) === false) {
        setHidden()
      }
    }
    prevOpenRef.current = localProps.open
  }, [localProps.open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle data/direction changes when open (part of componentDidUpdate)
  const prevDataRef = React.useRef(localProps.data)
  const prevDirectionRef = React.useRef(state.direction)
  React.useEffect(() => {
    if (state.open) {
      if (
        localProps.data !== prevDataRef.current &&
        typeof document !== 'undefined' &&
        document.activeElement?.tagName === 'BODY'
      ) {
        _refUl.current?.focus()
      }

      // Recalculate scroll observer when direction changes or data changes
      if (
        state.direction !== prevDirectionRef.current ||
        localProps.data !== prevDataRef.current
      ) {
        // Use requestAnimationFrame to ensure DOM has updated
        window?.requestAnimationFrame?.(() => {
          refreshScrollObserver()
          // Trigger scroll event to update arrow indicators
          setOnScrollRef.current?.()
        })
      }
    }
    prevDataRef.current = localProps.data
    prevDirectionRef.current = state.direction
  }, [state.open, state.direction, localProps.data]) // eslint-disable-line react-hooks/exhaustive-deps

  // componentWillUnmount equivalent
  React.useEffect(() => {
    return () => {
      clearTimeout(_showTimeoutRef.current)
      clearTimeout(_hideTimeoutRef.current)
      clearTimeout(_scrollTimeoutRef.current)
      clearTimeout(_directionTimeoutRef.current)

      removeObservers()
      setActiveState(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const refreshScrollObserver = React.useCallback(() => {
    if (typeof window === 'undefined' || !_refUl.current) {
      return
    }
    const elements = _refUl.current?.querySelectorAll<HTMLLIElement>(
      `li.dnb-drawer-list__option,li.dnb-drawer-list__group-title`
    )
    itemSpotsRef.current = {}
    elements.forEach((element) => {
      itemSpotsRef.current[element.offsetTop] = {
        id: element.getAttribute('id'),
      }
    })

    itemSpotsCountRef.current = Object.keys(itemSpotsRef.current).length
  }, [])

  const setScrollObserver = React.useCallback(() => {
    if (typeof window === 'undefined' || !_refUl.current) {
      return
    }

    removeScrollObserver()
    itemSpotsCountRef.current = 1 // to make sure we recalculate the spots

    try {
      let closestToTop = null,
        closestToBottom = null,
        tmpToTop,
        tmpToBottom

      setOnScrollRef.current = () => {
        if (!_refUl.current) {
          return // stop here
        }

        // recalculate the spots
        if (itemSpotsCountRef.current <= 1) {
          refreshScrollObserver()
        }

        const counts = Object.keys(itemSpotsRef.current)
        closestToBottom = findClosest(
          counts,
          _refUl.current.scrollTop + _refUl.current.offsetHeight
        )
        closestToTop = findClosest(counts, _refUl.current.scrollTop)
        if (
          itemSpotsRef.current[closestToTop] &&
          itemSpotsRef.current[closestToTop].id !== tmpToTop
        ) {
          tmpToTop = itemSpotsRef.current[closestToTop].id
          setState((prev) => ({
            ...prev,
            closestToTop: itemSpotsRef.current[closestToTop].id,
          }))
        }
        // we do this because we want the arrow
        // to change visually
        if (
          itemSpotsRef.current[closestToBottom] &&
          itemSpotsRef.current[closestToBottom].id !== tmpToBottom
        ) {
          tmpToBottom = itemSpotsRef.current[closestToBottom].id
          setState((prev) => ({
            ...prev,
            closestToBottom: itemSpotsRef.current[closestToBottom].id,
          }))
        }
      }

      _refUl.current.addEventListener('scroll', setOnScrollRef.current)
      setOnScrollRef.current()
    } catch (e) {
      warn('List could not set onScroll:', e)
    }
  }, [refreshScrollObserver])

  const correctHiddenView = React.useCallback(() => {
    // We use "style.transform", because it is a independent "and quick" solution
    // we could send down spaceToLeft and spaceToRight and set it with React's "style" prop in future
    if (!_refShell.current || !_refUl.current) {
      return // stop here
    }

    try {
      const spaceToLeft = getOffsetLeft(_refUl.current)
      const spaceToRight =
        window.innerWidth -
        (getOffsetLeft(_refUl.current) + _refUl.current.offsetWidth)

      const triangleStyle = _refTriangle.current.style
      const shellStyle = _refShell.current.style

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
  }, [])

  const removeScrollObserver = React.useCallback(() => {
    if (typeof window !== 'undefined' && setOnScrollRef.current) {
      window.removeEventListener('resize', setOnScrollRef.current)
      setOnScrollRef.current = null
    }
  }, [])

  const enableBodyLock = React.useCallback(() => {
    if (_refUl.current) {
      _bodyLockIsEnabledRef.current = true
      disableBodyScroll(_refUl.current)
    }
  }, [])

  const disableBodyLock = React.useCallback(() => {
    if (_bodyLockIsEnabledRef.current && _refUl.current) {
      _bodyLockIsEnabledRef.current = null
      enableBodyScroll(_refUl.current)
    }
  }, [])

  const removeDirectionObserver = React.useCallback(() => {
    disableBodyLock()

    clearTimeout(_directionTimeoutRef.current)
    if (typeof window !== 'undefined' && setDirectionRef.current) {
      _rootElemRef.current?.removeEventListener(
        'scroll',
        setDirectionRef.current
      )

      // this fixes iOS softkeyboard
      if (typeof window.visualViewport !== 'undefined') {
        window.visualViewport.removeEventListener(
          'scroll',
          setDirectionRef.current
        )
        window.visualViewport.removeEventListener(
          'resize',
          setDirectionRef.current
        )
      } else {
        window.removeEventListener('resize', setDirectionRef.current)
      }

      setDirectionRef.current = null
    }
  }, [disableBodyLock])

  const setDirectionObserver = React.useCallback(() => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !(state.wrapperElement || _refRoot.current)
    ) {
      return
    }

    const {
      enableBodyLock: enableBodyLockProp,
      scrollable,
      minHeight,
      maxHeight,
      onResize,
      pageOffset,
      observerElement,
      direction: directionProp,
    } = localProps

    const useBodyLock = isTrue(enableBodyLockProp)
    const isScrollable = isTrue(scrollable)
    const customMinHeight = parseFloat(minHeight as string) * 16
    const customMaxHeight = parseFloat(maxHeight as string) || 0

    let customElem =
      typeof observerElement === 'string'
        ? document.querySelector(observerElement)
        : null

    if (!customElem) {
      customElem = getClosestScrollViewElement(_refRoot.current)
    }

    // In case we have one before hand
    removeDirectionObserver()

    const directionOffset = 96
    const spaceToTopOffset = 2 * 16
    const spaceToBottomOffset = 2 * 16
    const elem = state.wrapperElement || _refRoot.current
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

      const pageYOffset = !isNaN(parseFloat(pageOffset as string))
        ? parseFloat(pageOffset as string)
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
            ((state.wrapperElement || _refRoot.current).offsetHeight ||
              0) -
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
        const { direction, maxHeight: maxHeight } = calculateMaxHeight()

        // update the states
        if (localProps.direction === 'auto') {
          setState((prev) => ({
            ...prev,
            direction,
          }))
        }
        setState((prev) => ({
          ...prev,
          maxHeight,
        }))

        // call the event, if set
        if (onResize) {
          dispatchCustomElementEvent(state, 'onResize', {
            direction,
            maxHeight,
          })
        }
      } catch (e) {
        warn('List could not set onResize:', e)
      }

      // React v18 needs a delay to make the calculation during first render
      window?.requestAnimationFrame?.(correctHiddenView) ||
        correctHiddenView()
    }

    // debounce
    setDirectionRef.current = () => {
      clearTimeout(_directionTimeoutRef.current)
      _directionTimeoutRef.current = setTimeout(renderDirection, 50)
    }

    // customElem can be a dnb-scroll-view
    _rootElemRef.current = customElem || window
    _rootElemRef.current.addEventListener(
      'scroll',
      setDirectionRef.current
    )

    // this fixes iOS softkeyboard
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener(
        'scroll',
        setDirectionRef.current
      )
      window.visualViewport.addEventListener(
        'resize',
        setDirectionRef.current
      )
    } else {
      window.addEventListener('resize', setDirectionRef.current)
    }

    if (useBodyLock) {
      enableBodyLock()
    }

    refreshScrollObserver()

    renderDirection()
  }, [
    state,
    localProps,
    removeDirectionObserver,
    correctHiddenView,
    enableBodyLock,
    refreshScrollObserver,
  ])

  const findItemByValue = React.useCallback(
    (value) => {
      if (isTrue(localProps.skipKeysearch)) {
        return
      }

      let index = -1

      try {
        value = String(value).toLowerCase()

        // delete the cache
        // if there are several of the same type
        if (changedOrderForRef.current !== value) {
          searchCacheRef.current = null
          changedOrderForRef.current = null
        }

        searchCacheRef.current =
          searchCacheRef.current ||
          state.data.reduce((acc, itemData, i) => {
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

        const found = searchCacheRef.current[value]
        index = found && found[0] && found[0].i > -1 ? found[0].i : -1

        // if there are several of the same type
        if (found && found.length > 1) {
          found.push(found.shift())
          changedOrderForRef.current = value
        }
      } catch (e) {
        warn('List could not findItemByValue:', e)
      }

      return index
    },
    [localProps.skipKeysearch, state.data]
  )

  const scrollToItem = React.useCallback(
    (activeItem, { scrollTo = true, element = null } = {}) => {
      clearTimeout(_scrollTimeoutRef.current)
      _scrollTimeoutRef.current = setTimeout(() => {
        // try to scroll to item
        if (_refUl.current && parseFloat(activeItem) > -1) {
          try {
            const ulElement = _refUl.current
            const liElement =
              element || getActiveElement() || getSelectedElement()
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

              if (!isTrue(localProps.preventFocus) && liElement) {
                liElement.focus()
                dispatchCustomElementEvent({ ...state }, 'onOpenFocus', {
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
    },
    [localProps.preventFocus, state]
  )

  const getSelectedElement = React.useCallback(() => {
    return (
      _refUl.current?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option--selected'
      ) || _refUl.current
    )
  }, [])

  const getActiveElement = React.useCallback(() => {
    return _refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option--focus'
    )
  }, [])

  const getItemData = React.useCallback((element: Element) => {
    const item = parseFloat(element && element.getAttribute('data-item'))
    return isNaN(item) ? undefined : item
  }, [])

  const setActiveItemAndScrollToIt = React.useCallback(
    (
      activeItem,
      { fireSelectEvent = false, scrollTo = true, event = null } = {}
    ) => {
      setState((prev) => ({ ...prev, activeItem }))

      // Handle side effects after state update with useRef to track changes
      setTimeout(() => {
        if (parseFloat(activeItem) === -1) {
          // Select the first item to NVDA is more easily navigatable,
          // without using the alt + arrow key
          // else we set the focus on the "ul" element
          if (document.activeElement?.tagName !== 'INPUT') {
            _refUl.current?.focus({ preventScroll: true })
          }

          dispatchCustomElementEvent(
            { ...state, activeItem },
            'onOpenFocus',
            {
              element: _refUl.current,
            }
          )
        } else if (parseFloat(activeItem) > -1) {
          const { selectedItem } = state

          if (fireSelectEvent) {
            const attributes = attributesRef.current
            const ret = dispatchCustomElementEvent(state, 'onSelect', {
              activeItem,
              value: getSelectedItemValue(selectedItem, state),
              data: getEventData(activeItem, state.data),
              event,
              attributes,
            })
            if (ret === false) {
              return // stop here!
            }
          }

          if (isTrue(localProps.noAnimation)) {
            scrollTo = false
          }

          scrollToItem(activeItem, { scrollTo })
        }
      }, 0)
    },
    [state, localProps.noAnimation, scrollToItem]
  )

  const setWrapperElement = React.useCallback(
    (wrapperElement = localProps.wrapperElement) => {
      if (typeof wrapperElement === 'string') {
        wrapperElement =
          typeof document !== 'undefined'
            ? document.querySelector<HTMLElement>(wrapperElement)
            : undefined
      }

      if (wrapperElement !== state.wrapperElement) {
        setState((prev) => ({
          ...prev,
          wrapperElement,
        }))
      }
    },
    [localProps.wrapperElement, state.wrapperElement]
  )

  const getAnchorElem = React.useCallback((activeElement) => {
    try {
      return activeElement?.querySelector('a:first-of-type')
    } catch (e) {
      return null
    }
  }, [])

  const setMetaKey = React.useCallback((e) => {
    metaRef.current = {
      cmd: e.metaKey,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
    }
  }, [])

  const onKeyUpHandler = React.useCallback(
    (e) => {
      setMetaKey(e)
    },
    [setMetaKey]
  )

  const getCurrentSelectedItem = React.useCallback(() => {
    const elem = getSelectedElement()
    return getItemData(elem)
  }, [getSelectedElement, getItemData])

  const getCurrentActiveItem = React.useCallback(() => {
    const elem = getActiveElement()
    return getItemData(elem)
  }, [getActiveElement, getItemData])

  const getElementGroup = React.useCallback((element: HTMLLIElement) => {
    return element?.parentElement?.classList.contains(
      'dnb-drawer-list__group'
    )
      ? (element.parentElement as HTMLUListElement)
      : null
  }, [])

  const getNextActiveItem = React.useCallback(() => {
    const activeElement = getActiveElement()

    const elem =
      activeElement?.nextElementSibling ||
      getElementGroup(
        activeElement
      )?.nextElementSibling?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option.first-of-type'
      )

    return getItemData(elem)
  }, [getActiveElement, getElementGroup, getItemData])

  const getPrevActiveItem = React.useCallback(() => {
    const activeElement = getActiveElement()

    const elem =
      (activeElement?.previousElementSibling?.classList.contains(
        'dnb-drawer-list__option'
      ) &&
        activeElement?.previousElementSibling) ||
      getElementGroup(
        activeElement
      )?.previousElementSibling?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option.last-of-type'
      )

    return getItemData(elem)
  }, [getActiveElement, getElementGroup, getItemData])

  const getFirstItem = React.useCallback(() => {
    const elem = _refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option.first-item' // because of the triangle element
    )
    return getItemData(elem)
  }, [getItemData])

  const getLastItem = React.useCallback(() => {
    const elem = _refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option.last-item' // because of the triangle element
    )
    return getItemData(elem)
  }, [getItemData])

  const setActiveState = React.useCallback(
    (active) => {
      if (typeof document !== 'undefined') {
        try {
          if (active) {
            document.documentElement.setAttribute(
              'data-dnb-drawer-list-active',
              String(state.id)
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
    },
    [state.id]
  )

  const onKeyDownHandler = React.useCallback(
    (e) => {
      const key = keycode(e)

      if (/command|alt|shift|ctrl/.test(key)) {
        setMetaKey(e)
      }

      dispatchCustomElementEvent(state, 'onKeyDown', {
        event: e,
        key,
      })

      // stop here if the focus is not set
      // and the drawer is opened by default
      if (isTrue(localProps.preventClose)) {
        let isSameDrawer = false
        try {
          const ulElem = getClosestParent(
            'dnb-drawer-list__options',
            document.activeElement
          )

          isSameDrawer =
            ulElem === _refUl.current ||
            ulElem?.getAttribute('id') === state.id
        } catch (e) {
          warn(e)
        }
        if (!isSameDrawer && key !== 'tab') {
          return // stop here
        }
      }

      if (!state.isOpen) {
        return // stop here
      }

      if (isTrue(state.ignoreEvents) && key !== 'tab') {
        return // stop here
      }

      let activeItem = parseFloat(state.activeItem as string)

      if (isNaN(activeItem)) {
        activeItem = -1
      }

      const total = state.data && state.data.length - 1

      switch (key) {
        case 'up':
          {
            e.preventDefault()

            activeItem = getPrevActiveItem() ?? getLastItem()
          }
          break

        case 'down':
          {
            e.preventDefault()

            activeItem = getNextActiveItem() ?? getFirstItem()
          }
          break

        case 'page up':
        case 'home':
          {
            e.preventDefault()
            activeItem = getFirstItem() ?? 0
          }
          break

        case 'page down':
        case 'end':
          {
            e.preventDefault()
            activeItem = getLastItem() ?? total
          }
          break

        case 'enter':
        case 'space':
          {
            if (e.target.tagName === 'A') {
              e.target.dispatchEvent(new MouseEvent('click'))
              setHidden()
              return // stop here, and let the browser + anchor do the rest
            }

            activeItem = getCurrentActiveItem() ?? getCurrentSelectedItem()

            if (
              isTrue(localProps.skipKeysearch)
                ? activeItem > -1 && key !== 'space'
                : true
            ) {
              e.preventDefault()
              const result = selectItemAndClose(activeItem, {
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
            setHidden({ event: e })
            e.preventDefault()
            e.stopPropagation() // To make Modal/Dialog/Drawer not close as well
          }
          break

        case 'tab':
          {
            if (activeItem > -1) {
              // If there is an active item
              // we make it possible to tab inside it (to an anchor) instead of closing the list
              const activeElement = getActiveElement()
              const hasFocusOnElement = Boolean(
                getAnchorElem(activeElement)
              )

              setState((prev) => ({ ...prev, hasFocusOnElement }))

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
              else if (isTrue(localProps.preventClose)) {
                activeItem = -1
              }
            }

            setHidden({ event: e })
          }
          break

        default:
          {
            const searchIndex = findItemByValue(keycode(e))
            if (searchIndex > -1) {
              // Only change position if we find a result
              activeItem = searchIndex
            }
          }
          break
      }

      if (
        activeItem === -1 &&
        _refUl.current &&
        typeof document !== 'undefined'
      ) {
        const ulElem = getClosestParent(
          'dnb-drawer-list__options',
          document.activeElement
        )

        if (ulElem === _refUl.current) {
          setState((prev) => ({
            ...prev,
            showFocusRing: true,
            activeItem,
          }))

          _refUl.current.focus({ preventScroll: true })
          dispatchCustomElementEvent(state, 'handleDismissFocus')
        }
      } else if (activeItem > -1 && activeItem !== state.activeItem) {
        setState((prev) => ({
          ...prev,
          showFocusRing: false,
        }))
        setActiveItemAndScrollToIt(activeItem, {
          fireSelectEvent: true,
          event: e,
        })
      }
    },
    [
      state,
      localProps,
      setMetaKey,
      getPrevActiveItem,
      getLastItem,
      getNextActiveItem,
      getFirstItem,
      getCurrentActiveItem,
      getCurrentSelectedItem,
      getActiveElement,
      getAnchorElem,
      findItemByValue,
      setActiveItemAndScrollToIt,
    ]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const setOutsideClickObserver = React.useCallback(() => {
    removeOutsideClickObserver()

    outsideClickRef.current = detectOutsideClick(
      [state.wrapperElement, _refRoot.current, _refUl.current],
      () => setHidden({ preventHideFocus: true }),
      { includedKeys: ['tab'] }
    )

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', onKeyDownHandler, true)
      document.addEventListener('keyup', onKeyUpHandler, true)
    }
  }, [state.wrapperElement, onKeyDownHandler, onKeyUpHandler]) // eslint-disable-line react-hooks/exhaustive-deps

  const removeOutsideClickObserver = React.useCallback(() => {
    if (outsideClickRef.current) {
      outsideClickRef.current.remove()
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onKeyDownHandler, true)
      document.removeEventListener('keyup', onKeyUpHandler, true)
    }
  }, [onKeyDownHandler, onKeyUpHandler])

  const addObservers = React.useCallback(() => {
    setDirectionObserver()
    setScrollObserver()
    setOutsideClickObserver()
  }, [setDirectionObserver, setScrollObserver, setOutsideClickObserver])

  const removeObservers = React.useCallback(() => {
    removeDirectionObserver()
    removeScrollObserver()
    removeOutsideClickObserver()
  }, [
    removeDirectionObserver,
    removeScrollObserver,
    removeOutsideClickObserver,
  ])

  const toggleVisible = React.useCallback(
    (...args) => {
      return state.open ? setHidden(...args) : setVisible(...args)
    },
    [state.open]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const setVisible = React.useCallback(
    (args = {}, onStateComplete = null) => {
      if (state.open && state.hidden === false) {
        if (typeof onStateComplete === 'function') {
          onStateComplete(true)
        }
        return // stop
      }

      clearTimeout(_showTimeoutRef.current)
      clearTimeout(_hideTimeoutRef.current)

      searchCacheRef.current = null

      const handleSingleComponentCheck = () => {
        setState((prev) => ({
          ...prev,
          hidden: false,
          open: true,
        }))

        const animationDelayHandler = () => {
          isOpenGlobal = true
          setState((prev) => ({
            ...prev,
            isOpen: true,
          }))

          if (typeof onStateComplete === 'function') {
            onStateComplete(true)
          }

          setActiveState(true)
        }

        if (isTrue(localProps.noAnimation)) {
          // our tests want no delay!
          if (process?.env.NODE_ENV === 'test') {
            animationDelayHandler()
          } else {
            // We have to have still a delay, to ensure the user can press enter to toggle the open state
            clearTimeout(_showTimeoutRef.current)
            _showTimeoutRef.current = setTimeout(animationDelayHandler, 0) // ensure we do not set isOpen true before the keydown handler has run
          }
        } else {
          clearTimeout(_showTimeoutRef.current)
          _showTimeoutRef.current = setTimeout(
            animationDelayHandler,
            blurDelay
          ) // wait until animation is over
        }

        const { selectedItem, activeItem } = state
        const newActiveItem =
          parseFloat(selectedItem as string) > -1
            ? selectedItem
            : activeItem
        dispatchCustomElementEvent(state, 'onOpen', {
          ...args,
          data: getEventData(newActiveItem, state.data),
          attributes: attributesRef.current,
          ulElement: _refUl.current,
        })

        setActiveItemAndScrollToIt(
          parseFloat(newActiveItem as string) > -1 ? newActiveItem : -1,
          { scrollTo: false }
        )
      }

      // If a user clicks on a second drawer list
      // we ensure we first close it, before we open it
      if (isOpenGlobal && !isTrue(localProps.noAnimation)) {
        clearTimeout(_hideTimeoutRef.current)
        _hideTimeoutRef.current = setTimeout(
          handleSingleComponentCheck,
          blurDelay
        )
      } else {
        handleSingleComponentCheck()
      }
    },
    [
      state,
      localProps.noAnimation,
      setActiveState,
      setActiveItemAndScrollToIt,
    ]
  )

  const setHidden = React.useCallback(
    (args = {}, onStateComplete = null) => {
      if (!state.open || isTrue(localProps.preventClose)) {
        if (typeof onStateComplete === 'function') {
          onStateComplete(false)
        }
        return // stop here
      }

      clearTimeout(_showTimeoutRef.current)
      clearTimeout(_hideTimeoutRef.current)

      const { selectedItem, activeItem } = state
      const res = dispatchCustomElementEvent(state, 'onClose', {
        ...args,
        data: getEventData(
          parseFloat(selectedItem as string) > -1
            ? selectedItem
            : activeItem,
          state.data
        ),
        attributes: attributesRef.current,
      })

      if (res !== false) {
        setState((prev) => ({
          ...prev,
          open: false,
        }))

        const delayHandler = () => {
          removeObservers()

          setState((prev) => ({
            ...prev,
            hidden: true,
            isOpen: false,
          }))
          if (typeof onStateComplete === 'function') {
            onStateComplete(false)
          }
          isOpenGlobal = false

          setActiveState(false)
        }

        if (isTrue(localProps.noAnimation)) {
          delayHandler()
        } else {
          clearTimeout(_hideTimeoutRef.current)
          _hideTimeoutRef.current = setTimeout(delayHandler, blurDelay) // wait until animation is over
        }
      }
    },
    [state, localProps, removeObservers, setActiveState]
  )

  const setDataHandler = React.useCallback(
    (data, cb = null, { overwriteOriginalData = false } = {}) => {
      if (!data) {
        return
      }

      if (typeof data === 'function') {
        data = getData(data)
      }

      data = normalizeData(data)

      setState((prev) => ({
        ...prev,
        data,
        originalData: overwriteOriginalData ? data : state.originalData,
      }))

      setTimeout(() => {
        refreshScrollObserver()
        typeof cb === 'function' && cb(data)
      }, 0)
    },
    [state.originalData, refreshScrollObserver]
  )

  const setStateHandler = React.useCallback((newState, cb = null) => {
    setState((prev) => ({
      ...prev,
      ...newState,
    }))

    if (typeof cb === 'function') {
      setTimeout(cb, 0)
    }
  }, [])

  const selectItemAndClose = React.useCallback(
    (
      itemToSelect,
      args: {
        fireSelectEvent?: boolean
        event?: any
        closeOnSelection?: boolean
      } = {}
    ) => {
      args.closeOnSelection = true
      return selectItem(itemToSelect, args)
    },
    []
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const selectItem = React.useCallback(
    (
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

      const data = getEventData(itemToSelect, state.data) || null
      const value = getSelectedItemValue(itemToSelect, state)
      const attributes = attributesRef.current
      const attr = {
        selectedItem: itemToSelect,
        value,
        data,
        event,
        attributes,
      }

      if (data?.disabled) {
        return false
      }

      const res = dispatchCustomElementEvent(state, 'onPreChange', attr)

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

      const { keepOpen, preventSelection } = localProps

      const doCallOnChange =
        parseFloat(itemToSelect) > -1 &&
        itemToSelect !== state.selectedItem
      const onSelectionIsComplete = () => {
        if (doCallOnChange) {
          dispatchCustomElementEvent(state, 'onChange', attr)
        }
        if (fireSelectEvent) {
          dispatchCustomElementEvent(state, 'onSelect', {
            ...attr,
            activeItem: itemToSelect,
          })
        }

        if (closeOnSelection && !isTrue(keepOpen)) {
          setHidden()
        }
      }

      if (isTrue(preventSelection)) {
        onSelectionIsComplete()
      } else {
        setState((prev) => ({
          ...prev,
          selectedItem: itemToSelect,
          activeItem: itemToSelect,
        }))
        setTimeout(onSelectionIsComplete, 0)
      }
    },
    [state, localProps, setHidden]
  )

  return (
    <DrawerListContext.Provider
      value={{
        ...context,
        drawerList: {
          attributes: attributesRef.current,
          _refRoot,
          _refShell,
          _refUl,
          _refTriangle,
          _rootElem: _rootElemRef.current,
          setData: setDataHandler,
          setState: setStateHandler,
          setWrapperElement,
          addObservers,
          removeObservers,
          setVisible,
          setHidden,
          toggleVisible,
          selectItem,
          selectItemAndClose,
          scrollToItem,
          setActiveItemAndScrollToIt,
          ...state,
        },
      }}
    >
      {localProps.children}
    </DrawerListContext.Provider>
  )
}

DrawerListProvider.defaultProps = defaultProps
DrawerListProvider.blurDelay = blurDelay

export default DrawerListProvider
