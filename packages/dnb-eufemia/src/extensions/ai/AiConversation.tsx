import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import ScrollView from '../../components/ScrollView'
import useTranslation from '../../shared/useTranslation'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { useSharedState } from '../../shared/helpers/useSharedState'
import { arrow_down } from '../../icons'
import type {
  AiConversationControls,
  AiConversationProps,
  AiConversationScrollState,
  AiConversationVisibility,
} from './types'

// Distance in px from the bottom that still counts as being at the bottom
const BOTTOM_THRESHOLD = 32

// A new turn starts at a message from the user
const ANCHOR_SELECTOR = '.dnb-ai-message--user'

const MESSAGE_SELECTOR =
  '.dnb-ai-message[data-message-id], .dnb-ai-message[id]'

const SCROLL_KEYS = [
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
]

type Store<T> = {
  get: () => T
  set: (value: T) => void
  subscribe: (listener: () => void) => () => void
  isActive: () => boolean
}

type ConversationApi = {
  controls: AiConversationControls
  scrollState: Store<AiConversationScrollState>
  visibility: Store<AiConversationVisibility>
}

type Position = { element: Element; top: number }

const AiConversationContext = createContext<ConversationApi>(null)

function AiConversation(props: AiConversationProps) {
  const {
    id,
    label,
    scrollBehavior = 'turn',
    className,
    children,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const isFollowingRef = useRef(scrollBehavior === 'end')
  const isUserScrollingRef = useRef(false)
  const anchorRef = useRef<Element>(undefined)
  const referenceRef = useRef<Position>(null)
  const sizeRef = useRef<string>(null)
  const scrollTargetRef = useRef<{ element?: Element; top: number }>(null)
  const seenItemsRef = useRef(new WeakSet<Element>())
  const visibilityRef = useRef<ReturnType<typeof trackVisibility>>(null)
  const [hasContentBelow, setHasContentBelow] = useState(false)

  const api = useMemo<ConversationApi>(() => {
    const scrollToTarget = (element: Element, top: number) => {
      isFollowingRef.current = false
      scrollTargetRef.current = { element, top }
      scrollTo(scrollRef.current, top, true)
    }

    const visibility = createStore<AiConversationVisibility>(
      NO_VISIBILITY,
      (isActive) => {
        visibilityRef.current?.disconnect()
        visibilityRef.current =
          isActive && scrollRef.current
            ? trackVisibility(scrollRef.current, contentRef.current, (v) =>
                visibility.set(v)
              )
            : null
      }
    )

    return {
      controls: {
        scrollToEnd: () => {
          isFollowingRef.current = true
          isUserScrollingRef.current = false
          setHasContentBelow(false)
          scrollTo(
            scrollRef.current,
            scrollRef.current?.scrollHeight,
            true
          )
        },
        scrollToStart: () => {
          scrollToTarget(null, 0)
        },
        scrollToMessage: (messageId) => {
          const content = contentRef.current
          const element =
            content?.querySelector(
              `[data-message-id="${CSS.escape(messageId)}"]`
            ) ?? content?.querySelector(`#${CSS.escape(messageId)}`)
          if (!element) {
            return false
          }
          scrollToTarget(element, getTopOf(scrollRef.current, element))
          return true
        },
      },
      scrollState: createStore(DEFAULT_SCROLL_STATE),
      visibility,
    }
  }, [])

  const { update } = useSharedState<ConversationApi>(id)

  useLayoutEffect(() => {
    if (!id) {
      return undefined // stop here
    }
    update(api)
    return () => update(undefined)
  }, [id, api, update])

  useLayoutEffect(
    () => () => {
      visibilityRef.current?.disconnect()
      visibilityRef.current = null
    },
    []
  )

  const updateState = useCallback(() => {
    const scroll = scrollRef.current
    setHasContentBelow(hasMoreBelow(scroll, isFollowingRef.current))
    api.scrollState.set({
      isAtStart: scroll.scrollTop <= 1,
      isAtEnd: getGap(scroll) <= 1,
    })
    visibilityRef.current?.update()
  }, [api])

  // Keep the reader in place while the content changes
  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined // stop here
    }

    isFollowingRef.current = scrollBehavior === 'end'
    anchorRef.current = undefined
    updateSpacer(
      scrollRef.current,
      contentRef.current,
      spacerRef.current,
      null
    )

    const handleResize = () => {
      const scroll = scrollRef.current
      const content = contentRef.current
      const isFirstRun = anchorRef.current === undefined
      const target = scrollTargetRef.current

      const anchors = content.querySelectorAll(ANCHOR_SELECTOR)
      const anchor = anchors[anchors.length - 1] ?? null

      if (scrollBehavior === 'turn') {
        updateSpacer(scroll, content, spacerRef.current, anchor)
      }

      if (
        scrollBehavior === 'turn' &&
        anchor &&
        anchor !== anchorRef.current
      ) {
        isFollowingRef.current = false
        const top = getTopOf(scroll, anchor)
        scrollTargetRef.current = isFirstRun
          ? null
          : { element: anchor, top }
        scrollTo(scroll, top, !isFirstRun)
      } else if (isFollowingRef.current || (isFirstRun && !anchor)) {
        scrollTo(scroll, scroll.scrollHeight)
      } else if (target) {
        // Messages above can change size on the way, like when they render
        const top = target.element
          ? getTopOf(scroll, target.element)
          : target.top
        if (Math.abs(top - target.top) >= 1) {
          target.top = top
          scrollTo(scroll, top, true)
        }
      } else {
        // Content that changes, like history added above or a part of a
        // reply that closes, should not move what the user reads
        const reference = referenceRef.current
        if (reference?.element.isConnected) {
          const moved =
            getViewportTop(scroll, reference.element) - reference.top
          if (Math.abs(moved) >= 1) {
            scroll.scrollTop += moved
          }
        }
      }

      // Fade in new content, but not the content shown from the start
      for (const item of Array.from(content.children)) {
        if (!seenItemsRef.current.has(item)) {
          seenItemsRef.current.add(item)
          if (!isFirstRun) {
            item.setAttribute('data-entering', '')
          }
        }
      }

      anchorRef.current = anchor
      referenceRef.current = getReference(scroll, content, anchor)
      sizeRef.current = getSize(scroll, content)
      updateState()
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(contentRef.current)
    observer.observe(scrollRef.current)

    return () => observer.disconnect()
  }, [scrollBehavior, updateState])

  const handleScroll = () => {
    const scroll = scrollRef.current
    const maxTop = scroll.scrollHeight - scroll.clientHeight
    const isAtEnd = getGap(scroll) <= BOTTOM_THRESHOLD

    // Remember what the user reads. But when the content has changed, and
    // the change is not handled yet, the browser moved the position.
    const hasChanged =
      getSize(scroll, contentRef.current) !== sizeRef.current
    if (
      isUserScrollingRef.current ||
      scrollTargetRef.current !== null ||
      !hasChanged
    ) {
      referenceRef.current = getReference(
        scroll,
        contentRef.current,
        anchorRef.current
      )
    }

    // A scroll we started is done when it arrives, or the user takes over
    const target = scrollTargetRef.current
    if (target !== null) {
      if (
        isUserScrollingRef.current ||
        Math.abs(scroll.scrollTop - Math.min(target.top, maxTop)) < 2
      ) {
        scrollTargetRef.current = null
      }
    }

    // Only the user can scroll away from the end. Changing content can
    // move the scroll position too, but should not change what we follow.
    if (isAtEnd) {
      if (scrollBehavior === 'end' || isUserScrollingRef.current) {
        isFollowingRef.current = true
      }
      isUserScrollingRef.current = false
    } else if (isUserScrollingRef.current) {
      isFollowingRef.current = false
    }

    updateState()
  }

  const handleUserScroll = () => {
    isUserScrollingRef.current = true
  }

  const rootProps = useSpacing(props, {
    id,
    ...rest,
    className: clsx(
      'dnb-ai-conversation',
      `dnb-ai-conversation--${scrollBehavior}`,
      className
    ),
  })

  return (
    <AiConversationContext.Provider value={api}>
      <div {...rootProps}>
        <ScrollView
          ref={scrollRef}
          interactive="auto"
          className="dnb-ai-conversation__scroll"
          role="log"
          aria-label={label ?? translation.conversationLabel}
          aria-relevant="additions"
          onScroll={handleScroll}
          onWheel={handleUserScroll}
          onTouchMove={handleUserScroll}
          onKeyDown={(event) => {
            if (SCROLL_KEYS.includes(event.key)) {
              handleUserScroll()
            }
          }}
          onPointerDown={(event) => {
            // A press on the scroll view itself is on its scrollbar
            if (event.target === event.currentTarget) {
              handleUserScroll()
            }
          }}
        >
          <div ref={contentRef} className="dnb-ai-conversation__content">
            {children}
          </div>
          <div ref={spacerRef} className="dnb-ai-conversation__spacer" />
        </ScrollView>

        {hasContentBelow && (
          <Button
            variant="secondary"
            size="medium"
            icon={arrow_down}
            className="dnb-ai-conversation__scroll-button"
            aria-label={translation.scrollToBottom}
            tooltip={translation.scrollToBottom}
            onClick={api.controls.scrollToEnd}
          />
        )}
      </div>
    </AiConversationContext.Provider>
  )
}

function useConversationApi(id?: string) {
  const context = useContext(AiConversationContext)
  const { data } = useSharedState<ConversationApi>(id)
  return id ? data : context
}

function useStore<T>(store: Store<T>, fallback: T) {
  return useSyncExternalStore(
    store?.subscribe ?? noSubscription,
    store?.get ?? (() => fallback),
    store?.get ?? (() => fallback)
  )
}

/**
 * Scroll an `Ai.Conversation`. Inside the conversation it needs no `id`.
 */
export function useConversation(id?: string): AiConversationControls {
  return useConversationApi(id)?.controls ?? NO_CONTROLS
}

/**
 * Whether an `Ai.Conversation` is scrolled to the start or the end.
 */
export function useConversationScrollState(
  id?: string
): AiConversationScrollState {
  return useStore(
    useConversationApi(id)?.scrollState,
    DEFAULT_SCROLL_STATE
  )
}

/**
 * Which messages of an `Ai.Conversation` are visible, and which turn the
 * user reads. The messages are only tracked while this hook is used.
 */
export function useConversationVisibility(
  id?: string
): AiConversationVisibility {
  return useStore(useConversationApi(id)?.visibility, NO_VISIBILITY)
}

const NO_CONTROLS: AiConversationControls = {
  scrollToEnd: () => undefined,
  scrollToStart: () => undefined,
  scrollToMessage: () => false,
}

const DEFAULT_SCROLL_STATE: AiConversationScrollState = {
  isAtStart: true,
  isAtEnd: true,
}

const NO_VISIBILITY: AiConversationVisibility = {
  currentTurnId: null,
  visibleMessageIds: [],
}

const noSubscription = () => () => undefined

function createStore<T extends Record<string, unknown>>(
  initial: T,
  onActiveChange?: (isActive: boolean) => void
): Store<T> {
  let value = initial
  const listeners = new Set<() => void>()

  return {
    get: () => value,
    set: (next) => {
      if (!isSame(value, next)) {
        value = next
        listeners.forEach((listener) => listener())
      }
    },
    subscribe: (listener) => {
      listeners.add(listener)
      if (listeners.size === 1) {
        onActiveChange?.(true)
      }
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0) {
          onActiveChange?.(false)
        }
      }
    },
    isActive: () => listeners.size > 0,
  }
}

function isSame(a: Record<string, unknown>, b: Record<string, unknown>) {
  return Object.keys(a).every((key) => {
    const x = a[key]
    const y = b[key]
    if (Array.isArray(x) && Array.isArray(y)) {
      return x.length === y.length && x.every((item, i) => item === y[i])
    }
    return x === y
  })
}

function trackVisibility(
  scroll: HTMLElement,
  content: HTMLElement,
  onChange: (visibility: AiConversationVisibility) => void
) {
  if (typeof IntersectionObserver === 'undefined') {
    return null // stop here
  }

  const visible = new Set<Element>()

  const update = () => {
    const messages = Array.from(content.querySelectorAll(MESSAGE_SELECTOR))
    messages.forEach((message) => observer.observe(message))
    visible.forEach((message) => {
      if (!message.isConnected) {
        visible.delete(message)
      }
    })

    const viewportTop = scroll.getBoundingClientRect().top
    const turn = messages
      .filter((message) => message.matches(ANCHOR_SELECTOR))
      .reverse()
      .find(
        (message) =>
          message.getBoundingClientRect().top <=
          viewportTop + getScrollMargin(message) + 1
      )

    onChange({
      currentTurnId: turn ? getMessageId(turn) : null,
      visibleMessageIds: messages
        .filter((message) => visible.has(message))
        .map(getMessageId),
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          visible.add(target)
        } else {
          visible.delete(target)
        }
      })
      update()
    },
    { root: scroll }
  )

  update()

  return { update, disconnect: () => observer.disconnect() }
}

function getMessageId(message: Element) {
  return message.getAttribute('data-message-id') ?? message.id
}

// What the user reads: the latest turn when it is in view, or else the
// item at the top of the view
function getReference(
  scroll: HTMLElement,
  content: HTMLElement,
  anchor: Element
): Position {
  const { top, bottom } = scroll.getBoundingClientRect()

  if (anchor) {
    const anchorTop = anchor.getBoundingClientRect().top
    if (anchorTop >= top && anchorTop < bottom) {
      return { element: anchor, top: anchorTop - top }
    }
  }

  // The items are in order, so search for the first one below the top
  const items = content.children
  let low = 0
  let high = items.length - 1
  let found: Element = null
  while (low <= high) {
    const middle = (low + high) >> 1
    if (items[middle].getBoundingClientRect().bottom > top) {
      found = items[middle]
      high = middle - 1
    } else {
      low = middle + 1
    }
  }

  return found && { element: found, top: getViewportTop(scroll, found) }
}

function getSize(scroll: HTMLElement, content: HTMLElement) {
  const { top, bottom } = content.getBoundingClientRect()
  return `${bottom - top}:${scroll.clientHeight}`
}

function scrollTo(scroll: HTMLElement, top: number, smooth = false) {
  scroll?.scrollTo?.({
    top,
    behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto',
  })
}

// The position that places an element at the top, below the peek
function getTopOf(scroll: HTMLElement, element: Element) {
  return (
    scroll.scrollTop +
    element.getBoundingClientRect().top -
    scroll.getBoundingClientRect().top -
    getScrollMargin(element)
  )
}

function getViewportTop(scroll: HTMLElement, element: Element) {
  return (
    element.getBoundingClientRect().top -
    scroll.getBoundingClientRect().top
  )
}

function getGap({ scrollHeight, scrollTop, clientHeight }: HTMLElement) {
  return scrollHeight - scrollTop - clientHeight
}

function hasMoreBelow(scroll: HTMLElement, isFollowing: boolean) {
  return !isFollowing && getGap(scroll) > BOTTOM_THRESHOLD
}

// Leave room below the latest turn, so it can be scrolled to the top
function updateSpacer(
  scroll: HTMLElement,
  content: HTMLElement,
  spacer: HTMLElement,
  anchor: Element
) {
  if (!anchor) {
    spacer.style.height = ''
    return // stop here
  }

  const turnHeight =
    content.getBoundingClientRect().bottom -
    anchor.getBoundingClientRect().top +
    getScrollMargin(anchor)
  spacer.style.height = `${Math.max(0, scroll.clientHeight - turnHeight)}px`
}

function getScrollMargin(element: Element) {
  return parseFloat(getComputedStyle(element).scrollMarginTop) || 0
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

export default AiConversation
