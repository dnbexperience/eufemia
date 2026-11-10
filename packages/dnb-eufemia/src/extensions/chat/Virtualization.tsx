import { useCallback, useMemo, useRef, useState } from 'react'
import {
  defaultRangeExtractor,
  useVirtualizer,
} from '@tanstack/react-virtual'
import type { Range } from '@tanstack/react-virtual'
import { clsx } from 'clsx'
import ScrollView from '../../components/ScrollView'
import Button from '../../components/Button'
import { useSpacing } from '../../components/space/SpacingUtils'
import arrow_down from '../../icons/arrow_down'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from './hooks/useTranslation'
import useCanUseDOM from '../../shared/helpers/useCanUseDOM'
import {
  ChatConversationContext,
  createStore,
  DEFAULT_SCROLL_STATE,
  NO_VISIBILITY,
  useRegisterConversation,
} from './ChatConversation'
import type { ConversationApi } from './ChatConversation'
import type {
  ChatConversationDriver,
  ChatConversationDriverProps,
} from './types'

export type ConversationVirtualizationOptions = {
  /** Estimated message height in pixels until measured. */
  estimateSize?: number
  /** Number of extra messages rendered on each side of the viewport. */
  overscan?: number
}

export function createConversationVirtualization({
  estimateSize = 120,
  overscan = 5,
}: ConversationVirtualizationOptions = {}): ChatConversationDriver {
  const size =
    Number.isFinite(estimateSize) && estimateSize > 0 ? estimateSize : 120
  const extra =
    Number.isFinite(overscan) && overscan >= 0 ? Math.floor(overscan) : 5
  function Renderer(props: ChatConversationDriverProps) {
    return (
      <VirtualizedConversation
        {...props}
        estimateSize={size}
        overscan={extra}
      />
    )
  }
  return { Renderer }
}

function VirtualizedConversation(
  props: ChatConversationDriverProps &
    Required<ConversationVirtualizationOptions>
) {
  const {
    id,
    label,
    items = [],
    children: _children,
    scrollBehavior = 'turn',
    estimateSize,
    overscan,
    'aria-live': _ariaLive,
    className,
    ...rest
  } = props
  const translation = useTranslation().Chat
  const scrollRef = useRef<HTMLDivElement>(null)
  const following = useRef(scrollBehavior === 'end')
  const userScrolling = useRef(false)
  const previousScrollTop = useRef(0)
  const [focusedId, setFocusedId] = useState<string>(null)
  const [hasContentBelow, setHasContentBelow] = useState(false)
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)
  const unreadRef = useRef(false)
  const [spacer, setSpacer] = useState(0)
  const previous = useRef<{
    first?: string
    last?: string
    turn?: string
    mode?: string
  }>(null)
  const pendingTarget = useRef<string>(null)
  const [navigation, setNavigation] = useState<{
    id: string | null
    behavior: ScrollBehavior
  }>(null)
  const [peek, setPeek] = useState(0)
  const frame = useRef(0)
  const focusFrame = useRef(0)
  const isServer = !useCanUseDOM()
  const metadata = useMemo(() => {
    const indexes = new Map<string, number>()
    const turns: number[] = []
    const pinned: number[] = []
    items.forEach((item, index) => {
      indexes.set(item.id, index)
      if (item.from === 'user') {
        turns.push(index)
      }
      if (item.keepMounted || item.id === focusedId) {
        pinned.push(index)
        if (item.id === focusedId) {
          if (index > 0) {
            pinned.push(index - 1)
          }
          if (index + 1 < items.length) {
            pinned.push(index + 1)
          }
        }
      }
    })
    if (items.length) {
      pinned.push(items.length - 1)
    }
    if (turns.length) {
      pinned.push(turns[turns.length - 1])
    }
    return { indexes, turns, pinned }
  }, [items, focusedId])
  const rangeExtractor = useCallback(
    (range: Range) =>
      Array.from(
        new Set([...defaultRangeExtractor(range), ...metadata.pinned])
      ).sort((a, b) => a - b),
    [metadata]
  )
  const virtualizer = useVirtualizer({
    enabled: !isServer,
    count: items.length,
    getScrollElement: () => scrollRef.current,
    getItemKey: (index) => items[index].id,
    estimateSize: () => estimateSize,
    initialRect: { width: 0, height: 480 },
    overscan,
    rangeExtractor,
    useAnimationFrameWithResizeObserver: true,
    scrollPaddingStart:
      items[metadata.indexes.get(pendingTarget.current)]?.from === 'user'
        ? peek
        : 0,
    anchorTo: 'end',
    followOnAppend: following.current ? navigationBehavior() : false,
    scrollEndThreshold: following.current ? 1 : -Infinity,
  })
  const latest = useRef({ items, metadata, virtualizer })
  latest.current = { items, metadata, virtualizer }
  const measureRow = useCallback(
    (element: HTMLDivElement | null) => {
      // Measurements may flush React updates, so register after the ref commit.
      queueMicrotask(() => {
        if (!element || element.isConnected) {
          virtualizer.measureElement(element)
        }
      })
    },
    [virtualizer]
  )
  const api = useMemo<ConversationApi>(
    () => ({
      controls: {
        scrollToEnd: () => {
          userScrolling.current = false
          following.current = true
          pendingTarget.current = null
          setHasContentBelow(false)
          setNavigation({ id: null, behavior: navigationBehavior() })
        },
        scrollToStart: () => {
          userScrolling.current = false
          following.current = false
          pendingTarget.current = null
          setNavigation(null)
          scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
        },
        scrollToMessage: (messageId) => {
          const { metadata } = latest.current
          const index = metadata.indexes.get(messageId)
          if (index === undefined) {
            return false
          }
          following.current = false
          userScrolling.current = false
          pendingTarget.current = messageId
          setNavigation({ id: messageId, behavior: navigationBehavior() })
          return true
        },
      },
      scrollState: createStore(DEFAULT_SCROLL_STATE),
      visibility: createStore(NO_VISIBILITY),
    }),
    []
  )
  useRegisterConversation(id, api)
  useLayoutEffect(() => () => cancelAnimationFrame(focusFrame.current), [])

  const rows = isServer
    ? items
        .slice(0, overscan * 2 + 1)
        .map((_, index) => ({ index, start: index * estimateSize }))
    : virtualizer.getVirtualItems()
  const total = isServer
    ? items.length * estimateSize
    : virtualizer.getTotalSize()
  const viewportHeight = virtualizer.scrollRect?.height ?? 0
  const rangeStart = virtualizer.range?.startIndex
  const rangeEnd = virtualizer.range?.endIndex
  const scrollOffset = virtualizer.scrollOffset
  const isScrolling = virtualizer.isScrolling
  const contentOffset =
    scrollBehavior === 'end' ? Math.max(0, viewportHeight - total) : 0
  const turnIndex = metadata.turns[metadata.turns.length - 1]
  const turnId = items[turnIndex]?.id
  const navigationIndex = navigation?.id
    ? metadata.indexes.get(navigation.id)
    : undefined

  useLayoutEffect(() => {
    const scroll = scrollRef.current
    const user = scroll?.querySelector<HTMLElement>(
      '.dnb-ai-conversation__virtual-item--user'
    )
    setPeek(
      user ? parseFloat(getComputedStyle(user).scrollMarginTop) || 0 : 0
    )
  }, [items, viewportHeight])

  useLayoutEffect(() => {
    const before = previous.current
    const previousLastIndex =
      before && !before.last ? -1 : metadata.indexes.get(before?.last)
    if (previousLastIndex === undefined || prefersReducedMotion()) {
      return
    }
    for (
      let index = previousLastIndex + 1;
      index < items.length;
      index++
    ) {
      const element = scrollRef.current?.querySelector<HTMLElement>(
        '[data-ai-message-id="' + CSS.escape(items[index].id) + '"] > *'
      )
      element?.animate?.([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        easing: 'ease-out',
      })
    }
  }, [items, metadata])

  useLayoutEffect(() => {
    if (!navigation) {
      return undefined
    }
    // Let measured rows commit before starting navigation.
    const navigationFrame = requestAnimationFrame(() => {
      if (navigation.id === null) {
        virtualizer.scrollToEnd({ behavior: navigation.behavior })
      } else if (navigationIndex !== undefined) {
        virtualizer.scrollToIndex(navigationIndex, {
          align: 'start',
          behavior: navigation.behavior,
        })
      }
    })
    return () => cancelAnimationFrame(navigationFrame)
  }, [
    navigation,
    navigationIndex,
    virtualizer,
    peek,
    total,
    viewportHeight,
  ])

  useLayoutEffect(() => {
    if (!navigation || isScrolling) {
      return
    }
    const scroll = scrollRef.current
    const target =
      navigation.id === null
        ? scroll.scrollHeight - scroll.clientHeight
        : navigationIndex === undefined
          ? null
          : virtualizer.getOffsetForIndex(navigationIndex, 'start')?.[0]
    if (target == null || Math.abs(target - scroll.scrollTop) <= 1) {
      setNavigation(null)
    }
  }, [
    navigation,
    navigationIndex,
    virtualizer,
    isScrolling,
    scrollOffset,
    total,
    spacer,
    peek,
  ])

  const updateState = useCallback(() => {
    const scroll = scrollRef.current
    if (!scroll) {
      return
    }
    const atEnd =
      scroll.scrollHeight - scroll.clientHeight - scroll.scrollTop <= 2
    if (atEnd) {
      unreadRef.current = false
    }
    setHasUnreadMessages(unreadRef.current)
    setHasContentBelow(!following.current && !atEnd)
    api.scrollState.set({
      isAtStart: scroll.scrollTop <= 1,
      isAtEnd: atEnd,
      hasUnreadMessages: unreadRef.current,
    })
    const { items, metadata, virtualizer } = latest.current
    const visible = virtualizer
      .getVirtualItems()
      .filter(
        (row) =>
          row.end > scroll.scrollTop &&
          row.start < scroll.scrollTop + scroll.clientHeight
      )
    const userItem = scroll.querySelector<HTMLElement>(
      '.dnb-ai-conversation__virtual-item--user'
    )
    const peek = userItem
      ? parseFloat(getComputedStyle(userItem).scrollMarginTop) || 0
      : 0
    const measurements = virtualizer.measurementsCache
    let low = 0
    let high = metadata.turns.length - 1
    let turn: number | undefined
    while (low <= high) {
      const middle = (low + high) >> 1
      const index = metadata.turns[middle]
      if (
        (measurements[index]?.start ?? Infinity) <=
        scroll.scrollTop + peek + 1
      ) {
        turn = index
        low = middle + 1
      } else {
        high = middle - 1
      }
    }
    api.visibility.set({
      currentTurnId: items[turn]?.id ?? null,
      visibleMessageIds: visible.map((row) => items[row.index].id),
    })
  }, [api])

  useLayoutEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) {
      return undefined
    }
    const before = previous.current
    if (
      pendingTarget.current &&
      !metadata.indexes.has(pendingTarget.current)
    ) {
      pendingTarget.current = null
    }
    const first = items[0]?.id
    const last = items.at(-1)?.id
    const modeChanged = before?.mode !== scrollBehavior
    if (modeChanged) {
      following.current = scrollBehavior === 'end'
    }
    const reset =
      before &&
      before.last &&
      !metadata.indexes.has(before.last) &&
      before.first &&
      !metadata.indexes.has(before.first)
    const previousLastIndex = before
      ? metadata.indexes.get(before.last)
      : undefined
    const appended =
      previousLastIndex === undefined
        ? []
        : items.slice(previousLastIndex + 1)
    if (!before || reset || !items.length) {
      unreadRef.current = false
    } else if (
      appended.length &&
      !following.current &&
      scroll.scrollHeight - scroll.clientHeight - scroll.scrollTop > 2 &&
      !appended.some((item) => item.from === 'user')
    ) {
      unreadRef.current = true
    }
    if (reset) {
      following.current = scrollBehavior === 'end'
      pendingTarget.current = null
      setNavigation(null)
    }
    if (
      scrollBehavior === 'end' &&
      before &&
      turnId &&
      turnId !== before.turn
    ) {
      following.current = true
      userScrolling.current = false
      pendingTarget.current = null
      setNavigation(null)
    }
    if (
      scrollBehavior === 'turn' &&
      turnId &&
      (modeChanged || turnId !== before?.turn)
    ) {
      following.current = false
      pendingTarget.current = turnId
      setNavigation({
        id: turnId,
        behavior: before ? navigationBehavior() : 'auto',
      })
    }
    const turnOffset =
      turnIndex === undefined
        ? total
        : (virtualizer.measurementsCache[turnIndex]?.start ?? 0)
    setSpacer(
      scrollBehavior === 'turn'
        ? Math.max(0, scroll.clientHeight - (total - turnOffset))
        : 0
    )
    previous.current = { first, last, turn: turnId, mode: scrollBehavior }
    const animateAppend =
      before && !reset && appended.length > 0 && following.current
    if (animateAppend) {
      setNavigation({ id: null, behavior: navigationBehavior() })
    }
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      if (navigation || animateAppend) {
        updateState()
        return
      }
      const target = pendingTarget.current
      if (target && metadata.indexes.has(target)) {
        const element = scroll.querySelector<HTMLElement>(
          '[data-ai-message-id="' + CSS.escape(target) + '"]'
        )
        if (element) {
          const peek =
            parseFloat(getComputedStyle(element).scrollMarginTop) || 0
          scroll.scrollTop +=
            element.getBoundingClientRect().top -
            scroll.getBoundingClientRect().top -
            peek
        }
      } else if (
        following.current ||
        (!before && turnIndex === undefined)
      ) {
        scroll.scrollTop = scroll.scrollHeight
      }
      updateState()
    })
    return () => cancelAnimationFrame(frame.current)
  }, [
    items,
    metadata,
    scrollBehavior,
    total,
    turnId,
    turnIndex,
    virtualizer,
    updateState,
    spacer,
    viewportHeight,
    rangeStart,
    rangeEnd,
    scrollOffset,
    navigation,
  ])

  const rootProps = useSpacing(props, {
    id,
    ...rest,
    className: clsx(
      'dnb-ai-conversation',
      'dnb-ai-conversation--virtualized',
      className
    ),
  })
  const handleUserScroll = () => {
    cancelAnimationFrame(frame.current)
    userScrolling.current = true
    pendingTarget.current = null
    setNavigation(null)
    if (navigation) {
      virtualizer.scrollToOffset(scrollRef.current.scrollTop)
    }
  }
  return (
    <ChatConversationContext.Provider value={api}>
      <div {...rootProps}>
        <ScrollView
          ref={scrollRef}
          interactive="auto"
          className="dnb-ai-conversation__scroll"
          role="log"
          aria-live="off"
          aria-label={label ?? translation.conversationLabel}
          onWheel={handleUserScroll}
          onTouchMove={handleUserScroll}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              handleUserScroll()
            } else if (
              !(event.target as Element).closest(
                'button, a, input, select, textarea, [role="button"]'
              )
            ) {
              handleUserScroll()
              following.current = false
            }
          }}
          onKeyDown={(event) => {
            if (
              [
                'ArrowUp',
                'ArrowDown',
                'PageUp',
                'PageDown',
                'Home',
                'End',
                ' ',
              ].includes(event.key)
            ) {
              handleUserScroll()
            }
          }}
          onScroll={() => {
            const scroll = scrollRef.current
            if (userScrolling.current) {
              // Moving upward stops following, even within the end tolerance.
              following.current =
                scroll.scrollTop >= previousScrollTop.current &&
                scroll.scrollHeight -
                  scroll.clientHeight -
                  scroll.scrollTop <=
                  1
              if (following.current) {
                userScrolling.current = false
              }
            }
            previousScrollTop.current = scroll.scrollTop
            updateState()
          }}
        >
          <div
            className="dnb-ai-conversation__virtual-content"
            style={{
              position: 'relative',
              flexShrink: 0,
              boxSizing: 'content-box',
              height: Math.max(
                total,
                scrollRef.current?.clientHeight ?? 0
              ),
            }}
          >
            {rows.map((row) => {
              const item = items[row.index]
              return (
                <div
                  key={item.id}
                  ref={measureRow}
                  data-index={row.index}
                  data-ai-message-id={item.id}
                  id={item.id}
                  className={clsx(
                    'dnb-ai-conversation__virtual-item',
                    item.from === 'user' &&
                      'dnb-ai-conversation__virtual-item--user'
                  )}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 'var(--ai-conversation-padding)',
                    width:
                      'calc(100% - 2 * var(--ai-conversation-padding))',
                    display: 'flow-root',
                    paddingBottom:
                      row.index < items.length - 1
                        ? items[row.index + 1].from === item.from
                          ? '0.5rem'
                          : '1rem'
                        : undefined,
                    scrollMarginTop:
                      item.from === 'user'
                        ? 'var(--ai-conversation-peek)'
                        : undefined,
                    transform: `translateY(${row.start + contentOffset}px)`,
                  }}
                  onFocusCapture={(event) => {
                    cancelAnimationFrame(focusFrame.current)
                    if (event.target === event.currentTarget) {
                      setFocusedId(item.id)
                      return
                    }
                    handleUserScroll()
                    following.current = false
                    const scroll = scrollRef.current
                    const viewport = scroll.getBoundingClientRect()
                    const focused = (
                      event.target as HTMLElement
                    ).getBoundingClientRect()
                    const adjustment =
                      focused.top < viewport.top
                        ? focused.top - viewport.top
                        : focused.bottom > viewport.bottom
                          ? focused.bottom - viewport.bottom
                          : 0
                    virtualizer.scrollToOffset(
                      scroll.scrollTop + adjustment
                    )
                    setFocusedId(item.id)
                  }}
                  onBlurCapture={() => {
                    cancelAnimationFrame(focusFrame.current)
                    focusFrame.current = requestAnimationFrame(() => {
                      if (
                        !scrollRef.current
                          ?.querySelector(
                            '[data-ai-message-id="' +
                              CSS.escape(item.id) +
                              '"]'
                          )
                          ?.contains(document.activeElement)
                      ) {
                        setFocusedId((current) =>
                          current === item.id ? null : current
                        )
                      }
                    })
                  }}
                >
                  {item.render()}
                </div>
              )
            })}
          </div>
          <div style={{ height: spacer, flexShrink: 0 }} aria-hidden />
        </ScrollView>
        {hasContentBelow && (
          <Button
            variant="secondary"
            size="medium"
            icon={arrow_down}
            className="dnb-ai-conversation__scroll-button"
            text={hasUnreadMessages ? translation.newMessage : undefined}
            aria-label={
              hasUnreadMessages
                ? translation.newMessage +
                  '. ' +
                  translation.scrollToBottom
                : translation.scrollToBottom
            }
            tooltip={translation.scrollToBottom}
            onClick={({ event }) => {
              if (document.activeElement === event.currentTarget) {
                const message =
                  scrollRef.current?.querySelector<HTMLElement>(
                    '[data-ai-message-id="' +
                      CSS.escape(items.at(-1)?.id ?? '') +
                      '"]'
                  )
                message?.setAttribute('tabindex', '-1')
                message?.focus({ preventScroll: true })
              }
              api.controls.scrollToEnd()
            }}
          />
        )}
      </div>
    </ChatConversationContext.Provider>
  )
}

export const virtualizedConversation = createConversationVirtualization()
export default createConversationVirtualization

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

function navigationBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}
