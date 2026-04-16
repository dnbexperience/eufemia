/**
 * Web DrawerList Provider
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { useIsomorphicLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../shared/helpers/useUpdateEffect'
import Context from '../../shared/Context'
import type { DetectOutsideClickClass } from '../../shared/component-helper'
import {
  warn,
  roundToNearest,
  getClosestScrollViewElement,
  detectOutsideClick,
  dispatchCustomElementEvent,
  getClosestParent,
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
import type { DrawerListContextState } from './DrawerListContext'
import DrawerListContext from './DrawerListContext'
import {
  disableBodyScroll,
  enableBodyScroll,
} from '../../components/modal/bodyScrollLock'

import type { SpacingProps } from '../../shared/types'
import type {
  DrawerListProps,
  DrawerListData,
  DrawerListInternalData,
} from './DrawerList'

export type DrawerListProviderChainable = {
  setVisible: (
    args?: Record<string, unknown> | null,
    onStateComplete?: (() => void) | null
  ) => void
  setHidden: (
    args?: unknown[] | null,
    onStateComplete?: (() => void) | null
  ) => void
  toggleVisible: (...args: unknown[]) => void
  setWrapperElement: (
    wrapperElement?: string | HTMLElement
  ) => DrawerListProviderChainable
  setData: DrawerListProviderProps['setData']
  setState: DrawerListProviderProps['setState']
  selectItem: DrawerListProviderProps['selectItem']
  selectItemAndClose: DrawerListProviderProps['selectItemAndClose']
  scrollToItem: DrawerListProviderProps['scrollToItem']
  setActiveItemAndScrollToIt: DrawerListProviderProps['setActiveItemAndScrollToIt']
  addObservers: () => void
  removeObservers: () => void
}

export type DrawerListProviderProps = Omit<DrawerListProps, 'children'> &
  Omit<
    React.HTMLProps<HTMLElement>,
    | 'data'
    | 'role'
    | 'size'
    | 'value'
    | 'onChange'
    | 'onSelect'
    | 'onResize'
  > &
  SpacingProps & {
    hasFocusOnElement?: boolean
    setData?: (
      data: DrawerListData,
      cb?: (data: DrawerListInternalData) => void,
      {
        overwriteOriginalData,
      }?: {
        overwriteOriginalData?: boolean
      }
    ) => void
    setState?: (
      state: Partial<DrawerListContextState>,
      cb?: () => void
    ) => void
    setWrapperElement?: (
      wrapperElement?: string | HTMLElement
    ) => DrawerListProviderChainable
    setHidden?: (args?: unknown[], onStateComplete?: () => void) => void
    selectItemAndClose?: (
      itemToSelect: string | number,
      args?: {
        fireSelectEvent?: boolean
        event?: React.SyntheticEvent | Event | Record<string, unknown>
      }
    ) => void
    selectedItem?: string | number
    activeItem?: string | number
    showFocusRing?: boolean
    closestToTop?: string
    closestToBottom?: string
    skipPortal?: boolean
    addObservers?: () => void
    removeObservers?: () => void
    setVisible?: (
      args?: Record<string, unknown>,
      onStateComplete?: () => void
    ) => void
    toggleVisible?: (...args: unknown[]) => void
    selectItem?: (
      itemToSelect: string | number,
      args?: {
        fireSelectEvent?: boolean
        event?: React.SyntheticEvent | Event
        closeOnSelection?: boolean
      }
    ) => void
    scrollToItem?: (
      activeItem: string | number,
      opt?: {
        scrollTo?: boolean
        element?: HTMLElement
      }
    ) => void
    setActiveItemAndScrollToIt?: (
      activeItem: string | number,
      args?: {
        fireSelectEvent?: boolean
        scrollTo?: boolean
        event?: React.SyntheticEvent | Event
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

const allDefaultProps = {
  ...drawerListDefaultProps,
  ...drawerListProviderDefaultProps,
}

let isOpen = false

function DrawerListProviderComponent(ownProps: DrawerListProviderProps) {
  const context = useContext(Context)

  // Apply defaults
  const props = useMemo(
    () => ({ ...allDefaultProps, ...ownProps }) as DrawerListProviderProps,
    [ownProps]
  )
  const propsRef = useRef(props)
  propsRef.current = props

  // Mutable state stored in ref (mirrors this.state)
  const stateRef = useRef<DrawerListContextState>(null)
  if (!stateRef.current) {
    stateRef.current = {
      cacheHash: '',
      activeItem: undefined,
      selectedItem: undefined,
      ignoreEvents: false,
      ...prepareStartupState(props),
    }
  }

  // Re-render trigger
  const [, forceUpdate] = useReducer(() => ({}), {})

  // Callback queue for setState(..., callback) pattern
  const callbacksRef = useRef<(() => void)[]>([])

  // Pending state updates — deferred to render time to match class component
  // batching behavior where this.state is NOT updated between setState calls
  const pendingUpdatesRef = useRef<Partial<DrawerListContextState>[]>([])

  const mergeState = useCallback(
    (partial: Partial<DrawerListContextState>, cb?: () => void) => {
      pendingUpdatesRef.current.push(partial)
      if (cb) {
        callbacksRef.current.push(cb)
      }
      forceUpdate()
    },
    []
  )

  // Apply pending state updates during render (before prepareDerivedState)
  if (pendingUpdatesRef.current.length > 0) {
    const updates = pendingUpdatesRef.current
    pendingUpdatesRef.current = []
    for (const partial of updates) {
      Object.assign(stateRef.current, partial)
    }
  }

  // Process state callbacks after render
  useIsomorphicLayoutEffect(() => {
    const cbs = callbacksRef.current
    if (cbs.length > 0) {
      callbacksRef.current = []
      cbs.forEach((cb) => cb())
    }
  })

  prepareDerivedState(props, stateRef.current)

  // DOM refs
  const _refRoot = useRef<HTMLSpanElement>(null)
  const _refShell = useRef<HTMLSpanElement>(null)
  const _refUl = useRef<HTMLUListElement>(null)
  const _refTriangle = useRef<HTMLLIElement & HTMLSpanElement>(null)

  // Instance variables
  const attributesRef = useRef<Record<string, any>>({})
  const showTimeoutRef = useRef<NodeJS.Timeout>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(null)
  const directionTimeoutRef = useRef<NodeJS.Timeout>(null)
  const itemSpotsRef = useRef<{
    [key: number]: { id: string }
  }>({})
  const itemSpotsCountRef = useRef(0)
  const setOnScrollRef = useRef<(() => void) | null>(null)
  const bodyLockEnabledRef = useRef(false)
  const setDirectionFnRef = useRef<(() => void) | null>(null)
  const rootElemRef = useRef<Window | Element>(null)
  const changedOrderForRef = useRef<string | null>(null)
  const searchCacheRef = useRef<Record<string, { i: number }[]> | null>(
    null
  )
  const metaRef = useRef({
    cmd: false,
    ctrl: false,
    shift: false,
    alt: false,
  })
  const outsideClickRef = useRef<DetectOutsideClickClass | null>(null)

  // --- Methods ---

  const refreshScrollObserver = useCallback(() => {
    if (typeof window === 'undefined' || !_refUl.current) {
      return
    }
    const elements = _refUl.current?.querySelectorAll<HTMLLIElement>(
      'li.dnb-drawer-list__option,li.dnb-drawer-list__group-title'
    )
    itemSpotsRef.current = {}
    elements.forEach((element) => {
      itemSpotsRef.current[element.offsetTop] = {
        id: element.getAttribute('id'),
      }
    })
    itemSpotsCountRef.current = Object.keys(itemSpotsRef.current).length
  }, [])

  const removeScrollObserverFn = useCallback(() => {
    if (typeof window !== 'undefined' && setOnScrollRef.current) {
      window.removeEventListener('resize', setOnScrollRef.current)
      setOnScrollRef.current = null
    }
  }, [])

  const setScrollObserver = useCallback(() => {
    if (typeof window === 'undefined' || !_refUl.current) {
      return
    }

    removeScrollObserverFn()
    itemSpotsCountRef.current = 1

    try {
      let closestToTop = null,
        closestToBottom = null,
        tmpToTop: string,
        tmpToBottom: string

      setOnScrollRef.current = () => {
        if (!_refUl.current) {
          return // stop here
        }

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
          mergeState({
            closestToTop: itemSpotsRef.current[closestToTop].id,
          })
        }
        if (
          itemSpotsRef.current[closestToBottom] &&
          itemSpotsRef.current[closestToBottom].id !== tmpToBottom
        ) {
          tmpToBottom = itemSpotsRef.current[closestToBottom].id
          mergeState({
            closestToBottom: itemSpotsRef.current[closestToBottom].id,
          })
        }
      }

      _refUl.current.addEventListener('scroll', setOnScrollRef.current)
      setOnScrollRef.current()
    } catch (e) {
      warn('List could not set onScroll:', e)
    }
  }, [removeScrollObserverFn, refreshScrollObserver, mergeState])

  const enableBodyLock = useCallback(() => {
    if (_refUl.current) {
      bodyLockEnabledRef.current = true
      disableBodyScroll(_refUl.current)
    }
  }, [])

  const disableBodyLockFn = useCallback(() => {
    if (bodyLockEnabledRef.current && _refUl.current) {
      bodyLockEnabledRef.current = false
      enableBodyScroll(_refUl.current)
    }
  }, [])

  const correctHiddenView = useCallback(() => {
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

      if (spaceToLeft < 0) {
        shellStyle.transform =
          'translateX(' + Math.abs(spaceToLeft / 16) + 'rem)'
        triangleStyle.right = Math.abs(spaceToLeft / 16) + 'rem'
      } else if (spaceToRight < 0) {
        shellStyle.transform = 'translateX(' + spaceToRight / 16 + 'rem)'
        triangleStyle.left = Math.abs(spaceToRight / 16) + 'rem'
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

  const removeDirectionObserver = useCallback(() => {
    disableBodyLockFn()

    clearTimeout(directionTimeoutRef.current)
    if (typeof window !== 'undefined' && setDirectionFnRef.current) {
      rootElemRef.current?.removeEventListener(
        'scroll',
        setDirectionFnRef.current
      )

      if (typeof window.visualViewport !== 'undefined') {
        window.visualViewport.removeEventListener(
          'scroll',
          setDirectionFnRef.current
        )
        window.visualViewport.removeEventListener(
          'resize',
          setDirectionFnRef.current
        )
      } else {
        window.removeEventListener('resize', setDirectionFnRef.current)
      }

      setDirectionFnRef.current = null
    }
  }, [disableBodyLockFn])

  const setDirectionObserver = useCallback(() => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !(stateRef.current.wrapperElement || _refRoot.current)
    ) {
      return undefined
    }

    const {
      enableBodyLock: useBodyLockProp,
      scrollable,
      minHeight,
      maxHeight,
      onResize,
      pageOffset,
      observerElement,
      direction: directionProp,
    } = propsRef.current

    const useBodyLock = useBodyLockProp
    const isScrollable = scrollable
    const customMinHeight = parseFloat(minHeight as string) * 16
    const customMaxHeight = parseFloat(maxHeight as string) || 0

    let customElem =
      typeof observerElement === 'string'
        ? document.querySelector(observerElement)
        : null

    if (!customElem) {
      customElem = getClosestScrollViewElement(_refRoot.current)
    }

    removeDirectionObserver()

    const directionOffset = 96
    const spaceToTopOffset = 2 * 16
    const spaceToBottomOffset = 2 * 16
    const elem = stateRef.current.wrapperElement || _refRoot.current
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
      const rootElem = customElem || document.documentElement

      const pageYOffset = !isNaN(parseFloat(pageOffset as string))
        ? parseFloat(pageOffset as string)
        : rootElem.scrollTop
      const spaceToTop =
        getOffsetTop(elem) + elem.offsetHeight - pageYOffset
      const spaceToBottom = getSpaceToBottom({
        rootElem,
        pageYOffset,
      })

      let direction = directionProp
      if (!direction || direction === 'auto') {
        direction =
          Math.max(spaceToBottom - directionOffset, directionOffset) <
            customMinHeight && spaceToTop > customMinHeight
            ? 'top'
            : 'bottom'
      }

      let maxH = customMaxHeight
      if (!(maxH > 0)) {
        if (direction === 'top') {
          maxH =
            spaceToTop -
            ((stateRef.current.wrapperElement || _refRoot.current)
              .offsetHeight || 0) -
            spaceToTopOffset
        }

        if (direction === 'bottom') {
          maxH = spaceToBottom - spaceToBottomOffset
        }

        let vh = 0
        if (typeof window.visualViewport !== 'undefined') {
          vh = window.visualViewport.height
        } else {
          vh = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          )
        }

        vh = vh * (isScrollable ? 0.7 : 0.9)

        if (maxH > vh) {
          maxH = vh
        }

        maxH = roundToNearest(maxH, 8) / 16
      }

      return { direction, maxHeight: maxH }
    }

    const renderDirection = () => {
      try {
        const { direction, maxHeight: mh } = calculateMaxHeight()

        if (propsRef.current.direction === 'auto') {
          mergeState({ direction })
        }
        mergeState({ maxHeight: mh })

        if (onResize) {
          dispatchCustomElementEvent(stateRef.current, 'onResize', {
            direction,
            maxHeight: mh,
          })
        }
      } catch (e) {
        warn('List could not set onResize:', e)
      }

      window?.requestAnimationFrame?.(correctHiddenView) ||
        correctHiddenView()
    }

    // debounce
    setDirectionFnRef.current = () => {
      clearTimeout(directionTimeoutRef.current)
      directionTimeoutRef.current = setTimeout(renderDirection, 50)
    }

    rootElemRef.current = customElem || window
    rootElemRef.current.addEventListener(
      'scroll',
      setDirectionFnRef.current
    )

    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener(
        'scroll',
        setDirectionFnRef.current
      )
      window.visualViewport.addEventListener(
        'resize',
        setDirectionFnRef.current
      )
    } else {
      window.addEventListener('resize', setDirectionFnRef.current)
    }

    if (useBodyLock) {
      enableBodyLock()
    }

    refreshScrollObserver()

    renderDirection()
  }, [
    removeDirectionObserver,
    mergeState,
    correctHiddenView,
    enableBodyLock,
    refreshScrollObserver,
  ])

  const findItemByValue = useCallback((value) => {
    if (propsRef.current.skipKeysearch) {
      return undefined
    }

    let index = -1

    try {
      value = String(value).toLowerCase()

      if (changedOrderForRef.current !== value) {
        searchCacheRef.current = null
        changedOrderForRef.current = null
      }

      searchCacheRef.current =
        searchCacheRef.current ||
        stateRef.current.data.reduce((acc, itemData, i) => {
          const str = String(
            parseContentTitle(itemData, {
              separator: ' ',
              removeNumericOnlyValues: true,
            })
          )

          const firstLetter = String(str[0]).toLowerCase()
          acc[firstLetter] = acc[firstLetter] || []
          acc[firstLetter].push({ i })

          return acc
        }, {})

      const found = searchCacheRef.current[value]
      index = found && found[0] && found[0].i > -1 ? found[0].i : -1

      if (found && found.length > 1) {
        found.push(found.shift())
        changedOrderForRef.current = value
      }
    } catch (e) {
      warn('List could not findItemByValue:', e)
    }

    return index
  }, [])

  const getActiveElement = useCallback(() => {
    return _refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option--focus'
    )
  }, [])

  const getSelectedElement = useCallback(() => {
    return (
      _refUl.current?.querySelector<HTMLLIElement>(
        'li.dnb-drawer-list__option--selected'
      ) || _refUl.current
    )
  }, [])

  const getItemData = useCallback((element: Element) => {
    const item = parseFloat(element && element.getAttribute('data-item'))
    return isNaN(item) ? undefined : item
  }, [])

  const getElementGroup = useCallback((element: HTMLLIElement) => {
    return element?.parentElement?.classList.contains(
      'dnb-drawer-list__group'
    )
      ? (element.parentElement as HTMLUListElement)
      : null
  }, [])

  const getCurrentSelectedItem = useCallback(() => {
    const elem = getSelectedElement()
    return getItemData(elem)
  }, [getSelectedElement, getItemData])

  const getCurrentActiveItem = useCallback(() => {
    const elem = getActiveElement()
    return getItemData(elem)
  }, [getActiveElement, getItemData])

  const getNextActiveItem = useCallback(() => {
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

  const getPrevActiveItem = useCallback(() => {
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

  const getFirstItem = useCallback(() => {
    const elem = _refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option.first-item'
    )
    return getItemData(elem)
  }, [getItemData])

  const getLastItem = useCallback(() => {
    const elem = _refUl.current?.querySelector<HTMLLIElement>(
      'li.dnb-drawer-list__option.last-item'
    )
    return getItemData(elem)
  }, [getItemData])

  const getAnchorElem = useCallback((activeElement) => {
    try {
      return activeElement?.querySelector('a:first-of-type')
    } catch (e) {
      return null
    }
  }, [])

  const setActiveState = useCallback((active: boolean) => {
    if (typeof document !== 'undefined') {
      try {
        if (active) {
          document.documentElement.setAttribute(
            'data-dnb-drawer-list-active',
            String(stateRef.current.id)
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
  }, [])

  const scrollToItem = useCallback(
    (activeItem, { scrollTo = true, element = null } = {}) => {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        if (_refUl.current && parseFloat(activeItem) > -1) {
          try {
            const ulElement = _refUl.current
            const liElement =
              element || getActiveElement() || getSelectedElement()
            if (liElement) {
              const top = liElement.offsetTop
              if (ulElement.scrollTo) {
                if (
                  scrollTo === false ||
                  (window as Window & { IS_TEST?: boolean })['IS_TEST']
                ) {
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

              if (!propsRef.current.preventFocus && liElement) {
                liElement.focus()
                dispatchCustomElementEvent(
                  { props: propsRef.current, state: stateRef.current },
                  'onOpenFocus',
                  {
                    element: liElement,
                  }
                )
              }
            } else {
              warn('The DrawerList item was not a DOM Element')
            }
          } catch (e) {
            warn('List could not scroll into element:', e)
          }
        }
      }, 1)
    },
    [getActiveElement, getSelectedElement]
  )

  const setActiveItemAndScrollToIt = useCallback(
    (
      activeItem,
      { fireSelectEvent = false, scrollTo = true, event = null } = {}
    ) => {
      mergeState({ activeItem }, () => {
        if (parseFloat(activeItem) === -1) {
          if (document.activeElement?.tagName !== 'INPUT') {
            _refUl.current?.focus({ preventScroll: true })
          }

          dispatchCustomElementEvent(
            { props: propsRef.current, state: stateRef.current },
            'onOpenFocus',
            {
              element: _refUl.current,
            }
          )
        } else if (parseFloat(activeItem) > -1) {
          const { selectedItem } = stateRef.current

          if (fireSelectEvent) {
            const attributes = attributesRef.current
            const ret = dispatchCustomElementEvent(
              stateRef.current,
              'onSelect',
              {
                activeItem,
                value: getSelectedItemValue(
                  selectedItem,
                  stateRef.current
                ),
                data: getEventData(activeItem, stateRef.current.data),
                event,
                attributes,
              }
            )
            if (ret === false) {
              return // stop here!
            }
          }

          if (propsRef.current.noAnimation) {
            scrollTo = false
          }

          scrollToItem(activeItem, { scrollTo })
        }
      })
    },
    [mergeState, scrollToItem]
  )

  const setWrapperElement = useCallback(
    (wrapperElement = propsRef.current.wrapperElement) => {
      if (typeof wrapperElement === 'string') {
        wrapperElement =
          typeof document !== 'undefined'
            ? document.querySelector<HTMLElement>(wrapperElement)
            : undefined
      }

      if (wrapperElement !== stateRef.current.wrapperElement) {
        mergeState({ wrapperElement })
      }

      return selfRef.current
    },
    [mergeState]
  )

  // Stable event handlers for addEventListener
  const setMetaKey = useCallback((e) => {
    metaRef.current = {
      cmd: e.metaKey,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
    }
  }, [])

  const onKeyUpHandlerRef = useRef<(e: KeyboardEvent) => void>(null)

  const onKeyDownHandlerRef = useRef<(e: KeyboardEvent) => void>(null)

  // These stable wrappers delegate to the refs
  const onKeyUpHandler = useCallback((e: KeyboardEvent) => {
    onKeyUpHandlerRef.current(e)
  }, [])

  const onKeyDownHandler = useCallback((e: KeyboardEvent) => {
    onKeyDownHandlerRef.current(e)
  }, [])

  onKeyUpHandlerRef.current = (e) => {
    setMetaKey(e)
  }

  const removeOutsideClickObserver = useCallback(() => {
    if (outsideClickRef.current) {
      outsideClickRef.current.remove()
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onKeyDownHandler, true)
      document.removeEventListener('keyup', onKeyUpHandler, true)
    }
  }, [onKeyDownHandler, onKeyUpHandler])

  const setOutsideClickObserver = useCallback(() => {
    removeOutsideClickObserver()

    outsideClickRef.current = detectOutsideClick(
      [stateRef.current.wrapperElement, _refRoot.current, _refUl.current],
      () => setHiddenFnRef.current({ preventHideFocus: true }),
      { includedKeys: ['Tab'] }
    )

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', onKeyDownHandler, true)
      document.addEventListener('keyup', onKeyUpHandler, true)
    }
  }, [removeOutsideClickObserver, onKeyDownHandler, onKeyUpHandler])

  const addObservers = useCallback(() => {
    setDirectionObserver()
    setScrollObserver()
    setOutsideClickObserver()
  }, [setDirectionObserver, setScrollObserver, setOutsideClickObserver])

  const removeObservers = useCallback(() => {
    removeDirectionObserver()
    removeScrollObserverFn()
    removeOutsideClickObserver()
  }, [
    removeDirectionObserver,
    removeScrollObserverFn,
    removeOutsideClickObserver,
  ])

  // Forward refs for setVisible/setHidden so they can reference each other
  const setVisibleFnRef =
    useRef<(args?: any, onStateComplete?: any) => void>(null)
  const setHiddenFnRef =
    useRef<(args?: any, onStateComplete?: any) => void>(null)

  const setVisible = useCallback((args = {}, onStateComplete = null) => {
    setVisibleFnRef.current(args, onStateComplete)
  }, [])

  const setHidden = useCallback((args = {}, onStateComplete = null) => {
    setHiddenFnRef.current(args, onStateComplete)
  }, [])

  setVisibleFnRef.current = (args = {}, onStateComplete = null) => {
    if (stateRef.current.open && stateRef.current.hidden === false) {
      if (typeof onStateComplete === 'function') {
        onStateComplete(true)
      }
      return // stop
    }

    clearTimeout(showTimeoutRef.current)
    clearTimeout(hideTimeoutRef.current)

    searchCacheRef.current = null

    const handleSingleComponentCheck = () => {
      mergeState({
        hidden: false,
        open: true,
      })

      const animationDelayHandler = () => {
        isOpen = true
        mergeState({ isOpen: true })

        if (typeof onStateComplete === 'function') {
          onStateComplete(true)
        }

        setActiveState(true)
      }

      if (propsRef.current.noAnimation) {
        if (process.env.NODE_ENV === 'test') {
          animationDelayHandler()
        } else {
          clearTimeout(showTimeoutRef.current)
          showTimeoutRef.current = setTimeout(animationDelayHandler, 0)
        }
      } else {
        clearTimeout(showTimeoutRef.current)
        showTimeoutRef.current = setTimeout(
          animationDelayHandler,
          DrawerListProvider.blurDelay
        )
      }

      const { selectedItem, activeItem } = stateRef.current
      const newActiveItem =
        parseFloat(selectedItem as string) > -1 ? selectedItem : activeItem
      dispatchCustomElementEvent(stateRef.current, 'onOpen', {
        ...args,
        data: getEventData(newActiveItem, stateRef.current.data),
        attributes: attributesRef.current,
        ulElement: _refUl.current,
      })

      setActiveItemAndScrollToIt(
        parseFloat(newActiveItem as string) > -1 ? newActiveItem : -1,
        { scrollTo: false }
      )
    }

    if (isOpen && !propsRef.current.noAnimation) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = setTimeout(
        handleSingleComponentCheck,
        DrawerListProvider.blurDelay
      )
    } else {
      handleSingleComponentCheck()
    }
  }

  setHiddenFnRef.current = (args = {}, onStateComplete = null) => {
    if (!stateRef.current.open || propsRef.current.preventClose) {
      if (typeof onStateComplete === 'function') {
        onStateComplete(false)
      }
      return // stop here
    }

    clearTimeout(showTimeoutRef.current)
    clearTimeout(hideTimeoutRef.current)

    const { selectedItem, activeItem } = stateRef.current
    const res = dispatchCustomElementEvent(stateRef.current, 'onClose', {
      ...args,
      data: getEventData(
        parseFloat(selectedItem as string) > -1
          ? selectedItem
          : activeItem,
        stateRef.current.data
      ),
      attributes: attributesRef.current,
    })

    if (res !== false) {
      mergeState({ open: false })

      const delayHandler = () => {
        removeObservers()

        mergeState({
          hidden: true,
          isOpen: false,
        })
        if (typeof onStateComplete === 'function') {
          onStateComplete(false)
        }
        isOpen = false

        setActiveState(false)
      }

      if (propsRef.current.noAnimation) {
        delayHandler()
      } else {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = setTimeout(
          delayHandler,
          DrawerListProvider.blurDelay
        )
      }
    }
  }

  const toggleVisible = useCallback(
    (...args) => {
      return stateRef.current.open
        ? setHidden(...args)
        : setVisible(...args)
    },
    [setHidden, setVisible]
  )

  const setDataHandler = useCallback(
    (data, cb = null, { overwriteOriginalData = false } = {}) => {
      if (!data) {
        return undefined
      }

      if (typeof data === 'function') {
        data = getData(data)
      }

      data = normalizeData(data)

      mergeState(
        {
          data,
          originalData: overwriteOriginalData
            ? data
            : stateRef.current.originalData,
        },
        () => {
          refreshScrollObserver()
          typeof cb === 'function' && cb(data)
        }
      )

      return selfRef.current
    },
    [mergeState, refreshScrollObserver]
  )

  const setStateHandler = useCallback(
    (state, cb = null) => {
      mergeState({ ...state }, cb)
      return selfRef.current
    },
    [mergeState]
  )

  const selectItem = useCallback(
    (
      itemToSelect,
      {
        fireSelectEvent = false,
        event = null,
        closeOnSelection = false,
      } = {}
    ) => {
      if (itemToSelect === -1) {
        itemToSelect = null
      }

      const data =
        getEventData(itemToSelect, stateRef.current.data) || null
      const value = getSelectedItemValue(itemToSelect, stateRef.current)
      const attributes = attributesRef.current
      const attr = {
        selectedItem: itemToSelect,
        value,
        data,
        event,
        attributes,
      }

      if (
        data &&
        typeof data === 'object' &&
        'disabled' in data &&
        data.disabled
      ) {
        return false
      }

      const res = dispatchCustomElementEvent(
        stateRef.current,
        'onPreChange',
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

      const { keepOpen, preventSelection } = propsRef.current

      const doCallOnChange =
        parseFloat(itemToSelect) > -1 &&
        itemToSelect !== stateRef.current.selectedItem
      const onSelectionIsComplete = () => {
        if (doCallOnChange) {
          dispatchCustomElementEvent(stateRef.current, 'onChange', attr)
        }
        if (fireSelectEvent) {
          dispatchCustomElementEvent(stateRef.current, 'onSelect', {
            ...attr,
            activeItem: itemToSelect,
          })
        }

        if (closeOnSelection && !keepOpen) {
          setHidden()
        }
      }

      if (preventSelection) {
        onSelectionIsComplete()
      } else {
        mergeState(
          {
            selectedItem: itemToSelect,
            activeItem: itemToSelect,
          },
          onSelectionIsComplete
        )
      }
    },
    [mergeState, setHidden]
  )

  const selectItemAndClose = useCallback(
    (itemToSelect, args: any = {}) => {
      args.closeOnSelection = true
      return selectItem(itemToSelect, args)
    },
    [selectItem]
  )

  // Update onKeyDownHandler ref with latest implementation
  onKeyDownHandlerRef.current = (e) => {
    const key = e.key

    if (/Meta|Alt|Shift|Control/.test(key)) {
      setMetaKey(e)
    }

    dispatchCustomElementEvent(stateRef.current, 'onKeyDown', {
      event: e,
      key,
    })

    if (propsRef.current.preventClose) {
      let isSameDrawer = false
      try {
        const ulElem = getClosestParent(
          'dnb-drawer-list__options',
          document.activeElement
        )

        isSameDrawer =
          ulElem === _refUl.current ||
          ulElem?.getAttribute('id') === stateRef.current.id
      } catch (err) {
        warn(err)
      }
      if (!isSameDrawer && key !== 'Tab') {
        return // stop here
      }
    }

    if (!stateRef.current.isOpen) {
      return // stop here
    }

    if (stateRef.current.ignoreEvents && key !== 'Tab') {
      return // stop here
    }

    let activeItem = parseFloat(stateRef.current.activeItem as string)

    if (isNaN(activeItem)) {
      activeItem = -1
    }

    const total = stateRef.current.data && stateRef.current.data.length - 1

    switch (key) {
      case 'ArrowUp':
        {
          e.preventDefault()
          activeItem = getPrevActiveItem() ?? getLastItem()
        }
        break

      case 'ArrowDown':
        {
          e.preventDefault()
          activeItem = getNextActiveItem() ?? getFirstItem()
        }
        break

      case 'PageUp':
      case 'Home':
        {
          e.preventDefault()
          activeItem = getFirstItem() ?? 0
        }
        break

      case 'PageDown':
      case 'End':
        {
          e.preventDefault()
          activeItem = getLastItem() ?? total
        }
        break

      case 'Enter':
      case ' ':
        {
          if ((e.target as HTMLElement).tagName === 'A') {
            ;(e.target as HTMLElement).dispatchEvent(
              new MouseEvent('click')
            )
            setHidden()
            return // stop here
          }

          activeItem = getCurrentActiveItem() ?? getCurrentSelectedItem()

          if (
            propsRef.current.skipKeysearch
              ? activeItem > -1 && key !== ' '
              : true
          ) {
            e.preventDefault()
            const result = selectItemAndClose(activeItem, {
              fireSelectEvent: true,
              event: e,
            })
            if (result === false) {
              return // stop here
            }
          }
        }
        break

      case 'Escape':
        {
          setHidden({ event: e })
          e.preventDefault()
          e.stopPropagation()
        }
        break

      case 'Tab':
        {
          if (activeItem > -1) {
            const activeElement = getActiveElement()
            const hasFocusOnElement = Boolean(getAnchorElem(activeElement))

            mergeState({ hasFocusOnElement })

            if (hasFocusOnElement) {
              e.stopPropagation()

              const currentActiveElement = getClosestParent(
                'dnb-drawer-list__option',
                document.activeElement
              )

              if (currentActiveElement !== activeElement) {
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
                  } catch (err) {
                    //
                  }

                  return undefined
                }

                const prevActiveElement =
                  document.activeElement as HTMLElement
                const after = createTabElem()
                const before = createTabElem()

                activeElement.focus()

                const insertElem = () => {
                  try {
                    activeElement.appendChild(after)
                    activeElement.insertBefore(
                      before,
                      activeElement.firstChild
                    )
                  } catch (err) {
                    //
                  }
                }

                if (typeof window.requestAnimationFrame === 'function') {
                  window.requestAnimationFrame(insertElem)
                } else {
                  insertElem()
                }
              }

              return // stop here
            } else if (propsRef.current.preventClose) {
              activeItem = -1
            }
          }

          setHidden({ event: e })
        }
        break

      default:
        {
          const searchIndex = findItemByValue(e.key)
          if (searchIndex > -1) {
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
        mergeState({
          showFocusRing: true,
          activeItem,
        })

        _refUl.current.focus({ preventScroll: true })
        dispatchCustomElementEvent(stateRef.current, 'handleDismissFocus')
      }
    } else if (
      activeItem > -1 &&
      activeItem !== stateRef.current.activeItem
    ) {
      mergeState({ showFocusRing: false })
      setActiveItemAndScrollToIt(activeItem, {
        fireSelectEvent: true,
        event: e,
      })
    }
  }

  // --- Lifecycle effects ---

  // componentDidMount
  useMountEffect(() => {
    if (propsRef.current.open) {
      setVisible()
    }

    return () => {
      clearTimeout(showTimeoutRef.current)
      clearTimeout(hideTimeoutRef.current)
      clearTimeout(scrollTimeoutRef.current)
      clearTimeout(directionTimeoutRef.current)

      isOpen = false
      removeObservers()
      setActiveState(false)
    }
  })

  // componentDidUpdate: open prop changes
  useUpdateEffect(() => {
    if (props.open !== null) {
      if (props.open) {
        setVisible()
      } else if (props.open === false) {
        setHidden()
      }
    }
  }, [props.open, setVisible, setHidden])

  // componentDidUpdate: focus on data change and recalculate scroll observer
  const prevDataRef = useRef(props.data)
  const prevDirectionRef = useRef(stateRef.current.direction)
  useEffect(() => {
    if (stateRef.current.open) {
      if (
        props.data !== prevDataRef.current &&
        typeof document !== 'undefined' &&
        document.activeElement?.tagName === 'BODY'
      ) {
        _refUl.current?.focus()
      }

      if (
        stateRef.current.direction !== prevDirectionRef.current ||
        props.data !== prevDataRef.current
      ) {
        window?.requestAnimationFrame?.(() => {
          refreshScrollObserver()
          setOnScrollRef.current?.()
        })
      }
    }
    prevDataRef.current = props.data
    prevDirectionRef.current = stateRef.current.direction
  })

  // --- Render ---

  // API object for method chaining (replaces "return this" pattern from class component)
  const selfRef = useRef<DrawerListProviderChainable>(null)
  selfRef.current = {
    setVisible,
    setHidden,
    toggleVisible,
    setWrapperElement,
    setData: setDataHandler,
    setState: setStateHandler,
    selectItem,
    selectItemAndClose,
    scrollToItem,
    setActiveItemAndScrollToIt,
    addObservers,
    removeObservers,
  }

  return (
    <DrawerListContext
      value={{
        ...context,
        drawerList: {
          attributes: attributesRef.current,
          _refRoot,
          _refShell,
          _refUl,
          _refTriangle,
          _rootElem: rootElemRef.current,
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
          ...stateRef.current,
        },
      }}
    >
      {props.children}
    </DrawerListContext>
  )
}

DrawerListProviderComponent.displayName = 'DrawerListProvider'

const DrawerListProvider = React.memo(
  DrawerListProviderComponent
) as React.MemoExoticComponent<typeof DrawerListProviderComponent> & {
  blurDelay: number
}

DrawerListProvider.blurDelay = 201 // some ms more than "DrawerListSlideDown 200ms"

export default DrawerListProvider
