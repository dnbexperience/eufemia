/**
 * Web Pagination Provider
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Context from '../../shared/Context'
import { dispatchCustomElementEvent } from '../../shared/component-helper'
import {
  ContentObject,
  // , detectScrollDirection // NB: We do currently not use scroll direction handling
} from './PaginationHelpers'

import PaginationContext from './PaginationContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaginationProvider = (props: any) => {
  const sharedContext = useContext(Context)

  // ---- Derive state from props (replaces getDerivedStateFromProps) ----
  const computeDerived = useCallback(() => {
    const state: Record<string, unknown> = {}

    if (props.pageCount !== null) {
      state.pageCountInternal = parseFloat(props.pageCount) || 1
    }

    state.parallelLoadCount = parseFloat(props.parallelLoadCount) || 1
    state.minTime = parseFloat(props.minWaitTime) || 0
    state.placeMakerBeforeContent = props.placeMarkerBeforeContent

    return state
  }, [
    props.pageCount,
    props.parallelLoadCount,
    props.minWaitTime,
    props.placeMarkerBeforeContent,
  ])

  // ---- Internal state ----
  const [items, setItemsState] = useState<ContentObject[]>(() => {
    if (typeof props.items === 'string' && props.items[0] === '[') {
      return JSON.parse(props.items)
    } else if (Array.isArray(props.items)) {
      return props.items
    }
    return []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasEndedInfinity, setHasEndedInfinity] = useState(false)

  const [currentPageInternal, setCurrentPageInternal] = useState<number>(
    () => {
      if (props.currentPage !== null) {
        return parseFloat(props.currentPage) || 1
      }
      return undefined as unknown as number
    }
  )

  const [startupPage, setStartupPage] = useState<number>(() => {
    return (
      parseFloat(props.startupPage) ||
      parseFloat(props.currentPage) ||
      (props.currentPage !== null
        ? parseFloat(props.currentPage) || 1
        : undefined)
    )
  })

  const [lowerPage, setLowerPage] = useState<number | undefined>(() => {
    if (props.useMarkerOnly) {
      return (
        parseFloat(props.startupPage) || parseFloat(props.currentPage) || 1
      )
    }
    return undefined
  })

  const [upperPage, setUpperPage] = useState<number | undefined>(() => {
    if (props.useMarkerOnly) {
      const sp =
        parseFloat(props.startupPage) || parseFloat(props.currentPage) || 1
      return sp + (parseFloat(props.startupCount) || 1) - 1 || 1
    }
    return undefined
  })

  // ---- Refs ----
  const isMountedRef = useRef(false)
  const updateStackRef = useRef<Array<(() => void) | undefined>>([])
  const rerenderTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)
  const resetContentTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)
  const resetInfinityTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)
  const callOnPageUpdateTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)
  const itemsRef = useRef(items)
  const currentPageInternalRef = useRef(currentPageInternal)
  const startupPageRef = useRef(startupPage)

  // Keep refs in sync
  itemsRef.current = items
  currentPageInternalRef.current = currentPageInternal
  startupPageRef.current = startupPage

  // ---- Derived values ----
  const derived = computeDerived()

  // Track previous props for componentDidUpdate equivalent
  const prevPropsRef = useRef({
    currentPage: props.currentPage,
    internalContent: props.internalContent,
  })

  // ---- Methods ----
  const callOnPageUpdate = useCallback(() => {
    if (Array.isArray(updateStackRef.current)) {
      updateStackRef.current.forEach((cb) => {
        if (typeof cb === 'function') {
          cb()
        }
      })
      updateStackRef.current = []
    }
  }, [])

  const onPageUpdate = useCallback((fn: () => void) => {
    updateStackRef.current = updateStackRef.current || []
    updateStackRef.current.push(fn)
  }, [])

  const prefillItems = useCallback(
    (
      pageNumber: number,
      itemProps: Record<string, unknown> = {},
      existingItems = itemsRef.current
    ) => {
      const position =
        itemProps.position ||
        (pageNumber < currentPageInternalRef.current ? 'before' : 'after')

      if (isNaN(pageNumber)) {
        pageNumber = 1
      }

      const exists =
        existingItems.findIndex(
          ({ pageNumber: p }: ContentObject) => p === pageNumber
        ) > -1
      if (exists) {
        return existingItems
      }

      const obj = {
        pageNumber,
        position,
        skipObserver: false,
        ...itemProps,
      }

      switch (position) {
        case 'before':
          return [new ContentObject(obj), ...existingItems]
        case 'after':
          return [...existingItems, new ContentObject(obj)]
      }
    },
    []
  )

  const setContent = useCallback(
    (
      newContent: unknown,
      content: React.ReactNode = null,
      position: string | null = null
    ) => {
      if (!Array.isArray(newContent) && content) {
        newContent = [newContent, content]
      }

      const pageNumber = parseFloat(newContent[0]) || 1
      newContent = newContent[1]

      if (typeof newContent === 'function') {
        content = newContent()
      } else if (React.isValidElement(newContent)) {
        content = newContent
      }

      if (content) {
        let itemToPrepare = itemsRef.current.find(
          ({ pageNumber: p }: ContentObject) => p === pageNumber
        )
        let newItems: ContentObject[] | null = null

        // just to make sure we have a page we can put content inside
        if (!itemToPrepare) {
          newItems = prefillItems(pageNumber, {
            position,
          })
          itemToPrepare = newItems.find(
            ({ pageNumber: p }: ContentObject) => p === pageNumber
          )
        }

        if (itemToPrepare.content) {
          itemToPrepare.update(content)
        } else {
          itemToPrepare.insert(content)
        }

        const updatedItems = [...(newItems || itemsRef.current)]
        setItemsState(updatedItems)
        setCurrentPageInternal(pageNumber)

        // Schedule callOnPageUpdate after state update
        // We use a microtask to run after React processes the state update
        Promise.resolve().then(callOnPageUpdate)
      }
    },
    [prefillItems, callOnPageUpdate]
  )

  const resetContent = useCallback(() => {
    clearTimeout(resetContentTimeoutRef.current)
    resetContentTimeoutRef.current = setTimeout(() => {
      setItemsState([])
    }, 10) // we have to be two tick after "rerender"
  }, [])

  const resetInfinity = useCallback(
    (pageNumber: number = startupPageRef.current) => {
      const newLowerPage = pageNumber
      const newUpperPage = pageNumber + parseFloat(props.startupCount) - 1
      const newCurrentPageInternal = pageNumber

      setItemsState([])
      setHasEndedInfinity(true)
      setLowerPage(newLowerPage)
      setUpperPage(newUpperPage)
      setCurrentPageInternal(newCurrentPageInternal)

      // startInfinity
      setHasEndedInfinity(false)
    },
    [props.startupCount]
  )

  // Handle the onEnd dispatch after hasEndedInfinity becomes true
  const endInfinityDispatchRef = useRef(false)
  const endInfinityHandler = useCallback(() => {
    setHasEndedInfinity(true)
    endInfinityDispatchRef.current = true
  }, [])

  useEffect(() => {
    if (hasEndedInfinity && endInfinityDispatchRef.current) {
      endInfinityDispatchRef.current = false
      const pageNumber = currentPageInternalRef.current + 1
      dispatchCustomElementEvent({ props }, 'onEnd', {
        pageNumber,
        ...props,
      })
    }
  }, [hasEndedInfinity, props])

  const setItems = useCallback(
    (newItems: ContentObject[], cb?: () => void) => {
      setItemsState(newItems)
      if (typeof cb === 'function') {
        // Schedule callback after state update
        Promise.resolve().then(cb)
      }
    },
    []
  )

  const setStateHandler = useCallback(
    (
      state: Partial<{
        items: ContentObject[]
        isLoading: boolean
        hasEndedInfinity: boolean
        currentPageInternal: number
        startupPage: number
        lowerPage: number | undefined
        upperPage: number | undefined
        skipObserver: boolean
      }>,
      cb?: () => void
    ) => {
      if ('items' in state) {
        setItemsState(state.items)
      }
      if ('isLoading' in state) {
        setIsLoading(state.isLoading)
      }
      if ('hasEndedInfinity' in state) {
        setHasEndedInfinity(state.hasEndedInfinity)
      }
      if ('currentPageInternal' in state) {
        setCurrentPageInternal(state.currentPageInternal)
      }
      if ('startupPage' in state) {
        setStartupPage(state.startupPage)
      }
      if ('lowerPage' in state) {
        setLowerPage(state.lowerPage)
      }
      if ('upperPage' in state) {
        setUpperPage(state.upperPage)
      }
      if ('skipObserver' in state) {
        // skipObserver is stored in derived/context, handled via items
      }
      if (typeof cb === 'function') {
        Promise.resolve().then(cb)
      }
    },
    []
  )

  const updatePageContent = useCallback(
    (pageNumber?: number) => {
      const pn =
        pageNumber !== undefined
          ? pageNumber
          : currentPageInternalRef.current

      let potentialElement = props.internalContent

      if (typeof props.internalContent === 'function') {
        potentialElement = props.internalContent({
          updatePageContent,
          setContent,
          resetContent,
          resetInfinity,
          endInfinity: endInfinityHandler,
          setItems,
          prefillItems,
          setState: setStateHandler,
          onPageUpdate,
          ...props,
          pageNumber: pn,
          page: pn,
        })
      }

      if (potentialElement && React.isValidElement(potentialElement)) {
        setContent([pn, potentialElement])
      }
    },
    [
      props,
      setContent,
      resetContent,
      resetInfinity,
      endInfinityHandler,
      setItems,
      prefillItems,
      setStateHandler,
      onPageUpdate,
    ]
  )

  // ---- Sync items prop ----
  useEffect(() => {
    if (typeof props.items === 'string' && props.items[0] === '[') {
      setItemsState(JSON.parse(props.items))
    } else if (Array.isArray(props.items)) {
      setItemsState(props.items)
    }
  }, [props.items])

  // ---- Sync currentPage prop to currentPageInternal ----
  useEffect(() => {
    if (
      props.currentPage !== null &&
      typeof currentPageInternalRef.current === 'undefined'
    ) {
      setCurrentPageInternal(parseFloat(props.currentPage) || 1)
    }
  }, [props.currentPage])

  // ---- Handle resetContentHandler prop ----
  useEffect(() => {
    if (props.resetContentHandler === true) {
      setItemsState([])
    }
  }, [props.resetContentHandler])

  // ---- Handle resetPaginationHandler prop for useMarkerOnly ----
  useEffect(() => {
    if (props.useMarkerOnly && props.resetPaginationHandler === true) {
      setLowerPage(undefined)
      setUpperPage(undefined)
    }
  }, [props.useMarkerOnly, props.resetPaginationHandler])

  // ---- Handle useMarkerOnly lowerPage/upperPage ----
  useEffect(() => {
    if (props.useMarkerOnly) {
      const sp =
        startupPageRef.current || parseFloat(props.currentPage) || 1
      setLowerPage((prev) => {
        if (typeof prev === 'undefined') {
          return sp
        }
        const cur = parseFloat(props.currentPage)
        if (!isNaN(cur) && cur < prev) {
          return cur
        }
        return prev
      })
      setUpperPage((prev) => {
        if (typeof prev === 'undefined') {
          return sp + (parseFloat(props.startupCount) || 1) - 1 || 1
        }
        return prev
      })
    }
  }, [props.useMarkerOnly, props.currentPage, props.startupCount])

  // ---- Rerender handler ----
  useEffect(() => {
    if (props.rerender) {
      const rerenderFn = ({
        current: store,
      }: React.RefObject<{
        pageNumber: number
        content: React.ReactNode
      } | null>) => {
        if (store && store.pageNumber > 0) {
          clearTimeout(rerenderTimeoutRef.current)
          rerenderTimeoutRef.current = setTimeout(
            () => setContent(store.pageNumber, store.content),
            1
          )
        }
      }
      props.rerender.current = rerenderFn
    }
  }, [props.rerender, setContent])

  // ---- componentDidMount ----
  useEffect(() => {
    const {
      setContentHandler,
      resetContentHandler,
      resetPaginationHandler,
      endInfinityHandler: endInfinityHandlerProp,
    } = props

    // update the callback handlers
    if (typeof setContentHandler === 'function') {
      setContentHandler(setContent)
    }
    if (typeof resetContentHandler === 'function') {
      resetContentHandler(resetContent)
    }
    if (typeof resetPaginationHandler === 'function') {
      resetPaginationHandler(resetInfinity)
    }
    if (typeof endInfinityHandlerProp === 'function') {
      endInfinityHandlerProp(endInfinityHandler)
    }

    if (props.store && props.store.current) {
      const store = props.store.current
      setContent(store.pageNumber, store.content)
    }

    isMountedRef.current = true

    updatePageContent(
      startupPageRef.current || currentPageInternalRef.current
    )

    return () => {
      clearTimeout(rerenderTimeoutRef.current)
      clearTimeout(resetContentTimeoutRef.current)
      clearTimeout(resetInfinityTimeoutRef.current)
      clearTimeout(callOnPageUpdateTimeoutRef.current)
      isMountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- componentDidUpdate equivalent ----
  useEffect(() => {
    const prevCurrentPage = prevPropsRef.current.currentPage
    const prevInternalContent = prevPropsRef.current.internalContent

    if (props.currentPage !== prevCurrentPage) {
      const newCurrentPage = parseFloat(props.currentPage)
      setCurrentPageInternal(newCurrentPage)
      updatePageContent(newCurrentPage)
    } else if (props.internalContent !== prevInternalContent) {
      updatePageContent()
    }

    prevPropsRef.current = {
      currentPage: props.currentPage,
      internalContent: props.internalContent,
    }
  })

  // ---- useMarkerOnly callOnPageUpdate ----
  useEffect(() => {
    if (props.useMarkerOnly) {
      clearTimeout(callOnPageUpdateTimeoutRef.current)
      callOnPageUpdateTimeoutRef.current = setTimeout(callOnPageUpdate, 1) // because of rerender possibility
    }
  })

  // ---- Build context value ----
  const contextValue = useMemo(
    () => ({
      ...sharedContext,
      pagination: {
        updatePageContent,
        setContent,
        resetContent,
        resetInfinity,
        endInfinity: endInfinityHandler,
        setItems,
        prefillItems,
        setState: setStateHandler,
        onPageUpdate,
        ...props,
        ...derived,
        items,
        isLoading,
        hasEndedInfinity,
        currentPageInternal,
        startupPage,
        lowerPage,
        upperPage,
      },
    }),
    [
      sharedContext,
      updatePageContent,
      setContent,
      resetContent,
      resetInfinity,
      endInfinityHandler,
      setItems,
      prefillItems,
      setStateHandler,
      onPageUpdate,
      props,
      derived,
      items,
      isLoading,
      hasEndedInfinity,
      currentPageInternal,
      startupPage,
      lowerPage,
      upperPage,
    ]
  )

  return (
    <PaginationContext value={contextValue}>
      {props.children}
    </PaginationContext>
  )
}

PaginationProvider.defaultProps = {
  startupPage: null,
  currentPage: null,
  pageCount: null,
  setContentHandler: null,
  resetContentHandler: null,
  resetPaginationHandler: null,
  endInfinityHandler: null,
  rerender: null,
  store: null,
  useMarkerOnly: null,
  internalContent: null,
  children: null,
}

export default PaginationProvider
